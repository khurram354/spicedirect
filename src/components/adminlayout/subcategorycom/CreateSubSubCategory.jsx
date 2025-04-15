'use client';
import call_api from "@/helper/Api";
import { useEffect, useState } from "react";
const CreateSubSubCategory = ({ allsubcategories }) => {
    const [subSubCategory, setSubSubCategory] = useState("");
    const [subCategoryId, setSubCategoryId] = useState("");
    const [subsubCategories, setSubsubCategories] = useState([]);
    const [error, setError] = useState({subSubCategory:'', subCategoryId:''})
    const [msg, setMsg] = useState('');

    const validatesubCategory = (subSubCategory) => {
        if(subSubCategory.trim() === ''){
            return 'Please enter subcategory name'
        }; return"";
    }
    const validatesubcategoryId = (subCategoryId) => {
        if(subCategoryId.trim() === ''){
            return 'Please choose subcategory'
        }; return '';
    }
    const getAllSubSubcategories = async () => {
        const resp = await call_api.getallsubsubcategories();
        if (resp.success) {
            setSubsubCategories(resp.subsubcategories)
        } else { console.log("no data found") };
    }
    const createSubSubCategoryHandler = async () => {
        const subSubCategoryError = validatesubCategory(subSubCategory);
        const subcategoryIdError = validatesubcategoryId(subCategoryId);
        if(subSubCategoryError || subcategoryIdError) {
            setError({subSubCategory: subSubCategoryError, subCategoryId: subcategoryIdError}); return;
        }else{setError({subSubCategory:'', subCategoryId:''})}
        const rbody = { subSubCategory, subCategoryId };
        const resp = await call_api.createsubsubcategory(rbody);
        if (resp.success) {
            setMsg('');
            setSubSubCategory('');
            getAllSubSubcategories();
        } else { 
            setMsg(resp.message)
            console.log("error creating new sub category") }
    }

    useEffect(() => {
        getAllSubSubcategories()
    }, []);
    return (
        <section>
            <div className="w-3/4 px-4 mx-auto mt-6 relative left-24 top-5">
                <div className="w-full border border-gray-200 shadow-lg p-4">
                    <h4 className="text-center text-secondary font-semibold text-lg">Create New SubSubCategory</h4>
                    <div className="flex items-center pt-2">
                        <div className="w-6/12">
                            <div>
                                <label htmlFor="subcategory" className="text-gray-600 font-medium">SubSubcategory name</label>
                                <input type="text"
                                    required
                                    placeholder="Please enter sub subcategory"
                                    className="focus:outline-none ml-4 px-2 rounded-sm border-secondary border-b-2 text-gray-500 text-sm font-medium"
                                    value={subSubCategory}
                                    onChange={(e) => setSubSubCategory(e.target.value)}
                                />
                                {error.subSubCategory && <p className="text-xs text-red-500">{error.subSubCategory}</p>}
                            </div>
                            <div className="py-2">
                                <label htmlFor="categorynaem" className="text-gray-600 font-medium">Choose SubCategory</label>
                                <select name="" id="categoryname"
                                    className="ml-6 text-gray-600 focus:outline-none text-sm font-medium px-3 cursor-pointer"
                                    onChange={(e) => setSubCategoryId(e.target.value)}>
                                    <option value='' className="text-sm">Choose Category</option>
                                    {allsubcategories && allsubcategories.map((cate, index) => (
                                        <option value={cate._id} className="text-sm" key={index}>{cate.name}</option>
                                    ))}
                                </select>
                                {error.subCategoryId && <p className="text-red-500 text-xs">{error.subCategoryId}</p>}
                            </div>
                        </div>

                        <div className="w-6/12 ">
                                    {msg && <p className="text-red-500 text-sm ">{msg}</p>}
                            <button className="bg-secondary rounded-sm py-2 px-4 text-white hover:bg-white hover:text-secondary hover:font-semibold" onClick={createSubSubCategoryHandler}>Create SubsubCategory</button>
                        </div>
                    </div>
                </div>



                {subsubCategories && subsubCategories.length > 0 ? (
                    <section className="mt-8">
                    <h4 className="text-secondary font-semibold text-lg my-4 px-32">All Sub Subcategories</h4>
                <div>
                    <table className="shadow-lg rounded-sm bg-gray-100">
                        <thead>
                            <tr className="text-white bg-secondary">
                                <th className="w-28 p-2">Index</th>
                                <th className="w-48 p-2">Subcategory Name</th>
                                <th className="w-32 p-2">Category</th>
                            </tr>
                        </thead>

                        {subsubCategories && subsubCategories.map((ele,index)=>(
                            <tbody key={index}>{console.log(ele)}
                            <tr className="hover:bg-gray-200 cursor-pointer">
                            <td className="w-28 p-2 text-center text-gray-600 text-sm font-medium">{index+1}</td>
                            <td className="w-48 p-2 text-center text-gray-600 text-sm font-medium">{ele.name}</td>
                            <td className="w-32 p-2 text-center text-gray-600 text-sm font-medium">{ele.subCategoryId.name}</td>
                            
                        </tr>
                        </tbody>
                        ))}
                            
                    </table>
                </div>
            </section>
                ): <p className="text-red-500 mt-8 text-xs">No Sub Sub Categories found</p>}
                
            </div>







        </section>
    )
}

export default CreateSubSubCategory