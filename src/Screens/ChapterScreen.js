import React, {useState, useEffect, useContext} from 'react';
import axios from 'axios';
import {
  Text,
  Image,
  View,
  StyleSheet,
  TouchableOpacity,
  Alert,
  ScrollView,
  Platform,
} from 'react-native';
import {Colors} from '../assets/Colors/index';
import {Strings} from '../assets/Strings/index';
import {Images} from '../assets/Images/index';
import useOrientation from '../hooks/useOrientation';
import Icon from 'react-native-vector-icons/Ionicons';
import YoutubePlayer from 'react-native-youtube-iframe';
import Modal from 'react-native-modal';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useDispatch} from 'react-redux';
import {ActivityIndicator} from 'react-native-paper';

const ChapterScreen = ({navigation, route}) => {
  const dispatch = useDispatch();
  const orientation = useOrientation();
  const token = route?.params.token;
  const subject = route?.params.subject;
  const chapterId = route?.params.chapterId;
  const chapterNumber = route?.params.chapterNumber;
  const chapterName = route?.params.chapterName;
  const cid = route?.params.cid;
  const cName = route?.params.cName;
  const lessonNumber = route?.params.lessonNumber;
  const lessonName = route?.params.lessonName;
  const lessonId = route?.params.lessonId;
  const [likedItems, setLikedItems] = useState([]);
  const lessonChap = [chapterId, chapterName, lessonName, subject];
  const [modalVisible, setModalVisible] = useState(false);
  const [contents, setContents] = useState([]);
  const [page, setPage] = useState(0);
  const [selectPage, setSelectPage] = useState();
  const [noSelect1, setnoIsSelect1] = useState(false);
  const [noSelect2, setnoIsSelect2] = useState(false);
  const [noSelect3, setnoIsSelect3] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const baseUrl = 'https://elearningapp-api.herokuapp.com';

  // api to get the content of the given chapter
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
      setIsLoading(false);
      setContents(response.data.data);
    } catch (err) {
      console.log(err);
    }
  };
  useEffect(() => {
    getContent(chapterId);
  }, [page]);

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

  useEffect(() => {
    const retrievelikes = async () => {
      try {
        const currentItems = await AsyncStorage.getItem('liked');
        let json = currentItems === null ? [] : JSON.parse(currentItems);
        setLikedItems(json);
      } catch (e) {
        console.log(e);
      }
    };
    retrievelikes();
  });

  //This is for storing liked list
  const persistLikedlist = async newItem => {
    try {
      const currentItems = await AsyncStorage.getItem('liked');

      let json = currentItems === null ? [] : JSON.parse(currentItems);
      if (json.toString().includes(newItem.toString()) === false) {
        json.push(newItem);
        setLikedItems(json);
      } else {
        Alert.alert('', 'Already added in Likes');
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
      {isLoading ? (
        <View style={styles.loading}>
          <ActivityIndicator />
        </View>
      ) : (
        <View style={styles.container}>
          <View
            style={
              orientation.isPortrait
                ? styles.TopContainer
                : styles.TopContainerls
            }>
            <View>
              {/* navigating back to course screen  */}
              <TouchableOpacity
                onPress={() =>
                  navigation.navigate('CourseScreen', {
                    token: token,
                    lName: lessonName,
                    lessonNumber: lessonNumber,
                    lId: lessonId,
                    cId: cid,
                    cName: cName,
                  })
                }>
                <Image
                  source={require('../Images/Profile/Results/back.png')}
                  style={styles.touchableback}
                />
              </TouchableOpacity>
            </View>
            <View style={styles.topLeft}>
              {likedItems.toString().includes(lessonChap.toString()) ? (
                <Icon name="heart" size={28} style={styles.liked} />
              ) : (
                <TouchableOpacity onPress={() => addToLikedList(lessonChap)}>
                  <Image
                    source={require('../Images/Subject/heart.png')}
                    style={styles.touchableheart}
                  />
                </TouchableOpacity>
              )}

              <TouchableOpacity onPress={() => setModalVisible(true)}>
                <Image
                  source={require('../Images/Subject/pages.png')}
                  style={styles.touchablepages}
                />
              </TouchableOpacity>

              {/* pages modal */}
              <Modal isVisible={modalVisible}>
                <View
                  style={
                    orientation.isPortrait
                      ? styles.ModalMainContainer
                      : styles.ModalMainContainerls
                  }>
                  <View style={styles.ModalTopContainer}>
                    <View style={styles.ModalContainer}></View>
                    <Text style={styles.ModalgoToPageText}>
                      {Strings.GoToPage}
                    </Text>
                    <Text style={styles.ModalgoToPageText1}>
                      {Strings.SelectPage}
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
                    <Text style={styles.ModalPageText}>{Strings.of3Pages}</Text>
                  </View>

                  <View style={styles.ModalBottomContainer}>
                    <TouchableOpacity
                      style={
                        orientation.isPortrait
                          ? styles.ModalNoContainer
                          : styles.ModalNoContainerls
                      }
                      onPress={() => setModalVisible(false)}>
                      <Text style={styles.ModalNoText}>{Strings.Cancel}</Text>
                    </TouchableOpacity>
                    {(noSelect1 || noSelect2 || noSelect3) === true ? (
                      <TouchableOpacity
                        style={
                          orientation.isPortrait
                            ? styles.ModalYesContainer
                            : styles.ModalYesContainerls
                        }
                        onPress={submitPage}>
                        <View style={styles.ModalYesView}>
                          <Text style={styles.ModalYesText}>{Strings.Ok}</Text>
                          <Image
                            source={require('../Images/TestPage/yesArrow.png')}
                            style={styles.ModalYesImg}
                          />
                        </View>
                      </TouchableOpacity>
                    ) : (
                      <TouchableOpacity
                        activeOpacity={1}
                        style={
                          orientation.isPortrait
                            ? styles.ModalYesContainer
                            : styles.ModalYesContainerls
                        }>
                        <View style={styles.ModalYesView}>
                          <Text style={styles.ModalYesText}>{Strings.Ok}</Text>
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

          <View style={orientation.isPortrait ? styles.body : styles.bodyls}>
            <Text style={styles.name}>{chapterName}</Text>

            <ScrollView showsVerticalScrollIndicator={false}>
              {contents[0]?.videoUrl ? (
                <View
                  style={
                    orientation.isPortrait
                      ? styles.contentimg
                      : styles.contentimgls
                  }>
                  <YoutubePlayer
                    height={300}
                    play={false}
                    videoId={contents[0]?.videoUrl}
                  />
                </View>
              ) : null}

              {contents[0]?.imageUrl ? (
                <Image
                  source={{uri: contents[0]?.imageUrl}}
                  style={
                    orientation.isPortrait
                      ? styles.contentimg
                      : styles.contentimgls
                  }
                />
              ) : null}

              <Text
                style={
                  orientation.isPortrait ? styles.content : styles.contentls
                }>
                {contents[0]?.content}
              </Text>
            </ScrollView>
          </View>
          <View
            style={orientation.isPortrait ? styles.bottom : styles.bottomls}>
            <View
              style={
                orientation.isPortrait ? styles.bottomLeft : styles.bottomLeftls
              }>
              <Text style={styles.bottomChapter}>
                C{chapterNumber}:{chapterName}
              </Text>

              <Text style={styles.bottomPage}>
                {page + 1} {Strings.of3Pages}
              </Text>
            </View>
            <View
              style={
                orientation.isPortrait
                  ? styles.bottomRight
                  : styles.bottomRightls
              }>
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
      )}
    </View>
  );
};
export default ChapterScreen;

const styles = StyleSheet.create({
  container: {
    height: '100%',
    width: '100%',
    backgroundColor: Colors.BgGrey,
  },
  TopContainer: {
    marginTop: 51,
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginHorizontal: 30,
  },
  TopContainerls: {
    marginTop: 30,
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginHorizontal: 90,
  },

  body: {
    marginTop: 40,
  },
  bodyls: {
    marginTop: 10,
  },
  name: {
    color: Colors.ChapNameColor,
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
  contentimgls: {
    height: 250,
    width: 400,
    marginHorizontal: 220,
    borderRadius: 15,
    marginTop: 30,
  },
  content: {
    marginTop: 30,
    marginHorizontal: 32,
    marginBottom: 200,
    textAlign: 'justify',
    color: Colors.ChapContentColor,
    fontSize: 18,
    lineHeight: 26,
    letterSpacing: 0,
  },
  contentls: {
    marginTop: 30,
    marginHorizontal: 90,
    marginBottom: 200,
    textAlign: 'justify',
    color: Colors.ChapContentColor,
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
  },
  topLeft: {
    flexDirection: 'row',
  },

  bottom: {
    backgroundColor: Colors.White,
    width: 390,
    height: 90,
    justifyContent: 'space-between',
    position: 'absolute',
    bottom: 0,
    flexDirection: 'row',
  },
  bottomls: {
    backgroundColor: Colors.White,
    width: Platform.OS == 'ios' ? 845 : 780,
    height: 70,
    justifyContent: 'space-between',
    position: 'absolute',
    bottom: 0,
    flexDirection: 'row',
  },
  bottomLeft: {
    marginLeft: 30,
    marginTop: 14,
  },
  bottomLeftls: {
    marginLeft: 90,
    marginTop: 14,
  },
  bottomRight: {
    flexDirection: 'row',
    marginRight: 30,
    alignItems: 'center',
  },

  bottomRightls: {
    flexDirection: 'row',
    marginRight: 90,
    alignItems: 'center',
  },
  bottomChapter: {
    color: Colors.Black,
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
    color: Colors.BottomPage,
    fontWeight: '300',
    fontSize: 16,
    lineHeight: 26,
    letterSpacing: 0,
  },

  ModalMainContainer: {
    backgroundColor: Colors.White,
    position: 'absolute',
    bottom: -18,
    height: Platform.OS == 'ios' ? '45%' : '50%',
    width: '100%',
    marginRight: 20,
    borderRadius: 15,
  },
  ModalMainContainerls: {
    backgroundColor: Colors.White,
    position: 'absolute',
    bottom: Platform.OS == 'ios' ? -35 : -35,
    height: Platform.OS == 'ios' ? '110%' : '120%',
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
    backgroundColor: Colors.ModalContainerColor,
    marginTop: 15,
  },
  ModalgoToPageText: {
    marginTop: 25,
    fontSize: 22,
    fontWeight: '500',
    lineHeight: 27,
    letterSpacing: 0,
    fontWeight: '500',
    color: Colors.ChapNameColor,
  },
  ModalgoToPageText1: {
    color: Colors.BottomPage,
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
    color: Colors.ModalInactivePageNo,
    textAlign: 'center',
    marginHorizontal: 30,
    fontWeight: '500',
  },
  activeModalPageNo: {
    color: Colors.ReSend,
    fontSize: 45,
    textAlign: 'center',
    fontWeight: '600',
    marginHorizontal: 30,
  },
  ModalPageText: {
    color: Colors.BottomPage,
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
    borderColor: Colors.ReSend,
    alignItems: 'center',
    justifyContent: 'center',
  },
  ModalNoContainerls: {
    height: 55,
    width: 250,
    marginTop: Platform.OS === 'ios' ? -10 : -25,
    borderWidth: 2,
    borderRadius: 13,
    marginLeft: Platform.OS == 'ios' ? 90 : 70,
    borderColor: Colors.ReSend,
    alignItems: 'center',
    justifyContent: 'center',
  },
  ModalNoText: {
    color: Colors.ReSend,
    fontSize: 20,
  },
  ModalYesContainer: {
    height: 55,
    width: 125,
    borderWidth: 2,
    borderRadius: 13,
    borderColor: Colors.ReSend,
    marginLeft: 31,
    backgroundColor: Colors.ReSend,
  },
  ModalYesContainerls: {
    height: 55,
    width: 250,
    marginTop: Platform.OS === 'ios' ? -10 : -25,
    borderWidth: 2,
    borderRadius: 13,
    borderColor: Colors.ReSend,
    marginLeft: Platform.OS == 'ios' ? 90 : 60,
    backgroundColor: Colors.ReSend,
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
    color: Colors.White,
  },
  ModalYesImg: {
    width: 24,
    height: 24,
  },
  liked: {
    color: Colors.Liked,
    height: 25,
    width: 26,
    marginRight: 40,
    marginTop: -3,
  },
  loading: {
    marginTop: 200,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
