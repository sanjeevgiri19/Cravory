import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Card, CardContent } from "../ui/card";
import { Button } from "../ui/button";
import { useCartStore } from "@/store/useCartStore";
// import type { MenuItem } from "@/types/restaurantTypes";
import type { cartItem } from "@/types/cartTypes";
// import { useRestaurantStore } from "@/store/useRestaurant";

// type MenuItem = {
//   _id: string;
//   name: string;
//   description: string;
//   price: number;
//   image: string;
// };

// Extend cartItem to include a rating for display purposes
interface MenuItemWithRating extends cartItem {
  rating: number;
}

const ExploreMenus = () => {
  const [menus, setMenus] = useState<MenuItemWithRating[]>([]);
  const [loading, setLoading] = useState(true);
  // const { restaurants } = useRestaurantStore();

  const { addToCart } = useCartStore();
  const navigate = useNavigate();

  const generateRandomRating = (): number => {
    return Math.random() < 0.5 ? 4 : 4.5;
  };

  useEffect(() => {
    fetch("https://cravory-y3qu.onrender.com/api/v1/menu/all")
    // fetch("http://localhost:8000/api/v1/menu/all")
      .then((res) => res.json())
      .then((data) => {
        // Map over the fetched menus and add a random rating to each
        const menusWithRatings = (data.menus || []).map((menu: cartItem) => ({
          ...menu,
          rating: generateRandomRating(),
        }));
        setMenus(menusWithRatings);
        setLoading(false);
      });
  }, []);

  if (loading)
    return (
      <div className="flex items-center justify-center min-h-[50vh] text-xl text-gray-600">
        Loading menus...
      </div>
    );

  return (
    <div className="max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
      <h1 className="text-3xl font-extrabold text-gray-900 mb-8 text-center">
        Discover Delicious Dishes
      </h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {menus.map((menu) => (
          <Card
            key={menu._id}
            className="shadow-lg rounded-xl overflow-hidden flex flex-col transition-all duration-300 hover:scale-[1.02] hover:shadow-xl"
          >
            <div className="relative w-full h-40 sm:h-44 overflow-hidden">
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
            <CardContent className=" px-4 flex-grow flex flex-col">
              <h2 className="text-xl font-bold text-gray-800 mb-1">
                {menu.name}
              </h2>
              <p className="text-gray-600 text-sm mb-1 line-clamp-2">
                {menu.description}
              </p>
              <div className="mt-auto flex items-center justify-between pt-2 border-t border-gray-100">
                <div className="text-xl font-extrabold text-green-600">
                  Rs. {menu.price.toFixed(2)}
                </div>
                <Button
                  className="bg-orange-500 hover:bg-orange-600 text-white font-semibold cursor-pointer py-1.5 px-4 rounded-lg shadow-md transition-colors duration-300 text-sm"
                  onClick={() => {
                    // console.log("explore menus cart");
                    // alert("Adding to cart!");
                    // if (!menu.restaurantId) {
                    //   alert("Restaurant not found for this menu item.");
                    //   return;
                    // }
                    // addToCart({
                    //   ...menu,
                    //   restaurantId: menu.restaurantId,
                    //   quantity: 1,
                    // });
                    // navigate("/cart");

                    addToCart(menu);
                    navigate("/cart");
                    console.log("adding menu to cart");
                  }}
                >
                  Add to Cart
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default ExploreMenus;
