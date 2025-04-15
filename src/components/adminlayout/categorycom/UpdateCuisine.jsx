'use client';
import call_api from '@/helper/Api';
import React, { useState } from 'react';
import { IoMdClose } from "react-icons/io";
import { cuisines, spCategories } from '../NavBarItems';

const UpdateCuisine = ({ proId, setDialogueOpen, cuisine, type, setCheckChanges }) => {
    const [allCheck, setAllCheck] = useState(cuisine || []);
    const checkBoxHandler = (e) => {
        const { checked, value } = e.target;
        setAllCheck((prevCuisine) => {
            if (checked) {
                return [...prevCuisine, value];
            } else {
                return prevCuisine.filter((item) => item !== value);
            }
        });
    };
    const handleClosebtn = (e) => {
        setDialogueOpen(false);
    }
    const addSPCategoryHandler = async () => {
        const rbody = { proId, allCheck };
        const result = await call_api.updatespcategory(rbody);
        setCheckChanges(true);
        setDialogueOpen(false)
        return result.success;
    }
    const addCuisineHandler = async () => {
        try {
            const rbody = { proId, allCheck }
            const result = await call_api.updatecuisine(rbody);
            setCheckChanges(true);
            setDialogueOpen(false)
            return result.success;
        } catch (error) {
            console.log("Error Adding Favourite List", error);
            return [];
        }
    }
    let formData = type === 'cuisine' ? cuisines : spCategories;
    return (
        <section className='relative'>
            <IoMdClose className='text-lg absolute right-4 top-4 text-secondary cursor-pointer' onClick={handleClosebtn} />
            <div className='w-48 bg-gray-200 ring-2 ring-gray-300 rounded-sm p-2 shadow-sm'>
                <div className='ring-gray-300 ring-1 p-2 rounded-sm shadow-md bg-white'>
                    <h6 className='sm:text-sm text-center font-medium text-secondary pb-2 pt-2'>{type === 'cuisine'?'Choose Cuisine' : 'Choose Feature Category'}</h6>
                    {
                        formData && formData.map((csne, index) => (
                            <div className='flex py-1 hover:bg-green-100 items-center' key={index}>
                                <input type="checkbox"
                                    value={csne.name}
                                    checked={allCheck && allCheck.includes(csne.name)}
                                    onChange={checkBoxHandler}
                                    className='bg-primary cursor-pointer w-4 h-4'
                                />
                                <p className='text-xs px-4'>
                                    {csne.title}
                                </p>
                            </div>
                        ))
                    }
                    <div className='flex justify-end'>
                        <button onClick={type === "cuisine" ? addCuisineHandler : addSPCategoryHandler}
                            className='bg-secondary px-2 py-1 text-white rounded-md text-xs cursor-pointer hover:bg-white hover:text-secondary hover:font-semibold'
                        > {type === "cuisine" ? "Add Cuisine" : "Add Special Cate"} </button>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default UpdateCuisine