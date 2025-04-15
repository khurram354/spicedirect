'use client'
import call_api from '@/helper/Api';
import React, { useEffect, useState } from 'react';
import { IoMdClose } from "react-icons/io";

const SubSubCategoryDialogue = ({ proId, setSubsubcatedialogueopen, setCheckChanges }) => {
    const [listsubcategories, setListsubcategories] = useState([]);
    const [selectedsubsubcategory, setSelectedsubsubcategory] = useState('');    
    const handleClosebtn = (e) => {
        setSubsubcatedialogueopen(false);
    }
    const getAllSubSubCategories = async(proId) => {
        const rbody = {proId}
        const subsubCategories = await call_api. getallsubsubcategories(rbody);
        if(subsubCategories.success){
            setListsubcategories(subsubCategories.subsubcategories)
        }else{
            setListsubcategories([])
        }
    }
    const addSubSubCategoryHandler = async(proId, selectedsubsubcategory) => {
        
            const rbody = { proId, subsubcategory:selectedsubsubcategory }
            const result = await call_api.addsubsubcategory(rbody);
            setCheckChanges(true);
            setSubsubcatedialogueopen(false)
            return result.success;         
    }
    useEffect(()=>{getAllSubSubCategories(proId)},[])
    useEffect(()=>{
        if(proId && selectedsubsubcategory){
            addSubSubCategoryHandler(proId, selectedsubsubcategory)
        }
    },[selectedsubsubcategory])    
    return (
        <section className='relative'>
            <IoMdClose className='text-lg absolute right-3 top-3 text-secondary' onClick={handleClosebtn}/>
            <div className='w-64 bg-gray-100 ring-2 ring-gray-300 rounded-sm p-4 shadow-sm'>
                <h6 className='sm:text-sm text-center font-medium text-secondary pb-2'>Choose Sub Subcategory</h6>
                <div className=''>
                    <select name="" id="" onChange={(e)=>setSelectedsubsubcategory(e.target.value)}>
                        <option value="">Choose Subsubcagegory</option>
                        {
                            listsubcategories && listsubcategories.map((cate,index)=>(
                                <option value={cate._id} key={index}>{cate.name}</option>
                            ))
                        }
                    </select>                    
                </div>
            </div>
        </section>
    )
}

export default SubSubCategoryDialogue