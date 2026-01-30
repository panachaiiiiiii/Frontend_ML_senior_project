import React, { useState } from 'react'
import Btn from "../../Component/btns/Btn";
import LoginBtn from "../../Component/btns/LoginBtn";
import {Pagepath} from "../../Page/index"
import { EyeInvisibleOutlined, EyeOutlined } from "@ant-design/icons";



const MenuLogin = () => {
    const [show, setShow] = useState(false);
   
  return (
    <div className="w-5/6 md:w-[478px] md:h-[517px] md:bg-white md:border border-black rounded-lg flex flex-col items-center py-6 gap-4 mx-auto">
      
      {/* Email */}
      <div className="w-[80%] flex flex-col gap-1">
        <label>Email</label>
        <input
          type="email"
          placeholder="Email"
          className="h-12 rounded-xl border bg-white border-black px-4 outline-none focus:shadow-lg "
        />
      </div>

      {/* Password */}
      <div className="w-[80%] flex flex-col gap-1 relative">
        <label>รหัสผ่าน</label>
        <input
          type={show ? "text" : "password"}
          placeholder="Password"
          className="h-12 rounded-xl border bg-white  border-black px-4 pr-10 outline-none focus:shadow-lg"
        />
        <button
          type="button"
          onClick={() => setShow(!show)}
          className="absolute right-3 top-9 text-xl"
        >
          {!show?<EyeInvisibleOutlined className=" cursor-pointer"/>:<EyeOutlined className=" cursor-pointer" />}
        </button>
        
      </div>



      {/* Login */}
      <Btn text="เข้าสู่ระบบ" href="/login" />

      {/* Divider */}
      <div className="flex items-center w-[90%] gap-3 my-2">
        <div className="flex-1 h-[1px] bg-black" />
        <span className="text-sm">OR SIGN IN WITH</span>
        <div className="flex-1 h-[1px] bg-black" />
      </div>

      {/* Google */}
      <LoginBtn  label="Continue with Google" imgSrc="https://www.svgrepo.com/show/475656/google-color.svg"/>
      

      {/* Guest */}
      <LoginBtn  label="Continue with Guest" href={Pagepath.login} />


      {/* Register */}
      <div className="mt-2 text-sm">
        Don’t have an account?{" "}
        <span onClick={() => window.location.href = Pagepath.register} className="text-red-500 cursor-pointer">Register</span>
      </div>
    </div>
  )
}

export default MenuLogin
