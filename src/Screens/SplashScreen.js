import React, {useState, useEffect, useContext} from 'react';
import {Text, Image, View, StyleSheet,ImageBackground} from 'react-native';
import {StackActions} from '@react-navigation/native';

const SplashScreen = ({navigation,route}) => {
 
  const [splashScreen, setSplashScreen] = useState(true);

  const hideSplashScreen = () => {
    setSplashScreen(false);
  };
 

  useEffect(() => {
    let interval
      interval = setTimeout(() => {
        hideSplashScreen();
        navigation.dispatch(StackActions.replace('SignUp'));
      }, 2500);
  
    return () => {
      clearTimeout(interval);
    };
}); 


  const renderSplash = () => {
    return (
   
    <View style={styles.container}>
        <Image source={require('../Images/Splash/splashLogo.png')}
              style={{width:129, height: 152, resizeMode: 'contain'}}
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
        backgroundColor:'#4C93FF',
}
})
export default SplashScreen;
