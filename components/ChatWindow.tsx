import React, { useState, useRef } from 'react';
import { View, Text, ScrollView, StyleSheet, TouchableOpacity, Animated, Dimensions, NativeSyntheticEvent, NativeScrollEvent } from 'react-native';
import { Ionicons } from '@expo/vector-icons'; // For the up-arrow icon (optional, you can install via `expo install @expo/vector-icons`)

const { height } = Dimensions.get('window'); // Get the screen height for responsiveness

const ChatWindow = () => {
    const [showScrollTopButton, setShowScrollTopButton] = useState(false);
    const scrollViewRef = useRef<ScrollView>(null);

    const messages = [
        { id: 1, text: "Hello!", sender: "user" },
        { id: 2, text: "Hi, how are you?", sender: "reply" },
        { id: 3, text: "I'm doing great, thanks for asking!", sender: "user" },
        { id: 4, text: "That's awesome to hear!", sender: "reply" },
        { id: 5, text: "What are you up to?", sender: "user" },
        { id: 6, text: "Just working on a project.", sender: "reply" },
        { id: 7, text: "Sounds good!", sender: "user" },
    ];

    const handleScroll = (event:NativeSyntheticEvent<NativeScrollEvent>) => {
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
            <ScrollView
                ref={scrollViewRef}
                style={styles.scrollView}
                onScroll={handleScroll}
                scrollEventThrottle={16}
            >
                {messages.map((message, index) => (
                    <View
                        key={message.id}
                        style={[
                            styles.messageBubble,
                            message.sender === "user"
                                ? styles.userBubble
                                : styles.replyBubble,
                        ]}
                    >
                        <Text style={styles.messageText}>{message.text}</Text>
                    </View>
                ))}
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
    container: {
        flex: 1,
        width:'100%',
        backgroundColor: '#0a113b', // Dark blue background
        padding: 10,
    },
    scrollView: {
        flex: 1,
    },
    messageBubble: {
        maxWidth: '70%',
        padding: 10,
        borderRadius: 15,
        marginVertical: 5,
    },
    userBubble: {
        backgroundColor: '#4C8BF5', // Blue for user message
        alignSelf: 'flex-start',
    },
    replyBubble: {
        backgroundColor: '#d1d1d1', // Light gray for replies
        alignSelf: 'flex-end',
    },
    messageText: {
        color: '#fff', // Text color white
        fontSize: 16,
    },
    scrollToTopButton: {
        position: 'absolute',
        bottom: 20,
        right: 20,
        backgroundColor: '#4C8BF5',
        borderRadius: 50,
        padding: 10,
        elevation: 10, // Shadow for Android
        shadowColor: '#000', // Shadow for iOS
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.3,
        shadowRadius: 3,
    },
});

export default ChatWindow;
