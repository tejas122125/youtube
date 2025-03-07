import { View, Text, ScrollView } from "react-native";
import React from "react";

const FavouriteOrders = () => {
  return (
    <View className="w-full h-screen ">
      <ScrollView
        showsHorizontalScrollIndicator={false}
        showsVerticalScrollIndicator={false}
        className="flex p-2 "
      >
        <View className="w-full flex justify-center items-start mb-3 bg-white rounded-xl p-3 pr-4">
          <View className="border-b w-full border-b-gray-300 pb-3">
            <Text className="text-lg font-medium">Five Star Dhaba</Text>
            <Text className="text-gray-500">Karnal</Text>
          </View>
          <View className="flex flex-row w-full justify-between items-center py-3 border-b border-b-gray-300">
            <View className="flex gap-1 justify-center items-start">
              <Text className="font-medium text-lg">Chole Bature X3</Text>
              <Text className="text-gray-500">July 19 , 1:53pm</Text>
            </View>
            <View>
              <Text className="bg-orange-500 rounded-lg p-2 font-bold text-white">
                Re Order
              </Text>
            </View>
          </View>
          <View className="flex flex-row justify-between items-center w-full pt-2">
            <Text className="font-medium text-sm">Rating : 4.4</Text>
            <Text className="font-bold text-orange-500">View More</Text>
          </View>
        </View>
        <View className="w-full flex justify-center items-start bg-white mb-3 rounded-xl p-3 pr-4">
          <View className="border-b w-full border-b-gray-300 pb-3">
            <Text className="text-lg font-medium">Five Star Dhaba</Text>
            <Text className="text-gray-500">Karnal</Text>
          </View>
          <View className="flex flex-row w-full justify-between items-center py-3 border-b border-b-gray-300">
            <View className="flex gap-1 justify-center items-start">
              <Text className="font-medium text-lg">Chole Bature X3</Text>
              <Text className="text-gray-500">July 19 , 1:53pm</Text>
            </View>
            <View>
              <Text className="bg-orange-500 rounded-lg p-2 font-bold text-white">
                Re Order
              </Text>
            </View>
          </View>
          <View className="flex flex-row justify-between items-center w-full pt-2">
            <Text className="font-medium text-sm">Rating : 4.4</Text>
            <Text className="font-bold text-orange-500">View More</Text>
          </View>
        </View>
        <View className="w-full flex justify-center items-start mb-3 bg-white rounded-xl p-3 pr-4">
          <View className="border-b w-full border-b-gray-300 pb-3">
            <Text className="text-lg font-medium">Five Star Dhaba</Text>
            <Text className="text-gray-500">Karnal</Text>
          </View>
          <View className="flex flex-row w-full justify-between items-center py-3 border-b border-b-gray-300">
            <View className="flex gap-1 justify-center items-start">
              <Text className="font-medium text-lg">Chole Bature X3</Text>
              <Text className="text-gray-500">July 19 , 1:53pm</Text>
            </View>
            <View>
              <Text className="bg-orange-500 rounded-lg p-2 font-bold text-white">
                Re Order
              </Text>
            </View>
          </View>
          <View className="flex flex-row justify-between items-center w-full pt-2">
            <Text className="font-medium text-sm">Rating : 4.4</Text>
            <Text className="font-bold text-orange-500">View More</Text>
          </View>
        </View>
        <View className="w-full flex justify-center items-start bg-white mb-3 rounded-xl p-3 pr-4">
          <View className="border-b w-full border-b-gray-300 pb-3">
            <Text className="text-lg font-medium">Five Star Dhaba</Text>
            <Text className="text-gray-500">Karnal</Text>
          </View>
          <View className="flex flex-row w-full justify-between items-center py-3 border-b border-b-gray-300">
            <View className="flex gap-1 justify-center items-start">
              <Text className="font-medium text-lg">Chole Bature X3</Text>
              <Text className="text-gray-500">July 19 , 1:53pm</Text>
            </View>
            <View>
              <Text className="bg-orange-500 rounded-lg p-2 font-bold text-white">
                Re Order
              </Text>
            </View>
          </View>
          <View className="flex flex-row justify-between items-center w-full pt-2">
            <Text className="font-medium text-sm">Rating : 4.4</Text>
            <Text className="font-bold text-orange-500">View More</Text>
          </View>
        </View>
        <View className=" w-full flex justify-center items-center">
          <View className="bg-orange-500 mb-28 px-4 py-2 rounded-xl w-full flex justify-center items-center">
            <Text className="text-lg font-bold text-white">Load More</Text>
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

export default FavouriteOrders;
