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
// import VideoPlayer from 'react-native-video-player';
import Video from 'react-native-video';
import Modal from 'react-native-modal';
import AsyncStorage from '@react-native-async-storage/async-storage';

import {ScrollView} from 'react-native-gesture-handler';
import {useDispatch} from 'react-redux';

const ChapterScreen = ({navigation, route}) => {
  const token = route?.params.token;
  const chapterId = route?.params.chapterId;
  const chapterNumber = route?.params.chapterNumber;
  const chapterName = route?.params.chapterName;
  const dispatch = useDispatch();
  const [likedItems, setLikedItems] = useState([]);
  const lessonName = route?.params.lessonName;
  const lessonId = route?.params.lessonId;
  const lessonChap = [chapterId, chapterName, lessonName];
  const [modalVisible, setModalVisible] = useState(false);
  const videoUrl = route?.params.videoUrl;
  console.log(chapterName);
  console.log(chapterId);
  console.log('llll', lessonName);
  const [contents, setContents] = useState([]);
  const [page, setPage] = useState(0);
  const [selectPage, setSelectPage] = useState();
  const [noSelect1, setnoIsSelect1] = useState(false);
  const [noSelect2, setnoIsSelect2] = useState(false);
  const [noSelect3, setnoIsSelect3] = useState(false);

  const baseUrl = 'https://elearningapp-api.herokuapp.com';

  const getContent = async chapterId => {
    try {
      const response = await axios.get(
        `${baseUrl}/subject/get/content/${chapterId}?pageSize=1&pageNumber=${page}`,
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
  }, [page]);
  console.log('hlo', contents);
  // console.log('conid', contents[0].contentId);
  console.log('likerrr', likedItems);

  const incPage = page => {
    if (page < 2) {
      console.log(page);
      setPage(page + 1);
    } else {
      setPage(2);
    }
  };

  const decPage = page => {
    if (page > 0) {
      setPage(page - 1);
    } else {
      setPage(0);
    }
  };

  const select1 = no => {
    setSelectPage(no);
    setnoIsSelect1(true);
    setnoIsSelect2(false);
    setnoIsSelect3(false);
  };
  const select2 = no => {
    setSelectPage(no);
    setnoIsSelect1(false);
    setnoIsSelect2(true);
    setnoIsSelect3(false);
  };
  const select3 = no => {
    setSelectPage(no);
    setnoIsSelect1(false);
    setnoIsSelect2(false);
    setnoIsSelect3(true);
  };
  const submitPage = () => {
    if (selectPage) {
      setPage(selectPage);
    } else {
      setPage(0);
    }
    setnoIsSelect1(false);
    setnoIsSelect2(false);
    setnoIsSelect3(false);
    setModalVisible(false);
  };

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
                lName: lessonName,
                lId: lessonId,
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

          <TouchableOpacity onPress={() => setModalVisible(true)}>
            <Image
              source={require('../Images/Subject/pages.png')}
              style={styles.touchablepages}
            />
          </TouchableOpacity>

          <Modal isVisible={modalVisible}>
            <View style={styles.ModalMainContainer}>
              <View style={styles.ModalTopContainer}>
                <View style={styles.ModalContainer}></View>
                <Text style={styles.ModalgoToPageText}>Go to the page</Text>
                <Text style={styles.ModalgoToPageText1}>
                  Select the page number you want to read
                </Text>
              </View>
              <View style={styles.ModalPageContainer}>
                <View
                  style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}>
                  <TouchableOpacity onPress={() => select1(0)}>
                    <Text
                      style={
                        noSelect1
                          ? styles.activeModalPageNo
                          : page == 0
                          ? [styles.inactiveModalPageNo, {color: 'black'}]
                          : styles.inactiveModalPageNo
                      }>
                      1
                    </Text>
                  </TouchableOpacity>
                  <TouchableOpacity onPress={() => select2(1)}>
                    <Text
                      style={
                        noSelect2
                          ? styles.activeModalPageNo
                          : page == 1
                          ? [styles.inactiveModalPageNo, {color: 'black'}]
                          : styles.inactiveModalPageNo
                      }>
                      2
                    </Text>
                  </TouchableOpacity>
                  <TouchableOpacity onPress={() => select3(2)}>
                    <Text
                      style={
                        noSelect3
                          ? styles.activeModalPageNo
                          : page == 2
                          ? [styles.inactiveModalPageNo, {color: 'black'}]
                          : styles.inactiveModalPageNo
                      }>
                      3
                    </Text>
                  </TouchableOpacity>
                </View>
                <Text style={styles.ModalPageText}>of 3 pages</Text>
              </View>

              <View style={styles.ModalBottomContainer}>
                <TouchableOpacity
                  style={styles.ModalNoContainer}
                  onPress={() => setModalVisible(false)}>
                  <Text style={styles.ModalNoText}>Cancel</Text>
                </TouchableOpacity>
                {(noSelect1 || noSelect2 || noSelect3) === true ? (
                  <TouchableOpacity
                    style={styles.ModalYesContainer}
                    onPress={submitPage}>
                    <View style={styles.ModalYesView}>
                      <Text style={styles.ModalYesText}>Ok</Text>
                      <Image
                        source={require('../Images/TestPage/yesArrow.png')}
                        style={styles.ModalYesImg}
                      />
                    </View>
                  </TouchableOpacity>
                ) : (
                  <TouchableOpacity activeOpacity={1}
                    style={styles.ModalYesContainer}
                    >
                    <View style={styles.ModalYesView}>
                      <Text style={styles.ModalYesText}>Ok</Text>
                      <Image
                        source={require('../Images/TestPage/yesArrow.png')}
                        style={styles.ModalYesImg}
                      />
                    </View>
                  </TouchableOpacity>
                )}
              </View>
            </View>
          </Modal>
        </View>
      </View>

      <View style={styles.body}>
        <Text style={styles.name}>{chapterName}</Text>

        <ScrollView showsVerticalScrollIndicator={false}>
          {contents[0]?.videoUrl ? (
            <Video
              source={{
                uri: contents[0]?.videoUrl,
              }}
              style={{
                width: 390,
                height: 300,
              }}
              paused={true}
              controls={true}
            />
          ) : null}

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
        <View style={styles.bottomLeft}>
          <Text style={styles.bottomChapter}>
            C{chapterNumber}:{chapterName}
          </Text>

          <Text style={styles.bottomPage}>{page + 1} of 3 pages</Text>
          {/* {console.log(page)} */}
        </View>
        <View style={styles.bottomRight}>
          <TouchableOpacity onPress={() => decPage(page)}>
            <Image
              source={require('../Images/TestPage/btnPrevQtn.png')}
              style={
                page == 0 ? [styles.prevQn, {opacity: 0.2}] : styles.prevQn
              }
            />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => incPage(page)}>
            <Image
              source={require('../Images/TestPage/btnNxtQtn.png')}
              style={page == 2 ? {opacity: 0.2} : {opactiy: 1}}
            />
          </TouchableOpacity>
        </View>
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
    marginBottom : 200,
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
    width: 390,
    height: 90,
    justifyContent: 'space-between',
    position: 'absolute',
    bottom: 0,
    flexDirection: 'row',
    // borderWidth: 1,
  },
  bottomLeft: {
    marginLeft: 30,
    marginTop: 14,
  },
  bottomRight: {
    flexDirection: 'row',
    marginRight: 30,
    // justifyContent: 'space-around',
    // alignContent: 'space-around',

    alignItems: 'center',
  },
  bottomChapter: {
    color: '#191B20',
    fontSize: 18,
    fontWeight: '500',
    lineHeight: 26,
    width: 220,
    height: 26,
    letterSpacing: 0,
  },
  prevQn: {
    marginRight: 38,
  },
  bottomPage: {
    // marginTop: 8,
    color: '#595B60',
    fontWeight: '300',
    fontSize: 16,
    lineHeight: 26,
    letterSpacing: 0,
  },

  ModalMainContainer: {
    backgroundColor: 'white',
    position: 'absolute',
    bottom: -18,
    height: '45%',
    width: '100%',
    marginRight: 20,
    borderRadius: 15,
  },
  ModalTopContainer: {
    alignItems: 'center',
  },
  ModalContainer: {
    height: 2,
    borderRadius: 20,
    width: 40.2,
    backgroundColor: 'rgba(151,151,151,0.49)',
    marginTop: 15,
  },
  ModalgoToPageText: {
    marginTop: 25,
    fontSize: 22,
    fontWeight: '500',
    lineHeight: 27,
    letterSpacing: 0,
    fontWeight: '500',
    color: '#191B26',
  },
  ModalgoToPageText1: {
    color: '#595B60',
    fontWeight: '300',
    letterSpacing: 0,
    lineHeight: 28,
    textAlign: 'center',
    fontSize: 20,
    textAlign: 'center',
    width: 250,
    marginTop: 15,
  },
  ModalPageContainer: {
    marginTop: 30,
  },

  inactiveModalPageNo: {
    fontSize: 26,
    color: '#BEBEBE',
    textAlign: 'center',
    marginHorizontal: 30,
    fontWeight: '500',
  },
  activeModalPageNo: {
    color: '#4C93FF',
    fontSize: 45,
    textAlign: 'center',
    fontWeight: '600',

    marginHorizontal: 30,
  },
  ModalPageText: {
    color: '#595B60',
    fontSize: 14,
    fontWeight: '300',
    textAlign: 'center',
    marginTop: 10,
  },
  ModalBottomContainer: {
    flexDirection: 'row',
    marginTop: 30,
  },
  ModalNoContainer: {
    height: 55,
    width: 125,
    borderWidth: 2,
    borderRadius: 13,
    marginLeft: 31,
    borderColor: '#4C93FF',
    alignItems: 'center',
    justifyContent: 'center',
  },
  ModalNoText: {
    color: '#4C93FF',
    fontSize: 20,
  },
  ModalYesContainer: {
    height: 55,
    width: 125,
    borderWidth: 2,
    borderRadius: 13,
    borderColor: '#4C93FF',
    marginLeft: 31,
    backgroundColor: '#4C93FF',
  },
  ModalYesView: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
    marginHorizontal: 10,
  },
  ModalYesText: {
    marginVertical: 14,
    fontSize: 20,
    color: 'white',
  },
  ModalYesImg: {
    width: 24,
    height: 24,
  },
});
