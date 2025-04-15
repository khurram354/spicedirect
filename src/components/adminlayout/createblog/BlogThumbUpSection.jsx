'use client';
import Image from "next/image";
const BlogThumbUpSection = ({ formData, handleInputChange, createBlogHandler, error, showspOfferImage, loading, type, showthumpsupImage }) => {
  return (
    <section className="mt-4">
      <div>
        <h4 className="p-2 text-xl font-bold text-gray-600">Special Offer Section</h4>
        <div className="flex">
          <div className="w-4/6">
            <h4 className="text-gray-600 font-medium">Special Offer Heading</h4>
            <div className="">
              <input type="text"
                required={true}
                placeholder="Main title on Top of Paragraph"
                className="w-full p-2 text-sm text-gray-500 focus:outline-secondary border-2"
                value={formData.spOfferMainTitle}
                onChange={(e) => handleInputChange('spOfferMainTitle', e.target.value)}
              />
              <div className="text-red-500 text-xs">{error && error.spOfferMainTitle}</div>
            </div>
          </div>
          <div className="w-2/6">
            <h4 className="p-2">Select Image for banner Section</h4>
            <div className="p-2">
              <div className="w-full text-sm text-gray-400 border-2 h-20 p-2 flex">
                <div className="w-16 h-16">
                  <Image
                    src={showspOfferImage || `/logo/spicedirect_logo.png`}
                    width={200}
                    height={200}
                    alt="select banner image"
                    className="object-contain w-full h-full"
                  />
                </div>
                <span className={`${showspOfferImage ? "hidden" : "block"}`}>No Image Selected Yet</span>
              </div>
              <input type="file"
                required={true}
                className="my-2"
                onChange={(e) => handleInputChange('spOfferImage', e.target.files[0])}
              />
              <div className="text-red-500 text-xs">{error && error.spOfferImage}</div>
            </div>
          </div>
        </div>
        <div>
          <textarea
            required={true}
            placeholder="special offer under main paragraph"
            className="p-2 text-sm text-gray-500 focus:outline-secondary border-2 w-full shadow-sm"
            rows={5}
            value={formData.spOfferMainPara}
            onChange={(e) => handleInputChange('spOfferMainPara', e.target.value)}
          ></textarea>
          <div className="text-red-500 text-xs">{error && error.spOfferMainPara}</div>
        </div>
      </div>
      <div>
        <div>
          <h4 className="p-2 text-lg font-medium text-gray-600">Thumps Up Banner</h4>
        </div>
        <div className="w-full text-sm text-gray-400 border-2 h-20 p-2 flex">
          <div className="w-16 h-16">
            <Image
              src={showthumpsupImage || `/logo/spicedirect_logo.png`}
              width={200}
              height={200}
              alt="select banner image"
              className="object-contain w-full h-full"
            />
          </div>
          <span className={`${showthumpsupImage ? "hidden" : "block"}`}>No Image Selected Yet</span>

        </div>
        <div>
          <input type="file"
            required={true}
            className=""
            onChange={(e) => handleInputChange('thumpsUpImage', e.target.files[0])}
          />
          <div className="text-red-500 text-xs">{error && error.thumpsUpImage}</div>
        </div>
      </div>
      <div className="my-4">
        <button className="bg-secondary w-full p-2 text-white text-xl font-medium hover:text-secondary hover:bg-white border-2" onClick={createBlogHandler} disabled={loading}>{loading ? 'wait ...Creating New Blog' : type === "editBlog" ? "Edit Blog" : 'Create Blog'}</button>
      </div>
    </section>
  )
}

export default BlogThumbUpSection