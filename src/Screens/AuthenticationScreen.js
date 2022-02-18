import React, { useEffect, useRef, useState } from 'react';
import {Text, View, StyleSheet, Image, ScrollView, KeyboardAvoidingView} from 'react-native';
import { TextInput } from 'react-native-gesture-handler';

const btnAble= require('../Images/SignUp/btn_able.png');
const btnDisable = require('../Images/SignUp/btn_disable.png');

const AuthenticationScreen = () => {
  let textInput = useRef(null)
  const lengthInput = 4;
  const [internalVal, setInternalVal]= useState('')

  const onChangeText = (val)=> {
    setInternalVal(val)
  }
  useEffect(()=>{
    textInput.focus()
  },[])
  return (
    <View style={styles.container}>
      <View>
        <View style={styles.rectangle2}>
          <View style={styles.rectangle1}></View>
          <Text style={styles.title}>Verify Account</Text>
          <Text style={styles.text}>
            Enter verification code that we have sent to your email.
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
            //returnKeyType="done"
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
                      borderColor:
                        index === internalVal.length ? '#4C93FF' : '#eeeeee',
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
        </View>
        <View style={styles.row}>
          <Text style={styles.qText}>Didn't receive a code? </Text>
          <Text style={styles.resend}> Resend</Text>
        </View>
        <View style={styles.row}>
          <Text style={styles.verifyText}>Verify</Text>
          <Image source={btnDisable} style={styles.btn} />
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
    backgroundColor: '#ffffff',
    zIndex: 100,
  },
  title: {
    fontSize: 40,
    transform: [{rotate: '12deg'}],
    color: '#ffffff',
    fontWeight: 'bold',
    justifyContent: 'center',
    marginLeft: 45,
  },
  text: {
    fontSize: 16,
    width: 290,
    marginTop: 5,
    marginLeft: 40,
    color: 'black',
    transform: [{rotate: '12deg'}],
    color: '#ffffff',
  },
  cellText: {
    textAlign: 'center',
    fontSize: 28,
    alignItems: 'center',
    fontWeight: '500',
  },
  rectangle1: {
    backgroundColor: '#3274d8',
    borderRadius: 70,
    height: 180,
    width: 340,
    transform: [{rotate: '20deg'}],
    alignSelf: 'flex-end',
    marginRight: -50,
    marginTop: -5
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
  qText: {
    color: '#afafaf',
    fontWeight: '700',
    fontSize: 15,
    marginTop: 20,
    marginLeft: -70,
  },
  resend: {
    color: '#4C93FF',
    fontWeight: '700',
    fontSize: 15,
    textDecorationLine: 'underline',
    marginTop: 20,
  },
  btn: {
    height: 99,
    width: 110,
    marginTop: 40,
    marginLeft:130
  },
  verifyText: {
    color: '#000',
    fontWeight: '700',
    fontSize: 25,
    marginTop: 70,
    marginLeft: 15,
  },
});

export default AuthenticationScreen;
