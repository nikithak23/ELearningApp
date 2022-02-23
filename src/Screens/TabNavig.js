import React from 'react'
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import HomeScreen from './HomeScreen';
import { NavigationContainer } from '@react-navigation/native';

const Tab = createBottomTabNavigator();

const TabNavig = ({route}) => {
  return (
    <NavigationContainer independent={true}>
      <Tab.Navigator initialRouteName="TabHome">
        <Tab.Screen
          name="TabHome"
          component={HomeScreen}
          options={{headerShown: false}}
        />
        <Tab.Screen
          name="Courses"
          component={HomeScreen}
          options={{headerShown: false}}
        />
        <Tab.Screen
          name="Profile"
          component={HomeScreen}
          options={{headerShown: false}}
        />
      </Tab.Navigator>
    </NavigationContainer>
  );
};

export default TabNavig;
