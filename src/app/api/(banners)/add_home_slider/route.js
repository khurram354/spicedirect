import dbConnect from "@/lib/db";
import HomeSliderModel from "@/models/homesliderSchema";
import { handleError } from "@/utils/errorHandler";
import { handleSuccess } from "@/utils/handleSuccess";
import { S3Client } from "@aws-sdk/client-s3";
import { createPresignedPost } from "@aws-sdk/s3-presigned-post";
import { v4 as uuidv4 } from 'uuid';

const client = new S3Client({
    region: "eu-west-2",
    credentials: {
        accessKeyId: process.env.AWS_ACCESS_KEY,
        secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
    }
})

async function handleUploads(files, deviceType) {
    const uploadPromises = [];
    const uploadedUrls = [];
    for (let file of files) {
        const uniqueId = uuidv4();
        const fileName = file.name.replace(/\s+/g, '-').replace(/[^a-zA-Z0-9-.]/g, '');
        const key = `productimages/homeslider/${uniqueId}-${fileName}`
        const { url, fields } = await createPresignedPost(client, {
            Bucket: process.env.AWS_BUCKET,
            Key: key,
            Expires: 3600,
        })
        const form = new FormData();
        Object.entries(fields).forEach(([field, value]) => {
            form.append(field, value);
        });
        form.append('file', file);
        const uploadPromise = await fetch(url, {
            method: 'POST',
            body: form,
        })
        uploadPromises.push(uploadPromise);
        uploadedUrls.push({imageurl: key, device: deviceType});
    }
        const result = await Promise.all(uploadPromises);
        const allSuccess = result.every(res => res.status === 204);
        if(!allSuccess){ return handleError(null, "network error")}
        return uploadedUrls
}

export async function POST(request) {
    try {
        const formData = await request.formData();
        let data = {
            desktop: [], mobile: []
        };

        for (let [key, value] of formData.entries()) {
            if (typeof value === 'object' && value.name) {
                if (key.startsWith('desktop')) {
                    data.desktop.push(value);
                }
                if (key.startsWith('mobile')) {
                    data.mobile.push(value);
                }
            }
        }
        if (data.desktop.length === 0 && data.mobile.length === 0) { return handleError(null, "no image found, upload again please") };
        let images = [];
        if (data.desktop && data.desktop.length > 0) { 
            const desktopImages = await handleUploads(data.desktop, 'desktop');
            images.push(...desktopImages);
        }
        if (data.mobile && data.mobile.length > 0) {
            const mobileImages = await handleUploads(data.mobile, 'mobile');
            images.push(...mobileImages)
        }
        await dbConnect();
        await HomeSliderModel.insertMany(images);
        return handleSuccess(null, null, "file upload successfully")
    } catch (error) { return handleError(error) }
}


