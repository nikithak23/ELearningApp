import React from 'react';
import {Text, View, StyleSheet, Image, ScrollView} from 'react-native';
import reducer from './src/Redux/reducer';
import {createStore} from 'redux';
import {Provider} from 'react-redux';
import MainNavig from './src/MainNavig';
import {LogBox} from 'react-native';
LogBox.ignoreLogs([
  "Warning: Can't perform a React state update on an unmounted component. This is a no-op, but it indicates a memory leak in your application. To fix, cancel all subscriptions and asynchronous tasks in the componentWillUnmount method.",
  "Warning: Can't perform a React state update on an unmounted component. This is a no-op, but it indicates a memory leak in your application. To fix, cancel all subscriptions and asynchronous tasks in a useEffect cleanup function.",
  'VirtualizedLists should never be nested inside plain ScrollViews with the same orientation because it can break windowing and other functionality - use another VirtualizedList-backed container instead.',
  'Warning: Failed prop type: Invalid props.style key `opactiy` supplied to `Image`.',
  'Did not receive response to shouldStartLoad in time, defaulting to YES',
]);

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
