import { View, Text, SafeAreaView, ScrollView } from "react-native";
import React from "react";

const About = () => {
  return (
    <SafeAreaView className="flex-1">
      <ScrollView className="flex-1 p-2">
        <View className="w-full flex flex-col justify-start mt-2 bg-white items-center p-2 py-4 pl-6 rounded-xl ">
          <Text className="w-full text-lg font-semibold">
            Terms And Service
          </Text>
        </View>
        <View className="w-full flex flex-col justify-start mt-2 bg-white items-center p-2 py-4 pl-6 rounded-xl ">
          <Text className="w-full text-lg font-semibold">
            License And Registration
          </Text>
        </View>
        <View className="w-full flex flex-col justify-start mt-2 bg-white items-center p-2 py-4 pl-6 rounded-xl ">
          <Text className="w-full text-lg font-semibold">Partner With Us</Text>
        </View>
        <View className="w-full flex flex-col justify-start mt-2 bg-white items-center p-2 py-4 pl-6 rounded-xl ">
          <Text className="w-full text-lg font-semibold">
            Cancellation Policy
          </Text>
        </View>
        <View className="w-full flex flex-col justify-start mt-2 bg-white items-center p-2 py-4 pl-6 rounded-xl ">
          <Text className="w-full text-lg font-semibold">Return Policy</Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default About;
