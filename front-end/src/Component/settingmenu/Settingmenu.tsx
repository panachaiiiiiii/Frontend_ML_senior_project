import React, { useEffect, useState } from "react";
import Tabbtn from "../btns/Tabbtn";
import Modal from "./Modal/Modal";
import { PagepathAPI } from "../../Router/Path";
import { Pagepath } from "../../Page";

const Settingmenu = () => {
  const [open, setOpen] = useState(false); // ✅ ต้องอยู่ตรงนี้
  const [label, setLabel] = useState("");
  const [value, setvalue] = useState("");
  const [Email, setEmail] = useState("");
  const [FirstName, setFirstName] = useState("");
  const [LastName, setLastName] = useState("");
  const [Gender, setGender] = useState("");
  const [key, setkey] = useState("");
  const [birthday, setbirthday] = useState("");
  const Token = sessionStorage.getItem("Token");
  const GetUserProfile = async () => {
    try {
      const res = await fetch(PagepathAPI.Profile, {
        method: "GET",

        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${Token}`,
        },
      });

      const data = await res.json();
      console.log(data);
      if (data.status === 400) {
        alert(data.detail || "ไม่พบผู้ใช้");
        return;
      }
      if (data.status === 202) {
        setEmail(data.user.email);
        setFirstName(data.user.first_name);
        setLastName(data.user.last_name);
        setbirthday(data.user.birthday);
        setGender(data.user.sex);
      }
    } catch (err) {
      console.error(err);
      alert("เชื่อมต่อเซิร์ฟเวอร์ไม่ได้");
    }
  };
  useEffect(() => {
    GetUserProfile();
  }, []);
  return (
    <div className="w-2/3 rounded-2xl border border-black bg-white p-6">
      <div className="grid grid-cols-2 gap-4">
        <div className="col-span-2">
          <Tabbtn label={Email || "-"} muted />
        </div>

        <Tabbtn
          label="ชื่อจริง"
          onClick={() => {
            setOpen(true);
            setLabel("ชื่อจริง");
            setvalue(FirstName || "-");
            setkey("first_name");
          }}
        />

        <Modal
          keys={key}
          open={open}
          label={label}
          value={value}
          setValue={setvalue}
          onClose={() => {
            setOpen(false);
          }}
        />

        <Tabbtn
          label="นามสกุล"
          onClick={() => {
            setLabel("นามสกุล");
            setvalue(LastName || "-");
            setOpen(true);
            setkey("last_name");
          }}
        />
        <Tabbtn
          label="วันเกิด"
          onClick={() => {
            setLabel("วันเกิด");
            setvalue(birthday || "-");
            setOpen(true);
            setkey("birthday");
          }}
        />
        <Tabbtn
          label="เพศ"
          onClick={() => {
            setLabel("เพศ");
            setvalue(Gender || "-");
            setOpen(true);
            setkey("sex")
          }}
        />
      </div>
    </div>
  );
};

export default Settingmenu;
