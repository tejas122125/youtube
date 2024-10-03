
import 'react-native-gesture-handler'
import { Drawer } from 'expo-router/drawer'
import { GestureHandlerRootView } from 'react-native-gesture-handler'
import { NavigationContainer } from '@react-navigation/native';
import { Stack, Tabs } from 'expo-router';
import React, { useEffect, useState } from 'react';

import { useUser } from "@clerk/clerk-expo"
import HomeHeader from '@/components/HomeHeader';
import CustomDrawer from '@/components/CustomDrawer';


export default function TabLayout() {

  const { isSignedIn, user } = useUser()
  const imageUrl = user?.imageUrl
  console.log(user?.imageUrl);
  const firstName = user?.firstName


  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <Drawer screenOptions={{headerShown:false , drawerHideStatusBarOnOpen:true}} drawerContent={CustomDrawer}>
        <Drawer.Screen name='home' options={{ drawerLabel: "Home",headerTitle:"Home"}} />
        <Drawer.Screen name='file1' options={{ drawerLabel: "File1", headerTitle: "File1" }} />
        <Drawer.Screen name='file2' options={{ drawerLabel: "File2", headerTitle: "File2" }} />
      </Drawer>

    </GestureHandlerRootView>
  )
  // <Stack>
  //   <Stack.Screen name="onboarding" options={{ headerShown: false }} />
  //   <Stack.Screen name="home" options={{ headerShown: false }} />
  // </Stack>


};
