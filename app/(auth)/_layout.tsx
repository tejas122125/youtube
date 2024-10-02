import { NavigationContainer } from '@react-navigation/native';
import { Stack, Tabs } from 'expo-router';
import React, { useEffect, useState } from 'react';


export default function AuthLayout() {



    return (
        <Stack>
            <Stack.Screen name="register" options={{ headerShown: false }} />
        </Stack>


    );

}
