'use client'
import call_api from '@/helper/Api';
import {useState} from 'react';
import { redirect } from 'next/navigation';

const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [errors, setErros] = useState({email:'', password:'', userstatus:''});
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

    const loginHandler = async() => {
        const emailError = validateEmail(email);
        const passwordError = validatePassword(password);

        if(emailError || passwordError) {
            setErros({email: emailError, password: passwordError});
            return;
        }else{
            setErros({email:'', password:''})
        }
        const rbody = {email, password}
        const res = await call_api.loginuser(rbody);
        if(res.success){
            redirect('/admin/dashboard');
            console.log("user login successfully")
        }else{
            setMsg('login faild, network error')
            console.log("network error, cannot login user")
        };
    }
  return (
    <section className='w-screen h-screen bg-white absolute top-0 left-0 z-20 flex justify-center items-center rounded-sm'>
        <div className='bg-red-100 shadow-xl w-96 h-96 p-2 rounded-md'>
            <div className='border-white border-2 w-full h-full'>
            <h4 className='text-center mt-6 text-secondary font-semibold text-xl'>Spice Direct Wholesale</h4>
            <h6 className='text-center my-4 text-lg text-secondary font-semibold underline'>Login Form</h6>
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
                placeholder='Please enter password'
                id='password'
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className='w-full p-2 rounded-sm shadow-md focus:outline-none text-gray-500 text-sm'
                />
                {errors.password && <p className='text-xs text-red-500'>{errors.password}</p>}
                </div>                
            </div>
           
            <div className='px-2 my-8'>
                {msg && <p className='text-xs text-red-500'>{msg}</p>}
                <button className='bg-secondary w-full text-white p-1 rounded-sm hover:bg-white hover:text-secondary font-semibold' onClick={loginHandler}>Login</button>
            </div>
            </div>
            
        </div>
    </section>
  )
}

export default Login