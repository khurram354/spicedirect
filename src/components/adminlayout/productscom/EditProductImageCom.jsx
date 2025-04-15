'use client';
import { RiUploadCloud2Line } from "react-icons/ri";
import { TbFilesOff } from "react-icons/tb";
import { useState } from "react";
import { useRouter, useParams } from "next/navigation";
import call_api from "@/helper/Api";

const EditProductImageCom = ({ type }) => {
    const params = useParams();
    const [msg, setMsg] = useState("");
    const [image, setImage] = useState(null);
    const router = useRouter();

    const uploadFilderHandler = async (e) => {
        if (!image) {
            alert("Please choose an image to upload");
            return;
        }
        const formData = new FormData();
        formData.append('file', image);
        try {
            const productId = params.id
            const result = await call_api.uploadproductimages(productId, formData)
            if (result.success) {
                router.push('/admin/allproduct');
            } else {
                setMsg(result.message)
            }
        } catch (error) {
            console.log("error", error);
        }
    }

    const editBannerHandler = async (e) => {
        if (!image) {
            alert("Please choose an image to upload");
            return;
        }
        const formData = new FormData();
        formData.append('file', image);
        if (type === 'cuisine') {
            formData.append('type', type);
        }
        try {
            const bannerId = params.id
            const result = await call_api.editbannerimages(bannerId, formData);
            if (result.success) {
                if (type === 'cuisine') {
                    router.push('/admin/editcuisines');
                } else {
                    router.push('/admin/editbanners');
                }
            } else {
                setMsg(result.message)
            }

        } catch (error) {
            console.log("error", error);
        }
    }
    return (
        <>
            <div className="w-3/4 relative left-72 sm:px-2 md:px-2 mt-8 shadow rounded-md ">
            </div>
            <div className="w-3/4 relative left-72 sm:px-2 md:px-2 sm:py-8 mt-8 h-screen ">
                <main className=" mx-auto ">
                    <article className="relative flex flex-col bg-slate-50 shadow rounded-md">
                        <div className="w-full h-full absolute top-0 left-0 pointer-events-none z-50 flex flex-col items-center justify-center rounded-md">
                            <RiUploadCloud2Line className="text-dark text-[50px] font-medium mt-8" />
                        </div>
                        <section className="h-full p-8 w-full flex flex-col min-h-96">
                            <header className="border-dashed border-2 border-gray-400 py-12 flex flex-col justify-center items-center">
                                <p className="mb-3 font-semibold text-gray-900 flex flex-wrap justify-center">
                                    <span>Drag and drop your</span>&nbsp;<span>files anywhere or</span>
                                </p>
                                <input type="file"
                                    className="my-2"
                                    // accept="images/*"
                                    onChange={(e) => setImage(e.target.files[0])} />
                                <button className="px-2 py-2 bg-primary hover:bg-white text-white hover:text-primary rounded-md hover:outline" onClick={type === "banner" || type === "cuisine" ? editBannerHandler : uploadFilderHandler}>
                                    {type === "banner" ? "Edit Banner Image" : "Upload Product Images"}
                                </button>
                            </header>
                            <ul className="flex flex-1 flex-wrap -m-1 relative top-8">
                                <li className="h-full w-full text-center flex flex-col items-center justify-center">
                                    <TbFilesOff className="text-[50px] text-gray-300" />
                                    <span className="text-small text-gray-500">No files selected</span>
                                </li>
                            </ul>
                        </section>
                        {msg && <p className='text-xs text-red-500'>{msg}</p>}
                        <footer className="flex justify-end px-8 pb-8 pt-4">
                            <button className="ml-2 px-2 py-2 bg-primary hover:bg-white text-white hover:text-primary rounded-md hover:outline">
                                Cancel
                            </button>
                        </footer>
                    </article>
                </main>
            </div>
        </>
    )
}

export default EditProductImageCom