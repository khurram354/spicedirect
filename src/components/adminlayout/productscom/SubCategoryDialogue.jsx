'use client'
import call_api from '@/helper/Api';
import React, { useEffect, useState } from 'react';
import { IoMdClose } from "react-icons/io";

const SubCategoryDialogue = ({ proId, setSubcatedialogueopen, setCheckChanges }) => {
    const [listcategories, setListcategories] = useState([]);
    const [selectedsubcategory, setSelectedsubcategory] = useState('');    
    const handleClosebtn = (e) => {
        setSubcatedialogueopen(false);
    }
    const getAllSubCategories = async(proId) => {
        const rbody = {proId}
        const result = await call_api.getallsubcategories(rbody);
        if(result.success){
            setListcategories(result.subcategories)
        }else{
            setListcategories([])
        }
    }

    const addSubCategoryHandler = async(proId, selectedsubcategory) => {        
            const rbody = { proId, subcategory:selectedsubcategory }
            const result = await call_api.addsubcategory(rbody);
            setCheckChanges(true);
            setSubcatedialogueopen(false)
            return result.success;         
    }
    useEffect(()=>{getAllSubCategories(proId)},[])
    useEffect(()=>{
        if(proId && selectedsubcategory){
            addSubCategoryHandler(proId, selectedsubcategory)
        }
    },[selectedsubcategory])
    
    return (
        <section className='relative'>
            <IoMdClose className='text-lg absolute right-3 top-3 text-secondary' onClick={handleClosebtn}/>
            <div className='w-64 bg-gray-100 ring-2 ring-gray-300 rounded-sm p-4 shadow-sm'>
                <h6 className='sm:text-sm text-center font-medium text-secondary pb-2'>Choose Sub Category</h6>
                <div className=''>
                    <select name="" id="" onChange={(e)=>setSelectedsubcategory(e.target.value)}>
                        <option value="">Choose Subcagegory</option>
                        {
                            listcategories && listcategories.map((cate,index)=>(
                                <option value={cate._id} key={index}>{cate.name}</option>
                            ))
                        }
                    </select>                    
                </div>
            </div>
        </section>
    )
}

export default SubCategoryDialogue