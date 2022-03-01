import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

import SplashScreen from './Screens/SplashScreen';
import SignInScreen from './Screens/SignInScreen';
import OnboardingScreen1 from './Screens/OnBoardingScreen1';
import OnboardingScreen2 from './Screens/OnBoardingScreen2';
import OnboardingScreen3 from './Screens/OnBoardingScreen3';
import SignUpScreen from './Screens/SignUpScreen';
import AuthenticationScreen from './Screens/AuthenticationScreen';
import ResetPassScreen from './Screens/ResetPassScreen';
import TabNavig from './Screens/TabNavig';
import ResultScreen from './Screens/ResultScreen';
import NoSearchResult from './Screens/NoSearchResult';
import NotificationScreen from './Screens/NotificationScreen';

const Stack = createNativeStackNavigator();

function mainNavig() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Splash">
        <Stack.Screen
          name="Splash"
          component={SplashScreen}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="OnBoard1"
          component={OnboardingScreen1}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="OnBoard2"
          component={OnboardingScreen2}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="OnBoard3"
          component={OnboardingScreen3}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="SignIn"
          component={SignInScreen}
          options={{headerShown: false}}
        />

        <Stack.Screen
          name="SignUp"
          component={SignUpScreen}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="Authentication"
          component={AuthenticationScreen}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="ResetPassword"
          component={ResetPassScreen}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="TabPage"
          component={TabNavig}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="Notification"
          component={NotificationScreen}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="NoSearch"
          component={NoSearchResult}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="Results"
          component={ResultScreen}
          options={{headerShown: false}}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default mainNavig;
