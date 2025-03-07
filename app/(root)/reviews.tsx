import { View, Text } from "react-native";
import React from "react";
import Entypo from "@expo/vector-icons/Entypo";
import AntDesign from "@expo/vector-icons/AntDesign";
const reviews = () => {
  return (
    <View className="h-full w-screen bg-white flex flex-col gap-2 p-2">
      <View className="w-full h-[200px] rounded-xl bg-gray-100 flex flex-row justify-between items-center">
        <View className="flex flex-col justify-end pb-4 items-center gap-1 px-2">
          <View>
            <Text className="font-bold text-4xl text-blue-600">4.0</Text>
          </View>
          <View>
            <Text className="text-md font-semibold text-sky-500">
              Average Rating
            </Text>
          </View>
          <View>
            <Text className="font-bold text-sm text-gray-500">
              based on 311 reviews
            </Text>
          </View>
        </View>
        <View className="flex flex-col justify-center items-center p-2">
          <View className="flex flex-row justify-center items-center gap-2">
            <View>
              <Text>5</Text>
            </View>
            <View className="w-[120px] h-[10px] rounded-full bg-white ">
              <View className="w-[80%] h-full bg-orange-500 rounded-full"></View>
            </View>
            <View>
              <Text>236</Text>
            </View>
          </View>
          <View className="flex flex-row justify-center items-center gap-2">
            <View className="">
              <Text>4</Text>
            </View>
            <View className="w-[120px] h-[10px] rounded-full bg-white ">
              <View className="w-[60%] h-full bg-orange-500 rounded-full"></View>
            </View>
            <View>
              <Text>16</Text>
            </View>
          </View>
          <View className="flex flex-row justify-center items-center gap-2">
            <View className="">
              <Text>3</Text>
            </View>
            <View className="w-[120px] h-[10px] rounded-full bg-white ">
              <View className="w-[50%] h-full bg-orange-500 rounded-full"></View>
            </View>
            <View>
              <Text>36</Text>
            </View>
          </View>
          <View className="flex flex-row justify-center items-center gap-2">
            <View className="">
              <Text>2</Text>
            </View>
            <View className="w-[120px] h-[10px] rounded-full bg-white ">
              <View className="w-[30%] h-full bg-orange-500 rounded-full"></View>
            </View>
            <View>
              <Text>40</Text>
            </View>
          </View>
          <View className="flex flex-row justify-center items-center gap-2">
            <View className="">
              <Text>1</Text>
            </View>
            <View className="w-[120px] h-[10px] rounded-full bg-white ">
              <View className="w-[10%] h-full bg-orange-500 rounded-full"></View>
            </View>
            <View>
              <Text>26</Text>
            </View>
          </View>
        </View>
      </View>
      <View className="flex flex-col gap-2 p-2">
        <View className="flex flex-row justify-between items-center">
          <View>
            <Text className="font-semibold text-xl">Write a Review</Text>
          </View>
          <View>
            <Entypo name="edit" size={20} color="black" />
          </View>
        </View>
        <View className="w-full px-1 bg-gray-100 rounded-lg flex flex-col justify-between items-center gap-4 p-2">
          <View className="flex flex-row justify-between items-center w-full px-2 ">
            <View className="flex flex-row justify-center gap-2">
              <View className="w-[50px] h-[50px] rounded-full bg-white"></View>
              <View className="flex flex-col justify-center items-center gap-1">
                <Text className="font-semibold text-lg">Erika Sharma</Text>
                <Text className="font-bold text-gray-500 text-sm">
                  1 day ago
                </Text>
              </View>
            </View>
            <View className="flex flex-row justify-center items-center">
              <AntDesign name="star" size={16} color="yellow" />
              <AntDesign name="star" size={16} color="yellow" />
              <AntDesign name="star" size={16} color="yellow" />
              <AntDesign name="star" size={16} color="yellow" />
              <AntDesign name="star" size={16} color="yellow" />
            </View>
          </View>
          <View className="w-auto">
            <Text>
              I recently dined at Pasta Bella, and it was an unforgettable
              experience. From the moment I walked in, the cozy ambiance and
              soft music set the perfect tone for the evening.
            </Text>
          </View>
        </View>
      </View>
    </View>
  );
};

export default reviews;
