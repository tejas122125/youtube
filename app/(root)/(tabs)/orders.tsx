import { View, Text, ScrollView } from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { useFetch } from "@/lib/fetch";
import { useUserStore } from "@/lib/store";
import OrderCard from "@/components/OrderCard";

interface OrderProps {
  id: string;
  userId: number;
  createdAt: Date | null;
  totalAmount: number;
  status: string;
  updatedAt: Date | null;
  razorpayPaymentId: string;
  orderItems: {
    id: number;
    createdAt: Date | null;
    price: number;
    orderId: string;
    foodItemId: string;
    quantity: number;
  }[];
}

const Orders = () => {
  const { userId } = useUserStore();
  const { data, loading, error } = useFetch<OrderProps[]>(`/(api)/getOrders`, {
    method: "POST",
    body: JSON.stringify({ userId }),
  });
  return (
    <SafeAreaView>
      <View className="flex h-screen gap-2 px-2">
        <View className="flex flex-row justify-center items-center">
          <Text className="text-2xl font-bold">Orders</Text>
        </View>
        <ScrollView className="flex-1 p-2 gap-2 flex ">
          {data &&
            data.map((order) => (
              <OrderCard
                id={order.id}
                totalAmount={order.totalAmount}
                date={order.createdAt as Date}
                status={order.status}
                key={order.id}
                orderItems={order.orderItems}
              />
            ))}
        </ScrollView>
        <View className="w-full h-[120px] flex justify-center items-center gap-2"></View>
      </View>
    </SafeAreaView>
  );
};

export default Orders;
