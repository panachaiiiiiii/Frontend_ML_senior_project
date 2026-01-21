import { EyeInvisibleOutlined, EyeOutlined } from "@ant-design/icons";
import React, { useState } from "react";
import Registermenu from "../Component/register/Registermenu";
import ProfileFillForm from "../Component/register/ProfileFillForm";


const Register = () => {




  return (
    <div className="flex flex-col items-center justify-center min-h-screen ">
      <Registermenu />
      <ProfileFillForm />
    </div>
  );
}


export default Register;
