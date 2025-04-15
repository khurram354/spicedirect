'use client'
import { useEffect, useState } from 'react';
import { useRouter } from "next/navigation";
import { useSearchParams } from 'next/navigation';

const ExtractSubCategories = ({ allcategories }) => {
    const searchParams = useSearchParams();
    const cateId = searchParams.get('cate_id');
    const subcateId = searchParams.get('sub_cate_id');

    const [cateid, setCateid] = useState("");
    const [subcateid, setSubcateid] = useState("");
    const [subsubcateid, setSubsubcateid] = useState("");
    const router = useRouter();

    const handleCateChange = (id) => {
        setSubsubcateid("");
        setSubcateid("");
        setCateid(id);
        router.push(`/product?cate_id=${id}`)
    }
    const handleSubCateChange = (id) => {
        setSubcateid("");
        setSubcateid(id);
        router.push(`/product?sub_cate_id=${id}`)
    }
    const handleSubSubCateChange = (id) => {
        setSubsubcateid(id);
        router.push(`/product?subsub_cate_id=${id}`)
    }

    useEffect(()=> {if(cateId){setCateid(cateId)}; if(subcateId){setSubcateid(subcateId)}},[cateId,subcateId]) ;
    console.log(cateid, subcateid)
    return (
        <div className='mt-4'>{
            allcategories && allcategories.length > 0 && allcategories.map((cate, index) => (
                <div key={index} >


                    <div className="flex items-center">
                        <span>
                            <input type="checkbox"
                                id={cate._id}
                                value={cateid}
                                checked={cateid === cate._id}
                                onChange={(e) => handleCateChange(cate._id)}
                                className="cursor-pointer"
                            />
                        </span>
                        <label htmlFor={cate._id}
                            className="text-xs px-2"
                        >{cate.name}</label>
                    </div>


                    {
                        cate.subcategories && cate.subcategories.length > 0 && cate._id === cateid && cate.subcategories.map((subcate, index) => (
                            <div key={index}>

                                <div className="flex pl-4 items-center">
                                    <span>
                                        <input type="checkbox"
                                            id={subcate._id}
                                            value={subcateid}
                                            checked={subcateid === subcate._id}
                                            onChange={(e) => handleSubCateChange(subcate._id)}
                                            className="cursor-pointer"
                                        />
                                    </span>
                                    <label htmlFor={subcate._id}
                                        className="text-xs px-2"
                                    >{subcate.name}</label>
                                </div>

                                {console.log(subcate._id === subcateid)}

                                {
                                    subcate.subsubcategories && subcate.subsubcategories.length > 0 && subcate._id === subcateid && subcate.subsubcategories.map((subsubcate, index) => (
                                        <div key={index}>


                                            <div className="flex pl-8 items-center">
                                                <span>
                                                    <input type="checkbox"
                                                        id={subsubcate._id}
                                                        value={subsubcateid}
                                                        checked={subsubcateid === subsubcate._id}
                                                        onChange={(e) => handleSubSubCateChange(subsubcate._id)}
                                                        className="cursor-pointer"
                                                    />
                                                </span>
                                                <label htmlFor={subsubcate._id}
                                                    className="text-xs px-2"
                                                >{subsubcate.name}</label>
                                            </div>


                                        </div>
                                    ))
                                }
                            </div>

                        ))
                    }
                </div>
            ))
        }</div>
    )
}

export default ExtractSubCategories