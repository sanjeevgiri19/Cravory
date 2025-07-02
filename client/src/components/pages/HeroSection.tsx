import { Search } from "lucide-react";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import FlowingMenu from "../FlowingMenu";

const foodItems = [
  {
    link: "/menu/momo",
    foodName: "Momo",
    image:
      "https://th.bing.com/th/id/OIP.Chi9ubiNswY7zwK3NeBXlAHaE-?w=249&h=180&c=7&r=0&o=7&dpr=1.1&pid=1.7&rm=3",
    description: "Timeless tomato, mozzarella, and fresh basil.",
  },
  {
    link: "/menu/chowmein",
    foodName: "chowmein",
    image:
      "https://th.bing.com/th/id/OIP.WpdCfVg5ZkIHxQg5HmFP6QHaHa?w=202&h=269&c=7&r=0&o=7&dpr=1.1&pid=1.7&rm=3",
    description: "Juicy patty, cheddar, and caramelized onions.",
  },
  {
    link: "/menu/biryani",
    foodName: "biryani",
    image:
      "https://th.bing.com/th/id/OIP.K0jFbQATWj9CZ73Nan8W4QHaFj?o=7rm=3&rs=1&pid=ImgDetMain&o=7&rm=3",
    description: "Crisp greens, seasonal veggies, and vinaigrette.",
  },
  {
    link: "/menu/burger",
    foodName: "Burger",
    image:
      "https://wallpapers.com/images/hd/burger-pictures-e7m25nk81m2mk5m7.jpg",
    description: "Rich and savory, with parmesan and garlic.",
  },
  {
    link: "/menu/dessert",
    foodName: "Chocolate Lava Cake",
    image:
      "https://th.bing.com/th/id/OIP.YMN82sIVYM7wbyj0ElJ3uwHaFh?w=258&h=192&c=7&r=0&o=7&dpr=1.1&pid=1.7&rm=3",
    description: "Warm, gooey, and utterly delicious.",
  },
];

const HeroSection: React.FC = () => {
  const [searchText, setSearchText] = useState("");
  const navigate = useNavigate();

  const handleSearch = () => {
    if (searchText.trim()) {
      navigate(`/search/${searchText.trim()}`);
    }
  };

  const heroBackgroundImage =
    "https://th.bing.com/th/id/R.254907a821bfdf775f30c92723012364?rik=VsYLhZytgCs8IA&pid=ImgRaw&r=0";

  return (
    <div className="flex flex-col w-full min-h-screen font-sans bg-gray-900 text-white">
      <section
        className="relative flex items-center justify-start w-full h-screen bg-cover bg-right"
        style={{ backgroundImage: `url('${heroBackgroundImage}')` }}
      >
        <div className="absolute inset-0 bg-gradient-to-r from-yellow-800/70 via-orange-700/30 to-transparent"></div>
        <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 lg:py-20">
          <div className="flex flex-col lg:flex-row items-center justify-between gap-12">
            <div className="w-full lg:w-1/2 text-left">
              <div className="bg-gray-400/70 px-2 rounded-full flex items-center justify-center py-1 w-56">
                <p className="text-sm uppercase tracking-wider font-medium text-gray-50">
                  Welcome to The IXSN
                </p>
              </div>
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold mb-6 leading-tight">
                The Famous <br className="hidden sm:block" /> Food App
              </h1>
              <p className="text-gray-200 text-base sm:text-lg mb-8">
                Craving something tasty? Explore our mouthwatering menu of
                burgers, pizzas, desserts, and more. Fast, fresh, and hot-every
                time! Experience the finest foods crafted with passion. Explore
                our rich blends and cozy ambiance, delivered to your doorstep.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link
                  to="/expore-menus"
                  className="bg-gray-700 hover:bg-gray-600 text-white px-6 py-3 rounded-full transition duration-300"
                >
                  Explore More
                </Link>
                <Link
                  to="/cart"
                  className="bg-orange-500 hover:bg-orange-600 text-white px-6 py-3 rounded-full transition duration-300"
                >
                  Order Now
                </Link>
              </div>
            </div>
            <div className="w-full lg:w-1/2 hidden lg:block"></div>
          </div>

          <div className="mt-12 sm:mt-16 w-full flex justify-center">
            <div className="relative w-full max-w-xl">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="Search by Countries and Restaurants..."
                value={searchText}
                onChange={(e) => setSearchText(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleSearch()}
                className="w-full pl-12 pr-16 py-3 bg-yellow-100 border border-gray-700 rounded-full focus:outline-none focus:ring-2 focus:ring-orange-500 text-gray-700 placeholder-gray-500"
              />
              <button
                onClick={handleSearch}
                className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-orange-500 hover:bg-orange-600 text-white px-6 py-2 rounded-full transition duration-300"
              >
                Search
              </button>
            </div>
          </div>
        </div>
      </section>

      <div className="w-full flex-grow overflow-hidden pt-16 pb-8 bg-gray-200">
        <div className="w-full sm:w-[95%] lg:w-[90%] mx-auto">
          <FlowingMenu items={foodItems} />
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
