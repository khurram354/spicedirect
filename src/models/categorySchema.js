import mongoose from "mongoose";

const categorySchema = new mongoose.Schema({
    name: { type: String, required: true, trim: true, unique: true },
}, {
    collection: "inventoryCategories",
    versionKey: false,
});
const InventoryCategory = mongoose.models.InventoryCategory || mongoose.model('InventoryCategory', categorySchema);
export default InventoryCategory;
