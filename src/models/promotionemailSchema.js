import mongoose from 'mongoose';
import validator from 'validator';
const promotionemailSchema = new mongoose.Schema({
    email: {
        type:String, required: [true, "Please enter email address"], unique: true,
        validate: {
            validator:validator.isEmail,
            message: "Please enter a valid email address"
        } 
    }
},{
    collection: 'promotionemail',
    versionKey: false,
});
const PromotionModel = mongoose.models.promotionemail || mongoose.model('promotionemail', promotionemailSchema);
export default PromotionModel