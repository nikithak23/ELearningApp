import React, {useState} from 'react';

import {
  Text,
  View,
  Button,
  Image,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  Platform,
} from 'react-native';
import SignInForm from '../components/SignInForm';
import {StackActions} from '@react-navigation/native';

const SignInScreen = ({navigation}) => {
  const [phone, setPhone] = useState(null);
  const [password, setPassword] = useState('');
  const [isValid, setIsValid] = useState(false);

  const validation = () => {
    if (phone && password) {
      setIsValid(true);
      console.log(isValid);
      navigation.dispatch(
        StackActions.replace('Home', {
          phone: phone,
        }),
      );
    } else {
      setIsValid(false);
      console.log(isValid);
    }
  };

  signUp = () => {
    navigation.navigate('SignUp');
  };

  verify = () => {
    navigation.navigate('Authentication');
  };
  const renderForm = () => {
    return (
      <View style={styles.container}>
        <View style={styles.headerContainer1}>
          <View style={styles.headerContainer2}></View>
          <Image
            source={require('../Images/SignUp/yellowLogo.png')}
            style={styles.image}
          />
          <Text style={styles.header1}>Welcome</Text>
          <Text style={styles.header2}>Back</Text>
        </View>
        <View style={styles.form}>
          <SignInForm
            password={password}
            setPassword={setPassword}
            phone={phone}
            setPhone={setPhone}
          />
        </View>

        <View style={styles.sign}>
          <Text style={styles.signText}>Sign in</Text>

          <TouchableOpacity onPress={validation}>
            {phone && password ? (
              <Image
                source={require('../Images/SignUp/btn_able.png')}
                style={styles.imagesignin}
              />
            ) : (
              <Image
                source={require('../Images/SignUp/btn_disable.png')}
                style={styles.imagesignin}
              />
            )}
          </TouchableOpacity>
        </View>
        <View style={styles.forget}>
          <TouchableOpacity onPress={verify}>
            <Text style={styles.forgetPassword}>Forgot Password</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.dontHave}>
          <Text style={styles.DontHaveAccount}>Don't have an account?</Text>
          <TouchableOpacity onPress={signUp}>
            <Text style={styles.forgetPassword}> Sign Up</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  };

  return <View>{renderForm()}</View>;
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: '100%',
    backgroundColor: 'white',
  },

  headerContainer1: {
    backgroundColor: '#3c7ee3',
    borderRadius: 70,
    height: Platform.OS === 'ios' ? 310 : 300,
    width: 452,
    transform: [{rotate: '-12deg'}],
    marginTop: Platform.OS === 'ios' ? -70 : -80,
    marginLeft: -12,
  },
  headerContainer2: {
    backgroundColor: '#3274d8',
    borderRadius: 70,
    height: 180,
    width: 340,
    transform: [{rotate: '20deg'}],
    alignSelf: 'flex-end',
    marginRight: -50,
    marginTop: -2,
  },
  image: {
    width: 44,
    height: 44,
    resizeMode: 'contain',
    marginLeft: 70,
    marginTop: -70,
    marginBottom: 40,
    transform: [{rotate: '12deg'}],
  },

  header1: {
    fontSize: 40,
    fontWeight: '700',
    color: 'white',
    marginLeft: 50,
    transform: [{rotate: '12deg'}],
  },
  header2: {
    fontSize: 40,
    fontWeight: '700',
    color: 'white',
    marginLeft: 40,
    transform: [{rotate: '12deg'}],
  },

  form: {
    marginTop: Platform.OS === 'ios' ? 0 : -30,
    height: Platform.OS === 'ios' ? 290 : 260,
  },
  button: {
    marginTop: 20,
    marginBottom: 120,
    fontWeight: 'bold',
    marginHorizontal: 80,
  },
  sign: {
    flexDirection: 'row',
    marginTop: 50,
    marginHorizontal: 50,

    justifyContent: 'space-between',
  },
  signText: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  imagesignin: {
    width: 100,
    height: 100,
    marginTop: -20,
  },
  forget: {
    marginTop: 20,
    marginLeft: 50,
  },
  forgetPassword: {
    color: '#4C93FF',
    fontSize: 16,
    fontWeight: 'bold',
    textDecorationLine: 'underline',
  },
  dontHave: {
    marginTop: 70,
    marginLeft: 50,
    flexDirection: 'row',
  },
  DontHaveAccount: {
    color: '#AFAFAF',
    fontWeight: 'bold',
    fontSize: 16,
  },
  success: {
    marginTop: 0,
    textAlign: 'center',
    color: 'black',
  },
});
export default SignInScreen;
