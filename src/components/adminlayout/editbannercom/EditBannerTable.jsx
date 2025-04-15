'use client';
import { TbEdit } from "react-icons/tb";
import Link from 'next/link';
import { useState } from "react";
import Image from "next/image";

const EditBannerTable = ({banners, type}) => {
    const [bannerdata, setBannerdata] = useState(banners || []); 
  return (
    <>
      <div className="w-3/4 px-4 mx-auto mt-6 relative left-24 top-5">
        <div className="overflow-hidden rounded-lg shadow-xs">
          <div className="w-full overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="text-xs font-semibold tracking-wide text-left text-gray-500 uppercase border-b dark:border-gray-700 bg-gray-50 dark:text-gray-400 dark:bg-gray-800">
                  <th className="px-1 py-3 w-28">{type === "cuisine" ? 'Cuisine ID' : 'Banner ID'}</th>
                  <th className="px-1 py-3 w-40">{type === "cuisine" ? "Cuisine Name" : "Banner Name"}</th>
                  <th className="px-1 py-3 w-32 text-center">{type === "cuisine" ? "Add Cuisine Product" : "Add Banner Products"}</th>
                  <th className="px-1 py-3 w-40 text-center">{type === 'cuisine' ? 'Update Cuisine Images' : 'Update Banner Images'}</th>
                </tr>
              </thead>
              {bannerdata && bannerdata.map((ban, index) => {
                return <tbody className="bg-white divide-y dark:divide-gray-700 dark:bg-gray-800" key={index}>
                  <tr className="bg-gray-50 dark:bg-gray-800 hover:bg-gray-100 dark:hover:bg-gray-900 text-gray-700 dark:text-gray-400">
                    <td className="px-1 py-3 text-sm w-28">{`${type === 'cuisine' ? 'CSN' : 'BAN'}_${index}`}</td>
                    <td className="px-1 py-3 text-sm w-40">{ban.name}</td>        
                    <td className="px-1 py-3 text-sm w-32 h-20 flex justify-center items-center relative">
                        <div className="absolute right-20 top-10">
                        </div>
                        <Link href={'/admin/addcategories'} className="cursor-pointer">
                        <TbEdit className='w-5 h-5 text-secondary'/>
                      </Link>                                          
                    </td>
                    <td className="px-1 py-3 text-sm w-40 relative">
                      <div className="flex justify-center items-center space-x-2">
                        <span className="relative w-20 h-20 overflow-hidden">
                          <Image
                          src={`${type === 'cuisine' ? '/images/cuisine' : '/images/banners'}/${ban.image_name[0]}`}
                          width={100}
                          height={100}
                          alt="Loading..."
                          className="object-cover w-full h-full"
                        />
                        </span>                     
                      <Link href={`${type === 'cuisine' ? '/admin/editcuisines' : '/admin/editbanners'}/${ban._id}`}><TbEdit className='w-5 h-5 text-secondary' /></Link>
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

export default EditBannerTable