import { UserOutlined } from "@ant-design/icons";
import React, { useState } from "react";
import Tabbtn from "../btns/Tabbtn";
import { useNavigate } from "react-router-dom";
import Modal from "./Modal/Modal";
import { Pagepath } from "../../Page";


const SettingmenuMoblie = () => {
    const navigate = useNavigate();
    const [open, setOpen] = useState(false); // ✅ ต้องอยู่ตรงนี้
    const [label, setLabel] = useState("");
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
          open={open}
          label={label}

          onClose={() => { setOpen(false);  }}
        />
      <div className="flex flex-col gap-3 mt-4">
        <Tabbtn label="User_00001" muted/>
        <Tabbtn label="ชื่อ" onClick={() => {setOpen(true); setLabel("ชื่อจริง");}}/>
        <Tabbtn label="นามสกุล" onClick={() => {setOpen(true); setLabel("ชื่อจริง");}}/>
        <Tabbtn label="วันเดือนปีเกิด" onClick={() => {setOpen(true); setLabel("วันเดือนปีเกิด");}}/>
        <Tabbtn label="เพศ" onClick={() => {setOpen(true); setLabel("ชื่อจริง");}}/>
        <div className="flex flex-col">
          <h1 className="text-lg font-bold">ประวัติ</h1>
          <Tabbtn label="ประวัติการคัดกรองโรค" onClick={() => navigate(Pagepath.history)} />
        </div>
        <div>
          <h1 className="text-lg font-bold">อื่น ๆ</h1>
          <div className="flex flex-col gap-3">
          <Tabbtn label="ข้อกำหนดและการให้ความยินยอม" />
          <Tabbtn label="เกี่ยวกับเรา" />
          <Tabbtn label="ออกจากระบบ" onClick={() => navigate("/logout")} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default SettingmenuMoblie;
