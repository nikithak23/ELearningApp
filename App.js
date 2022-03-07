import React from 'react';
import {Text, View, StyleSheet, Image, ScrollView} from 'react-native';
import reducer from './src/Redux/reducer';
import {createStore} from 'redux';
import {Provider} from 'react-redux';
import MainNavig from './src/MainNavig';

const App = () => {
  const store = createStore(reducer);
  return (
    <Provider store={store}>
      <MainNavig />
    </Provider>
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
