import { Redirect } from "expo-router"
import { useEffect, useState } from "react"
import { GetItem } from '../utils/asyncStorage'
import { View } from "react-native-reanimated/lib/typescript/Animated"
import { useAuth } from "@clerk/clerk-expo"
const Home = () => {
    const { isSignedIn } = useAuth()
    const [onBoarded, setOnBoarded] = useState<Boolean | null>(null)

    const checkOnboarding = async () => {

        const value = await GetItem('onboarded')
        if (value === '1') {
            setOnBoarded(true)
        }
        else {
            setOnBoarded(false)
        }
    }

    useEffect(() => {
        checkOnboarding()
    }, [onBoarded])


    if (onBoarded == null) {
        return null
    }
    if (!onBoarded) {
        return <Redirect href={"/(tabs)/onboarding"} />

    }
    else {

        if (isSignedIn) {
            // return <Redirect href="/(auth)/welcome"  />
            return <Redirect href={'/(tabs)/home'} />

        }
        else {
            return <Redirect href={'/(auth)/register'} />

        }
     
    }
}
export default Home