import { Badge } from "./ui/badge";
import { Timer } from "lucide-react";
import AvailableMenus from "./AvailableMenus";
import { Separator } from "./ui/separator";
import { useRestaurantStore } from "@/store/useRestaurant";
import { useParams } from "react-router-dom";
import { useEffect } from "react";

const ResturantDetails = () => {
  const params = useParams();
  const { singleRestaurant, getSingleRestaurant } = useRestaurantStore();

  useEffect(() => {
    getSingleRestaurant(params.id!);
    // console.log(singleRestaurant);
  }, [params.id]);

  return (
    <div className="max-w-6xl my-10 mx-auto">
      <div className="m-2">
        <div className="relative w-full h-44 md:h-64 lg:h-72">
          <img
            src={singleRestaurant?.imageUrl || "loading..."}
            alt="resturant image"
            className="object-cover w-full h-full rounded-lg shadow-md"
          />
        </div>
        <div className="flex flex-col md:flex-row justify-between">
          <div className="my-5">
            <h2 className="font-semibold text-xl">
              {singleRestaurant?.restaurantName}
            </h2>
            <div className="flex gap-2 my-3 ">
              {singleRestaurant?.cuisines.map(
                (cuisine: string, idx: number) => (
                  <Badge className="px-5 py-2 text-sm rounded-full" key={idx}>
                    {cuisine}
                  </Badge>
                )
              )}
            </div>
            <div className="flex md:flex-row flex-col gap-2 my-5">
              <div className="flex items-center gap-2">
                <Timer className="w-5 h-5" />
                <h1 className="font-medium flex items-center gap-1">
                  Delivery Time:{" "}
                  <span className="font-semibold text-orange-700">
                    {singleRestaurant?.deliveryTime} mins
                  </span>
                </h1>
              </div>
            </div>
          </div>
        </div>
        <Separator />
        <div className="my-6">
          <AvailableMenus
            menus={(singleRestaurant?.menus || []).map((menu) => ({
              ...menu,
              quantity: 1,
              restaurantId: singleRestaurant?._id || "",
            }))}
          />
        </div>
      </div>
    </div>
  );
};

export default ResturantDetails;
