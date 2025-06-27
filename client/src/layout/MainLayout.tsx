import Footer from "@/components/Footer";
import Navbar from "@/components/navbar/Navbar";
import { Outlet } from "react-router-dom";

const MainLayout = () => {
  return (
    <div className="flex flex-col min-h-screen ">
      <header>
        <Navbar />
      </header>
      <div className="flex- ">
        <Outlet />
      </div>
      <footer>
        <Footer />
      </footer>
    </div>
  );
};

export default MainLayout;
