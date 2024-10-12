import React, { useState, useRef, useCallback } from 'react';
import { View, Text, ScrollView, StyleSheet, TouchableOpacity, Animated, Dimensions, NativeSyntheticEvent, NativeScrollEvent } from 'react-native';
import { Ionicons } from '@expo/vector-icons'; // For the up-arrow icon (optional, you can install via `expo install @expo/vector-icons`)

const { height } = Dimensions.get('window'); // Get the screen height for responsiveness
import { scale, verticalScale, moderateScale } from 'react-native-size-matters';
// import FilterButton from './FilterButton';
import { useFocusEffect } from '@react-navigation/native';






const ChatWindow = () => {
    const [commentType, setCommentType] = useState<string>("all")
    const [showScrollTopButton, setShowScrollTopButton] = useState(false);
    const scrollViewRef = useRef<ScrollView>(null);
const filterComment = (type:string)=>{
    setCommentType(type)
}

    const messages = [
        {
            "id": 1,
            "comment": "This is comment number 1 with question sentiment.",
            "reply": "This is reply number 1 with negative sentiment.",
            "sentiment": "question"
        },
        {
            "id": 2,
            "comment": "This is comment number 2 with negative sentiment.",
            "reply": "This is reply number 2 with neutral sentiment.",
            "sentiment": "negative"
        },
        {
            "id": 3,
            "comment": "This is comment number 3 with negative sentiment.",
            "reply": "This is reply number 3 with negative sentiment.",
            "sentiment": "negative"
        },
        {
            "id": 4,
            "comment": "This is comment number 4 with question sentiment.",
            "reply": "This is reply number 4 with question sentiment.",
            "sentiment": "question"
        },
        {
            "id": 5,
            "comment": "This is comment number 5 with neutral sentiment.",
            "reply": "This is reply number 5 with question sentiment.",
            "sentiment": "neutral"
        },
        {
            "id": 6,
            "comment": "This is comment number 6 with neutral sentiment.",
            "reply": "This is reply number 6 with positive sentiment.",
            "sentiment": "neutral"
        },
        {
            "id": 7,
            "comment": "This is comment number 7 with positive sentiment.",
            "reply": "This is reply number 7 with neutral sentiment.",
            "sentiment": "positive"
        },
        {
            "id": 8,
            "comment": "This is comment number 8 with neutral sentiment.",
            "reply": "This is reply number 8 with negative sentiment.",
            "sentiment": "neutral"
        },
        {
            "id": 9,
            "comment": "This is comment number 9 with negative sentiment.",
            "reply": "This is reply number 9 with question sentiment.",
            "sentiment": "negative"
        },
        {
            "id": 10,
            "comment": "This is comment number 10 with neutral sentiment.",
            "reply": "This is reply number 10 with question sentiment.",
            "sentiment": "neutral"
        }
    ]

    const filter = () => {
        const [isExpanded, setIsExpanded] = useState<Boolean>(false);

        // Animated values for scaling and height
        const heightAnim = useRef(new Animated.Value(0)).current;
        const opacityAnim = useRef(new Animated.Value(0)).current;

        useFocusEffect(useCallback(() => {
            setIsExpanded(false)
        }, []))

        // Toggles the expansion of the filter view
        const toggleExpand = () => {
            if (isExpanded) {
                // Collapse
                Animated.parallel([
                    Animated.timing(heightAnim, {
                        toValue: 0,
                        duration: 300,
                        useNativeDriver: false,
                    }),
                    Animated.timing(opacityAnim, {
                        toValue: 0,
                        duration: 300,
                        useNativeDriver: false,
                    }),
                ]).start(() => setIsExpanded(false));
            } else {
                setIsExpanded(true);
                // Expand
                Animated.parallel([
                    Animated.timing(heightAnim, {
                        toValue: 150, // Height for 4 filters
                        duration: 300,
                        useNativeDriver: false,
                    }),
                    Animated.timing(opacityAnim, {
                        toValue: 1,
                        duration: 300,
                        useNativeDriver: false,
                    }),
                ]).start();
            }
        };

        const FilterButton = ({ title, iconName, onPress }: { title: string, iconName: any, onPress:any }) => (
            <TouchableOpacity onPress={onPress} style={styles.filterButton}>
                <Ionicons name={iconName} size={20} color="#fff" />
                <Text style={styles.filterText}>{title}</Text>
            </TouchableOpacity>
        );

        return (
            <>
                {/* Main Filter Button */}
                <TouchableOpacity onPress={toggleExpand} style={styles.mainButton}>
                    <Ionicons name={isExpanded ? "close" : "filter"} size={scale(20)} color="#fff" />
                    <Text style={styles.buttonText}>Filter</Text>
                </TouchableOpacity>

                {/* Animated View for Filter Options */}
                {isExpanded && (
                    <Animated.ScrollView style={[styles.filterContainer, { maxHeight: heightAnim, opacity: opacityAnim }]}>
                        <FilterButton title="Positive" iconName="happy-outline" onPress={filterComment('positive')} />
                        <FilterButton title="Negative" iconName="sad-outline" onPress={filterComment('negative')} />
                        <FilterButton title="Neutral" iconName="remove-outline" onPress={filterComment('neutral')} />
                        <FilterButton title="Question" iconName="help-outline" onPress={filterComment('question')} />
                    </Animated.ScrollView>
                )}
            </>




        );
    };

    const handleScroll = (event: NativeSyntheticEvent<NativeScrollEvent>) => {
        const offsetY = event.nativeEvent.contentOffset.y;

        // Show the scroll-to-top button if scrolled down a bit
        if (offsetY > height * 0.2) {
            setShowScrollTopButton(true);
        } else {
            setShowScrollTopButton(false);
        }
    };

    const scrollToTop = () => {
        scrollViewRef.current?.scrollTo({ y: 0, animated: true });
    };

    return (
        <View style={styles.container}>
            <filter/>
            <ScrollView
                ref={scrollViewRef}
                style={styles.scrollView}
                onScroll={handleScroll}
                scrollEventThrottle={16}
            >
                {messages.map((message, index) => {
          
                    
                     if (message.sentiment === commentType || commentType === 'all') {
                        return (
                            <View style={[styles.sentimentContainer, { backgroundColor: '#0a113b' }]}>
                                <View
                                    key={message.id}
                                    style={[
                                        styles.messageBubble, styles.userBubble,

                                    ]}
                                >
                                    <Text style={styles.messageText}>{message.comment}</Text>
                                </View>
                                <View
                                    key={message.id}
                                    style={[
                                        styles.messageBubble,
                                        styles.replyBubble
                                    ]}
                                >
                                    <Text style={styles.messageText}>{message.reply}</Text>
                                </View>
                            </View>
                        )
                    }
                    else {
                    return null;
                    }
                }
                

                )}
            </ScrollView>

            {/* Scroll-to-Top Button */}
            {showScrollTopButton && (
                <TouchableOpacity style={styles.scrollToTopButton} onPress={scrollToTop}>
                    <Ionicons name="arrow-up-circle" size={32} color="#fff" />
                </TouchableOpacity>
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    mainButton: {
        flexDirection: 'row',
        alignItems: 'center',

        justifyContent: 'flex-end',
        backgroundColor: '#3A4D6A',
        borderRadius: 25,
        paddingVertical: scale(6),
        paddingHorizontal: scale(25),
        alignSelf: 'flex-end',
        marginRight: scale(4),
    },
    buttonText: {
        color: '#fff',
        fontSize: scale(14),
        marginLeft: scale(10),
        fontWeight: 'bold',
    },
    filterContainer: {
        backgroundColor: '#1E2A38',
        borderRadius: scale(10),
        marginTop: scale(2),
        position: 'absolute',
        width: scale(150),
        zIndex: 10,
        top: verticalScale(40),
        right: scale(15)
    },
    filterButton: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'flex-start',
        paddingVertical: verticalScale(8),
        paddingHorizontal: scale(10),
        borderBottomWidth: 1,
        borderBottomColor: '#3A4D6A',
    },
    filterText: {
        color: '#fff',
        fontSize: scale(12),
        marginLeft: scale(10),
        fontWeight: 'bold',
    },
    container: {
        flex: 1,
        flexDirection: 'column',
        position: 'relative',
        width: '100%',
        backgroundColor: '#0a113b', // Dark blue background
        padding: scale(6),
    },
    sentimentContainer: {
        flex: 1,
        width: '100%',
        padding: scale(3)

    },
    scrollView: {
        flex: 1,
    },
    messageBubble: {
        maxWidth: '70%',
        padding: scale(10),
        borderRadius: scale(15),
        marginVertical: verticalScale(5),
    },
    userBubble: {
        backgroundColor: '#4C8BF5', // Blue for user message
        alignSelf: 'flex-start',
    },
    replyBubble: {
        backgroundColor: '#51306e', // Light gray for replies
        alignSelf: 'flex-end',
    },
    messageText: {
        color: '#fff', // Text color white
        fontSize: scale(16),
    },
    scrollToTopButton: {
        position: 'absolute',
        bottom: scale(85),
        right: scale(20),
        backgroundColor: '#4C8BF5',
        borderRadius: scale(50),
        padding: scale(10),
        elevation: scale(10), // Shadow for Android
        shadowColor: '#fff', // Shadow for iOS
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.3,
        shadowRadius: scale(10),
    },
});

export default ChatWindow;
