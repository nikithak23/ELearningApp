import React from 'react';
import {Text,View,TextInput,StyleSheet,Platform,ScrollView,} from 'react-native';

const SignUpForm = ({
  name,
  setName,
  phone,
  setPhone,
  //email,
  //setEmail,
  password,
  setPassword,
  confirmPassword,
  setConfirmPassword,
}) => {
    
  const nameCheck = () => {
    if (/[0-9]/.test(name) === true) {
      return (
        <Text style={styles.error}>Name must contain only characters</Text>
      );
    }
  };
  const mobileCheck = phone => {
    return setPhone((phone = isNaN(phone) ? '' : phone));
  };
  /*
  const emailCheck = () => {
    if (email.includes('@') === false && email) {
      return <Text style={styles.error}>Enter valid email</Text>;
    }
  };
  */
  const passwordCheck = () => {
    if (password.length >0&&password.length <=5) {
      return <Text style={styles.error}>Password length must be more than 5</Text>;
    }
  };
  const confirmPasswordCheck = () => {
    if (confirmPassword !== password && confirmPassword) {
      return <Text style={styles.error}>Both passwords must be same.</Text>;
    }
  };

  return (
    <ScrollView>
      <View style={styles.container}>
          
          <TextInput
            value={name}
            placeholder="Name"
            onChangeText={input => setName(input)}
            maxLength={20}
            style={styles.inputField}
          />
          {nameCheck()}
       
          
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
            maxLength={10}
            style={styles.inputField}
          />
          {passwordCheck()}
        
        
          <TextInput
            placeholder="Confirm Password"
            value={confirmPassword}
            onChangeText={input => setConfirmPassword(input)}
            secureTextEntry={true}
            maxLength={10}
            style={styles.inputField}
          />
          {confirmPasswordCheck()}
         
      </View>
      </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop:30
  },
  inputField: {
    fontSize:20,
    //fontFamily:'Rubik',
    height:75,
    lineHeight:24,
    marginHorizontal:50,
    borderColor:'#EEEDE7',
    borderBottomWidth:2,
  },

  error: {
    color:'red',
    fontSize:13,
    marginHorizontal:50
  },
});
export default SignUpForm;