import React from 'react';
import {
  Text,
  View,
  StyleSheet,
  ImageBackground,
  Image,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import useOrientation from '../hooks/useOrientation';

const OnboardingScreen2 = ({navigation}) => {
  const orientation = useOrientation();
  onBoardTo3 = () => {
    navigation.navigate('OnBoard3');
  };

  skipToSign = () => {
    navigation.navigate('SignIn');
  };

  return (
    <ScrollView showsVerticalScrollIndicator={false} style={styles.container}>
      <View
        style={
          orientation.isPortrait ? styles.topContainer : styles.topContainerls
        }>
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
        source={require('../Images/OnBoarding/onscreen2.png')}
        style={
          orientation.isPortrait
            ? styles.backgroundImage
            : styles.backgroundImagels
        }></ImageBackground>
      <View style={styles.text1view}>
        <Text style={styles.text1}>User Friendly</Text>
        <Text style={styles.text2}>
          Enjoy the captivating process of online education in a place and at a
          time of your choice. Commfort and convenience
        </Text>
      </View>
      <View style={styles.bottom}>
        <View style={styles.bottom1}>
          <View style={styles.inactiveBottom}></View>
          <View style={styles.activeBottom}></View>
          <View style={styles.inactiveBottom}></View>
        </View>
        <View style={styles.spaceDown}></View>
        <TouchableOpacity onPress={onBoardTo3}>
          <Image
            source={require('../Images/SignUp/btn_able.png')}
            style={styles.imagesignin}
          />
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    height: '100%',
    width: '100%',
    backgroundColor: 'white',
  },
  topContainer: {
    backgroundColor: '#EBEEF4',
    height: 100,
    width: 400,
  },
  topContainerls: {
    backgroundColor: '#EBEEF4',
    height: 100,
    width: 844,
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
  backgroundImagels: {
    width: 850,
    height: 1000,
  },
  text1view: {
    marginTop: Platform.OS === 'ios' ? 30 : -30,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text1: {
    fontSize: 28,
    fontWeight: '500',
    color: 'black',
  },
  text2: {
    marginHorizontal: 40,
    textAlign: 'center',
    marginTop: 14,
    color: '#676666',
    fontWeight: '500',
  },
  bottom: {
    flexDirection: 'row',
    marginTop: Platform.OS === 'ios' ? 30 : 0,
    justifyContent: 'space-around',
    marginHorizontal: 40,
  },
  bottom1: {
    flexDirection: 'row',
    alignItems: 'center',
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
  spaceDown: {
    width: 160,
  },
  imagesignin: {
    marginLeft: 10,
    width: 100,
    height: 100,
    marginTop: 20,
  },
});
export default OnboardingScreen2;
