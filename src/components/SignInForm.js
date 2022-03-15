import React from 'react';
import {View, TextInput, StyleSheet} from 'react-native';
import {Colors} from '../assets/Colors/index';

const SignInForm = ({phone, setPhone, password, setPassword}) => {
  return (
    <View>
      <View style={styles.container}>
        <TextInput
          value={phone}
          placeholder="Mobile"
          onChangeText={input => setPhone(input)}
          maxLength={10}
          style={styles.inputField}
        />

        <TextInput
          placeholder="Password"
          value={password}
          onChangeText={input => setPassword(input)}
          secureTextEntry={true}
          maxLength={10}
          style={styles.inputField}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 50,
  },

  inputField: {
    fontSize: 20,
    height: 75,
    lineHeight: 24,
    marginHorizontal: 50,
    marginTop: 20,
    borderColor: Colors.TextInputForm,
    borderBottomWidth: 2,
  },

  error: {
    color: Colors.Error,
    fontSize: 13,
    marginHorizontal: 20,
  },
});
export default SignInForm;
