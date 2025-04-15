'use client';
import call_api from "@/helper/Api";
import Image from "next/image";
import { useState } from "react";

const ContactForm = () => {
    const [fName, setFName] = useState("");
    const [lName, setLName] = useState("");
    const [pNumber, setPNumber] = useState("");
    const [email, setEmail] = useState("");
    const [message, setMessage] = useState("");
    const [msg, setMsg] = useState("");
    const [errmsg, setErrmsg] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState({fName:'', lName:'',pNumber:'', email:'',message:''});

    const validate = (field, value) => {
        switch (field) {
            case 'fName':
                return value.trim() === '' ? "Please Enter First Name" : '';
            case 'lName':
                return value.trim() === '' ? "Please Enter Last Name": "";
            case 'pNumber':
                return value.trim() === '' ? "Please Enter Phone Number" : '';
            case 'email':
                if (value.trim() === '') {
                    return "Please Enter Email Address";
                } else {
                    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
                    return emailRegex.test(value) ? '' : 'Please Enter a Valid Email Address';
                } 
            case 'message':
                return value.trim() === "" ? "Please Enter your Query" : "";
            default:
                return "";
        }
    }
    const checkFormError = () => {
        const fields ={fName, lName, pNumber, email, message};
        let hasError = false;
        const newErrors = {};
        Object.keys(fields).forEach((field)=>{
            const errorMessage = validate(field, fields[field]);
            newErrors[field] = errorMessage;
            if(errorMessage) hasError = true;
        });
        setError(newErrors);
        return !hasError;
    }
    const sendEmailHandler = async() => {
        setLoading(true)
        const checkError = checkFormError();
        if(!checkError) {setLoading(false); setMsg(""); return;};
        const rbody = ({fName, lName, pNumber, email, message});
        const resp = await call_api.sendemail(rbody);
        if(resp.success){
            setFName(""); setLName(""); setPNumber(""); setEmail(""); setMessage(""); setErrmsg("");
            setMsg("Your Email sent successfully, We will soon contact You!");
        }else{
            setMsg("");
            setErrmsg("Network Error, Please try again")
        }
        setLoading(false)
    }
    return (
        <section className="sm:w-11/12 md:w-5/6 mx-auto md:my-12 sm:my-8">
            <div className="md:flex md:flex-row md:justify-between sm:flex sm:flex-col-reverse">
                <div className="md:w-3/6 sm:w-full sm:my-6 md:my-0">
                    <h4 className="font-bold text-xl text-secondary">
                        Contact us with Questions about To Orders, Delivery and Prices
                    </h4>
                    <p className="text-sm text-gray-600 pt-2">
                        Please let us know, how can we help by sending us a quick e-email, We will respond promptly. Thank You!.
                    </p>
                    <div className="mt-10">
                        <div className="flex justify-between mt-6">
                            <div className="flex flex-col w-[45%]">
                                <label htmlFor='firstName' className="cursor-pointer text-gray-600 text-sm">First Name</label>
                                <input type="text"
                                    required={true}
                                    id='firstName'
                                    className="border-2 px-2 py-1 hover:outline-secondary active:outline-secondary focus:outline-secondary"
                                    value={fName}
                                    onChange={(e) => setFName(e.target.value)}
                                />
                                <span className="text-red-600 text-xs pt-1">{error && error.fName}</span>
                            </div>
                            <div className="flex flex-col w-[45%]">
                                <label htmlFor='lastName' className="cursor-pointer text-gray-600 text-sm">Last Name</label>
                                <input type="text"
                                    required={true}
                                    id='lastName'
                                    className="border-2 px-2 py-1 hover:outline-secondary active:outline-secondary focus:outline-secondary"
                                    value={lName}
                                    onChange={(e) => setLName(e.target.value)}
                                />
                                <span className="text-red-600 text-xs pt-1">{error && error.lName}</span>
                            </div>
                        </div>
                        <div className="flex justify-between my-4">
                            <div className="flex flex-col w-[45%]">
                                <label htmlFor='phoneNumber' className="cursor-pointer text-gray-600 text-sm">Phone Number</label>
                                <input type="text"
                                    required={true}
                                    id='phoneNumber'
                                    className="border-2 px-2 py-1 hover:outline-secondary active:outline-secondary focus:outline-secondary"
                                    value={pNumber}
                                    onChange={(e) => setPNumber(e.target.value)}
                                />
                                <span className="text-red-600 text-xs pt-1">{error && error.pNumber}</span>
                            </div>
                            <div className="flex flex-col w-[45%]">
                                <label htmlFor='email' className="cursor-pointer text-gray-600 text-sm">Email</label>
                                <input type="text"
                                    required={true}
                                    id='email'
                                    className="border-2 px-2 py-1 hover:outline-secondary active:outline-secondary focus:outline-secondary"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                />
                                <span className="text-red-600 text-xs pt-1">{error && error.email}</span>
                            </div>
                        </div>
                        <div className="flex flex-col w-full">
                            <label htmlFor='message' className="cursor-pointer text-gray-600 text-sm">Your Message</label>
                            <textarea
                                required={true}
                                id='message'
                                cols={3}
                                className="border-2 px-2 py-1 hover:outline-secondary active:outline-secondary focus:outline-secondary"
                                value={message}
                                onChange={(e) => setMessage(e.target.value)}
                            />
                            <span className="text-red-600 text-xs pt-1">{error && error.message}</span>
                        </div>
                        <div className="pt-6">
                        <div className="text-red-600 text-sm font-medium">{errmsg && errmsg}</div>
                        <div className="text-green-600 text-sm font-medium">{msg && msg}</div>
                            <button className="bg-secondary w-full p-2 text-lg font-semibold shadow-lg rounded-sm text-white hover:text-secondary hover:bg-white border border-secondary" onClick={sendEmailHandler} disabled = {loading}>{loading ? "Sending ..." : "Send Email"}</button>
                        </div>
                    </div>
                </div>
                <div className="md:w-3/6 sm:w-full lg:h-64 sm:pb-6">
                    <div className="flex flex-col md:items-end sm:items-center">
                        <div className="sm:w-full md:w-5/6 md:h-96">
                            <Image
                                src={`/images/customer_service/contact_us.jpg`}
                                width={500}
                                height={500}
                                alt=""
                                quality={100}
                                className="object-cover w-full h-full"
                            />
                        </div>
                        <div className="sm:w-full md:w-5/6 text-center">
                            <div>
                                <h4 className="text-lg font-medium text-secondary">Spice Direct Wholesale (EST 2018)</h4>
                                <h6 className="text-secondary sm:text-sm md:text-base">225 Bernard Street G403NX Glasgow UK</h6>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default ContactForm