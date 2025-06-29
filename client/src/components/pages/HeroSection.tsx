import { Search } from "lucide-react";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "../ui/button";
import FlowingMenu from "../FlowingMenu";

const foodItems = [
  {
    link: "/menu/pizza",
    foodName: "Classic Margherita",
    image:
      "https://images.unsplash.com/photo-1594007654729-407edc192562?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D", // Replace with actual image URLs
    description: "Timeless tomato, mozzarella, and fresh basil.",
  },
  {
    link: "/menu/burger",
    foodName: "Gourmet Cheeseburger",
    image:
      "https://images.unsplash.com/photo-1568901346379-8ce8e6a27e7f?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    description: "Juicy patty, cheddar, and caramelized onions.",
  },
  {
    link: "/menu/salad",
    foodName: "Fresh Garden Salad",
    image:
      "https://images.unsplash.com/photo-1540189549336-e619b674df7a?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    description: "Crisp greens, seasonal veggies, and vinaigrette.",
  },
  {
    link: "/menu/pasta",
    foodName: "Creamy Alfredo Pasta",
    image: "https://wallpapers.com/images/hd/burger-pictures-e7m25nk81m2mk5m7.jpg",
    description: "Rich and savory, with parmesan and garlic.",
  },
  {
    link: "/menu/dessert",
    foodName: "Chocolate Lava Cake",
    image:
      "https://images.unsplash.com/photo-1551026020-f5a0928e1d74?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    description: "Warm, gooey, and utterly delicious.",
  },
];

const HeroSection: React.FC = () => {
  const [searchText, setSearchText] = useState("");
  const navigate = useNavigate();
  // console.log(navigate);

  return (
    <div className="flex  md:flex-col  mx-auto md:p-10 rounded-lg items-center justify-center m-4 gap-20">
      <section className="flex flex-col py-16 max-w-7xl">
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
            <img
              src="https://images.pexels.com/photos/842571/pexels-photo-842571.jpeg"
              alt="Delicious Food"
              className="w-80 h-80 object-cover rounded-full shadow-lg"
            />
          </div>
        </div>
        <div className=" mt-20 ">
          <div className="relative items-center w-full max-w-3xl flex gap-2 ">
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
              className="ml-4 cursor-pointer text-xl bg-orange-500 hover:bg-orange-600 text-white px-6 py-6 rounded-full transition"
            >
              Search
            </Button>
          </div>
        </div>
      </section>
        <div className="mt-10 w-[90%]">
          <FlowingMenu items={foodItems} />
        </div>
    </div>
  );
};

export default HeroSection;
