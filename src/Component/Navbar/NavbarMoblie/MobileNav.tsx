import {
  HomeOutlined,
  PictureOutlined,
  UserOutlined,
} from "@ant-design/icons";
import { Pagepath } from "../../../Page";
import { Link, useLocation } from "react-router-dom";

const MobileNav = () => {
  const location = useLocation();

  // ฟังก์ชันเช็คสถานะหน้าปัจจุบัน
  const isActive = (path: string) => location.pathname === path;

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 md:hidden">
      {/* Container หลัก: ใช้ความสูง 16-20 กำลังดีสำหรับนิ้วมือ */}
      <div className="relative h-18 bg-emerald-500 flex items-center justify-around px-8 pb-env(safe-area-inset-bottom) shadow-[0_-4px_15px_rgba(0,0,0,0.1)]">
        
        {/* Home */}
        <Link 
          to={Pagepath.home} 
          className={`flex flex-col items-center gap-1 transition-all ${
            isActive(Pagepath.home) ? "text-white scale-110" : "text-emerald-100/60"
          }`}
        >
          <HomeOutlined className="text-[26px]" />
          <span className="text-[10px] font-medium">หน้าหลัก</span>
        </Link>

        {/* Center Floating Button (ตรวจโรค) */}
        <div className="relative -top-5">
          <Link
            to={Pagepath.inspect}
            className="
              w-16 h-16 rounded-full
              bg-white
              flex items-center justify-center
              shadow-lg
              border-4 border-emerald-500
              active:scale-90 transition-transform
            "
          >
            <PictureOutlined className="text-emerald-600 text-[28px]" />
          </Link>
          {/* Label ใต้ปุ่มลอย */}
          <div className="absolute -bottom-5 left-1/2 -translate-x-1/2">
            <span className="text-[10px] text-white font-bold whitespace-nowrap">ตรวจผิวหนัง</span>
          </div>
        </div>

        {/* Profile / Settings */}
        <Link 
          to={Pagepath.settings} 
          className={`flex flex-col items-center gap-1 transition-all ${
            isActive(Pagepath.settings) ? "text-white scale-110" : "text-emerald-100/60"
          }`}
        >
          <UserOutlined className="text-[26px]" />
          <span className="text-[10px] font-medium">โปรไฟล์</span>
        </Link>

      </div>
    </div>
  );
};

export default MobileNav;