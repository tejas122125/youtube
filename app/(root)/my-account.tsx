import { View, Text, TouchableOpacity } from "react-native";
import React from "react";
import { Link, router } from "expo-router";
import AntDesign from "@expo/vector-icons/AntDesign";
import Feather from "@expo/vector-icons/Feather";
import { useAuth } from "@clerk/clerk-expo";

const MyAccount = () => {
  const { signOut } = useAuth();
  const handleSignOut = () => {
    signOut();
    router.replace("/(auth)/sign-in");
  };
  return (
    <View className="flex justify-center items-center w-full my-5 px-2">
      <View className="w-full flex flex-col justify-start  bg-white items-center py-4 rounded-xl px-2">
        <Link href={"(root)/favourite-orders"} className="w-full">
          <View className="  flex flex-row items-center pl-2 w-full">
            <View className="flex flex-row w-full justify-start items-center gap-2">
              <AntDesign name="hearto" size={20} color="black" />
              <Text className="text-xl font-semibold "> Favourite Orders</Text>
            </View>
          </View>
        </Link>
      </View>
      <View className="w-full flex flex-row justify-start bg-white mt-2 items-center pb-4 pt-1 pl-0 rounded-xl ">
        <Link href={"/(root)/about"} className="w-full">
          <View className="w-full flex flex-row justify-start items-center gap-3">
            <Feather name="edit" size={20} color="black" />
            <Text className=" text-xl font-semibold">About</Text>
          </View>
        </Link>
      </View>
      <View className="w-full flex flex-row justify-start bg-white mt-2 items-center pb-4 pt-1 pl-0 rounded-xl ">
        <Link href={"/(root)/send-feedback"} className="w-full">
          <View className="w-full flex flex-row justify-start items-center gap-3">
            <AntDesign name="exclamationcircleo" size={20} color="black" />
            <Text className=" text-xl font-semibold">Send Feedback</Text>
          </View>
        </Link>
      </View>
      <TouchableOpacity
        onPress={handleSignOut}
        className="w-full flex flex-col justify-start bg-white mt-2 items-center p-2 py-4 pl-4 rounded-xl "
      >
        <View className="w-full flex justify-start items-center gap-2 flex-row">
          <AntDesign name="logout" size={20} color="black" />
          <Text className=" text-xl font-semibold">Logout</Text>
        </View>
      </TouchableOpacity>
    </View>
  );
};

export default MyAccount;
