// import type { MenuItem } from "@/types/restaurantTypes";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Card, CardContent, CardFooter } from "../ui/card";
import { Button } from "../ui/button";
import { useCartStore } from "@/store/useCartStore";
import { useRestaurantStore } from "@/store/useRestaurant";

type MenuItem = {
  _id: string;
  name: string;
  description: string;
  price: number;
  image: string;
};

const ExploreMenus = () => {
  const [menus, setMenus] = useState<MenuItem[]>([]);
  const [loading, setLoading] = useState(true);
  const { restaurants } = useRestaurantStore();

  const { addToCart } = useCartStore();
  const navigate = useNavigate();

  useEffect(() => {
    fetch("http://localhost:8000/api/v1/menu/all")
      .then((res) => res.json())
      .then((data) => {
        setMenus(data.menus || []);
        setLoading(false);
      });
  }, []);

  if (loading) return <div className="text-center py-10">Loading...</div>;

  return (
    <div className="max-w-7xl mx-auto py-10 px-4">
      <h1 className="text-3xl font-bold mb-8">Explore Menus</h1>
      <div className="grid md:grid-cols-3 gap-6">
        {menus.map((menu: MenuItem) => (
          <Card key={menu._id} className="shadow-md rounded-lg overflow-hidden">
            <img
              src={menu.image}
              alt={menu.name}
              className="w-full h-40 object-cover"
            />
            <CardContent className="p-4">
              <h2 className="text-xl font-semibold">{menu.name}</h2>
              <p className="text-gray-700 mt-2">{menu.description}</p>
              <div className="mt-2 text-lg font-bold text-orange-600">
                Rs. {menu.price}
              </div>
            </CardContent>
            <CardFooter>
              <Button
                onClick={() => {
                  const restaurant = restaurants?.find((r) =>
                    r.menus.some((m) => m._id === menu._id)
                  );
                  if (restaurant) {
                    addToCart({
                      ...menu,
                      restaurantId: restaurant._id,
                      quantity: 1,
                    });
                    navigate("/cart");
                  }
                  // addToCart({ ...menu });
                  // navigate("/cart");
                }}
              >
                Add to Cart
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default ExploreMenus;
