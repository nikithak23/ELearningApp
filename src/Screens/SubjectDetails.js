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
} from 'react-native';
import CircularProgress from 'react-native-circular-progress-indicator';
import Icon from 'react-native-vector-icons/Ionicons';

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
  const [lessonId, setLessonId] = useState('0')
  const [selectedCourse, setSelectedCourse] = useState();
  const [chapters, setChapters] = useState([]);
  const [courseName, setCourseName] = useState('')
  const trial = ['abcd','efgh','ijkl']

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
      //console.log('course', courseTitle);
      // getLessons();
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
      // getChaps();
    } catch (err) {
      console.log(err);
    }
  };

  const getChaps = async (id) => {
    try {
      const response = await axios.get(`${baseUrl}/subject/get/chapters/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      // response.data.data.map((el)=>{
      //   chapters.push(el.chapterName);
      //   console.log('chappppss',chapters)
      //})
      setChapters(response.data.data);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getCourses();
  }, []);
  useEffect(() => {
    getLessons();
  }, [courseId]);
  useEffect(()=>{
    getChaps(lessonId);
  },[lessonId])
  

  const OnPressCourse = item => {
    setCourseId(item.courseId);
    setCourseName(item.courseName);
    return setSelectedCourse(item);
  };
  const renderCourse = ({item}) => {
    return (
      <>
        <TouchableOpacity
          style={styles.courses}
          onPress={() => OnPressCourse(item)}>
          <View style={styles.courseImg}>
            <Text>Intro to Bio imhg</Text>
          </View>
          <View style={styles.courseTitle}>
            <Text style={styles.courseName}>{item.courseName}</Text>
          </View>
        </TouchableOpacity>
        {selectedCourse === item && (
          <Text style={styles.selectedCourse}>v</Text>
        )}
      </>
    );
  };

  const renderChap = ({item,index}) => {
    // console.log(index,lessonId, LessonTitle.lessonId)
    // //setLessonId(index)
    // return (
    //   <View style={styles.row}>
    //     <View style={styles.column}>
    //       <View style={styles.progressLine}></View>
    //       <Icon name="checkmark-sharp" size={21} style={styles.tick} />
    //     </View>
    //     <View style={styles.column}>
    //       <Text style={styles.chaps}>
    //         {/* {LessonTitle.map((elem)=>{
    //           <>
    //           {setLessonId(elem.lessonId)}
    //           {console.log(elem.lessonId, item.lessonId,item)}
    //           {elem.lessonId === item.lessonId && item.chapterName}
    //           </>
    //         })} */}
    //         {item.chapterName}
    //         {/* {item.lessonId === lessonId && item.chapterName} */}
    //       </Text>
    //       <Text style={styles.summary}>Classes and sources</Text>
    //     </View>
    //   </View>
    // );
    return(
      <View>
        <Text>{item}</Text>
      </View>
    )
  };

  const renderLesson = ({item,index}) => {
    // console.log('iiiii', index+1, lessonId)
    //setLessonId(index)
    return (
      <TouchableOpacity
        style={styles.lessons}
        onPress={() => navigation.navigate('CourseScreen',{lId: item.lessonId, token: token, cId: courseId, cName: courseName})}>
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
            <Text style={styles.lessonNum}>Lesson {item.lessonId}</Text>
          </View>
        </View>

        {/* <View style={styles.row}>
          <View style={styles.column}>
            <View style={styles.progressLine}></View>
            <Icon name="ellipse" size={12} style={styles.dot} />
          </View>
          <View style={styles.column}>
            <Text style={styles.chaps}>Balanced Diet</Text>
            <Text style={styles.summary}>Sources of food substances</Text>
          </View>
        </View> */}

        <FlatList
          data={trial}
          renderItem={renderChap}
          keyExtractor={(item,index) => index.toString()}
        />
      </TouchableOpacity>
    );
  };

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
    </View>
  );
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
  courses: {
    flexDirection: 'column',
    marginLeft: 30,
    marginTop: 25,
    borderWidth: 0.1,
    borderColor: 15,
    borderRadius: 15,
    width: 160,
    height: 175,
  },
  courseImg: {
    backgroundColor: '#ffa4a4',
    padding: 30,
    borderTopRightRadius: 15,
    borderTopLeftRadius: 15,
    flexDirection: 'column',
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
    width: 220
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
  selectedCourse: {
    color: '#fff',
    fontSize: 29,
    fontWeight: '900',
    shadowOpacity: 1,
    shadowColor: '#fff',
    marginHorizontal: 30,
    marginLeft: -85,
    marginTop: 180,
    width: 50,
  },
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
  progressLine: {
    borderLeftWidth: 2,
    height: 40,
    borderColor: '#eee',
    marginLeft: 31.5,
    marginTop: -26,
  },
});

export default SubjectDetails;
