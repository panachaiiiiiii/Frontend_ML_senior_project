import { Outlet } from "react-router-dom";
import Sidebar from "./Component/Navbar/Sidebar/Sidebar";
const Layout = () => {
  return (
    <div className="flex">

     <Sidebar/>

        <main className="container mx-auto">
          <Outlet />
        </main>

      {/* <header className='bg-green-800'>Header</header> */}
      {/* <footer>Footer</footer> */}
    </div>
  );
};

export default Layout;
