 export const auth = async () => {
        try {
           await GoogleSignIn.auth({
      
             clientId: Platform.OS === 'android' ? androidClientId : iosClientId
           });
            } catch({e}) {

           console.log("error auth", e);
         }
        
      }

//////////////

import React, {useEffect} from 'react';
import { Platform} from 'react-native';
//import * as Google from 'expo-google-app-auth';
//import * as AppAuth from 'expo-app-auth';
import * as GoogleSignIn from 'expo-google-sign-in';

export const prefix = Platform.OS === "ios" ? "ios" : "md";

 
     const iosClientId='609926448149-tcbv1o1tkhv3g43ll624lv1qpc7q417v.apps.googleusercontent.com';
     const androidClientId='609926448149-ugrp9im625rarlpvc80k82s8gueu2e9f.apps.googleusercontent.com';
    
         useEffect(()=> {

            initAsync();
         });

export const auth {

        
  

     const initAsync = async () => {
        try {
           await GoogleSignIn.initAsync({
      
             clientId: Platform.OS === 'android' ? androidClientId : iosClientId
           })
            } catch(e) {

           console.log("error auth", e);
         }
        
      };
 

 }

  const config = {
  iosClientId:`609926448149-tcbv1o1tkhv3g43ll624lv1qpc7q417v.apps.googleusercontent.com`,
  androidClientId:`609926448149-ugrp9im625rarlpvc80k82s8gueu2e9f.apps.googleusercontent.com`,
  scopes: ['profile', 'email']
 
};