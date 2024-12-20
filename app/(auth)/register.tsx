import { View, Text, TouchableOpacity, Image } from "react-native"
import { SafeAreaView } from "react-native-safe-area-context"
import * as WebBrowser from 'expo-web-browser'
import GoogleButton from "../../components/GoogleButton"
import { images } from "@/constants"
import { useEffect, useState } from "react";
import { scale, verticalScale } from 'react-native-size-matters';
import { GoogleSignin, statusCodes } from '@react-native-google-signin/google-signin';
import { getAuth, GoogleAuthProvider, signInWithCredential } from 'firebase/auth'
import { removeItem, saveUser } from "@/utils/secureStore"
// import { appConfig } from "@/firebaseConfig"
// import firebase from 'firebase/app';
import { appfire,auth } from "@/firebaseConfig"
import { fetchYouTubeAnalyticsData, logOut } from "@/lib/fetchData"
import { Button } from "react-native-paper"
import { initializeAuth } from 'firebase/auth';
import * as firebaseAuth from 'firebase/auth';
import ReactNativeAsyncStorage from '@react-native-async-storage/async-storage';
import AsyncStorage from "@react-native-async-storage/async-storage"
WebBrowser.maybeCompleteAuthSession()

const Register = () => {
    const reactNativePersistence = (firebaseAuth as any).getReactNativePersistence;
    useEffect(() => {


        GoogleSignin.configure({
            webClientId: '937166693863-n78cvs2r3v3bcto5cbmpaoen63td9co8.apps.googleusercontent.com',
            scopes: ['https://www.googleapis.com/auth/youtube', 'https://www.googleapis.com/auth/youtube.readonly', 'https://www.googleapis.com/auth/youtubepartner', 'https://www.googleapis.com/auth/yt-analytics.readonly', 'https://www.googleapis.com/auth/yt-analytics-monetary.readonly', 'https://www.googleapis.com/auth/userinfo.email', 'https://www.googleapis.com/auth/userinfo.profile',
            ],
            offlineAccess: true,
        
        });
    }, [])
    // async function onGoogleButtonPress() {
    //     firebase.initializeApp();
    //     // Check if your device supports Google Play
    //     await GoogleSignin.hasPlayServices({ showPlayServicesUpdateDialog: true });
    //     // Get the users ID token
    //     const { data } = await GoogleSignin.signIn();

    //     // Create a Google credential with the token
    //     const googleCredential = auth.GoogleAuthProvider.credential(data?.idToken!);
    //     // auth(app)

    //     // Sign-in the user with the credential
    //     try {
    //         auth().signInWithCredential(googleCredential);

    //     } catch (error) {
    //         console.log(error);

    //     }
    //     await saveUser(data?.user!)
    //     console.log("google ", data?.user);

    // }

    const signIn = async () => {
        try {
            // const auth = getAuth(app)
            await GoogleSignin.hasPlayServices();
            const userInfo = await GoogleSignin.signIn();
            // console.log('User Info:', userInfo);
            const accessToken = userInfo.data?.idToken!
            // const auth = getAuth(appfire); // Get the Firebase Auth instance
            //  const auth = initializeAuth(appfire, {
            //     persistence: reactNativePersistence(AsyncStorage),
            // });
            const googleCredential = GoogleAuthProvider.credential(userInfo.data?.idToken);
            // const googleCredential = appfire.auth.GoogleAuthProvider.credential(userInfo.data?.idToken);
            // auth()
            const userCredential = await signInWithCredential(auth, googleCredential);
            // User is signed in
            // console.log('Firebase User:', userCredential.user);
            // const accessToken1 = getAuth(appfire).currentUser?.getIdToken(true)
            const accessToken1 = auth.currentUser?.getIdToken(true)

            console.log(accessToken);

            fetchYouTubeAnalyticsData(accessToken)
            await saveUser(userCredential.user)

        } catch (error: any) {
            if (error.code === statusCodes.SIGN_IN_CANCELLED) {
                // User cancelled the login flow
                console.log('User cancelled the login process');
            } else if (error.code === statusCodes.IN_PROGRESS) {
                // Operation (e.g. sign in) is in progress already
                console.log('Sign in operation in progress');
            } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
                // Play services not available or outdated
                console.log('Google Play Services not available');
            } else {
                // Some other error
                console.log('Some error occurred during sign in:', error);
            }
        }

    }
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
            <TouchableOpacity className="w-12 h-12 bg-red-500 absolute z-10 top-10" onPress={() => handleReset}>
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
                        <GoogleButton loading={loadingGoogle} onPress={() => {
                            console.log("first");

                            signIn()
                        }} />
                        <TouchableOpacity onPress={async () => {
                            await logOut()
                        }}>
                            <Text>
                                Logot
                            </Text>
                        </TouchableOpacity>

                    </View>
                </View>

            </View>
        </SafeAreaView>
    )
}
export default Register