import React from 'react';
import {Text, View, StyleSheet, Image, ScrollView} from 'react-native';

const SignUp = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>SignUp Page 1</Text>
      <Text style={styles.title}>SignUp Page two</Text>
      <Text style={styles.title}>SignUp Page three</Text>
      <Text style={styles.title}>SignUp Page ten</Text>
      <Text style={styles.title}>SignUp Page 11</Text>
      <Text style={styles.title}>SignUp Page 13</Text>
      <Text style={styles.title}>SignUp Page 12</Text>
<<<<<<< HEAD
      <Text style={styles.title}>SignUp Page</Text>
      <Text style={styles.title}>hii</Text>
=======
      <Text style={styles.title}>Hello, Welcome</Text>

>>>>>>> 2f9d2d50ab488306c290c496db13f5b7fbe52470
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    height: '100%',
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    //backgroundColor:'#4C93FF',
  },
  title: {
    fontSize: 16,
    color: 'black',
  },
});
export default SignUp;
