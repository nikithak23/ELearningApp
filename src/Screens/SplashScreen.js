import React, {useState, useEffect, useContext} from 'react';
import {Image, View, StyleSheet, ImageBackground} from 'react-native';
import {StackActions} from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {Colors} from '../assets/Colors/index';
import {Icons} from '../assets/Icons/index';



const SplashScreen = ({navigation, route}) => {
  const [splashScreen, setSplashScreen] = useState(true);
  
  const retrieveData = async() => {
    const value = await AsyncStorage.getItem('loggedIn');
    const token = await AsyncStorage.getItem('token');
    if (value !== null) {
      // We have data!!
      console.log(value);
      let interval;
      interval = setTimeout(() => {
        setSplashScreen(false)
        navigation.replace('TabPage',{token: token});
      }, 2500);

      return () => {
        clearTimeout(interval);
      };
    }else{
      let interval;
      interval = setTimeout(() => {
        setSplashScreen(false)
        navigation.replace('OnBoard1');
      }, 2500);

      return () => {
        clearTimeout(interval);
      };
    }
  }

  useEffect(() => {
    retrieveData();
  },[]);

  const renderSplash = () => {
    return (
      <View style={styles.container}>
        <Image
          source={Icons.SplashLogo}
          style={{width: 129, height: 152, resizeMode: 'contain'}}
        />
      </View>
    );
  };
  return <View>{splashScreen && renderSplash()}</View>;
};

const styles = StyleSheet.create({
  container: {
    height: '100%',
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Colors.ReSend,
  },
});
export default SplashScreen;
