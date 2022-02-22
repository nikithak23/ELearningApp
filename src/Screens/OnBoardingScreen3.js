import React from 'react';
import {Text, View, StyleSheet, ImageBackground, Image,TouchableOpacity} from 'react-native';

const OnboardingScreen1 = ({navigation}) => {
  gotoSignIn = () => {
    navigation.navigate('SignIn');
  };

  return (
    <View style={styles.container}>
      <View style={styles.topContainer}>
        <View style={styles.skipTextContainer}>
          <View style={styles.spaceUp}></View>
          <View>
            <TouchableOpacity onPress={skipToSign}>
              <Text style={styles.skipText}>Skip</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
      <ImageBackground
        source={require('../Images/OnBoarding/onscreen3.png')}
        style={styles.backgroundImage}></ImageBackground>
      <View style={styles.text1view}>
        <Text style={styles.text1}>Study Overview</Text>
        <Text style={styles.text2}>
          This is the part that is to be done afterwards and its a dummy text
        </Text>
      </View>
      <View style={styles.bottom}>
        <View style={styles.bottom1}>
          <View style={styles.inactiveBottom}></View>

          <View style={styles.inactiveBottom}></View>
          <View style={styles.activeBottom}></View>
          <Text style={styles.gettingStarted}>Get Started</Text>
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

    alignItems: 'flex-start',
  },
  topContainer: {
    backgroundColor: '#EBEEF4',
    height: 100,
    width: 400,
  },
  skipTextContainer: {
    alignItems: Platform.OS === 'ios' ? 'flex-end' : 'center',
    justifyContent: 'space-around',
    flexDirection: 'row',
  },
  spaceUp: {
    height: 100,
    width: 200,
  },
  skipText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: 'black',
  },

  backgroundImage: {
    width: 390,
    height: 450,
  },
  text1view: {
    marginTop: Platform.OS === 'ios' ? 30 : -30,
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
    marginTop: Platform.OS === 'ios' ? 30 : 0,
  },
  bottom1: {
    flexDirection: 'row',
    alignItems: 'center',
    marginLeft: 45,
  },
  activeBottom: {
    height: 6,
    width: 25,
    borderWidth: 1,
    borderColor: '#4C93FF',
    borderRadius: 12,
    backgroundColor: '#4C93FF',
    marginLeft: 5,
  },
  inactiveBottom: {
    height: 6,
    width: 6,
    borderWidth: 1,
    borderColor: '#4C93FF',
    borderRadius: 12,
    backgroundColor: '#4C93FF',
    opacity: 0.4,
    marginLeft: 5,
  },
  gettingStarted: {
    marginLeft: 30,
    fontSize: 20,
    fontWeight: 'bold',
  },
});
export default OnboardingScreen1;
