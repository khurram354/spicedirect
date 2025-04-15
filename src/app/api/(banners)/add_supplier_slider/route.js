import dbConnect from "@/lib/db";
import SupplierImageModel from "@/models/supplierSchema";
import { handleError } from "@/utils/errorHandler";
import { handleSuccess } from "@/utils/handleSuccess";
import { saveImageFile } from "@/utils/uploadImages";
import fs from 'fs';
import path from "path";

export async function POST(request) {
    try {
        const formData = await request.formData();
        let data = {
            supplierimages: []
        };

        for (let [key, value] of formData.entries()) {
            if (key.startsWith('supplierimages')) {
                data.supplierimages.push(value);
            }           
        }
        if (data.supplierimages.length === 0) { return handleError(null, "no image found, upload again please") };
        const uploadDirectory = path.join(process.cwd(), 'public', 'images/supplierslider');
        if (!fs.existsSync(uploadDirectory)) {
            fs.mkdirSync(uploadDirectory, { recursive: true });
        }
        if (data.supplierimages && data.supplierimages.length > 0) {
            const supplierImages = [];
            for (let file of data.supplierimages) {
                const fileName = await saveImageFile(file, uploadDirectory);
                supplierImages.push(fileName)
            }
            data.supplierimages = supplierImages;
        }     

        await dbConnect();
        let images = [];
        if (data.supplierimages && data.supplierimages.length > 0 && !data.supplierimages.includes(undefined)) {
            for (let url of data.supplierimages) {
                images.push({
                    imageurl: url
                })
            }
        }
        const result = await SupplierImageModel.insertMany(images);
        if(!result) {return handleError(null, "network error")}
        return handleSuccess(null, null, "file upload successfully")

    } catch (error) { return handleError(error) }
}



