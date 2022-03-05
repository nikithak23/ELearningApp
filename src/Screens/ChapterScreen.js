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
  Alert,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {StackActions} from '@react-navigation/native';
import {ScrollView} from 'react-native-gesture-handler';
import {useDispatch} from 'react-redux';

const ChapterScreen = ({navigation, route}) => {
  const token = route?.params.token;
  const chapterId = route?.params.chapterId;
  const chapterName = route?.params.chapterName;
  const dispatch = useDispatch();
  const [likedItems, setLikedItems] = useState([]);
  const lessonName = route?.params.lessonName;
  const lessonChap = [chapterId, chapterName, lessonName];
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
  console.log('hlo', contents);
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
            }>
            <Image
              source={require('../Images/Profile/Results/back.png')}
              style={styles.touchableback}
            />
          </TouchableOpacity>
        </View>
        <View style={styles.topLeft}>
          <TouchableOpacity onPress={() => addToLikedList(lessonChap)}>
            <Image
              source={require('../Images/Subject/heart.png')}
              // style={styles.heartimg}
              style={styles.touchableheart}
            />
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() =>
              navigation.navigate('CourseScreen', {
                token: token,
              })
            }>
            <Image
              source={require('../Images/Subject/pages.png')}
              style={styles.touchablepages}
            />
          </TouchableOpacity>
        </View>
      </View>

      <View style={styles.body}>
        <View>
          <Text style={styles.name}>{chapterName}</Text>
        </View>
        <ScrollView showsVerticalScrollIndicator={false}>
          {contents[0]?.imageUrl ? (
            <Image
              source={{uri: contents[0]?.imageUrl}}
              style={styles.contentimg}
            />
          ) : null}

          <Text style={styles.content}> {contents[0]?.content}</Text>
        </ScrollView>
      </View>
      <View style={styles.bottom}>
        <Text>abc</Text>
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
  body: {
    marginTop: 40,
  },
  name: {
    color: '#191B26',
    fontSize: 28,
    textAlign: 'center',
    fontWeight: '500',
    lineHeight: 33,
    letterSpacing: 0,
  },
  contentimg: {
    height: 197,
    width: 322,
    marginLeft: 32,
    marginRight: 32,
    borderRadius: 15,
    marginTop: 30,
  },
  content: {
    marginTop: 30,
    marginHorizontal: 32,

    // textAlign: 'left',
    textAlign: 'justify',
    color: '#4D5060',
    fontSize: 18,
    lineHeight: 26,
    letterSpacing: 0,
  },

  touchableback: {
    height: 20,
    width: 23,
  },

  touchableheart: {
    height: 21.6,
    width: 26,
    marginRight: 40,
  },
  touchablepages: {
    height: 23,
    width: 23,
    // marginRight: 20,
  },
  topLeft: {
    flexDirection: 'row',
  },

  bottom: {
    backgroundColor: 'white',
    width: 400,
    height: 90,

    position: 'absolute',
    bottom: 0,
  },
});
