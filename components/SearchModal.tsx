import { View,Text, Modal, Touchable } from "react-native"
import { TouchableOpacity } from "react-native-gesture-handler"
import { SafeAreaView } from "react-native-safe-area-context"

const SearchModal = (searchModal:boolean, hideModal:()=>void) =>{
    return (
<Modal visible={searchModal} animationType="slide"  transparent={true}>
<View style={{ flexDirection:'column' , justifyContent:'center',backgroundColor:'white', alignContent:'center'}}>
    <Text>
        Monu
    </Text>
    <TouchableOpacity onPress={hideModal} className="bg-red-500">
        <Text>close</Text>
    </TouchableOpacity>
</View>
</Modal>
    )
}
export default SearchModal