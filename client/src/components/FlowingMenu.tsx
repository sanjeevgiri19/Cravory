import React, { useRef } from "react"; // Ensure useRef is imported
import { Link } from "react-router-dom";
import { gsap } from "gsap"; // Import GSAP directly

type FoodItem = {
  link: string;
  foodName: string;
  image: string;
  description: string;
};

type FlowingMenuProps = {
  items: FoodItem[];
};

const FlowingMenu: React.FC<FlowingMenuProps> = ({ items }) => {
  // We'll create a ref for each item dynamically, or better,
  // manage them as a map if the number of items is very large and dynamic.
  // For a fixed array like `foodItems`, we can map refs directly.
  // Using an array of refs is more common for lists.
  const itemRefs = useRef<(HTMLDivElement | null)[]>([]);

  // Clear refs on unmount (optional but good practice)
  // useEffect(() => {
  //   return () => {
  //     itemRefs.current = [];
  //   };
  // }, []);

  // Function to handle mouse enter animation
  const handleMouseEnter = (index: number) => {
    const target = itemRefs.current[index];
    if (target) {
      gsap.to(target, {
        scale: 1.05, // Slightly enlarge the card
        y: -5, // Lift it up slightly
        boxShadow:
          "0 20px 25px -5px rgba(0, 0,0,0.1), 0 10px 10px -5px rgba(0,0,0,0.04)", // Stronger shadow
        duration: 0.3,
        ease: "power2.out",
      });
      // Animate the image within the card
      gsap.to(target.querySelector("img"), {
        scale: 1.1, // Zoom image slightly
        duration: 0.3,
        ease: "power2.out",
      });
      // Animate the text elements
      gsap.to(target.querySelector("h3"), {
        y: -2,
        color: "#f97316", // Change text color to orange-500
        duration: 0.3,
      });
    }
  };

  // Function to handle mouse leave animation
  const handleMouseLeave = (index: number) => {
    const target = itemRefs.current[index];
    if (target) {
      gsap.to(target, {
        scale: 1, // Return to original size
        y: 0, // Return to original position
        boxShadow:
          "0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)", // Original shadow
        duration: 0.3,
        ease: "power2.out",
      });
      // Return image to original scale
      gsap.to(target.querySelector("img"), {
        scale: 1,
        duration: 0.3,
        ease: "power2.out",
      });
      // Return text elements to original state
      gsap.to(target.querySelector("h3"), {
        y: 0,
        color: "#1f2937", // Return to gray-800
        duration: 0.3,
      });
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h2 className="text-3xl font-bold text-gray-800 text-center mb-8">
        Popular Food Categories
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {items.map((item, index) => (
          <Link to={item.link} key={item.foodName} className="block group">
            <div
              // Assign the ref to the element
              ref={(el) => {
                itemRefs.current[index] = el;
              }}
              className="relative bg-white rounded-lg shadow-md overflow-hidden transform transition-none flex flex-col h-full" // Removed Tailwind transition
              onMouseEnter={() => handleMouseEnter(index)}
              onMouseLeave={() => handleMouseLeave(index)}
            >
              <div className="w-full h-40 overflow-hidden">
                <img
                  src={item.image}
                  alt={item.foodName}
                  className="w-full h-full object-cover transition-none" // Removed Tailwind transition here too
                />
              </div>
              <div className="p-4 flex-grow flex flex-col justify-between">
                <div>
                  <h3 className="text-xl font-semibold text-gray-800 mb-2 transition-none">
                    {" "}
                    {/* Removed Tailwind transition here */}
                    {item.foodName}
                  </h3>
                  <p className="text-gray-600 text-sm line-clamp-2">
                    {item.description}
                  </p>
                </div>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default FlowingMenu;
