'use client';
import { useEffect, useState } from "react";
import Image from "next/image";
import call_api from "@/helper/Api";
import SupplierImageList from "./SupplierImageList";

const AddNewSupplier = () => {
    const [supplierimages, setSupplierimages] = useState([]);
    const [slidersupplier, setSlidersupplier] = useState([]);
    const [checkslider, setCheckslider] = useState(false)
    const [msg, setMsg] = useState("");

    async function getallsupplier() {
        const result = await call_api.getallsupplierimages();
        if (result.success) {
            setCheckslider(false);
            setSlidersupplier(result.suppliers);
            return;
        } else { return [] }
    }
    
    const uploadImageHandler = (e) => {
        setMsg('')
        const chosenFiles = Array.prototype.slice.call(e.target.files);
        let selectedimages = [...supplierimages];
        chosenFiles.forEach((file) => {
            if (supplierimages.findIndex((f) => f.name === file.name) === -1) {
                selectedimages.push(file);
            }
            setSupplierimages(selectedimages);           
        });
    }
    const addSupplierHandler = async () => {
        const formData = new FormData();
        if (supplierimages.length > 0) {
            supplierimages.forEach((file, index) => {
                formData.append(`supplierimages[${index}]`, file)
            })
        } else{return; }
       
        const result = await call_api.addsupplierslider(formData);
        if (result) {
            setMsg('image uploated successfully');
            setSupplierimages([]);
            setCheckslider(true)
        } else { setMsg('Image cannot upload, network Error') };
    }

    const deleteSliderHandler = async(id) => {
        const result = await call_api.deletesupplierslider(id);
        if(result.success){
            setCheckslider(true);
        }
    };

    useEffect(() => { getallsupplier() }, [checkslider])
    return (
        <>
            <div className="w-3/4 px-4 mx-auto mt-6 relative left-24 top-5">
                <div className="overflow-hidden rounded-lg shadow-xs">
                    <div className="flex h-32 border-2 mb-4">
                        <div className="w-full flex justify-center items-center">{
                            supplierimages.length > 0 ?(
                                supplierimages?.map((file, index) => (
                                    <div className="" key={index}>
                                        <Image src={URL.createObjectURL(file)}
                                            width={200}
                                            height={200}
                                            alt=""
                                            className="object-cover w-20 h-20"
                                        />
                                    </div>
                                ))
                            ):(<p className="text-red-500 text-sm">No Image selected</p>) 
                        }
                        </div>
                    </div>
                    <div className='border-gray-300 border-2 p-6'>
                        <div className='flex justify-around'>
                            <div>
                                <input type="file"
                                    multiple
                                    id='fileupload'
                                    className='hidden'
                                    onChange={(e) => uploadImageHandler(e)}
                                />
                                <label htmlFor="fileupload"
                                    className='bg-secondary border-2 border-secondary py-3 px-4 rounded-md shadow-md cursor-pointer text-white hover:text-secondary hover:bg-white'
                                >
                                    Upload Images for supplier slider
                                </label>
                            </div>
                            <div>
                            <button className=" bg-secondary py-1 px-14 border-secondary border-2 hover:bg-white hover:text-secondary text-white rounded-md" onClick={addSupplierHandler}>Submit</button>
                            {msg && <p className="text-xs text-red-500">{msg}</p>}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <SupplierImageList
            deleteSliderHandler = {deleteSliderHandler}
            slidersupplier = {slidersupplier}
            />
        </>
    )
}

export default AddNewSupplier