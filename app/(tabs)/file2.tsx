import { View, Text, Button, Image, StyleSheet, Dimensions } from "react-native"
import { SafeAreaView } from "react-native-safe-area-context"
import { DrawerActions, useFocusEffect } from "@react-navigation/native";
import { useNavigation } from "expo-router";
import { scale, verticalScale } from "react-native-size-matters";
import { images } from "@/constants";
import ChatWindow from "@/components/ChatWindow";
import { useCallback, useEffect, useState } from "react";
import Animated, { useSharedValue, useAnimatedStyle, withTiming, interpolateColor } from 'react-native-reanimated';
import { TouchableOpacity } from "react-native-gesture-handler";

const SCREEN_WIDTH = Dimensions.get('window').width;

const File2 = () => {
    const [initialState, setInitialState] = useState(false)
    const navigation = useNavigation()

    const onToggle = () => {
        navigation.dispatch(DrawerActions.openDrawer)
    }
    const ComponentOne = () => (
        <View style={styles.component}>
            <Text style={styles.componentText}>This is Component One</Text>
        </View>
    );

    const ComponentTwo = () => (
        <View style={styles.component}>
            <Text style={styles.componentText}>This is Component Two</Text>
        </View>
    );
    const [isToggled, setIsToggled] = useState(false);

    // Reanimated shared values
    const toggleValue = useSharedValue(0);

    // Toggle function to switch between the two components
    const toggleButton = useCallback(() => {
        setIsToggled((prev) => !prev);
        toggleValue.value = withTiming(isToggled ? 0 : 1, { duration: 500 });
    }, [isToggled, toggleValue]);

    // Animated button styles
    const animatedButtonStyle = useAnimatedStyle(() => {
        const backgroundColor = interpolateColor(toggleValue.value, [0, 1], ['#3A4D6A', '#cb544a']); // Dark Blue to Red
        return { backgroundColor };
    });

    // Animated text color styles
    const animatedTextStyle = useAnimatedStyle(() => {
        const textColor = interpolateColor(toggleValue.value, [0, 1], ['#fff', '#fff']);
        return { color: textColor };
    });

    // Animated component sliding effect
    const animatedComponentOneStyle = useAnimatedStyle(() => {
        return {
            transform: [
                {
                    translateX: withTiming(toggleValue.value * -SCREEN_WIDTH, { duration: 500 }), // Slide out to the left
                },
            ],
        };
    });
    const animatedComponentTwoStyle = useAnimatedStyle(() => {
        return {
            transform: [
                {
                    translateX: withTiming((toggleValue.value) * -SCREEN_WIDTH, { duration: 500 }), // Slide in from the right
                },
            ],
        };
    });

    // Highlight current component text style
    const highlightTextStyle = useAnimatedStyle(() => {
        const color = interpolateColor(toggleValue.value, [0, 1], ['#cb544a', '#3A4D6A']); // Inverted colors for highlighting
        return { color };
    });


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
            <Animated.View style={[styles.button, animatedButtonStyle]}>
                <TouchableOpacity onPress={toggleButton} style={styles.touchable}>
                    <Animated.Text style={[styles.buttonText, animatedTextStyle]}>
                        {isToggled ? 'Comment Stats' : 'Comments'}
                    </Animated.Text>
                </TouchableOpacity>
            </Animated.View>

            {/* Sliding Components */}
            <View style={styles.animatedContainer}>
                <Animated.View style={[styles.componentContainer, animatedComponentOneStyle]}>
                    <ComponentOne />
                </Animated.View>
                <Animated.View style={[styles.componentContainer, animatedComponentTwoStyle]}>
                    <ChatWindow />
                </Animated.View>
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
    button: {
        width:scale(200),
        height:scale(50),
        // paddingVertical: scale(4),
        borderRadius: scale(25),
        alignItems: 'flex-start',
        justifyContent: 'center',
        marginBottom: scale(4),
    },
    buttonText: {
        fontSize: scale(14),
        fontWeight: 'bold',
    },
    touchable: {
        flex: 1,
        width:'100%',
        // backgroundColor:'yellow',
        alignItems: 'center',
        justifyContent: 'center',
    },
    component: {
        width: scale(300),
        height: scale(150),
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#1E2A38',
        borderRadius: scale(15),
        marginVertical: scale(20),
    },
    componentText: {
        color: '#fff',
        fontSize: scale(16),
        fontWeight: 'bold',
    },
    highlightText: {
        fontSize: scale(16),
        fontWeight: 'bold',
        marginBottom: scale(20),
    },
    animatedContainer: {
        width: SCREEN_WIDTH,
        flex:1,
        overflow: 'hidden',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'flex-start',
        backgroundColor:'red'
    },
    componentContainer: {
        width: SCREEN_WIDTH,
        height:'100%',
        backgroundColor:'green',
        alignItems:'center'
    },
});
