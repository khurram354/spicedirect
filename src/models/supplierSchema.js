import mongoose from "mongoose";
const supplierSchema = new mongoose.Schema({   
            'imageurl':{type:String,trim:true}   
},{
    collection:'supplierslider',
    versionKey:false,
});
const SupplierImageModel = mongoose.models.supplierslider || mongoose.model("supplierslider", supplierSchema);
export default SupplierImageModel;