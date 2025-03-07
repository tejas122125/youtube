import { View, Text, ScrollView, TextInput } from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import AntDesign from "@expo/vector-icons/AntDesign";

const SendFeedback = () => {
  return (
    <View className="p-2 bg-white w-full h-full">
      <ScrollView>
        <View className="w-full flex flex-row justify-between items-center">
          <View className="flex w-[50%] justify-center items-start gap-1">
            <Text className="font-bold text-lg ">Rate Us</Text>
            <Text className="text-xs font-bold text-gray-400">
              Tell Us what you love about our app and service
            </Text>
          </View>
          <View className="flex flex-row ">
            <AntDesign name="staro" size={20} color="black" />
            <AntDesign name="staro" size={20} color="black" />
            <AntDesign name="staro" size={20} color="black" />
            <AntDesign name="staro" size={20} color="black" />
            <AntDesign name="staro" size={20} color="black" />
          </View>
        </View>
        <View className="my-4">
          <Text className="font-semibold text-lg">Message</Text>
          <TextInput className="w-full h-32 mt-2 rounded-lg border-black border " />
        </View>
      </ScrollView>
    </View>
  );
};

export default SendFeedback;
