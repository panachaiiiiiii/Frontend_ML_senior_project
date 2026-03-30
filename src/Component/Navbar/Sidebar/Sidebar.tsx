import { 
  HomeOutlined, 
  UserOutlined, 
  LogoutOutlined 
} from '@ant-design/icons';
import BtnSidebar from './ComponentSidebar/BtnSidebar';
import { Pagepath } from '../../../Page';
import { useLocation } from 'react-router-dom';

const Sidebar = () => {
  const location = useLocation();

  const handleLogout = () => {
    sessionStorage.clear();
    window.location.href = Pagepath.login;
  };

  const isActive = (path: string) => location.pathname === path;

  return (
    <aside className="hidden md:flex w-72 h-screen sticky top-0 left-0 bg-emerald-600 text-white p-6 flex-col shadow-2xl">
      
      {/* Logo */}
      <div className="mb-10 mt-4 text-center">
        <h2 className="text-2xl font-black tracking-tighter text-white">
          SKIN<span className="text-emerald-200">AI</span>
        </h2>
        <div className="h-1 w-12 bg-emerald-300 mx-auto mt-1 rounded-full opacity-50" />
      </div>

      {/* Menu Groups */}
      <div className="flex flex-col gap-3 flex-1">
        <div className="text-[10px] font-bold text-emerald-200 uppercase tracking-[0.2em] mb-2 px-4 opacity-70">
          Main Menu
        </div>
        
        <BtnSidebar 
          href={Pagepath.home} 
          label="หน้าหลัก" 
          icon={<HomeOutlined />} 
          active={isActive(Pagepath.home)}
        />

        <div className="text-[10px] font-bold text-emerald-200 uppercase tracking-[0.2em] mt-6 mb-2 px-4 opacity-70">
          Account & Info
        </div>

        <BtnSidebar 
          href={Pagepath.settings} 
          label="โปรไฟล์" 
          icon={<UserOutlined />} 
          active={isActive(Pagepath.settings)}
        />
      </div>

      {/* Logout Section */}
      <div className="mt-auto border-t border-emerald-500/50 pt-6">
        <button 
          onClick={handleLogout}
          className="w-full group flex items-center justify-center gap-3 py-4 px-6 rounded-2xl bg-emerald-700/50 hover:bg-red-500 transition-all duration-300 shadow-lg hover:shadow-red-500/20"
        >
          <LogoutOutlined className="text-lg group-hover:scale-110 transition-transform" />
          <span className="font-bold tracking-wide">ออกจากระบบ</span>
        </button>
      </div>
    </aside>
  );
};

export default Sidebar;