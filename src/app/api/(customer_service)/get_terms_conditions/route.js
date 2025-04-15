import dbConnect from "@/lib/db";
import TermsModel from "@/models/termsconditionSchema";
import { handleError } from "@/utils/errorHandler";
import { handleSuccess } from "@/utils/handleSuccess";

export async function GET () {
    try {
        await dbConnect();
        const resp = await TermsModel.find({});
        if(!resp){return handleError(null, "network error")};
        return handleSuccess(resp, "termsconditions", "fetch successfully")
    } catch (error) {return handleError(error)}
}