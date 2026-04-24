
import * as Page from "../../../Page";
import {
  HomeOutlined,
  SettingOutlined,
  LogoutOutlined,

} from "@ant-design/icons";
interface NavbarProps {
  loggedIn: boolean;

}

function Navbar({ loggedIn }: NavbarProps) {
  return (
    // เปลี่ยน w-screen เป็น w-full และเพิ่ม absolute z-50 เพื่อให้ลอยทับรูป
    <nav className="absolute top-0 left-0 h-16 w-full bg-green-600 backdrop-blur-sm text-white py-4 px-6 md:px-20 flex items-center justify-between z-50">
      <h1>
        <a className="cursor-pointer" href={Page.Pagepath.home}>
          <HomeOutlined className="text-3xl" />
        </a>
      </h1>
      <div className="flex space-x-6 font-medium">
        <a href={Page.Pagepath.inspect} className="hover:text-green-200 transition">คัดกรองโรค</a>
        {loggedIn ? (
          <a href={Page.Pagepath.GetselfHistory} className="hover:text-green-200 transition">ประวัติการคัดกรอง</a>
        ) : null}
      </div>
      <div className="flex items-center space-x-4">
        {loggedIn && (
          <a className="cursor-pointer" href={Page.Pagepath.settings}>
            <SettingOutlined className="text-3xl hover:rotate-90 transition-transform duration-300" />
          </a>
        )}
        <button 
          className="cursor-pointer" 
          onClick={() => { sessionStorage.clear(); window.location.href = Page.Pagepath.login; }}
        >
          <LogoutOutlined className="text-3xl hover:text-red-300 transition" />
        </button>
      </div>
    </nav>
  );
}

export default Navbar;
