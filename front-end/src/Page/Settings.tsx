import React, { useEffect } from "react";
import Settingmenu from "../Component/settingmenu/Settingmenu";
import SettingmenuMoblie from "../Component/settingmenu/SettingmenuMoblie";
import { Pagepath } from ".";
import { useNavigate } from "react-router-dom";

const Settings = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const guest = sessionStorage.getItem("Guest");

    if (guest) {
      sessionStorage.clear();
      navigate(Pagepath.home);
    }
  }, [navigate]);

  return (
    <div className="flex flex-col items-center sm:justify-center min-h-screen">
      <div className="hidden sm:flex justify-center items-center w-full md:w-3/4">
        <Settingmenu />
      </div>

      <div className="sm:hidden flex mt-20">
        <SettingmenuMoblie />
      </div>
    </div>
  );
};

export default Settings;
