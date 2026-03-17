import { UserOutlined } from "@ant-design/icons";
import React, { useEffect, useState } from "react";
import Tabbtn from "../btns/Tabbtn";
import { useNavigate } from "react-router-dom";
import Modal from "./Modal/Modal";
import { Pagepath } from "../../Page";
import { PagepathAPI } from "../../Router/Path";

const SettingmenuMoblie = () => {
  const navigate = useNavigate();
  const [open, setOpen] = useState(false); // ✅ ต้องอยู่ตรงนี้
  const [label, setLabel] = useState("");
  const [value, setvalue] = useState("");
  //const [_Email, setEmail] = useState("");
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

      if (data.status === 400) {
        alert(data.detail || "ไม่พบผู้ใช้");
        return;
      }
      if (data.status === 202) {
        //setEmail(data.user.email);
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
    const runfun = async () => {
      GetUserProfile();
    };
    runfun();
  }, []);
  return (
    <div>
      <div className="relative h-[110px] bg-green-300 border border-green-800 rounded-md w-[297px] flex items-center justify-center px-10">
        <UserOutlined
          className="
            absolute left-1/2 -top-14 -translate-x-1/2
            text-[48px]
            w-20 h-20 rounded-full
            bg-emerald-100
            flex items-center justify-center
            shadow-lg
          "
        />
        <p className="font-bold">Panachai Bualoi</p>
      </div>
      <Modal
        keys={key}
        open={open}
        label={label}
        value={value}
        setValue={setvalue}
        onClose={() => {
          setOpen(false);
        }}
        onSuccess={GetUserProfile} // ✅ เพิ่ม
      />
      <div className="flex flex-col gap-3 mt-4">
        <Tabbtn label="User_00001" muted />
        <Tabbtn
          label="ชื่อ"
          onClick={() => {
            setOpen(true);
            setLabel("ชื่อจริง");
            setvalue(FirstName || "-");
            setkey("first_name");
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
          label="วันเดือนปีเกิด"
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
            setkey("sex");
          }}
        />
        <div className="flex flex-col">
          <h1 className="text-lg font-bold">ประวัติ</h1>
          <Tabbtn
            label="ประวัติการคัดกรองโรค"
            onClick={() => navigate(Pagepath.GetselfHistory)}
          />
        </div>
        <div>
          <h1 className="text-lg font-bold">อื่น ๆ</h1>
          <div className="flex flex-col gap-3">
            <Tabbtn label="ข้อกำหนดและการให้ความยินยอม" />
            <Tabbtn label="เกี่ยวกับเรา" />
            <Tabbtn
              label="ออกจากระบบ"
              onClick={() => {
                sessionStorage.clear();
                navigate(Pagepath.login);
              }}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default SettingmenuMoblie;
