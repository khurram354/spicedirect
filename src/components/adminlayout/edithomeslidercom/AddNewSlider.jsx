'use client';
import { useEffect, useState } from "react";
import Image from "next/image";
import call_api from "@/helper/Api";
import HomeSliderList from "./HomeSliderList";

const AddNewSlider = () => {
    const [desktopimages, setDesktopimages] = useState([]);
    const [mobileimages, setMobileimages] = useState([]);
    const [sliderImages, setSliderImages] = useState([]);
    const [checkslider, setCheckslider] = useState(false)
    const [msg, setMsg] = useState("");

    async function getallsliderimages() {
        const result = await call_api.getallhomeslider();
        if (result.success) {
            setCheckslider(false);
            setSliderImages(result.sliders);
            return;
        } else { return [] }
    }
    
    const uploadImageHandler = (e, type) => {
        const chosenFiles = Array.prototype.slice.call(e.target.files);
        let selectedimages = [];
        let mobileselectedimages = [];
        if (type === 'mobile') {
            mobileselectedimages = [...mobileimages];
        } else {
            selectedimages = [...desktopimages];
        }
        chosenFiles.forEach((file) => {
            if (type === 'mobile') {
                if (mobileselectedimages.findIndex((f) => f.name === file.name) === -1) {
                    mobileselectedimages.push(file);
                }
            } else {
                if (selectedimages.findIndex((f) => f.name === file.name) === -1) {
                    selectedimages.push(file);
                }
            }
        });
        if (type === 'mobile') {
            setMobileimages(mobileselectedimages)
        } else { setDesktopimages(selectedimages); }
    }
    const addSliderHandler = async () => {
        const formData = new FormData();
        if (desktopimages.length > 0) {
            desktopimages.forEach((file, index) => {
                formData.append(`desktop[${index}]`, file)
            })
        } else { formData.append('desktop', '') }
        if (mobileimages.length > 0) {
            mobileimages.forEach((file, index) => {
                formData.append(`mobile[${index}]`, file);
            })
        } else { formData.append('mobile', '') }
        const result = await call_api.addhomeslider(formData);
        if (result) {
            setMsg('image uploated successfully');
            setDesktopimages([]);
            setMobileimages([])
            setCheckslider(true)
        } else { setMsg('Image cannot to upload, network Error') };
    }

    const deleteSliderHandler = async(id) => {
        const result = await call_api.deletehomeslider(id);
        if(result.success){
            setCheckslider(true);
        }
    };

    useEffect(() => { getallsliderimages() }, [checkslider])
    return (
        <>
            <div className="w-3/4 px-4 mx-auto mt-6 relative left-24 top-5">
                <div className="overflow-hidden rounded-lg shadow-xs">
                    <div className="flex h-32 border-2 mb-4">
                        <div className="w-3/6 flex justify-center items-center border-r-2">{
                            desktopimages.length > 0 ?(
                                desktopimages?.map((file, index) => (
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
                        <div className="w-3/6 flex justify-center items-center">{
                            mobileimages.length > 0 ? (
                                mobileimages?.map((file, index) => (
                                    <div className="" key={index}>
                                        <Image src={URL.createObjectURL(file)}
                                            width={200}
                                            height={200}
                                            alt=""
                                            className="object-cover w-20 h-20"
                                        />
                                    </div>
                                ))
                            ) : (<p className="text-red-500 text-sm">No Image selected</p>) 
                        }</div>
                    </div>
                    <div className='border-gray-300 border-2 p-6'>
                        <div className='flex justify-around'>
                            <div>
                                <input type="file"
                                    multiple
                                    id='fileupload'
                                    className='hidden'
                                    onChange={(e) => uploadImageHandler(e, 'desktop')}
                                />
                                <label htmlFor="fileupload"
                                    className='bg-secondary border-2 border-secondary py-3 px-4 rounded-md shadow-md cursor-pointer text-white hover:text-secondary hover:bg-white'
                                >
                                    Upload Images for Destop Slider
                                </label>
                            </div>
                            <div>
                                <input type="file"
                                    multiple
                                    id='mobileupload'
                                    className='hidden'
                                    onChange={(e) => uploadImageHandler(e, 'mobile')}
                                />
                                <label htmlFor="mobileupload"
                                    className='bg-secondary border-2 border-secondary py-2 px-3 text-white hover:text-secondary hover:bg-white rounded-md cursor-pointer'
                                >
                                    Upload Images for Mobile Slider
                                </label>
                            </div>
                        </div>
                        <div className="flex flex-col justify-center mt-10">
                            <button className=" bg-secondary py-2 px-14 border-secondary border-2 hover:bg-white hover:text-secondary text-white rounded-md" onClick={addSliderHandler}>Submit</button>
                            {msg && <p className="text-xs text-red-500">{msg}</p>}
                        </div>
                    </div>
                </div>
            </div>
            <HomeSliderList
            deleteSliderHandler = {deleteSliderHandler}
            sliderImages = {sliderImages}
            />
        </>
    )
}

export default AddNewSlider