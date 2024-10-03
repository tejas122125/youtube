import { View, Text, Button } from "react-native"
import { SafeAreaView } from "react-native-safe-area-context"
import { DrawerActions } from "@react-navigation/native";
import { useNavigation } from "expo-router";
const File2 = () => {

    const navigation = useNavigation()

    const onToggle = () => {
        navigation.dispatch(DrawerActions.openDrawer)
    }
    return (
        <SafeAreaView>
            <Button title="open" onPress={onToggle} />
            <Text>
                Monuin
            </Text>
        </SafeAreaView>
    )
}
export default File2