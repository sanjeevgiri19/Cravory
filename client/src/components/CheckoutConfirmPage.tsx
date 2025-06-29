import React, {
  useState,
  type Dispatch,
  type FormEvent,
  type SetStateAction,
} from "react";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogTitle,
} from "./ui/dialog";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { useUserStore } from "@/store/useUserStore";
import type { CheckoutSessionRequest } from "@/types/orderTypes";
import { useRestaurantStore } from "@/store/useRestaurant";
import { useCartStore } from "@/store/useCartStore";
import { useOrderStore } from "@/store/useOrderStore";
import { Loader2 } from "lucide-react";

const CheckoutConfirmPage = ({
  open,
  setOpen,
}: {
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
}) => {
  const { user } = useUserStore();

  const [input, setInput] = useState({
    username: user?.username || "",
    email: user?.email || "",
    contact: user?.contact.toString() || "",
    address: user?.address || "",
    city: user?.city || "",
    country: user?.country || "",
  });
  const { cart } = useCartStore();
  const { createCheckoutSession, loading } = useOrderStore();
  const { restaurant } = useRestaurantStore();

  const changeEventHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setInput({ ...input, [name]: value });
  };

  const checkoutHandler = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const checkoutData: CheckoutSessionRequest = {
        cartItems: cart.map((cartItem) => ({
          menuId: cartItem._id,
          name: cartItem.name,
          image: cartItem.image,
          price: cartItem.price.toString(),
          quantity: cartItem.quantity.toString(),
        })),
        deliveryDetails: {
          name: input.username,
          email: input.email,
          address: input.address,
          city: input.city,
          country: input.country,
          contact: input.contact 
        },
        restaurantId: restaurant?._id as string,
      };
      await createCheckoutSession(checkoutData);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent>
        <DialogTitle>Review your order</DialogTitle>
        <DialogDescription>
          Double-check your delivery details and ensure everything is in order.
          When you are ready, hit confirm button to finalize your order
        </DialogDescription>
        <form
          onSubmit={checkoutHandler}
          className="md:grid grid-cols-2 gap-3 space-y-1 md:space-y-0"
        >
          <div>
            <label>Username:</label>
            <Input
              type="text"
              name="username"
              value={input.username}
              onChange={changeEventHandler}
            />
          </div>
          <div>
            <label>Email:</label>
            <Input
              disabled
              type="text"
              name="email"
              value={input.email}
              onChange={changeEventHandler}
            />
          </div>
          <div>
            <label>Contact:</label>
            <Input
              type="text"
              name="contact"
              value={input.contact}
              onChange={changeEventHandler}
            />
          </div>
          <div>
            <label>Address:</label>
            <Input
              type="text"
              name="address"
              value={input.address}
              onChange={changeEventHandler}
            />
          </div>
          <div>
            <label>City:</label>
            <Input
              type="text"
              name="city"
              value={input.city}
              onChange={changeEventHandler}
            />
          </div>
          <div>
            <label>Country:</label>
            <Input
              type="text"
              name="country"
              value={input.country}
              onChange={changeEventHandler}
            />
          </div>
          <DialogFooter className="pt-4 col-span-2 gap-4">
            <DialogClose asChild>
              <Button variant={"outline"} className="cursor-pointer text-md">
                Cancel
              </Button>
            </DialogClose>
            {loading ? (
              <Button className="text-md bg-orange-500 hover:bg-orange-600 cursor-pointer">
                <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Please wait..
              </Button>
            ) : (
              <Button className="text-md bg-orange-500 hover:bg-orange-600 cursor-pointer">
                Continue to Payment
              </Button>
            )}
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default CheckoutConfirmPage;
