'use client'
import call_api from '@/helper/Api';
import React, { useEffect, useState } from 'react';
import { IoMdClose } from "react-icons/io";

const ProSequenceDialogue = ({ id, procateid, setCheckChanges, sequenceType,setProseqdialogueopen, setProsubseqdialogueopen }) => {
    const [productIndex, setProductIndex] = useState(''); 
    const [error, setError] = useState("");   
    const handleClosebtn = (e) => {
        setProseqdialogueopen(false);
        setProsubseqdialogueopen(false);
    }
    const handleSave = async() => {
        try {
            const rbody = sequenceType === 'category' ? {id, procateid : procateid, productIndex } : {id, prosubcateid:procateid, productIndex};
            const result = sequenceType === "category" ? await call_api.addprosequence(rbody) : await call_api.addprosubsequence(rbody);
            setProseqdialogueopen(false);
            setProsubseqdialogueopen(false)
            setCheckChanges(true);
            return result.success;
        } catch (error) { setError("network error")
            console.log(error)
        }    
    }
    const checkseq = async() => {
        try {
        const rbody = sequenceType === "category" ? { procateid: procateid } : {prosubcateid: procateid};
        const getseq = sequenceType === 'category' ? await call_api.checkseqnumber(rbody) : await call_api.checksubseqnumber(rbody)
        if(getseq.success){setProductIndex(getseq.value)}
        } catch (error) { setError("network error")
            console.log(error);
        }
       };
    useEffect(()=>{
        checkseq()
    },[])   
    return (
        <section className='relative z-20'>
            <IoMdClose className='text-lg absolute right-3 top-3 text-secondary cursor-pointer' onClick={handleClosebtn}/>
            <div className='w-64 bg-gray-100 ring-2 ring-gray-300 rounded-sm p-4 shadow-sm text-center'>
                <h6 className='sm:text-sm text-center font-medium text-secondary pb-2'>{sequenceType === "category" ?"Add Category Sequence":"Sub Category Sequence"}</h6>
                <div className=''>
                    <input
                    type="number"
                    placeholder={sequenceType === "category"?"Enter Category Sequence":"Enter SubCategory Sequence"}
                    required
                    value={productIndex}
                    onChange={(e) => setProductIndex(e.target.value)}
                    className="w-full p-2 border rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-secondary"
                />
                {error && <p className="text-red-500 text-xs mt-1">{error}</p>}
                 <button
                        onClick={handleSave}
                        className="px-4 py-1 text-sm bg-secondary text-white rounded hover:bg-secondary-dark mt-4 w-full"
                    >Save</button>                                 
                </div>
            </div>
        </section>
    )
}

export default ProSequenceDialogue