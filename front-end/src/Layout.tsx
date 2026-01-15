import { Outlet, useLocation } from "react-router-dom";
import Navbar from "./Component/Navbar/Navbar/Navbar";
import Sidebar from "./Component/Navbar/Sidebar/Sidebar";

const Layout = () => {
  const location = useLocation();
  const isSidebar = location.pathname === "/seting";

  return (
    <div className={`medical-bg ${!isSidebar ? "min-h-screen " : "flex min-h-screen"}`}>
      {!isSidebar ? (
        <Navbar loggedIn={true} />
      ) : (
        <Sidebar />
      )}

      <main className="mx-auto p-4 container ">
        <Outlet />
      </main>
    </div>
  );
};

export default Layout;
