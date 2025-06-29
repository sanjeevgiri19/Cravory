import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useRestaurantStore } from "@/store/useRestaurant";
import { useEffect } from "react";

const Orders = () => {
  const { restaurantOrder, getRestaurantOrders, updateRestaurantOrder } =
    useRestaurantStore();

  const handleStatusChange = async (id: string, status: string) => {
    await updateRestaurantOrder(id, status);
  };
  useEffect(() => {
    getRestaurantOrders();
    console.log(restaurantOrder);
  }, []);

  return (
    <div className="max-w-6xl py-10 mx-auto px-4">
      <h1 className="text-2xl font-bold text-gray-800 dark:text-gray-100 mb-8">
        Orders Overview
      </h1>

      <div className="space-y-8">
        {restaurantOrder.map((order) => (
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center bg-white dark:bg-gray-800 shadow-lg rounded-lg p-6 sm:p-8 border border-gray-200 dark:border-gray-700">
            <div className="flex-1 mb-6 md:mb-2">
              <h2 className="text-xl font-bold text-gray-800 dark:text-gray-200">
                {order.deliveryDetails.name}
              </h2>
              <p className="text-gray-600 dark:text-gray-300 mt-2 text-lg">
                Address:{" "}
                <span className="font-semibold">
                  {order.deliveryDetails.address}
                </span>
              </p>
              <p className="text-gray-700 dark:text-gray-300 mt-2">
                Total Amount{" "}
                <span className="font-semibold text-orange-700">
                  Rs. {order.totalAmount ?? 0}
                </span>
              </p>
            </div>

            <div className="w-full sm:w-1/3">
              <Label className="block text-md font-medium text-gray-700 dark:text-gray-300 mb-2">
                Order status
              </Label>

              <Select
                onValueChange={(newStatus) =>
                  handleStatusChange(order._id, newStatus)
                }
                defaultValue={order.status}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select Status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectLabel>Status</SelectLabel>
                    {[
                      "Pending",
                      "Confirmed",
                      "Preparing",
                      "OutForDelivery",
                      "Delivered",
                    ].map((status: string, idx: number) => (
                      <SelectItem key={idx} value={status.toLocaleLowerCase()}>
                        {status}
                      </SelectItem>
                    ))}
                  </SelectGroup>
                </SelectContent>
              </Select>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Orders;
