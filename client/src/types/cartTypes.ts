import type { MenuItem } from "./restaurantTypes";

export interface cartItem extends MenuItem {
  quantity: number;
  restaurantId: string;
}

export type CartState = {
  cart: cartItem[];
  addToCart: (item: cartItem) => void;
  clearCart: () => void;
  removeFromTheCart: (id: string) => void;
  incrementQuantity: (id: string) => void;
  decrementQuantity: (id: string) => void;
};
