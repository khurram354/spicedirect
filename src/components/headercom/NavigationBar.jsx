'use client';
import { GiHamburgerMenu } from "react-icons/gi";
import { FaAngleRight } from "react-icons/fa6";
import { RiArrowDownSFill } from "react-icons/ri";
import Link from 'next/link';
import { socialMediaIcons, MobileMenuItem } from "./MobileMenuItem";
import { useState } from "react";
import { useRouter } from "next/navigation";

const NavigationBar = ({ hamBurgerHandler, openDropDownHandler, closeDropDownHandler, dropdown, dropdownOpen }) => {
  const [cateId, setCateId] = useState("628a6c3bb6b05596c6bf7799");
  const [subCateId, setSubCateId] = useState("677d20d40998710461c87a6d");
  const router = useRouter()

  const subCateHandler = (id) => { setSubCateId(id); }
  const cateHandler = (id) => { setCateId(id) }
  const catProHandler = (id) => { closeDropDownHandler(); router.push(`/product?cate_id=${id}`) }
  const subcatProHandler = (id) => { closeDropDownHandler(); router.push(`/product?sub_cate_id=${id}`) }
  const subsubcatProHandler = (id) => { closeDropDownHandler(); router.push(`/product?subsub_cate_id=${id}`) }
  const cuisineHandler = (id) => {closeDropDownHandler(); router.push(id)}
  return (
    <nav className="">
      <div className="flex items-center justify-center bg-dangercolor h-[40px] shadow-md">
        <div className='md:hidden sm:block w-full'>
          <div className='flex justify-between items-center px-4'>
            < GiHamburgerMenu className='text-white text-2xl' onClick={hamBurgerHandler} />
            <div className='flex justify-center items-center'>
              {
                socialMediaIcons && socialMediaIcons.map((item, index) => (
                  <span className='text-warningcolor text-xl mr-1' key={index}>{item.icon}</span>
                ))
              }
            </div>
          </div>
        </div>
        <div className="flex items-center justify-center sm:items-stretch md:justify-start">
          <div className="hidden sm:ml-6 md:block">
            <div className="flex justify-center items-center">
              <div className=" relative z-20">
                <div className='border-r-2 border-white-500 text-white font-medium bg-warningcolor text-sm h-[40px] flex justify-center items-center px-4 hover:bg-white hover:text-warningcolor shadow-md cursor-pointer transform transition duration-300' onMouseEnter={(e) => openDropDownHandler('categories')}>
                  <span>CATEGORIES</span>
                  <span>
                    <RiArrowDownSFill className='text-3xl relative bottom-1 left-2' />
                  </span>
                </div>
                <div className={`absolute top-10 left-0 text-gray-500 border border-gray-300 bg-gray-100 shadow-md w-[800px] font-light text-[13px] ${dropdownOpen === "categories" ? "block" : "hidden"}`} onMouseLeave={closeDropDownHandler}>
                  <div className="grid grid-cols-3 gap-4 p-4">
                    <div className="flex flex-col">
                      {dropdown && dropdown.map((cate, index) => (
                        <div key={index} className="border-b-2 w-[180px] leading-7 flex justify-between items-center px-2 h-8">
                          <div onClick={(e) => catProHandler(cate._id)} className='cursor-pointer hover:text-secondary hover:font-medium'>
                            <span>{cate.name}</span>
                          </div>
                          <span className="cursor-pointer" onClick={(e) => cateHandler(cate._id)}><FaAngleRight /></span>
                        </div>
                      ))}
                    </div>

                    {/* Subcategories Column */}
                    <div className="flex flex-col">
                      {dropdown && dropdown.map((cate, index) => (
                        cate._id === cateId && cate.subcategories && cate.subcategories.length > 0 ? (
                          <div key={index} className="flex flex-col">
                            {cate.subcategories.map((subcate, subIndex) => (
                              <div key={subIndex} className="border-b-2 w-[250px] leading-7 flex justify-between items-center px-2 h-8">
                                <div onClick={(e) => subcatProHandler(subcate._id)} className="hover:text-secondary cursor-pointer hover:font-medium"><span>{subcate.name}</span></div>

                                <span className="cursor-pointer" onClick={(e) => subCateHandler(subcate._id)}><FaAngleRight /></span>
                              </div>
                            ))}
                          </div>
                        ) : null
                      ))}
                    </div>

                    {/* Sub-Subcategories Column */}
                    <div className="flex flex-col">
                      {dropdown && dropdown.map((cate, index) => (
                        cate._id === cateId && cate.subcategories && cate.subcategories.length > 0 ? (
                          cate.subcategories.map((subcate, subIndex) => (
                            subcate._id === subCateId && subcate.subsubcategories && subcate.subsubcategories.length > 0 ? (
                              <div key={subIndex} className="flex flex-col">
                                {subcate.subsubcategories.map((subsub, subsubIndex) => (
                                  <div key={subsubIndex} className="border-b-2 w-[180px] leading-7 flex justify-between items-center px-2 h-8">
                                    <div onClick={(e) => subsubcatProHandler(subsub._id)} className="hover:text-secondary cursor-pointer hover:font-medium"><span >{subsub.name}</span></div>

                                  </div>
                                ))}
                              </div>
                            ) : null
                          ))
                        ) : null
                      ))}
                    </div>
                  </div>
                </div>
              </div>
              <div className='relative z-30'>
                <div className="border-r-2 border-white-500 text-white font-medium bg-warningcolor text-sm h-[40px] flex justify-center items-center px-4 hover:bg-white hover:text-warningcolor transform transition duration-300 cursor-pointer" onMouseEnter={(e) => openDropDownHandler("cuisines")}>
                  <span>SHOP BY CUISINE</span>
                  <span>
                    <RiArrowDownSFill className='text-3xl relative bottom-1 left-2' />
                  </span>
                </div>
                <div className={`absolute top-10 left-0 text-gray-500 border border-gray-300 px-5 bg-gray-100 shadow-md w-[185px] font-light text-[13px] ${dropdownOpen === "cuisines" ? "block" : "hidden"}`} onMouseLeave={closeDropDownHandler}>
                  <div className=' p-4 leading-7'>
                    {
                      MobileMenuItem && MobileMenuItem[0].subItems.map((cate, index) => (
                        <div key={index} onClick={(e) => cuisineHandler(cate.link)} className='cursor-pointer hover:text-secondary hover:font-medium flex items-center justify-between'>
                          <span>{cate.name}</span>
                          <span><FaAngleRight /></span>
                        </div>
                      ))
                    }
                  </div>
                </div>
              </div>
              <Link href="/product?offers=seasonal_promotions" className="border-r-2 border-white-500 text-white font-medium bg-warningcolor text-sm h-[40px] flex justify-center items-center px-4 hover:bg-white hover:text-warningcolor transform transition duration-300">PROMOTIONS</Link>
              <Link href="/product?offers=top_selling" className="border-r-2 border-white-500 text-white font-medium bg-warningcolor text-sm h-[40px] flex justify-center items-center px-4 hover:bg-white hover:text-warningcolor transform transition duration-300">TOP SELLINGS</Link>
              <Link href="#" className=" border-white-500 text-white font-medium bg-warningcolor text-sm h-[40px] flex justify-center items-center px-4 hover:bg-white hover:text-warningcolor transform transition duration-300">BRANDS</Link>
            </div>
          </div>
        </div>
      </div>
    </nav>
  )
}

export default NavigationBar