import React, {useState} from 'react';
import axios from 'axios';
import {
  Text,
  View,
  Image,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  Platform,
} from 'react-native';
import {Colors} from '../assets/Colors/index';
import {Strings} from '../assets/Strings/index';
import {Icons} from '../assets/Icons';
import SignInForm from '../components/SignInForm';
import {StackActions} from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import useOrientation from '../hooks/useOrientation';
import { getSignInData } from '../Service/Service';
const SignInScreen = ({navigation}) => {
  const orientation = useOrientation();
  const [username, setPhone] = useState(null);
  const [password, setPassword] = useState('');
  const [isValid, setIsValid] = useState(false);

  // Api to authenticate the user
  const validation = async () => {
    setIsValid(true);
    try {
      // const response = await axios.post(
      //   `https://elearningapp-api.herokuapp.com/learn/authenticate`,
      //   {
      //     username,
      //     password,
      //   },
      // );
      const response = await getSignInData(username,password)
      const token = response.data.data;
      try {
        await AsyncStorage.setItem('loggedIn', '1');
        await AsyncStorage.setItem('token', token);
      } catch (e) {
        console.log(e);
      }

      if (response.status === 200) {
        let msg = response.data.resultInfo.message;
        await navigation.dispatch(
          StackActions.push('TabPage', {
            phone: username,
            msg: msg,
            token: token,
          }),
        );
      } else {
        throw new Error('An error has occurred');
      }
    } catch (error) {
      console.log(error);
      alert('Password Incorrect');
    }
  };

  //go to signUp page
  const signUp = () => {
    navigation.navigate('SignUp');
  };

  // Api to get forget password
  const verify = async () => {
    setIsValid(true);
    try {
      console.log(username);
      const response = await axios.put(
        `https://elearningapp-api.herokuapp.com/learn/forgot`,
        {
          username,
        },
      );
      if (response.status === 200) {
        let msg = response.data.data;
        await navigation.dispatch(
          StackActions.push('Authentication', {
            otp: msg,
            phone: username,
            forgotPassword: true,
          }),
        );
      } else {
        throw new Error('An error has occurred');
      }
    } catch (error) {
      console.log(error);
      alert('An error has occurred');
    }
  };

  const renderForm = () => {
    return (
      <ScrollView showsVerticalScrollIndicator={false} style={styles.container}>
        <View
          style={
            orientation.isPortrait
              ? styles.headerContainer1
              : styles.headerContainer1ls
          }>
          <View
            style={
              orientation.isPortrait
                ? styles.headerContainer2
                : styles.headerContainer2ls
            }></View>
          <Image
            source={Icons.YellowLogo}
            style={orientation.isPortrait ? styles.image : styles.imagels}
          />
          {orientation.isPortrait ? (
            <View>
              <Text style={styles.header1}>{Strings.Welcome}</Text>
              <Text style={styles.header2}>{Strings.Back}</Text>
            </View>
          ) : (
            <Text style={styles.header1ls}>
              {Strings.Welcome} {Strings.Back}
            </Text>
          )}
        </View>
        <View style={orientation.isPortrait ? styles.form : styles.formls}>
          <SignInForm
            password={password}
            setPassword={setPassword}
            phone={username}
            setPhone={setPhone}
          />
        </View>

        <View style={orientation.isPortrait ? styles.sign : styles.signls}>
          <Text style={styles.signText}>{Strings.SignIn}</Text>

          <TouchableOpacity onPress={validation}>
            {username && password ? (
              <Image source={Icons.ButtonAble} style={styles.imagesignin} />
            ) : (
              <Image source={Icons.ButtonDisable} style={styles.imagesignin} />
            )}
          </TouchableOpacity>
        </View>
        <View style={orientation.isPortrait ? styles.forget : styles.forgetls}>
          <TouchableOpacity onPress={verify}>
            <Text style={styles.forgetPassword}>{Strings.ForgotPassword}</Text>
          </TouchableOpacity>
        </View>
        <View
          style={orientation.isPortrait ? styles.dontHave : styles.dontHavels}>
          <Text style={styles.DontHaveAccount}>{Strings.NoAccount}</Text>
          <TouchableOpacity onPress={signUp}>
            <Text style={styles.forgetPassword}>{Strings.SignUp}</Text>
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
    backgroundColor: Colors.White,
  },
  headerContainer1: {
    backgroundColor: Colors.Rect2,
    borderRadius: 70,
    height: Platform.OS === 'ios' ? 310 : 300,
    width: 452,
    transform: [{rotate: '-12deg'}],
    marginTop: Platform.OS === 'ios' ? -70 : -80,
    marginLeft: -12,
  },
  headerContainer1ls: {
    backgroundColor: Colors.Rect2,
    borderRadius: 70,
    height: Platform.OS === 'ios' ? 310 : 300,
    width: 900,
    transform: [{rotate: '-8deg'}],
    marginTop: Platform.OS === 'ios' ? -160 : -150,
    marginLeft: -12,
  },
  headerContainer2: {
    backgroundColor: Colors.Rect1,
    borderRadius: 70,
    height: 180,
    width: 340,
    transform: [{rotate: '20deg'}],
    alignSelf: 'flex-end',
    marginRight: -50,
    marginTop: -2,
  },
  headerContainer2ls: {
    backgroundColor: Colors.Rect1,
    borderRadius: 70,
    height: 180,
    width: 600,
    transform: [{rotate: '12deg'}],
    alignSelf: 'flex-end',
    marginRight: -50,
    marginTop: 62,
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
  imagels: {
    width: 44,
    height: 44,
    resizeMode: 'contain',
    marginLeft: 70,
    marginTop: -90,
    marginBottom: 90,
    transform: [{rotate: '8deg'}],
  },
  header1: {
    fontSize: 40,
    fontWeight: '700',
    color: Colors.White,
    marginLeft: 50,
    transform: [{rotate: '12deg'}],
  },
  header1ls: {
    fontSize: 40,
    fontWeight: '700',
    color: Colors.White,
    marginLeft: 50,
    marginTop: -20,
    transform: [{rotate: '8deg'}],
  },
  header2: {
    fontSize: 40,
    fontWeight: '700',
    color: Colors.White,
    marginLeft: 40,
    transform: [{rotate: '12deg'}],
  },
  form: {
    marginTop: Platform.OS === 'ios' ? 0 : -30,
    height: Platform.OS === 'ios' ? 290 : 260,
  },
  formls: {
    marginTop: Platform.OS === 'ios' ? 0 : -30,
    height: Platform.OS === 'ios' ? 290 : 260,
    marginHorizontal: 60,
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
  signls: {
    flexDirection: 'row',
    marginTop: 20,
    marginHorizontal: 120,
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
  forgetls: {
    marginTop: 0,
    marginLeft: 120,
  },
  forgetPassword: {
    color: Colors.ReSend,
    fontSize: 16,
    fontWeight: 'bold',
    textDecorationLine: 'underline',
  },
  dontHave: {
    marginTop: 70,
    marginLeft: 50,
    flexDirection: 'row',
  },
  dontHavels: {
    marginTop: 30,
    marginLeft: 120,
    flexDirection: 'row',
    marginBottom: 20,
  },
  DontHaveAccount: {
    color: Colors.Qgrey,
    fontWeight: 'bold',
    fontSize: 16,
  },
  success: {
    marginTop: 0,
    textAlign: 'center',
    color: Colors.Black,
  },
});
export default SignInScreen;
