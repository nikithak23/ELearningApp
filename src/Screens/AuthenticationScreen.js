import React, {useEffect, useRef, useState} from 'react';
import axios from 'axios';
import {
  Text,
  View,
  StyleSheet,
  Image,
  ScrollView,
  KeyboardAvoidingView,
  TouchableOpacity,
  TextInput,
  Platform,
} from 'react-native';
import useOrientation from '../hooks/useOrientation';
import { Icons } from '../assets/Icons';
import {Strings} from '../assets/Strings';
import {Colors} from '../assets/Colors';
import { getVerified } from '../Service/Service';

const btnAble = Icons.ButtonAble;
const btnDisable = Icons.ButtonDisable;
const btnCancel = Icons.ButtonCancel;

const AuthenticationScreen = ({navigation, route}) => {
  const orientation = useOrientation();
  const baseUrl = 'https://elearningapp-api.herokuapp.com';
  let textInput = useRef(null);
  const lengthInput = 4;
  const otpCode = route?.params?.otp;
  const username = route?.params?.phone;
  const forgotPass = route?.params?.forgotPassword
    ? route?.params?.forgotPassword
    : false;
  const [otp, setOtp] = useState(otpCode);
  const [internalVal, setInternalVal] = useState('');
  const [wrongOtp, setWrongOtp] = useState(false);

  const onChangeText = val => {
    setInternalVal(val);
    setWrongOtp(false);
  };

  useEffect(() => {
    textInput.focus();
    console.warn('OTP: ', otp);
  }, [otp]);

  const goSignin = async () => {
    if (internalVal === JSON.stringify(otp)) {
      if (forgotPass) {
        return navigation.replace('ResetPassword', {
          username: username,
          otp: otp,
        });
      }
      try {
        const response = await axios.post(
          `${baseUrl}/learn/verify/${username}`,
          {
            otp,
          },
        );
        console.log(response.status);
        console.log(response.data);
        if (response.status === 200) {
          return navigation.replace('SignIn');
        } else {
          console.warn(response.status);
        }
      } catch (err) {
        console.log(err);
      }
    } else {
      setInternalVal('');
      setWrongOtp(true);
    }
  };

  const resend = async () => {
    try {
      const response = await axios.get(`${baseUrl}/learn/resend/${username}`);
      setOtp(response.data.data);
      console.log(response.status);
      console.log(response.data);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <ScrollView style={styles.container}>
      <View>
        <View
          style={
            orientation.isPortrait ? styles.rectangle2 : styles.rectangle2ls
          }>
          <View
            style={
              orientation.isPortrait ? styles.rectangle1 : styles.rectangle1ls
            }></View>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Image
              source={btnCancel}
              style={
                orientation.isPortrait ? styles.btnCancel : styles.btnCancells
              }
            />
          </TouchableOpacity>
          {forgotPass ? (
            <Text
              style={orientation.isPortrait ? styles.title : styles.titlels}>
              {Strings.ResetPassword}
            </Text>
          ) : (
            <Text
              style={orientation.isPortrait ? styles.title : styles.titlels}>
              {Strings.VerifyAccount}
            </Text>
          )}
          <Text style={orientation.isPortrait ? styles.text : styles.textls}>
            {Strings.EnterVCode}
          </Text>
        </View>
      </View>
      <KeyboardAvoidingView
        keyboardVerticalOffset={50}
        behavior={'padding'}
        style={styles.containerAvoidingView}>
        <View>
          <TextInput
            ref={input => (textInput = input)}
            onChangeText={onChangeText}
            style={{width: 0, height: 0}}
            value={internalVal}
            maxLength={lengthInput}
            keyboardType="numeric"
          />
          <View style={styles.containerInput}>
            {Array(lengthInput)
              .fill()
              .map((data, index) => (
                <View
                  key={index}
                  style={[
                    styles.cellView,
                    {
                      borderColor: wrongOtp
                        ? '#f89191'
                        : index === internalVal.length
                        ? '#4C93FF'
                        : '#eeeeee',
                    },
                  ]}>
                  <Text
                    style={styles.cellText}
                    onPress={() => textInput.focus()}>
                    {internalVal && internalVal.length > 0
                      ? internalVal[index]
                      : ''}
                  </Text>
                </View>
              ))}
          </View>
          {wrongOtp ? (
            <View style={styles.row}>
              <View style={styles.rsymbol}>
                <Text style={styles.exclamatory}>!</Text>
              </View>
              <Text style={styles.rtext}>{Strings.InvalidVCode}</Text>
            </View>
          ) : null}
        </View>
        <View style={styles.row}>
          <Text style={styles.qText}>{Strings.NoCode} </Text>
          <TouchableOpacity onPress={() => resend()}>
            <Text style={styles.resend}>{Strings.Resend}</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.row}>
          {forgotPass ? (
            <Text style={styles.verifyText}>{Strings.Next}</Text>
          ) : (
            <Text style={styles.verifyText}>{Strings.Verify}</Text>
          )}
          {internalVal.length < 4 ? (
            <Image source={btnDisable} style={styles.btn} />
          ) : (
            <Image source={btnAble} onPress={goSignin()} style={styles.btn} />
          )}
        </View>
      </KeyboardAvoidingView>
    </ScrollView>
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
  containerInput: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  cellView: {
    paddingVertical: 15,
    height: 66,
    width: 66,
    margin: 10,
    justifyContent: 'space-between',
    alignItems: 'center',
    borderWidth: 2,
    borderRadius: 10,
    backgroundColor: Colors.White,
    zIndex: 100,
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
  titlels: {
    fontSize: 40,
    transform: [{rotate: '8deg'}],
    color: Colors.White,
    fontWeight: 'bold',
    justifyContent: 'center',
    marginLeft: 45,
    marginTop: Platform.OS === 'ios' ? -5 : -40,
  },
  text: {
    fontSize: 16,
    fontWeight: '500',
    width: 290,
    marginTop: 5,
    marginLeft: 40,
    color: Colors.Black,
    transform: [{rotate: '12deg'}],
    color: Colors.White,
  },
  textls: {
    fontSize: 16,
    fontWeight: '500',
    width: 290,
    marginTop: -25,
    marginLeft: 40,
    color: Colors.Black,
    transform: [{rotate: '8deg'}],
    color: Colors.White,
  },
  cellText: {
    textAlign: 'center',
    fontSize: 28,
    alignItems: 'center',
    fontWeight: '500',
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
  rectangle1ls: {
    backgroundColor: Colors.Rect1,
    borderRadius: 70,
    height: 180,
    width: 600,
    transform: [{rotate: '12deg'}],
    alignSelf: 'flex-end',
    marginRight: -50,
    marginTop: 62,
  },
  rectangle2: {
    backgroundColor: Colors.Rect2,
    borderRadius: 70,
    height: Platform.OS === 'ios' ? 310 : 300,
    width: 452,
    transform: [{rotate: '-12deg'}],
    marginTop: Platform.OS === 'ios' ? -70 : -80,
    marginLeft: -12,
  },
  rectangle2ls: {
    backgroundColor: Colors.Rect2,
    borderRadius: 70,
    height: Platform.OS === 'ios' ? 310 : 300,
    width: 900,
    transform: [{rotate: '-8deg'}],
    marginTop: Platform.OS === 'ios' ? -160 : -125,
    marginLeft: -12,
  },
  row: {
    flexDirection: 'row',
  },
  qText: {
    color: Colors.Qgrey,
    fontWeight: '700',
    fontSize: 15,
    marginTop: 20,
    marginLeft: -70,
  },
  exclamatory: {
    color: Colors.White,
    fontSize: 12,
    fontWeight: 'bold',
  },
  rsymbol: {
    marginLeft: 4,
    paddingLeft: 4.5,
    backgroundColor: Colors.RSymbol,
    width: 17,
    height: 17,
    borderWidth: 2,
    borderRadius: 11,
    borderColor: Colors.RSymbol,
  },
  rtext: {
    fontSize: 15,
    color: Colors.RSymbol,
    marginLeft: 7,
    fontWeight: '500',
  },
  resend: {
    color: Colors.ReSend,
    fontWeight: '700',
    fontSize: 15,
    textDecorationLine: 'underline',
    marginTop: 20,
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
  btnCancells: {
    height: 25,
    width: 25,
    transform: [{rotate: '8deg'}],
    marginLeft: 50,
    marginTop: Platform.OS === 'ios' ? -110 : -150,
  },
  verifyText: {
    color: Colors.Black,
    fontWeight: '700',
    fontSize: 25,
    marginTop: 70,
    marginLeft: 15,
  },
});

export default AuthenticationScreen;
