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
  Alert
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {StackActions} from '@react-navigation/native';
import { useDispatch } from 'react-redux';

const ChapterScreen = ({navigation, route}) => {
  const token = route?.params.token;
  const chapterId = route?.params.chapterId;
  const chapterName = route?.params.chapterName;
  const dispatch = useDispatch();
  const [likedItems, setLikedItems] = useState([]);
  const lessonName = route?.params.lessonName;
  const lessonChap = [chapterId, chapterName, lessonName]
  console.log(chapterName);
  console.log(chapterId);
  console.log('llll', lessonName);
  const [contents, setContents] = useState([]);
  const baseUrl = 'https://elearningapp-api.herokuapp.com';

  const getContent = async chapterId => {
    try {
      const response = await axios.get(
        `${baseUrl}/subject/get/content/${chapterId}?pageSize=1&pageNumber=0`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );

      setContents(response.data.data);
    } catch (err) {
      console.log(err);
    }
  };
  useEffect(() => {
    getContent(chapterId);
  }, []);
  // console.log('hlo', contents);
  // console.log('conid', contents[0].contentId);

  //This is for storing liked list
  const persistLikedlist = async newItem => {
    //store favourite list
    try {
      const currentItems = await AsyncStorage.getItem('liked');
      let json = currentItems === null ? [] : JSON.parse(currentItems);
      if (json.some(element => element.id === newItem[0]) === false) {
        json.push(newItem);
        setLikedItems(json);
      } else {
        Alert.alert('', 'Already added to Favourite list');
      }
      //update Async Storage
      await AsyncStorage.setItem('liked', JSON.stringify(json));
      const current = await AsyncStorage.getItem('liked');
      dispatch({
        type: 'UPDATE_LIKED_LIST',
        items: json,
      });
    } catch (err) {
      console.log(err);
    }
  };

  const addToLikedList = async item => {
    await persistLikedlist(item);
  };

  return (
    <View style={styles.container}>
      <View style={styles.TopContainer}>
        <View>
          <TouchableOpacity
            onPress={() =>
              navigation.navigate('CourseScreen', {
                token: token,
              })
            }
            style={styles.touchable}>
            <Image
              source={require('../Images/Profile/Results/back.png')}
              style={styles.backButton}
            />
          </TouchableOpacity>
        </View>
        <View style={styles.topLeft}>
          <TouchableOpacity
            onPress={() =>
              addToLikedList(lessonChap)
            }
            style={styles.touchable}>
            <Image
              source={require('../Images/Subject/heart.png')}
              style={styles.backButton}
            />
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() =>
              navigation.navigate('CourseScreen', {
                token: token,
              })
            }
            style={styles.touchable}>
            <Image
              source={require('../Images/Subject/pages.png')}
              style={styles.backButton}
            />
          </TouchableOpacity>
        </View>
      </View>

      <View style={{marginTop: 60}}>
        <Text>{chapterName}</Text>
        <Text> {contents[0]?.content}</Text>
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
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginHorizontal: 30,
  },
  backButton: {
    // marginLeft: 32,
  },
  touchable: {
    height: 20,
    width: 23,
    marginLeft: 32,
  },
  topLeft: {
    flexDirection: 'row',
  },
});
