import { View, Text, Image, Pressable } from "react-native";
import React from "react";
import { images } from "@/constants";
import { router } from "expo-router";
import { useLocationStore } from "@/lib/store";
import { useFetch } from "@/lib/fetch";

interface RestaurantProps {
  name: string;
  description: string;
  address: string;
  rating: number;
  lat: number;
  lng: number;
  image: string;
}

const CategoryRestaurantCard = ({ id }: { id: string }) => {
  const { lat: userLat, lng: userLng } = useLocationStore();

  const {
    data: restaurant,
    loading,
    error,
  } = useFetch<RestaurantProps>(`/(api)/getRestaurantOnlyById`, {
    method: "POST",
    body: JSON.stringify({ id }),
  });

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

  return (
    <Pressable
      onPress={() => router.push(`/(root)/restaurant?id=${id}`)}
      className="w-full h-[100px] flex flex-row justify-start items-center "
    >
      <View className="w-[90px] h-[90px] bg-gray-400/10 rounded-3xl relative overflow-hidden">
        {restaurant && (
          <Image
            source={{ uri: restaurant.image }}
            className="w-full h-[190px] absolute object-cover"
          />
        )}
      </View>
      <View className="h-[90px] w-full">
        <View className=" flex flex-col px-2 pt-2 justify-start items-start">
          <View className="flex flex-row  gap-1 justify-center items-center">
            <Text className="text-base font-bold">{restaurant?.name}</Text>
            <Text className="text-sm font-semibold text-gray-500">
              (
              {restaurant &&
                getDistance(
                  restaurant.lat,
                  restaurant.lng,
                  userLat,
                  userLng
                ).toFixed(2)}{" "}
              KM)
            </Text>
          </View>
          <Text className="text-base text-orange-500 font-bold">
            {restaurant?.rating} Rating
          </Text>
        </View>
        <View className=" flex flex-row px-2 justify-start items-center gap-2">
          <Text className="text-sm text-gray-400 font-bold">
            {restaurant?.description}
          </Text>
          <View className="bg-red-500 px-2 rounded-full ">
            <Text className=" text-white font-medium text-xs">busy</Text>
          </View>
        </View>
      </View>
    </Pressable>
  );
};

export default CategoryRestaurantCard;
