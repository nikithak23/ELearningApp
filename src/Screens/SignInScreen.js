import React, {useState} from 'react';

import {
  Text,
  View,
  Button,
  Image,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import SignInForm from '../components/SignInForm';
import {StackActions} from '@react-navigation/native';
import {RotateInDownLeft} from 'react-native-reanimated';

const SignInScreen = ({navigation}) => {
  const [phone, setPhone] = useState(null);

  const [password, setPassword] = useState('');

  const [isValid, setIsValid] = useState(true);

  const validation = () => {
    if (phone && password) {
      setIsValid(true);
    } else {
      setIsValid(false);
    }
  };

  signUp = () => {
    navigation.navigate('SignUp');
  };

  const renderForm = () => {
    return (
      <View style={styles.container}>
        <View style={styles.secondContainer}>
          <View style={styles.headerContainer}>
            <Image
              source={require('../Images/SignUp/yellowLogo.png')}
              style={styles.image}
            />
            <Text style={styles.header}>Welcome</Text>
            <Text style={styles.header1}> Back</Text>
          </View>
          <View style={styles.form}>
            <SignInForm
              password={password}
              setPassword={setPassword}
              phone={phone}
              setPhone={setPhone}
            />
          </View>
        </View>
        <View style={styles.sign}>
          <View>
            <Text style={styles.signText}>Sign in</Text>
          </View>
          {/* <Text>Abc</Text> */}
          <View>
            {isValid === true ? (
              <TouchableOpacity>
                <Image
                  source={require('../Images/SignUp/btn_able.png')}
                  style={styles.imagesignin}
                />
              </TouchableOpacity>
            ) : (
              <TouchableOpacity>
                <Image
                  source={require('../Images/SignUp/btn_disable.png')}
                  style={styles.imagesignin}
                />
              </TouchableOpacity>
            )}
            {/* <TouchableOpacity>
              <Image
                source={require('../Images/SignUp/btn_disable.png')}
                style={styles.imagesignin}
              />
            </TouchableOpacity> */}
          </View>
        </View>
        <View style={styles.forget}>
          <Text style={styles.forgetPassword}>Forget Password</Text>
        </View>
        <View style={styles.dontHave}>
          <Text style={styles.DontHaveAccount}>Don't have an account?</Text>
          <TouchableOpacity onPress={signUp}>
            <Text style={styles.forgetPassword}> Sign Up</Text>
          </TouchableOpacity>
        </View>

        {/* <View style={styles.button}>
          <Button
            onPress={validation}
            title="Login"
            color={'darkolivegreen'}></Button>
        </View> */}
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
  secondContainer: {
    // flex: 1,
    // height: 312,
  },
  headerContainer: {
    backgroundColor: '#3C7EE3',
    height: 310,
    // paddingVertical: 30,
  },
  image: {
    width: 39,
    height: 29,
    resizeMode: 'contain',
    marginLeft: 51,
    marginTop: 84,
  },
  header: {
    fontSize: 42,
    fontWeight: '600',
    color: 'white',
    marginLeft: 51,
    marginTop: 19,
    // fontWeight: 'bold',
  },
  header1: {
    fontSize: 42,
    fontWeight: '600',
    color: 'white',
    marginLeft: 51,
    // fontWeight: 'bold',
    // marginTop: 19,
  },
  form: {
    // flex: 1,
    // marginTop: 10,
    height: 290,
  },
  button: {
    marginTop: 20,
    marginBottom: 120,
    fontWeight: 'bold',
    marginHorizontal: 80,
  },
  sign: {
    flexDirection: 'row',
    marginTop: 30,
    marginHorizontal: 40,
    // alignItems: 'center',
    justifyContent: 'space-between',
  },
  signText: {
    fontSize: 24,
    fontWeight: 'bold',
    // marginLeft: 50,
  },
  imagesignin: {
    width: 100,
    height: 100,

    // marginLeft: 159,
    marginTop: -20,
  },
  forget: {
    marginTop: 10,
    marginLeft: 50,
  },
  forgetPassword: {
    color: '#4C93FF',
    fontSize: 16,
    fontWeight: 'bold',
    textDecorationLine: 'underline',
  },
  dontHave: {
    marginTop: 50,
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
