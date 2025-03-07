import { View, Text } from "react-native";
import React from "react";
import OrderItemCard from "./OrderItemCard";

interface OrderItem {
  id: number;
  createdAt: Date | null;
  price: number;
  orderId: string;
  foodItemId: string;
  quantity: number;
}

const OrderCard = ({
  id,
  status,
  date,
  totalAmount,
  orderItems,
}: {
  id: string;
  status: string;
  date: Date;
  totalAmount: number;
  orderItems: OrderItem[];
}) => {
  const d = new Date(date);

  const dateString = `${d.getFullYear()}-${(d.getMonth() + 1)
    .toString()
    .padStart(2, "0")}-${d.getDate().toString().padStart(2, "0")}`;
  return (
    <View className="w-full flex justify-start items-start p-2 rounded-xl bg-gray-200 mb-2">
      <View className="flex flex-col justify-between w-full  items-center">
        <Text className="text-lg font-bold">Order ID: {id}</Text>
        <Text className="text-lg py-2 font-bold w-full">
          Total Amount : ₹ {totalAmount}
        </Text>
      </View>
      <View className="flex flex-row justify-between items-center w-full">
        <Text className="text-sm">Date: {dateString}</Text>
        <Text className="text-sm">Status: {status}</Text>
      </View>
      <View className=" py-2">
        <Text className="font-semibold text-base ">Items</Text>
      </View>
      <View>
        {orderItems.map((item) => (
          <View className="flex justify-between items-center gap-2 w-full p-2">
            <OrderItemCard
              quantity={item.quantity}
              foodItemId={item.foodItemId}
            />
          </View>
        ))}
      </View>
    </View>
  );
};

export default OrderCard;
