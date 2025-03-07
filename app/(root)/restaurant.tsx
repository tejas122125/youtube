import { View, Text, Pressable, Image } from "react-native";
import React, { useEffect } from "react";
import ToggleSwitch from "toggle-switch-react-native";
import Entypo from "@expo/vector-icons/Entypo";
import { router, useLocalSearchParams } from "expo-router";
import { fetchAPI, useFetch } from "@/lib/fetch";
import { useCartStore, useLocationStore } from "@/lib/store";

interface RestaurantProps {
  name: string;
  description: string;
  address: string;
  rating: number;
  lat: number;
  lng: number;
  foodItems: {
    name: string;
    price: number;
    description: string;
    id: string;
    image: string;
  }[];
}

const Restaurant = () => {
  const { id } = useLocalSearchParams<{ id?: string }>();
  const { cart, cartId, addToCart } = useCartStore();
  const { lat: userLat, lng: userLng } = useLocationStore();

  const getDistance = (
    lat: number,
    lng: number,
    userLat: number,
    userLng: number
  ): number => {
    const R = 6371; // Radius of the Earth in kilometers

    // Convert degrees to radians
    const toRadians = (degree: number): number => (degree * Math.PI) / 180;

    const lat1 = toRadians(lat);
    const lng1 = toRadians(lng);
    const lat2 = toRadians(userLat);
    const lng2 = toRadians(userLng);

    // Differences in coordinates
    const deltaLat = lat2 - lat1;
    const deltaLng = lng2 - lng1;

    // Haversine formula
    const a =
      Math.sin(deltaLat / 2) * Math.sin(deltaLat / 2) +
      Math.cos(lat1) *
        Math.cos(lat2) *
        Math.sin(deltaLng / 2) *
        Math.sin(deltaLng / 2);

    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

    // Distance in kilometers
    return R * c;
  };
  const {
    data: restaurant,
    loading,
    error,
  } = useFetch<RestaurantProps>(`/(api)/getRestaurantById`, {
    method: "POST",
    body: JSON.stringify({ id }),
  });

  const handleAddToCart = async ({
    foodItemId,
    cartId,
    price,
  }: {
    foodItemId: string;
    cartId: number;
    price: number;
  }) => {
    const { data } = await fetchAPI(`/(api)/addToCart`, {
      method: "POST",
      body: JSON.stringify({
        foodItemId,
        cartId,
        price,
      }),
    });

    if (data[0].id) {
      addToCart(foodItemId, 1, data[0].id, price);
    }
  };

  return (
    <View className="w-full h-screen overflow-scroll bg-gray-100 p-2">
      <View className="w-full min-h-[150px] rounded-xl bg-white flex flex-col p-2 justify-between items-start">
        <View className="flex gap-2 font-bold">
          <View className="p-2 w-full flex flex-row justify-between items-center">
            <View className="">
              <Text className="text-2xl font-bold ">{restaurant?.name}</Text>
            </View>
            <Pressable
              onPress={() => router.push(`/(root)/reviews`)}
              className="w-[25px] h-[25px] bg-green-500 rounded-lg flex justify-center items-center"
            >
              <Text className="text-white text-sm font-bold">
                {restaurant?.rating}
              </Text>
            </Pressable>
          </View>
          <View className="flex justify-start items-start gap-1 p-1">
            <Text className="font-semibold">{restaurant?.description}</Text>
            <Text className="font-semibold">{restaurant?.address}</Text>
          </View>
        </View>
        <View className="flex-end border-t border-t-gray-400 w-full p-2">
          <Text className="font-semibold text-gray-400">
            {getDistance(
              restaurant?.lat ?? 0,
              restaurant?.lng ?? 0,
              userLat,
              userLng
            ).toFixed(2)}
            km | from your current position
          </Text>
        </View>
      </View>
      {/*  <View className="p-2 flex flex-row ">
          <ToggleSwitch
          isOn={false}
          onColor="orange"
          offColor="green"
          label="Veg"
          labelStyle={{ color: "black", fontWeight: "900" }}
          size="medium"
          onToggle={(isOn) => !isOn}
        />
        <View className="pl-2">
          <Text className="font-bold">Non Veg</Text>
        </View>
      </View> */}
      <View className="p-2 flex flex-col justify-start gap-2">
        <View className="p-1 bg-gray-500 w-[80px] rounded-lg flex justify-center items-center">
          <Text className="font-bold text-white">Menu</Text>
        </View>

        {restaurant?.foodItems?.map((item, i) => (
          <View
            key={i}
            className="w-full flex flex-row justify-between items-center"
          >
            <View className="flex flex-col justify-center items-start gap-1 p-1">
              <View>
                <Text className="text-lg font-semibold">{item.name}</Text>
              </View>
              <View>
                <Text className="font-medium text-gray-400">
                  4.6 (150 rating)
                </Text>
              </View>
              <View>
                <Text className=" text-gray-500 font-bold">
                  {item.description}
                </Text>
              </View>
              <View>
                <Text className="text-lg font-semibold">Rs {item.price}</Text>
              </View>
            </View>
            <View className="flex flex-col justify-center items-center gap-1">
              <View className="w-[100px] h-[100px] rounded-lg bg-gray-400 relative overflow-hidden flex justify-center items-center ">
                <Image
                  source={{ uri: item.image }}
                  className="w-full h-full object-cover"
                />
              </View>
              {cart.find((cartItem) => cartItem.FoodItemId === item.id) ? (
                <Pressable
                  onPress={() => router.push(`/(root)/cart`)}
                  className="w-[100px] h-[40px] bg-gray-300 rounded-lg flex justify-center items-center"
                >
                  <Text className="text-white font-bold">In Cart</Text>
                </Pressable>
              ) : (
                <Pressable
                  onPress={() =>
                    handleAddToCart({
                      foodItemId: item.id,
                      cartId,
                      price: item.price,
                    })
                  }
                  className="w-[100px] h-[40px] bg-orange-500 rounded-lg flex justify-center items-center"
                >
                  <Text className="text-white font-bold">Add to Cart</Text>
                </Pressable>
              )}
            </View>
          </View>
        ))}
      </View>
    </View>
  );
};

export default Restaurant;
