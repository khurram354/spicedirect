'use client'
import { useState, Fragment } from 'react';
import Link from 'next/link';
import { FaRegImages, FaAngleDown, FaAngleRight } from "react-icons/fa6";
import { LuUsers } from "react-icons/lu";
import Image from 'next/image';
import { NavBarItems } from './NavBarItems';
import call_api from '@/helper/Api';
import { redirect } from 'next/navigation';
import { useSelector } from 'react-redux';

const AdminSidebar = () => {
    const [itemsIds, setItemsIds] = useState([]);
    const isOpen = useSelector((state)=>state.sidebar.isOpen);

    const menuHandler = (id) => {
        setItemsIds((previds) => {
            const existIds = previds.includes(id);
            if (existIds) {
                return previds.filter((item) => item !== id);
            } else {
                return [...previds, id];
            }
        })
    };
    const logoutHandler = async() => {
        const resp = await call_api.logoutuser();
        if(resp){
            redirect('/admin')
        }
    }
    return (
        <Fragment>
            <div className={`${isOpen? "w-64" : "w-0"} flex flex-col h-full text-white`}>
                <div className="overflow-y-auto overflow-x-hidden flex flex-col justify-between flex-grow">
                    <ul className="flex flex-col py-4 space-y-1">
                        <li className="px-5 md:block ">
                            <Link href={`/`}>
                                <Image
                                    src="/logo/spicedirect_logo.png"
                                    width={200}
                                    height={200}
                                    alt="Picture of the author"
                                />
                            </Link>
                            <p className="text-sm font-medium tracking-wide text-white text-center uppercase border-b-4 mt-4 pb-3">Admin Panel</p>
                        </li>
                        {
                            NavBarItems && NavBarItems.map((item, index) => (
                                <li key={index}>
                                    <div className="relative flex flex-row items-center h-11 focus:outline-none hover:bg-secondary text-white-600 hover:text-white-800 border-l-4 border-transparent hover:border-secondary pr-6 cursor-pointer justify-between" onClick={() => menuHandler(item.id)}>
                                        <div>
                                            <span className="inline-flex justify-center items-center ml-4">
                                                {item?.icon}
                                            </span>
                                            <span className="ml-2 text-sm tracking-wide truncate">{item.name}</span>
                                        </div>
                                        <div>
                                            <span className={`${itemsIds.includes(item.id) ? "block" : "hidden"}`}><FaAngleDown className='mt-1' /></span>
                                            <span className={`${itemsIds.includes(item.id) ? "hidden" : "block"}`}><FaAngleRight className='mt-1' /></span>
                                        </div>
                                    </div>
                                    {
                                        item.subItems && item.subItems.map((itm, index) => {
                                            const Icon = itm.sIcon;
                                            return(
                                            <Link key={index} href={`${itm?.link}`}>
                                                <div className={`ml-2 relative flex flex-row items-center h-11 focus:outline-none hover:bg-secondary text-white-600 hover:text-white-800 border-l-4 border-transparent hover:border-secondary pr-6 cursor-pointer ${itemsIds.includes(item.id) ? "block" : "hidden"}`} >
                                                    <span className="inline-flex justify-center items-center ml-4">
                                                        <Icon className='w-5 h-5' /> 
                                                    </span>
                                                    <span className="ml-2 text-xs tracking-wide truncate">{itm?.name}</span>
                                                </div>
                                            </Link>)
                                        })
                                    }
                                </li>
                            ))
                        }
                        <li>
                            <div className="relative flex flex-row items-center h-11 focus:outline-none hover:bg-secondary text-white-600 hover:text-white-800 border-l-4 border-transparent hover:border-secondary pr-6 cursor-pointer" onClick={logoutHandler}>
                                <span className="inline-flex justify-center items-center ml-4">
                                    <LuUsers className="w-5 h-5" />
                                </span>
                                <span className="ml-2 text-sm tracking-wide truncate">Logout</span>
                            </div>
                        </li>
                    </ul>
                    <p className="mb-14 px-5 py-3 md:block text-center text-xs" >Spice_Direct_Wholesale_Copyright &copy; 2025</p>
                </div>
            </div>
        </Fragment>
    )
}

export default AdminSidebar