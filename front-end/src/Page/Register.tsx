import { EyeInvisibleOutlined, EyeOutlined } from "@ant-design/icons";
import React, { useState } from "react";
import Registermenu from "../Component/register/Registermenu";
import ProfileFillForm from "../Component/register/ProfileFillForm";


const Register = () => {




  return (
    <div className="flex flex-col items-center justify-center min-h-screen ">
      <Registermenu />
      {/* <ProfileFillForm /> */}
      {/* Checkboxes */}
      {/* <div className="w-[80%] flex flex-col gap-3 text-sm">
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
      </div> */}
    </div>
  );
}


export default Register;
