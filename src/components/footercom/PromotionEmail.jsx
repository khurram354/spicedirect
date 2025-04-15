'use client'
import call_api from "@/helper/Api";
import { useState } from "react";
const PromotionEmail = () => {
    const [email, setEmail] = useState("");
    const [msg, setMsg] = useState("")

    const registerPromoEmailHandler = async(e) => {
        e.preventDefault();
        const rbody = {email};
        const resp = await call_api.registerpromotionemail(rbody);
        if(resp.success){setMsg("register successfully")}
        else{setMsg(resp.message)}
    }
  return (
    <div className="col-span-2 lg:col-span-3 lg:flex lg:items-end">
    <form className="w-full">
      <label htmlFor="UserEmail" className="sr-only"> Email </label>
      <div
        className="border border-gray-100 p-2 shadow-md md:text-lg text-lg sm:flex sm:items-center sm:gap-4">
        <input
          type="email"
          id="UserEmail"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Orders@spicedirectwholesale@gmail.com"
          className="w-full focus:outline-none focus:bg-none focus:ring-transparent sm:text-sm text-gray-500 md:text-lg px-2"
        />
        <button onClick={registerPromoEmailHandler}
          className="mt-1 w-full bg-primary px-6 py-3 text-sm font-bold uppercase tracking-wide text-white transition-none hover:bg-secondary sm:mt-0 sm:w-auto sm:shrink-0"
        >
          Sign Up
        </button>
        {msg && <p className="text-green-500 text-xs">{msg}</p>}
      </div>
    </form>
  </div>
  )
}

export default PromotionEmail