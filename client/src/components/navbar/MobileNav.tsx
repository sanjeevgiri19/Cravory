import { useUserStore } from "@/store/useUserStore";
import { Sheet, SheetClose, SheetContent, SheetDescription, SheetFooter, SheetHeader, SheetTitle, SheetTrigger } from "../ui/sheet";
import { Button } from "../ui/button";
import { HandPlatter, Loader2, Menu, Moon, PackageCheck, ShoppingCart, SquareMenu, Sun, User, UtensilsCrossed } from "lucide-react";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "../ui/dropdown-menu";
import { Separator } from "../ui/separator";
import { Link } from "react-router-dom";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";

export const MobileNavbar = () => {
  const { user, loading, logout } = useUserStore();
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button size={"icon"} className="" variant="outline">
          <Menu size={"18"} />
        </Button>
      </SheetTrigger>

      <SheetContent className="flex flex-col">
        <SheetHeader className="flex flex-row items-center justify-between mt-6">
          <SheetTitle>IXSN</SheetTitle>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" size="icon">
                <Sun className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
                <Moon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
                <span className="sr-only">Toggle theme</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem>Light</DropdownMenuItem>
              <DropdownMenuItem>Dark</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </SheetHeader>
        {/* <DropdownMenuSeparator /> */}
        <Separator className="my-2" />
        <SheetDescription>
          <Link
            to="/profile"
            className="flex items-center gap-4 hover:bg-gray-300 px-3 py-2 rounded-lg cursor-pointer font-medium hover:text-gray-900"
          >
            <User />
            Profile
          </Link>
          <Link
            to="/order/status"
            className="flex items-center gap-4 hover:bg-gray-300 px-3 py-2 rounded-lg cursor-pointer font-medium hover:text-gray-900"
          >
            <HandPlatter />
            Order
          </Link>
          <Link
            to="/cart"
            className="flex items-center gap-4 hover:bg-gray-300 px-3 py-2 rounded-lg cursor-pointer font-medium hover:text-gray-900"
          >
            <ShoppingCart />
            Cart
          </Link>

          {user?.admin && (
            <>
              <Link
                to="/admin/menu"
                className="flex items-center gap-4 hover:bg-gray-300 px-3 py-2 rounded-lg cursor-pointer font-medium hover:text-gray-900"
              >
                <SquareMenu />
                Menu
              </Link>
              <Link
                to="/admin/restaurant"
                className="flex items-center gap-4 hover:bg-gray-200 px-3 py-2 rounded-lg cursor-pointer hover:text-gray-900 font-medium"
              >
                <UtensilsCrossed />
                <span>Restaurant</span>
              </Link>
              <Link
                to="/admin/orders"
                className="flex items-center gap-4 hover:bg-gray-200 px-3 py-2 rounded-lg cursor-pointer hover:text-gray-900 font-medium"
              >
                <PackageCheck />
                <span>Restaurant Orders</span>
              </Link>
            </>
          )}
        </SheetDescription>

        <SheetFooter className="flex flex-col gap-4">
          <div className="flex flex-row items-center gap-2">
            <Avatar>
              <AvatarImage />
              <AvatarFallback>CN</AvatarFallback>
            </Avatar>
            <h1
              className="font-semibold
            "
            >
              IXSN
            </h1>
          </div>

          <SheetClose asChild>
            {loading ? (
              <Button className="">
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Please wait
              </Button>
            ) : (
              <Button onClick={logout} className="">
                Logout
              </Button>
            )}
          </SheetClose>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
};
