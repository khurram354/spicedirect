import mongoose from "mongoose";
const homesliderSchema = new mongoose.Schema({   
            'device':{type:String,trim:true},
            'imageurl':{type:String,trim:true}   
},{
    collection:'homeslider',
    versionKey:false,
});
const HomeSliderModel = mongoose.models.homeslider || mongoose.model("homeslider", homesliderSchema);
export default HomeSliderModel;