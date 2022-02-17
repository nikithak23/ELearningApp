import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
//import {store,persistor} from './redux/store';
//import {Provider} from 'react-redux';
//import { PersistGate } from 'redux-persist/es/integration/react'

import SplashScreen from './Screens/SplashScreen';
import SignUp from './Screens/SignUpScreen';

const Stack = createNativeStackNavigator();

function mainNavig() {

  
  return (
   
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Splash">
        <Stack.Screen name="Splash"  component={SplashScreen} options={{headerShown:false}} />
        <Stack.Screen name="SignUp"  component={SignUp} options={{headerShown:false}} />
      </Stack.Navigator>
    </NavigationContainer>

  );
}

export default mainNavig;
