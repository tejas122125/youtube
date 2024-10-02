import AsyncStorage from "@react-native-async-storage/async-storage";
export const setItem = async (key:string, value:string) => {
    try {
        await AsyncStorage.setItem(key, value)
    }
    catch (err) {
        console.log(err);

    }
}

export const GetItem = async (key:string) => {
    try {
        const value = await AsyncStorage.getItem(key)
        return value;

    }
    catch (err) {
        console.log(err);

    }
}

export const removeItem = async (key:string) => {
    try {
        await AsyncStorage.removeItem(key)
    } catch (error) {
        console.log(error);

    }
}