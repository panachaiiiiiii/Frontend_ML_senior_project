import React from 'react'
import BtnSidebar from './ComponentSidebar/BtnSidebar';

const Sidebar = () => {
  return (
    <aside className="w-72 h-screen bg-green-600 text-white p-4 flex flex-col">

      {/* ส่วนเมนูด้านบน */}
      <div className="space-y-5 mt-20 text-center">
        <BtnSidebar href="/dashboard" label="หน้าหลัก" />

      </div>
      <div className="space-y-5 mt-20 text-center">
        <BtnSidebar href="/users" label="โปรไฟล์" />
        <BtnSidebar href="/requirements" label="ข้อกำหนด" />
        <BtnSidebar href="/about" label="เกี่ยวกับเรา" />
      </div>
      {/* ดัน logout ลงล่าง แต่ยังอยู่ใน 1 จอ */}
      <div className="mt-auto text-center pb-6">
        <BtnSidebar href="/logout" label="ออกจากระบบ" />
      </div>

    </aside>
  );
};

export default Sidebar;



