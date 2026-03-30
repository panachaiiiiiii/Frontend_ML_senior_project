import { Outlet, useLocation } from "react-router-dom";
import Navbar from "./Component/Navbar/Navbar/Navbar";
import Sidebar from "./Component/Navbar/Sidebar/Sidebar";
import { Pagepath } from "./Page";
import MobileNav from "./Component/Navbar/NavbarMoblie/MobileNav";
import AdminNavbar from "./Component/Navbar/Navbar/AdminNavbar";

const Layout = () => {
  const location = useLocation();

  const hideNavbarPaths = [
    Pagepath.login,
    Pagepath.register,
    Pagepath.setupprofile,
  ] as const;

  const isAuthPage = hideNavbarPaths.includes(
    location.pathname as (typeof hideNavbarPaths)[number],
  );
  const isAdminPath = location.pathname.startsWith(Pagepath.admin);
  const isSettingsPage = location.pathname === Pagepath.settings;
  const guest = sessionStorage.getItem("Guest");

return (
    <div className={`medical-bg min-h-screen ${isSettingsPage ? "flex" : ""}`}>
      {/* Desktop */}
      <div className="hidden sm:block">
        {isAuthPage ? null : isSettingsPage ? (
          <Sidebar />
        ) : isAdminPath ? (
          <AdminNavbar />
        ) : (
          <Navbar loggedIn={!guest} />
        )}
      </div>

      <div className="block sm:hidden">{!isAuthPage && <MobileNav />}</div>


      <main className={"w-full"}>
        <Outlet />
      </main>
    </div>
  );
};

export default Layout;
