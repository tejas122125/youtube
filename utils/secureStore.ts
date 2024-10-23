import * as SecureStore from 'expo-secure-store';

export const saveUser = async (userInfo:object) => {
  await SecureStore.setItemAsync('userInfo', JSON.stringify(userInfo));
};

export const getUser = async () => {
  const userInfo = await SecureStore.getItemAsync('userInfo');
return userInfo
};

export const removeUser = async () => {
  await SecureStore.deleteItemAsync('userInfo');
};

export const setItem = async (key:string,value:string)=>{
  await SecureStore.setItemAsync(key,value)
}

export const getItem = async (key:string):Promise<string | null>=>{
   const res = await SecureStore.getItemAsync(key)
   return res
}

export const removeItem = async (key:string)=>{
  await SecureStore.deleteItemAsync(key)
}