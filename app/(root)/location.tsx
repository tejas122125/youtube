import { View, Text } from "react-native";
import React, { useEffect } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { useLocationStore } from "@/lib/store";
import * as Location from "expo-location";
import CustomButton from "@/components/CustomButton";
import { router } from "expo-router";

const LocationComponent = () => {
  const { setLat, setLng, lat, lng } = useLocationStore();

  useEffect(() => {
    const getPermission = async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      console.log(status);
      if (status === "granted") {
        let currentLocation = await Location.getCurrentPositionAsync({});
        console.log(currentLocation);
        setLat(currentLocation.coords.latitude);
        setLng(currentLocation.coords.longitude);
        router.push("/home");
      }
    };
    getPermission();
  }, [setLat, setLng]);
  return (
    <SafeAreaView>
      {lat === 0 && lng === 0 && (
        <View className="flex flex-col justify-end h-screen items-center p-4 mt-40">
          <Text className="text-lg my-4 font-semibold">
            Please Allow location permission
          </Text>
          <CustomButton
            title="Allow Location"
            onPress={async () => {
              await Location.requestForegroundPermissionsAsync();
            }}
          />
        </View>
      )}
    </SafeAreaView>
  );
};

export default LocationComponent;
