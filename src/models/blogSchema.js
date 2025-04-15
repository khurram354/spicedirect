import mongoose from "mongoose";

const blogSchema = new mongoose.Schema({
    homeBlogTitle: { type: String, trim: true, required: [true, "Please Enter Blog Title"], minlength: [5, 'Title must be at least 5 characters long'], maxlength: [50, 'Title must be at most 50 characters long'] },
    homeBlogDesc: { type: String, trim: true, required: [true, 'Please Enter Blog Description'] },
    mainTitle: { type: String, trim: true, required: [true, "Please Enter Main Title"] },
    subTitle: { type: String, trim: true, required: [true, "Please Enter Sub Title"] },
    mainTitleParaFirst: { type: String, trim: true, required: [true, "Please Enter Main Paragraph Title"] },
    mainTitleParaSecond: { type: String, trim: true, required: [true, "Please add Second Paragraph"] },
    sellSectionParaFirst: { type: String, trim: true, required: [true, "Please Add First para in Sell Section"] },
    sellSectionParaSecond: { type: String, trim: true, required: [true, "Please Add Second Para in Sell Section"] },
    sellSectionParaThird: { type: String, trim: true, required: [true, "Please Add third Para in Sell Section"] },
    spOfferMainTitle: { type: String, trim: true, required: [true, "Please Add Special Offer Main Title"] },
    spOfferMainPara: { type: String, trim: true, required: [true, "Please Add Special Offer Main Para"] },
    fiveCircleTitle: {
        type: [String],
        default: ['', '', '', '', ''],
        validate: [array => array.length === 5, 'There must be exactly five circle title images']
    },
    mainTitleImage: { type: String, required: true },
    spOfferImage: { type: String, required: true },
    thumpsUpImage: { type: String, required: true },
    fiveCircleImage: {
        type: [String],
        default: ['', '', '', '', ''],
        validate: [array => array.length === 5, 'There must be exactly five circle images']
    }

}, {
    collection: "blogs",
    versionKey: false,
});
const BlogModel = mongoose.models.blogs || mongoose.model('blogs', blogSchema);

export default BlogModel;
