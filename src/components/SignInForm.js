import React from 'react';
import {
  Text,
  View,
  TextInput,
  StyleSheet,
  Platform,
  ScrollView,
} from 'react-native';

const SignInForm = ({
  phone,
  setPhone,

  password,
  setPassword,
}) => {
  const mobileCheck = phone => {
    return setPhone((phone = isNaN(phone) ? '' : phone));
  };

  return (
    <View>
      <View style={styles.container}>
        <TextInput
          value={phone}
          placeholder="Mobile"
          onChangeText={input => mobileCheck(input)}
          maxLength={10}
          style={styles.inputField}
        />

        <TextInput
          placeholder="Password"
          value={password}
          onChangeText={input => setPassword(input)}
          secureTextEntry={true}
          maxLength={5}
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
    // marginBottom: -20,

    borderColor: '#EEEDE7',

    borderBottomWidth: 2,
  },

  error: {
    color: 'red',
    fontSize: 13,
    marginHorizontal: 20,
  },
});
export default SignInForm;
