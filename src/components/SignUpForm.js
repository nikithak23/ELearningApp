import React from 'react';
import {Text,View,TextInput,StyleSheet,Platform,ScrollView,} from 'react-native';
import useOrientation from '../hooks/useOrientation';
import {Colors} from '../assets/Colors/index';
import {Strings} from '../assets/Strings/index';



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
  const orientation = useOrientation();
    
  const nameCheck = () => {
    if (/[0-9]/.test(name) === true) {
      return (
        <Text style={orientation.isPortrait?styles.error:styles.errorLs}>Name must contain only characters</Text>
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
      return <Text style={orientation.isPortrait?styles.error:styles.errorLs}>Password length must be more than 5</Text>;
    }
  };
  const confirmPasswordCheck = () => {
    if (confirmPassword !== password && confirmPassword) {
      return <Text style={orientation.isPortrait?styles.error:styles.errorLs}>Both passwords must be same.</Text>;
    }
  };

  return (
    <ScrollView>
      <View style={orientation.isPortrait?styles.container:styles.containerLandscape}>
          
          <TextInput
            value={name}
            placeholder="Name"
            onChangeText={input => setName(input)}
            maxLength={20}
            style={orientation.isPortrait?styles.inputField:styles.inputFieldLs}
          />
          {nameCheck()}
       
          
          <TextInput
            value={phone}
            placeholder="Mobile"
            onChangeText={input => mobileCheck(input)}
            maxLength={10}
            style={orientation.isPortrait?styles.inputField:styles.inputFieldLs}
          />
        
    
          <TextInput
            placeholder="Password"
            value={password}
            onChangeText={input => setPassword(input)}
            secureTextEntry={true}
            maxLength={10}
            style={orientation.isPortrait?styles.inputField:styles.inputFieldLs}
          />
          {passwordCheck()}
        
        
          <TextInput
            placeholder="Confirm Password"
            value={confirmPassword}
            onChangeText={input => setConfirmPassword(input)}
            secureTextEntry={true}
            maxLength={10}
            style={orientation.isPortrait?styles.inputField:styles.inputFieldLs}
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
  containerLandscape: {
    flex: 1,
    marginTop:50
  },
  inputField: {
    fontSize:20,
    height:75,
    lineHeight:24,
    marginHorizontal:50,
    borderColor:Colors.TextInputForm,
    borderBottomWidth:2,
  },
  inputFieldLs: {
    fontSize:20,
    height:75,
    lineHeight:24,
    marginHorizontal:120,
    borderColor:Colors.TextInputForm,
    borderBottomWidth:2,
  },
  error: {
    color:Colors.Error,
    fontSize:13,
    marginHorizontal:50
  },
  errorLs: {
    color:Colors.Error,
    fontSize:13,
    marginHorizontal:120
  },
});
export default SignUpForm;