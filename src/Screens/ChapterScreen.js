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
  console.log(chapterName);
  console.log(chapterId);
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
              navigation.navigate('Favourite', {
                token: token,
                chapterId: chapterId,
                chapterName: chapterName,
              })
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
