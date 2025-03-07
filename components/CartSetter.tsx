import { View, Text } from "react-native";
import React, { useEffect } from "react";
import { useCartStore, useUserStore } from "@/lib/store";
import { fetchAPI, useFetch } from "@/lib/fetch";
import { useUser } from "@clerk/clerk-expo";

interface CartProps {
  id: number;
  userId: number;
  createdAt: Date | null;
  cartItems: {
    id: number;
    createdAt: Date | null;
    cartId: number;
    foodItemId: string;
    quantity: number;
    updatedAt: Date | null;
    price: number;
  }[];
}

const CartSetter = () => {
  const { phone, setUserId } = useUserStore();
  const { setCart, setCartId } = useCartStore();
  useEffect(() => {
    async function fetchCartDetails() {
      try {
        const response = await fetchAPI("/(api)/getUserId", {
          method: "POST",
          body: JSON.stringify({ phone }),
        });

        if (response.userId) {
          setUserId(response.userId);
        }

        const { data }: { data: CartProps } = await fetchAPI(
          "/(api)/getCartDetails",
          {
            method: "POST",
            body: JSON.stringify({ userId: response.userId }),
          }
        );

        if (data) {
          setCartId(data.id);
          setCart(
            data.cartItems.map((item) => {
              return {
                FoodItemId: item.foodItemId,
                quantity: item.quantity,
                id: item.id,
                price: item.price,
              };
            })
          );
        }
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    }
    fetchCartDetails();
  }, [phone, setCart, setCartId, setUserId]);

  return <View></View>;
};

export default CartSetter;
