import { View, Text, Image, Pressable } from "react-native";
import React from "react";
import Entypo from "@expo/vector-icons/Entypo";
import { fetchAPI, useFetch } from "@/lib/fetch";
import { useCartStore, useSubtotalStore } from "@/lib/store";

interface FoodItem {
  id: string;
  name: string;
  image: string;
  description: string;
  price: number;
  categoryId: string;
  restaurantId: string;
  isAvailable: boolean;
  type: string;
}

const CartCard = ({
  quantity,
  id,
  foodItemId,
}: {
  quantity: number;
  id: number;
  foodItemId: string;
}) => {
  // console.log("id", id);
  const { cart, updateCartItemQuantity, removeFromCart } = useCartStore();
  const { setSubTotal } = useSubtotalStore();
  const {
    data: foodItem,
    error,
    loading,
  } = useFetch<FoodItem>(`/(api)/getFoodItemById`, {
    method: "POST",
    body: JSON.stringify({
      id: foodItemId,
    }),
  });
  const handleRemove = async () => {
    const { data } = await fetchAPI(`/(api)/deleteItem`, {
      method: "POST",
      body: JSON.stringify({
        id,
      }),
    });
    if (data) {
      removeFromCart(foodItemId);
      setSubTotal(
        cart
          .map((item) => item.price * item.quantity)
          .reduce((a, b) => a + b, 0)
      );
    }
  };
  const handleIncreaseItem = async () => {
    const { data } = await fetchAPI(`/(api)/increaseAmount`, {
      method: "POST",
      body: JSON.stringify({
        id,
        quantity: quantity,
      }),
    });
    if (data) {
      updateCartItemQuantity(foodItemId, quantity + 1);
      setSubTotal(
        cart
          .map((item) => item.price * (item.quantity + 1))
          .reduce((a, b) => a + b, 0)
      );
    }
  };

  const handleReduceItem = async () => {
    const { data } = await fetchAPI(`/(api)/decreaseAmount`, {
      method: "POST",
      body: JSON.stringify({
        id,
        quantity: quantity,
      }),
    });
    if (data) {
      if (quantity === 1) {
        removeFromCart(foodItemId);
      } else {
        updateCartItemQuantity(foodItemId, quantity - 1);
      }
      setSubTotal(
        cart
          .map((item) => item.price * (item.quantity - 1))
          .reduce((a, b) => a + b, 0)
      );
    }
  };
  return (
    <View className="flex bg-orange-100 rounded-lg w-full mb-3  flex-row gap-2 py-1 justify-start items-center">
      <View className="w-[30%] rounded-xl h-[100px] flex justify-center items-center overflow-hidden relative ">
        <Image
          source={{ uri: foodItem?.image }}
          alt={foodItem?.name}
          className="w-full h-full object-cover"
        />
      </View>
      <View className="flex w-[60%] flex-col justify-center  items-start">
        <View className="w-full h-[50px] flex flex-row justify-between items-start">
          <View className="flex flex-col justify-between gap-1 items-start">
            <Text className="text-lg font-medium">{foodItem?.name}</Text>
          </View>
          <View>
            <Text className="text-base font-bold">
              ₹ {foodItem?.price && foodItem.price * quantity}
            </Text>
          </View>
        </View>
        <View className="w-full h-[50px] flex flex-row justify-between items-center">
          <View className="flex justify-start items-center gap-x-4 flex-row h-[50px]">
            <Pressable
              onPress={handleReduceItem}
              className="w-[30px] h-[30px] rounded-lg bg-orange-500 flex justify-center items-center"
            >
              <Text className="text-xl text-white font-bold">
                <Entypo name="minus" size={20} color="white" />
              </Text>
            </Pressable>
            <View>
              <Text className="text-orange-500 font-bold text-lg">
                {quantity}
              </Text>
            </View>
            <Pressable
              onPress={handleIncreaseItem}
              className="w-[30px] h-[30px] rounded-lg flex justify-center items-center bg-orange-500"
            >
              <Text className="text-xl font-bold text-white">
                <Entypo name="plus" size={20} color="white" />
              </Text>
            </Pressable>
          </View>
          <Pressable
            onPress={handleRemove}
            className="bg-orange-200 rounded-md p-1"
          >
            <Entypo name="trash" size={24} color="red" />
          </Pressable>
        </View>
      </View>
    </View>
  );
};

export default CartCard;
