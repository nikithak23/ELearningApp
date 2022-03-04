import React, {useState, useEffect, useContext} from 'react';
import axios from 'axios';
import {
  Text,
  Image,
  View,
  StyleSheet,
  ImageBackground,
  Touchable,
  FlatList,
  TouchableOpacity,
} from 'react-native';
import {StackActions} from '@react-navigation/native';

const ChapterScreen = ({navigation, route}) => {
  const token = route?.params.token;
  const chapterId = route?.params.chapterId;
  const chapterName = route?.params.chapterName;
  console.log(chapterId);
  //   const [contents, setContents] = useState([]);
  const baseUrl = 'https://elearningapp-api.herokuapp.com';

  return (
    <View style={styles.container}>
      <View style={{marginTop: 60}}>
        <Text>{/* {token},{chapterId} */}</Text>
        <Text>
          {' '}
          {chapterId} {chapterName}
        </Text>
      </View>
    </View>
  );
};
export default ChapterScreen;

const styles = StyleSheet.create({
  container: {
    height: '100%',
    width: '100%',
    backgroundColor: '#F6FAFF',
  },
  TopContainer: {
    marginTop: 51,
  },
  backButton: {
    // marginLeft: 32,
  },
  touchable: {
    height: 20,
    width: 23,
    marginLeft: 32,
  },
});
