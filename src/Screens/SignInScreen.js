import React, {useContext, useState} from 'react';
import axios from 'axios';
import {
  Text,
  View,
  Button,
  Image,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  Platform,
  TextInput,
} from 'react-native';
import SignInForm from '../components/SignInForm';
import {StackActions} from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import useOrientation from '../hooks/useOrientation';

const SignInScreen = ({navigation}) => {
  const orientation = useOrientation();
  // const [phone, setPhone] = useState(null);
  const [username, setPhone] = useState(null);
  const [password, setPassword] = useState('');
  const [isValid, setIsValid] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  //const context = useContext(AuthContext);

  // const onChangePhone = phone => {
  //   setPhone(phone);
  // };
  // const onChangePassword = password => {
  //   setPassword(password);
  // };

  // const onSubmitFormHandler = async event => {
  //   setIsLoading(true);
  //   try {
  //     const response = await axios.post(
  //       'https://elearningapp-api.herokuapp.com/learn/authenticate',
  //       {
  //         username,
  //         password,
  //       },
  //     );
  //     if (response.status === 200) {
  //       console.log(response.status);
  //       alert(` Login Success ${JSON.stringify(response.resultInfo)}`);
  //       setIsLoading(false);
  //       setPhone('');
  //       setPassword('');
  //     } else {
  //       throw new Error('An error has occurred here');
  //     }
  //   } catch (error) {
  //     alert('An error has occurred');
  //     setIsLoading(false);
  //   }
  // };

  // const validation = () => {
  //   if (username && password) {
  //     onSubmitFormHandler();
  //     setIsValid(true);
  //     // console.log(isValid);
  //     // navigation.dispatch(
  //     //   StackActions.replace('Home', {
  //     //     username: username,
  //     //   }),
  //     // );
  //   } else {
  //     setIsValid(false);
  //     // console.log(isValid);
  //   }
  // };
  const validation = async () => {
    //Inorder to use 'await' define the ASYNC keyword at function declaration time
    // if (username && password) {
    setIsValid(true);
    setIsLoading(true);

    try {
      const response = await axios.post(
        `https://elearningapp-api.herokuapp.com/learn/authenticate`,
        {
          username,
          password,
        },
      );
      console.log(response.status);
      //console.log(response.data.data);
      const token = response.data.data;
      //context.onLogin()
      //console.log(context)
      try {
        await AsyncStorage.setItem('loggedIn', '1');
        await AsyncStorage.setItem('token', token);
        console.log('stored');
      } catch (e) {
        console.log(e);
      }

      if (response.status === 200) {
        let msg = response.data.resultInfo.message;
        console.log(msg);
        setIsLoading(false);

        await navigation.dispatch(
          StackActions.push('TabPage', {
            //instead of 'push', if 'replace' is given, on clicking back button in the phone the app closes
            phone: username,
            msg: msg,
            token: token,
          }),
        );
      } else {
        //console.log(response.status);
        throw new Error('An error has occurred');
      }
    } catch (error) {
      console.log(error);
      alert('Password Incorrect');
      setIsLoading(false);
    }
    // }
    // else {
    //   setIsValid(false);
    //   alert('Invalid Sign Up credentials');
    // }
  };

  const signUp = () => {
    navigation.navigate('SignUp');
  };

  const verify = async () => {
    //Inorder to use 'await' define the ASYNC keyword at function declaration time
    // if (username && password) {
    setIsValid(true);
    setIsLoading(true);

    try {
      console.log(username);
      const response = await axios.put(
        `https://elearningapp-api.herokuapp.com/learn/forgot`,
        {
          username,
        },
      );
      console.log(response.status);
      if (response.status === 200) {
        let msg = response.data.data;
        console.log(msg);

        setIsLoading(false);
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
      setIsLoading(false);
    }
    // }
    // else {
    //   setIsValid(false);
    //   alert('Invalid Sign Up credentials');
    // }
  };

  // const verify = () => {
  //   navigation.navigate('Authentication');
  // };

  const renderForm = () => {
    return (
      <ScrollView showsVerticalScrollIndicator={false} style={styles.container}>
        <View
          style={
            orientation.isPortrait
              ? styles.headerContainer1
              : styles.headerContainer1ls
          }>
          {/* style={styles.headerContainer1}> */}
          <View
            style={
              orientation.isPortrait
                ? styles.headerContainer2
                : styles.headerContainer2ls
            }>
            {/* style={styles.headerContainer2}> */}
          </View>
          <Image
            source={require('../Images/SignUp/yellowLogo.png')}
            style={orientation.isPortrait ? styles.image : styles.imagels}
          />
          {orientation.isPortrait ? (
            <View>
              <Text style={styles.header1}>Welcome</Text>
              <Text style={styles.header2}>Back</Text>
            </View>
          ) : (
            <Text style={styles.header1ls}> Welcome Back</Text>
          )}
        </View>

        <View style={orientation.isPortrait ? styles.form : styles.formls}>
          {/* style={styles.form}> */}
          <SignInForm
            password={password}
            setPassword={setPassword}
            phone={username}
            setPhone={setPhone}
          />
        </View>

        <View
          // style={styles.sign}
          style={orientation.isPortrait ? styles.sign : styles.signls}>
          <Text style={styles.signText}>Sign in</Text>

          <TouchableOpacity onPress={validation}>
            {username && password ? (
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
        <View style={orientation.isPortrait ? styles.forget : styles.forgetls}>
          {/* style={styles.forget}> */}
          <TouchableOpacity onPress={verify}>
            <Text style={styles.forgetPassword}>Forgot Password</Text>
          </TouchableOpacity>
        </View>
        <View
          style={orientation.isPortrait ? styles.dontHave : styles.dontHavels}>
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

  headerContainer1: {
    backgroundColor: '#3c7ee3',
    borderRadius: 70,
    height: Platform.OS === 'ios' ? 310 : 300,
    width: 452,
    transform: [{rotate: '-12deg'}],
    marginTop: Platform.OS === 'ios' ? -70 : -80,
    marginLeft: -12,
  },
  headerContainer1ls: {
    backgroundColor: '#3c7ee3',
    borderRadius: 70,
    height: Platform.OS === 'ios' ? 310 : 300,
    width: 900,
    transform: [{rotate: '-8deg'}],
    marginTop: Platform.OS === 'ios' ? -160 : -150,
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
  headerContainer2ls: {
    backgroundColor: '#3274d8',
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
    color: 'white',
    marginLeft: 50,
    transform: [{rotate: '12deg'}],
  },
  header1ls: {
    fontSize: 40,
    fontWeight: '700',
    color: 'white',
    marginLeft: 50,
    marginTop: -20,
    transform: [{rotate: '8deg'}],
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
  dontHavels: {
    marginTop: 30,
    marginLeft: 120,
    flexDirection: 'row',
    marginBottom: 20,
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
