import { Link } from "react-router-dom";
import { Separator } from "./ui/separator";
import { Button } from "./ui/button";

const OrderSuccess = () => {
  const orders = [1, 2, 3];

  if (orders.length === 0) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <h1 className="font-bold text-3xl text-gray-700 dark:text-gray-200 ">
          Order not found!
        </h1>
      </div>
    );
  }
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 dark:bg-gray-900 px-4">
      <div
        className="bg-white dark:bg-gray-800 shadow-lg rounded-lg p-6 max-w-lg w-full
      "
      >
        <h2 className="text-center mb-6 text-2xl font-bold text-gray-800 dark:text-gray-200">
          Order Status:{" "}
          <span className="text-orange-600">{"Confirm".toUpperCase()}</span>
        </h2>
        <div className="mb-6 space-y-6">
          <h3 className="text-lg font-semibold text-gray-700 dark:text-gray-200 mb-4">
            Order Summary
          </h3>

          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <img
                src="https://api.freeforstudents.org/assets/c2034dd9-311e-40db-881e-c436c471b3f9?format=auto&width=640"
                alt=""
                className="w-16 h-16 rounded-full object-cover"
              />
              <h4 className="font-medium text-lg text-gray-700 dark:text-gray-200 ">
                Pizza
              </h4>
            </div>
            <div className="">
              <h3 className="text-gray-800 dark:text-gray-200 text-lg flex items-center">
                Rs. <span className=" font-medium"> 530</span>
              </h3>
            </div>
          </div>
          <Separator className="my-4" />
        </div>
        <Link to="/cart">
          <Button
            size={"lg"}
            className="w-full text-lg bg-orange-600 hover:bg-orange-700 cursor-pointer rounded-md shadow-lg"
          >
            Continue
          </Button>
        </Link>
      </div>
    </div>
  );
};

export default OrderSuccess;
