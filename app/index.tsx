import { Redirect } from "expo-router"
import { useEffect, useState } from "react"
import { GetItem } from '../utils/asyncStorage'
import { View } from "react-native-reanimated/lib/typescript/Animated"
const Home = () => {

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
        return <Redirect href={"/(tabs)/home"} />

    }
}
export default Home