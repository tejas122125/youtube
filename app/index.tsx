import 'react-native-gesture-handler'

import { Redirect } from "expo-router"
import { useEffect, useState } from "react"
import { getItem, getUser } from '@/utils/secureStore'

const Home = () => {

    const [onBoarded, setOnBoarded] = useState<Boolean | null>(null)

    const checkOnboarding = async () => {
        const value = await getItem('onboarded')
        if (value === '1') {
            setOnBoarded(true)
        }
        else {
            setOnBoarded(false)
        }
    }

    const checkSignedIn = async () => {
        const userInfo = await getUser()
        if (userInfo == null) {
            <Redirect href={'/(auth)/register'} />
        }
        else {

        }
    }



    useEffect(() => {
        checkOnboarding()
        checkSignedIn()
    }, [onBoarded])


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