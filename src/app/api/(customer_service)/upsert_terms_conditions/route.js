import dbConnect from "@/lib/db";
import { handleError } from "@/utils/errorHandler";
import { handleSuccess } from "@/utils/handleSuccess";
import TermsModel from "@/models/termsconditionSchema";

export async function POST (request) {
    try {
        const {heading,terms,type,id} = await request.json();
        if(type === "update"){
            if(terms.length === 0 || !id){return handleError(null, "please enter all fields")}; 
        }else{ if(!heading || terms.length === 0){return handleError(null, "please enter all fields")}; }
        let resp = '';
       await dbConnect();
       if(type === "update"){
        resp = await TermsModel.findByIdAndUpdate(id, {terms:terms},{new:true})
       }else{resp = await TermsModel.create({heading,terms});}      
       if(!resp) {return handleError("null", "network Error")};
       if(type === "update"){
        return handleSuccess('null', 'null', 'updated successfully')
       }
       return handleSuccess('null','null','added successfully');
    } catch (error) {return handleError(error)}    
}