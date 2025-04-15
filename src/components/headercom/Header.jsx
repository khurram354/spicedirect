'use client';
import HeaderNewsBar from './HeaderNewsBar';
import SearchBar from './SearchBar';
import { RiArrowDownSFill } from "react-icons/ri";
import { useState, useEffect } from 'react';
import Image from 'next/image';
import FeatureSection from './FeatureSection';
import { IoClose } from "react-icons/io5";
import call_api from '@/helper/Api';
import { MobileMenuItem } from './MobileMenuItem';
import { useRouter } from 'next/navigation'
import NavigationBar from './NavigationBar';
import Link from 'next/link';

const Header = () => {
  const [dropdown, setDropdown] = useState([]);
  const [dropdownOpen, setDropdownOpen] = useState("");
  const [hamBurgerMenu, setHamBurgerMenu] = useState(false);
  const [itemIds, setItemIds] = useState([]);
  const router = useRouter();

  const openDropDownHandler = (name) => {
    setDropdownOpen(name);
  }
  const closeDropDownHandler = () => {
    setDropdownOpen("");
  }
  const hamBurgerHandler = () => {
    setHamBurgerMenu(!hamBurgerMenu);
  }
  const mobMenuHandler = (id) => {
    setItemIds((previds) => {
      const existIds = previds.includes(id);
      if (existIds) {
        return previds.filter((item) => item !== id);
      } else {
        return [...previds, id];
      }
    })
  }
  const mobileItemHandler = (url) => {
    if (url === '#') return;
    setHamBurgerMenu(!hamBurgerMenu);
    router.push(url);
  }
  const mobileSubMenuItemHandler = (url) => {
    setHamBurgerMenu(!hamBurgerMenu);
    router.push(url);
  }
  useEffect(() => {
    const fetchCategories = async () => {
      const resp = await call_api.getallmenucategories();
      setDropdown(resp.categories);
    };
    fetchCategories();
  }, [])

  return (
    <header>
      <HeaderNewsBar/>
      <div className={`fixed top-0 bg-gray-200 h-full shadow-md z-30 w-4/6 ${hamBurgerMenu ? 'block' : "hidden"}`} >
        <div className='flex justify-end pt-2 pr-4'>
          <IoClose className='text-xl text-gray-500 ' onClick={hamBurgerHandler} />
        </div>
        <div className='flex items-center mt-1 pr-4'>
          <span className='w-12 h-12'>
            <Image
              src={`/logo/spicedirectlognobg.png`}
              width={100}
              height={100}
              alt="Spice Direct Logo"
              className='object-cover w-full h-full'
            />
          </span>
          <Link href={`/`} className='text-sm text-gray-600 ml-2 border-b-2 border-gray-400'>Spice Direct Wholesale</Link>
        </div>
        <div className='pt-4 h-4/5 overflow-scroll'>
          {
            MobileMenuItem && MobileMenuItem.map((item, index) => (
              <ul key={index}>
                <li className='my-2'>
                  <div className='flex items-center px-2 relative'>
                    <span className='text-secondary'>{item.icon}</span>
                    <div onClick={(e) => mobileItemHandler(item.link)} className='text-sm text-gray-600 pl-2 cursor-pointer'>{item.name}</div>
                    <span className={`${item.subItems.length > 0 ? 'block' : 'hidden'} absolute right-14`} onClick={() => mobMenuHandler(item.id)}>< RiArrowDownSFill className='text-2xl text-secondary' /></span>
                  </div>
                  <div className={`${itemIds.includes(item.id) ? "block" : "hidden"}`}>
                    {
                      item.subItems && item.subItems.map((itm, index) => (
                        <div className='flex pl-6 my-2' key={index}>
                          <span className='text-secondary'>{itm.icon}</span>
                          <div onClick={(e) => mobileSubMenuItemHandler(itm.link)} className='text-sm text-gray-600 pl-2'>{itm.name}</div>
                        </div>
                      ))
                    }
                  </div>
                </li>
              </ul>
            ))
          }
        </div>
        <div>
          <p className="px-5 text-center text-[10px] text-secondary" >Spice_Direct_Wholesale_Copyright @2025</p>
        </div>
      </div>
      <SearchBar closeDropDownHandler={closeDropDownHandler} />
      <NavigationBar
        hamBurgerHandler={hamBurgerHandler}
        openDropDownHandler={openDropDownHandler}
        closeDropDownHandler={closeDropDownHandler}
        dropdown={dropdown}
        dropdownOpen={dropdownOpen}
      />
      <FeatureSection />
    </header>
  )
}

export default Header