'use client'
import call_api from '@/helper/Api';
import {useState} from 'react'

const Register = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [errors, setErros] = useState({email:'', password:'', userstatus:''});
    const [userstatus, setUserstatus] = useState("");
    const [msg, setMsg] = useState('');

    const validateEmail = (email) => {
        if(email.trim() === '') {
            return "Please enter your email"
        };
        return "";
    }
    const validatePassword = (password) => {
        if(password.trim() === ''){
            return "Please enter password"
        };
        return '';
    }
    const validateUserstatus = (userstatus) => {
        if(userstatus.trim() === ''){
            return 'Please enter user status'
        };
        return '';
    }

    const registerHandler = async() => {
        const emailError = validateEmail(email);
        const passwordError = validatePassword(password);
        const userstatusError = validateUserstatus(userstatus);

        if(emailError || passwordError || userstatusError) {
            setErros({email: emailError, password: passwordError, userstatus: userstatusError});
            return;
        }else{
            setErros({email:'', password:'', userstatus:''})
        }
        const rbody = {email, password, userstatus}
        const res = await call_api.signupuser(rbody);
        if(res.success){
            console.log("user created successfully")
        }else{
            console.log("network error, cannot create user account")
        };
    }
  return (
    <section className='w-screen h-screen bg-white absolute top-0 left-0 z-20 flex justify-center items-center rounded-sm'>
        <div className='bg-gray-200 shadow-xl w-96 h-[500px] p-2 rounded-md'>
            <div className='border-white border-2 w-full h-full'>
            <h4 className='text-center mt-6 text-secondary font-semibold text-xl'>Spice Direct Wholesale</h4>
            <h6 className='text-center my-4 text-lg text-secondary font-semibold underline'>Registration Form</h6>
            <div className='px-2 my-4'>
                <label htmlFor="email" className='text-secondary font-medium'>Email</label>
                <div>
                <input type="email"
                placeholder='Please enter email'
                id='email'
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className='w-full p-2 rounded-sm shadow-md focus:outline-none text-gray-500 text-sm'
                />
                {errors.email && <p className='text-xs text-red-500'>{errors.email}</p>}
                </div>
               
            </div>
            <div className='px-2 my-4'>
                <label htmlFor="password" className='text-secondary font-medium'>Password</label>
                <div>
                <input type="text"
                placeholder='Please enter email'
                id='password'
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className='w-full p-2 rounded-sm shadow-md focus:outline-none text-gray-500 text-sm'
                />
                {errors.password && <p className='text-xs text-red-500'>{errors.password}</p>}
                </div>
                
            </div>
            <div className='px-2 my-4'>
                <label htmlFor="userstatus" className='text-secondary font-medium'>userstatus</label>
                <div>
                <input type="text"
                placeholder='Please enter email'
                id='userstatus'
                value={userstatus}
                onChange={(e) => setUserstatus(e.target.value)}
                className='w-full p-2 rounded-sm shadow-md focus:outline-none text-gray-500 text-sm'
                />
                {errors.userstatus && <p className='text-xs text-red-500'>{errors.userstatus}</p>}
                </div>
                
            </div>
            <div className='px-2 my-8'>
                <button className='bg-secondary w-full text-white p-1 rounded-sm hover:bg-white hover:text-secondary font-semibold' onClick={registerHandler}>Register</button>
            </div>
            </div>
            
        </div>
    </section>
  )
}

export default Register