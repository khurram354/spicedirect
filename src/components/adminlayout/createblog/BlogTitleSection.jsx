'use client';
import Image from "next/image";
const BlogTitleSection = ({ formData, handleInputChange, uploadImageHandler, error, showMainTitleImage }) => {
    return (
        <>
            <div>
                <div>
                    <h4 className="font-medium text-lg p-2 text-gray-600">Home Page Blog Title</h4>
                    <div className="">
                        <textarea
                            required={true}
                            placeholder="Please Enter Blog Title for Home Page"
                            className="w-full border-2 focus:outline-secondary p-2 text-gray-500 "
                            rows={2}
                            value={formData.homeBlogTitle}
                            onChange={(e) => handleInputChange("homeBlogTitle", e.target.value)}
                        />
                        <div className="text-red-500 text-xs">{error && error.homeBlogTitle}</div>
                    </div>
                </div>
                <div>
                    <h4 className="font-medium text-lg p-2 text-gray-600">Home Page Blog Description</h4>
                    <div className="">
                        <textarea
                            required={true}
                            placeholder="Please Enter short descriotion around 15 to 20 words"
                            className="w-full border-2 focus:outline-secondary p-2 text-gray-500 "
                            rows={2}
                            value={formData.homeBlogDesc}
                            onChange={(e) => handleInputChange("homeBlogDesc", e.target.value)}
                        />
                        <div className="text-red-500 text-xs">{error && error.homeBlogDesc}</div>
                    </div>
                </div>
            </div>
            <div className="flex">
                <div className="w-4/6">
                    <div>
                        <h4 className="font-medium text-lg p-2 text-gray-600">Main Title</h4>
                        <div className="">
                            <textarea
                                required={true}
                                placeholder="Please Enter Main heading"
                                className="w-full border-2 focus:outline-secondary p-2 text-gray-500 "
                                rows={2}
                                value={formData.mainTitle}
                                onChange={(e) => handleInputChange("mainTitle", e.target.value)}
                            />
                            <div className="text-red-500 text-xs">{error && error.mainTitle}</div>
                        </div>
                    </div>
                    <div className="">
                        <h4 className="font-medium text-lg p-2 text-gray-600">Sub Title</h4>
                        <div className="">
                            <textarea
                                required={true}
                                placeholder="Please Enter Sub heading"
                                className="w-full border-2 focus:outline-secondary p-2 text-gray-500"
                                rows={2}
                                value={formData.subTitle}
                                onChange={(e) => handleInputChange('subTitle', e.target.value)}
                            />
                            <div className="text-red-500 text-xs">{error && error.subTitle}</div>
                        </div>
                    </div>
                </div>
                <div className="w-2/6 p-2">
                    <h4 className="font-medium text-gray-600 pb-6 pt-4 pl-2">Please Select Image for Main Title</h4>

                    <div className="w-full p-2 border-2 flex justify-center items-center text-sm text-gray-400 h-20">
                        <div className="w-16 h-16">
                            <Image
                                src={showMainTitleImage || `/logo/spicedirect_logo.png`}
                                width={200}
                                height={200}
                                alt="image of banner"
                                className="object-contain w-full h-full"
                            />
                        </div>
                        <h5 className={`${showMainTitleImage ? '' : 'No Image Choosen Yet'}`}></h5>
                    </div>
                    <input type="file"
                        required={true}
                        onChange={(e) => uploadImageHandler('mainTitleImage', e.target.files[0])}
                        className="p-2"
                    />
                    <div className="text-red-500 text-xs">{error && error.mainTitleImage}</div>
                </div>
            </div>
            <div>
                <h4 className="p-2 text-lg font-medium text-gray-600">Main Title Paragraph</h4>
                <div className="">
                    <textarea
                        required={true}
                        placeholder="Please Enter Main Para here"
                        className="w-full p-2 focus:outline-none border-2 text-gray-500 text-sm"
                        rows={5}
                        value={formData.mainTitleParaFirst}
                        onChange={(e) => handleInputChange('mainTitleParaFirst', e.target.value)}
                    ></textarea>
                    <div className="text-red-500 text-xs">{error && error.mainTitleParaFirst}</div>
                </div>
                <div>
                    <textarea
                        required={true}
                        placeholder="Second paragraph in main section"
                        rows={5}
                        className="focus:outline-none w-full text-sm text-gray-500 border-2 p-2"
                        value={formData.mainTitleParaSecond}
                        onChange={(e) => handleInputChange("mainTitleParaSecond", e.target.value)}
                    ></textarea>
                    <div className="text-red-500 text-xs">{error && error.mainTitleParaSecond}</div>
                </div>
            </div>
        </>
    )
}

export default BlogTitleSection