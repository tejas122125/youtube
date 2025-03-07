import { View, Text, Image } from "react-native";
import React from "react";
import { useFetch } from "@/lib/fetch";

interface FoodItemProps {
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

const OrderItemCard = ({
  foodItemId,
  quantity,
}: {
  foodItemId: string;
  quantity: number;
}) => {
  const { data, loading, error } = useFetch<FoodItemProps>(
    `/(api)/getFoodItemById`,
    {
      method: "POST",
      body: JSON.stringify({ id: foodItemId }),
    }
  );

  return (
    <View className="w-full flex flex-row justify-start items-center gap-2">
      <View className="w-[80px] h-[80px] rounded-lg relative">
        <Image
          source={{ uri: data?.image }}
          resizeMode="cover"
          className="w-full h-full rounded-lg"
        />
      </View>
      <View className="flex-1 flex justify-start items-start gap-2">
        <Text className="text-lg font-bold">{data?.name}</Text>
        <Text className="text-lg font-bold">x{quantity}</Text>
        <Text className="text-sm">₹ {data?.price} per piece</Text>
      </View>
    </View>
  );
};

export default OrderItemCard;
