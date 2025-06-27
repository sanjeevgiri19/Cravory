// import { Search } from "lucide-react";
// import React, { useState } from "react";
// import { Link, useNavigate } from "react-router-dom";
// import { Button } from "../ui/button";
// import FlowingMenu from "../FlowingMenu";

// const foodItems = [
//   {
//     link: "/menu/pizza",
//     foodName: "Classic Margherita",
//     image:
//       "https://images.unsplash.com/photo-1594007654729-407edc192562?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D", // Replace with actual image URLs
//     description: "Timeless tomato, mozzarella, and fresh basil.",
//   },
//   {
//     link: "/menu/burger",
//     foodName: "Gourmet Cheeseburger",
//     image:
//       "https://images.unsplash.com/photo-1568901346379-8ce8e6a27e7f?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
//     description: "Juicy patty, cheddar, and caramelized onions.",
//   },
//   {
//     link: "/menu/salad",
//     foodName: "Fresh Garden Salad",
//     image:
//       "https://images.unsplash.com/photo-1540189549336-e619b674df7a?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
//     description: "Crisp greens, seasonal veggies, and vinaigrette.",
//   },
//   {
//     link: "/menu/pasta",
//     foodName: "Creamy Alfredo Pasta",
//     image: "https://wallpapers.com/images/hd/burger-pictures-e7m25nk81m2mk5m7.jpg",
//     description: "Rich and savory, with parmesan and garlic.",
//   },
//   {
//     link: "/menu/dessert",
//     foodName: "Chocolate Lava Cake",
//     image:
//       "https://images.unsplash.com/photo-1551026020-f5a0928e1d74?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
//     description: "Warm, gooey, and utterly delicious.",
//   },
// ];

// const HeroSection: React.FC = () => {
//   const [searchText, setSearchText] = useState("");
//   const navigate = useNavigate();
//   // console.log(navigate);

//   return (
//     <div className="flex  md:flex-col  mx-auto md:p-10 rounded-lg items-center justify-center m-4 gap-20">
//       <section className="flex flex-col py-16 max-w-7xl">
//         <div className="container mx-auto px-4 flex flex-col-reverse lg:flex-row items-center justify-between gap-12">
//           <div className="w-full lg:w-1/2 text-center lg:text-left">
//             <h1 className="text-4xl sm:text-5xl font-extrabold text-gray-900 mb-6 leading-tight">
//               Delicious Food, <br className="hidden sm:block" />
//               <span className="text-orange-500">
//                 {" "}
//                 Delivered To Your Doorstep
//               </span>
//             </h1>
//             <p className="text-gray-700 text-lg mb-6">
//               Craving something tasty? Explore our mouthwatering menu of
//               burgers, pizzas, desserts, and more. Fast, fresh, and hot—every
//               time!
//             </p>
//             <div className="flex flex-col sm:flex-row justify-center lg:justify-start gap-4">
//               <Link
//                 to="/order"
//                 className="bg-orange-500 hover:bg-orange-600 text-white px-6 py-3 rounded-full transition duration-300"
//               >
//                 Order Now
//               </Link>
//               <Link
//                 to="/menu"
//                 className="border border-orange-500 text-orange-500 hover:bg-orange-100 px-6 py-3 rounded-full transition duration-300"
//               >
//                 View Menu
//               </Link>
//             </div>
//           </div>

//           <div className="w-full lg:w-1/2 flex justify-center">
//             {/* https://www.pexels.com/photo/green-leafy-vegetable-dish-in-gray-steel-bowl-with-fork-842571/ */}
//             <img
//               src="https://images.pexels.com/photos/842571/pexels-photo-842571.jpeg"
//               alt="Delicious Food"
//               className="w-80 h-80 object-cover rounded-full shadow-lg"
//             />
//           </div>
//         </div>
//         <div className=" mt-20 ">
//           <div className="relative items-center w-full max-w-3xl flex gap-2 ">
//             <Search className="absolute  left-2 text-gray-500" />
//             <input
//               type="text"
//               placeholder="Search resturants..."
//               value={searchText}
//               onChange={(e) => setSearchText(e.target.value)}
//               className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-full shadow-md focus:outline-none focus:ring-1 focus:ring-orange-400 transition-all"
//             />
//             <Button
//               onClick={() => navigate(`/search/${searchText}`)}
//               className="ml-4 cursor-pointer text-xl bg-orange-500 hover:bg-orange-600 text-white px-6 py-6 rounded-full transition"
//             >
//               Search
//             </Button>
//           </div>
//         </div>
//       </section>
//         <div className="mt-10 w-[90%]">
//           <FlowingMenu items={foodItems} />
//         </div>
//     </div>
//   );
// };

