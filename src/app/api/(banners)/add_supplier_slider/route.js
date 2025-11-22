import dbConnect from "@/lib/db";
import SupplierImageModel from "@/models/supplierSchema";
import { handleError } from "@/utils/errorHandler";
import { handleSuccess } from "@/utils/handleSuccess";
import { v4 as uuidv4 } from 'uuid';
import { S3Client } from "@aws-sdk/client-s3";
import { createPresignedPost } from "@aws-sdk/s3-presigned-post";

export async function POST(request) {
    try {
        const client = new S3Client({
            region: "eu-west-2",
            credentials: {
                accessKeyId: process.env.AWS_ACCESS_KEY,
                secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
            }
        })
        const formData = await request.formData();
        const files = []

        for (let [key, value] of formData.entries()) {
            if (key.startsWith('supplierimages')) {
                files.push(value);
            }
        }
        if (files.length === 0) { return handleError(null, "no image found, upload again please") };
        const uploadPromises = [];
        const allUrl = [];
        for (const file of files) {
            const uniqueId = uuidv4();
            const fileName = file.name.replace(/\s+/g, '-').replace(/[^a-zA-Z0-9-.]/g, '');
            console.log(fileName)
            const { url, fields } = await createPresignedPost(client, {
                Bucket: process.env.AWS_BUCKET,
                Key: `productimages/supplier/${uniqueId}-${fileName}`,
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
            allUrl.push(`productimages/supplier/${uniqueId}-${fileName}`)
        };
        const result = await Promise.all(uploadPromises);
        if (result[0].status === 204) {
            let images = []
            for (let url of allUrl) {
                images.push({imageurl: url})
            }
            await dbConnect();
            const result = await SupplierImageModel.insertMany(images);
            if(!result) {return handleError(null, "network error")}             
            return handleSuccess(null, null, "file upload successfully")
        } else {return handleError(null, "network error")}
    } catch (error) { return handleError(error) }
}



