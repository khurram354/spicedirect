import dbConnect from "@/lib/db";
import InventoryProduct from "@/models/inventorySchema";
import { handleError } from "@/utils/errorHandler";
import { handleSuccess } from "@/utils/handleSuccess";
import fs from 'fs';
import path from "path";

export async function POST(request, {params}) {
    try {
        await dbConnect();
        const { id } = await params;
        const product = await InventoryProduct.findById({_id:id});
        if(!product){return handleError(null, "product not found")}
        const formData = await request.formData();
        const file = formData.get('file');        
        if(!file){return handleError(null, "no image found, upload again please")};
        if(!file.type.startsWith('image/')){return handleError(null, "upload image file please")};
        const uploadDirectory = path.join(process.cwd(), 'public','productImages');
        if(!fs.existsSync(uploadDirectory)){
        fs.mkdirSync(uploadDirectory, {recursive: true});
       }
       const buffer = Buffer.from(await file.arrayBuffer());
       const fileName = `${Date.now()}-${file.name}`;
       const filePath = path.join(uploadDirectory, fileName);
       fs.writeFileSync(filePath, buffer)
       product.image_name = fileName;
       const resp = await product.save();
       if(!resp){return handleError(null, "Error Uploading Files")}
       return handleSuccess(null, null, "Image File Uploaded Successfully");
    } catch (error) {return handleError(error)}
}



