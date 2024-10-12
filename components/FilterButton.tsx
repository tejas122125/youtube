import React, { useState, useRef, useEffect, useCallback } from 'react';
import { View, Text, TouchableOpacity, Animated, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';  // For button icons
import { useFocusEffect } from '@react-navigation/native';
import { scale, verticalScale } from 'react-native-size-matters';

const FilterButton = () => {
    const [isExpanded, setIsExpanded] = useState<Boolean>(false);

    // Animated values for scaling and height
    const heightAnim = useRef(new Animated.Value(0)).current;
    const opacityAnim = useRef(new Animated.Value(0)).current;

useFocusEffect(useCallback(()=>{
    setIsExpanded(false)
},[]))

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

    const FilterButton = ({ title, iconName, onPress }: { title: string, iconName: any, onPress: () => void }) => (
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
                    <FilterButton title="Positive" iconName="happy-outline" onPress={() =>{ toggleExpand() 
                        console.log('Positive')}} />
                    <FilterButton title="Negative" iconName="sad-outline" onPress={() => console.log('Negative')} />
                    <FilterButton title="Neutral" iconName="remove-outline" onPress={() => console.log('Neutral')} />
                    <FilterButton title="Question" iconName="help-outline" onPress={() => console.log('Question')} />
                </Animated.ScrollView>
            )}
        </>




    );
};

const styles = StyleSheet.create({
    container: {
        padding: scale(2),
        flexDirection: 'row',
        width: '100%',
        alignItems: 'flex-start',
        justifyContent: 'space-between',
        gap:scale(10),position:'relative'
    },
    mainButton: {
        flexDirection: 'row',
        alignItems: 'center',
        
        justifyContent: 'flex-end',
        backgroundColor: '#3A4D6A',
        borderRadius: 25,
        paddingVertical:scale(6),
        paddingHorizontal: scale(25),
        alignSelf:'flex-end',
        marginRight:scale(4),
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
        position:'absolute',
        width:scale(150),
        zIndex:100,
        top:verticalScale(200),   
        right:scale(15)    
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
});

export default FilterButton;
