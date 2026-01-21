import React from "react";
import Settingmenu from "../Component/settingmenu/Settingmenu";
import SettingmenuMoblie from "../Component/settingmenu/SettingmenuMoblie";

const Settings = () => {
  return (
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
