'use client';
import call_api from "@/helper/Api";
import { useEffect, useState } from "react";
const CreateSubCategory = ({ categories }) => {
    const [subCategory, setSubCategory] = useState("");
    const [categoryId, setCategoryId] = useState("");
    const [subCategories, setSubCategories] = useState([]);
    const [error, setError] = useState({subCategory:'', categoryId:''})
    const [msg, setMsg] = useState('');

    const validatesubCategory = (subCategory) => {
        if(subCategory.trim() === ''){
            return 'Please enter subcategory name'
        }; return"";
    }
    const validatecategoryId = (categoryId) => {
        if(categoryId.trim() === ''){
            return 'Please choose category'
        }; return '';
    }
    const createSubCategoryHandler = async () => {
        const subCategoryError = validatesubCategory(subCategory);
        const categoryIdError = validatecategoryId(categoryId);
        if(subCategoryError || categoryIdError) {
            setError({subCategory: subCategoryError, categoryId: categoryIdError}); return;
        }else{setError({subCategory:'', categoryId:''})}
        const rbody = { subCategory, categoryId };
        const resp = await call_api.createsubcategory(rbody);
        if (resp.success) {
            setMsg('');
            setSubCategory('');
            getAllSubcategories();
        } else { 
            setMsg(resp.message)
            console.log("error creating new sub category") }
    }

    const getAllSubcategories = async () => {
        const resp = await call_api.getallsubcategories();
        if (resp.success) {
            setSubCategories(resp.subcategories)
        } else { console.log("no data found") };
    }
    useEffect(() => {
        getAllSubcategories()
    }, []);
    return (
        <section>
            <div className="w-3/4 px-4 mx-auto mt-6 relative left-24 top-5">
                <div className="w-full border border-gray-200 shadow-lg p-4">
                    <h4 className="text-center text-secondary font-semibold text-lg">Create New SubCategory</h4>
                    <div className="flex items-center pt-2">
                        <div className="w-6/12">
                            <div>
                                <label htmlFor="subcategory" className="text-gray-600 font-medium">Subcategory name</label>
                                <input type="text"
                                    required
                                    placeholder="Please enter sub category"
                                    className="focus:outline-none ml-4 px-2 rounded-sm border-secondary border-b-2 text-gray-500 text-sm font-medium"
                                    value={subCategory}
                                    onChange={(e) => setSubCategory(e.target.value)}
                                />
                                {error.subCategory && <p className="text-xs text-red-500">{error.subCategory}</p>}
                            </div>
                            <div className="py-2">
                                <label htmlFor="categorynaem" className="text-gray-600 font-medium">Choose Category</label>
                                <select name="" id="categoryname"
                                    className="ml-6 text-gray-600 focus:outline-none text-sm font-medium px-3 cursor-pointer"
                                    onChange={(e) => setCategoryId(e.target.value)}>
                                    <option value='' className="text-sm">Choose Category</option>
                                    {categories && categories.map((cate, index) => (
                                        <option value={cate._id} className="text-sm" key={index}>{cate.name}</option>
                                    ))}
                                </select>
                                {error.categoryId && <p className="text-red-500 text-xs">{error.categoryId}</p>}
                            </div>
                        </div>

                        <div className="w-6/12 ">
                                    {msg && <p className="text-red-500 text-sm ">{msg}</p>}
                            <button className="bg-secondary rounded-sm py-2 px-4 text-white hover:bg-white hover:text-secondary hover:font-semibold" onClick={createSubCategoryHandler}>Create SubCategory</button>
                        </div>
                    </div>
                </div>




                <section className="mt-8">
                        <h4 className="text-secondary font-semibold text-lg my-4 px-32">All SubCategories</h4>
                    <div>
                        <table className="shadow-lg rounded-sm bg-gray-100">
                            <thead>
                                <tr className="text-white bg-secondary">
                                    <th className="w-28 p-2">Index</th>
                                    <th className="w-48 p-2">Subcategory Name</th>
                                    <th className="w-32 p-2">Category</th>
                                </tr>
                            </thead>

                            {subCategories && subCategories.map((ele,index)=>(
                                <tbody key={index}>
                                <tr className="hover:bg-gray-200 cursor-pointer">
                                <td className="w-28 p-2 text-center text-gray-600 text-sm font-medium">{index+1}</td>
                                <td className="w-48 p-2 text-center text-gray-600 text-sm font-medium">{ele.name}</td>
                                <td className="w-32 p-2 text-center text-gray-600 text-sm font-medium">{ele.categoryId.name}</td>
                                
                            </tr>
                            </tbody>
                            ))}
                                
                        </table>
                    </div>
                </section>
            </div>
        </section>
    )
}

export default CreateSubCategory