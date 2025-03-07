import { View, Text, Image, Pressable } from "react-native";
import React from "react";
import { useUser } from "@clerk/clerk-expo";
import InputField from "@/components/InputField";
import CustomButton from "@/components/CustomButton";

const EditProfile = () => {
  const { user } = useUser();
  return (
    <View className="flex justify-center items-center gap-2 p-2 my-2">
      <View className="flex items-center justify-center my-5">
        <Image
          source={{
            uri: user?.externalAccounts[0]?.imageUrl ?? user?.imageUrl,
          }}
          style={{ width: 110, height: 110, borderRadius: 110 / 2 }}
          className=" rounded-full h-[110px] w-[110px] border-[3px] border-white shadow-sm shadow-neutral-300"
        />
      </View>

      <View className="flex flex-col items-start justify-center bg-white rounded-lg shadow-sm shadow-neutral-300 px-5 py-3">
        <View className="flex flex-col items-start justify-start w-full">
          <InputField
            label="First name"
            placeholder={user?.firstName || "Not Found"}
            containerStyle="w-full"
            inputStyle="p-3.5"
          />

          <InputField
            label="Last name"
            placeholder={user?.lastName || "Not Found"}
            containerStyle="w-full"
            inputStyle="p-3.5"
          />

          <InputField
            label="Email"
            placeholder={user?.primaryEmailAddress?.emailAddress || "Not Found"}
            containerStyle="w-full"
            inputStyle="p-3.5"
          />

          <InputField
            label="Phone"
            placeholder={user?.primaryPhoneNumber?.phoneNumber || "Not Found"}
            containerStyle="w-full"
            inputStyle="p-3.5"
          />
        </View>
      </View>
      <View>
        <Pressable className="flex justify-center items-center px-14 mt-2 py-3 bg-orange-500 rounded-full">
          <Text className="text-white font-bold text-xl ">Update Profile</Text>
        </Pressable>
      </View>
    </View>
  );
};

export default EditProfile;
