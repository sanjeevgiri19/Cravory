import type { Orders } from "@/types/orderTypes";
import type { MenuItem, RestaurantState } from "@/types/restaurantTypes";
import axios from "axios";
import { toast } from "sonner";
import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

const API_ENDPOINT = "https://foodie-76b5.onrender.com/api/v1/restaurant";
axios.defaults.withCredentials = true;

export const useRestaurantStore = create<RestaurantState>()(
  persist(
    (set, get) => ({
      loading: false,
      restaurant: null,
      searchedRestaurant: null,
      appliedFilter: [],
      singleRestaurant: null,
      restaurantOrder: [],
      createRestaurant: async (formData: FormData) => {
        try {
          set({ loading: true });
          const response = await axios.post(`${API_ENDPOINT}/`, formData, {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          });
          if (response.data.success) {
            toast.success(response.data.message);
            set({ loading: false });
          }
        } catch (error:any) {
          toast.error(error.response.data.message);
          set({ loading: false });
          console.error(error);
        }
      },

      getRestaurant: async () => {
        try {
          set({ loading: true });
          const response = await axios.get(`${API_ENDPOINT}/`);
          if (response.data.success) {
            set({ loading: false, restaurant: response.data.restaurant });
          }
        } catch (error: any) {
          if (error.response.status === 404) {
            set({ restaurant: null });
          }
          set({ loading: false });
        }
      },

      updateRestaurant: async (formData: FormData) => {
        try {
          set({ loading: true });
          const response = await axios.put(`${API_ENDPOINT}/`, formData, {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          });
          if (response.data.success) {
            toast.success(response.data.message);
            set({ loading: false });
          }
        } catch (error: any) {
          toast.error(error.response.data.message);
          set({ loading: false });
        }
      },

      searchRestaurant: async (
        searchText: string,
        searchQuery: string,
        selectedCuisines: any
      ) => {
        try {
          set({ loading: true });
          const params = new URLSearchParams();
          params.set("searchQuery", searchQuery);
          params.set("selectedCuisines", selectedCuisines.join(","));

          const response = await axios.get(
            `${API_ENDPOINT}/search/${searchText}?${params.toString()}`
          );
          if (response.data.success) {
            set({ loading: false, searchedRestaurant: response.data });
          }
        } catch (error: any) {
          toast.error(error.response.data.message);
          set({ loading: false });
        }
      },

      addMenuToRestaurant: (menu: MenuItem) => {
        set((state: any) => ({
          restaurant: state.restaurant
            ? { ...state.restaurant, menu: [...state.restaurant.menus, menu] }
            : null,
        }));
      },

      updateMenuToRestaurant: async (updatedMenu: MenuItem) => {
        set((state: any) => {
          if (state.restaurant) {
            const updatedMenuList = state.restaurant.menu.map((menu: any) =>
              menu._id === updatedMenu._id ? updatedMenu : menu
            );
            return {
              restaurant: {
                ...state.restaurant,
                menus: updatedMenuList,
              },
            };
          }
          return state;
        });
      },

      setAppliedFilter: (value: string) => {
        set((state) => {
          const isAlreadyApplied = state.appliedFilter.includes(value);
          const updatedFilter = isAlreadyApplied
            ? state.appliedFilter.filter((item) => item !== value)
            : [...state.appliedFilter, value];
          return { appliedFilter: updatedFilter };
        });
      },

      resetAppliedFilter: () => {
        set({ appliedFilter: [] });
      },

      getSingleRestaurant: async (restaurantId: string) => {
        try {
          const response = await axios.get(`${API_ENDPOINT}/${restaurantId}`);
          if (response.data.success) {
            set({ singleRestaurant: response.data.restaurant });
          }

          set({ loading: true });
        } catch (error) {
          console.error(error);
        }
      },

      getRestaurantOrders: async () => {
        try {
          const response = await axios.get(`${API_ENDPOINT}/order`);
          if (response.data.success) {
            set({ restaurantOrder: response.data.orders });
          }
        } catch (error) {
          console.log(error)
        }
      },

      updateRestaurantOrder: async (orderId: string, status: string) => {
        try {
          const response = await axios.put(
            `${API_ENDPOINT}/order/${orderId}/status`,
            { status },
            {
              headers: {
                "Content-Type": "application/json",
              },
            }
          );
          if (response.data.success) {
            const updatedOrder = get().restaurantOrder.map((order: Orders) => {
              return order._id === orderId
                ? { ...order, status: response.data.status }
                : order;
            });
            set({ restaurantOrder: updatedOrder });
            toast.success(response.data.message);
          }
        } catch (error: any) {
          console.error(error);
          toast.error(error.response.data.message);
        }
      },
    }),
    {
      name: "restaurant-name",
      storage: createJSONStorage(() => localStorage),
    }
  )
);
