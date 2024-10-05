import { View, Text,Image, TouchableOpacity } from "react-native"

import { DrawerContentScrollView, DrawerItem, DrawerItemList } from "@react-navigation/drawer"
import { useRouter } from "expo-router"
import { SafeAreaView, useSafeAreaInsets } from "react-native-safe-area-context"
import { scale, verticalScale, moderateScale } from 'react-native-size-matters';
import { useUser,useClerk } from "@clerk/clerk-expo";
import { images } from "@/constants/indes";


const CustomDrawer = (props:any) => {
    const { signOut } = useClerk()
    const router = useRouter()
    // save it innto zustand
    const { isSignedIn, user } = useUser()
    // const {imageUrl} = props
    const { top, bottom } = useSafeAreaInsets()
    const imageUrl = user?.imageUrl
    const handleSignOut = ()=>{
        try {
            signOut()
            router.replace('/(auth)/register')


        } catch (error) {
            console.log("monui");
            
        }
    }
    return (
        <SafeAreaView style={{ flex: 1 }}>
            <DrawerContentScrollView scrollEnabled={false} contentContainerStyle={{ backgroundColor: '#dde3fe', paddingTop: top }}>
                <View className="#dde3e" style={{ padding: scale(20) }}>
                    <Image source={{ uri: imageUrl }} style={{ height: scale(100), width: scale(100), alignSelf: "center" }} className="rounded-full" />
                </View>
                <View style={{ flex: 1, backgroundColor: '#ffffff', paddingTop: scale(10) }}>
                    {/* <TouchableOpacity style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start', gap: scale(20), backgroundColor: '#dde3fe', padding: scale(14) ,marginVertical:scale(10)}} onPress={() => { router.push('/(tabs)/file1') }}>
            <Image source={images.google} style={{ height: scale(30), width: scale(30), padding: scale(10), borderRadius: 100 }} />
            <Text style={{ textAlign: 'center', color: 'white', fontWeight: 'semibold', fontSize: scale(16) }}>
              File1
            </Text>
          </TouchableOpacity>
          <TouchableOpacity style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start', gap: scale(20), backgroundColor: '#dde3fe', padding: scale(14), marginVertical: scale(10) }} onPress={() => { router.push('/(tabs)/file2') }}>
            <Image source={images.google} style={{ height: scale(30), width: scale(30), padding: scale(10), borderRadius: 100 }} />
            <Text style={{ textAlign: 'center', color: 'white', fontWeight: 'semibold', fontSize: scale(16) }}>
              File 2
            </Text>
          </TouchableOpacity> */}
          <DrawerItemList { ...props}/>
                </View>
            </DrawerContentScrollView>
            <View style={{
                backgroundColor: "#f76464",
                borderTopColor: '#dde3fe',
                borderTopWidth: 1,
                padding: 20,
                paddingBottom: 20 + bottom
            }}>
                <TouchableOpacity style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start', gap: scale(20), }} onPress={handleSignOut} >
                    <Image source={images.logout} style={{ height: scale(30), width: scale(30) }} />
                    <Text style={{ color: 'white', fontWeight: 'bold', fontSize: scale(16) }}>
                        Logout
                    </Text>
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    )
}
export default CustomDrawer