import { Outlet, useLocation } from "react-router-dom";
import Navbar from "./Component/Navbar/Navbar/Navbar";
import Sidebar from "./Component/Navbar/Sidebar/Sidebar";
import { Pagepath } from "./Page";
import MobileNav from "./Component/Navbar/NavbarMoblie/MobileNav";


const Layout = () => {
  const location = useLocation();
  const isSidebar = location.pathname === Pagepath.settings;
  const guest = sessionStorage.getItem("Guest");
  return (
    <div className={`medical-bg ${!isSidebar ? "min-h-screen " : "flex min-h-screen"}`}>
      
  {/* Desktop */}
  <div className="hidden sm:block">
    {
    location.pathname === Pagepath.login||location.pathname === Pagepath.register||location.pathname === Pagepath.setupprofile?<></>:!isSidebar ? <Navbar loggedIn={!guest?true:false}/> : <Sidebar />
    
    }
  </div>

  {/* Mobile */}
  <div className="block sm:hidden">
    <MobileNav />
  </div>

      <main className="mx-auto p-4 container">
        <Outlet />
      </main>
    </div>
  );
};

export default Layout;
