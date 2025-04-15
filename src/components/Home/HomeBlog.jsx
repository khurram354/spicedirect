'use client';
import Image from "next/image"
import Link from "next/link";
const HomeBlog = ({ blogs }) => {
    return (
        <section>
            <div className='grid xl:grid-cols-5 lg:grid-cols-4 md:grid-cols-3 md:gap-5 sm:gap-1 md:px-2 sm:w-11/12 md:w-5/6 m-auto sm:grid-cols-2'>
                {
                    blogs && blogs.map((blog, index) => (
                        <Link href={`/blog/${blog._id}`} className="cursor-pointer rounded-sm transition-all transform hover:shadow-sm" key={index}>
                            <div className='bg-gray-100 md:h-44 sm:h-36'>
                                <Image
                                src={`/images/blogs/${blog.mainTitleImage}`}
                                width={500}
                                height={500}
                                alt="Loading Image"
                                className="object-cover w-full h-full bg-white rounded-t-md p-1"
                                />
                            </div>
                            <div className='sm:h-40 md:h-36 overflow-hidden bg-white rounded-b-md px-1'>
                                <h4 className='font-bold text-secondary md:text-md uppercase sm:text-sm'>{blog?.homeBlogTitle.slice(0,35)}</h4>
                                <p className=' sm:text-[15px] font-medium text-gray-500 sm:h-24 overflow-hidden md:py-2 sm:py-1'>{blog.homeBlogDesc.slice(0,70)} ...</p>
                                <span className="text-blue-600 sm:text-sm font-medium border-b-2 border-blue-600">Learn more</span>
                            </div>
                        </Link>
                    ))
                }
            </div>
        </section>
    )
}
export default HomeBlog