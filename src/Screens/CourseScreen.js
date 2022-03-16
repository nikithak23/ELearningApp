import React, {useState, useEffect} from 'react';
import {
  Text,
  Image,
  View,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  ScrollView,
  Platform,
} from 'react-native';
import {Colors} from '../assets/Colors/index';
import {Strings} from '../assets/Strings/index';
import {Images} from '../assets/Images/index';
import {Icons} from '../assets/Icons/index';
import useOrientation from '../hooks/useOrientation';
import axios from 'axios';
import {getChaptersApi} from '../Service/Service';

const CourseScreen = ({navigation, route}) => {
  const orientation = useOrientation();
  const token = route?.params.token;
  const subject = route?.params.subject;
  const id = route?.params.lId;
  const lessonNumber = route?.params.lessonNumber;
  const lName = route?.params.lName;
  const cid = route?.params.cId;
  const cName = route?.params.cName;
  const [isChapter, setIsChapter] = useState(true);
  const [isTest, setIsTest] = useState(false);
  const [chapters, setChapters] = useState([]);

  // Api to get all the chapters of particular lesson
  const getChapters = async id => {
    try {
      // const response = await axios.get(
      //   `${baseUrl}/subject/get/chapters/${id}`,
      //   {
      //     headers: {
      //       Authorization: `Bearer ${token}`,
      //     },
      //   },
      // );
      const response = await getChaptersApi(id, token);
      setChapters(response.data.data);
    } catch (err) {
      console.log(err);
    }
  };
  useEffect(() => {
    getChapters(id);
  }, [id]);

  const chapterHandler = () => {
    setIsChapter(true);
    setIsTest(false);
  };
  const testHandler = () => {
    setIsChapter(false);
    setIsTest(true);
  };

  //To render the test flatlist
  RenderTests = () => {
    return (
      <View
        style={orientation.isPortrait ? styles.testList : styles.testListls}>
        <View style={styles.testListTop}>
          <Image source={Images.TestCoverPhoto} style={styles.testCoverPhoto} />
          <View style={styles.listRight}>
            <Text style={styles.listdifficulty}>{Strings.Begineer}</Text>
            <Text style={styles.listname}>{cName}</Text>
          </View>
        </View>
        <View style={styles.testListBottom}>
          <Text style={styles.testListSummary}>{Strings.TestTime}</Text>
          <TouchableOpacity
            onPress={() =>
              navigation.navigate('Tests', {
                cid: cid,
                cName: cName,
                token: token,
                id: id,
                lessonNumber: lessonNumber,
                lName: lName,
              })
            }
            style={styles.beginButton}>
            <Text style={styles.buttonText}>{Strings.BeginTest}</Text>
            <Image source={Icons.YesArrow} style={styles.buttonImg} />
          </TouchableOpacity>
        </View>
      </View>
    );
  };

  //To render the chapters flatlist
  const renderChapters = ({item}) => {
    return (
      <>
        {/* to navigate to chapters screen */}
        <TouchableOpacity
          onPress={() =>
            navigation.navigate('Chapter', {
              token: token,
              chapterNumber: item.chapterNumber,
              chapterName: item.chapterName,
              chapterId: item.chapterId,
              lessonName: lName,
              lessonId: id,
              lessonNumber: lessonNumber,
              subject: subject,
              cid: cid,
              cName: cName,
            })
          }
          style={
            orientation.isPortrait
              ? styles.listComponent
              : styles.listComponentls
          }>
          <View>
            <Image
              source={{uri: item.imageUrl}}
              style={styles.chapterCoverPhoto}
            />
          </View>
          <View
            style={
              orientation.isPortrait ? styles.listRight : styles.listRightls
            }>
            <Text style={styles.listdifficulty}>{Strings.Begineer}</Text>
            <Text style={styles.listname}>{item.chapterName}</Text>
            <Text style={styles.listsummary}>{item.summary}</Text>
          </View>
        </TouchableOpacity>
      </>
    );
  };

  return (
    <ScrollView showsVerticalScrollIndicator={false} style={styles.container}>
      <View
        style={
          orientation.isPortrait ? styles.TopContainer : styles.TopContainerls
        }>
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={styles.touchable}>
          <Image source={Icons.ButtonBack} />
        </TouchableOpacity>
        <Text
          style={orientation.isPortrait ? styles.topText : styles.topTextls}>
          {cName.toUpperCase()}
        </Text>
      </View>
      <View style={styles.Lessons}>
        <Text
          style={
            orientation.isPortrait ? styles.LessonTitle : styles.LessonTitlels
          }>
          {lName}
        </Text>
        <Text style={styles.LessonTitle2}>
          {Strings.Lesson} {lessonNumber}
        </Text>
      </View>
      <View style={styles.tabContainer}>
        <TouchableOpacity
          onPress={chapterHandler}
          style={orientation.isPortrait ? styles.chapter : styles.chapterls}>
          <Text
            style={
              isChapter
                ? styles.activeTabTextStyle
                : styles.inactiveTabTextStyle
            }>
            {Strings.Chapters}
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={testHandler}
          style={orientation.isPortrait ? styles.tests : styles.testsls}>
          <Text
            style={
              isTest ? styles.activeTabTextStyle : styles.inactiveTabTextStyle
            }>
            {Strings.Tests}
          </Text>
        </TouchableOpacity>
      </View>
      {isChapter && (
        <View style={styles.list}>
          <FlatList
            data={chapters}
            renderItem={renderChapters}
            keyExtractor={(item, index) => item.chapterName}
          />
        </View>
      )}
      {isTest && <RenderTests />}
    </ScrollView>
  );
};
const styles = StyleSheet.create({
  container: {
    height: '100%',
    width: '100%',
    backgroundColor: Colors.BgGrey,
  },

  TopContainer: {
    marginTop: 51,
    flexDirection: 'row',
  },
  TopContainerls: {
    marginTop: 51,
    flexDirection: 'row',
    marginHorizontal: 60,
  },

  touchable: {
    height: 20,
    width: 23,
    marginLeft: 32,
  },
  topText: {
    marginLeft: 40,
    fontSize: 15,
    fontWeight: '300',
  },
  topTextls: {
    marginLeft: 200,
    fontSize: 15,
    fontWeight: '300',
  },
  Lessons: {
    alignItems: 'center',
  },
  LessonTitle: {
    textAlign: 'center',
    marginTop: 30,
    width: 200,
    fontSize: 25,
    fontWeight: '600',
  },
  LessonTitlels: {
    textAlign: 'center',
    marginTop: 30,
    width: 500,
    fontSize: 25,
    fontWeight: '600',
  },
  LessonTitle2: {
    marginTop: 12,
    fontSize: 18,
    color: 'grey',
    fontWeight: '300',
  },
  tabContainer: {
    marginTop: 30,
    flexDirection: 'row',
  },
  chapter: {
    borderTopLeftRadius: 20,
    borderBottomLeftRadius: 20,
    width: 165,
    borderWidth: 1,
    borderColor: Colors.ChapterBorder,
    backgroundColor: Colors.White,
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: 30,
  },
  chapterls: {
    borderTopLeftRadius: 20,
    borderBottomLeftRadius: 20,
    width: Platform.OS === 'ios' ? 330 : 300,
    borderWidth: 1,
    borderColor: Colors.ChapterBorder,
    backgroundColor: Colors.White,
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: 90,
  },
  tests: {
    borderTopRightRadius: 20,
    borderBottomRightRadius: 20,
    width: 165,
    borderWidth: 1,
    borderColor: Colors.ChapterBorder,
    backgroundColor: Colors.White,
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 30,
  },
  testsls: {
    borderTopRightRadius: 20,
    borderBottomRightRadius: 20,
    width: Platform.OS === 'ios' ? 330 : 300,
    borderWidth: 1,
    borderColor: Colors.ChapterBorder,
    backgroundColor: Colors.White,
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 90,
  },
  activeTabTextStyle: {
    color: Colors.ActiveTab,
    fontSize: 14,
    fontWeight: '600',
  },
  activeTabTextStylels: {
    color: Colors.ActiveTab,
    fontSize: 14,
    fontWeight: '600',
  },
  inactiveTabTextStyle: {
    color: Colors.Lesson,
    fontSize: 14,
    fontWeight: '600',
  },
  list: {
    marginTop: 35,
  },
  listComponent: {
    flexDirection: 'row',
    borderColor: Colors.ChapterBorder,
    backgroundColor: Colors.White,
    borderWidth: 1,
    marginVertical: 10,
    marginHorizontal: 30,
    borderRadius: 15,
    padding: 30,
  },
  listComponentls: {
    flexDirection: 'row',
    borderColor: Colors.ChapterBorder,
    backgroundColor: Colors.White,
    borderWidth: 1,
    marginVertical: 10,
    marginHorizontal: 90,
    borderRadius: 15,
    padding: 30,
    paddingLeft: 90,
  },
  chapterCoverPhoto: {
    height: 40,
    width: 40,
    borderRadius: 30,
  },
  listRight: {
    marginLeft: 25,
  },
  listRightls: {
    marginLeft: 75,
  },
  listdifficulty: {
    color: Colors.ActiveTab,
    fontSize: 10,
    fontWeight: '700',
  },
  listname: {
    marginTop: 10,
    marginRight: 30,
    fontSize: 18,
    fontWeight: '600',
  },
  listsummary: {
    color: Colors.Lesson,
    fontWeight: '300',
    fontSize: 13,
    marginTop: 10,
  },
  testList: {
    marginTop: 35,
    borderColor: Colors.ChapterBorder,
    backgroundColor: Colors.White,
    borderWidth: 1,
    marginVertical: 10,
    marginHorizontal: 30,
    borderRadius: 15,
    paddingTop: 30,
    padding: 15,
  },
  testListls: {
    marginTop: 35,
    borderColor: Colors.ChapterBorder,
    backgroundColor: Colors.White,
    borderWidth: 1,
    marginVertical: 10,
    marginHorizontal: 90,
    borderRadius: 15,
    paddingTop: 30,
    padding: 15,
    paddingLeft: 30,
    paddingRight: 30,
  },
  testListTop: {
    flexDirection: 'row',
  },
  testListBottom: {
    flexDirection: 'column',
    marginTop: 20,
  },
  testCoverPhoto: {
    height: 65,
    width: 65,
    borderRadius: 40,
  },
  testListSummary: {
    color: Colors.Lesson,
    fontWeight: '400',
    fontSize: 16,
    textAlign: 'center',
  },
  beginButton: {
    flexDirection: 'row',
    marginTop: 25,
    borderWidth: 1,
    backgroundColor: Colors.BeginButtonBg,
    height: 55,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    borderColor: Colors.BeginButtonBo,
  },
  buttonText: {
    color: Colors.White,
    fontSize: 18,
    marginLeft: 80,
  },
  buttonImg: {
    marginLeft: 60,
  },
});
export default CourseScreen;
