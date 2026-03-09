import React from "react";

import * as Page from "../../../Page";
import {
  LogoutOutlined,
} from "@ant-design/icons";


const AdminNavbar = () => {
  return (
    <nav className="h-16 w-screen bg-green-600 text-white py-4 px-20 flex items-center justify-between ">
      <div></div>
      <div className="flex space-x-3">
        <a href={Page.Pagepath.admin}>รายชื่อผู้ใช้</a>
        <a href={Page.Pagepath.GetselfHistory}>เปลี่ยนโมเดล</a>
      </div>
      <div className="flex space-x-3">
        <div>
          <button
            className="cursor-pointer"
            onClick={() => {
              sessionStorage.clear();
            }}
          >
            <a href={Page.Pagepath.login}>
              <LogoutOutlined className="text-3xl" />
            </a>
          </button>
        </div>
      </div>
    </nav>
  );
};

export default AdminNavbar;
