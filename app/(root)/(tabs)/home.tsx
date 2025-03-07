import Search from "@/components/Search";
import { SignedIn, SignedOut, useClerk, useUser } from "@clerk/clerk-expo";
import { Link, router } from "expo-router";
import { Image, Pressable, ScrollView, Text, View } from "react-native";

import { SafeAreaView } from "react-native-safe-area-context";
import AntDesign from "@expo/vector-icons/AntDesign";

import HomeRestaurantCard from "@/components/HomeRestaurantCard";
import { fetchAPI, useFetch } from "@/lib/fetch";
import { useEffect, useState } from "react";
import CartSetter from "@/components/CartSetter";
import { useLocationStore } from "@/lib/store";

interface Category {
  name: string;
  image: string;
  id: string;
}

interface Restaurant {
  id: string;
  name: string;
  phone: string;
  image: string;
  description: string;
  address: string;
  email: string;
  userId: string;
  isVerified: string;
  lat: number;
  lng: number;
}

export default function Page() {
  const { lat, lng } = useLocationStore();

  if (lat === 0 && lng === 0) {
    router.push("/(root)/location");
  }

  const {
    data: categories,
    loading,
    error,
  } = useFetch<Category[]>(`/(api)/getCategories`);

  const {
    data: restaurants,
    loading: resLoading,
    error: resError,
  } = useFetch<Restaurant[]>(`/(api)/getRestaurants`);

  return (
    <SafeAreaView className="bg-white h-full flex flex-col justify-start items-center">
      <CartSetter />
      <View className="w-full flex justify-center items-center p-3">
        <Search />

        <ScrollView
          showsVerticalScrollIndicator={false}
          className="w-full flex"
        >
          <View className="w-full flex flex-row justify-center items-center ">
            <ScrollView
              horizontal
              showsHorizontalScrollIndicator={false}
              className="flex gap-4 flex-row"
              fadingEdgeLength={1}
            >
              {categories?.map((category, i) => (
                <Pressable
                  onPress={() =>
                    router.push(
                      `/category?id=${category.id}&name=${category.name}`
                    )
                  }
                  key={i}
                  className="h-22 w-16 flex flex-col justify-center items-center gap-2"
                >
                  <View className="w-16 h-16 rounded-full overflow-hidden relative bg-gray-100 flex justify-center items-center ">
                    {/*   <Image
                      source={{ uri: category.image }}
                      className="w-10 h-10"
                    /> */}
                  </View>
                  <View className="flex w-full justify-center items-center">
                    <Text className="text-gray-500 font-medium text-sm">
                      {category.name}
                    </Text>
                  </View>
                </Pressable>
              ))}
            </ScrollView>
          </View>
          <View className="flex justify-center w-full pl-4 py-4 items-center gap-4">
            <View className="w-full flex flex-row">
              <Text className="font-medium text-lg">Popular Today</Text>
            </View>
            <View className="w-full flex justify-center items-center flex-row">
              <ScrollView
                horizontal={true}
                showsHorizontalScrollIndicator={false}
                className="flex flex-row gap-3"
              >
                <View className="h-[300px] w-[300px] flex justify-between p-2 items-center rounded-[40px] overflow-hidden relative bg-gray-100">
                  {/*  <Image
                    source={images.burgerLarge}
                    className="w-[300px] h-[300px] absolute"
                  /> */}
                  <View className="w-full pt-4 pl-2">
                    <Text className="font-bold text-2xl text-white">
                      The Smokin Burger
                    </Text>
                  </View>
                  <View className="flex flex-col w-full justify-between items-start gap-2">
                    <View>
                      <Text className="text-white text-2xl font-bold">
                        $3.99
                      </Text>
                    </View>
                    <View>
                      <Text className="text-white font-semibold">
                        5.0(3.8k)
                      </Text>
                    </View>
                    <View className="w-full pb-2 flex flex-row justify-center gap-2 items-center">
                      <Pressable className="px-10 py-3.5 rounded-full bg-orange-700/50">
                        <Text className="font-semibold text-white">
                          Add to Cart
                        </Text>
                      </Pressable>
                      <View className="w-12 h-12 bg-black/40 blur-md rounded-full flex justify-center items-center">
                        <AntDesign name="plus" size={25} color="#ffffff" />
                      </View>
                      <View className="w-12 h-12 bg-black/40 blur-md rounded-full flex justify-center items-center">
                        <AntDesign name="hearto" size={20} color="#ffffff" />
                      </View>
                    </View>
                  </View>
                </View>
                <View className="h-[300px] w-[300px] flex justify-between p-2 items-center rounded-[40px] overflow-hidden relative bg-gray-100">
                  {/*  <Image
                    source={images.sandwitch}
                    className="w-[300px] h-[300px] absolute"
                  /> */}
                  <View className="w-full pt-4 pl-2">
                    <Text className="font-bold text-2xl text-white">
                      Egg Sandwich
                    </Text>
                  </View>
                  <View className="flex flex-col w-full justify-between items-start gap-2">
                    <View>
                      <Text className="text-white text-2xl font-bold">
                        $7.99
                      </Text>
                    </View>
                    <View>
                      <Text className="text-white font-semibold">
                        4.0(2.8k)
                      </Text>
                    </View>
                    <View className="w-full pb-2 flex flex-row justify-center gap-2 items-center">
                      <Pressable className="px-10 py-3.5 rounded-full bg-orange-700/50">
                        <Text className="font-semibold text-white">
                          Add to Cart
                        </Text>
                      </Pressable>
                      <View className="w-12 h-12 bg-black/40 blur-md rounded-full flex justify-center items-center">
                        <AntDesign name="plus" size={25} color="#ffffff" />
                      </View>
                      <View className="w-12 h-12 bg-black/40 blur-md rounded-full flex justify-center items-center">
                        <AntDesign name="hearto" size={20} color="#ffffff" />
                      </View>
                    </View>
                  </View>
                </View>
                <View className="h-[300px] w-[300px] flex justify-between p-2 items-center rounded-[40px] overflow-hidden relative bg-gray-100">
                  {/* <Image
                    source={images.pizzaLarge}
                    className="w-[300px] h-[300px] absolute"
                  /> */}
                  <View className="w-full pt-4 pl-2">
                    <Text className="font-bold text-2xl text-white">
                      Mexican Pizza
                    </Text>
                  </View>
                  <View className="flex flex-col w-full justify-between items-start gap-2">
                    <View>
                      <Text className="text-white text-2xl font-bold">
                        $13.99
                      </Text>
                    </View>
                    <View>
                      <Text className="text-white font-semibold">
                        5.0(30.8k)
                      </Text>
                    </View>
                    <View className="w-full pb-2 flex flex-row justify-center gap-2 items-center">
                      <Pressable className="px-10 py-3.5 rounded-full bg-orange-700/50">
                        <Text className="font-semibold text-white">
                          Add to Cart
                        </Text>
                      </Pressable>
                      <View className="w-12 h-12 bg-black/40 blur-md rounded-full flex justify-center items-center">
                        <AntDesign name="plus" size={25} color="#ffffff" />
                      </View>
                      <View className="w-12 h-12 bg-black/40 blur-md rounded-full flex justify-center items-center">
                        <AntDesign name="hearto" size={20} color="#ffffff" />
                      </View>
                    </View>
                  </View>
                </View>
              </ScrollView>
            </View>
          </View>
          <View className="flex flex-row p-3 justify-between items-center w-full">
            <Text className="text-lg font-bold">Top Cuisines</Text>
            <Text className="font-bold text-orange-500">See All</Text>
          </View>
          <View className="flex gap-4 pb-6 justify-center items-center px-2">
            <View className="w-full h-24 overflow-hidden relative  flex justify-center items-center rounded-[30px]">
              {/*  <Image
                source={images.homemade}
                style={{ objectFit: "contain" }}
                className="w-full absolute"
              /> */}
              <View className="w-full pl-6">
                <Text className="text-xl font-bold text-white">
                  Homemade Food
                </Text>
              </View>
            </View>
            <View className="w-full h-24 overflow-hidden relative  flex justify-center items-center rounded-[30px]">
              {/*  <Image
                source={images.chinese}
                style={{ objectFit: "contain" }}
                className="w-full absolute"
              /> */}
              <View className="w-full pl-6">
                <Text className="text-xl font-bold text-white">
                  Chinese Food
                </Text>
              </View>
            </View>
            <View className="w-full h-24 overflow-hidden relative  flex justify-center items-center rounded-[30px]">
              {/*  <Image
                source={images.italian}
                style={{ objectFit: "contain" }}
                className="w-full absolute"
              /> */}
              <View className="w-full pl-6">
                <Text className="text-xl font-bold text-white">
                  Italian Food
                </Text>
              </View>
            </View>
          </View>
          <View className="flex flex-row p-3 justify-between items-center w-full">
            <Text className="text-lg font-bold">Recommended</Text>
            <Text className="font-bold text-orange-500">See All</Text>
          </View>
          <View className="flex flex-row w-full py-2">
            <ScrollView
              horizontal
              showsHorizontalScrollIndicator={false}
              className="flex gap-4 flex-row"
              fadingEdgeLength={1}
            >
              <View className="h-36 w-36 rounded-2xl flex justify-center items-center bg-gray-300/30">
                <View className="w-full h-full overflow-hidden justify-center items-center flex">
                  {/* <Image source={images.burgerKing} className="h-32 w-32" /> */}
                </View>
              </View>
              <View className="h-36 w-36 rounded-2xl flex justify-center items-center bg-gray-300/30">
                <View className="w-full h-full overflow-hidden justify-center items-center flex">
                  {/* <Image
                    source={images.subway}
                    style={{ objectFit: "contain" }}
                    className="h-32 w-32"
                  /> */}
                </View>
              </View>
              <View className="h-36 w-36 rounded-2xl flex justify-center items-center bg-gray-300/30">
                <View className="w-full h-full overflow-hidden justify-center items-center flex">
                  {/* <Image
                    source={images.starbucks}
                    style={{ objectFit: "contain" }}
                    className="h-32 w-32"
                  /> */}
                </View>
              </View>
              <View className="h-36 w-36 rounded-2xl flex justify-center items-center bg-gray-300/30">
                <View className="w-full h-full overflow-hidden justify-center items-center flex">
                  {/* <Image
                    source={images.mcdonalds}
                    style={{ objectFit: "contain" }}
                    className="h-32 w-32"
                  /> */}
                </View>
              </View>
              <View className="h-36 w-36 rounded-2xl flex justify-center items-center bg-gray-300/30">
                <View className="w-full h-full overflow-hidden justify-center items-center flex">
                  {/*  <Image
                    source={images.kfc}
                    style={{ objectFit: "contain" }}
                    className="h-32 w-32"
                  /> */}
                </View>
              </View>
            </ScrollView>
          </View>
          <View className="flex flex-row p-3 justify-between items-center w-full">
            <Text className="text-lg font-bold">Restaurants Ahead of You</Text>
            {/* <Text className="font-bold text-orange-500">See All</Text> */}
          </View>
          {restaurants?.map((res, i) => (
            <HomeRestaurantCard
              name={res.name}
              description={res.description}
              rating={4.9}
              id={res.id}
              image={res.image}
              key={i}
              lat={res.lat}
              lng={res.lng}
            />
          ))}

          <View className="w-full h-[120px] flex justify-center items-center gap-2"></View>
        </ScrollView>
      </View>
    </SafeAreaView>
  );
}
