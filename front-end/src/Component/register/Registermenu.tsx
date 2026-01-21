import { EyeInvisibleOutlined, EyeOutlined } from '@ant-design/icons';
import React, { useState } from 'react'
import Btn from '../btns/Btn';


const Registermenu = () => {
      const [showPassword, setShowPassword] = useState(false);
      const [showConfirm, setShowConfirm] = useState(false);
  return (
     <div className=" w-5/6 min-h-80 md:w-[478px] md:h-[442px] md:bg-white md:border border-black rounded-lg flex flex-col items-center py-6 gap-5">
      
      {/* Email */}
      <div className="w-[80%] flex flex-col gap-1">
        <label>Email</label>
        <input
          type="email"
          placeholder="Email"
          className="w-full h-12 rounded-xl border border-black px-4 bg-white text-base outline-none focus:shadow-lg"
        />
      </div>

      {/* Password */}
      <div className="w-[80%] flex flex-col gap-1 relative">
        <label>รหัสผ่าน</label>
        <input
          type={showPassword ? "text" : "password"}
          placeholder="Password"
          className="w-full h-12 rounded-xl border border-black px-4 pr-10 bg-white text-base outline-none focus:shadow-lg"
        />
        <button
          type="button"
          onClick={() => setShowPassword(!showPassword)}
          className="absolute right-3 top-9 text-lg"
        >
          {!showPassword ? <EyeInvisibleOutlined className=" cursor-pointer" /> : <EyeOutlined className=" cursor-pointer" />}
        </button>
      </div>

      {/* Confirm Password */}
      <div className="w-[80%] flex flex-col gap-1 relative">
        <label>ยืนยันรหัสผ่าน</label>
        <input
          type={showConfirm ? "text" : "password"}
          placeholder="Confirm Password"
          className="w-full h-12 rounded-xl border border-black px-4 pr-10 bg-white text-base outline-none focus:shadow-lg"
        />
        <button
          type="button"
          onClick={() => setShowConfirm(!showConfirm)}
          className="absolute right-3 top-9 text-lg"
        >
          {!showConfirm ? <EyeInvisibleOutlined className=" cursor-pointer" /> : <EyeOutlined className=" cursor-pointer" />}
        </button>
      </div>

      {/* Checkboxes */}
      <div className="w-[80%] flex flex-col gap-3 text-sm">
        <label className="flex gap-2 items-center">
          <input type="checkbox" />
          <span>
            I agree with{" "}
            <a className="text-red-500 cursor-pointer">
              Terms of Service Agreement
            </a>
            .
          </span>
        </label>

        <label className="flex gap-2 items-center">
          <input type="checkbox" />
          <span>
            I agree with{" "}
            <a className="text-red-500 cursor-pointer">
              Privacy Policy
            </a>
            .
          </span>
        </label>
      </div>

      {/* Button */}
      <Btn href="" text="ลงทะเบียน"/>

    </div>
  )
}

export default Registermenu
