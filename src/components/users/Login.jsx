'use client'
import call_api from '@/helper/Api';
import { useState } from 'react';
import { redirect } from 'next/navigation';
import { FiMail, FiLock, FiEye, FiEyeOff, FiChevronRight } from 'react-icons/fi';
import Image from 'next/image';

const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [errors, setErros] = useState({ email: '', password: '', userstatus: '' });
    const [msg, setMsg] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

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
        if (password.length < 6) {
            return "Password must be at least 6 characters";
        }
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
        setIsLoading(true);
        const rbody = { email, password }
        const res = await call_api.loginuser(rbody);
        if (res.success) {
            redirect('/admin/dashboard/order_management');
        } else {
            setMsg('login faild, network error')
            console.log("network error, cannot login user")
        };
        setIsLoading(false);
    }
    return (
        <section className="min-h-screen bg-gradient-to-br from-gray-50 to-indigo-100 flex items-center justify-center p-4">
            <div className="max-w-md w-full bg-white rounded-2xl shadow-xl overflow-hidden">
                <div className="p-8">
                    {/* Logo/Header Section */}
                    <div className="text-center mb-8">
                        <div className="w-24 h-24 bg-indigo-600 rounded-full flex items-center justify-center mx-auto mb-4">
                            <Image
                                src={"/logo/spicedirectlogo.png"}
                                width={200}
                                height={200}
                                alt={"SDW"}
                            />
                        </div>
                        <h1 className="text-3xl font-bold text-gray-800">Spice Direct Wholesale</h1>
                        <p className="text-gray-600 mt-2">Sign in to your admin account</p>
                    </div>

                    {/* Form Section */}
                    <div className="space-y-6">
                        <div className="space-y-2">
                            <label htmlFor="email" className="text-sm font-medium text-gray-700 block">Email Address</label>
                            <div className="relative">
                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                    <FiMail className="h-5 w-5 text-gray-400" />
                                </div>
                                <input
                                    type="email"
                                    placeholder="Enter your email address"
                                    id="email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    className="block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition duration-200"
                                />
                            </div>
                            {errors.email && <p className="text-sm text-red-600 mt-1 flex items-center"><FiChevronRight className="mr-1" /> {errors.email}</p>}
                        </div>

                        <div className="space-y-2">
                            <div className="flex items-center justify-between">
                                <label htmlFor="password" className="text-sm font-medium text-gray-700 block">Password</label>
                            </div>
                            <div className="relative">
                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                    <FiLock className="h-5 w-5 text-gray-400" />
                                </div>
                                <input
                                    type={showPassword ? "text" : "password"}
                                    placeholder="Enter your password"
                                    id="password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    className="block w-full pl-10 pr-12 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition duration-200"
                                />
                                <button
                                    type="button"
                                    className="absolute inset-y-0 right-0 pr-3 flex items-center"
                                    onClick={() => setShowPassword(!showPassword)}
                                >
                                    {showPassword ? (
                                        <FiEyeOff className="h-5 w-5 text-gray-400 hover:text-gray-600" />
                                    ) : (
                                        <FiEye className="h-5 w-5 text-gray-400 hover:text-gray-600" />
                                    )}
                                </button>
                            </div>
                            {errors.password && <p className="text-sm text-red-600 mt-1 flex items-center"><FiChevronRight className="mr-1" /> {errors.password}</p>}
                        </div>

                        {msg && (
                            <div className="bg-red-50 text-red-700 px-4 py-3 rounded-lg flex items-start">
                                <FiChevronRight className="mr-2 mt-0.5 flex-shrink-0" />
                                <span>{msg}</span>
                            </div>
                        )}
                        <button
                            onClick={loginHandler}
                            disabled={isLoading}
                            className="w-full bg-indigo-600 hover:bg-indigo-700 text-white py-3 px-4 rounded-lg font-medium transition duration-200 flex items-center justify-center focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50"
                        >
                            {isLoading ? (
                                <>
                                    Signing in...
                                </>
                            ) : (
                                'Sign in'
                            )}
                        </button>
                    </div>
                    <div className="mt-8 text-center">
                        <p className="text-sm text-gray-600">
                            © {new Date().getFullYear()} Spice Direct Wholesale. All rights reserved.
                        </p>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default Login