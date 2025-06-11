import { useState } from "react";
import FilterPage from "./FilterPage";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Badge } from "./ui/badge";
import { Globe, MapPin, X } from "lucide-react";
import ixsnlogo from "@/assets/logoixsn.png";
import { Card, CardContent, CardFooter } from "./ui/card";
import { AspectRatio } from "@radix-ui/react-aspect-ratio";
import { Link } from "react-router-dom";

const SearchPage = () => {
  const [searchQuery, setSearchQuery] = useState<string>("");
  return (
    <div className="max-w-7xl mx-auto my-10">
      <div className="flex flex-col md:flex-row justify-between gap-10">
        <FilterPage />
        <div className="flex-1">
          {/* search input field  */}
          <div className="flex items-center gap-2">
            <Input
              type="text"
              value={searchQuery}
              placeholder="Search by resturant and cuisines"
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <Button className="bg-orange-400">Search</Button>
          </div>

          {/* searched items display here  */}
          <div className="flex flex-col gap-3 md:flex-row md:items-center md:gap-2 my-3">
            <h2 className="">(2) Search Result found</h2>
            <div className="flex flex-wrap mb-4 md:mb-0 gap-4">
              {["biryani", "chowmein", "momo"].map(
                (selectedSearch: string, idx: number) => (
                  <div
                    key={idx}
                    className="relative inline-flex items-center max-w-full "
                  >
                    <Badge
                      variant="outline"
                      className="text-orange-400 outline-none rounded-md pr-6 whitespace-nowrap"
                    >
                      {selectedSearch}
                    </Badge>
                    <X
                      size={16}
                      className="absolute right-1 text-orange-500 hover:cursor-pointer"
                    />
                  </div>
                )
              )}
            </div>
          </div>

          {/* Resturant cards  */}
          <div className="grid md:grid-cols-3 gap-4">
            {[1, 2, 3, 4].map((items: number, idx: number) => (
              <Card className="bg-white w-[90%] mx-auto md:w-full dark:bg-gray-800 shadow-xl rounded-xl overflow-hidden hover:shadow-2xl transition-shadow duration-300">
                <div className="relative">
                  <AspectRatio ratio={16 / 6}>
                    <img
                      src={ixsnlogo}
                      className="w-full h-full object-cover"
                      alt=""
                    />
                  </AspectRatio>
                  <div className="absolute top-2 left-2 bg-gray-200 dark:bg-gray-700 bg-opacity-75 px-3 py-1 rounded-lg">
                    <span className="text-md font-medium text-gray-700 dark:text-gray-300">
                      Featured
                    </span>
                  </div>
                </div>
                <CardContent className="p-2">
                  <h2 className="text-xl font-semibold text-gray-800 dark:text-gray-100 ">
                    Pizza Hut
                  </h2>
                  <div className="flex items-center mt-1">
                    <MapPin size={16} />
                    <p className="text-gray-600 text-sm font-medium">
                      {" "}
                      City: <span className="font-semibold">Kathmandu</span>
                    </p>
                  </div>
                  <div className="flex items-center mt-1">
                    <Globe size={16} />
                    <p className="text-gray-600 text-sm font-medium">
                      {" "}
                      Country: <span className="font-semibold">Nepal</span>
                    </p>
                  </div>
                  <div className="flex gap-2 mt-3 flex-wrap">
                    {["jalebi", "laddu", "thali"].map(
                      (cuisine: string, idx: number) => (
                        <div key={idx} className="">
                          <Badge
                            variant="default"
                            className="px-3 py-1.5 font-medium  rounded-lg shadow-sm"
                          >
                            {cuisine}
                          </Badge>
                        </div>
                      )
                    )}
                  </div>
                </CardContent>
                <CardFooter className="flex border-t dark:border-t-gray-700 border-t-gray-200 text:white justify-end">
                  <Link to={`/resturant/${123}`} className="">
                    <Button className="bg-orange-500 hover:bg-orange-600 font-semibold rounded-full shadow-md transition-colors duration-300 cursor-pointer">
                      View Menu
                    </Button>
                  </Link>
                </CardFooter>
              </Card>
            ))}
            <Card className="bg-white w-[90%] mx-auto md:w-full dark:bg-gray-800 shadow-xl rounded-xl overflow-hidden hover:shadow-2xl transition-shadow duration-300">
              <div className="relative">
                <AspectRatio ratio={16 / 6}>
                  <img
                    src={ixsnlogo}
                    className="w-full h-full object-cover"
                    alt=""
                  />
                </AspectRatio>
                <div className="absolute top-2 left-2 bg-gray-200 dark:bg-gray-700 bg-opacity-75 px-3 py-1 rounded-lg">
                  <span className="text-md font-medium text-gray-700 dark:text-gray-300">
                    Featured
                  </span>
                </div>
              </div>
              <CardContent className="p-2">
                <h2 className="text-xl font-semibold text-gray-800 dark:text-gray-100 ">
                  Pizza Hut
                </h2>
                <div className="flex items-center mt-1">
                  <MapPin size={16} />
                  <p className="text-gray-600 text-sm font-medium">
                    {" "}
                    City: <span className="font-semibold">Kathmandu</span>
                  </p>
                </div>
                <div className="flex items-center mt-1">
                  <Globe size={16} />
                  <p className="text-gray-600 text-sm font-medium">
                    {" "}
                    Country: <span className="font-semibold">Nepal</span>
                  </p>
                </div>
                <div className="flex gap-2 mt-3 flex-wrap">
                  {["jalebi", "laddu", "thali"].map(
                    (cuisine: string, idx: number) => (
                      <div key={idx} className="">
                        <Badge
                          variant="default"
                          className="px-3 py-1.5 font-medium  rounded-lg shadow-sm"
                        >
                          {cuisine}
                        </Badge>
                      </div>
                    )
                  )}
                </div>
              </CardContent>
              <CardFooter className="flex border-t dark:border-t-gray-700 border-t-gray-200 text:white justify-end">
                <Link to={`/resturant/${123}`} className="">
                  <Button className="bg-orange-500 hover:bg-orange-600 font-semibold rounded-full shadow-md transition-colors duration-300 cursor-pointer">
                    View Menu
                  </Button>
                </Link>
              </CardFooter>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SearchPage;
