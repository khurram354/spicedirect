import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    email: {type:String, required:true, trim:true, unique:true},
    password: {type:String, required:true, trim:true, select:false},
    userstatus: {type: String, required:true, trim: true,}
},{
    collection: 'users',
    versionKey:false,
});
const UserModel = mongoose.models.users || mongoose.model("users", userSchema)
export default UserModel;