import { View, Text, Button, Image, StyleSheet } from "react-native"
import { SafeAreaView } from "react-native-safe-area-context"
import { DrawerActions, useFocusEffect } from "@react-navigation/native";
import { useNavigation } from "expo-router";
import { scale, verticalScale } from "react-native-size-matters";
import { images } from "@/constants";
import ChatWindow from "@/components/ChatWindow";
import { useCallback, useEffect, useState } from "react";
const File2 = () => {
    const [initialState, setInitialState] = useState(false)
    const navigation = useNavigation()

    const onToggle = () => {
        navigation.dispatch(DrawerActions.openDrawer)
    }


    return (
        <View style={{ flex: 1, flexDirection: "column", backgroundColor: '#0a113b', padding: scale(4), alignItems: "center", justifyContent: 'flex-start', gap: verticalScale(2) ,position:'relative'}}>
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
                        <Image source={images.like} style={{ height: scale(30), width: scale(30), borderRadius: scale(10), padding: scale(2) }} />
                        <Text style={styles.description}>100%</Text>
                    </View>
                    <View style={styles.stats}>
                        <Image source={images.dislike} style={{ height: scale(30), width: scale(30), borderRadius: scale(10), padding: scale(2) }} />
                        <Text style={styles.description}>100%</Text>
                    </View>

                </View>
            </View>
            <ChatWindow />
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
        shadowColor: '#fff', // Adds shadow for iOS
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
        marginBottom: verticalScale(6),
        width: '100%',
        backgroundColor: '#4c5d90',
        borderRadius: 10,
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
