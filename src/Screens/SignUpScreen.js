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
      <Text style={styles.title}>SignUp Page</Text>
      <Text style={styles.title}>hii</Text>
      <Text style={styles.title}>Hello, Welcome</Text>
      <Text style={styles.title}>Hello, Welcome 123</Text>
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
