import { View, Text, Image, Pressable } from "react-native";
import React from "react";
import { images } from "@/constants";
import { router } from "expo-router";
import { useLocationStore } from "@/lib/store";

const HomeRestaurantCard = ({
  name,
  image,
  description,
  id,
  rating,
  lat,
  lng,
}: {
  name: string;
  image: string;
  id: string;
  description: string;
  rating: number;
  lat: number;
  lng: number;
}) => {
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

  return (
    <Pressable
      onPress={() => router.push(`/(root)/restaurant?id=${id}`)}
      className="w-full h-[260px] flex justify-center items-center p-3"
    >
      <View className="w-full h-[190px] bg-gray-400/10 rounded-3xl relative overflow-hidden">
        <Image
          source={{ uri: image }}
          className="w-full h-[190px] absolute object-cover"
        />
      </View>
      <View className="h-[50px] w-full">
        <View className="w-full flex flex-row px-2 pt-2 justify-between items-center">
          <View className="flex flex-row  gap-1 justify-center items-center">
            <Text className="text-base font-bold">{name}</Text>
            <Text className="text-sm font-semibold text-gray-500">
              ({getDistance(lat, lng, userLat, userLng).toFixed(2)} KM)
            </Text>
          </View>
          <Text className="text-base text-orange-500 font-bold">{rating}</Text>
        </View>
        <View className="w-full flex flex-row px-2 justify-between items-center">
          <Text className="text-sm text-gray-400 font-bold w-[70%]">
            {description}
          </Text>
          <View className="bg-red-500 px-2 rounded-full ">
            <Text className=" text-white font-medium text-xs">busy</Text>
          </View>
        </View>
      </View>
    </Pressable>
  );
};

export default HomeRestaurantCard;
