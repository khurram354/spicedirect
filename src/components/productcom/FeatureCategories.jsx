'use client'
import { useEffect, useState } from 'react';
import { useRouter } from "next/navigation";
import call_api from "@/helper/Api";

const FeatureCategories = () => {
        const [featurecategory, setFeaturecategory] = useState([]);
        const [selectedvalue, setSelectedvalue] = useState("");
        const router = useRouter();

        async function getHomeBanners() {
            const response = await call_api.gethomebanners();
            setFeaturecategory(response); return;
        }
        const handleChange = (id, name) => {
            setSelectedvalue(id);
            router.push(`/product?offers=${name}`)
        }

        useEffect(() => { getHomeBanners() }, []);
        return (
            <div>{
                featurecategory && featurecategory.length > 0 && featurecategory.map((cate, index) => (
                    <div key={index} className="flex mt-1 items-center">
                        <span>
                            <input type="checkbox"
                                id={cate._id}
                                value={selectedvalue}
                                checked={selectedvalue === cate._id}
                                onChange={(e) => handleChange(cate._id, cate.name)}
                                className="cursor-pointer"
                            />
                        </span>
                        <label htmlFor={cate._id}
                            className="text-xs px-2"
                        >{cate.name}</label>
                    </div>
                ))
            }</div>
        )
    }

    export default FeatureCategories