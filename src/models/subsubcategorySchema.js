import mongoose from "mongoose";
import SubCategoryModel from "./subcategorySchema";
const subsubcategorySchema = new mongoose.Schema({
    name: {type: String, required: true, unique:true, trim: true},
    subCategoryId: {type: mongoose.Schema.Types.ObjectId, ref: 'subcategories'}
},{
    collection: 'subsubcategories',
    versionKey: false,
});
const SubSubCategoryModel = mongoose.models.subsubcategories || mongoose.model('subsubcategories', subsubcategorySchema)
export default SubSubCategoryModel;