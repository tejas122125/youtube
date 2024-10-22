import { View, Text } from "react-native"
import Onboarding from 'react-native-onboarding-swiper';
import { scale, verticalScale, moderateScale } from 'react-native-size-matters';
import LottieView from 'lottie-react-native';
import { router } from "expo-router";
import { setItem } from "@/utils/secureStore";
const OnBoarding = () => {

    const handleDone = () => {
        setItem('onboarded', '1')
        router.navigate("/(tabs)/home")
    }

    return (
        <View className="flex-1 bg-purple-300">
            <Onboarding
                onDone={handleDone}
                onSkip={handleDone}
                containerStyles={{ paddingHorizontal: scale(20) }}
                pages={[
                    {
                        backgroundColor: '#8b45f6',
                        image: (
                            <View  >
                                {/* <LottieView style={{ height: verticalScale(300), width: scale(270) }} source={require('@/assets/productivity.json')} autoPlay loop /> */}
                                <Text>
                                    currently working on it

                                </Text>
                            </View>
                        ),
                        title: 'Onboarding',
                        subtitle: 'Done with React Native Onboarding Swiper',
                    },
                    {
                        backgroundColor: "#d8d532",
                        image: (
                            <View  >
                                {/* <LottieView style={{ height: verticalScale(300), width: scale(270) }} source={require('@/assets/animation/youtube.json')} autoPlay loop /> */}
                                <Text>
                                    currently working on it

                                </Text>
                            </View>
                        ),
                        title: 'Onboarding',
                        subtitle: 'Done with React Native Onboarding Swiper',
                    },

                ]}
            />
        </View>

    )
}
export default OnBoarding