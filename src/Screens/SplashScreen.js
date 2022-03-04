import React, {useState, useEffect, useContext} from 'react';
import {Text, Image, View, StyleSheet, ImageBackground} from 'react-native';
import {StackActions} from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const SplashScreen = ({navigation, route}) => {
  const [splashScreen, setSplashScreen] = useState(true);

  // const hideSplashScreen = () => {
  //   setSplashScreen(false);
  // };
  
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
          source={require('../Images/Splash/splashLogo.png')}
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
    backgroundColor: '#4C93FF',
  },
});
export default SplashScreen;
