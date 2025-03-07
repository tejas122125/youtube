import { View, Text, Image } from "react-native";
import React from "react";
import { icons } from "@/constants";

const Search = () => {
  return (
    <View className="flex justify-center items-center gap-2 w-full flex-row pb-4">
      <View className="border border-gray-400 rounded-full flex flex-row justify-center items-center w-[80%] h-11">
        <View className="w-[40%] flex flex-row justify-start items-center gap-1 pl-2">
          <Image source={icons.search} className="w-6 h-6 " />
          <Text className="text-gray-500">Search</Text>
        </View>
        <View className="w-[1px] h-5 bg-gray-500"></View>
        <View className="w-[58%] flex flex-row justify-center gap-1 items-center overflow-hidden">
          <Image source={icons.point} className="w-5 h-5 " />

          <Text className="text-gray-500">Soniput,Haryana</Text>
        </View>
      </View>
      <View className="w-11 h-11 rounded-full bg-[#FF8C3C] flex justify-center items-center relative overflow-hidden">
        <Image source={icons.microphone} className="w-5 h-5" />
      </View>
    </View>
  );
};

export default Search;
