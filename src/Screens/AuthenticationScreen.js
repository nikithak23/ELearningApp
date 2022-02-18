import React, { useEffect, useRef, useState } from 'react';
import {Text, View, StyleSheet, Image, ScrollView, KeyboardAvoidingView} from 'react-native';
import { TextInput } from 'react-native-gesture-handler';

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
      <KeyboardAvoidingView
        keyboardVerticalOffset={50}
        behavior={'padding'}
        style={styles.containerAvoidingView}>
        <Text style={styles.title}>
          Enter verification code that we have sent to your email
        </Text>
        <View>
          <TextInput
            ref={input => (textInput = input)}
            onChangeText={onChangeText}
            style={{width: 0, height: 0}}
            value={internalVal}
            maxLength={lengthInput}
            returnKeyType="done"
            keyboardType="numeric"
          />
          <View style={styles.containerInput}>
            {Array(lengthInput)
              .fill()
              .map((data, index) => (
                <View key={index} style={[styles.cellView, {borderBottomColor: index === internalVal.length ? '#fb6c6a': '#234db7'}]}>
                  <Text
                    style={styles.cellText}
                    onPress={() => textInput.focus()}>
                    {internalVal && internalVal.length>0? internalVal[index] : ""}
                  </Text>
                </View>
              ))}
          </View>
        </View>
      </KeyboardAvoidingView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  containerAvoidingView: {
    flex: 1,
    alignItems: 'center',
    padding: 10,
  },
  containerInput: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  cellView: {
    paddingVertical: 11,
    width: 40,
    margin: 5,
    justifyContent: 'center',
    alignItems: 'center',
    borderBottomWidth: 1.5,
  },
  title: {
    fontSize: 16,
    marginTop: 80,
    color: 'black',
  },
  cellText:{
    textAlign: 'center',
    fontSize: 16
  },
});

export default AuthenticationScreen;
