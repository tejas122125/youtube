import 'react-native-gesture-handler'

import { Redirect } from "expo-router"
import { useEffect, useState } from "react"
import { getItem, getUser } from '@/utils/secureStore'

const Home = () => {

    const [onBoarded, setOnBoarded] = useState<Boolean | null>(null)
    const [isSignedIn, setSignedIn] = useState<boolean|null>(null)
    const checkOnboarding = async () => {
        const value = await getItem('onboarded')
        if (value === '1') {
            setOnBoarded(true)
        }
        else {
            setOnBoarded(false)
        }
    }




    useEffect(() => {
        // checkOnboarding()
        const checkSignedIn = async () => {
            const userInfo = await getUser()
            const user = JSON.parse(userInfo!)
            console.log("inside check signin");

            if (user === null) {
                console.log("monu");
                // return false
                setSignedIn(false)

            }
            else {
                console.log(user);
                
                // Store in zustand store
                console.log("momoi");
                // return true
             setSignedIn(true)


            }
        }
        checkSignedIn()
    }, [])

    // if (isSignedIn) {
    //     console.log("inside if statement");

    //     return <Redirect href={'/(tabs)/home'} />

    // }
    // else {
    //     return <Redirect href={'/(auth)/register'} />

    // }

    return !isSignedIn ? <Redirect href={'/(auth)/register'} /> : <Redirect href={'/(auth)/register'} />


    // if (onBoarded == null) {
    //     return null
    // }
    // if (!onBoarded) {
    //     return <Redirect href={"/(tabs)/onboarding"} />

    // }
    // else {

    //     if (isSignedIn) {
    //         // return <Redirect href="/(auth)/welcome"  />
    //         return <Redirect href={'/(tabs)/home'} />

    //     }
    //     else {
    //         return <Redirect href={'/(auth)/register'} />

    //     }

    // }
}
export default Home