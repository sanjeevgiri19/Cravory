import { Card, CardContent, CardFooter } from "./ui/card";
import { Button } from "./ui/button";
// import type { MenuItem } from "@/types/restaurantTypes";
import { useCartStore } from "@/store/useCartStore";
import { useNavigate } from "react-router-dom";
import { useRestaurantStore } from "@/store/useRestaurant";
import type { cartItem } from "@/types/cartTypes";

const AvailableMenus = ({ menus = [] }: { menus?: cartItem[] }) => {
  const { addToCart } = useCartStore();
  const { singleRestaurant } = useRestaurantStore();
  const navigate = useNavigate();
  return (
    <div className="md:p-4">
      <div className="">
        <h2 className="text-xl md:text-2xl font-semibold">Available Menus</h2>

        <div className="grid md:grid-cols-3 gap-4 space-y-4 md:space-y-0 my-4">
          {menus.map((menu: cartItem) => (
            <Card
              key={menu._id}
              className="max-w-sm mx-auto shadow-md rounded-lg overflow-hidden"
            >
              <img
                src={menu.image}
                alt="menu-image"
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
                    if (!singleRestaurant?._id) {
                      alert("Restaurant not loaded yet. Please wait.");
                      return;
                    }
                    addToCart({
                      ...menu,
                      restaurantId: singleRestaurant._id,
                      quantity: 1,
                    });
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
