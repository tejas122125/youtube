import { View, Text, ScrollView } from "react-native";
import React from "react";
import { useLocalSearchParams } from "expo-router";
import { useFetch } from "@/lib/fetch";
import CategoryRestaurantCard from "@/components/CategoryRestaurantCard";

interface CategoryProps {
  id: string;
  name: string;
  description: string | null;
  image: string;
  restaurants: string[];
  createdAt: Date | null;
}

const Category = () => {
  const { id, name } = useLocalSearchParams<{ id?: string; name?: string }>();
  const { data, loading, error } = useFetch<CategoryProps>(
    `/(api)/getRestaurantFromCategory`,
    {
      method: "POST",
      body: JSON.stringify({ id }),
    }
  );

  console.log("data", data);
  return (
    <View className="w-full h-screen overflow-scroll bg-gray-100 p-2">
      <Text className="font-semibold text-xl">{name} Restaurants</Text>
      <ScrollView
        showsHorizontalScrollIndicator={false}
        showsVerticalScrollIndicator={false}
        className="flex p-2 "
      >
        {data?.restaurants.map((restaurant) => (
          <CategoryRestaurantCard id={restaurant} />
        ))}
      </ScrollView>
    </View>
  );
};

export default Category;
