import { images } from "@/constants";
import { Image, Text, View, StyleSheet } from "react-native"
import { scale, verticalScale, moderateScale } from 'react-native-size-matters';

const VideoCard = (item: any) => {
    // console.log(item);
    const videoTitle = item.item.item.videoTitle
    const videoPlaylist = item.item.item.playlistName
   
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
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    cardContainer: {
        flexDirection: 'row',
        backgroundColor: '#0a113b',
        borderRadius: 8,
        elevation: 5, // Adds shadow for Android
        shadowColor: '#000', // Adds shadow for iOS
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        padding: scale(6),
        margin: scale(6),
        alignItems: 'center',
        width: "100%", // Adjust card width relative to screen size
        alignSelf: 'center',
        justifyContent: 'space-between',
        overflow: 'hidden'
    },
    image: {
        width: scale(150), // Fixed width for the image
        height: scale(110), // Fixed height for the image
        borderRadius: scale(8),
        marginRight: scale(6),
        resizeMode:'cover'
    },
    textContainer: {
        flex: 1,
        paddingRight:scale(10) // Takes remaining space
    },
    title: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 5,
        color:'#cb544a'
    },
    description: {
        fontSize: 14,
        color: '#f79890',
        marginBottom: 5,
    },
    subText: {
        fontSize: 12,
        color: '#888',
    },
});

export default VideoCard