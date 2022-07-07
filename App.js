import React, {useState,useEffect} from 'react';
import { StyleSheet, Text, View , ActivityIndicator} from 'react-native';
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import LoginScreen from './src/screens/LoginScreen';
import HomeScreen from './src/screens/HomeScreen';
import PassengerScreen from './src/screens/PassengerScreen';
import DriverScreen from './src/screens/DriverScreen';
import * as Font from'expo-font';
import {renderInitialScreen} from './utils/helpers';
import * as Permissions from 'expo-permissions';

const {Navigator , Screen} = createNativeStackNavigator();

export default function App() {
  // Attendre le chargement des fonts avant d'afficher mon composant Bookscreen 
       const [loading , setLoading] = useState(true);
       const [initialScreen , setinitialScreen] = useState("Login");
  // charger les fonts dans mon application
       const loadRessources = async () => {
           
           try {

            const result = await new Promise.all([
                 await Font.loadAsync({
                "LeckerliOne": require('./assets/fonts/LeckerliOne-Regular.ttf'),
                "Poppins": require('./assets/fonts/Poppins-Regular.ttf'),
                "Gilroy_Bold": require('./assets/fonts/Gilroy_Bold.ttf'),
                "GT-Sectra-Fine-Regular": require('./assets/fonts/GT-Sectra-Fine-Regular.ttf'),
                "Montserrat-Black": require('./assets/fonts/Montserrat-Black.ttf'),
                "Montserrat-Medium": require('./assets/fonts/Montserrat-Medium.ttf'),
                "Montserrat-SemiBold": require('./assets/fonts/Montserrat-SemiBold.ttf')
                 }),
                 renderInitialScreen(),
                 Permissions.askAsync(Permissions.LOCATION)
              ]);
              //const screen = await ;
              //if(screen) setinitialScreen(screen);
              const route = result[1];
              const status = result[2].status;
              if (route && status === "granted") {
                setinitialScreen(route);
                setLoading(false);
              }
              
           } catch (e) {
              console.error('error loading ressources',e);
           }
        };
        // structure condition pour verifier le chargement des fonts avant le composant bookscreen
            useEffect(() => {
                loadRessources();
               
            },[]);
           
        if (loading) {
             return (
               <>
                 <View style={styles.container}>
                   <ActivityIndicator/>
                 </View>
               </>

               );
         }
  return (
    
    <NavigationContainer>
        <Navigator initialRouteName={initialScreen} screenOptions={{headerShown:false}}>
          <Screen name="Login" component={LoginScreen}/>
          <Screen name="Home" component={HomeScreen}/>
          <Screen name="Passenger" component={PassengerScreen}/>
          <Screen name="Driver" component={DriverScreen}/>
        </Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
