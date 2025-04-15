'use client';
import { useEffect, useState } from "react";
import { FaAngleDown } from "react-icons/fa6";
import FeatureCategories from "./FeatureCategories";
import ExtractSubCategories from "./ExtractSubCategories";


const CategoryMenuBar = ({allcategories}) => {
        const fields = [
                { id: 1, name: "Category", subItem: <ExtractSubCategories allcategories={allcategories}/> },
                { id: 2, name: "Brand", subItem: [] },
                { id: 3, name: "Feature", subItem: <FeatureCategories /> },
                { id: 4, name: "Size", subItem: [] },
        ]
        const [openid, setOpenid] = useState([]);
        const submenuHandler = (id) => {
                setOpenid((prevId)=>{
                        if(prevId.includes(id)){
                                return prevId.filter(item => item !== id)
                        }else{
                                return [id];
                        }
                })
        }

        return (
                <section className='mt-8 px-2 sticky top-5 mr-5 text-gray-500'>
                        <h6 className='text-secondary font-semibold relative left-4'>Filter By:</h6>
                        {
                                fields && fields.map((field, index) => (
                                        <div className="border border-gray-200 mt-2 px-4 py-2" key={index}>
                                                <div className="flex items-center justify-between cursor-pointer">
                                                        <span className="text-secondary font-semibold text-sm">{field.name}</span>
                                                        <span className="hover:text-secondary" onClick={() => submenuHandler(field.id)}><FaAngleDown /></span>
                                                </div> 
                                                <div className={`${openid.includes(field.id)?'block':'hidden'}`}>{field.subItem}</div></div>
                                ))
                        }
                </section>

        )
}

export default CategoryMenuBar