import { Link } from "react-router-dom";
import {
  Menubar,
  MenubarContent,
  MenubarItem,
  MenubarMenu,
  MenubarTrigger,
} from "../ui/menubar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { Button } from "../ui/button";
import { Loader2, Moon, ShoppingCart, Sun } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { useUserStore } from "@/store/useUserStore";
import { MobileNavbar } from "./MobileNav";

const Navbar = () => {
  const { user, loading, logout } = useUserStore();
  return (
    <div className="max-w-7xl mx-auto bg-gray-100">
      <div className="flex items-center justify-between h-16">
        <Link to="/">
          <h1 className="font-semibold md:font-semibold text-2xl px-2">IXSN</h1>
        </Link>

        <div className="hidden md:flex items-center gap-10">
          <div className="hidden md:flex items-center gap-6">
            <Link to="/" className="text-lg">
              Home
            </Link>
            <Link to="/order/status" className="text-lg ">
              Order
            </Link>
            <Link to="/profile" className="text-lg ">
              Profile
            </Link>

            {user?.admin && (
              <Menubar>
                <MenubarMenu>
                  <MenubarTrigger className="text-md">DashBoard</MenubarTrigger>
                  <MenubarContent>
                    <Link to="/admin/restaurant">
                      <MenubarItem>Resturant</MenubarItem>
                    </Link>

                    <Link to="/admin/menu">
                      <MenubarItem>Menu</MenubarItem>
                    </Link>
                    <Link to="/admin/orders">
                      <MenubarItem>Orders</MenubarItem>
                    </Link>
                  </MenubarContent>
                </MenubarMenu>
              </Menubar>
            )}
          </div>

          <div className="flex items-center gap-4">
            <div>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline" size="icon">
                    <Sun className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
                    <Moon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
                    <span className="sr-only">Toggle Theme</span>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem>Light</DropdownMenuItem>
                  <DropdownMenuItem>Dark</DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>

            <Link to="/cart" className="relative cursor-pointer">
              <ShoppingCart />
              {}
              <Button
                size="icon"
                className="absolute -inset-y-1 left-2 text-xs rounded-full w-4 h-4 bg-red-500 hover:bg-red-600"
              >
                4
              </Button>
            </Link>

            <div>
              <Avatar>
                <AvatarImage alt="ProfilePic" />
                <AvatarFallback>CN</AvatarFallback>
              </Avatar>
            </div>
            
            <div>
              {loading ? (
                <Button className="">
                  <Loader2 className="animate-spin mt-1 w-4 h-4" />
                  logging out
                </Button>
              ) : (
                <Button onClick={logout} className="">
                  Logout
                </Button>
              )}
            </div>
          </div>
        </div>

        <div className="md:hidden lg:hidden">
          <MobileNavbar />
        </div>
      </div>
    </div>
  );
};

export default Navbar;
