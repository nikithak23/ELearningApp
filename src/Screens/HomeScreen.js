import React from 'react';
import {Text, View, StyleSheet, Image, ScrollView} from 'react-native';

const HomeScreen = ({route}) => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Home Screen</Text>
      <Text style={styles.title}>Hello {route.params.msg}</Text>
      <Text style={styles.title}>Hello {route.params.phone}</Text>
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
export default HomeScreen;
