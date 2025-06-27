import React, { useRef, useState, type FormEvent } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import {
  Loader2,
  LocateIcon,
  Mail,
  MapPin,
  MapPinnedIcon,
  Plus,
} from "lucide-react";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { useUserStore } from "@/store/useUserStore";

type ProfileData = {
  username: string;
  email: string;
  address: string;
  city: string;
  country: string;
  profilePicture: string;
};

const Profile = () => {
  const { user, loading, updateProfile } = useUserStore();
  // const [profileData, setProfileData] = useState<ProfileData>({
  //   username: "",
  //   email: "",
  //   address: "",
  //   country: "",
  //   city: "",
  //   profilePicture: "",
  // });

  const [islLoading, setIsLoading] = useState<boolean>(false);

  const [profileData, setProfileData] = useState<ProfileData>({
    username: user?.username || "",
    email: user?.email || "",
    address: user?.address || "",
    city: user?.city || "",
    country: user?.country || "",
    profilePicture: user?.profilePicture || "",
  });
  const imageRef = useRef<HTMLInputElement | null>(null);
  const [selectedProfilePic, setSelectedProfilePic] = useState<string>("");
  // const loading = false;

  const fileChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const result = reader.result as string;
        setSelectedProfilePic(result);
        setProfileData((prevData) => ({ ...prevData, profilePicture: result }));
      };
      reader.readAsDataURL(file);
    }
  };

  const changeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setProfileData({ ...profileData, [name]: value });
  };

  const updateProfileHandler = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      setIsLoading(true);
      // update profile api implementation
      updateProfile(profileData);
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
      console.log(error);
    }
  };

  return (
    <form
      onSubmit={updateProfileHandler}
      className="max-w-7xl h-screen mx-auto"
    >
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2 ">
          <Avatar className="relative md:w-28 md:h-28 w-20 h-20">
            <AvatarImage src={selectedProfilePic} />
            <AvatarFallback>CN</AvatarFallback>
            <input
              ref={imageRef}
              className="hidden"
              type="file"
              accept="image/*"
              onChange={fileChangeHandler}
            />
            <div
              onClick={() => imageRef.current?.click()}
              className="absolute inset-0 flex items-center justify-center opacity-0 hover:opacity-60 transition-opacity duration-300 bg-black bg-opacity-50 rounded-full cursor-pointer"
            >
              <Plus className="text-white w-8 h-8" />
            </div>
          </Avatar>
          <Input
            type="text"
            name="username"
            value={profileData.username}
            onChange={changeHandler}
            className="font-semibold text-xl outline-none focus-visible:ring-transparent"
          />
        </div>
      </div>

      <div className=" grid md:grid-cols-2 md:gap-10 gap-5 mx-3 my-10">
        <div className="flex items-center gap-4 rounded-sm p-2 bg-gray-200">
          <Mail className="text-gray-600 " />
          <div className="w-full">
            <label>Email</label>
            <input
              type="text"
              name="email"
              value={profileData.email}
              onChange={changeHandler}
              className="w-full text-gray-600 bg-transparent focus-visible:ring-0 focus-visible:border-transparent outline-none border-1"
            />
          </div>
        </div>

        <div className="flex items-center gap-4 rounded-sm p-2 bg-gray-200">
          <LocateIcon className="text-gray-600 " />
          <div className="w-full">
            <label>Address</label>
            <input
              type="text"
              name="address"
              value={profileData.address}
              onChange={changeHandler}
              className="w-full text-gray-600 bg-transparent focus-visible:ring-0 focus-visible:border-transparent outline-none border-1"
            />
          </div>
        </div>
        <div className="flex items-center gap-4 rounded-sm p-2 bg-gray-200">
          <MapPin className="text-gray-600 " />
          <div className="w-full">
            <label>City</label>
            <input
              type="text"
              name="city"
              value={profileData.city}
              onChange={changeHandler}
              className="w-full text-gray-600 bg-transparent focus-visible:ring-0 focus-visible:border-transparent outline-none border-1"
            />
          </div>
        </div>
        <div className="flex items-center gap-4 rounded-sm p-2 bg-gray-200">
          <MapPinnedIcon className="text-gray-600 " />
          <div className="w-full">
            <label>Country</label>
            <input
              type="text"
              name="country"
              value={profileData.country}
              onChange={changeHandler}
              className="w-full text-gray-600 bg-transparent focus-visible:ring-0 focus-visible:border-transparent outline-none border-1"
            />
          </div>
        </div>
      </div>
      <div className="text-center">
        {islLoading ? (
          <Button disabled className="bg-blue-500">
            <Loader2 className="mr-2 w-4 h-4 animate-spin" />
            Please wait
          </Button>
        ) : (
          <Button
            type="submit"
            className="bg-blue-400 px-20  md:text-lg md:font-semibold  "
          >
            Update
          </Button>
        )}
      </div>
    </form>
  );
};

export default Profile;
