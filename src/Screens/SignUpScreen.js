/*import React from 'react';
import {Text, View, StyleSheet, Image, ScrollView} from 'react-native';

const SignUp = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>SignUp Page 1</Text>
      <Text style={styles.title}>SignUp Page two</Text>
      <Text style={styles.title}>SignUp Page three</Text>
      <Text style={styles.title}>SignUp Page ten</Text>
      <Text style={styles.title}>SignUp Page 11</Text>
      <Text style={styles.title}>SignUp Page 13</Text>
      <Text style={styles.title}>SignUp Page 12</Text>
      <Text style={styles.title}>SignUp Page</Text>
      <Text style={styles.title}>hii</Text>
      <Text style={styles.title}>Hello, Welcome</Text>
      <Text style={styles.title}>Hello, Welcome 123</Text>
      <Text style={styles.title}>E Learnng App</Text>

    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    height: '100%',
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    //backgroundColor:'#4C93FF',
  },
  title: {
    fontSize: 16,
    color: 'black',
  },
});
export default SignUpScreen;
*/

import React, {useState} from 'react';

import {
  Text,
  View,
  Button,
  Image,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import SignUpForm from '../components/SignUpForm';
import {StackActions} from '@react-navigation/native';
import {RotateInDownLeft} from 'react-native-reanimated';

const SignUpScreen = ({navigation}) => {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState(null);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [isValid, setIsValid] = useState(false);

  const validation = () => {
    if (
      /[0-9]/.test(name) === false &&
      phone &&
      password &&
      //email.includes('@') &&
      password === confirmPassword
    ) {
      setIsValid(true);
      console.log(isValid);
      navigation.dispatch(
        StackActions.replace('Home', {
          name: name,
          //email:email,
          phone: phone,
        }),
      );
    } else {
      setIsValid(false);
      console.log(isValid);
    }
  };

  const renderForm = () => {
    return (
<<<<<<< HEAD
      <View style={styles.container}>
        <View style={styles.secondContainer}>
          <View style={styles.headerContainer}>
            <Image
              source={require('../Images/SignUp/yellowLogo.png')}
              style={styles.image}
            />
            <Text style={styles.header}>Create an</Text>
            <Text style={styles.header}>Account</Text>
          </View>
          <View style={styles.form}>
=======
    <View style={styles.container}>
      <View style={styles.secondContainer}>


        <View style={styles.headerContainer}>
          <Image source={require('../Images/SignUp/yellowLogo.png')} style={styles.image}/>
          <Text style={styles.header}>Create an</Text>
          <Text style={styles.header}>Account</Text>
        </View>

        <View>
>>>>>>> 6efdbb90db578f96d8a949f8a4057b43b86b7e5d
            <SignUpForm
              name={name}
              setName={setName}
              password={password}
              setPassword={setPassword}
              phone={phone}
              setPhone={setPhone}
              //email={email}
              //setEmail={setEmail}
              confirmPassword={confirmPassword}
              setConfirmPassword={setConfirmPassword}
            />
        </View>
<<<<<<< HEAD
        <View>
          <Text>SignUp</Text>
        </View>
        <View style={styles.button}>
          <Button
            onPress={validation}
            title="Login"
            color={'darkolivegreen'}></Button>
          {isValid === true ? (
            <Text style={styles.success}>Login Success. Hello {name}</Text>
          ) : null}
=======

        <View style={styles.signupContainer}>
          <Text style={styles.signup}>SignUp</Text>
          <TouchableOpacity onPress={validation}>
          {name&&phone&&confirmPassword&&(password===confirmPassword)? (
            <Image source={require('../Images/SignUp/btn_able.png')} style={styles.submitBtn}/>
          ) : (
            <Image source={require('../Images/SignUp/btn_disable.png')} style={styles.submitBtn}/>)
          }
          </TouchableOpacity>
        </View>

        <View style={styles.bottomContainer}>
            <Text style={styles.bottomText}>Already have an Account? </Text>
            <TouchableOpacity><Text style={styles.signinText}>Sign In</Text></TouchableOpacity>
>>>>>>> 6efdbb90db578f96d8a949f8a4057b43b86b7e5d
        </View>
          

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
  secondContainer: {
    flex: 1,
  },
  headerContainer: {
    backgroundColor: '#3C7EE3',
    paddingVertical: 30,
  },
  image: {
    width: 43,
    height: 44,
    resizeMode: 'contain',
<<<<<<< HEAD
    marginLeft: 50,
=======
    marginLeft:50,
    marginBottom:19
>>>>>>> 6efdbb90db578f96d8a949f8a4057b43b86b7e5d
  },
  header: {
    fontSize: 40,
    fontWeight: '800',
    color: 'black',
    marginLeft: 50,
  },
  signupContainer:{
      flexDirection:'row',
      justifyContent:'space-between',
      alignItems: 'center',
      marginTop:15,
      marginHorizontal:50,
  },
<<<<<<< HEAD
  button: {
    marginTop: 20,
    marginBottom: 120,
    fontWeight: 'bold',
    marginHorizontal: 80,
=======
  signup:{
    fontSize:25,
    color:'#000000',
    fontWeight:'500',
    lineHeight:28,
    paddingBottom:10
>>>>>>> 6efdbb90db578f96d8a949f8a4057b43b86b7e5d
  },
  submitBtn:{
    width:80, 
    height: 80, 
    resizeMode: 'contain',
  },
  bottomContainer:{
      flexDirection:'row',
      justifyContent:'flex-start',
      alignItems: 'center',
      marginTop:10,
      marginHorizontal:50,
  },
  bottomText:{
    fontSize:16,
    color:'#AFAFAF',
    fontWeight:'500'
  },
  signinText:{
    color:'#4C93FF',
    fontSize:16,
    fontWeight:'500',
  },
});
export default SignUpScreen;
<<<<<<< HEAD
=======


>>>>>>> 6efdbb90db578f96d8a949f8a4057b43b86b7e5d
