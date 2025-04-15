import dbConnect from "@/lib/db";
import { handleError } from "@/utils/errorHandler";
import { handleSuccess } from "@/utils/handleSuccess";
import TermsModel from "@/models/termsconditionSchema";

export async function POST (request) {
    try {
        const {id,conditions} = await request.json();
        if(!id ||!conditions) {return handleError('null', "Please enter all fields")}
        await dbConnect();
        const termsData = await TermsModel.findById(id);
        termsData.terms = [...termsData.terms, ...conditions];
        await termsData.save();
       return handleSuccess('null','null','added successfully');
    } catch (error) {return handleError(error)}    
}