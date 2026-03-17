import { EyeInvisibleOutlined, EyeOutlined } from "@ant-design/icons";
import { useState } from "react";
import Btn from "../btns/Btn";
import { Pagepath } from "../../Page";
import { PagepathAPI } from "../../Router/Path";

const Registermenu = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  const [error, setError] = useState("");


  // 🔹 กดปุ่มสมัครสมาชิก
  const handleRegister = async () => {
    // 1) เช็คค่าว่าง
    if (!email || !password || !confirmPassword) {
      setError("กรุณากรอกข้อมูลให้ครบ");
      return;
    }

    // 2) เช็ครหัสผ่านตรงกัน
    if (password !== confirmPassword) {
      setError("รหัสผ่านไม่ตรงกัน");
      return;
    }

    setError("");

    // 3) เตรียมส่งไป backend
    try {
      const res = await fetch(PagepathAPI.Register, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: email,
          password: password,
        }),
      });

      const data = await res.json();

      if (data.status === 400) {
        alert(data.detail || "สมัครสมาชิกไม่สำเร็จ");
        return;
      }
      if (data.status === 201) {
        alert("สมัครสมาชิกสำเร็จ 🎉");
        sessionStorage.setItem("Token",data.token)
        window.location.href = Pagepath.setupprofile;
      }
      
    } catch (err) {
      console.error(err);
      alert("เชื่อมต่อเซิร์ฟเวอร์ไม่ได้");
    }
  };

  return (
    <div className="w-5/6 min-h-80 md:w-[478px] md:h-fit md:bg-white md:border border-black rounded-lg flex flex-col items-center py-6 gap-5">

      {/* Email */}
      <div className="w-[80%] flex flex-col gap-1">
        <label>Email</label>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Email"
          className="w-full h-12 rounded-xl border border-black px-4 bg-white"
        />
      </div>

      {/* Password */}
      <div className="w-[80%] flex flex-col gap-1 relative">
        <label>รหัสผ่าน</label>
        <input
          type={showPassword ? "text" : "password"}
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
          className="w-full h-12 rounded-xl border border-black px-4 pr-10 bg-white"
        />

        <button
          type="button"
          onClick={() => setShowPassword(!showPassword)}
          className="absolute right-3 top-9 text-lg"
        >
          {showPassword ? <EyeOutlined /> : <EyeInvisibleOutlined />}
        </button>
      </div>

      {/* Confirm */}
      <div className="w-[80%] flex flex-col gap-1 relative">
        <label>ยืนยันรหัสผ่าน</label>
        <input
          type={showConfirm ? "text" : "password"}
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          placeholder="Confirm Password"
          className="w-full h-12 rounded-xl border border-black px-4 pr-10 bg-white"
        />

        <button
          type="button"
          onClick={() => setShowConfirm(!showConfirm)}
          className="absolute right-3 top-9 text-lg"
        >
          {showConfirm ? <EyeOutlined /> : <EyeInvisibleOutlined />}
        </button>
      </div>

      {/* Error */}
      {error && (
        <p className="text-red-500 text-xl font-bold">{error}</p>
      )}

      {/* Button */}
      <Btn text="ลงทะเบียน" onClick={handleRegister} />

    </div>
  );
};

export default Registermenu;
