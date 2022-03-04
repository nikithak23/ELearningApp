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

<<<<<<< HEAD
      return () => {
        clearTimeout(interval);
      };
    }else{
      let interval;
      interval = setTimeout(() => {
        setSplashScreen(false)
        navigation.replace('OnBoard1');
      }, 2500);
=======
  useEffect(() => {
    let interval;
    interval = setTimeout(() => {
      hideSplashScreen();
      navigation.dispatch(StackActions.replace('OnBoard1'));
    }, 2500);
>>>>>>> b4c730d7486f29d5dbd70ea9dc46b1ed371d1a13

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
