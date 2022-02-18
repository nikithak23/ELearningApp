import React from 'react';
import {Text, View, StyleSheet, ImageBackground, Image} from 'react-native';
import {TouchableOpacity} from 'react-native-gesture-handler';

const OnboardingScreen1 = ({navigation}) => {
  gotoSignIn = () => {
    navigation.navigate('SignIn');
  };

  return (
    <View style={styles.container}>
      <View
        style={{
          backgroundColor: '#EBEEF4',

          height: 100,
          width: 400,
        }}>
        <TouchableOpacity onPress={gotoSignIn}>
          <Text
            style={{
              marginTop: 64,
              marginLeft: 330,
              fontSize: 16,
              fontWeight: 'bold',
              color: 'black',
            }}>
            Skip
          </Text>
        </TouchableOpacity>
      </View>
      <ImageBackground
        source={require('../Images/OnBoarding/onscreen3.png')}
        style={{
          width: 390,
          height: 450,
          //   marginTop: -200,
        }}></ImageBackground>
      <View style={styles.text1view}>
        <Text style={styles.text1}>Study Overview</Text>
        <Text style={styles.text2}>
          This is the part that is to be done afterwards and its a dummy text
        </Text>
      </View>
      <View style={styles.bottom}>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            marginLeft: 50,
          }}>
          <View
            style={{
              height: 6,
              width: 6,
              borderWidth: 1,
              borderColor: '#4C93FF',
              borderRadius: 12,
              backgroundColor: '#4C93FF',

              opacity: 0.4,
            }}></View>

          <View
            style={{
              height: 6,
              width: 6,
              borderWidth: 1,
              borderColor: '#4C93FF',
              borderRadius: 12,
              backgroundColor: '#4C93FF',

              opacity: 0.4,
              marginLeft: 5,
            }}></View>
          <View
            style={{
              height: 6,
              width: 25,
              borderWidth: 1,
              borderColor: '#4C93FF',
              borderRadius: 12,
              backgroundColor: '#4C93FF',
              marginLeft: 5,
            }}></View>
          <Text style={{marginLeft: 30, fontSize: 20, fontWeight: 'bold'}}>
            Get Started
          </Text>
        </View>
        <TouchableOpacity onPress={gotoSignIn}>
          <Image
            source={require('../Images/SignUp/btn_able.png')}
            style={styles.imagesignin}
          />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    height: '100%',
    width: '100%',
    backgroundColor: 'white',
    // justifyContent: 'flex-start',
    alignItems: 'flex-start',
    // backgroundColor: '#4C93FF',
  },
  title: {
    fontSize: 16,
    color: 'black',
  },
  text1view: {
    marginTop: 30,
  },
  text1: {
    fontSize: 28,
    fontWeight: '500',
    color: 'black',
    marginHorizontal: 90,
  },
  text2: {
    alignSelf: 'center',
    marginTop: 14,
    color: '#676666',
    fontWeight: '500',
    marginHorizontal: 50,
  },
  imagesignin: {
    width: 100,
    height: 100,
    marginLeft: 10,

    marginTop: 20,
  },
  bottom: {
    flexDirection: 'row',
    marginTop: 30,
    // alignContent: 'space-around',
    // justifyContent: 'space-around',
    // marginHorizontal: 50,
  },
});
export default OnboardingScreen1;
