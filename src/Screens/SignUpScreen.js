import React, {useState} from 'react';
import axios from "axios";
import {Text,View,Button,Image,StyleSheet,TouchableOpacity,ScrollView} from 'react-native';
import SignUpForm from '../components/SignUpForm';
import {StackActions} from '@react-navigation/native';
import useOrientation from '../hooks/useOrientation';


const SignUpScreen = ({navigation}) => {
  const orientation = useOrientation();
  const [name, setName] = useState('');
  const [username, setPhone] = useState(null);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [isValid, setIsValid] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const baseURL = "https://elearningapp-api.herokuapp.com/learn/create";


 const signIn = () => {
    navigation.navigate('SignIn');
  };
 

  

  const validation = async () => {   //Inorder to use 'await' define the ASYNC keyword at function declaration time
    if (/[0-9]/.test(name) === false &&username &&password && password === confirmPassword) {
      setIsValid(true);
      setIsLoading(true);


      try {
        const response = await axios.post(`https://elearningapp-api.herokuapp.com/learn/create`, {
          name,
          username,
          password
        });
     
        console.log(response.status)
        if (response.status === 200) {
          let otp=response.data.data;
          console.log(response.data);
          console.log(response.data.resultInfo.message);
          console.log(otp);
          setIsLoading(false);
           await navigation.dispatch(
            StackActions.push('Authentication', {  
              name: name,
              phone: username,
              otp:otp,
              forgotPassword: false
            }),
          );

        } else {
          console.log(response.status);
          throw new Error("An error has occurred");
          alert("An error has occured");
        }
      } catch (error) {
        alert("Username already exists");
        setIsLoading(false);
      }
      
    } else {
      setIsValid(false);
      alert("Invalid Sign Up credentials")
    }

  };

  const renderForm = () => {
    return (
      <ScrollView style={styles.container}>
          <View style={orientation.isPortrait?styles.headerContainer1:styles.headerContainer1Landscape}>
          <View style={orientation.isPortrait?styles.headerContainer2:styles.headerContainer2Landscape}></View>
            <Image
              source={require('../Images/SignUp/yellowLogo.png')}
              style={orientation.isPortrait?styles.image:styles.imageLandscape}
            />
            <Text style={orientation.isPortrait?styles.header1:styles.header1Landscape}>Create an</Text>
            <Text style={orientation.isPortrait?styles.header2:styles.header2Landscape}>Account</Text>
          </View>

          <View>
            <SignUpForm
              name={name}
              setName={setName}
              password={password}
              setPassword={setPassword}
              phone={username}
              setPhone={setPhone}
              //email={email}
              //setEmail={setEmail}
              confirmPassword={confirmPassword}
              setConfirmPassword={setConfirmPassword}
            />
          </View>

          <View style={styles.signupContainer}>
            <Text style={styles.signup}>SignUp</Text>
            <TouchableOpacity onPress={validation}>
              {name &&
              username &&
              confirmPassword &&
              password === confirmPassword ? (
                <Image
                  source={require('../Images/SignUp/btn_able.png')}
                  style={styles.submitBtn}
                />
              ) : (
                <Image
                  source={require('../Images/SignUp/btn_disable.png')}
                  style={styles.submitBtn}
                />
              )}
            </TouchableOpacity>
          </View>

          <View style={orientation.isPortrait?styles.bottomContainer:styles.bottomContainerLandscape}>
            <Text style={styles.bottomText}>Already have an Account? </Text>
            <TouchableOpacity onPress={signIn}>
              <Text style={styles.signinText}>Sign In</Text>
            </TouchableOpacity>
          </View>
      </ScrollView>
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
  headerContainer1: {
    backgroundColor: '#3c7ee3',
    borderRadius: 70,
    height: 310,
    width: 452,
    transform: [{rotate: '-12deg'}],
    marginTop: -80,
    marginLeft: -12,
  },
  headerContainer2: {
    backgroundColor: '#3274d8',
    borderRadius: 70,
    height: 180,
    width: 340,
    transform: [{rotate: '20deg'}],
    alignSelf: 'flex-end',
    marginRight: -50,
    marginTop: -2
  },
  headerContainer1Landscape: {
    backgroundColor: '#3c7ee3',
    borderRadius: 70,
    height: 300,
    width: Platform.OS === 'ios' ?800:772,
    transform: [{rotate: '-8deg'}],
    marginTop: -120,
    marginLeft: -12,
  },
  headerContainer2Landscape: {
    backgroundColor: '#3274d8',
    borderRadius: 70,
    height: 200,
    width: Platform.OS === 'ios' ?600:550,
    transform: [{rotate: '13deg'}],
    alignSelf: 'flex-end',
    marginRight: -50,
    marginTop: 15
  },
  image: {
    width: 44,
    height: 44,
    resizeMode: 'contain',
    marginLeft: 70,
    marginTop:-70,
    marginBottom:40,
    transform: [{rotate: '12deg'}],
  },
  header1: {
    fontSize: 40,
    fontWeight: '700',
    color: 'white',
    marginLeft: 50,
    transform: [{rotate: '12deg'}],
  },
  header2: {
    fontSize: 40,
    fontWeight: '700',
    color: 'white',
    marginLeft: 40,
    transform: [{rotate: '12deg'}],
  },
  imageLandscape: {
    width: 44,
    height: 44,
    resizeMode: 'contain',
    marginLeft: 70,
    marginTop:-100,
    marginBottom:50,
    transform: [{rotate: '8deg'}],
  },
  header1Landscape: {
    fontSize: 40,
    fontWeight: '700',
    color: 'white',
    marginLeft: 50,
    transform: [{rotate: '8deg'}],
  },
  header2Landscape: {
    fontSize: 40,
    fontWeight: '700',
    color: 'white',
    marginLeft: 40,
    transform: [{rotate: '8deg'}],
  },
  signupContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 15,
    marginHorizontal: 50,
  },
  signup: {
    fontSize: 25,
    color: '#000000',
    fontWeight: '700',
    lineHeight: 28,
    paddingBottom: 10,
  },
  submitBtn: {
    width: 90,
    height: 90,
    resizeMode: 'contain',
  },
  bottomContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    marginTop: 10,
    marginHorizontal: 50,
  },
  bottomContainerLandscape: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    marginTop: 10,
    marginHorizontal: 50,
    marginBottom:25,
  },
  bottomText: {
    fontSize: 16,
    color: '#AFAFAF',
    fontWeight: '600',
  },
  signinText: {
    color: '#4C93FF',
    fontSize: 16,
    fontWeight: '600',
    textDecorationLine: 'underline'
  },
});
export default SignUpScreen;
