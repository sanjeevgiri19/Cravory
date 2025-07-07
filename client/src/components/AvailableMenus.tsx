import { Card, CardContent } from "./ui/card";
import { Button } from "./ui/button";
// import type { MenuItem } from "@/types/restaurantTypes";
import { useCartStore } from "@/store/useCartStore";
import { useNavigate } from "react-router-dom";
import { useRestaurantStore } from "@/store/useRestaurant";
import type { cartItem } from "@/types/cartTypes";

// Extend cartItem to include a rating for display purposes
interface MenuItemWithRating extends cartItem {
  rating: number;
}

const AvailableMenus = ({ menus = [] }: { menus?: cartItem[] }) => {
  const { addToCart } = useCartStore();
  const { singleRestaurant } = useRestaurantStore();
  const navigate = useNavigate();

  const generateRandomRating = (): number => {
    return Math.random() < 0.5 ? 4 : 4.5;
  };

  // Map menus to include a random rating for display
  const menusWithRatings: MenuItemWithRating[] = menus.map((menu) => ({
    ...menu,
    rating: generateRandomRating(),
  }));

  return (
    <div className="py-6 px-4 sm:px-6 lg:px-8">
      <h2 className="text-3xl font-extrabold text-gray-900 mb-8 text-center">
        Available Menus
      </h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
        {menusWithRatings.length > 0 ? (
          menusWithRatings.map((menu: MenuItemWithRating) => (
            <Card
              key={menu._id}
              className="shadow-lg rounded-xl overflow-hidden flex flex-col transition-all duration-300 hover:scale-[1.02] hover:shadow-xl"
            >
              <div className="relative w-full h-36 overflow-hidden">
                <img
                  src={
                    menu.image ||
                    "https://via.placeholder.com/400x250?text=No+Image"
                  }
                  alt={menu.name}
                  className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
                />
                <div className="absolute top-2 left-2 bg-yellow-400 text-gray-900 px-2.5 py-0.5 rounded-full text-sm font-semibold flex items-center shadow-md">
                  ⭐ {menu.rating.toFixed(1)}
                </div>
              </div>
              <CardContent className="p-2 flex-grow flex flex-col">
                <h3 className="text-xl font-bold text-gray-800 mb-0.5">
                  {menu.name}
                </h3>
                <p className="text-gray-600 text-sm mb-2 line-clamp-2">
                  {menu.description}
                </p>
                <div className="mt-auto flex items-center justify-between pt-2 border-t border-gray-100">
                  <span className="text-xl font-extrabold text-green-600">
                    Rs. {menu.price.toFixed(2)}
                  </span>
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
                      console.log("adding menu to cart avail");
                      navigate("/cart");
                    }}
                    className="bg-orange-500 hover:bg-orange-600 cursor-pointer text-white font-semibold py-1.5 px-4 rounded-lg shadow-md transition-colors duration-300 text-sm"
                  >
                    Add to Cart
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))
        ) : (
          <p className="col-span-full text-center text-gray-600 text-lg py-10">
            No menus available for this restaurant.
          </p>
        )}
      </div>
    </div>
  );
};

export default AvailableMenus;
