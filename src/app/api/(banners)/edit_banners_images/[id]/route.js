import dbConnect from "@/lib/db";
import BannersModel from "@/models/bannersSchema";
import CuisineModel from "@/models/cuisineSchema";
import { handleError } from "@/utils/errorHandler";
import { handleSuccess } from "@/utils/handleSuccess";
import fs from 'fs';
import path from "path";

export async function POST(request, { params }) {
    try {
        const { id } = await params;
        const formData = await request.formData();
        const file = formData.get('file');
        const type = formData.get('type') || '';
        if (!file) { return handleError(null, "no image found, upload again please") };
        if (!file.type.startsWith('image/')) { return handleError(null, "upload image file please") }

        let uploadDirectory = ''
        if (type) {
            uploadDirectory = path.join(process.cwd(), 'public', 'images/cuisine');
        } else {
            uploadDirectory = path.join(process.cwd(), 'public', 'images/banners');
        }
        if (!fs.existsSync(uploadDirectory)) {
            fs.mkdirSync(uploadDirectory, { recursive: true });
        }
        const buffer = Buffer.from(await file.arrayBuffer());
        const fileName = `${Date.now()}-${file.name}`;
        const filePath = path.join(uploadDirectory, fileName);
        fs.writeFileSync(filePath, buffer)
        await dbConnect();
        if (type) {
            await CuisineModel.findByIdAndUpdate({ _id: id }, { $set: { "image_name": fileName } }, { new: true });
        } else {
            await BannersModel.findByIdAndUpdate({ _id: id }, { $set: { "image_name": fileName } }, { new: true });
        }
        return handleSuccess(null, null, "file upload successfully")

    } catch (error) { return handleError(error) }
}



