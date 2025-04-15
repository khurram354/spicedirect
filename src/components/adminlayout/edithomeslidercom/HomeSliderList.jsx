'use client'
import { MdDelete } from "react-icons/md";
import Image from "next/image";

const HomeSliderList = ({sliderImages, deleteSliderHandler}) => {
  return (
     <section>
                    <div className="w-3/4 px-4 mx-auto mt-6 relative left-24 top-5">
                        <table className="w-full overflow-x-auto">
                            <thead>
                                <tr className="text-xs font-semibold tracking-wide text-left text-gray-500 uppercase border-b dark:border-gray-700 bg-gray-50 dark:text-gray-400 dark:bg-gray-800">
                                    <th className="px-1 py-3 w-16 text-center">Slider Index</th>
                                    <th className="px-1 py-3 w-32 text-center">Device Type</th>
                                    <th className="px-1 py-3 w-32 text-center">Slider Images</th>
                                    <th className="px-1 py-3 w-40 pl-10">Action</th>
                                </tr>
                            </thead>
                            {sliderImages && sliderImages.map((slider, index) => {
                                return <tbody className="bg-white divide-y dark:divide-gray-700 dark:bg-gray-800" key={index}>
                                    <tr className="bg-gray-50 dark:bg-gray-800 hover:bg-gray-100 dark:hover:bg-gray-900 text-gray-700 dark:text-gray-400">
                                        <td className="px-1 py-3 text-sm w-16 text-center">{index}</td>
                                        <td className="px-1 py-3 text-sm w-32 text-center">{slider.device}</td>
                                        <td className="px-1 py-3 text-sm w-40 relative ">
                                            <div className="flex justify-center items-center space-x-2">
                                                <span className="relative w-20 h-20 overflow-hidden">
                                                    <Image
                                                        src={`${'/images/homeslider'}/${slider.imageurl}`}
                                                        width={100}
                                                        height={100}
                                                        alt="Loading..."
                                                        className="object-cover w-full h-full"
                                                    />
                                                </span>
                                            </div>
                                        </td>
                                        <td className="px-1 py-3 text-sm w-32 h-20 flex justify-center items-center relative">
                                            <div className="absolute right-20 top-10">
                                            </div>
                                            <MdDelete className="text-3xl text-red-500 cursor-pointer" onClick={() => deleteSliderHandler(slider._id)}/>
                                        </td>
                                    </tr>
                                </tbody>
                            })}
                        </table>
                    </div>
                </section>
  )
}

export default HomeSliderList