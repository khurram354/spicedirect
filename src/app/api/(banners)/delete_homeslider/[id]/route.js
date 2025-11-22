import dbConnect from "@/lib/db";
import HomeSliderModel from "@/models/homesliderSchema";
import { handleError } from "@/utils/errorHandler";
import { handleSuccess } from "@/utils/handleSuccess";
import { S3Client, DeleteObjectCommand } from "@aws-sdk/client-s3";

export async function DELETE(request, { params }) {
    try {
        const client = new S3Client({
            region: "eu-west-2",
            credentials: {
                accessKeyId: process.env.AWS_ACCESS_KEY,
                secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
            }
        })
        const { id } = await params;
        await dbConnect();

        const slider = await HomeSliderModel.findById({ _id: id });
        if (!slider) { handleError(null, 'network error, try again please') }
        const keyToDelete = slider.imageurl;
        const deleteexistingImage = new DeleteObjectCommand({
            Bucket: process.env.AWS_BUCKET,
            Key: keyToDelete,
        });
        await client.send(deleteexistingImage);
        const result = await HomeSliderModel.findByIdAndDelete(id);
        if (!result) { handleError(null, 'network error, try again please') }

        return handleSuccess(null, null, 'delete slider successfully')
    } catch (error) { return handleError(error); }
}

