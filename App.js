import React from 'react';
import {Text, View, StyleSheet, Image, ScrollView} from 'react-native';

const App = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>E learning App</Text>
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

export default App;
