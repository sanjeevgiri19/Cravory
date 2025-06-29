import type { MenuItem } from "./restaurantTypes";

export interface cartItem extends MenuItem {
  quantity: number;
}

export type CartState = {
  cart: cartItem[];
  addToCart: (item: MenuItem) => void;
  clearCart: () => void;
  removeFromTheCart: (id: string) => void;
  incrementQuantity: (id: string) => void;
  decrementQuantity: (id: string) => void;
};
