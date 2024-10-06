import { SafeAreaView } from "react-native-safe-area-context"
import { Button, Modal, Text, TextInput } from "react-native"
import { View, Image } from "react-native"
import { useUser } from "@clerk/clerk-expo"
import { scale, verticalScale, moderateScale } from 'react-native-size-matters';
import { TouchableOpacity } from "react-native-gesture-handler";
import { images } from "@/constants/indes";
import { useState } from "react";
import { Searchbar } from "react-native-paper";

const Home = () => {
    const { isSignedIn, user } = useUser()
    const imageUrl = user?.imageUrl
    const firstName = user?.firstName
    const [searchModal, setSearchModal] = useState<boolean>(false)
    const [searchQuery, setSearchQuery] = useState('');
    const toggleModal = () => {
        setSearchModal((prev) => {
            return !prev;
        })
    }
    const showModal = () => {
        setSearchModal(true)
    }
    const searchBox = () => {
        return (
            <View className="flex-1 bg-red-200 w-full" style={{ height: scale(300) }}>

            </View>
        )
    }

    return (
        <View style={{ flex: 1, backgroundColor: 'green', flexDirection: 'column', alignItems: "center", gap: scale(6) }} >

            <Image source={images.need2} className="w-full" style={{ height: scale(70) }} resizeMode="stretch" />
            <View style={{ width: '100%', gap: scale(15), flexDirection: 'row', justifyContent: 'flex-start', alignItems: 'center', padding: scale(10), backgroundColor: 'white' }}>
                <Image source={{ uri: imageUrl }} className="rounded-full" style={{ width: scale(60), height: scale(60) }} />
                <View style={{ backgroundColor: 'white', width: '100%', padding: scale(4), marginRight: scale(10), flexDirection: 'column', gap: scale(4), justifyContent: 'center', alignContent: "center" }}>
                    <Text>
                        Code Story With Mik
                    </Text>
                    <Text>
                        67.7k Subscribers
                    </Text>
                    <Text>
                        445 Videos
                    </Text>


                </View>
            </View>
            <View style={{ width: '100%', flex: 1, flexDirection: 'column', backgroundColor: 'white', justifyContent: "flex-start", alignItems: 'center', gap: scale(10), paddingHorizontal: scale(6) }}>
                <View style={{ width: '100%', padding: scale(6), borderBottomColor: '#1f0303', borderBottomWidth: 2 }}>
                    <Searchbar
                        placeholder="Search"
                        onChangeText={setSearchQuery}
                        value={searchQuery}
                    />
                </View>
                <View style={{ flex: 1, backgroundColor: 'red', width: '100%', marginBottom: verticalScale(10), overflow: 'hidden', flexDirection:"column", justifyContent:'center',alignItems:'center' }}>
                    <Text>vedyfvhdfg</Text>
                </View>
            </View>


           
        </View>

    )
}


export default Home