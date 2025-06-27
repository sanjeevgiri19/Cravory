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

const Cart = () => {
  const [open, setOpen] = useState<boolean>(false);
  return (
    <div className="flex flex-col max-w-7xl mx-auto my-10">
      <div className="flex justify-end">
        <Button variant={"link"} className="text-md">
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
          <TableRow>
            <TableCell>
              <Avatar>
                <AvatarImage
                  src="https://th.bing.com/th/id/OIP.cYywe_ua6wj5Ee6sn54XagHaEK?w=320&h=180&c=7&r=0&o=7&dpr=1.3&pid=1.7&rm=3"
                  alt=""
                />
                <AvatarFallback>CN</AvatarFallback>
              </Avatar>
            </TableCell>
            <TableCell className="text-[16px]">Veg. Momo</TableCell>
            <TableCell className="text-[16px]">Rs. 210</TableCell>
            <TableCell>
              <div className="flex items-center w-fit rounded-full border border-gray-200 dark:border-gray-200 shadow-md">
                <Button
                  size={"icon"}
                  variant={"outline"}
                  className="rounded-full bg-gray-200 cursor-pointer"
                >
                  <Minus />
                </Button>
                <Button
                  disabled
                  variant={"outline"}
                  size={"icon"}
                  className="border-none text-lg"
                >
                  3
                </Button>
                <Button
                  size={"icon"}
                  variant={"outline"}
                  className="rounded-full bg-orange-300 hover:bg-orange-500 cursor-pointer
                  "
                >
                  <Plus />
                </Button>
              </div>
            </TableCell>
            <TableCell className="text-[16px]">190</TableCell>
            <TableCell className="flex justify-end font-semibold ">
              {/* lucide icons are inline-flex by default, not affected by text-right, */}
              <X size={32} className="cursor-pointer" />
            </TableCell>
          </TableRow>
        </TableBody>

        <TableFooter>
          <TableRow>
            <TableCell colSpan={5} className="text-lg">
              Total:{" "}
            </TableCell>
            <TableCell className="text-right text-lg">4300</TableCell>
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
