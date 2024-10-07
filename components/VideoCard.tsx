import { images } from "@/constants";
import { Image, Text, View, StyleSheet } from "react-native"
import { scale, verticalScale, moderateScale } from 'react-native-size-matters';

const VideoCard = (item: any) => {
    console.log(item);
    const videoTitle = item.item.item.videoTitle
    const videoPlaylist = item.item.item.playlistName
    //     return (
    //         <View  style={{width:'100%', padding:scale(10),borderRadius:scale(10), marginBottom:scale(6),flexDirection:'row', justifyContent:'space-between', alignItems:'center' ,backgroundColor:'white', gap:scale(15)}}>
    //             <Image source={images.google} style={{height:scale(60), width:scale(60),borderRadius:scale(25),alignSelf:'flex-start' }}/>
    //             <View style={{flex:1, width:'100%', backgroundColor:'green',height:'100%', padding:scale(6), flexDirection:'column',}}>
    //                 <Text>
    //                     monu
    //                 </Text>
    //                 <Text>
    //                     monu
    //                 </Text>
    //                 <Text>
    //                     monu
    //                 </Text>
    //             </View>

    //         </View>
    //     )
    // }
    return (
        <View style={styles.cardContainer}>
            {/* Image on the left side */}
            <Image
                source={{ uri: 'https://via.placeholder.com/150' }}
                style={styles.image}
                resizeMode="cover"
            />
            {/* Right side with text */}
            <View style={styles.textContainer}>
                <Text style={styles.title}>{videoTitle}</Text>
                <Text style={styles.description}>This is a sample description for the card component, demonstrating the use of layout with flexbox in React Native.</Text>
                <Text style={styles.subText}>{videoPlaylist}</Text>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    cardContainer: {
        flexDirection: 'row',
        backgroundColor: '#fff',
        borderRadius: 8,
        elevation: 5, // Adds shadow for Android
        shadowColor: '#000', // Adds shadow for iOS
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        padding: scale(10),
        margin: scale(10),
        alignItems: 'center',
        width: "100%", // Adjust card width relative to screen size
        alignSelf: 'center',
        justifyContent: 'space-between',
        overflow: 'scroll'
    },
    image: {
        width: scale(60), // Fixed width for the image
        height: scale(80), // Fixed height for the image
        borderRadius: scale(8),
        marginRight: scale(10),
    },
    textContainer: {
        flex: 1, // Takes remaining space
    },
    title: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 5,
    },
    description: {
        fontSize: 14,
        color: '#666',
        marginBottom: 5,
    },
    subText: {
        fontSize: 12,
        color: '#888',
    },
});

export default VideoCard