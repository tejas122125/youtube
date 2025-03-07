import { create } from "zustand";

type userProps = {
  phone: string;
  userId: number | null;
  setUserId: (userId: number) => void;
  setPhone: (phone: string) => void;
};

export const useUserStore = create<userProps>((set) => ({
  phone: "",
  userId: null,
  setUserId: (userId) => set({ userId }),
  setPhone: (phone) => set({ phone }),
}));

type CartItem = {
  id: number;
  FoodItemId: string;
  quantity: number;
  price: number;
};

type CartStore = {
  cart: CartItem[];
  cartId: number;
  setCartId: (cartId: number) => void;
  setCart: (cart: CartItem[]) => void;
  addToCart: (
    FoodItemId: string,
    quantity: number,
    id: number,
    price: number
  ) => void;
  removeFromCart: (FoodItemId: string) => void;
  updateCartItemQuantity: (FoodItemId: string, quantity: number) => void;
};

export const useCartStore = create<CartStore>((set) => ({
  cart: [],
  cartId: 0,
  setCart: (cart) => set({ cart }),
  setCartId: (cartId) => set({ cartId }),
  addToCart: (FoodItemId, quantity, id, price) =>
    set((state) => ({
      cart: [...state.cart, { FoodItemId, id, quantity, price }],
    })),
  removeFromCart: (FoodItemId) =>
    set((state) => ({
      cart: state.cart.filter((item) => item.FoodItemId !== FoodItemId),
    })),
  updateCartItemQuantity: (FoodItemId, quantity) =>
    set((state) => ({
      cart: state.cart.map((item) =>
        item.FoodItemId === FoodItemId ? { ...item, quantity } : item
      ),
    })),
}));

type LocationProps = {
  lat: number;
  lng: number;
  setLat: (lat: number) => void;
  setLng: (lng: number) => void;
};

export const useLocationStore = create<LocationProps>((set) => ({
  lat: 0,
  lng: 0,
  setLat: (lat) => set({ lat }),
  setLng: (lng) => set({ lng }),
}));

type subtotalProps = {
  subTotal: number;
  setSubTotal: (subTotal: number) => void;
};

export const useSubtotalStore = create<subtotalProps>((set) => ({
  subTotal: 0,
  setSubTotal: (subTotal) => set({ subTotal }),
}));
