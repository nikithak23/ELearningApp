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
import {Icons} from '../assets/Icons';
import {Strings} from '../assets/Strings';
import {Colors} from '../assets/Colors';
import {getResetPassApi} from '../Service/Service';

const ResetPassScreen = ({navigation, route}) => {
  const btnAble = Icons.ButtonAble;
  const btnCancel = Icons.ButtonCancel;
  const [password, setPassword] = useState('');
  const username = route?.params?.username;
  const otp = route.params.otp;
  const onChangeText = val => {
    setPassword(val);
  };

  const reset = async () => {
    try {
      // const response = await axios.post(
      //   `${baseUrl}/learn/reset`,
      //   {
      //     username,
      //     password,
      //     otp,
      //   }
      // );
      const response = await getResetPassApi(username, password, otp);
      if (response.status === 200) {
        return navigation.replace('SignIn');
      } else {
        console.warn(response.status);
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <View style={styles.container}>
      <View>
        <View style={styles.rectangle2}>
          <View style={styles.rectangle1}></View>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Image source={btnCancel} style={styles.btnCancel} />
          </TouchableOpacity>
          <Text style={styles.title}>{Strings.ResetPassword}</Text>
          <Text style={styles.text}>{Strings.SetPassword}</Text>
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
            <Text style={styles.passErr}>{Strings.PasswordCondition}</Text>
          ) : null}
        </View>
        <View style={styles.row}>
          <Text style={styles.reset}>{Strings.Reset}</Text>
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
    backgroundColor: Colors.BgGrey,
  },
  containerAvoidingView: {
    flex: 1,
    alignItems: 'center',
    padding: 65,
  },
  txtinput: {
    fontSize: 16,
    borderWidth: 2,
    width: 300,
    height: 45,
    marginTop: 15,
    borderColor: Colors.TextInp,
    backgroundColor: Colors.White,
  },
  title: {
    fontSize: 40,
    transform: [{rotate: '12deg'}],
    color: Colors.White,
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
    color: Colors.White,
  },
  passErr: {
    fontSize: 11,
    fontWeight: '400',
    color: Colors.Error,
  },
  rectangle1: {
    backgroundColor: Colors.Rect1,
    borderRadius: 70,
    height: 180,
    width: 340,
    transform: [{rotate: '20deg'}],
    alignSelf: 'flex-end',
    marginRight: -50,
    marginTop: -5,
  },
  rectangle2: {
    backgroundColor: Colors.Rect2,
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
    color: Colors.Black,
    fontWeight: '700',
    fontSize: 25,
    marginTop: 70,
    marginLeft: 15,
  },
});

export default ResetPassScreen;
