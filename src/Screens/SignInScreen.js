import React, {useState} from 'react';

import {
  Text,
  View,
  Button,
  Image,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import SignInForm from '../components/SignInForm';

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
  home = () => {
    navigation.navigate('Home');
  };

  const renderForm = () => {
    return (
      <ScrollView style={styles.container}>
        <View style={styles.secondContainer}>
          <View style={styles.headerContainer}>
            <Image
              source={require('../Images/SignUp/yellowLogo.png')}
              style={styles.image}
            />
            <Text style={styles.header}>Welcome</Text>
            <Text style={styles.header1}>Back</Text>
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
            {/* {isValid === true ? ( */}
            {phone && password ? (
              <TouchableOpacity onpress={home}>
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
      </ScrollView>
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
  secondContainer: {},
  headerContainer: {
    backgroundColor: '#3C7EE3',
    height: 310,
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
  },
  header1: {
    fontSize: 42,
    fontWeight: '600',
    color: 'white',
    marginLeft: 51,
  },
  form: {
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
