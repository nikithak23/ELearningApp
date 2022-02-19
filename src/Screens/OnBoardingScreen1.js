import React from 'react';
import {Text, View, StyleSheet, ImageBackground, Image} from 'react-native';
import {TouchableOpacity} from 'react-native-gesture-handler';

const OnboardingScreen1 = ({navigation}) => {
  onBoardTo2 = () => {
    navigation.navigate('OnBoard2');
  };

  skipToSign = () => {
    navigation.navigate('SignIn');
  };

  return (
    <View style={styles.container}>
      <View style={styles.topContainer}>
        <TouchableOpacity onPress={skipToSign}>
          <Text style={styles.skipText}>Skip</Text>
        </TouchableOpacity>
      </View>

      <ImageBackground
        source={require('../Images/OnBoarding/onscreen1.png')}
        style={styles.backgroundImage}></ImageBackground>

      <View style={styles.text1view}>
        <Text style={styles.text1}>Learn from anywhere</Text>
        <Text style={styles.text2}>
          This is the part that is to be done afterwards and its a dummy text
        </Text>
      </View>
      <View style={styles.bottom}>
        <View style={styles.bottom1}>
          <View style={styles.activeBottom}></View>
          <View style={styles.inactiveBottom}></View>
          <View style={styles.inactiveBottom}></View>
        </View>
        <TouchableOpacity onPress={onBoardTo2}>
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
  skipText: {
    marginTop: Platform.OS === 'ios' ? 64 : 40,
    marginLeft: 330,
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
    marginHorizontal: 61.5,
  },
  text1: {
    fontSize: 28,
    fontWeight: '500',
    color: 'black',
  },
  text2: {
    alignSelf: 'center',
    marginTop: 14,
    color: '#676666',
    fontWeight: '500',
  },

  imagesignin: {
    width: 100,
    height: 100,
    marginLeft: 160,
    marginTop: 20,
  },
  bottom: {
    flexDirection: 'row',
    marginTop: Platform.OS === 'ios' ? 30 : 0,
  },
  bottom1: {
    flexDirection: 'row',
    alignItems: 'center',
    marginLeft: 50,
  },
  activeBottom: {
    height: 6,
    width: 25,
    borderWidth: 1,
    borderColor: '#4C93FF',
    borderRadius: 12,
    backgroundColor: '#4C93FF',
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
});
export default OnboardingScreen1;
