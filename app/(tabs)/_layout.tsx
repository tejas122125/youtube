
import 'react-native-gesture-handler'
import { Drawer } from 'expo-router/drawer'
import { GestureHandlerRootView } from 'react-native-gesture-handler'
import { NavigationContainer } from '@react-navigation/native';
import { Stack, Tabs, useRouter } from 'expo-router';
import React, { useEffect, useState } from 'react';
import { useUser, useClerk } from "@clerk/clerk-expo"
import HomeHeader from '@/components/HomeHeader';
import CustomDrawer from '@/components/CustomDrawer';
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';
import { DrawerContentScrollView, DrawerItemList, DrawerItem } from '@react-navigation/drawer';
import { View, Image, Text, TouchableOpacity } from 'react-native';
import { scale } from 'react-native-size-matters';
import { images } from '@/constants/indes';
import Header from '@/components/Header';
import { DrawerActions } from "@react-navigation/native";
import { useNavigation } from "expo-router";

// const CustomDrawer = ({ props, signOut }: { props: any, signOut: () => void }) => {


//   const router = useRouter()
//   // save it innto zustand
//   const { isSignedIn, user } = useUser()
//   const imageUrl = user?.imageUrl
//   // const {imageUrl} = props
//   const { top, bottom } = useSafeAreaInsets()
//   return (
//     <SafeAreaView style={{ flex: 1 }}>
//       <DrawerContentScrollView scrollEnabled={false} contentContainerStyle={{ backgroundColor: '#dde3fe', paddingTop: top }}>
//         <View className="#dde3e" style={{ padding: scale(20) }}>
//           <Image source={{ uri: imageUrl }} style={{ height: scale(100), width: scale(100), alignSelf: "center" }} className="rounded-full" />
//         </View>
//         <View style={{ flex: 1, backgroundColor:'#ffffff', paddingTop: scale(10) }}>
//           {/* <TouchableOpacity style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start', gap: scale(20), backgroundColor: '#dde3fe', padding: scale(14) ,marginVertical:scale(10)}} onPress={() => { router.push('/(tabs)/file1') }}>
//             <Image source={images.google} style={{ height: scale(30), width: scale(30), padding: scale(10), borderRadius: 100 }} />
//             <Text style={{ textAlign: 'center', color: 'white', fontWeight: 'semibold', fontSize: scale(16) }}>
//               File1
//             </Text>
//           </TouchableOpacity>
//           <TouchableOpacity style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start', gap: scale(20), backgroundColor: '#dde3fe', padding: scale(14), marginVertical: scale(10) }} onPress={() => { router.push('/(tabs)/file2') }}>
//             <Image source={images.google} style={{ height: scale(30), width: scale(30), padding: scale(10), borderRadius: 100 }} />
//             <Text style={{ textAlign: 'center', color: 'white', fontWeight: 'semibold', fontSize: scale(16) }}>
//               File 2
//             </Text>
//           </TouchableOpacity> */}
//         </View>
//       </DrawerContentScrollView>
//       <View style={{
//         backgroundColor: "#f76464",
//         borderTopColor: '#dde3fe',
//         borderTopWidth: 1,
//         padding: 20,
//         paddingBottom: 20 + bottom
//       }}>
//         <TouchableOpacity style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start', gap: scale(20), }} onPress={signOut} >
//           <Image source={images.logout} style={{ height: scale(30), width: scale(30) }} />
//           <Text style={{ color: 'white', fontWeight: 'bold', fontSize: scale(16) }}>
//             Logout
//           </Text>
//         </TouchableOpacity>
//       </View>
//     </SafeAreaView>
//   )
// }
export default function TabLayout() {
  const navigation = useNavigation()
  const { isSignedIn, user } = useUser()
  const imageUrl = user?.imageUrl
  console.log(user?.imageUrl);
  const firstName = user?.firstName

  const onToggle = () => {
    navigation.dispatch(DrawerActions.openDrawer)
  }

  return (
    <SafeAreaView style={{flex:1,marginHorizontal:scale(2) }}>
    <GestureHandlerRootView style={{ flex: 1}}>
      <Drawer screenOptions={{ headerShown: true, drawerHideStatusBarOnOpen: true,header:()=>{
        return <Header onpress={onToggle}/>
      } }} drawerContent={CustomDrawer}>
        <Drawer.Screen name='home' options={{ drawerLabel: "Home", headerTitle: "Home" }} />
        <Drawer.Screen name='file1' options={{ drawerLabel: "File1", headerTitle: "File1" }} />
        <Drawer.Screen name='file2' options={{ drawerLabel: "File2", headerTitle: "File2" }} />
      </Drawer>
    </GestureHandlerRootView>
    </SafeAreaView>
  )
  // <Stack>
  //   <Stack.Screen name="onboarding" options={{ headerShown: false }} />
  //   <Stack.Screen name="home" options={{ headerShown: false }} />
  // </Stack>


};
