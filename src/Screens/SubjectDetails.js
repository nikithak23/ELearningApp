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
  ActivityIndicator
} from 'react-native';
import {useFocusEffect} from '@react-navigation/core';
import CircularProgress from 'react-native-circular-progress-indicator';
import Icon from 'react-native-vector-icons/Ionicons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useDispatch } from 'react-redux';

const sub1 = require('../Images/Subject/sub1.png')
const sub2 = require('../Images/Subject/sub2.png')
const subImg = [sub1, sub2];
const bgImg = ['#d5f1e5', '#ffebb5']
const Options = ['ALL', 'STUDYING', 'LIKED'];

const SubjectDetails = ({navigation, route}) => {
  const baseUrl = 'https://elearningapp-api.herokuapp.com';
  const subject = route?.params.subject;
  const token = route?.params.token;
  const subId = route?.params.id;
  const btnBack = require('../Images/Notification/btnback.png');
  const [selected, setSelected] = useState('ALL');
  const [courseTitle, setCourseTitle] = useState([]);
  const [courseId, setCourseId] = useState('0');
  const [LessonTitle, setLessonTitle] = useState([]);
  const [selectedCourse, setSelectedCourse] = useState();
  const [chapters, setChapters] = useState([]);
  const [courseName, setCourseName] = useState('');
  const [lId, setLId] = useState('0');
  const [lName, setLName] = useState('');
  const [lSummary, setLSummary] = useState('');
  const [loading, setLoading] = useState(true)
  const [empty, setEmpty] = useState(false);
  const [likedList, setLikedList] = useState(null);
  const dispatch = useDispatch();


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
      console.log('lesson', LessonTitle);
    } catch (err) {
      console.log(err);
    }
  };

  // const getChaps = async (id) => {
  //   try {
  //     const response = await axios.get(
  //       `${baseUrl}/subject/get/chapters/${id}`,
  //       {
  //         headers: {
  //           Authorization: `Bearer ${token}`,
  //         },
  //       },
  //     );
  //     setChapters(response.data.data);
  //     console.log(chapters[0].lessonId)
  //     console.log('ccc',chapters)
  //     setLoading(false)
  //   } catch (err) {
  //     console.log(err);
  //   }
  // };

  useEffect(() => {
    getCourses();
  }, []);
  useFocusEffect(
    React.useCallback(() => {
      getLessons();
    }, [courseId]),
  );
  // useEffect(() => {
  //   getLessons();
  // }, [courseId]);
  // useFocusEffect(
  //   React.useCallback(()=>{
  //     getChaps(lId)
  //   },[lId])
  // )

  const OnPressCourse = item => {
    setCourseId(item.courseId);
    setCourseName(item.courseName);
    return setSelectedCourse(item);
  };
  const renderCourse = ({item, index}) => {
    return (
      <>
        <TouchableOpacity
          style={styles.courses}
          onPress={() => OnPressCourse(item)}>
          <View style={[styles.courseImg, {backgroundColor: bgImg[index]}]}>
            <Image source={subImg[index]} style={styles.cImg} />
          </View>
          <View style={styles.courseTitle}>
            <Text style={styles.courseName}>{item.courseName}</Text>
          </View>
        </TouchableOpacity>
        {selectedCourse === item && (
          <View style= {styles.selected}></View>
        )}
      </>
    );
  };

  // const renderChap = ({item, index}) => {
  //   {
  //     if(loading === true){
  //       return(
  //         <> 
  //         </>
  //       )
  //     }else{
  //       return (
  //         <TouchableOpacity activeOpacity={0.8} style={styles.row} onPress={
  //       ()=>{
  //         navigation.navigate('CourseScreen', {
  //           lId: lId,
  //           lName: lName,
  //           token: token,
  //           cId: courseId,
  //           cName: courseName,
  //           lSummary: lSummary,
  //         })
  //       }
  //     }>
  //       <View style={styles.column}>
  //         <View style={styles.progressLine}></View>
  //         <Icon name="checkmark-sharp" size={21} style={styles.tick} />
  //       </View>
  //       <View style={styles.column}>
  //         <Text style={styles.chaps}>
  //           {item.chapterName}
  //         </Text>
  //         <Text style={styles.summary}>{item.summary}</Text>
  //       </View>
  //     </TouchableOpacity>
  //       )
  //     }
  //   }
      
  // };
  
  // const onPressLesson = (item) => {
  //   setLId(item.lessonId),
  //   console.log(lId)
  //   setLName(item.lessonName), 
  //   setLSummary(item.summary), 
  //   getChaps(lId),
  //   setLoading(true)
  //  }
  const renderLesson = ({item, index}) => {
    return (
      <TouchableOpacity
        activeOpacity={0.7}
        style={styles.lessons}
        onPress={() => {
          navigation.navigate('CourseScreen', {
            lId: item.lessonId,
            lName: item.lessonName,
            token: token,
            cId: courseId,
            cName: courseName,
            lessonNumber: item.lessonNumber
          })
        }}>
        <View style={styles.row}>
          <View style={styles.progress}>
            <CircularProgress
              value={60}
              radius={17}
              duration={1000}
              textColor={'transparent'}
              maxValue={100}
              activeStrokeWidth={1.5}
              inActiveStrokeWidth={2.5}
              inActiveStrokeColor={'#999'}
              inActiveStrokeOpacity={0.35}
            />
          </View>
          <View style={styles.row}>
            <Text style={styles.lessonName}>
              {item.lessonName.toUpperCase()}
            </Text>
            <Text style={styles.lessonNum}>Lesson {item.lessonNumber}</Text>
          </View>
        </View>
        <View style={styles.row}>
          <View style={styles.column}>
            <View style={styles.progressLine}></View>
            <Icon name="checkmark-sharp" size={21} style={styles.tick} />
          </View>
          <View style={styles.column}>
            <Text style={styles.chaps}>{item.chapter1}</Text>
            <Text style={styles.summary}>{item.summary1}</Text>
          </View>
        </View>
        {item.chapter2? <View style={styles.row}>
          <View style={styles.column}>
            <View style={styles.progressLine}></View>
            <Icon name="checkmark-sharp" size={21} style={styles.tick} />
          </View>
          <View style={styles.column}>
            <Text style={styles.chaps}>{item.chapter2}</Text>
            <Text style={styles.summary}>{item.summary2}</Text>
          </View>
        </View> : null}
        {item.chapter3? <View style={styles.row}>
          <View style={styles.column}>
            <View style={styles.progressLine}></View>
            <Icon name="checkmark-sharp" size={21} style={styles.tick} />
          </View>
          <View style={styles.column}>
            <Text style={styles.chaps}>{item.chapter3}</Text>
            <Text style={styles.summary}>{item.summary3}</Text>
          </View>
        </View> : null}

        {/* {console.log(item.lessonId, chapters[index + 1]?.lessonId, index)}
        {item.lessonId === lId && (
          <FlatList
            data={chapters}
            renderItem={renderChap}
            keyExtractor={(item, index) => index.toString()}
          />
        )} */}
      </TouchableOpacity>
    );
  };

  //////////////////////////get liked list///////////////////////////
  
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
      console.log('likeddd', likedList)
      likedList.length === 0 ? setEmpty(true) : null;
    }
    dispatch({
      type: 'UPDATE_LIKED_LIST',
      items: likedList,
    });
  };

  const removeLiked = async () => {
    try {
      await AsyncStorage.removeItem('liked');
      setLikedList([])
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
      await AsyncStorage.setItem(
        'liked',
        JSON.stringify(deleteLikedListItem),
      );
      if (deleteLikedListItem.length === 0) {
        setEmpty(true);
      }
    } catch (err) {
      console.log(err);
    }
  };

  const renderLikedList = ({item}) => {
    return (
      <View style={styles.lessons}>
        <View style={styles.row}>
          <Text style={styles.likedCName}>{item[2]}</Text>
          <Icon onPress={()=>removeItem(item)} name="heart" size={21} style={styles.like} />
        </View>
        <Text style={styles.likedchap}>{item[1]}</Text>
      </View>
    );
  };

  const renderAll = () => {
    return (
      <View style={styles.container}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Image source={btnBack} style={styles.btnBack} />
        </TouchableOpacity>
        <Text style={styles.title}>{subject}</Text>
        <View style={styles.rowOpts}>
          {Options.map((opt, index) => (
            <View
              key={index.toString()}
              style={opt === 'STUDYING' ? styles.line : null}>
              <TouchableOpacity onPress={() => setSelected(opt)}>
                <Text style={opt === selected ? styles.active : styles.optText}>
                  {Options[index]}
                </Text>
              </TouchableOpacity>
            </View>
          ))}
        </View>
        {selected === Options[0] ? (
          <>
            <View>
              <FlatList
                data={courseTitle}
                renderItem={renderCourse}
                keyExtractor={item => item.courseId}
                horizontal={true}
                showsHorizontalScrollIndicator={false}
              />
            </View>
            <>
              <FlatList
                data={LessonTitle}
                renderItem={renderLesson}
                keyExtractor={item => item.lessonId}
                showsVerticalScrollIndicator={false}
              />
            </>
          </>
        ) : selected === Options[1] ? (
          renderStudying()
        ) : (
          renderLiked()
        )}
      </View>
    );
  }
  const renderStudying=() => {
    return(
      <View>
        <Text>List of Studyng</Text>
      </View>
    )
  } 

  const renderLiked = () => {
    console.log('this is liked list ===> ',likedList)
    if(empty){
      return(
        <>
          <Text style={styles.empty}>No Likes</Text>
        </>
      )
    }else{
      return (
        <View>
          <TouchableOpacity onPress={() => removeLiked()}>
            <Text style={styles.clear}>Clear All</Text>
          </TouchableOpacity>
          <FlatList
            data={likedList}
            renderItem={renderLikedList}
            keyExtractor={(item, index) => index.toString()}
            showsVerticalScrollIndicator={false}
          />
        </View>
      );
    }
  }; 
  return(
    renderAll()
  )
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f6f8fa',
  },
  btnBack: {
    height: 25,
    width: 29,
    marginLeft: 32,
    marginTop: 51,
  },
  title: {
    fontSize: 34,
    fontWeight: '700',
    marginTop: 22,
    marginLeft: 32,
    marginBottom: 12,
    color: '#292929',
  },
  rowOpts: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    justifyContent: 'space-around',
    padding: 15,
    marginHorizontal: 30,
    borderWidth: 1,
    borderColor: '#fff',
    borderColor: 15,
    borderRadius: 20,
    marginTop: 15,
  },
  optText: {
    color: '#aaa',
    fontWeight: '500',
    fontSize: 15,
    justifyContent: 'center',
    paddingHorizontal: 30,
  },
  active: {
    color: '#1b7ced',
    fontWeight: '500',
    fontSize: 15,
    justifyContent: 'center',
    paddingHorizontal: 30,
  },
  selected: {
    width: 15,
    height: 15,
    borderWidth: 2,
    marginTop: 211,
    marginLeft: -85,
    marginHorizontal: 70,
    backgroundColor: '#fff',
    borderColor: '#fff',
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
    height: 192,
  },
  courseImg: {
    //backgroundColor: '#ffa4a4',
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
    color: '#292929',
    padding: 20,
    backgroundColor: '#fff',
    borderBottomRightRadius: 15,
    borderBottomLeftRadius: 15,
  },
  courseName: {
    fontSize: 16,
    justifyContent: 'center',
    alignSelf: 'center',
    color: '#292929',
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
    backgroundColor: '#fff',
    marginHorizontal: 30,
    marginVertical: 3,
    borderWidth: 0.5,
    borderColor: '#fff',
    borderColor: 15,
    borderRadius: 15,
    marginTop: 20,
  },
  lessonName: {
    color: '#1b7ced',
    fontSize: 13,
    fontWeight: 'bold',
    marginTop: 30,
    marginLeft: 7,
    marginBottom: 33,
    letterSpacing: 0,
    width: 200,
  },
  lessonNum: {
    color: '#888',
    marginTop: 32.5,
    marginLeft: 10,
    fontSize: 11,
    fontWeight: '300',
  },
  chaps: {
    color: '#292929',
    fontSize: 20,
    fontWeight: '400',
    marginLeft: 15,
    letterSpacing: 0.15,
    width: 220,
  },
  summary: {
    color: '#999',
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
    borderColor: '#ddd',
    width: 138,
    justifyContent: 'center',
  },
  // selectedCourse: {
  //   color: '#fff',
  //   fontSize: 29,
  //   fontWeight: '900',
  //   shadowOpacity: 1,
  //   shadowColor: '#fff',
  //   marginHorizontal: 30,
  //   marginLeft: -85,
  //   marginTop: 180,
  //   width: 50,
  // },
  progress: {
    marginTop: 20,
    marginLeft: 15,
  },
  tick: {
    marginTop: 2,
    marginLeft: 23,
    color: '#03c04a',
  },
  dot: {
    marginTop: 5,
    marginLeft: 27,
    marginRight: 5,
    color: '#ccc',
  },
  like: {
    position: 'absolute',
    marginTop: 18,
    marginLeft: 290,
    color: '#1b7ced',
  },
  progressLine: {
    borderLeftWidth: 2,
    height: 40,
    borderColor: '#eee',
    marginLeft: 31.5,
    marginTop: -26,
  },
  likedCName: {
    color: '#1b7ced',
    fontSize: 15,
    fontWeight: 'bold',
    marginTop: 20,
    marginLeft: 20,
    letterSpacing: 0,
    width: 280,
  },
  likedchap: {
    color: '#292929',
    fontSize: 18,
    fontWeight: '500',
    marginTop: 12,
    marginLeft: 20,
    marginBottom: 20,
    letterSpacing: 0,
    width: 299,
  },
  clear: {
    color: '#1b7ced',
    fontSize: 13,
    fontWeight: '600',
    textDecorationLine: 'underline',
    justifyContent: 'flex-end',
    alignSelf: 'flex-end',
    marginTop: 12,
    marginRight: 40,
  },
  empty: {
    color: '#1b7ced',
    fontSize:28,
    fontWeight: 'bold',
    justifyContent: 'center',
    alignSelf: 'center',
    marginTop: 220
  }
});

export default SubjectDetails;
