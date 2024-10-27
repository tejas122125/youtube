import { youtubeData } from "@/constants";
import { appfire, auth } from "@/firebaseConfig";
import { removeUser } from "@/utils/secureStore";
import AsyncStorage from "@react-native-async-storage/async-storage";
 import firebase from 'firebase/app';
import 'firebase/auth'
import { getAuth, initializeAuth } from "firebase/auth";
import * as firebaseAuth from 'firebase/auth';





export  async function fetchData (name:string){

try {
    
const data = youtubeData
// console.log(data);

return data

} catch (error) {
throw new Error(String(error))     
}

}

export const fetchYouTubeAnalyticsData = async (accessToken:string) => {
  const url = 'https://youtubeanalytics.googleapis.com/v2/reports'; // Update with the actual API endpoint you need

  const params = new URLSearchParams({
    ids: 'channel==YOUR_CHANNEL_ID', // Replace with your channel ID
    startDate: '2023-01-01', // Change to the desired start date
    endDate: '2023-01-31', // Change to the desired end date
    metrics: 'views,estimatedMinutesWatched', // Specify the metrics you want
    dimensions: 'day', // Optional: specify dimensions
    sort: 'day', // Optional: specify sort order
  });

  try {
    const response = await fetch(`${url}?${params}`, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${accessToken}`, // Add the access token here
        'Content-Type': 'application/json',
      },
    });

    // if (!response.ok) {
    //   throw new Error(`Error fetching data: ${response.statusText}`);
    // }

    const data = await response.json();
    console.log('YouTube Analytics Data:', data);
    // return data;
  } 
  
  catch (error) {
    console.error(error);
  }
};


export const logOut = async () => {
  try {
// const auth  = getAuth(appfire)

const success = await auth.signOut()
await removeUser()

    console.log('User signed out successfully.',success);
    // Optionally, you can navigate the user back to the login screen or do other state management
  } catch (error) {
    console.error('Error signing out: ', error);
  }
};