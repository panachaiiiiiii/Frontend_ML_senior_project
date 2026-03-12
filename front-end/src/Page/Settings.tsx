import React from "react";
import Settingmenu from "../Component/settingmenu/Settingmenu";
import SettingmenuMoblie from "../Component/settingmenu/SettingmenuMoblie";
import { Pagepath } from ".";

const Settings = () => {
  const Gust = sessionStorage.getItem("Guest");

  if (Gust) {
    sessionStorage.clear();
    window.location.href = Pagepath.home;
    return null;
  }
  return(
    <div className="flex flex-col items-center sm:justify-center min-h-screen ">
      <div className="hidden sm-1/2 sm:flex justify-center items-center w-full md:w-3/4">
        <Settingmenu />
      </div>
      <div className=" sm:hidden flex mt-20 ">
          <SettingmenuMoblie />
      </div>
    </div> 
  );
};

export default Settings;
