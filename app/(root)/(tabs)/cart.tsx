import { View, Text, Image, Pressable } from "react-native";
import React, { useEffect } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { useCartStore, useSubtotalStore, useUserStore } from "@/lib/store";
import { fetchAPI, useFetch } from "@/lib/fetch";
import Entypo from "@expo/vector-icons/Entypo";
import { ScrollView } from "react-native";
import CartCard from "@/components/CartCard";
import CartSetter from "@/components/CartSetter";
import RazorpayCheckout from "react-native-razorpay";
import { or } from "drizzle-orm";
import { router } from "expo-router";
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

const Cart = () => {
  const { phone, userId } = useUserStore();
  const { cart, setCart, setCartId, cartId } = useCartStore();
  const { setSubTotal, subTotal } = useSubtotalStore();

  useEffect(() => {
    async function fetchCartDetails() {
      try {
        const { data }: { data: CartProps } = await fetchAPI(
          "/(api)/getCartDetails",
          {
            method: "POST",
            body: JSON.stringify({ userId }),
          }
        );
        console.log("data", data);

        if (data) {
          setCartId(data.id);
          setSubTotal(
            data.cartItems.reduce((acc, item) => {
              return acc + item.price * item.quantity;
            }, 0)
          );
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
  }, [phone, setCart, setCartId, userId, setSubTotal]);
  console.log("cart", cart);

  const handlePayment = async () => {
    const options = {
      description: "Payment for food",
      image: "https://assets.piedpiper.com/logo.png",
      currency: "INR",
      key: "rzp_test_1DP5mmOlF5G5ag",
      amount: subTotal * 100,
      name: "Highway Indulge",
      prefill: {
        email: "test@gmail.com",
        contact: "9999999999",
        name: "test",
      },
      theme: { color: "#53a20e" },
    };
    try {
      const data = await RazorpayCheckout.open(options);

      const orderResponse = await fetchAPI("/(api)/createOrder", {
        method: "POST",
        body: JSON.stringify({
          userId,
          totalAmount: subTotal,
          razorpayOrderId: data.razorpay_order_id,
          razorpayPaymentId: data.razorpay_payment_id,
          razorpaySignature: data.razorpay_signature,
          restaurantId: "5edc9d0f-ed4a-402c-897b-acfbd43a9b47",
        }),
      });
      if (!orderResponse.orderId) {
        alert("Order Failed");
        return;
      }

      const { orderId } = orderResponse;

      const orderItemPromises = cart.map((item) =>
        fetchAPI("/(api)/createOrderItem", {
          method: "POST",
          body: JSON.stringify({
            orderId,
            foodItemId: item.FoodItemId,
            quantity: item.quantity,
            price: item.price,
          }),
        })
      );

      await Promise.all(orderItemPromises);

      await fetchAPI("/(api)/removeCartItems", {
        method: "POST",
        body: JSON.stringify({ cartId }),
      });

      router.push("/(root)/(tabs)/orders");
      alert("Order Successful");
    } catch (error) {
      console.error(error);
      alert(`Oops, something went wrong. Please try again.`);
    }
  };

  return (
    <SafeAreaView>
      <ScrollView showsVerticalScrollIndicator={false} className="w-full">
        <View className="flex flex-col justify-start items-center">
          <Text className="text-2xl font-bold my-5">Cart</Text>
          <View className="flex flex-col  pl-2 justify-center items-center w-full">
            {cart.map((item) => (
              <CartCard
                key={item.FoodItemId}
                quantity={item.quantity}
                id={item.id}
                foodItemId={item.FoodItemId}
              />
            ))}
          </View>
          <View className="p-2 w-full">
            <Text className="text-xl font-bold">Total Amount : {subTotal}</Text>
          </View>

          <View className="w-full p-1 py-2 ">
            <View className="w-full bg-orange-500 h-[50px] flex justify-center items-center rounded-lg">
              <Pressable
                onPress={handlePayment}
                className="text-white font-bold text-lg"
              >
                <Text className="font-bold">Place Order</Text>
              </Pressable>
            </View>
          </View>
          <View className="w-full h-[120px] flex justify-center items-center gap-2"></View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Cart;
