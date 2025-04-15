import mongoose from "mongoose";
const bannersSchema = new mongoose.Schema({
    name: {
        type: String, required: true, trim: true, unique: true,
        enum: [
            'seasonal_promotions',
            'trending_products',
            'special_offers',
            'new_arrivals',
            'top_selling'
        ],
    },
    image_name: [{
        type: String,
        validate: {
            validator: function (value) {
                return value.length <= 5;
            },
            message: "You can only upload up to 5 images"
        },
    }],
    date: { type: Date, default: Date.now() },
}, {
    collection: "banners",
    versionKey: false,
});
const BannersModel = mongoose.models.banners || mongoose.model('banners', bannersSchema);
export default BannersModel;
