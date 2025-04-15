import mongoose from "mongoose";
const termsSchema = new mongoose.Schema({
    heading: {type:String, required:[true, "Please enter heading"],trim:true},
    terms:[{condition:{type:String,required:[true, "Please enter conditions"], trim:true},}],
},{
    collection:"terms_conditions",
    versionKey:false,
});
const TermsModel = mongoose.models.terms_conditions || mongoose.model("terms_conditions", termsSchema);
export default TermsModel