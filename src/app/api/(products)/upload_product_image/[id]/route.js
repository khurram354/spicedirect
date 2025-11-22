import dbConnect from "@/lib/db";
import InventoryProduct from "@/models/inventorySchema";
import { handleError } from "@/utils/errorHandler";
import { handleSuccess } from "@/utils/handleSuccess";
import { S3Client, DeleteObjectCommand } from "@aws-sdk/client-s3";
import { createPresignedPost } from "@aws-sdk/s3-presigned-post";
import { v4 as uuidv4 } from 'uuid';

export async function POST(request, {params}) {
    try {
        const client = new S3Client({
            region: "eu-west-2",
            credentials:{
                accessKeyId: process.env.AWS_ACCESS_KEY,
                secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
            }
        })
        await dbConnect();
        const { id } = await params;
        const product = await InventoryProduct.findById({_id:id});
        if(!product){return handleError(null, "product not found")}
        if(product.image_name.length > 0){
            const keyToDelete = product.image_name[0];
            const deleteexistingImage = new DeleteObjectCommand({
                Bucket: process.env.AWS_BUCKET,
                Key: keyToDelete,
            });
            await client.send(deleteexistingImage);
        }
        const formData = await request.formData();
        const file = formData.get('file');        
        if(!file){return handleError(null, "no image found, upload again please")};
        if(!file.type.startsWith('image/')){return handleError(null, "upload image file please")};
         const uniqueId = uuidv4();
         const fileName = file.name.replace(/\s+/g, '-').replace(/[^a-zA-Z0-9-.]/g, '');
         const { url, fields } = await createPresignedPost(client, {
                Bucket: process.env.AWS_BUCKET,
                Key: `productimages/${uniqueId}-${fileName}`,
                Expires: 3600,
            })
            const form = new FormData();
            Object.entries(fields).forEach(([field, value]) => {
                form.append(field, value);
            });
            form.append('file', file);
            const uploadResponse = await fetch(url, {
                method: 'POST',
                body: form,
            });
            if (!uploadResponse.ok) {console.log('S3 upload failed'); }
            if (uploadResponse.status === 204) {
                const imageURL = `productimages/${uniqueId}-${fileName}`;
                product.image_name = imageURL;
                const resp = await product.save();
                if(!resp){return handleError(null, "Error Uploading Files")}
                return handleSuccess(null, null, "Image File Uploaded Successfully");
        } else {return handleError(null, "Error Uploading Files")
        }
    } catch (error) {return handleError(error)}
}


// import dbConnect from "@/lib/db";
// import InventoryProduct from "@/models/inventorySchema";
// import { handleError } from "@/utils/errorHandler";
// import { handleSuccess } from "@/utils/handleSuccess";
// import fs from 'fs';
// import path from "path";

// export async function POST(request, {params}) {
//     try {
//         await dbConnect();
//         const { id } = await params;
//         const product = await InventoryProduct.findById({_id:id});
//         if(!product){return handleError(null, "product not found")}
//         const formData = await request.formData();
//         const file = formData.get('file');        
//         if(!file){return handleError(null, "no image found, upload again please")};
//         if(!file.type.startsWith('image/')){return handleError(null, "upload image file please")};
//         const uploadDirectory = path.join(process.cwd(), 'public','productImages');
//         if(!fs.existsSync(uploadDirectory)){
//         fs.mkdirSync(uploadDirectory, {recursive: true});
//        }
//        const buffer = Buffer.from(await file.arrayBuffer());
//        const fileName = `${Date.now()}-${file.name}`;
//        const filePath = path.join(uploadDirectory, fileName);
//        fs.writeFileSync(filePath, buffer)
//        product.image_name = fileName;
//        const resp = await product.save();
//        if(!resp){return handleError(null, "Error Uploading Files")}
//        return handleSuccess(null, null, "Image File Uploaded Successfully");
//     } catch (error) {return handleError(error)}
// }




