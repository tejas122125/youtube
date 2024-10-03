import { View, Text, TouchableOpacity, Image } from "react-native"
import { SafeAreaView } from "react-native-safe-area-context"
import * as Linking from 'expo-linking'
import * as WebBrowser from 'expo-web-browser'
import { useOAuth } from "@clerk/clerk-expo";
import GoogleButton from "../../components/GoogleButton"
import { removeItem } from "@/utils/asyncStorage"
import { scale, verticalScale } from "react-native-size-matters"
import { images } from "@/constants/indes"
import { useCallback, useEffect, useState } from "react";

WebBrowser.maybeCompleteAuthSession()



const Register = () => {
    const [loadingGoogle, setLoadingGoogle] = useState<Boolean>(false)
    useEffect(() => {
        void WebBrowser.warmUpAsync()
        return () => {
            void WebBrowser.coolDownAsync()
        }

    }, [])

    const { startOAuthFlow } = useOAuth({ strategy: 'oauth_google' })
    const onPress = useCallback(async () => {
        setLoadingGoogle((prev) => { return !prev })
        try {
            const { createdSessionId, signIn, signUp, setActive } = await startOAuthFlow({
                redirectUrl: Linking.createURL('/home', { scheme: 'myapp' }),
            })

            if (createdSessionId) {
                setActive!({ session: createdSessionId })
            } else {
                // Use signIn or signUp for next steps such as MFA
            }
        } catch (err) {
            console.log(err)
        }
    }, [])

    const handleReset = () => {

        removeItem('onboarded')
    }
    return (
        <SafeAreaView className=" flex-1">
            <TouchableOpacity className="w-12 h-12 bg-red-500 absolute z-10 top-10" onPress={handleReset}>
                <Text >
                    RESET
                </Text>
            </TouchableOpacity>
            <View className="bg-purple-white flex-1 flex-col items-center justify-center ">
                <View className=" w-full flex-col justify-start items-center" style={{ flex: 2 / 5 }}>

                    <Image source={images.need2} className="w-full h-full rounded-2xl  " resizeMode="stretch" />
                </View>
                <View className="w-full flex-col justify-center items-center bg-white " style={{ flex: 3 / 5, paddingHorizontal: scale(10), }}>

                    <View className="bg-red-300 w-full h-full flex-col  justify-start items-center rounded-t-3xl" style={{ paddingTop: verticalScale(20), paddingHorizontal: scale(10), gap: verticalScale(50) }} >
                        <Text className="text-3xl text-white font-extrabold font-mono text-left">Register your youtube account with google</Text>
                        <GoogleButton loading={loadingGoogle} onPress={onPress} />

                    </View>
                </View>

            </View>
        </SafeAreaView>
    )
}
export default Register