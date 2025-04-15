import mongoose from "mongoose";
import InventoryCategory from "./categorySchema";

const subcategorySchema = new mongoose.Schema({
    name: {type:String, required:true, trim:true, unique:true},
    categoryId: {type:mongoose.Schema.Types.ObjectId, ref: 'InventoryCategory', default:null, index:true}
},
    {
        collection:"subcategories",
        versionKey:false,
    }
);
const SubCategoryModel = mongoose.models.subcategories || mongoose.model("subcategories", subcategorySchema)
export default SubCategoryModel