import { images } from "@/constants/indes";
import { Text, TouchableOpacity, View, Image } from "react-native"
import { scale, verticalScale, moderateScale } from 'react-native-size-matters';
import { ActivityIndicator } from "react-native";
// import google1 from '@/assets/images/'

const GoogleButton = ({ loading,onPress }:{loading:Boolean,onPress:()=>void}) => {
console.log(loading);

    return (
// make this touchable opacity withouit feed back with state bg color change
        <TouchableOpacity className="bg-gray-50 border-2 border-green-300 rounded-l-full rounded-r-full shadow-md items-center" style={{ padding: scale(10), width: scale(240),height:verticalScale(60), paddingVertical: verticalScale(10) }} onPress={onPress}>
            <View className="flex-1 w-full flex-row items-center justify-start gap-8">
            { loading ? <ActivityIndicator size={'large'}/> :  <Image source={images.google} className="rounded-full" style={{ height: verticalScale(40), width: scale(40) }} resizeMode="contain" />}

                { loading ?(<Text className="text-base text-black"> ... Please Wait</Text>) : <Text className=" text-base text-black">
                    Google Sign In
                </Text>}
            </View>
        </TouchableOpacity>

    )
}
export default GoogleButton