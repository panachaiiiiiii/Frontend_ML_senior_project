import React from "react";

import * as Page from "../../../Page";
import {
  HomeOutlined,
  SettingOutlined,
  LogoutOutlined,
  LoginOutlined,
} from "@ant-design/icons";
interface NavbarProps {
  loggedIn: boolean;

}

function Navbar({ loggedIn }: NavbarProps) {
   loggedIn = false;
  return (
    <nav className="h-16 w-screen bg-green-600 text-white py-4 px-20 flex items-center justify-between ">
      <h1>
        <HomeOutlined className="text-3xl" />
      </h1>
      <div className="flex space-x-3">
        <a href="#">คัดกรองโรค</a>
        {loggedIn ? <a href="#">ประวัติการคัดกรอง</a> : null}
      </div>
      <div className="flex space-x-3">
        {loggedIn ? (
          <div className="flex space-x-4">
            <div>
              <SettingOutlined className="text-3xl" />
            </div>
            <div>
              <LogoutOutlined className="text-3xl" />
            </div>
          </div>
        ) : (
          <div>
            <a href={Page.Pagepath.login}><LoginOutlined className="text-3xl" /></a>
          </div>
        )}
      </div>
    </nav>
  );
}

export default Navbar;
