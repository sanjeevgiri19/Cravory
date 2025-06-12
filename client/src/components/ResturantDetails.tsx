import { Badge } from "./ui/badge";
import { Timer } from "lucide-react";
import AvailableMenus from "./AvailableMenus";
import { Separator } from "./ui/separator";

const ResturantDetails = () => {
  return (
    <div className="max-w-6xl my-10 mx-auto">
      <div className="m-2">
        <div className="relative w-full h-44 md:h-64 lg:h-72">
          <img
            src="https://th.bing.com/th/id/OIP.cYywe_ua6wj5Ee6sn54XagHaEK?w=320&h=180&c=7&r=0&o=7&dpr=1.3&pid=1.7&rm=3"
            alt="resturant image"
            className="object-cover w-full h-full rounded-lg shadow-md"
          />
        </div>
        <div className="flex flex-col md:flex-row justify-between">
          <div className="my-5">
            <h2 className="font-semibold text-xl">Himali Momos</h2>
            <div className="flex gap-2 my-3 ">
              {["Biryani", "Momos"].map((cuisine: string, idx: number) => (
                <Badge className="px-5 py-2 text-sm rounded-full" key={idx}>
                  {cuisine}
                </Badge>
              ))}
            </div>
            <div className="flex md:flex-row flex-col gap-2 my-5">
              <div className="flex items-center gap-2">
                <Timer className="w-5 h-5" />
                <h1 className="font-medium flex items-center gap-1">
                  Delivery Time:{" "}
                  <span className="font-semibold text-orange-700">25 mins</span>
                </h1>
              </div>
            </div>
          </div>
        </div>
        <Separator />
        <div className="my-6">
          <AvailableMenus />
        </div>
      </div>
    </div>
  );
};

export default ResturantDetails;
