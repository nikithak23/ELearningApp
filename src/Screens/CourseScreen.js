import React, {useState, useEffect, useContext} from 'react';
import {
  Text,
  Image,
  View,
  StyleSheet,
  ImageBackground,
  Touchable,
  FlatList,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import useOrientation from '../hooks/useOrientation';
import axios from 'axios';

// const Chapters = [
//   {
//     img: require('../Images/Profile/photo1.jpeg'),
//     difficulty: 'BEGINEER',
//     name: 'Food Substances',
//     summary: 'Classes and Sources',
//   },
//   {
//     img: require('../Images/Profile/photo1.jpeg'),
//     difficulty: 'BEGINEER',
//     name: 'Balanced Diet',
//     summary: 'Sources of food substance',
//   },
//   {
//     img: require('../Images/Profile/photo1.jpeg'),
//     difficulty: 'BEGINEER',
//     name: 'Food Diet',
//     summary: 'this is the dummy data',
//   },
// ];

const CourseScreen = ({navigation, route}) => {
  const orientation = useOrientation();
  const baseUrl = 'https://elearningapp-api.herokuapp.com';
  const token = route?.params.token;
  const id = route?.params.lId;
  const lessonNumber = route?.params.lessonNumber;
  const lName = route?.params.lName;
  const cid = route?.params.cId;
  const cName = route?.params.cName;
  console.log('token', token);
  console.log('LESSONID', id);
  console.log('lNAmee', lName);
  const [isChapter, setIsChapter] = useState(true);
  const [isTest, setIsTest] = useState(false);
  const [chapters, setChapters] = useState([]);

  const getChapters = async id => {
    try {
      const response = await axios.get(
        `${baseUrl}/subject/get/chapters/${id}`,

        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );

      setChapters(response.data.data);
      // console.log('hiii', response.data.chapterName);
    } catch (err) {
      console.log(err);
    }
  };
  // useEffect(() => {
  //   // setChapters();
  // });
  useEffect(() => {
    getChapters(id);
  }, [id]);
  console.log('hiii', chapters);

  RenderTests = () => {
    return (
      <View
        style={orientation.isPortrait ? styles.testList : styles.testListls}>
        {/* style={styles.testList}> */}
        <View style={styles.testListTop}>
          <Image
            source={require('../Images/Subject/testcoverphoto.jpeg')}
            style={styles.testCoverPhoto}
          />
          <View style={styles.listRight}>
            <Text style={styles.listdifficulty}>BEGINEER</Text>
            <Text style={styles.listname}>{cName}</Text>
            <Text style={styles.listname}>{cid}</Text>
          </View>
        </View>
        <View style={styles.testListBottom}>
          <Text style={styles.testListSummary}>
            You have 20 minutes to ansawer all 10 questions. For each right ans
            5 marks
          </Text>
          <TouchableOpacity
            onPress={() =>
              navigation.navigate('Tests', {
                cid: cid,
                cName: cName,
                token: token,
                id: id,
                lName: lName,
              })
            }
            style={styles.beginButton}>
            <Text style={styles.buttonText}>Begin Text</Text>
            <Image
              source={require('../Images/Profile/yesArrow.png')}
              style={styles.buttonImg}
            />
          </TouchableOpacity>
        </View>
      </View>
    );
  };

  const renderChapters = ({item}) => {
    return (
      <View style={styles.list1}>
        <TouchableOpacity
          onPress={() =>
            navigation.navigate('Chapter', {
              token: token,
              chapterNumber: item.chapterNumber,
              chapterName: item.chapterName,
              chapterId: item.chapterId,
              lessonName: lName,
              lessonId: id,
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
            {/* style={styles.listRight}> */}
            <Text style={styles.listdifficulty}>BEGINEER</Text>
            <Text style={styles.listname}>{item.chapterName}</Text>
            <Text style={styles.listsummary}>{item.summary}</Text>
          </View>
        </TouchableOpacity>
      </View>
    );
  };
  // const gotoChapters = item => {
  //   navigation.navigate('Chapter', {token: token, chapterId: item.chapterId});
  // };

  const chapterHandler = () => {
    setIsChapter(true);
    setIsTest(false);
  };
  const testHandler = () => {
    setIsChapter(false);
    setIsTest(true);
  };

  return (
    <ScrollView showsVerticalScrollIndicator={false} style={styles.container}>
      <View
        style={
          orientation.isPortrait ? styles.TopContainer : styles.TopContainerls
        }>
        {/* style={styles.TopContainer}> */}
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={styles.touchable}>
          <Image
            source={require('../Images/Profile/Results/back.png')}
            style={styles.backButton}
          />
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
          {/* style={styles.LessonTitle}> */}
          {lName}
        </Text>
        <Text style={styles.LessonTitle2}>Lesson {id}</Text>
      </View>
      <View style={styles.tabContainer}>
        <TouchableOpacity
          onPress={chapterHandler}
          style={orientation.isPortrait ? styles.chapter : styles.chapterls}>
          {/* style={styles.chapter}> */}
          <Text
            // style={
            //   isChapter
            //     ? orientation.isPortrait
            //       ? styles.activeTabTextStyle
            //       : styles.activeTabTextStylels
            //     : orientation.isPortrait
            //     ? styles.inactiveTabTextStyle
            //     : styles.inactiveTabTextStylels
            // }>
            //           orientation.isPortrait ?
            // (isChapter ? styles.activeTabTextStyle : styles.inactiveTabTextStyle) : orientation.isPortrait ?(styles.activeTabTextStyle : styles.inactiveTabTextStyle)

            style={
              isChapter
                ? styles.activeTabTextStyle
                : styles.inactiveTabTextStyle
            }>
            CHAPTERS
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={testHandler}
          style={orientation.isPortrait ? styles.tests : styles.testsls}>
          {/* style={styles.tests}> */}
          <Text
            style={
              isTest ? styles.activeTabTextStyle : styles.inactiveTabTextStyle
            }>
            TESTS
          </Text>
        </TouchableOpacity>
      </View>
      {isChapter && (
        <View style={styles.list}>
          <FlatList
            // data={Chapters}
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
    backgroundColor: '#F6FAFF',
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
  backButton: {
    // marginLeft: 32,
  },
  touchable: {
    height: 20,
    width: 23,
    marginLeft: 32,
  },
  topText: {
    marginLeft: 40,

    fontSize: 15,
    // color: 'grey',
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
    // borderColor: 'white',
    borderColor: 'rgba(151,151,151,0.1)',
    backgroundColor: 'white',
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: 30,
  },
  chapterls: {
    borderTopLeftRadius: 20,
    borderBottomLeftRadius: 20,
    width: 330,
    borderWidth: 1,
    // borderColor: 'white',
    borderColor: 'rgba(151,151,151,0.1)',
    backgroundColor: 'white',
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: 90,
  },
  tests: {
    borderTopRightRadius: 20,
    borderBottomRightRadius: 20,
    // borderRadius: 10,
    width: 165,
    borderWidth: 1,
    // borderColor: 'white',
    borderColor: 'rgba(151,151,151,0.1)',
    backgroundColor: 'white',
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 30,
  },
  testsls: {
    borderTopRightRadius: 20,
    borderBottomRightRadius: 20,
    // borderRadius: 10,
    width: 330,
    borderWidth: 1,
    // borderColor: 'white',
    borderColor: 'rgba(151,151,151,0.1)',
    backgroundColor: 'white',
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 90,
  },
  activeTabTextStyle: {
    color: '#3A7FE7',
    fontSize: 14,
    fontWeight: '600',
  },
  activeTabTextStylels: {
    color: '#3A7FE7',
    fontSize: 14,
    fontWeight: '600',
  },
  inactiveTabTextStyle: {
    color: 'grey',
    fontSize: 14,
    fontWeight: '600',
  },

  list: {
    marginTop: 35,
  },
  list1: {
    // padding: 15,
  },
  listComponent: {
    flexDirection: 'row',
    borderColor: 'rgba(151,151,151,0.1)',
    backgroundColor: 'white',
    borderWidth: 1,
    marginVertical: 10,
    marginHorizontal: 30,
    borderRadius: 15,
    padding: 30,
  },
  listComponentls: {
    flexDirection: 'row',
    borderColor: 'rgba(151,151,151,0.1)',
    backgroundColor: 'white',
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
    color: '#3A7FE7',
    fontSize: 10,
    fontWeight: '700',
  },
  listname: {
    marginTop: 10,
    // paddingRight: 20,
    marginRight: 30,
    fontSize: 18,
    fontWeight: '600',
  },
  listsummary: {
    color: 'grey',
    fontWeight: '300',
    fontSize: 13,
    marginTop: 10,
  },
  testList: {
    // flexDirection: 'row',
    marginTop: 35,
    borderColor: 'rgba(151,151,151,0.1)',
    backgroundColor: 'white',
    borderWidth: 1,
    marginVertical: 10,
    marginHorizontal: 30,
    borderRadius: 15,
    paddingTop: 30,
    padding: 15,
  },
  testListls: {
    // flexDirection: 'row',
    marginTop: 35,
    borderColor: 'rgba(151,151,151,0.1)',
    backgroundColor: 'white',
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
    // alignItems: 'center',
  },
  testCoverPhoto: {
    height: 65,
    width: 65,
    borderRadius: 40,
  },
  testListSummary: {
    color: 'grey',
    fontWeight: '400',
    fontSize: 16,
    textAlign: 'center',

    // marginTop: 10,
  },
  beginButton: {
    flexDirection: 'row',
    marginTop: 25,
    borderWidth: 1,
    backgroundColor: 'rgba(58, 127, 231,0.9)',
    height: 55,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    borderColor: 'rgba(58, 127, 231,0.1)',
  },
  buttonText: {
    // textAlign: 'center',
    color: 'white',
    fontSize: 18,
    marginLeft: 80,
  },
  buttonImg: {
    marginLeft: 60,
  },
});
export default CourseScreen;
