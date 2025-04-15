import mongoose from "mongoose";

const cuisineSchema = new mongoose.Schema({
    name:       {type: String, required: true, trim: true, unique: true,
        enum:{
           values: ['English','Chinese','Italian','Indian'],
           message: 'Cuisine must be one of: Italian, Chinese, Indian, English'
        }
    },
    image_name: {
        type: [String],
        validate: {
            validator:function(value){
                return value.length <= 5;
            },
            message:"you can upload up to 5 images"
        }
    },
    date: {type: Date, default: Date.now()},
    
},{
    collection: "cuisines",
    versionKey:false,
});
const CuisineModel = mongoose.models.cuisines || mongoose.model('cuisines', cuisineSchema);

export default CuisineModel;
