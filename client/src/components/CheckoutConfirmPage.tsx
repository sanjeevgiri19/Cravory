import React, { useState, type Dispatch, type FormEvent, type SetStateAction } from "react";
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


const CheckoutConfirmPage = ({
  open,
  setOpen,
}: {
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
}) => {
  const [input, setInput] = useState({
    username: "",
    email: "",
    contact: "",
    address: "",
    city: "",
    country: "",
  });

  const changeEventHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    const {name, value}= e.target;
    setInput({ ...input, [name]: value });
  };

  const checkoutHandler = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    console.log(input);
    

  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent>
        <DialogTitle>Review your order</DialogTitle>
        <DialogDescription>
          Double-check your delivery details and ensure everything is in order.
          When you are ready, hit confirm button to finalize your order
        </DialogDescription>
        <form onSubmit={checkoutHandler} className="md:grid grid-cols-2 gap-3 space-y-1 md:space-y-0">
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
              <Button variant={"outline"} className="cursor-pointer text-md">Cancel</Button>
            </DialogClose>

            <Button className="text-md bg-orange-500 hover:bg-orange-600 cursor-pointer">Continue to Payment</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default CheckoutConfirmPage;
