import React from "react";
import { Link } from "react-router-dom";

const HeroSection: React.FC = () => {
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
            <img
              src="/images/hero-food.png" // needs bg image
              alt="Delicious Food"
              className="w-80 h-auto rounded-xl shadow-lg"
            />
          </div>
        </div>
      </section>
    </div>
  );
};

export default HeroSection;
