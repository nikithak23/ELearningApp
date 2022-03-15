import React, {useEffect, useRef, useState} from 'react';
import axios from 'axios';
import {
  Text,
  View,
  StyleSheet,
  Image,
  KeyboardAvoidingView,
  TouchableOpacity,
  TextInput,
} from 'react-native';

const btnAble = require('../Images/SignUp/btn_able.png');
const btnCancel = require('../Images/Auth/btn_cancel.png');

const ResetPassScreen = ({navigation, route}) => {
  const baseUrl = 'https://elearningapp-api.herokuapp.com';
  const [password, setPassword] = useState('');
  const username = route?.params?.username;
  const otp = route.params.otp
  const onChangeText = val => {
    setPassword(val);
  };

  const reset = async () => {
      try {
        const response = await axios.post(
          `${baseUrl}/learn/reset`,
          {
            username,
            password,
            otp,
          }
        );
        if (response.status === 200) {
          return navigation.replace('SignIn');
        } else {
          console.warn(response.status);
        }
      } catch (err) {
        console.log(err);
      }
    } 

  return (
    <View style={styles.container}>
      <View>
        <View style={styles.rectangle2}>
          <View style={styles.rectangle1}></View>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Image source={btnCancel} style={styles.btnCancel} />
          </TouchableOpacity>
          <Text style={styles.title}>Reset Password</Text>
          <Text style={styles.text}>Please set a new Password.</Text>
        </View>
      </View>
      <KeyboardAvoidingView
        keyboardVerticalOffset={50}
        behavior={'padding'}
        style={styles.containerAvoidingView}>
        <View>
          <TextInput
            onChangeText={onChangeText}
            style={styles.txtinput}
            value={password}
            secureTextEntry={true}
          />
          {password.length > 0 && password.length < 6 ? (
            <Text style={styles.passErr}>
              Password should have more than 5 characters
            </Text>
          ) : null}
        </View>
        <View style={styles.row}>
          <Text style={styles.reset}>Reset</Text>
          <TouchableOpacity onPress={() => reset()}>
            <Image source={btnAble} style={styles.btn} />
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f6f8fa',
  },
  containerAvoidingView: {
    flex: 1,
    alignItems: 'center',
    padding: 65,
  },
  txtinput: {
    fontSize:16,
    borderWidth: 2,
    width: 300,
    height: 45,
    marginTop: 15,
    borderColor: '#eeeeee',
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 40,
    transform: [{rotate: '12deg'}],
    color: '#ffffff',
    fontWeight: 'bold',
    justifyContent: 'center',
    marginLeft: 45,
    marginTop: 15,
  },
  text: {
    fontSize: 16,
    fontWeight: '500',
    width: 290,
    marginTop: 5,
    marginLeft: 40,
    transform: [{rotate: '12deg'}],
    color: '#ffffff',
  },
  passErr: {
    fontSize: 11,
    fontWeight: '400',
    color: 'red',
  },
  rectangle1: {
    backgroundColor: '#3274d8',
    borderRadius: 70,
    height: 180,
    width: 340,
    transform: [{rotate: '20deg'}],
    alignSelf: 'flex-end',
    marginRight: -50,
    marginTop: -5,
  },
  rectangle2: {
    backgroundColor: '#3c7ee3',
    borderRadius: 70,
    height: 310,
    width: 452,
    transform: [{rotate: '-12deg'}],
    marginTop: -70,
    marginLeft: -12,
  },
  row: {
    flexDirection: 'row',
  },
  btn: {
    height: 99,
    width: 110,
    marginTop: 40,
    marginLeft: 130,
  },
  btnCancel: {
    height: 25,
    width: 25,
    transform: [{rotate: '12deg'}],
    marginLeft: 50,
    marginTop: -80,
  },
  reset: {
    color: '#000',
    fontWeight: '700',
    fontSize: 25,
    marginTop: 70,
    marginLeft: 15,
  },
});

export default ResetPassScreen;
