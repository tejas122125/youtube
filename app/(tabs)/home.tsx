import { SafeAreaView } from "react-native-safe-area-context"
import { ActivityIndicator, Button, ImageBackground, Modal, ScrollViewComponent, Text, TextInput } from "react-native"
import { View, Image } from "react-native"
import { useUser } from "@clerk/clerk-expo"
import { scale, verticalScale, moderateScale } from 'react-native-size-matters';
import { FlatList, TouchableOpacity } from "react-native-gesture-handler";
import {  images } from "@/constants";
import { useEffect, useState } from "react";
import { Searchbar } from "react-native-paper";
import { fetchData } from "@/lib/fetchData";
import { searchType } from "@/types/searchResponse";
import VideoCard from "@/components/VideoCard";
import filter from 'lodash.filter'
const Home = () => {
    const { isSignedIn, user } = useUser()
    const imageUrl = user?.imageUrl
    const firstName = user?.firstName
    const [searchModal, setSearchModal] = useState<boolean>(false)
    const [searchQuery, setSearchQuery] = useState('');
    const [loading, setLoading] = useState<Boolean>(false)
    const [data, setData] = useState<any>()
    const [error, setError] = useState("")
    const [fullData, setFullData] = useState<any>()
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
    const searchData = async (search: string) => {
        try {
            const response = await fetchData(search)
            // console.log("response id ", response);

            setData(response)
            setLoading(false)

        } catch (error) {
            setError(String(error))
        }
    }
    const contains = ({ videoTitle, playlistName }: { videoTitle: string, playlistName: string }, query: string) => {
        if (videoTitle.includes(query) || playlistName.includes(query)) {
            return true

        }
        else {
            return false
        }
    }
    const handleSearch = (query: string) => {
        setSearchQuery(query)
        const formattedQuery = query.toLowerCase();
        const filterData = filter(fullData, (video) => {
            return contains(video, formattedQuery)
        })
        // console.log(filterData);
        
        setData(filterData)
    }
    useEffect(() => {
        setLoading(true)
        searchData(searchQuery)
        setFullData(data)
        console.log("data is ",data);


    }, [])

    const blueTheme = '#0a113b'
    // '#f79890'


    return (
        <View style={{ flex: 1, backgroundColor: '#0a113b', flexDirection: 'column', alignItems: "center", gap: scale(6) }} >

            <Image source={images.need2} className="w-full" style={{ height: scale(70) }} resizeMode="stretch" />
            <View style={{ width: '100%', gap: scale(15), flexDirection: 'row', justifyContent: 'flex-start', alignItems: 'center', padding: scale(10) }}>
                <ImageBackground source={images.need2} resizeMode="cover" style={{flex:1,justifyContent:'center',alignItems:'center', width:'100%'}}/>
                <Image source={{ uri: imageUrl }} className="rounded-full" style={{ width: scale(60), height: scale(60), backgroundColor: 'rgba(0, 0, 0, 0.5)' }} />
                <View style={{ width: '100%', padding: scale(4), marginRight: scale(10), flexDirection: 'column', gap: scale(4), justifyContent: 'center', alignContent: "center", backgroundColor: 'rgba(0, 0, 0, 0.5)' }}>
                    <Text style={{ color: '#fff' ,}}>
                        Code Story With Mik
                    </Text>
                    <Text style={{ color: '#fff' }}>
                        67.7k Subscribers
                    </Text>
                    <Text style={{ color: '#fff' }}>
                        445 Videos
                    </Text>


                </View>
            </View>
            <View style={{ width: '100%', flex: 1, flexDirection: 'column', backgroundColor: '#0a113b', justifyContent: "center", alignItems: 'center', gap: scale(10), paddingHorizontal: scale(6) }}>
                <View style={{ width: '100%', padding: scale(6),}}>
                    <Searchbar
                        autoCapitalize='none' autoCorrect={false} clearButtonMode="always"
                        placeholder="Search"
                        onChangeText={(text) => {
                            handleSearch(text)
                        }}
                        elevation={5}
                        theme={{ colors: { primary: '#f5a8a2'}}}
                        value={searchQuery}
                    />
                </View>
                {loading ? <ActivityIndicator size={"large"} color={'#ef9898'} /> : <FlatList data={data} keyExtractor={(item) => item.videoTitle} renderItem={(item) => <VideoCard item={item} />} />}


            </View>



        </View >

    )
}


export default Home

// < ScrollViewComponent style = {{ flex: 1, backgroundColor: '#ef9898', width: '100%', marginBottom: verticalScale(10), flexDirection: "column", justifyContent: 'center', alignItems: 'center', padding: scale(4), gap: scale(4) }}>