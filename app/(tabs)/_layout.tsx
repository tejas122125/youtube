import { NavigationContainer } from '@react-navigation/native';
import { Stack, Tabs } from 'expo-router';
import React, { useEffect, useState } from 'react';


export default function TabLayout() {



  return (
    <Stack>
      <Stack.Screen name="onboarding" options={{ headerShown: false }} />
      <Stack.Screen name="home" options={{ headerShown: false }} />
    </Stack>


  );

}
