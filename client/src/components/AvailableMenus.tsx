import { Card, CardContent, CardFooter } from "./ui/card";
import { Button } from "./ui/button";
import type { MenuItem } from "@/types/restaurantTypes";
import { useCartStore } from "@/store/useCartStore";
import { useNavigate } from "react-router-dom";

const AvailableMenus = ({ menus = [] }: { menus?: MenuItem[] }) => {
  console.log("men", menus);

  const { addToCart } = useCartStore();
  const navigate = useNavigate();
  return (
    <div className="md:p-4">
      <div className="">
        <h2 className="text-xl md:text-2xl font-semibold">Available Menus</h2>

        <div className="grid md:grid-cols-3 gap-4 space-y-4 md:space-y-0 my-4">
          {menus.map((menu: MenuItem) => (
            <Card className="max-w-sm mx-auto shadow-md rounded-lg overflow-hidden">
              <img
                src={menu.image}
                alt=""
                className="w-full h-40 object-cover"
              />
              <CardContent className="p-2">
                <h2 className="text-xl font-semibold text-gray-800 dark:text-gray-200">
                  {menu.name}
                </h2>
                <p className="text-sm text-gray-700 mt-1">{menu.description}</p>
                <h3 className="mt-2 text-lg font-semibold ">
                  Price:{" "}
                  <span className="text-orange-700">Rs. {menu.price}</span>
                </h3>
              </CardContent>

              <CardFooter className="">
                <Button
                  onClick={() => {
                    addToCart(menu);
                    navigate("/cart");
                  }}
                  className="bg-orange-500 w-full hover:bg-orange-600 text-md cursor-pointer"
                >
                  Add to Cart
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AvailableMenus;
