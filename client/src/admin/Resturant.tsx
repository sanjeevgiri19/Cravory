import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  resturantFormSchema,
  type ResturantFormSchema,
} from "@/schema/resturantSchema";
import { useRestaurantStore } from "@/store/useRestaurant";
import { Loader2 } from "lucide-react";
import React, { useEffect, useState, type FormEvent } from "react";

const Resturant = () => {
  const [input, setInput] = useState<ResturantFormSchema>({
    resturantName: "",
    city: "",
    country: "",
    deliveryTime: 0,
    cuisines: [],
    imageFile: undefined,
  });
  const [editingId, setEditingId] = useState<string | null>(null);

  const [errors, setErrors] = useState<Partial<ResturantFormSchema>>({});

  const {
    loading,
    restaurants,
    updateRestaurant,
    createRestaurant,
    getRestaurant,
  } = useRestaurantStore();

  useEffect(() => {
    getRestaurant();
  }, []);

  // const restaurant = restaurants?.find((r) => r._id === restaurantId);

  const changeEventHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type } = e.target;
    setInput({ ...input, [name]: type === "number" ? Number(value) : value });
  };

  const handleEdit = (restaurants: any) => {
    setEditingId(restaurants._id);
    setInput({
      resturantName: restaurants.restaurantName,
      city: restaurants.city,
      country: restaurants.country,
      deliveryTime: restaurants.deliveryTime,
      cuisines: restaurants.cuisines,
      imageFile: undefined,
    });
  };
  const submitHandler = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const result = resturantFormSchema.safeParse(input);
    if (!result.success) {
      const fieldErrors = result.error.formErrors.fieldErrors;
      setErrors(fieldErrors as Partial<ResturantFormSchema>);
      return;
    }

    try {
      const formData = new FormData();
      formData.append("restaurantName", input.resturantName);
      formData.append("city", input.city);
      formData.append("country", input.country);
      formData.append("deliveryTime", input.deliveryTime.toString());
      formData.append("cuisines", JSON.stringify(input.cuisines));

      if (input.imageFile) {
        formData.append("imageFile", input.imageFile);
      }
      // await createRestaurant(formData);

      if (editingId) {
        await updateRestaurant(editingId, formData);
        setEditingId(null);
      } else {
        await createRestaurant(formData);
      }

      setInput({
        resturantName: "",
        city: "",
        country: "",
        deliveryTime: 0,
        cuisines: [],
        imageFile: undefined,
      });

      // if (restaurants) {
      //   await updateRestaurant(formData);
      // } else {
      //   await createRestaurant(formData);
      // }
    } catch (error) {
      console.log(error);
    }
  };

  // useEffect(() => {
  //   const fetchRestaurant = async () => {
  //     await getRestaurant();
  //     setInput({
  //       resturantName: restaurants?.restaurantName || "",
  //       city: restaurants?.city || "",
  //       country: restaurants?.country || "",
  //       deliveryTime: restaurants?.deliveryTime || 0,
  //       cuisines: restaurants?.cuisines
  //         ? restaurants?.cuisines.map((cuisine: string) => cuisine)
  //         : [],
  //       imageFile: undefined,
  //     });
  //   };
  //   fetchRestaurant();
  // }, []);

  return (
    <div className="mt-6 max-w-6xl mx-auto">
      <div className="mx-4 md:mx-2">
        <h2 className="text-2xl font-semibold mb-4">Add Resturants</h2>
        <form
          onSubmit={submitHandler}
          className="grid md:grid-cols-2 gap-4 md:gap-7  space-y-2  md:space-y-0"
        >
          <div className="">
            <Label className="text-lg">Resturant Name</Label>
            <Input
              type="text"
              name="resturantName"
              value={input.resturantName}
              onChange={changeEventHandler}
              placeholder="Enter your Resturant Name"
            />
            {errors && (
              <span className="text-xs text-red-600 font-medium">
                {errors.resturantName}
              </span>
            )}
          </div>
          <div className="">
            <Label className="text-lg">City</Label>
            <Input
              type="text"
              name="city"
              value={input.city}
              onChange={changeEventHandler}
              placeholder="Enter your City"
            />
            {errors && (
              <span className="text-xs text-red-600 font-medium">
                {errors.city}
              </span>
            )}
          </div>
          <div className="">
            <Label className="text-lg">Country</Label>
            <Input
              type="text"
              name="country"
              value={input.country}
              onChange={changeEventHandler}
              placeholder="Enter your Country Name"
            />
            {errors && (
              <span className="text-xs text-red-600 font-medium">
                {errors.country}
              </span>
            )}
          </div>
          <div className="">
            <Label className="text-lg">Delivery Time</Label>
            <Input
              type="number"
              name="deliveryTime"
              value={input.deliveryTime}
              onChange={changeEventHandler}
              placeholder="Enter your Delivery Time"
            />
            {errors && (
              <span className="text-xs text-red-600 font-medium">
                {errors.deliveryTime}
              </span>
            )}
          </div>
          <div className="">
            <Label className="text-lg">Cuisines</Label>
            <Input
              type="text"
              name="cuisines"
              value={input.cuisines}
              onChange={(e) =>
                setInput({ ...input, cuisines: e.target.value.split(",") })
              }
              placeholder="Enter your Cuisines"
            />
            {errors && (
              <span className="text-xs text-red-600 font-medium">
                {errors.cuisines}
              </span>
            )}
          </div>
          <div className="">
            <Label className="text-lg">Upload Resturant Images</Label>
            <Input
              type="file"
              name="imageFile"
              accept="image/*"
              onChange={(e) =>
                setInput({ ...input, imageFile: e.target.files?.[0] })
              }
            />
            {errors && (
              <span className="text-xs text-red-600 font-medium">
                {errors.imageFile?.name}
              </span>
            )}
          </div>
          <div>
            {loading ? (
              <Button
                disabled
                className="bg-orange-500 hover:bg-orange-600 text-md"
              >
                <Loader2 className="animate-spin h-4 w-4 " />
                Please Wait
              </Button>
            ) : (
              <Button className="bg-orange-500 hover:bg-orange-600 cursor-pointer text-md">
                {editingId ? "Update Resturant" : "Add Resturant"}
                {/* Add Restaurant */}
              </Button>
            )}
          </div>
        </form>
        <h3 className="text-xl font-bold mt-10 mb-4">My Restaurants</h3>
        <div className="grid md:grid-cols-2 gap-6">
          {restaurants?.map((r: any) => (
            <div key={r._id} className="border rounded-lg p-4 shadow">
              <img
                src={r.imageUrl}
                alt={r.restaurantName}
                className="w-full h-40 object-cover rounded"
              />
              <h3 className="text-xl font-semibold mt-2">{r.restaurantName}</h3>
              <p>
                {r.city}, {r.country}
              </p>
              <p>Cuisines: {r.cuisines.join(", ")}</p>
              <p>Delivery Time: {r.deliveryTime} min</p>
              <button
                className="mt-2 px-3 py-1 bg-blue-500 text-white cursor-pointer rounded"
                onClick={() => handleEdit(r)}
              >
                Edit
              </button>{" "}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Resturant;
