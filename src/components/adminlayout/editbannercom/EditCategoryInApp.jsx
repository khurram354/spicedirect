'use client';
import { TbEdit } from "react-icons/tb";
import Link from 'next/link';
import { useState } from "react";
import Image from "next/image";
import call_api from "@/helper/Api";

const EditCategoryInApp = ({allcategories}) => {
    const [categorydata, setCategorydata] = useState(allcategories || []); 

    const fetchCategories = async () => {
      const response = await call_api.getallcategories();
      return setCategorydata(response.categories);
    }
    const handleFileUpload = async(e,categoryid) => {
      const file = e.target.files[0];
      if (!file) return;
      const formData = new FormData();
      formData.append("image", file);
      formData.append("categoryId",categoryid)
      try {
        const resp = await call_api.uploadappcategoryimages(formData);
        if(resp.success){fetchCategories()}else{alert("network error, cannot upload image")}
      } catch (error) {
        console.log('error',error)
      }
    }
  return (
    <>
      <div className="w-3/4 px-4 mx-auto mt-6 relative left-24 top-5">
        <div className="overflow-hidden rounded-lg shadow-xs">
          <div className="w-full overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="text-xs font-semibold tracking-wide text-left text-gray-500 uppercase border-b dark:border-gray-700 bg-gray-50 dark:text-gray-400 dark:bg-gray-800">
                  <th className="px-1 py-3 w-28">Category ID</th>
                  <th className="px-1 py-3 w-40">Category Name</th>
                  <th className="px-1 py-3 w-40 text-center">Update Image</th>
                </tr>
              </thead>
              {categorydata && categorydata.map((cate, index) => {
                return <tbody className="bg-white divide-y dark:divide-gray-700 dark:bg-gray-800" key={index}>
                  <tr className="bg-gray-50 dark:bg-gray-800 hover:bg-gray-100 dark:hover:bg-gray-900 text-gray-700 dark:text-gray-400">
                    <td className="px-1 py-3 text-sm w-28">{`Cate_${index}`}</td>
                    <td className="px-1 py-3 text-sm w-40">{cate.name}</td>        
                   
                    <td className="px-1 py-3 text-sm w-40 relative">
                      <div className="flex justify-center items-center space-x-2">
                        <span className="relative w-20 h-20 overflow-hidden">
                          <Image
                          src={`${process.env.NEXT_PUBLIC_AWS_URL}/${cate.banner}`}
                          width={100}
                          height={100}
                          alt="Loading..."
                          className="object-cover w-full h-full"
                        />
                        </span>                     
                      <input
                      type="file"
                      id={`fileupload-${index}`} 
                      className="hidden"
                      multiple
                      onChange={(e) => handleFileUpload(e, cate._id)}
                      />
                        <label htmlFor={`fileupload-${index}`} className="cursor-pointer"><TbEdit className='w-5 h-5 text-secondary' /></label>
                      </div>
                    </td>
                  </tr>
                </tbody>
              })}
            </table>
          </div>
        </div>
      </div>
    </>
  )
}

export default EditCategoryInApp