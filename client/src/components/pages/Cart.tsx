import { Minus, Plus, X } from "lucide-react";
import { Button } from "../ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import CheckoutConfirmPage from "../CheckoutConfirmPage";
import { useState } from "react";
import { useCartStore } from "@/store/useCartStore";
import type { cartItem } from "@/types/cartTypes";

const Cart = () => {
  const [open, setOpen] = useState<boolean>(false);
  const {
    cart,
    incrementQuantity,
    decrementQuantity,
    removeFromTheCart,
    clearCart,
  } = useCartStore();

  console.log("Cart contents:", cart);
  const totalAmount = cart.reduce((acc, elem) => {
    return acc + elem.price * elem.quantity;
  }, 0);

  return (
    <div className="flex flex-col max-w-7xl mx-auto my-10">
      <div className="flex justify-end">
        <Button variant={"link"} onClick={() => clearCart()} className="text-md">
          Clear All
        </Button>
      </div>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="text-lg">Item</TableHead>
            <TableHead className="text-lg">Title</TableHead>
            <TableHead className="text-lg">Price</TableHead>
            <TableHead className="text-lg">Quantity</TableHead>
            <TableHead className="text-lg">Total</TableHead>
            <TableHead className="text-right text-lg">Remove</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {cart.map((item: cartItem) => (
            <TableRow key={item._id}>
              <TableCell>
                <Avatar>
                  <AvatarImage src={item.image} alt="" />
                  <AvatarFallback>CN</AvatarFallback>
                </Avatar>
              </TableCell>
              <TableCell className="text-[16px]">{item.name}</TableCell>
              <TableCell className="text-[16px]">Rs. {item.price}</TableCell>
              <TableCell>
                <div className="flex items-center w-fit rounded-full border border-gray-200 dark:border-gray-200 shadow-md">
                  <Button
                    size={"icon"}
                    variant={"outline"}
                    className="rounded-full bg-gray-200 cursor-pointer"
                    onClick={() => decrementQuantity(item._id)}
                  >
                    <Minus />
                  </Button>
                  <Button
                    disabled
                    variant={"outline"}
                    size={"icon"}
                    className="border-none text-lg"
                  >
                    {item.quantity}
                  </Button>
                  <Button
                    size={"icon"}
                    variant={"outline"}
                    className="rounded-full bg-orange-300 hover:bg-orange-500 cursor-pointer"
                    onClick={() => incrementQuantity(item._id)}
                  >
                    <Plus />
                  </Button>
                </div>
              </TableCell>
              <TableCell className="text-[16px]">
                {item.price * item.quantity}
              </TableCell>
              <TableCell className="flex justify-end font-semibold ">
                {/* lucide icons are inline-flex by default, not affected by text-right, */}
                <X
                  size={32}
                  onClick={() => removeFromTheCart(item._id)}
                  className="cursor-pointer"
                />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>

        <TableFooter>
          <TableRow>
            <TableCell colSpan={5} className="text-lg">
              Total:{" "}
            </TableCell>
            <TableCell className="text-right text-lg">{totalAmount}</TableCell>
          </TableRow>
        </TableFooter>
      </Table>

      <div className="flex justify-end my-5 mx-3">
        <Button
          onClick={() => setOpen(true)}
          className="bg-orange-500 hover:bg-orange-600 text-lg py-6 cursor-pointer"
        >
          Proceed to Checkout
        </Button>
      </div>

      <CheckoutConfirmPage open={open} setOpen={setOpen} />
    </div>
  );
};

export default Cart;
