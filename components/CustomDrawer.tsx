import { View ,Text} from "react-native"

import { DrawerContentScrollView,DrawerItem,DrawerItemList } from "@react-navigation/drawer"
import { useRouter } from "expo-router"
import { useSafeAreaInsets } from "react-native-safe-area-context"

const CustomDrawer = (props :any)=>{
    const router = useRouter()
    const {top,bottom} = useSafeAreaInsets()
    return (
        <View style={{flex:1}}>
           <DrawerContentScrollView {...props} scrollEnabled={false} contentContainerStyle={{backgroundColor:'#dde3fe',paddingTop:top}}>
            <DrawerItemList {...props} />
            <DrawerItem label={'testing'} onPress={()=> router.replace('/')}/>

           </DrawerContentScrollView>
           <View style={{
            borderTopColor : '#dde3fe',
            borderTopWidth : 1,
            padding:20,
            paddingBottom:20 + bottom
           }}>
<Text> footer</Text>
           </View>
        </View>
    )
}
export default CustomDrawer