import type { CheckoutSessionRequest, OrderState } from "@/types/orderTypes";
import axios from "axios";
import { toast } from "sonner";
import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

const API_ENDPOINT: string = "https://cravory-y3qu.onrender.com/api/v1/order";
// const API_ENDPOINT: string = "http://localhost:8000/api/v1/order";
axios.defaults.withCredentials = true;

export const useOrderStore = create<OrderState>()(
  persist(
    (set) => ({
      loading: false,
      orders: [],
      createCheckoutSession: async (
        checkoutSession: CheckoutSessionRequest
      ) => {
        try {
          set({ loading: true });
          const response = await axios.post(
            `${API_ENDPOINT}/checkout/create-checkout-session`,
            checkoutSession,
            {
              headers: {
                "Content-Type": "application/json",
              },
            }
          );
          const session = response.data.session;
          window.location.href = session.url;
          set({ loading: false });
        } catch (error) {
          console.error(error);
          set({ loading: false });
        }
      },

      getOrderDetails: async () => {
        try {
          set({ loading: true });
          const response = await axios.get(`${API_ENDPOINT}/`);
          set({ loading: false, orders: response.data.orders });
        } catch (error:any) {
          toast.error(error.response.data.message)
          // console.log(error);

          set({ loading: false });
        }
      },
    }),
    {
      name: "OrderName",
      storage: createJSONStorage(() => localStorage),
    }
  )
);
