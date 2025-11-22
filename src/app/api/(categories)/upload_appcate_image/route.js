import dbConnect from "@/lib/db";
import InventoryCategory from "@/models/categorySchema";
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
        const file = formData.get("image");
        const categoryId = formData.get("categoryId");
        if(!file || !categoryId){return handleError (null, "missing required fields")};
        
            const uniqueId = uuidv4();
            const fileName = file.name.replace(/\s+/g, '-').replace(/[^a-zA-Z0-9-.]/g, '');
            const s3key = `productimages/app/categorybanners/${uniqueId}-${fileName}`

            const { url, fields } = await createPresignedPost(client, {
                Bucket: process.env.AWS_BUCKET,
                Key: s3key,
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
            if(!uploadPromise.ok) return handleError(null, 'upload to s3 failed')
            await dbConnect();
            const result = await InventoryCategory.findByIdAndUpdate(categoryId,{$set:{banner:s3key}});
         if (!result) return handleError(null, "Failed to update category with image");            
            return handleSuccess(null, null, "file upload successfully")
    } catch (error) { return handleError(error) }
}



