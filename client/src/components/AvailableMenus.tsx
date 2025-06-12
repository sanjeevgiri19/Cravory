import { Card, CardContent, CardFooter } from "./ui/card";
import { Button } from "./ui/button";

const AvailableMenus = () => {
  return (
    <div className="md:p-4">
      <div className="">
        <h2 className="text-xl md:text-2xl font-semibold">Available Menus</h2>
        <div className="grid md:grid-cols-3 gap-4 space-y-4 md:space-y-0 my-4">
          <Card className="max-w-sm mx-auto shadow-md rounded-lg overflow-hidden">
            <img
              src="https://th.bing.com/th/id/OIP.cYywe_ua6wj5Ee6sn54XagHaEK?w=320&h=180&c=7&r=0&o=7&dpr=1.3&pid=1.7&rm=3"
              alt=""
              className="w-full h-40 object-cover"
            />
            <CardContent className="p-2">
              <h2 className="text-xl font-semibold text-gray-800 dark:text-gray-200">
                Tandoori Momos
              </h2>
              <p className="text-sm text-gray-700 mt-1">
                Lorem ipsum dolor sit amet consectetur. Lorem, ipsum.
              </p>
              <h3 className="mt-2 text-lg font-semibold ">
                Price: <span className="text-orange-700">Rs. 180</span>
              </h3>
            </CardContent>

            <CardFooter className="">
              <Button className="bg-orange-500 w-full hover:bg-orange-600 text-md cursor-pointer">
                Add to Cart
              </Button>
            </CardFooter>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default AvailableMenus;
