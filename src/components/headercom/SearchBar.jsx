'use client'
import { useState, useEffect } from 'react';
import Image from 'next/image';
import { FaPhone, FaWhatsappSquare, FaSearch } from "react-icons/fa";
import { FaEnvelope } from "react-icons/fa6";
import { useAppDispatch } from '@/lib/redux/hooks';
import { addSearch } from '@/lib/redux/features/searchSlice';
import { useRouter } from 'next/navigation';
import { socialMediaIcons } from './MobileMenuItem';
import Link from 'next/link';

const SearchBar = ({ closeDropDownHandler }) => {
  const [searchValue, setSearchValue] = useState("");
  const [windoWidth, setWindowWidth] = useState(0);
  const router = useRouter();
  const dispatch = useAppDispatch();
  const handleKeyDown = (e) => {
    dispatch(addSearch(searchValue));
  }

  useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth);
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [])

  return (
    <section className=''>
      <div className='bg-primary flex'>
        <Link className='w-1/6 bg-green-900 relative md:block sm:hidden' href={`/`}>
          <Image
            src="/logo/spicedirect_logo.png"
            width={300}
            height={300}
            alt="Spice Direct Logo"
            className='object-cover w-full h-full'
          />
        </Link>
        <div className='md:w-4/6 pt-2 sm:w-full' onMouseEnter={closeDropDownHandler}>
          <div className=" sm:py-2 m-auto flex flex-col justify-center items-center relative sm:w-5/6 ">
            <input type="text"
              value={searchValue}
              onChange={(e) => setSearchValue(e.target.value)}
              onKeyUp={handleKeyDown}
              onFocus={() => {
                if (window.location.pathname !== '/product/search') {
                  router.push('/product/search');
                }
              }}
              placeholder="Search Product Press Enter"
              className="ring-4 w-full rounded-sm lg:px-10 sm:px-4 sm:text-base lg:py-3 sm:py-2 text-gray-600 focus:outline-dangercolor"
            />
            <FaSearch className="absolute lg:top-6 lg:right-32 text-gray-400 text-xl sm:top-5 md:right-20 sm:right-10" />
            <div className='flex justify-between sm:w-[95%] lg:w-full'>
              <div className='sm:w-[49%] md:w-auto'>
                <p className='text-white mt-4 md:text-sm sm:text-xs sm:pb-2'>
                  {windoWidth > 0 && (windoWidth < 550 ? 'Contact Us' : 'Contact Us')}
                </p>
                <Link href={'tel:01415303120'} className='flex bg-red-500 justify-center py-2 shadow-md px-3'>
                  <span className='sm:pr-2 xl:pr-4'><FaPhone className='text-warningcolor text-xl' /></span>
                  <span className='text-white cursor-pointer sm:text-sm lg:text-base'>01415303120</span>
                </Link>
              </div>
              <div className='sm:hidden lg:block md:w-auto'>
                <p className='text-white mt-4 md:text-sm sm:text-xs pb-2 text-center'>
                  Order Emails To Enquiries
                </p>
                <Link href={'mailto:Orders@spicedirectwholesale.co.uk'} 
                onClick={()=>{
                  if(!window.navigator.userAgent.includes("Android") && !window.navigator.userAgent.includes("iPhone")){
                    setTimeout(()=>{
                      window.open("https://mail.google.com/mail/?view=cm&to=Orders@spicedirectwholesale.co.uk","_blank")
                    },500)
                  }
                }}
                className='flex bg-red-500 justify-center p-2 shadow-md'>
                  <span className='pr-2'><FaEnvelope className='text-warningcolor text-xl' /></span>
                  <span className='text-white cursor-pointer sm:text-sm lg:text-base'>Orders@spicedirectwholesale.co.uk</span>
                </Link>
              </div>
              <div className='sm:w-[49%] md:w-auto'>
                <p className='text-white mt-4 md:text-sm sm:text-xs pb-2'>
                  Contact Us on Whatsapp
                </p>
                <Link href={'https://wa.me/00447751980423'} className='flex bg-red-500 justify-center p-2 shadow-md'>
                  <span className='pr-2'><FaWhatsappSquare className='text-warningcolor text-xl' /></span>
                  <span className='text-white cursor-pointer sm:text-sm lg:text-base'>07751980423</span>
                </Link>
              </div>
            </div>
            <div className='sm:block lg:hidden md:w-auto'>
              <p className='text-white mt-4 md:text-sm sm:text-xs pb-2 text-center'>
                Order Emails To Enquiries
              </p>
              <Link href={'mailto:Orders@spicedirectwholesale.co.uk'} className='flex bg-red-500 justify-center p-2 shadow-md'>
                <span className='pr-2'><FaEnvelope className='text-warningcolor text-xl' /></span>
                <span className='text-white cursor-pointer sm:text-sm lg:text-base'>Orders@spicedirectwholesale.co.uk</span>
              </Link>
            </div>
          </div>
        </div>
        <div className='bg-red-600 sm:w-1/6 md:block sm:hidden'>
          <p className='text-white text-center mt-4 text-base'>Follow Us</p>
          <div className='flex justify-center items-center'>
            {
              socialMediaIcons && socialMediaIcons.map((item, index) => (
                <span className='text-warningcolor text-xl mr-1' key={index}>{item.icon}</span>
              ))
            }
          </div>
          <div>
            <h6 className='text-white text-sm text-center'>For PickUp Visit Us</h6>
            <p className='text-white lg:text-sm text-center sm:text-xs'>
              Spice Direct Wholesale
            </p>
            <p className='text-white text-xs text-center'>
              225 Bernard Street G403NX, Glasgow UK
            </p>
          </div>
          <div className='mt-2 text-center lg:block sm:hidden'>
            <Link href={'/aboutus'} className='bg-warningcolor rounded-xs text-white text-xs p-1 rounded-sm'>About</Link>
            <Link href={'/customer_service'} className='bg-warningcolor rounded-xs text-white text-xs rounded-sm p-1 ml-1'>Customer Service</Link>
          </div>
          <div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default SearchBar