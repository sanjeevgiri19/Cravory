import { Link } from "react-router-dom";
import { MobileNavbar } from "./MobileNav";
import NavLinks from "./NavLinks";

const Navbar = () => {
  return (
    <div className="max-w-7xl mx-auto">
      <div className="flex items-center justify-between h-16">
        <Link to="/">
          <h1 className="font-semibold md:font-semibold text-2xl px-2">Cravory</h1>
        </Link>

        <NavLinks />

        <div className="md:hidden lg:hidden">
          <MobileNavbar />
        </div>
      </div>
    </div>
  );
};

export default Navbar;
