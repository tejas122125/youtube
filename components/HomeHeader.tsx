import { View,Image,Text } from "react-native"
import { scale } from "react-native-size-matters"

const HomeHeader = ({imageUrl,firstName}:{imageUrl:string|undefined,firstName:string|undefined})=>{
    return (
        <View className='w-full bg-blue-200  flex-row-reverse items-center justify-between '>
            <View className=" flex flex-row justify-center items-center bg-red-200 " style={{ padding: scale(4) }}>
                <Image style={{ height: scale(40), width: scale(40), margin: scale(10) }} resizeMode="contain" className="rounded-full" source={{ uri: imageUrl }} />
                <Text className="" style={{ marginBottom: scale(10) }}>Hi {firstName}!</Text>
            </View>
            <View className="flex flex-row-reverse items-center justify-center p-2 bg-green-300 ">

            </View>
        </View>
    )

}

export default HomeHeader