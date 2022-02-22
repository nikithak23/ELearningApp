import React, {useState} from 'react';
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

const SignInScreen = ({navigation}) => {
  // const [phone, setPhone] = useState(null);
  const [username, setPhone] = useState(null);
  const [password, setPassword] = useState('');
  const [isValid, setIsValid] = useState(false);

  const [isLoading, setIsLoading] = useState(false);

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
      console.log('hi');
      const response = await axios.post(
        `https://elearningapp-api.herokuapp.com/learn/authenticate`,
        {
          username,
          password,
        },
        console.log('hello'),
      );
      console.log('working');
      console.log(response.status);
      if (response.status === 200) {
        let msg = response.data.resultInfo.message;
        console.log(msg);
        console.log(response);
        setIsLoading(false);
        await navigation.dispatch(
          StackActions.push('Home', {
            //instead of 'push', if 'replace' is given, on clicking back button in the phone the app closes
            phone: username,
            msg: msg,
          }),
        );
      } else {
        //console.log(response.status);

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

  const signUp = () => {
    navigation.navigate('SignUp');
  };

  const verify = async () => {
    //Inorder to use 'await' define the ASYNC keyword at function declaration time
    // if (username && password) {
    setIsValid(true);
    setIsLoading(true);

    try {
      console.log('hi');
      console.log(username);
      const response = await axios.put(
        `https://elearningapp-api.herokuapp.com/learn/forgot`,
        {
          username,
        },
        console.log('hello'),
      );
      console.log('working');
      console.log(response.status);
      if (response.status === 200) {
        let msg = response.data.data;
        console.log(msg);

        setIsLoading(false);
        await navigation.dispatch(
          StackActions.push('Authentication', {
            msg: msg,
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
            phone={username}
            setPhone={setPhone}
          />
        </View>

        <View style={styles.sign}>
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
