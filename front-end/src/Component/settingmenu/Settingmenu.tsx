import React, { useState } from "react";
import Tabbtn from "../btns/Tabbtn";
import Modal from "./Modal/Modal";

const Settingmenu = () => {
  const [open, setOpen] = useState(false); // ✅ ต้องอยู่ตรงนี้
  const [label, setLabel] = useState("");


  return (
    <div className="w-2/3 rounded-2xl border border-black bg-white p-6">
      <div className="grid grid-cols-2 gap-4">
        
        <div className="col-span-2">
          <Tabbtn label="userID" muted />
        </div>

        <Tabbtn
          label="ชื่อจริง"
          onClick={() => {setOpen(true); setLabel("ชื่อจริง");}}
        />

        <Modal
          open={open}
          label={label}

          onClose={() => { setOpen(false);  }}
        />

        <Tabbtn label="นามสกุล"
        onClick={() => { setLabel("นามสกุล");setOpen(true);}}
        />
        <Tabbtn label="วันเกิด"
        onClick={() => { setLabel("วันเกิด"); setOpen(true);}}/>
        <Tabbtn label="เพศ"
        onClick={() => { setLabel("เพศ"); setOpen(true);}}/>
      </div>
    </div>
  );
};

export default Settingmenu;
