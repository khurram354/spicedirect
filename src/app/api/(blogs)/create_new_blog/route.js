import dbConnect from "@/lib/db";
import BlogModel from "@/models/blogSchema";
import { handleError } from "@/utils/errorHandler";
import { handleSuccess } from "@/utils/handleSuccess";
import { saveImageFile } from "@/utils/uploadImages";
import fs from 'fs';
import path from "path";

export async function POST(request) {
    try {
        const formData = await request.formData();
        const data = {};
        let blogId = '';
        for (let [key, value] of formData.entries()) {
            if (key.startsWith('fiveCircleImage')) {
                if (!data.fiveCircleImage) {
                    data.fiveCircleImage = [];
                }
                data.fiveCircleImage.push(value);
            } else if (key.startsWith('fiveCircleTitle')) {
                if(!data.fiveCircleTitle) {
                    data.fiveCircleTitle = [];
                }
                data.fiveCircleTitle.push(value);
            } else if(key.startsWith('id')){
                blogId = value;
            } else {
                data[key] = value;
            }
        }
        const uploadDirectory = path.join(process.cwd(), 'public', 'images/blogs');
        if (!fs.existsSync(uploadDirectory)) {
            fs.mkdirSync(uploadDirectory, { recursive: true });
        }
        if (data.mainTitleImage) {
            const mainTitleFileName = await saveImageFile(data.mainTitleImage, uploadDirectory);
            data.mainTitleImage = mainTitleFileName;
        }
        if (data.spOfferImage) {
            const spOfferImageFileName = await saveImageFile(data.spOfferImage, uploadDirectory);
            data.spOfferImage = spOfferImageFileName;
        }
        if (data.thumpsUpImage) {
            const thumpsUpImageFileName = await saveImageFile(data.thumpsUpImage, uploadDirectory);
            data.thumpsUpImage = thumpsUpImageFileName;
        }
        if (data.fiveCircleImage && data.fiveCircleImage.length > 0) {
            const fiveCircleImageFilenames = [];
            for (let file of data.fiveCircleImage) {
                const fileName = await saveImageFile(file, uploadDirectory);
                fiveCircleImageFilenames.push(fileName);
            }
            data.fiveCircleImage = fiveCircleImageFilenames
        }
        if (data.fiveCircleTitle && data.fiveCircleTitle.length > 0) {
            const fiveCircleTitleFilenames = [];
            for (let file of data.fiveCircleTitle) {
                const fileName = await saveImageFile(file, uploadDirectory);
                fiveCircleTitleFilenames.push(fileName);
            }
            data.fiveCircleTitle = fiveCircleTitleFilenames
        }
        delete data.fileLimit;
        delete data.titleLimit;
        await dbConnect();
        if (blogId === "") {
            delete data.id;
            const resp = await BlogModel.create(data);
            if (!resp) { return handleError(null, "Error Creating Blog") };
            return handleSuccess(null, null, "Blog Created Successfully")
        }else{
            const blog = await BlogModel.findById(blogId);
            if(!blog){return handleError(null, 'Blog not found')};
            Object.keys(data).forEach(key => {
                if(data[key] === '' || data[key] === null || data[key] === undefined){
                    delete data[key];
                }
            })
            const updateBlog = await BlogModel.findByIdAndUpdate(blogId,data,{new:true});
            if(!updateBlog){ return handleError(null, 'Error updating blog')};
            return handleSuccess(null, null, "Blog updated Successfully");
    
        }


    } catch (error) { return handleError(error) }
}



