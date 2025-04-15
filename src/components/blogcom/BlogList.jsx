'use client';
import { TbEdit } from "react-icons/tb";
import Link from 'next/link';
import Image from "next/image";

const BlogList = ({ blogList }) => {
    return (
        <>
            <div className="w-3/4 px-4 mx-auto mt-6 relative left-24 top-5">
                <div className="overflow-hidden rounded-lg shadow-xs">
                    <div className="w-full overflow-x-auto">
                        <table className="w-full">
                            <thead>
                                <tr className="text-xs font-semibold tracking-wide text-left text-gray-500 uppercase border-b dark:border-gray-700 bg-gray-50 dark:text-gray-400 dark:bg-gray-800">
                                    <th className="px-1 py-3 w-16 text-center">Blog Index</th>
                                    <th className="px-1 py-3 w-40 text-center">Blog Title</th>
                                    <th className="px-1 py-3 w-52 text-center">Blog Short Desc</th>
                                    <th className="px-1 py-3 w-40 text-center">Title Image</th>
                                    <th className="px-1 py-3 w-16 text-center">Action</th>
                                </tr>
                            </thead>
                            {blogList && blogList.map((blog, index) => {
                                return <tbody className="bg-white divide-y dark:divide-gray-700 dark:bg-gray-800" key={index}>
                                    <tr className="bg-gray-50 dark:bg-gray-800 hover:bg-gray-100 dark:hover:bg-gray-900 text-gray-700 dark:text-gray-400">
                                        <td className="px-1 py-3 text-sm w-16 text-center">{`SKU_${index}`}</td>
                                        <td className="px-1 py-3 text-sm w-40">{blog.homeBlogTitle}</td>
                                        <td className="px-1 py-3 text-sm w-52 text-center">{blog.homeBlogDesc}</td>
                                        <td className="px-1 py-3 text-sm w-40 relative">
                                            <div className="flex justify-center items-center space-x-2">
                                                <span className="relative w-16 h-16 overflow-hidden">
                                                    <Image
                                                        src={`/images/blogs/${blog.mainTitleImage}`}
                                                        width={100}
                                                        height={100}
                                                        alt="Loading..."
                                                        className="object-cover w-full h-full"
                                                    />
                                                </span>
                                            </div>
                                        </td>
                                        <td className="px-1 py-3 text-sm w-16 h-auto flex justify-center items-center">
                                            <Link href={`/admin/editblog/${blog._id}`}>
                                                <TbEdit className='w-5 h-5 text-secondary cursor-pointer' /></Link>
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

export default BlogList