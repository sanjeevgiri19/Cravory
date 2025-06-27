import EditMenu from "@/admin/EditMenu";
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
import { menuSchema, type MenuSchema } from "@/schema/MenuSchema";
import { useMenuStore } from "@/store/useMenuStore";
import { useRestaurantStore } from "@/store/useRestaurant";
import { Loader2, Plus } from "lucide-react";
import React, { useState, type FormEvent } from "react";

// const menus = [
//   {
//     name: "momo",
//     description: "hello world how are you",
//     price: 50,
//     image:
//       "https://api.freeforstudents.org/assets/c2034dd9-311e-40db-881e-c436c471b3f9?format=auto&width=640",
//   },
//   {
//     name: "biryani",
//     description: "lorem ispum ssususan",
//     price: 40,
//     image:
//       "https://api.freeforstudents.org/assets/c2034dd9-311e-40db-881e-c436c471b3f9?format=auto&width=640",
//   },
// ];

const AddMenu = () => {
  const [input, setInput] = useState<MenuSchema>({
    name: "",
    description: "",
    price: 0,
    image: undefined,
  });

  const [open, setOpen] = useState<boolean>(false);
  const [editOpen, setEditOpen] = useState<boolean>(false);
  const [errors, setErrors] = useState<Partial<MenuSchema>>({});
  const [selectedMenu, setSelectedMenu] = useState<any>();
  // const [error, setError] = useState({})

  const { loading, createMenu } = useMenuStore();
  const {restaurant} = useRestaurantStore() 
  // const loading = false;

  const changeEventHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type } = e.target;
    setInput({ ...input, [name]: type === "number" ? Number(value) : value });
  };

  const submitHandler = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // console.log(input);
    const result = menuSchema.safeParse(input);
    if (!result.success) {
      const fieldErrors = result.error.formErrors.fieldErrors;
      setErrors(fieldErrors as Partial<MenuSchema>);
      return;
    }
    try {
      const formData = new FormData();
      formData.append("name", input.name);
      formData.append("description", input.description);
      formData.append("price", input.price.toString());

      if (input.image) {
        formData.append("image", input.image);
      }
      await createMenu(formData);
    } catch (error) {
      console.log(error);
    }
  };
  // console.log("ip", input);
  // console.log("rmenu:", restaurant.menus);
  

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
              <span className="text-[17px]">Add Menus</span>
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle className="text-2xl font-semibold">
                Add a new Menu
              </DialogTitle>
              <DialogDescription>Create a new menu</DialogDescription>
            </DialogHeader>
            <form onSubmit={submitHandler} className="space-y-4">
              <div className="">
                <Label className="text-lg mb-1 ml-1">Name</Label>
                <Input
                  type="text"
                  name="name"
                  value={input.name}
                  onChange={changeEventHandler}
                  placeholder="Enter your menu name"
                  className="py-6"
                />
                {errors && (
                  <span className="text-red-500 font-medium text-sm">
                    {errors.name}
                  </span>
                )}
              </div>
              <div className="">
                <Label className="text -lg mb-1 ml-1">Description</Label>
                <Input
                  type="text"
                  name="description"
                  value={input.description}
                  onChange={changeEventHandler}
                  placeholder="Enter your description"
                  className="py-6"
                />
                {errors && (
                  <span className="text-red-500 font-medium text-sm">
                    {errors.description}
                  </span>
                )}
              </div>
              <div className="">
                <Label className="text-lg mb-1 ml-1">Price</Label>
                <Input
                  type="number"
                  name="price"
                  value={input.price}
                  onChange={changeEventHandler}
                  placeholder="Enter your menu price"
                  className="py-6"
                />
                {errors && (
                  <span className="text-red-500 font-medium text-sm">
                    {errors.price}
                  </span>
                )}
              </div>
              <div className="mb-6">
                <Label className="text-lg mb-1 ml-1">Upload Menu Images</Label>
                <Input
                  type="file"
                  name="image"
                  accept="image/*"
                  onChange={(e) =>
                    setInput({
                      ...input,
                      image: e.target.files?.[0] || undefined,
                    })
                  }
                />
                {errors && (
                  <span className="text-red-500 font-medium text-sm">
                    {errors.image?.name}
                  </span>
                )}
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
                  <Button
                    type="submit"
                    className="bg-orange-500 w-full hover:bg-orange-500 py-5 text-lg cursor-pointer"
                  >
                    Submit
                  </Button>
                )}
              </DialogFooter>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      {restaurant.menus.map((menu: any, idx: number) => (
        <div key={idx} className="mt-4 space-y-4 mx-3">
          <div className="flex flex-col p-2 md:flex-row md:items-center md:space-x-4 md:p-4 shadow-md rounded-lg border">
            <img
              src={menu.image}
              alt=""
              className="w-full h-24 md:h-32 md:w-32 object-cover"
            />
            <div className="flex-1 mt-2 ">
              <h2 className="text-xl font-bold mb-1">{menu.name}</h2>
              <p className="">{menu.description}</p>
              <h3 className="text-lg font-semibold mt-1">
                Price:{" "}
                <span className="font-bold text-orange-700">${menu.price}</span>
              </h3>
            </div>
            <Button
              onClick={() => {
                setSelectedMenu(menu);
                setEditOpen(true);
              }}
              size={"lg"}
              className="bg-orange-500 hover:bg-orange-600 text-xl mt-3 cursor-pointer"
            >
              Edit
            </Button>
          </div>
        </div>
      ))}

      <EditMenu
        selectedMenu={selectedMenu}
        editOpen={editOpen}
        setEditOpen={setEditOpen}
      />
    </div>
  );
};

export default AddMenu;
