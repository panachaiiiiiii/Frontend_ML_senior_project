import React, { useState } from "react";
const Register = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  return (
    <div
      style={{
        width: "478px",
        height: "442px",
        background: "#fff",
        border: "1px solid black",
        borderRadius: "8px",
        padding: "24px 0",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: "18px",
      }}
    >
      {/* Email */}
      <div style={{ width: "80%" }}>
        <label>Email</label>
        <input type="email" placeholder="Email" style={inputStyle} />
      </div>

      {/* Password */}
      <div style={{ width: "80%", position: "relative" }}>
        <label>รหัสผ่าน</label>
        <input
          type={showPassword ? "text" : "password"}
          placeholder="Password"
          style={inputStyle}
        />
        <EyeButton onClick={() => setShowPassword(!showPassword)} />
      </div>

      {/* Confirm Password */}
      <div style={{ width: "80%", position: "relative" }}>
        <label>ยืนยันรหัสผ่าน</label>
        <input
          type={showConfirm ? "text" : "password"}
          placeholder="Confirm Password"
          style={inputStyle}
        />
        <EyeButton onClick={() => setShowConfirm(!showConfirm)} />
      </div>

      {/* Checkboxes */}
      <div
        style={{
          width: "80%",
          display: "flex",
          flexDirection: "column",
          gap: "10px",
        }}
      >
        <Checkbox
          label={
            <>
              I agree with <span style={link}>Terms of Service Agreement</span>.
            </>
          }
        />
        <Checkbox
          label={
            <>
              I agree with <span style={link}>Privacy Policy</span>.
            </>
          }
        />
      </div>

      {/* Button */}
      <button style={btnStyle}>ลงทะเบียน</button>
    </div>
  );
};

export default Register;

const inputStyle: React.CSSProperties = {
  width: "100%",
  height: "48px",
  borderRadius: "10px",
  border: "1px solid black",
  padding: "0 14px",
  fontSize: "16px",
};

const btnStyle: React.CSSProperties = {
  width: "180px",
  height: "48px",
  background: "#2F8F6B",
  color: "white",
  borderRadius: "12px",
  border: "none",
  fontSize: "18px",
  cursor: "pointer",
};

const link: React.CSSProperties = {
  color: "red",
  cursor: "pointer",
};

const EyeButton = ({ onClick }: { onClick: () => void }) => (
  <span
    onClick={onClick}
    style={{
      position: "absolute",
      right: "12px",
      top: "38px",
      cursor: "pointer",
      fontSize: "18px",
    }}
  >
    👁
  </span>
);

const Checkbox = ({ label }: { label: React.ReactNode }) => (
  <label style={{ display: "flex", gap: "10px", alignItems: "center" }}>
    <input type="checkbox" />
    <span>{label}</span>
  </label>
);
