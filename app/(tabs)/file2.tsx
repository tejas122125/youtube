import { View, Text, Button, Image, StyleSheet } from "react-native"
import { SafeAreaView } from "react-native-safe-area-context"
import { DrawerActions } from "@react-navigation/native";
import { useNavigation } from "expo-router";
import { scale, verticalScale } from "react-native-size-matters";
import { images } from "@/constants";
const File2 = () => {

    const navigation = useNavigation()

    const onToggle = () => {
        navigation.dispatch(DrawerActions.openDrawer)
    }
    return (
        <View style={{ flex: 1, flexDirection: "column", backgroundColor: '#0a113b', padding: scale(6), alignItems: "center", justifyContent: 'flex-start', gap: verticalScale(6) }}>
            <View style={styles.cardContainer}>
                {/* Image on the left side */}
                <Image
                    source={{ uri: 'https://via.placeholder.com/150' }}
                    style={styles.image}
                    resizeMode="cover"
                />
                {/* Right side with text */}
                <View style={styles.textContainer}>
                    <Text style={styles.title}> Comments Stats</Text>
                    <View style={styles.stats}>
                        <Image source={images.google} style={{ height: scale(20), width: scale(20), borderRadius: scale(100), padding: scale(2) }} />
                        <Text style={styles.description}>100%</Text>
                    </View>
                    <View style={styles.stats}>
                        <Image source={images.google} style={{ height: scale(20), width: scale(20), borderRadius: scale(100), padding: scale(2) }} />
                        <Text style={styles.description}>100%</Text>
                    </View>
                    <View style={styles.stats}>
                        <Image source={images.google} style={{ height: scale(20), width: scale(20), borderRadius: scale(100), padding: scale(2) }} />
                        <Text style={styles.description}>100%</Text>
                    </View>
                    
                </View>
            </View>
        </View>
    )
}
export default File2

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
        resizeMode: 'cover'
    },
    textContainer: {
        flexDirection: 'column',
        gap: verticalScale(3),
        flex: 1,
        padding: scale(10), // Takes remaining space
        justifyContent: 'flex-start',
        alignItems: 'center'
    },
    title: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 5,
        color: '#f79890',
        textShadowColor: '#000', // Shadow color
        textShadowOffset: { width: 1, height: 1 }, // Shadow offset
        textShadowRadius: 3, // Shadow blur radius
    },
    stats: {
        flexDirection: 'row',
        width:'100%',
        justifyContent: 'space-around',
        paddingStart: scale(6),
        padding: scale(2),
        alignItems: 'center',

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
