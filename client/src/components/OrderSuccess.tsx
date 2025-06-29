import { Link } from "react-router-dom";
import { Separator } from "./ui/separator";
import { Button } from "./ui/button";
import { useOrderStore } from "@/store/useOrderStore";
import { useEffect } from "react";
import type { cartItem } from "@/types/cartTypes";

const OrderSuccess = () => {
  const { orders, getOrderDetails } = useOrderStore();

  useEffect(() => {
    getOrderDetails();
  }, []);

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
          {orders.map((order: any, idx: number) => (
            <div key={idx}>
              {order.cartItems.map((item: cartItem) => (
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <img
                      src={item.image}
                      alt=""
                      className="w-16 h-16 rounded-full object-cover"
                    />
                    <h4 className="font-medium text-lg text-gray-700 dark:text-gray-200 ">
                      {item.name}
                    </h4>
                  </div>
                  <div className="">
                    <h3 className="text-gray-800 dark:text-gray-200 text-lg flex items-center">
                      Rs. <span className=" font-medium"> {item.price}</span>
                    </h3>
                  </div>
                </div>
              ))}
            </div>
          ))}

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
