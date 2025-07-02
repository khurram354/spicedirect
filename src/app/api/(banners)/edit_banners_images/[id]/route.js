import dbConnect from "@/lib/db";
import BannersModel from "@/models/bannersSchema";
import CuisineModel from "@/models/cuisineSchema";
import { handleError } from "@/utils/errorHandler";
import { handleSuccess } from "@/utils/handleSuccess";
import { S3Client, DeleteObjectCommand } from "@aws-sdk/client-s3";
import { createPresignedPost } from "@aws-sdk/s3-presigned-post";
import { v4 as uuidv4 } from 'uuid';

export async function POST(request, { params }) {
    try {
        const client = new S3Client({
            region: "eu-west-2",
            credentials: {
                accessKeyId: process.env.AWS_ACCESS_KEY,
                secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
            }
        })
        const { id } = await params;
        const formData = await request.formData();
        const file = formData.get('file');
        const type = formData.get('type') || '';
        if (!file) { return handleError(null, "no image found, upload again please") };
        if (!file.type.startsWith('image/')) { return handleError(null, "upload image file please") };
        if (type) {
            const existing_cuisine = await CuisineModel.findById({ _id: id });
            if (!existing_cuisine) { return handleError(null, "cuisine not found") }
            if (existing_cuisine.image_name.length > 0) {
                const keyToDelete = existing_cuisine.image_name[0];
                const deleteexistingImage = new DeleteObjectCommand({
                    Bucket: process.env.AWS_BUCKET,
                    Key: keyToDelete,
                });
                await client.send(deleteexistingImage);
            }
        } else {
            const existing_banner = await BannersModel.findById({ _id: id });
            if (!existing_banner) { return handleError(null, "banner not found") }
            if (existing_banner.image_name.length > 0) {
                const keyToDelete = existing_banner.image_name[0];
                const deleteexistingImage = new DeleteObjectCommand({
                    Bucket: process.env.AWS_BUCKET,
                    Key: keyToDelete,
                });
                await client.send(deleteexistingImage);
            }
        }
        const uniqueId = uuidv4();
        const fileName = file.name.replace(/\s+/g, '-').replace(/[^a-zA-Z0-9-.]/g, '');
        const { url, fields } = await createPresignedPost(client, {
            Bucket: process.env.AWS_BUCKET,
            Key: `productimages/banners/${uniqueId}-${fileName}`,
            Expires: 3600,
        });
        const form = new FormData();
        Object.entries(fields).forEach(([field, value]) => {
            form.append(field, value);
        });
        form.append('file', file);
        const uploadResponse = await fetch(url, {
            method: 'POST',
            body: form,
        });
        if (!uploadResponse.ok) { console.log('S3 upload failed'); }
        if (uploadResponse.status === 204) {
            await dbConnect();
            const imageURL = `productimages/banners/${uniqueId}-${fileName}`;
            if (type) {
                await CuisineModel.findByIdAndUpdate({ _id: id }, { $set: { "image_name": imageURL } }, { new: true });
            } else {
                await BannersModel.findByIdAndUpdate({ _id: id }, { $set: { "image_name": imageURL } }, { new: true });
            }
        } else { return handleError(null, "Error Uploading Files") }
        return handleSuccess(null, null, "file upload successfully")
    } catch (error) { return handleError(error) }
}

