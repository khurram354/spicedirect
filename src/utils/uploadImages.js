import { handleError } from "./errorHandler";
import fs from 'fs';
import path from "path";

export const saveImageFile = async (file, uploadDirectory) => {
    try {
        const fileName = `${Date.now()}-${file.name}`;
        const filePath = path.join(uploadDirectory, fileName);

        const buffer = Buffer.from(await file.arrayBuffer());
        fs.writeFileSync(filePath, buffer);
        return fileName;
    } catch (error) {
        handleError(error, "Error saving the image File")
    }
}