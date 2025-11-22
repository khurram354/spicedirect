'use client'
import Image from "next/image"
import { MissionData } from "./MissionData"
const OurMission = () => {
  return (
    <section className="sm:w-11/12 md:w-4/6 mx-auto md:mt-14 sm:mt-8 bg-gray-100 sm:p-2 md:px-6 md:py-12 shadow-xl rounded-md">
        <div>
            {MissionData && MissionData.map((ele,index)=>(
                <div key={index} className="py-4">
                    <h4 className="text-secondary sm:text-xl md:text-2xl md:font-semibold sm:font-bold  pb-2">{ele.heading}</h4>
                    <p className="text-gray-500">{ele.firstpara}</p>
                    <div className={`w-full `}>
                        <Image
                        src={ele.image}
                        alt=""
                        width={1280}
                        height={500}
                        className="bg-blue-200 object-cover w-full h-full mb-4 mt-2"
                        quality={100}
                        />
                    </div>
                    <p className="text-gray-500">{ele.secondpara}</p>
                </div>
            ))}
        </div>



    </section>
  )
}

export default OurMission