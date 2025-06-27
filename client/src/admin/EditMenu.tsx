import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { menuSchema, type MenuSchema } from "@/schema/MenuSchema";
import { useMenuStore } from "@/store/useMenuStore";
import { Loader2 } from "lucide-react";
import type React from "react";
import {
  useEffect,
  useState,
  type Dispatch,
  type FormEvent,
  type InputEventHandler,
  type SetStateAction,
} from "react";

const EditMenu = ({
  selectedMenu,
  editOpen,
  setEditOpen,
}: {
  selectedMenu: MenuSchema;
  editOpen: boolean;
  setEditOpen: Dispatch<SetStateAction<boolean>>;
}) => {
  const [input, setInput] = useState<MenuSchema>({
    name: "",
    description: "",
    price: 0,
    image: undefined,
  });
  const [error, setError] = useState<Partial<MenuSchema>>({});

  const { loading, editMenu } = useMenuStore();

  const changeEventHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type } = e.target;
    setInput({ ...input, [name]: type === " number" ? Number(value) : value });
  };

  const submitHandler =async (e: FormEvent<InputEventHandler>) => {
    e.preventDefault();
    console.log(input);
    const result = menuSchema.safeParse(input);
    if (!result.success) {
      const fieldErrors = result.error.formErrors.fieldErrors;
      setError(fieldErrors as Partial<MenuSchema>);
      return;
    }

    try {
      const formData = new FormData()
      formData.append("name", input.name)
      formData.append("description", input.description)
      formData.append("price", input.price.toString())
      if (input.image) {
        formData.append("image", input.image)
      }
      await editMenu(selectedMenu._id, formData)
    } catch (error) {
      console.error(error);
      
    }

  };

  useEffect(() => {
    // console.log(selectedMenu);

    setInput({
      name: selectedMenu?.name || "",
      description: selectedMenu?.description || "",
      price: selectedMenu?.price || 0,
      image: undefined,
    });
  }, [selectedMenu]);

  return (
    <Dialog open={editOpen} onOpenChange={setEditOpen}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Edit Menu</DialogTitle>
          <DialogDescription>
            Lorem ipsum dolor sit amet consectetur.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={submitHandler} className="">
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
          </div>
          <div className="">
            <Label className="text-lg mb-1 ml-1">Description</Label>
            <Input
              type="text"
              name="description"
              value={input.description}
              onChange={changeEventHandler}
              placeholder="Enter your description"
              className="py-6"
            />
          </div>
          <div className="">
            <Label className="text-lg mb-1 ml-1">Price</Label>
            <Input
              type="text"
              name="price"
              value={input.price}
              onChange={changeEventHandler}
              placeholder="Enter your menu price"
              className="py-6"
            />
          </div>
          <div className="mb-6">
            <Label className="text-lg mb-1 ml-1">Upload Menu Images</Label>
            <Input
              type="file"
              name="image"
              onChange={(e) =>
                setInput({
                  ...input,
                  image: e.target.files?.[0] || undefined,
                })
              }
            />
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
                Update
              </Button>
            )}
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default EditMenu;
