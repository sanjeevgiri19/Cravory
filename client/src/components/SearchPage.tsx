import { useEffect, useState } from "react";
import FilterPage from "./FilterPage";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Badge } from "./ui/badge";
import { Globe, MapPin, X } from "lucide-react";
// import ixsnlogo from "@/assets/logoixsn.png";
import { Card, CardContent, CardFooter } from "./ui/card";
import { AspectRatio } from "@radix-ui/react-aspect-ratio";
import { Link, useParams } from "react-router-dom";
import { useRestaurantStore } from "@/store/useRestaurant";
import type { Restaurant } from "@/types/restaurantTypes";
import SearchPageSkeleton from "./others/SearchPageSkeleton";
import NoResultFound from "./others/NoResultFound";

const SearchPage = () => {
  const params = useParams();
  const [searchQuery, setSearchQuery] = useState<string>("");

  const { loading, searchedRestaurant, searchRestaurant, appliedFilter, setAppliedFilter } =
    useRestaurantStore();
  // console.log(searchedRestaurant);

  useEffect(() => {
    searchRestaurant(params.text!, searchQuery, appliedFilter);
    console.log(searchedRestaurant);
    console.log("ss", searchQuery);
  },[params.text!, appliedFilter]);

  return (
    <div className="max-w-7xl mx-auto my-10">
      <div className="flex flex-col md:flex-row justify-between gap-10">
        <FilterPage />
        <div className="flex-1">
          <div className="flex items-center gap-2">
            <Input
              type="text"
              value={searchQuery}
              placeholder="Search by resturant and cuisines"
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <Button
              onClick={() =>
                searchRestaurant(params.text!, searchQuery, appliedFilter)
              }
              className="bg-orange-400"
            >
              Search
            </Button>
          </div>

          <div className="flex flex-col gap-3 md:flex-row md:items-center md:gap-2 my-3">
            <h2 className="">
              ({searchedRestaurant?.data.length}) Search Result found
            </h2>
            <div className="flex flex-wrap mb-4 md:mb-0 gap-4">
              {appliedFilter.map((selectedSearch: string, idx: number) => (
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
                    onClick={() => setAppliedFilter(selectedSearch)}
                    size={16}
                    className="absolute right-1 text-orange-500 hover:cursor-pointer"
                  />
                </div>
              ))}
            </div>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            {loading ? (
              <SearchPageSkeleton />
            ) : !loading && searchedRestaurant?.data.length === 0 ? (
              <NoResultFound searchText={params.text!} />
            ) : (
              searchedRestaurant?.data.map((restaurant: Restaurant) => (
                <Card
                  key={restaurant._id}
                  className="bg-white w-[90%] mx-auto md:w-full dark:bg-gray-800 shadow-xl rounded-xl overflow-hidden hover:shadow-2xl transition-shadow duration-300"
                >
                  <div className="relative">
                    <AspectRatio ratio={16 / 6}>
                      <img
                        src={restaurant.imageUrl}
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
                      {restaurant.restaurantName}
                    </h2>
                    <div className="flex items-center mt-1">
                      <MapPin size={16} />
                      <p className="text-gray-600 text-sm font-medium">
                        {" "}
                        City:{" "}
                        <span className="font-semibold">{restaurant.city}</span>
                      </p>
                    </div>
                    <div className="flex items-center mt-1">
                      <Globe size={16} />
                      <p className="text-gray-600 text-sm font-medium">
                        {" "}
                        Country:{" "}
                        <span className="font-semibold">
                          {restaurant.country}
                        </span>
                      </p>
                    </div>
                    <div className="flex gap-2 mt-3 flex-wrap">
                      {restaurant.cuisines.map(
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
                    <Link to={`/resturant/${restaurant._id}`} className="">
                      <Button className="bg-orange-500 hover:bg-orange-600 font-semibold rounded-full shadow-md transition-colors duration-300 cursor-pointer">
                        View Menu
                      </Button>
                    </Link>
                  </CardFooter>
                </Card>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SearchPage;
