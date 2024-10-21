import React, { useRef } from 'react';
import { View, Text, ScrollView, StyleSheet, Animated } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';

const ScrollLimitExample = () => {
    // Create a reference for the ScrollView
    const scrollViewRef = useRef<ScrollView>(null);
    // Animated value to track the scroll position
    const scrollY = useRef(new Animated.Value(0)).current;

    // This value controls the scroll limit for upward scrolling
    const scrollLimit = 1550; // Set the limit in pixels where you want to stop upward scroll

    // Handler for scrolling
    const handleScroll = (event: any) => {
        const offsetY = event.nativeEvent.contentOffset.y;
        console.log(offsetY);

        // Check if the scroll position is above the scrollLimit
        if (offsetY > scrollLimit) {
            // Stop scroll position if it goes above the limit
            scrollViewRef.current?.scrollTo({ y: scrollLimit, animated: false });
        }
    };

    return (
        <View style={styles.container}>

            <TouchableOpacity style={{ backgroundColor: 'red' }}>
                <Text>
                    google authenticate
                </Text>
            </TouchableOpacity>

        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f5f5f5',
    },
    scrollView: {
        flex: 1,
    },
    content: {
        padding: 20,
    },
    text: {
        fontSize: 18,
        marginVertical: 20,
        textAlign: 'center',
    },
    separator: {
        height: 2,
        backgroundColor: '#000',
        marginVertical: 20,
    },
});

export default ScrollLimitExample;
// {/* <ScrollView
//     // ref={scrollViewRef}
//     onScroll={handleScroll} // Attach the scroll handler
//     scrollEventThrottle={16} // Ensures smooth scrolling updates
//     style={styles.scrollView}
// >
//     {/* Content goes here */}
//     <View style={styles.content}>
//         <Text style={styles.text}>Scroll Down to See More</Text>
//         <Text style={styles.text}>Scroll Down to See More</Text>
//         <Text style={styles.text}>Scroll Down to See More</Text>
//         <Text style={styles.text}>Scroll Down to See More</Text>
//         <Text style={styles.text}>Scroll Down to See More</Text>
//         <Text style={styles.text}>Scroll Down to See More</Text>
//         <Text style={styles.text}>Scroll Down to See More</Text>
//         <Text style={styles.text}>Scroll Down to See More</Text>
//         <Text style={styles.text}>Scroll Down to See More</Text>
//         <Text style={styles.text}>Scroll Down to See More</Text>
//         <Text style={styles.text}>Scroll Down to See More</Text>
//         <Text style={styles.text}>Scroll Down to See More</Text>
//         <Text style={styles.text}>Scroll Down to See More</Text>
//         <Text style={styles.text}>Scroll Down to See More</Text>
//         <Text style={styles.text}>Scroll Down to See More</Text>
//         <Text style={styles.text}>Scroll Down to See More</Text>
//         <Text style={styles.text}>Scroll Down to See More</Text>
//         <Text style={styles.text}>Scroll Down to See More</Text>
//         <Text style={styles.text}>Scroll Down to See More</Text>
//         <Text style={styles.text}>Scroll Down to See More</Text>
//         <Text style={styles.text}>Scroll Down to See More</Text>
//         <Text style={styles.text}>Scroll Down to See More</Text>
//         <Text style={styles.text}>Scroll Down to See More</Text>
//         <Text style={styles.text}>Scroll Down to See More</Text>
//         <Text style={styles.text}>You've reached the scroll limit! Scrolling up will be restricted beyond this point.</Text>
//         <View style={styles.separator} />
//         <Text style={styles.text}>More content after the scroll limit</Text>
//         <Text style={styles.text}>More content after the scroll limit</Text>
//         <Text style={styles.text}>More content after the scroll limit</Text>
//         <Text style={styles.text}>More content after the scroll limit</Text>
//         <Text style={styles.text}>More content after the scroll limit</Text>
//         <Text style={styles.text}>More content after the scroll limit</Text>
//         <Text style={styles.text}>More content after the scroll limit</Text>
//         <Text style={styles.text}>More content after the scroll limit</Text>
//         <Text style={styles.text}>More content after the scroll limit</Text>
//         <Text style={styles.text}>More content after the scroll limit</Text>
//         <Text style={styles.text}>More content after the scroll limit</Text>
//         <Text style={styles.text}>More content after the scroll limit</Text>
//         <Text style={styles.text}>More content after the scroll limit</Text>
//         <Text style={styles.text}>More content after the scroll limit</Text>
//         <Text style={styles.text}>More content after the scroll limit</Text>
//         <Text style={styles.text}>More content after the scroll limit</Text>
//         <Text style={styles.text}>More content after the scroll limit</Text>
//         <Text style={styles.text}>More content after the scroll limit</Text>
//         <Text style={styles.text}>More content after the scroll limit</Text>
//         <Text style={styles.text}>More content after the scroll limit</Text>
//         <Text style={styles.text}>More content after the scroll limit</Text>
//         <Text style={styles.text}>More content after the scroll limit</Text>
//         <Text style={styles.text}>More content after the scroll limit</Text>

//         <Text style={styles.text}>More content after the  limit</Text>

//     </View>

// </ScrollView> */}