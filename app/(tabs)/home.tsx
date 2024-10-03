import { SafeAreaView } from "react-native-safe-area-context"
import { Button, Text } from "react-native"
import { View, Image } from "react-native"
import { useUser } from "@clerk/clerk-expo"
import { scale, verticalScale, moderateScale } from 'react-native-size-matters';
import { DrawerActions } from "@react-navigation/native";
import { useNavigation } from "expo-router";


const Home = () => {
    const navigation = useNavigation()

    const { isSignedIn, user } = useUser()
    const imageUrl = user?.imageUrl
    console.log(user?.imageUrl);
    const firstName = user?.firstName

    const onToggle = () => {
        navigation.dispatch(DrawerActions.openDrawer)
    }
    return (
        <SafeAreaView className="bg-green-200 flex-1">
            <Button title="open" onPress={onToggle} />
            <View className='w-full bg-blue-200  flex-row items-center justify-between '>
                <View className=" flex flex-row justify-center items-center bg-red-200 " style={{ padding: scale(4) }}>
                    <Image style={{ height: scale(40), width: scale(40), margin: scale(10) }} resizeMode="contain" className="rounded-full" source={{ uri: imageUrl }} />
                    <Text className="" style={{ marginBottom: scale(10) }}>Hi {firstName}!</Text>
                </View>
                <View className="flex flex-row-reverse items-center justify-center p-2 bg-green-300 ">

                </View>
            </View>

        </SafeAreaView>
    )
}


export default Home