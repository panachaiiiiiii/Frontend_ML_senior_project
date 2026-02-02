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
  return (
    <nav className="h-16 w-screen bg-green-600 text-white py-4 px-20 flex items-center justify-between ">
      <h1>
        <a className="cursor-pointer" href={Page.Pagepath.home}><HomeOutlined className="text-3xl" /></a>
      </h1>
      <div className="flex space-x-3">
        <a href="#">คัดกรองโรค</a>
        {loggedIn ? <a href="#">ประวัติการคัดกรอง</a> : null}
      </div>
      <div className="flex space-x-3">
        {loggedIn ? (
          <div className="flex space-x-4">
            <div>
              <a className="cursor-pointer" href={Page.Pagepath.settings}><SettingOutlined className="text-3xl" /></a>
            </div>
            <div>
              <button className="cursor-pointer" onClick={()=>{sessionStorage.clear()}}><a href={Page.Pagepath.login}><LogoutOutlined className="text-3xl" /></a></button>
            </div>
          </div>
        ) : (
          <div>
            <button className="cursor-pointer" onClick={()=>{sessionStorage.clear()}}><a href={Page.Pagepath.login}><LogoutOutlined className="text-3xl" /></a></button>
          </div>
        )}
      </div>
    </nav>
  );
}

export default Navbar;
