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
} from 'react-native';
import axios from 'axios';
import {StackActions} from '@react-navigation/native';

const Chapters = [
  {
    img: require('../Images/Profile/photo1.jpeg'),
    difficulty: 'BEGINEER',
    name: 'Food Substances',
    summary: 'Classes and Sources',
  },
  {
    img: require('../Images/Profile/photo1.jpeg'),
    difficulty: 'BEGINEER',
    name: 'Balanced Diet',
    summary: 'Sources of food substance',
  },
  {
    img: require('../Images/Profile/photo1.jpeg'),
    difficulty: 'BEGINEER',
    name: 'Food Diet',
    summary: 'this is the dummy data',
  },
];

const CourseScreen = ({navigation, route}) => {
  const baseUrl = 'https://elearningapp-api.herokuapp.com';
  const token = route?.params.token;
  const id = route?.params.lId;
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
  // console.log('', chapters[0].chapterName);
  RenderTests = () => {
    return (
      <View style={styles.testList}>
        <View style={styles.testListTop}>
          <Image
            source={require('../Images/Profile/photo1.jpeg')}
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
              navigation.navigate('Tests', {cid: cid, cName: cName})
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
        <TouchableOpacity style={styles.listComponent}>
          <View>
            <Image
              source={{uri: item.imageUrl}}
              style={styles.chapterCoverPhoto}
            />

            {/* <Image
                source={require('../Images/Profile/photo1.jpeg')}
                style={styles.chapterCoverPhoto}
              /> */}
          </View>
          <View style={styles.listRight}>
            <Text style={styles.listdifficulty}>BEGINEER</Text>
            {/* <Text style={styles.listname}>{item.name}</Text> */}

            {/* <Text style={styles.listdifficulty}>{item.difficulty}</Text> */}
            <Text style={styles.listname}>{item.chapterName}</Text>
            <Text style={styles.listsummary}>{item.summary}</Text>
            {/* <Text style={styles.listsummary}>{item.summary}</Text> */}
          </View>
        </TouchableOpacity>
      </View>
    );
  };

  const chapterHandler = () => {
    setIsChapter(true);
    setIsTest(false);
  };
  const testHandler = () => {
    setIsChapter(false);
    setIsTest(true);
  };

  return (
    <View style={styles.container}>
      <View style={styles.TopContainer}>
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={styles.touchable}>
          <Image
            source={require('../Images/Profile/Results/back.png')}
            style={styles.backButton}
          />
        </TouchableOpacity>

        <Text style={styles.topText}>INTRODUCTION TO BIOLOGY</Text>
      </View>
      <View style={styles.Lessons}>
        <Text style={styles.LessonTitle}>{lName}</Text>
        <Text style={styles.LessonTitle2}>Lesson {id}</Text>
      </View>
      <View style={styles.tabContainer}>
        <TouchableOpacity onPress={chapterHandler} style={styles.chapter}>
          <Text
            style={
              isChapter
                ? styles.activeTabTextStyle
                : styles.inactiveTabTextStyle
            }>
            LESSONS
          </Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={testHandler} style={styles.tests}>
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
    </View>
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
  LessonTitle2: {
    marginTop: 12,
    fontSize: 18,
    color: 'grey',
    fontWeight: '300',
  },
  tabContainer: {
    marginTop: 30,
    // alignItems: 'center',
    // justifyContent: 'center',
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
  activeTabTextStyle: {
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
    padding: 30,
  },
  listComponent: {
    flexDirection: 'row',
    borderColor: 'rgba(151,151,151,0.1)',
    backgroundColor: 'white',
    borderWidth: 1,
    marginVertical: 10,
    marginHorizontal: 30,
    borderRadius: 15,
    // padding: 30,
  },
  chapterCoverPhoto: {
    height: 40,
    width: 40,
    borderRadius: 30,
  },
  listRight: {
    marginLeft: 25,
  },
  listdifficulty: {
    color: '#3A7FE7',
    fontSize: 10,
    fontWeight: '700',
  },
  listname: {
    marginTop: 10,
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
