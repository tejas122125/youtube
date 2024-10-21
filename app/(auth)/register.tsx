import { View, Text, TouchableOpacity, Image } from "react-native"
import { SafeAreaView } from "react-native-safe-area-context"
import * as WebBrowser from 'expo-web-browser'
import GoogleButton from "../../components/GoogleButton"
import { removeItem } from "@/utils/asyncStorage"
import { images } from "@/constants"
import { useState } from "react";
import { scale, verticalScale } from 'react-native-size-matters';
import { GoogleSignin } from '@react-native-google-signin/google-signin';
import auth from '@react-native-firebase/app'



WebBrowser.maybeCompleteAuthSession()

const Register = () => {
    GoogleSignin.configure({
        webClientId: '937166693863-n78cvs2r3v3bcto5cbmpaoen63td9co8.apps.googleusercontent.com',
    });
    // const auth = getAuth(app);
    // const androidClientId = process.env.EXPO_PUBLIC_ANDROID_CLIENT_ID
    // const [userInfo, setUserInfo] = useState();
    // const [request, response, promptAsync] = Google.useAuthRequest({
    //     androidClientId: androidClientId
    // })

    const [loadingGoogle, setLoadingGoogle] = useState<Boolean>(false)
    // useEffect(() => {
    //     void WebBrowser.warmUpAsync()

    //     if (response?.type === 'success') {
    //         const { id_token } = response.params;
    //         const credential = GoogleAuthProvider.credential(id_token);
    //         signInWithCredential(auth, credential)
    //     }

    //     return () => {
    //         void WebBrowser.coolDownAsync()
    //     }

    // }, [response])

    // const { startOAuthFlow } = useOAuth({ strategy: 'oauth_google' })
    // const onPress = useCallback(async () => {
    //     setLoadingGoogle((prev) => { return !prev })
    //     try {
    //         const { createdSessionId, signIn, signUp, setActive } = await startOAuthFlow({
    //             redirectUrl: Linking.createURL('/home', { scheme: 'myapp' }),
    //         })

    //         if (createdSessionId) {
    //             setActive!({ session: createdSessionId })
    //         } else {
    //             // Use signIn or signUp for next steps such as MFA
    //         }
    //     } catch (err) {
    //         console.log(err)
    //     }
    // }, [])

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
                        <GoogleButton loading={loadingGoogle} onPress={promptAsync} />

                    </View>
                </View>

            </View>
        </SafeAreaView>
    )
}
export default Register