'use client';
import call_api from "@/helper/Api";
import { useEffect, useState } from "react"

const TermsConditions = ({ allTerms }) => {
    const [selected, setSelected] = useState('');
    const [terms, setTerms] = useState("");
    const [numbertextarea, setNumbertextarea] = useState(0);
    const [textareavalue, setTextareavalue] = useState(['']);
    const [err, setErr] = useState({field:"",newfield:"", addterms:''});

    const handleError = (name, value) => {
        setErr((prev)=>{
            return {...prev, [name]:value }
        })
    }
    const handleHeading = (id) => {
        setSelected(id);
        if(!id){setNumbertextarea(0)}
    }
    const filterSelected = () => {
        const selectedTermsData = allTerms.length > 0 && allTerms.filter(ele => ele._id === selected);
        setTerms(selectedTermsData[0]?.terms)
        return;
    }
    const handletextchange = (newcondition, id) => {
        const updateTerms = terms && terms.map(term => term._id === id ? { ...term, condition: newcondition } : term);
        setTerms(updateTerms)
    }
    const handleChange = async () => {
        const rbody = { type: "update", terms, heading: '', id: selected };
        const result = await call_api.upsertterms(rbody);
        if (result.success) {handleError('addterms',result.message)} else { handleError("addterms", result.message) };
    }
    const handleTextAreaChange = (index, value) => {
        const updatevalues = [...textareavalue];
        updatevalues[index] = value;
        setTextareavalue(updatevalues);
    }
    const addTextAreaHandler = () => {
        if(selected){
            handleError("newfield",'');
            setNumbertextarea(prev => prev += 1)
        }else{
            setNumbertextarea(0); 
            handleError('newfield',"Please select heading first")
        }        
    }
    const saveFieldHandler = async() => {
        const conditions = textareavalue && textareavalue.map((ele)=>{
            return {condition:ele}
        })
        const rbody = {id:selected, conditions};
        const resp = await call_api.adddynamicterms(rbody);
        if(resp.success){handleError('field',resp.message)}else{handleError('field', resp.message)}
    }

    useEffect(() => { filterSelected() }, [selected])
    return (
        <section className="w-3/4 px-4 mx-auto mt-6 relative left-24 top-5">
            <div className="bg-gray-100 p-2 shadow-md rounded-sm">
                <div className="flex justify-around w-5/6 mx-auto items-center">
                    <div><h4 className="text-secondary font-medium">Select Terms & Condition Heading</h4></div>
                    <div>
                        <select name="" id="" onChange ={(e)=>handleHeading(e.target.value)} className="text-sm text-gray-600 focus:outline-secondary p-2">
                            <option value="">Choose Heading</option>
                            {allTerms.length > 0 && allTerms.map((term, index) => (
                                <option value={term._id} key={index} className="text-xs text-gray-600 font-medium cursor-pointer">{term.heading}</option>
                            ))}
                        </select>
                    </div>
                    <div><button className=" py-1 px-4 bg-secondary text-white shadow-md rounded-sm cursor-pointer border-2 border-secondary hover:bg-white hover:text-secondary" onClick={handleChange}>Update Changes</button>
                        <span>{err && <p className="text-xs text-green-500">{err.addterms}</p>}</span>
                        </div>

                </div>
            </div>
            <div className="mt-8 bg-gray-100 p-4 shadow-md rounded-sm">
                {terms && terms.length > 0 ? <>
                    {
                        terms && terms.map((term, index) => (
                            <div key={index} className="">
                                <textarea name="" id=""
                                    className=" text-gray-600 w-full p-4 my-4 text-sm"
                                    rows={5}
                                    onChange={(e) => handletextchange(e.target.value, term._id)}
                                    value={term.condition}>
                                    {term.condition}
                                </textarea>
                            </div>

                        ))
                    }</> : <p className="text-red-500">Please select heading first</p>}

                <div>
                    {
                        new Array(numbertextarea).fill('').map((_, index) => (
                            <div key={index} className="my-2">
                                <textarea name="" id=""
                                    rows={4}
                                    value={textareavalue[index]}
                                    onChange={(e) => handleTextAreaChange(index, e.target.value)}
                                    className="text-gray-600 w-full p-4 my-4 text-sm"
                                />
                            </div>
                        ))
                    }
                </div>
                <div className="flex justify-around">
                <div><button className={`py-1 px-4 bg-secondary text-white shadow-md rounded-sm cursor-pointer border-2 border-secondary hover:bg-white hover:text-secondary ${selected ? 'block' : 'hidden'}`} onClick = {addTextAreaHandler}>Add New Fields</button>
                <span>{err && <p className={`${selected ? 'block' : 'hidden'} text-xs text-green-500`}>{err.newfield}</p> }</span>
                </div>
                <div><button className={` py-1 px-4 bg-secondary text-white shadow-md rounded-sm cursor-pointer border-2 border-secondary hover:bg-white hover:text-secondary ${selected ? 'block' : 'hidden'}`} onClick = {saveFieldHandler}>Save New Field</button>
                    <span>{err && <p className={`${selected ? 'block' : 'hidden'} text-xs text-green-500`}>{err.field}</p> }</span>
                    </div>
                </div>

            </div>
        </section>
    )
}

export default TermsConditions