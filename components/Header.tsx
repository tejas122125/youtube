import { images } from "@/constants";
import { useUser } from "@clerk/clerk-expo";
import { View, Text, Image, TextInput } from "react-native"
import { TouchableOpacity } from "react-native-gesture-handler";
import { scale, verticalScale, moderateScale } from 'react-native-size-matters';
import SearchModal from "./SearchModal";
import { useState } from "react";

const Header = ({ onpress }: { onpress: () => void }) => {
    const { isSignedIn, user } = useUser()
    const imageUrl = user?.imageUrl
    const firstName = user?.firstName

    return (
        <View className='w-full bg-blue-200  flex-row items-center justify-between '>
            <View className=" flex flex-row justify-center items-center" style={{ padding: scale(4) }}>
                <Image style={{ height: scale(40), width: scale(40), margin: scale(10) }} resizeMode="contain" className="rounded-full" source={{ uri: imageUrl }} />
                <Text className="" style={{ marginBottom: scale(10), fontSize: scale(20) }}>Hi {firstName} </Text>
            </View>
            <View className="flex-1 flex-row-reverse items-center justify-between h-full" style={{ padding: scale(6), gap: scale(4) }}>

                <TouchableOpacity onPress={onpress} >
                    <Image source={images.menu} style={{ height: scale(30), width: scale(30) }} resizeMode="contain" />
                </TouchableOpacity>

            </View>

        </View>
    )
}

export default Header