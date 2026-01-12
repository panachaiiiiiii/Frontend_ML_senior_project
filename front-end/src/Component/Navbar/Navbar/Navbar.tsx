import React from "react";
import { HomeOutlined ,SettingOutlined, LogoutOutlined} from "@ant-design/icons";

function Navbar() {
  return (
    <nav className="h-16 w-screen bg-green-600 text-white py-4 px-20 flex items-center justify-between ">
      
      <h1>
        <HomeOutlined className="text-3xl" />
      </h1>
      <div className="flex space-x-3">
        <a href="#">คัดกรองโรค</a>
        <a href="#">ประวัติการคัดกรอง</a>
      </div>
      <div className="flex space-x-3">
        <div><SettingOutlined className="text-3xl"/></div>
        <div><LogoutOutlined className="text-3xl"/></div>

      </div>
      
    </nav>
  );
}

export default Navbar;
