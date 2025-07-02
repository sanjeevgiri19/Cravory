import type { Orders } from "./orderTypes";

export type MenuItem = {
  _id: string;
  name: string;
  description: string;
  price: number;
  image: string;
};

export type Restaurant = {
  _id: string;
  user: string;
  restaurantName: string;
  city: string;
  country: string;
  deliveryTime: number;
  cuisines: string[];
  menus: MenuItem[];
  imageUrl: string;
};

export type SearchedRestaurant = {
  data: Restaurant[];
};

export type RestaurantState = {
  loading: boolean;
  restaurants: Restaurant[] | null;
  searchedRestaurant: SearchedRestaurant | null;
  appliedFilter: string[];
  singleRestaurant: Restaurant | null;
  restaurantOrder: Orders[];
  createRestaurant: (formData: FormData) => Promise<void>;
  getRestaurant: () => Promise<void>;
  updateRestaurant: (id: string, formData: FormData) => Promise<void>;
  searchRestaurant: (
    searchText: string,
    searchQuery: string,
    selectedCuisines: any
  ) => Promise<void>;
  addMenuToRestaurant: (menu: any) => void;
  updateMenuToRestaurant: (menu: any) => void;
  setAppliedFilter: (value: string) => void;
  resetAppliedFilter: () => void;
  getSingleRestaurant: (restaurantId: string) => Promise<void>;
  getRestaurantOrders: () => Promise<void>;
  updateRestaurantOrder: (orderId: string, status: string) => Promise<void>;
};
