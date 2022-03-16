import React, {useState, useEffect} from 'react';
import axios from 'axios';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  FlatList,
  ScrollView,
  Platform,
} from 'react-native';
import {useFocusEffect} from '@react-navigation/core';
import CircularProgress from 'react-native-circular-progress-indicator';
import Icon from 'react-native-vector-icons/Ionicons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useDispatch} from 'react-redux';
import useOrientation from '../hooks/useOrientation';
import {Icons} from '../assets/Icons';
import {Strings} from '../assets/Strings';
import {Colors} from '../assets/Colors';
import {Images} from '../assets/Images';


const SubjectDetails = ({navigation, route}) => {
  const sub1 = Images.Sub1;
  const sub2 = Images.Sub2;
  const subImg = [sub1, sub2];
   const btnBack = Icons.ButtonBack;
  const bgImg = [Colors.bgImg1, Colors.bgImg2];
  const Options = ['ALL', 'STUDYING', 'LIKED'];
  const book = Images.Book;
  const orientation = useOrientation();
  const baseUrl = 'https://elearningapp-api.herokuapp.com';
  const subject = route?.params.subject;
  const token = route?.params.token;
  const subId = route?.params.id;
  const cId = route?.params.courseId ? route?.params.courseId : '0';
  const [selected, setSelected] = useState('ALL');
  const [courseTitle, setCourseTitle] = useState([]);
  const [courseId, setCourseId] = useState(cId);
  const [LessonTitle, setLessonTitle] = useState([]);
  const [selectedCourse, setSelectedCourse] = useState(cId);
  const [courseName, setCourseName] = useState('');
  const [lessonStdyng, setLessonStdyng] = useState([]);
  const [empty, setEmpty] = useState(false);
  const [likedList, setLikedList] = useState(null);
  const filterStudyng = lessonStdyng.filter(ele => ele.subject === subject);
  const onlyStudyng = filterStudyng.filter(ele => ele.percent > 0);
  const filterLiked = likedList?.filter(ele => ele[3] === subject);
  const dispatch = useDispatch();

  //api to get courses
  const getCourses = async () => {
    try {
      const response = await axios.get(
        `${baseUrl}/subject/get/courses/${subId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );
      setCourseTitle(response.data.data);
    } catch (err) {
      console.log(err);
    }
  };

  //api to get lessons
  const getLessons = async () => {
    try {
      const response = await axios.get(
        `${baseUrl}/subject/get/lessons/${courseId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );
      setLessonTitle(response.data.data);
    } catch (err) {
      console.log(err);
    }
  };

  //api to currently studying lessons
  const getStudyng = async () => {
    try {
      const response = await axios.get(
        `${baseUrl}/subject/get/lesson/studying`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );
      setLessonStdyng(response.data.data);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getCourses();
  }, []);
  useFocusEffect(
    React.useCallback(() => {
      getLessons();
    }, [courseId]),
  );
  useFocusEffect(
    React.useCallback(() => {
      getStudyng();
    }, [lessonStdyng]),
  );

  const OnPressCourse = item => {
    setCourseId(item.courseId);
    setCourseName(item.courseName);
    setSelectedCourse(item.courseId);
  };

  const renderCourse = ({item, index}) => {
    return (
      <>
        <TouchableOpacity
          style={orientation.isPortrait ? styles.courses : styles.coursesls}
          onPress={() => OnPressCourse(item)}>
          <View style={[styles.courseImg, {backgroundColor: bgImg[index]}]}>
            <Image source={subImg[index]} style={styles.cImg} />
          </View>
          <View style={styles.courseTitle}>
            <Text style={styles.courseName}>{item.courseName}</Text>
          </View>
          {selectedCourse === item.courseId && (
            <View
              style={
                orientation.isPortrait ? styles.selected : styles.selectedls
              }></View>
          )}
        </TouchableOpacity>
      </>
    );
  };

  const renderLesson = ({item, index}) => {
    let ifStudyng = lessonStdyng.find(
      element => element.lessonId === item.lessonId,
    );
    return (
      <TouchableOpacity
        activeOpacity={0.7}
        style={orientation.isPortrait ? styles.lessons : styles.lessonsls}
        onPress={() => {
          navigation.navigate('CourseScreen', {
            lId: item.lessonId,
            lName: item.lessonName,
            token: token,
            cId: courseId,
            cName: courseName,
            lessonNumber: item.lessonNumber,
            subject: subject,
          });
        }}>
        <View style={styles.row}>
          <View style={styles.progress}>
            <CircularProgress
              value={
                ifStudyng?.lessonId === item.lessonId ? ifStudyng.percent : 0
              }
              radius={17}
              duration={1000}
              textColor={'transparent'}
              maxValue={100}
              activeStrokeWidth={1.5}
              inActiveStrokeWidth={2.5}
              inActiveStrokeColor={'#999'}
              inActiveStrokeOpacity={0.35}
              clockwise={false}
            />
          </View>
          <View style={styles.row}>
            <Text
              style={
                orientation.isPortrait ? styles.lessonName : styles.lessonNamels
              }>
              {item.lessonName.toUpperCase()}
            </Text>
            <Text
              style={
                orientation.isPortrait ? styles.lessonNum : styles.lessonNumls
              }>
              {Strings.Lesson} {item.lessonNumber}
            </Text>
          </View>
        </View>
        <View style={styles.row}>
          <View style={styles.column}>
            <View
              style={
                ifStudyng?.lessonId === item.lessonId
                  ? ifStudyng.completed1 === true
                    ? orientation.isPortrait
                      ? [styles.progressLine, {borderColor: '#03c04a'}]
                      : [styles.progressLinels, {borderColor: '#03c04a'}]
                    : orientation.isPortrait
                    ? styles.progressLine
                    : styles.progressLinels
                  : orientation.isPortrait
                  ? styles.progressLine
                  : styles.progressLinels
              }></View>
            {ifStudyng?.lessonId === item.lessonId ? (
              ifStudyng.completed1 === true ? (
                <Icon name="checkmark-sharp" size={21} style={styles.tick} />
              ) : (
                <Icon name="ellipse" size={12} style={styles.dot} />
              )
            ) : (
              <Icon name="ellipse" size={12} style={styles.dot} />
            )}
          </View>
          <View style={styles.column}>
            <Text
              style={orientation.isPortrait ? styles.chaps : styles.chapsls}>
              {item.chapter1}
            </Text>
            <Text style={styles.summary}>{item.summary1}</Text>
          </View>
        </View>
        {item.chapter2 ? (
          <View style={styles.row}>
            <View style={styles.column}>
              <View
                style={
                  ifStudyng?.lessonId === item.lessonId
                    ? ifStudyng.completed2 === true
                      ? [styles.progressLine, {borderColor: Colors.Tick}]
                      : styles.progressLine
                    : styles.progressLine
                }></View>
              {ifStudyng?.lessonId === item.lessonId ? (
                ifStudyng.completed2 === true ? (
                  <Icon name="checkmark-sharp" size={21} style={styles.tick} />
                ) : (
                  <Icon name="ellipse" size={12} style={styles.dot} />
                )
              ) : (
                <Icon name="ellipse" size={12} style={styles.dot} />
              )}
            </View>
            <View style={styles.column}>
              <Text
                style={orientation.isPortrait ? styles.chaps : styles.chapsls}>
                {item.chapter2}
              </Text>
              <Text style={styles.summary}>{item.summary2}</Text>
            </View>
          </View>
        ) : null}
        {item.chapter3 ? (
          <View style={styles.row}>
            <View style={styles.column}>
              <View
                style={
                  ifStudyng?.lessonId === item.lessonId
                    ? ifStudyng.completed3 === true
                      ? [styles.progressLine, {borderColor: Colors.Tick}]
                      : styles.progressLine
                    : styles.progressLine
                }></View>
              {ifStudyng?.lessonId === item.lessonId ? (
                ifStudyng.completed3 === true ? (
                  <Icon name="checkmark-sharp" size={21} style={styles.tick} />
                ) : (
                  <Icon name="ellipse" size={12} style={styles.dot} />
                )
              ) : (
                <Icon name="ellipse" size={12} style={styles.dot} />
              )}
            </View>
            <View style={styles.column}>
              <Text
                style={orientation.isPortrait ? styles.chaps : styles.chapsls}>
                {item.chapter3}
              </Text>
              <Text style={styles.summary}>{item.summary3}</Text>
            </View>
          </View>
        ) : null}
      </TouchableOpacity>
    );
  };

  const renderStud = ({item}) => {
    return (
      <TouchableOpacity
        style={orientation.isPortrait ? styles.studyn : styles.studynls}
        onPress={() => {
          navigation.navigate('CourseScreen', {
            lId: item.lessonId,
            lName: item.lessonName,
            token: token,
            cId: item.courseId,
            cName: item.courseName,
            lessonNumber: item.lessonNumber,
            subject: subject,
          });
        }}>
        <View style={styles.row}>
          <View style={styles.progress}>
            <CircularProgress
              value={item.percent}
              radius={17}
              duration={1000}
              textColor={Colors.Tansparent}
              maxValue={100}
              activeStrokeWidth={1.5}
              inActiveStrokeWidth={2.5}
              inActiveStrokeColor={Colors.Summary}
              inActiveStrokeOpacity={0.35}
              clockwise={false}
            />
          </View>
          <View style={styles.row}>
            <Text
              style={
                orientation.isPortrait ? styles.lessonName : styles.lessonNamels
              }>
              {item.lessonName.toUpperCase()}
            </Text>
          </View>
        </View>
        <View style={styles.row}>
          <View style={styles.column}>
            {item.completed1 === true ? (
              <Icon name="checkmark-sharp" size={20} style={styles.tick} />
            ) : (
              <Icon name="ellipse" size={12} style={styles.dot} />
            )}
          </View>
          <Text
            style={
              orientation.isPortrait ? styles.chapstudyn : styles.chapstudynls
            }>
            {item.chapterName1}
          </Text>
        </View>
        {item.chapterName2 ? (
          <View style={styles.row}>
            <View style={styles.column}>
              {item.completed2 === true ? (
                <Icon name="checkmark-sharp" size={20} style={styles.tick} />
              ) : (
                <Icon name="ellipse" size={12} style={styles.dot} />
              )}
            </View>
            <Text
              style={
                orientation.isPortrait ? styles.chapstudyn : styles.chapstudynls
              }>
              {item.chapterName2}
            </Text>
          </View>
        ) : null}
        {item.chapterName3 ? (
          <View style={styles.row}>
            <View style={styles.column}>
              {item.completed3 === true ? (
                <Icon name="checkmark-sharp" size={20} style={styles.tick} />
              ) : (
                <Icon name="ellipse" size={12} style={styles.dot} />
              )}
            </View>

            <Text
              style={
                orientation.isPortrait ? styles.chapstudyn : styles.chapstudynls
              }>
              {item.chapterName3}
            </Text>
          </View>
        ) : null}
      </TouchableOpacity>
    );
  };

  ///////get liked list///////

  useFocusEffect(
    React.useCallback(() => {
      try {
        initialiseLikedList();
      } catch (err) {
        console.log(err);
      }
    }, [likedList]),
  );

  const initialiseLikedList = async () => {
    const currentItems = await AsyncStorage.getItem('liked');
    if (currentItems === null) {
      setEmpty(true);
    } else {
      setEmpty(false);
      setLikedList(JSON.parse(currentItems));
      filterLiked?.length === 0 ? setEmpty(true) : null;
    }
    dispatch({
      type: 'UPDATE_LIKED_LIST',
      items: likedList,
    });
  };

  const removeLiked = async () => {
    try {
      await AsyncStorage.removeItem('liked');
      setLikedList([]);
      setEmpty(true);
    } catch (err) {
      console.log(err);
    }
  };

  const removeItem = async item => {
    try {
      const deleteLikedListItem = likedList.filter(function (el) {
        return el[0] !== item[0];
      });
      await AsyncStorage.setItem('liked', JSON.stringify(deleteLikedListItem));
      if (deleteLikedListItem.length === 0) {
        setEmpty(true);
      }
    } catch (err) {
      console.log(err);
    }
  };

  const renderLikedList = ({item}) => {
    return (
      <View style={orientation.isPortrait ? styles.lessons : styles.lessonsls}>
        <View style={styles.row}>
          <Text style={styles.likedCName}>{item[2]}</Text>
          <Icon
            onPress={() => removeItem(item)}
            name="heart"
            size={21}
            style={orientation.isPortrait ? styles.like : styles.likels}
          />
        </View>
        <Text style={styles.likedchap}>{item[1]}</Text>
      </View>
    );
  };

  const renderStudying = () => {
    if (onlyStudyng.length > 0) {
      return (
        <View style={styles.bottom}>
          <FlatList
            data={onlyStudyng}
            renderItem={renderStud}
            keyExtractor={item => item.lessonId}
            showsVerticalScrollIndicator={false}
          />
        </View>
      );
    } else {
      return (
        <>
          <Image
            source={book}
            style={orientation.isPortrait ? styles.book : styles.bookls}
          />
          <Text style={styles.emptyStud}>{Strings.StartLesson}</Text>
        </>
      );
    }
  };

  const renderLiked = () => {
    console.log('this is liked list ===> ', likedList);
    if (empty) {
      return (
        <>
          <Icon
            name="heart-dislike"
            size={80}
            style={orientation.isPortrait ? styles.noLike : styles.noLikels}
          />
          <Text
            style={
              orientation.isPortrait ? styles.emptyStud : styles.emptyStudls
            }>
            {Strings.LikeChapter}
          </Text>
        </>
      );
    } else {
      return (
        <View>
          <TouchableOpacity onPress={() => removeLiked()}>
            <Text
              style={orientation.isPortrait ? styles.clear : styles.clearls}>
              {Strings.ClearAll}
            </Text>
          </TouchableOpacity>
          <FlatList
            data={filterLiked}
            renderItem={renderLikedList}
            keyExtractor={(item, index) => index.toString()}
            showsVerticalScrollIndicator={false}
          />
        </View>
      );
    }
  };

  const renderAll = () => {
    return (
      <ScrollView style={styles.container}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Image
            source={btnBack}
            style={orientation.isPortrait ? styles.btnBack : styles.btnBackls}
          />
        </TouchableOpacity>
        <Text style={orientation.isPortrait ? styles.title : styles.titlels}>
          {subject}
        </Text>
        <View
          style={orientation.isPortrait ? styles.rowOpts : styles.rowOptsls}>
          {Options.map((opt, index) => (
            <View
              key={index.toString()}
              style={
                opt === 'STUDYING'
                  ? orientation.isPortrait
                    ? styles.line
                    : styles.linels
                  : null
              }>
              <TouchableOpacity onPress={() => setSelected(opt)}>
                <Text style={opt === selected ? styles.active : styles.optText}>
                  {Options[index]}
                </Text>
              </TouchableOpacity>
            </View>
          ))}
        </View>
        {selected === Options[0] ? (
          <View style={styles.bottom}>
            <FlatList
              data={courseTitle}
              renderItem={renderCourse}
              keyExtractor={item => item.courseId}
              horizontal={true}
              showsHorizontalScrollIndicator={false}
            />

            <FlatList
              data={LessonTitle}
              renderItem={renderLesson}
              keyExtractor={item => item.lessonId}
              showsVerticalScrollIndicator={false}
            />
          </View>
        ) : selected === Options[1] ? (
          renderStudying()
        ) : (
          renderLiked()
        )}
      </ScrollView>
    );
  };

  return renderAll();
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.BgGrey,
  },
  btnBack: {
    height: 25,
    width: 29,
    marginLeft: 32,
    marginTop: 51,
  },
  btnBackls: {
    height: 25,
    width: 29,
    marginLeft: 90,
    marginTop: 31,
  },
  title: {
    fontSize: 34,
    fontWeight: '700',
    marginTop: 22,
    marginLeft: 32,
    marginBottom: 12,
    color: Colors.Title,
  },
  titlels: {
    fontSize: 34,
    fontWeight: '700',
    marginTop: 22,
    marginLeft: 90,
    marginBottom: 12,
    color: Colors.Title,
  },
  rowOpts: {
    flexDirection: 'row',
    backgroundColor: Colors.White,
    justifyContent: 'space-around',
    padding: 15,
    marginHorizontal: 30,
    borderWidth: 1,
    borderColor: Colors.White,
    borderColor: 15,
    borderRadius: 20,
    marginTop: 15,
  },
  rowOptsls: {
    flexDirection: 'row',
    backgroundColor: Colors.White,
    justifyContent: 'space-around',
    padding: 15,
    marginHorizontal: 90,
    borderWidth: 1,
    borderColor: Colors.White,
    borderColor: 15,
    borderRadius: 20,
    marginTop: 15,
  },
  optText: {
    color: Colors.OptionText,
    fontWeight: '500',
    fontSize: 15,
    justifyContent: 'center',
    paddingHorizontal: 30,
    alignSelf: 'center',
  },
  active: {
    color: Colors.ReSend,
    fontWeight: '500',
    fontSize: 15,
    justifyContent: 'center',
    paddingHorizontal: 30,
    alignSelf: 'center',
  },
  selected: {
    width: 15,
    height: 15,
    borderWidth: 2,
    marginTop: -8,
    marginLeft: 75,
    backgroundColor: Colors.White,
    borderColor: Colors.White,
    borderColor: 1,
    transform: [{rotate: '45deg'}],
  },
  selectedls: {
    width: 15,
    height: 15,
    borderWidth: 2,
    marginTop: -8,
    marginLeft: 73,
    backgroundColor: Colors.White,
    borderWidth: 1,
    borderColor: Colors.Black,
    borderColor: 1,
    transform: [{rotate: '45deg'}],
  },
  courses: {
    flexDirection: 'column',
    marginLeft: 30,
    marginTop: 25,
    borderWidth: 0.1,
    borderColor: 15,
    borderRadius: 15,
    width: 162,
    height: 210,
  },
  coursesls: {
    flexDirection: 'column',
    marginLeft: 92,
    marginTop: 25,
    borderWidth: 0.1,
    borderColor: 15,
    borderRadius: 15,
    width: 162,
    height: 210,
    justifyContent: 'center',
  },
  courseImg: {
    padding: 32,
    borderTopRightRadius: 15,
    borderTopLeftRadius: 15,
    flexDirection: 'column',
    borderColor: 15,
  },
  cImg: {
    width: 50,
    height: 50,
    marginLeft: 22,
  },
  courseTitle: {
    color: Colors.Title,
    padding: 20,
    backgroundColor: Colors.White,
    borderBottomRightRadius: 15,
    borderBottomLeftRadius: 15,
  },
  courseName: {
    fontSize: 17,
    justifyContent: 'center',
    alignSelf: 'center',
    color: Colors.Title,
    fontWeight: '500',
    letterSpacing: 0.25,
  },
  row: {
    flexDirection: 'row',
  },
  column: {
    flexDirection: 'column',
  },
  lessons: {
    backgroundColor: Colors.White,
    marginHorizontal: 30,
    marginVertical: 3,
    borderWidth: 0.5,
    borderColor: Colors.White,
    borderColor: 15,
    borderRadius: 15,
    marginTop: 20,
  },
  lessonsls: {
    backgroundColor: Colors.White,
    marginHorizontal: 90,
    marginVertical: 3,
    borderWidth: 0.5,
    borderColor: Colors.White,
    borderColor: 15,
    borderRadius: 15,
    marginTop: 20,
  },
  studyn: {
    backgroundColor: Colors.White,
    marginHorizontal: 30,
    marginVertical: 3,
    borderWidth: 0.5,
    borderColor: Colors.White,
    borderColor: 15,
    borderRadius: 15,
    marginTop: 20,
  },
  studynls: {
    backgroundColor: Colors.White,
    marginHorizontal: 90,
    marginVertical: 3,
    borderWidth: 0.5,
    borderColor: Colors.White,
    borderColor: 15,
    borderRadius: 15,
    marginTop: 20,
  },
  lessonName: {
    color: Colors.ReSend,
    fontSize: 13,
    fontWeight: 'bold',
    marginTop: 30,
    marginLeft: 7,
    marginBottom: 25,
    letterSpacing: 0,
    width: 200,
    height: 35,
    justifyContent: 'center',
    alignSelf: 'center',
    alignItems: 'center',
  },
  lessonNamels: {
    color: Colors.ReSend,
    fontSize: 13,
    fontWeight: 'bold',
    marginTop: 36,
    marginLeft: 7,
    marginBottom: 25,
    letterSpacing: 0,
    width: 400,
  },
  lessonNum: {
    color: Colors.LessonNum,
    marginTop: 32.5,
    marginLeft: 10,
    fontSize: 11,
    fontWeight: '300',
  },
  lessonNumls: {
    color: Colors.LessonNum,
    marginTop: 32.5,
    marginLeft: Platform.OS === 'ios' ? 100 : 20,
    fontSize: 11,
    fontWeight: '300',
  },
  chaps: {
    color: Colors.Title,
    fontSize: 20,
    fontWeight: '400',
    marginLeft: 15,
    letterSpacing: 0.15,
    width: 220,
  },
  chapsls: {
    color: Colors.Title,
    fontSize: 20,
    fontWeight: '400',
    marginLeft: 15,
    letterSpacing: 0.15,
    width: 360,
  },
  chapstudyn: {
    color: Colors.Title,
    fontSize: 20,
    fontWeight: '400',
    marginLeft: 15,
    letterSpacing: 0.15,
    width: 220,
    marginBottom: 15,
  },
  chapstudynls: {
    color: Colors.Title,
    fontSize: 20,
    fontWeight: '400',
    marginLeft: 15,
    letterSpacing: 0.15,
    width: 500,
    marginBottom: 15,
  },
  summary: {
    color: Colors.Summary,
    fontSize: 16,
    fontWeight: '300',
    marginTop: 5,
    marginLeft: 15,
    letterSpacing: 0.3,
    marginBottom: 28,
  },
  line: {
    borderLeftWidth: 0.5,
    borderRightWidth: 0.5,
    marginTop: -15,
    marginBottom: -15,
    height: 48,
    borderColor: Colors.Line,
    width: 138,
    justifyContent: 'center',
  },
  linels: {
    borderLeftWidth: 0.5,
    borderRightWidth: 0.5,
    marginTop: -15,
    marginBottom: -15,
    height: 48,
    borderColor: Colors.Line,
    width: 220,
    justifyContent: 'center',
  },
  progress: {
    marginTop: 27,
    marginLeft: 15,
  },
  tick: {
    marginTop: 2,
    marginLeft: 23,
    color: Colors.Tick,
  },
  dot: {
    marginTop: 5,
    marginLeft: 27,
    marginRight: 5,
    color: Colors.Dot,
  },
  like: {
    position: 'absolute',
    marginTop: 18,
    marginLeft: 290,
    color: Colors.ReSend,
  },
  likels: {
    position: 'absolute',
    marginTop: 18,
    marginLeft: Platform.OS === 'ios' ? 620 : 495,
    color: Colors.ReSend,
  },
  progressLine: {
    borderLeftWidth: 2,
    height: 38,
    borderColor: Colors.TextInp,
    marginLeft: 31.5,
    marginTop: -13,
  },
  progressLinels: {
    borderLeftWidth: 2,
    height: 30,
    borderColor: Colors.TextInp,
    marginLeft: 31.5,
    marginTop: -19,
  },

  likedCName: {
    color: Colors.ReSend,
    fontSize: 15,
    fontWeight: 'bold',
    marginTop: 20,
    marginLeft: 20,
    letterSpacing: 0,
    width: 280,
  },
  likedchap: {
    color: Colors.Title,
    fontSize: 18,
    fontWeight: '500',
    marginTop: 12,
    marginLeft: 20,
    marginBottom: 20,
    letterSpacing: 0,
    width: 299,
  },
  clear: {
    color: Colors.ReSend,
    fontSize: 13,
    fontWeight: '600',
    textDecorationLine: 'underline',
    justifyContent: 'flex-end',
    alignSelf: 'flex-end',
    marginTop: 12,
    marginRight: 40,
  },
  clearls: {
    color: Colors.ReSend,
    fontSize: 13,
    fontWeight: '600',
    textDecorationLine: 'underline',
    justifyContent: 'flex-end',
    alignSelf: 'flex-end',
    marginTop: 12,
    marginRight: 100,
  },
  empty: {
    color: Colors.ReSend,
    fontSize: 28,
    fontWeight: 'bold',
    justifyContent: 'center',
    alignSelf: 'center',
    marginTop: 220,
  },
  emptyStud: {
    color: Colors.EmptyList,
    fontSize: 24,
    fontWeight: '400',
    fontStyle: 'italic',
    justifyContent: 'center',
    alignSelf: 'center',
    marginTop: 20,
  },
  emptyStudls: {
    color: Colors.EmptyList,
    fontSize: 24,
    fontWeight: '400',
    fontStyle: 'italic',
    justifyContent: 'center',
    alignSelf: 'center',
    marginTop: 10,
  },
  bottom: {
    marginBottom: 20,
  },
  book: {
    width: 180,
    height: 180,
    borderWidth: 1,
    borderRadius: 40,
    borderColor: Colors.Tansparent,
    borderColor: 0,
    alignSelf: 'center',
    marginTop: 80,
  },
  bookls: {
    width: 180,
    height: 180,
    borderWidth: 1,
    borderRadius: 40,
    borderColor: Colors.Tansparent,
    borderColor: 0,
    alignSelf: 'center',
    marginTop: 20,
  },
  noLike: {
    color: Colors.NoLike,
    marginTop: 120,
    alignSelf: 'center',
  },
  noLikels: {
    color: Colors.NoLike,
    marginTop: 30,
    alignSelf: 'center',
  },
});

export default SubjectDetails;
