import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import HomeScreen from './HomeScreen';
import {NavigationContainer} from '@react-navigation/native';
import SubjectScreen from './SubjectScreen';
import ProfileScreen from './ProfileScreen';
import Ionicons from 'react-native-vector-icons/Ionicons';

const Tab = createBottomTabNavigator();

const TabNavig = ({route, navigation}) => {
  const token = route.params.token;
  const name=route.params.name;
  const data=route.params.data;
  //console.log(data);
  return (
    <Tab.Navigator initialRouteName="Home"
    screenOptions={({ route }) => ({
      tabBarIcon: ({ focused, color, size }) => {
      let iconName;
      if (route.name === 'Home') {iconName = focused? 'home': 'home-outline';
      } else if (route.name === 'Subjects') {iconName = focused ? 'book' : 'book-outline';
      } else if (route.name ==='Profile') {iconName = focused ? 'person' : 'person-outline';
      }   
      return <Ionicons name={iconName} size={size} color={color} />;
      },
      tabBarActiveTintColor: '#3A7FE7',
      tabBarInactiveTintColor: '#8E8F93',
    })}
    
    >
      <Tab.Screen
        name="Home"
        children={() => <HomeScreen token={token} navigation={navigation} />}
        options={{headerShown: false}}
      />
      <Tab.Screen
        name="Subjects"
        children={() => <SubjectScreen token={token} navigation={navigation} />}
        options={{headerShown: false}}
      />
      <Tab.Screen
        name="Profile"
        children={() => <ProfileScreen token={token} navigation={navigation} />}
        options={{headerShown: false}}
      />
    </Tab.Navigator>
  );
};

export default TabNavig;
