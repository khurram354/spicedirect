'use client';
import { FaLocationDot, FaPhoneFlip, FaClock, FaEnvelope } from "react-icons/fa6";
import Link from "next/link";

const FindUs = () => {
  return (
    <section className={`sm:w-11/12 md:w-5/6 m-auto mt-8 py-5 bg-green-100 rounded-sm shadow-md px-6`}>
      <div className="flex flex-col lg:flex-row items-center justify-between space-y-5 md:space-y-0">
        <div className="flex items-center space-x-3">
          <span className="text-3xl text-blue-500">
            <FaLocationDot />
          </span>
          <div>
            <h6 className="text-lg font-semibold text-secondary">Find Us on the Map</h6>
            <p className="text-sm text-gray-700">Click below to see our location</p>
            <Link href={`/customer_service`} className="text-blue-600 hover:text-blue-800 text-sm">View on Google Maps</Link>
          </div>
        </div>
        <div className="flex items-center space-x-3">
          <span className="text-3xl text-secondary">
            <FaClock />
          </span>
          <div>
            <h6 className="text-lg font-semibold text-secondary">Working Hours</h6>
            <p className="text-sm text-gray-700">Mon - Fri: 9 AM - 6 PM</p>
            <p className="text-sm text-gray-700">Sat - Sun: Closed</p>
          </div>
        </div>
        <div className="flex items-center space-x-3">
          <span className="text-3xl text-orange-500">
            <FaPhoneFlip />
          </span>
          <div>
            <h6 className="text-lg font-semibold text-secondary">Call Us</h6>
            <Link href={'tel:01415303120'} className="text-sm text-gray-600">0141 530 3120</Link>
          </div>
        </div>
        <Link  href={'mailto:Orders@spicedirectwholesale.co.uk'} className="flex space-x-3  flex-col items-center">
          <span className="text-3xl text-dangercolor flex">
            <FaEnvelope />
            <h6 className="text-lg font-semibold text-secondary sm:text-center px-2">Email Us</h6>
          </span>
          <div>
            <div className="text-sm text-gray-700">Orders@spicedirectwholesale.co.uk</div>
          </div>
        </Link>
      </div>
    </section>
  )
}
export default FindUs