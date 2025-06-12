import EditMenu from "@/components/EditMenu";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Loader2, Plus } from "lucide-react";
import { useState } from "react";

const AddMenu = () => {
  const [open, setOpen] = useState<boolean>(false);
  const loading = false;
  return (
    <div className="max-w-6xl mx-auto my-10">
      <div className="mx-3 flex justify-between">
        <h1 className="text-xl font-bold md:text-2xl xl:font-extrabold mb-4">
          Available Menus
        </h1>

        <Dialog open={open} onOpenChange={setOpen}>
          <DialogTrigger>
            <Button className="bg-orange-500 hover:bg-orange-600 cursor-pointer py-6">
              <Plus size={20} className="" />{" "}
              <span className="text-[17px]"> Add Menus</span>
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle className="text-2xl font-semibold">
                Add a new Menu
              </DialogTitle>
              <DialogDescription>Create a new menu</DialogDescription>
            </DialogHeader>
            <form className="space-y-4">
              <div className="">
                <Label className="text-lg mb-1 ml-1">Name</Label>
                <Input
                  type="text"
                  name="name"
                  placeholder="Enter your menu name"
                  className="py-6"
                />
              </div>
              <div className="">
                <Label className="text-lg mb-1 ml-1">Description</Label>
                <Input
                  type="text"
                  name="description"
                  placeholder="Enter your description"
                  className="py-6"
                />
              </div>
              <div className="">
                <Label className="text-lg mb-1 ml-1">Price</Label>
                <Input
                  type="text"
                  name="name"
                  placeholder="Enter your menu price"
                  className="py-6"
                />
              </div>
              <div className="mb-6">
                <Label className="text-lg mb-1 ml-1">Upload Menu Images</Label>
                <Input type="file" name="image" />
              </div>
              <DialogFooter className="">
                {loading ? (
                  <Button
                    disabled
                    className="bg-orange-500 w-full hover:bg-orange-500 py-5 text-lg cursor-pointer"
                  >
                    <Loader2 className="animate-spin w-4 h-4" /> Please Wait
                  </Button>
                ) : (
                  <Button className="bg-orange-500 w-full hover:bg-orange-500 py-5 text-lg cursor-pointer">
                    Submit
                  </Button>
                )}
              </DialogFooter>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      <div className="mt-4 space-y-4 mx-3">
        <div className="flex flex-col p-2 md:flex-row md:items-center md:space-x-4 md:p-4 shadow-md rounded-lg border">
          <img
            src="https://api.freeforstudents.org/assets/c2034dd9-311e-40db-881e-c436c471b3f9?format=auto&width=640"
            alt=""
            className="w-full h-24 md:h-32 md:w-32 object-cover"
          />
          <div className="flex-1 mt-2 ">
            <h2 className="text-xl font-bold mb-1">Biryani</h2>
            <p className="">
              Lorem ipsum dolor sit amet consectetur, adipisicing elit. Animi
              earum, autem dolores ipsam consequatur voluptatum!
            </p>
            <h3 className="text-lg font-semibold mt-1">
              Price: <span className="font-bold text-orange-700">$80</span>
            </h3>
          </div>
          <Button className="bg-orange-500 hover:bg-orange-600 text-xl py-5 mt-3">Edit</Button>
        </div>
      </div>
      <EditMenu />
    </div>
  );
};

export default AddMenu;
