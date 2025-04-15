'use client';
import Image from "next/image";
const BlogSellSection = ({ formData, handleInputChange, uploadMulitipleImage, error, fiveimages, uploadFiveTitleImage, fiveCircleTitleImages }) => {
    return (
        <section>
            <div>
                <h4 className="text-gray-600 text-lg font-medium p-2">What Do We Sell Section</h4>
                <div>
                    <textarea
                        required={true}
                        placeholder="first paragraph after what do we sell section"
                        rows={5}
                        className="focus:outline-none w-full text-sm text-gray-500 border-2 p-2"
                        value={formData.sellSectionParaFirst}
                        onChange={(e) => handleInputChange('sellSectionParaFirst', e.target.value)}
                    ></textarea>
                    <div className="text-red-500 text-xs">{error && error.sellSectionParaFirst}</div>
                </div>
                <div>
                    <textarea
                        required={true}
                        placeholder="Second paragraph after what do we sell section"
                        rows={5}
                        className="focus:outline-none w-full text-sm text-gray-500 border-2 p-2"
                        value={formData.sellSectionParaSecond}
                        onChange={(e) => handleInputChange('sellSectionParaSecond', e.target.value)}
                    ></textarea>
                    <div className="text-red-500 text-xs">{error && error.sellSectionParaSecond}</div>
                </div>
                <div className="border-2 h-32">
                    <div className="flex justify-center pt-2 overflow-hidden">{

                        fiveimages?.map((file, index) => (
                            <div key={index} className="w-20 h-20">
                                <Image
                                    src={file || null}
                                    width={200}
                                    height={200}
                                    alt=""
                                    className="object-cover w-20 h-20"
                                />
                            </div>
                        )
                        )
                    }</div>
                    <input type="file"
                        multiple
                        className="p-2 bg-gray-300 w-auto hidden"
                        disabled={formData.fileLimit}
                        onChange={uploadMulitipleImage}
                        id="fileUpload"
                    />
                    <label
                        htmlFor="fileUpload"
                        className={`${formData.fileLimit ? "disabled" : ""} flex justify-center pt-2 cursor-pointer `}
                    ><span className="bg-secondary p-2 text-white rounded-sm">Upload Fives Images</span></label>
                    <div className="text-red-500 text-xs">{error && error.fiveCircleImage}</div>
                </div>
                <div className="my-2">
                    <textarea
                        required={true}
                        placeholder="Third paragraph after what do we sell section"
                        rows={5}
                        className="focus:outline-none w-full text-sm text-gray-500 border-2 p-2"
                        value={formData.sellSectionParaThird}
                        onChange={(e) => handleInputChange('sellSectionParaThird', e.target.value)}
                    ></textarea>
                    <div className="text-red-500 text-xs">{error && error.sellSectionParaThird}</div>
                </div>
                <div>
                    <h4 className="text-lg font-medium">Five Title In a Circle Section</h4>
                    <div className="border-2 h-32">
                        <div className="flex justify-center pt-2 overflow-hidden">{

                            fiveCircleTitleImages?.map((file, index) => (
                                <div key={index} className="w-20 h-20">
                                    <Image
                                        src={file || null}
                                        width={200}
                                        height={200}
                                        alt=""
                                        className="object-cover w-20 h-20"
                                    />
                                </div>
                            )
                            )
                        }</div>
                        <input type="file"
                            multiple
                            className="p-2 bg-gray-300 w-auto hidden"
                            disabled={formData.titleLimit}
                            onChange={uploadFiveTitleImage}
                            id="fileTitle"
                        />
                        <label
                            htmlFor="fileTitle"
                            className={`${formData.titleLimit ? "disabled" : ""} flex justify-center pt-2 cursor-pointer `}
                        ><span className="bg-secondary p-2 text-white rounded-sm">Upload Fives Title In a Circle</span></label>
                        <div className="text-red-500 text-xs">{error && error.fiveCircleTitle}</div>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default BlogSellSection