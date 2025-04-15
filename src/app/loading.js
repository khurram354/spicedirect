'use client'
import Image from "next/image"

const Loading = () => {
  return (
    <div className="w-screen h-screen bg-gray-100 flex justify-center items-center">
      <div className="md:h-80 md:w-96 sm:w-64 sm:h-56">
    <Image
    src={`/logo/waiting.gif`}
    width={300}
    height={300}
    alt="Loading !!!"
    unoptimized
    className="object-cover w-full h-full"
    />
    </div>
    </div>
    
  )
}

export default Loading
