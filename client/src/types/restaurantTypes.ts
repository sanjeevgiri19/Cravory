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
  restaurant: Restaurant | null;
  createRestaurant: (formData: FormData) => Promise<void>;
  searchedRestaurant: SearchedRestaurant | null;
  singleRestaurant: Restaurant | null;
  appliedFilter: string[];
  restaurantOrder: [];
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
};
