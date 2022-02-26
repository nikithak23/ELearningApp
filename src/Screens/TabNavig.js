import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import HomeScreen from './HomeScreen';
import {NavigationContainer} from '@react-navigation/native';
import SubjectScreen from './SubjectScreen';
import ProfileScreen from './ProfileScreen';

const Tab = createBottomTabNavigator();

const TabNavig = ({route}) => {
  const token = route.params.token;
  return (
    // <NavigationContainer independent={true}>
    <Tab.Navigator initialRouteName="TabHome">
      <Tab.Screen
        name="TabHome"
        component={HomeScreen}
        options={{headerShown: false}}
   
      />
      <Tab.Screen
        name="Subjects"
        children={() => (
          <SubjectScreen token={token} />
        )}
        options={{headerShown: false}}
  
      />
      <Tab.Screen
        name="Profile"
        component={ProfileScreen}
        options={{headerShown: false}}
  
      />
    </Tab.Navigator>
    // </NavigationContainer>
  );
};

export default TabNavig;
