import React, { useState } from "react";
import Btn from "../../Component/btns/Btn";
import LoginBtn from "../../Component/btns/LoginBtn";
import { Pagepath } from "../../Page/index";
import { EyeInvisibleOutlined, EyeOutlined } from "@ant-design/icons";
import GuestBtn from "../btns/GuestBtn";
import { PagepathAPI } from "../../Router/Path";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../firebase/firebase"; // path ให้ตรง
import { useNavigate } from "react-router-dom";
import loading_state from "../Loading/loading";
import { FirebaseError } from "firebase/app";

const MenuLogin = () => {
  const [show, setShow] = useState(false);
  const [Email, setEmail] = useState("");
  const [Password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [loginerror, setloginerror] = useState("");
  const navigate = useNavigate();
  const handleSuccess = async () => {
    try {
      setLoading(true);

      const userCredential = await signInWithEmailAndPassword(
        auth,
        Email,
        Password,
      );

      const token = await userCredential.user.getIdToken();

      const response = await fetch(PagepathAPI.Login, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await response.json();

      if (data.status === 200) {
        console.log("Login success", data);

        sessionStorage.setItem("Token", data.token);

        navigate(Pagepath.home);
      }
    } catch (err: unknown) {
      if (err instanceof FirebaseError) {
        switch (err.code) {
          case "auth/invalid-credential":
            console.log("❌ รหัสผ่านไม่ถูกต้อง");
            setloginerror("Email หรือ รหัสผ่านไม่ถูกต้อง");
            break;

          case "auth/too-many-requests":
            console.log("❌ login ผิดหลายครั้งเกินไป");
            break;

          default:
            console.log("code:", err.code);
            console.log("message:", err.message);
        }
      } else {
        console.log("Unknown error", err);
      }
    } finally {
      setLoading(false);
    }
  };
  return (
    <div className="w-5/6 md:w-[478px] md:h-[517px] md:bg-white md:border border-black rounded-lg flex flex-col items-center py-6 gap-4 mx-auto">
      {loading && loading_state("กำลังคัดกรองโรค")}
      {/* Email */}
      <div className="w-[80%] flex flex-col gap-1">
        <label>Email</label>
        <input
          type="email"
          placeholder="Email"
          onChange={(e) => setEmail(e.target.value)}
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
          onChange={(e) => setPassword(e.target.value)}
        />
        <div className="text-red-600 text-sm">{loginerror}</div>
        <button
          type="button"
          onClick={() => setShow(!show)}
          className="absolute right-3 top-9 text-xl"
        >
          {!show ? (
            <EyeInvisibleOutlined className=" cursor-pointer" />
          ) : (
            <EyeOutlined className=" cursor-pointer" />
          )}
        </button>
      </div>

      {/* Login */}
      <Btn text="เข้าสู่ระบบ" onClick={handleSuccess} />

      {/* Divider */}
      <div className="flex items-center w-[90%] gap-3 my-2">
        <div className="flex-1 h-[1px] bg-black" />
        <span className="text-sm">OR SIGN IN WITH</span>
        <div className="flex-1 h-[1px] bg-black" />
      </div>

      {/* Google */}
      <LoginBtn
        label="Continue with Google"
        imgSrc="https://www.svgrepo.com/show/475656/google-color.svg"
      />

      {/* Guest */}
      <GuestBtn label="Continue with Guest" href={Pagepath.login} />

      {/* Register */}
      <div className="mt-2 text-sm">
        Don’t have an account?{" "}
        <span
          onClick={() => (window.location.href = Pagepath.register)}
          className="text-red-500 cursor-pointer"
        >
          Register
        </span>
      </div>
    </div>
  );
};

export default MenuLogin;
