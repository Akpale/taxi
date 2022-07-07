import react , {useEffect,useState} from 'react';
import { Platform,Alert,AsyncStorage} from 'react-native';
import * as Google from 'expo-google-app-auth';
//import * as AppAuth from 'expo-app-auth';
import * as Facebook from 'expo-facebook';
import {LoginManager} from 'react-native-fbsdk-next';
//import { GoogleSignin,GoogleSigninButton,statusCodes} from '@react-native-google-signin/google-signin';
import axios from 'axios';
import PolyLine from "@mapbox/polyline";

export const prefix = Platform.OS === "ios" ? "ios" : "md";

export const auth = async function logIn() {
  
  try {
    await Facebook.initializeAsync({
      appId: '415894623557675',
    });

    const { type,token,expirationDate, permissions, declinedPermissions,userId} =
        await Facebook.logInWithReadPermissionsAsync({
          permissions: ['public_profile'],
        });
     //console.log(name);

    if (type === 'success') {
      // Get the user's name using Facebook's Graph API
      const response = await fetch(`https://graph.facebook.com/me?access_token=${token},email,name,id,first_name,last_name,userId`);
        //console.log(response);
        //Alert.alert('Logged in!', `Hi ${(await response.json()).name}!`);
        
        const {name,photoUrl,email} = userId;
        await AsyncStorage.setItem(
            "user",
         JSON.stringify({
            name,
            photoUrl,
            email
           })
             );

          

    } else {
      // type === 'cancel'
    }
  } catch ({ message }) {
    //alert(`Facebook Login Error: ${message}`);
    console.log(message);
  }

}


export const renderInitialScreen = async () => {
    try {
      const user = await AsyncStorage.getItem("user");
      JSON.parse(user);
      return user ? "Home" : "Login";
    } catch (e) {

        console.error ("error render initial screen",e);
    }
}

export const API_KEY ="AIzaSyA-TBaSCG_w37XRwYUM2116XWxc8szJvlA";

export const BASE_URL  ="https://maps.googleapis.com/maps/api";

export const SERVER_URL = "http://192.168.1.192:4000";

export const getRoute = async url => {
    try {
      const {data : {routes}} = await axios.get(url);
      const points =routes[0].overview_polyline.points;
      return points;
    } catch (e) {

        console.error ("error route",e);
    }
}

export const decodePoint = point => {
    const fixPoints = PolyLine.decode(point);
    //console.log('fixPoint',fixPoint);

  const route = fixPoints.map(fixPoint => {
     return {
        latitude : fixPoint[0],
        longitude : fixPoint[1]
     }
  });
  console.log('route',route);
  return route;
}

