import { Search } from "lucide-react";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "../ui/button";

const HeroSection: React.FC = () => {
  const [searchText, setSearchText] = useState("");
  const navigate = useNavigate();
  // console.log(navigate);
  
  return (
    <div className="flex flex-col md:flex-row max-w-7xl mx-auto md:p-10 rounded-lg items-center justify-center m-4 gap-20">
      <section className=" py-16">
        <div className="container mx-auto px-4 flex flex-col-reverse lg:flex-row items-center justify-between gap-12">
          <div className="w-full lg:w-1/2 text-center lg:text-left">
            <h1 className="text-4xl sm:text-5xl font-extrabold text-gray-900 mb-6 leading-tight">
              Delicious Food, <br className="hidden sm:block" />
              <span className="text-orange-500">
                {" "}
                Delivered To Your Doorstep
              </span>
            </h1>
            <p className="text-gray-700 text-lg mb-6">
              Craving something tasty? Explore our mouthwatering menu of
              burgers, pizzas, desserts, and more. Fast, fresh, and hot—every
              time!
            </p>
            <div className="flex flex-col sm:flex-row justify-center lg:justify-start gap-4">
              <Link
                to="/order"
                className="bg-orange-500 hover:bg-orange-600 text-white px-6 py-3 rounded-full transition duration-300"
              >
                Order Now
              </Link>
              <Link
                to="/menu"
                className="border border-orange-500 text-orange-500 hover:bg-orange-100 px-6 py-3 rounded-full transition duration-300"
              >
                View Menu
              </Link>
            </div>
          </div>

          <div className="w-full lg:w-1/2 flex justify-center">
            {/* https://www.pexels.com/photo/green-leafy-vegetable-dish-in-gray-steel-bowl-with-fork-842571/ */}
            <img
              src="https://images.pexels.com/photos/842571/pexels-photo-842571.jpeg"
              alt="Delicious Food"
              className="w-80 h-80 object-cover rounded-full shadow-lg"
            />
          </div>
        </div>
        <div className=" mt-10 flex justify-center">
          <div className="relative items-center w-full max-w-xl flex gap-2 ">
            <Search className="absolute  left-2 text-gray-500" />
            <input
              type="text"
              placeholder="Search resturants..."
              value={searchText}
              onChange={(e) => setSearchText(e.target.value)}
              className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-full shadow-md focus:outline-none focus:ring-1 focus:ring-orange-400 transition-all"
            />
            <Button
              onClick={() => navigate(`/search/${searchText}`)}
              className="ml-4 cursor-pointer bg-orange-500 hover:bg-orange-600 text-white px-6 py-3 rounded-full transition"
            >
              search
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HeroSection;
