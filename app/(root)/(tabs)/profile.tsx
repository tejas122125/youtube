import { useUser } from "@clerk/clerk-expo";
import { Image, ScrollView, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import InputField from "@/components/InputField";
import { Link } from "expo-router";

const Profile = () => {
  const { user } = useUser();

  return (
    <SafeAreaView className="flex-1">
      <ScrollView
        className="px-5"
        contentContainerStyle={{ paddingBottom: 120 }}
      >
        <Text className="text-2xl font-bold my-5">My profile</Text>
        <View className="flex w-full items-center justify-center  bg-white p-3 pl-4 rounded-xl">
          <View className="w-full flex flex-row justify-between items-center">
            <Text className="font-semibold text-xl">{user?.firstName}</Text>
            <Link href={"/(root)/edit-profile"}>
              <Text className="font-semibold text-orange-500">Edit</Text>
            </Link>
          </View>
          <View className="flex flex-row justify-start items-center gap-4 w-full">
            <Text className="font-medium text-gray-500">
              {user?.primaryPhoneNumber?.phoneNumber}
            </Text>
            <Text className="font-semibold">
              {user?.primaryEmailAddress?.emailAddress}
            </Text>
          </View>
        </View>
        <View className="flex justify-center items-center w-full my-5 ">
          <Link
            href={"/(root)/my-account"}
            className="w-full flex flex-col justify-start  bg-white items-center p-2 py-4 pl-6 rounded-xl  "
          >
            <Text className="w-full text-lg font-semibold"> My Account</Text>
          </Link>
          <View className="w-full flex flex-col justify-start mt-2 bg-white items-center p-2 py-4 pl-6 rounded-xl ">
            <Text className="w-full text-lg font-semibold">Settings</Text>
          </View>
          <View className="w-full flex flex-col justify-start bg-white mt-2 items-center p-2 py-4 pl-6 rounded-xl ">
            <Text className="w-full text-lg font-semibold">
              Payment Details
            </Text>
          </View>
          <View className="w-full flex flex-col justify-start bg-white mt-2 items-center p-2 py-4 pl-6 rounded-xl ">
            <Text className="w-full text-lg font-semibold">
              Choose Language
            </Text>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Profile;
