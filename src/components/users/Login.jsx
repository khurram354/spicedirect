'use client'
import call_api from '@/helper/Api';
import { useState } from 'react';
import { redirect } from 'next/navigation';

const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [errors, setErros] = useState({ email: '', password: '', userstatus: '' });
    const [msg, setMsg] = useState('');

    const validateEmail = (email) => {
        if (email.trim() === '') {
            return "Please enter your email"
        };
        return "";
    }
    const validatePassword = (password) => {
        if (password.trim() === '') {
            return "Please enter password"
        };
        return '';
    }

    const loginHandler = async () => {
        const emailError = validateEmail(email);
        const passwordError = validatePassword(password);

        if (emailError || passwordError) {
            setErros({ email: emailError, password: passwordError });
            return;
        } else {
            setErros({ email: '', password: '' })
        }
        const rbody = { email, password }
        const res = await call_api.loginuser(rbody);
        if (res.success) {
            redirect('/admin/dashboard');
            console.log("user login successfully")
        } else {
            setMsg('login faild, network error')
            console.log("network error, cannot login user")
        };
    }
    return (
        <section className='w-screen h-screen absolute top-0 left-0 z-20 flex justify-center items-center rounded-sm bg-gray-200'>
            <div className='bg-primary shadow-xl w-4/12 h-5/6 p-2 rounded-md '>
                <div className='border-white border-2 w-full h-full flex flex-col justify-center shadow-lg px-3'>
                    <div className='h-1/4'>
                    <h4 className='text-center text-secondary semi-bold text-4xl'>Spice Direct Wholesale</h4>
                    <h6 className='text-center my-2 text-2xl text-secondary font-medium underline'>Login Form</h6></div>
                    <div className='px-2 my-4'>
                        <label htmlFor="email" className='text-secondary font-medium px-2'>Email</label>
                        <div className='py-2'>
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
                        <label htmlFor="password" className='text-secondary font-medium px-2'>Password</label>
                        <div className='py-2'>
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
                    <div className='px-2 mt-16'>
                        {msg && <p className='text-xs text-red-500'>{msg}</p>}
                        <button className='bg-secondary w-full text-white px-1 py-3 rounded-sm hover:bg-white hover:text-secondary font-semibold' onClick={loginHandler}>Login</button>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default Login