// export default HeroSection;



import { Search } from "lucide-react";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import FlowingMenu from "../FlowingMenu"; // Adjust path if FlowingMenu.tsx is in a different directory

// --- Sample Food Items Data ---
const foodItems = [
  {
    link: "/menu/pizza",
    foodName: "Classic Margherita",
    image:
      "https://images.unsplash.com/photo-1594007654729-407edc192562?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
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
    image:
      "https://wallpapers.com/images/hd/burger-pictures-e7m25nk81m2mk5m7.jpg",
    description: "Rich and savory, with parmesan and garlic.",
  },
  {
    link: "/menu/dessert",
    foodName: "Chocolate Lava Cake",
    image:
      "https://images.unsplash.com/photo-1551026020-f5a0928e1d74?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1pYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    description: "Warm, gooey, and utterly delicious.",
  },
];

// --- HeroSection Component ---
const HeroSection: React.FC = () => {
  const [searchText, setSearchText] = useState("");
  const navigate = useNavigate();

  const handleSearch = () => {
    if (searchText.trim()) {
      navigate(`/search/${searchText}`);
    }
  };

  // Updated hero background image to match the coffee house theme
  const heroBackgroundImage =
    "https://th.bing.com/th/id/R.254907a821bfdf775f30c92723012364?rik=VsYLhZytgCs8IA&pid=ImgRaw&r=0"; // Coffee shop image

  return (
    <div className="flex flex-col w-full min-h-screen font-sans bg-gray-900 text-white">
      {/* Top section: Hero content with gradient overlay and background image */}
      <section
        className="relative flex items-center justify-start w-full h-screen bg-cover bg-right"
        style={{ backgroundImage: `url('${heroBackgroundImage}')` }}
      >
        {/* Gradient overlay from left to right for modern aesthetic */}
        <div className="absolute inset-0 bg-gradient-to-r from-yellow-800/70 via-orange-700/30 to-transparent"></div>
        {/* Content wrapper */}
        <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 lg:py-20">
          <div className="flex flex-col lg:flex-row items-center justify-between gap-12">
            {/* Text content */}
            <div className="w-full lg:w-1/2 text-left">
              <p className="text-sm uppercase tracking-wider text-gray-400 mb-2">
                Welcome to The Kaffen
              </p>
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold mb-6 leading-tight">
                The London <br className="hidden sm:block" /> Coffee House
              </h1>
              <p className="text-gray-300 text-base sm:text-lg mb-8">
                Experience the finest coffee crafted with passion. Explore our
                rich blends and cozy ambiance, delivered to your doorstep.
              </p>
              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row gap-4">
                <Link
                  to="/explore"
                  className="bg-gray-700 hover:bg-gray-600 text-white px-6 py-3 rounded-full transition duration-300"
                >
                  Explore More
                </Link>
                <Link
                  to="/delivery"
                  className="bg-orange-500 hover:bg-orange-600 text-white px-6 py-3 rounded-full transition duration-300"
                >
                  Get Delivery
                </Link>
              </div>
            </div>
            {/* Image placeholder (background image handles the visual) */}
            <div className="w-full lg:w-1/2 hidden lg:block"></div>
          </div>

          {/* Search Bar Section */}
          <div className="mt-12 sm:mt-16 w-full flex justify-center">
            <div className="relative w-full max-w-xl">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="Search coffee shops..."
                value={searchText}
                onChange={(e) => setSearchText(e.target.value)}
                onKeyPress={(e) => e.key === "Enter" && handleSearch()}
                className="w-full pl-12 pr-16 py-3 bg-yellow-100 border border-gray-700 rounded-full focus:outline-none focus:ring-2 focus:ring-orange-500 text-white placeholder-gray-500"
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

      {/* Flowing Menu Section */}
      <div className="w-full flex-grow overflow-hidden pt-16 pb-8 bg-gray-200">
        <div className="w-full sm:w-[95%] lg:w-[90%] mx-auto">
          <FlowingMenu items={foodItems} />
        </div>
      </div>
    </div>
  );
};

export default HeroSection;

