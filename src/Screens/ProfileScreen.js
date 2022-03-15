import AsyncStorage from '@react-native-async-storage/async-storage';
import {useFocusEffect} from '@react-navigation/core';
import axios from 'axios';
import React, {useState, useEffect} from 'react';
import {
  Image,
  Text,
  View,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
  ImageBackground,
  TextInput,
  Platform,
} from 'react-native';
import useOrientation from '../hooks/useOrientation';
import Modal from 'react-native-modal';
import ImagePicker from 'react-native-image-crop-picker';
import {Colors} from '../assets/Colors/index';
import {Strings} from '../assets/Strings/index';

const ProfileScreen = ({navigation, token}) => {
  const [notify, setNotify] = useState('true');
  const orientation = useOrientation();
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isinnerVisible, setIsinnerVissible] = useState(false);
  const [editModalVisible, setEditModalVisible] = useState(false);
  const [ProfileData, setProfileData] = useState([]);
  let name1 = ProfileData.name;
  const [fetchData, setFetchData] = useState(false);
  const [name, setName] = useState(name1);
  const [Results, setResults] = useState([]);
  const [profilePic, setProfilePic] = useState(
    'https://www.pasrc.org/sites/g/files/toruqf431/files/styles/freeform_750w/public/2021-03/blank-profile-picture_0.jpg?itok=iSBmDxc8',
  );
  const baseUrl = 'https://elearningapp-api.herokuapp.com';
  useEffect(() => {
    const retrieveNotif = async () => {
      try {
        const value = await AsyncStorage.getItem('notification');
        if (value !== null) {
          setNotify(value);
        } else {
          setNotify('true');
        }
      } catch (e) {
        console.log(e);
      }

      try {
        const value = await AsyncStorage.getItem('profilePhoto');
        if (value !== null) {
          setProfilePic(value);
        } else {
          setProfilePic(
            'https://www.pasrc.org/sites/g/files/toruqf431/files/styles/freeform_750w/public/2021-03/blank-profile-picture_0.jpg?itok=iSBmDxc8',
          );
        }
      } catch (error) {
        console.log('error storing pic');
      }
    };
    retrieveNotif();
  }, []);

  // Api to get the Results of the user
  const getResults = async () => {
    try {
      const response = await axios.get(`${baseUrl}/subject/get/result`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setResults(response.data.data);
    } catch (err) {
      console.log(err);
    }
  };
  useEffect(() => {
    getResults();
  }, [Results]);

  // Api to get the Profilr data of the user
  const getProfileData = async () => {
    try {
      const response = await axios.get(`${baseUrl}/learn/profile`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setProfileData(response.data.data);
      setFetchData(true);
    } catch (err) {
      console.log(err);
    }
  };
  useFocusEffect(
    React.useCallback(() => {
      getProfileData();
    }, [name]),
  );

  //Api to send the edited data of the user to the database
  const editProfileData = async () => {
    try {
      const response = await axios.put(
        `${baseUrl}/learn/editprofile`,
        {
          name,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );
    } catch (err) {
      console.log(err);
    }
  };

  const editHandleModalTrue = () => {
    setEditModalVisible(true);
  };
  const editHandleModalT = async () => {
    setEditModalVisible(false);
    setIsinnerVissible(false);
    setIsModalVisible(false);
    await editProfileData();
    await getProfileData();
  };
  const editHandleModalF = () => {
    setEditModalVisible(false);
    setIsinnerVissible(false);
    setIsModalVisible(false);
    setName(name1);
  };
  const innerhandleModal = () => {
    setIsinnerVissible(true);
    setIsModalVisible(false);
  };
  const innerhandleModal1 = () => {
    setIsModalVisible(true);
  };
  const goBack = () => {
    setIsinnerVissible(false);
    setIsModalVisible(false);
  };
  const gotoSign = async () => {
    setIsinnerVissible(false);
    setIsModalVisible(false);
    await AsyncStorage.removeItem('loggedIn');
    await AsyncStorage.removeItem('token');
    navigation.navigate('SignIn');
  };
  const gotoResult = () => {
    navigation.navigate('Results', {token: token, Results: Results});
  };
  const changeProfile = async () => {
    ImagePicker.openPicker({
      width: 300,
      height: 400,
      cropping: true,
    }).then(image => {
      setProfilePic(image.path);
      AsyncStorage.setItem('profilePhoto', image.path);
    });
  };
  const notifFalse = async () => {
    setNotify('false');
    try {
      await AsyncStorage.setItem('notification', 'false');
      const response = await axios.delete(
        `${baseUrl}/subject/set/notification/0`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );
      console.log('notiffffff fail', response.data.data);
    } catch (err) {
      console.log(err);
    }
  };

  const notifTrue = async () => {
    setNotify('true');
    try {
      await AsyncStorage.setItem('notification', 'true');
      console.log('storedd');
      const response = await axios.delete(
        `${baseUrl}/subject/set/notification/1`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );
      console.log('notiffffff true', response.data.data);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <ScrollView
      showsVerticalScrollIndicator={false}
      showsHorizontalScrollIndicator={false}
      style={
        orientation.isPortrait ? styles.MainContainer : styles.MainContainerls
      }>
      <TouchableOpacity
        style={orientation.isPortrait ? styles.TopDots : styles.TopDotsls}
        onPress={innerhandleModal}>
        <View>
          <Image
            source={require('../Images/Profile/3dots.png')}
            style={styles.TopDotsImage}
          />
        </View>
      </TouchableOpacity>

      {/* Modal to display the edit and logout text */}
      <Modal
        transparent={true}
        animationType="slide"
        isVisible={isinnerVisible}>
        <View
          style={
            orientation.isPortrait
              ? styles.InModalMainContainer
              : styles.InModalMainContainerls
          }>
          <TouchableOpacity onPress={editHandleModalTrue}>
            <View style={styles.InModalEditContainer}>
              <Image
                source={require('../Images/Profile/edit.png')}
                style={styles.InModalEditImg}
              />
              <Text style={styles.InModalEditText}>{Strings.Edit}</Text>
            </View>
          </TouchableOpacity>

          {/* Modal to display the edit options */}
          <Modal isVisible={editModalVisible}>
            <View
              style={
                orientation.isPortrait
                  ? styles.editModalMainContainer
                  : styles.editModalMainContainerls
              }>
              <View>
                <View style={styles.ModalEditTopContainer}>
                  <TouchableOpacity onPress={editHandleModalF}>
                    <Image
                      source={require('../Images/Profile/wrong.png')}
                      style={styles.ModalTopRight}
                    />
                  </TouchableOpacity>
                  <TouchableOpacity onPress={editHandleModalT}>
                    <Image
                      source={require('../Images/Profile/right.png')}
                      style={styles.ModalTopRight}
                    />
                  </TouchableOpacity>
                </View>
                <View style={styles.ProfilePhotoContainer1}>
                  <TouchableOpacity activeOpacity={0.8} onPress={changeProfile}>
                    <ImageBackground
                      source={{uri: profilePic}}
                      style={styles.ProfilePhotoImage1}
                      imageStyle={{
                        borderRadius: 60,
                        opacity: 0.2,
                      }}>
                      <Image
                        source={require('../Images/Profile/camera.png')}
                        style={styles.cameraImg}
                      />
                    </ImageBackground>
                  </TouchableOpacity>
                </View>
              </View>
              <View style={styles.EditModalBottomContainer}>
                <View style={styles.EditTextInputContainer}>
                  <TextInput
                    placeholder={name1}
                    placeholderTextColor={'black'}
                    value={name}
                    onChangeText={setName}
                    style={styles.input}></TextInput>
                </View>
                <View
                  style={
                    orientation.isPortrait
                      ? styles.EditModalLine
                      : styles.EditModalLinels
                  }></View>
                <Text style={styles.ProfileMail}>{ProfileData.username}</Text>
              </View>
            </View>
          </Modal>

          <TouchableOpacity onPress={innerhandleModal1}>
            <View style={styles.InModalLogoutContainer}>
              <Image
                source={require('../Images/Profile/logout.png')}
                style={styles.InModalLogoutImg}
              />
              <Text style={styles.InModalEditText}>{Strings.LogOut}</Text>
            </View>
          </TouchableOpacity>

          {/* Modal to display the logout options */}
          <Modal isVisible={isModalVisible}>
            <View
              style={
                orientation.isPortrait
                  ? styles.ModalMainContainer
                  : styles.ModalMainContainerls
              }>
              <View style={styles.ModalTopContainer}>
                <View style={styles.ModalContainer}></View>
                <Text style={styles.ModalLogoutText}>{Strings.LogOut}</Text>
                <Text
                  style={
                    orientation.isPortrait
                      ? styles.ModalLogoutText1
                      : styles.ModalLogoutText1ls
                  }>
                  {Strings.LogoutAreUSure}
                </Text>
              </View>
              <View style={styles.ModalBottomContainer}>
                <TouchableOpacity
                  style={
                    orientation.isPortrait
                      ? styles.ModalNoContainer
                      : styles.ModalNoContainerls
                  }
                  onPress={goBack}>
                  <Text style={styles.ModalNoText}>{Strings.No}</Text>
                </TouchableOpacity>

                <TouchableOpacity
                  style={
                    orientation.isPortrait
                      ? styles.ModalYesContainer
                      : styles.ModalYesContainerls
                  }
                  onPress={gotoSign}>
                  <View style={styles.ModalYesView}>
                    <Text style={styles.ModalYesText}>{Strings.Yes}</Text>
                    <Image
                      source={require('../Images/Profile/yesArrow.png')}
                      style={styles.ModalYesImg}
                    />
                  </View>
                </TouchableOpacity>
              </View>
            </View>
          </Modal>
        </View>
      </Modal>

      {/* To display the middle container */}
      <View>
        <View style={styles.ProfilePhotoContainer}>
          <Image source={{uri: profilePic}} style={styles.ProfilePhotoImage} />
        </View>
        <View style={styles.ProfileNameView}>
          <Text style={styles.ProfileName}>{ProfileData.name}</Text>

          <Text style={styles.ProfileMail}>{ProfileData.username}</Text>
        </View>

        <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
          <View style={styles.MiddleContainer}>
            <View
              style={
                orientation.isPortrait ? styles.MiddleCard : styles.MiddleCardls
              }>
              <View style={styles.CardTop}>
                <Text style={styles.Card1Text}>
                  {ProfileData.chapterscompleted}
                </Text>
                <Text style={styles.Card1Text1}>{Strings.Perc}</Text>
              </View>
              <View style={styles.CardBottom}>
                <Text style={styles.CardBottomText}>
                  {Strings.ChaptersCompleted}
                </Text>
              </View>
            </View>

            <View
              style={
                orientation.isPortrait ? styles.MiddleCard : styles.MiddleCardls
              }>
              <View style={styles.CardTop}>
                <Text style={styles.Card2Text}>
                  {ProfileData.avgscore === null ? 0 : ProfileData.avgscore}
                </Text>
                <Text style={styles.Card2Text2}>{Strings.Perc}</Text>
              </View>
              <View style={styles.CardBottom}>
                <Text style={styles.CardBottomText}>{Strings.AvgTScore}</Text>
              </View>
            </View>

            <View
              style={
                orientation.isPortrait ? styles.MiddleCard : styles.MiddleCardls
              }>
              <View style={styles.CardTop}>
                <Text style={styles.Card3Text}>
                  {ProfileData.highestscore === null
                    ? 0
                    : ProfileData.highestscore}
                </Text>
                <Text style={styles.Card3Text3}>{Strings.Perc}</Text>
              </View>
              <View style={styles.CardBottom}>
                <Text style={styles.CardBottomText}>{Strings.HighTScore}</Text>
              </View>
            </View>
          </View>
        </ScrollView>
      </View>

      {/* To display the bottom container */}
      <View style={styles.BottomContainer}>
        <View
          style={orientation.isPortrait ? styles.Results : styles.Resultsls}>
          <Image
            source={require('../Images/Profile/resultImage.png')}
            style={styles.ResultsImage}
          />
          <View
            style={
              orientation.isPortrait
                ? styles.ResultsTextContainer
                : styles.ResultsTextContainerls
            }>
            <Text style={styles.ResultsText1}>{Strings.Results}</Text>
            <Text style={styles.ResultsText2}>{Strings.CheckTScore}</Text>
          </View>

          <TouchableOpacity onPress={gotoResult}>
            <Image
              source={require('../Images/Profile/arrow.png')}
              style={
                orientation.isPortrait
                  ? styles.ResultsArrowImage
                  : styles.ResultsArrowImagels
              }
            />
          </TouchableOpacity>
        </View>
        <View
          style={
            orientation.isPortrait
              ? styles.Notifications
              : styles.Notificationsls
          }>
          <Image
            source={require('../Images/Profile/bell.png')}
            style={styles.ResultsImage}
          />
          <View
            style={
              orientation.isPortrait
                ? styles.ResultsTextContainer
                : styles.ResultsTextContainerls
            }>
            <Text style={styles.ResultsText1}>{Strings.Notifications}</Text>
            <Text style={styles.ResultsText2}>{Strings.TurnOffNotif}</Text>
          </View>
          {notify === 'true' && (
            <TouchableOpacity onPress={() => notifFalse()}>
              <View
                style={
                  orientation.isPortrait
                    ? styles.ActiveNotification1
                    : styles.ActiveNotification1ls
                }>
                <View style={styles.ActiveNotification2}></View>
              </View>
            </TouchableOpacity>
          )}

          {notify === 'false' && (
            <TouchableOpacity onPress={() => notifTrue()}>
              <View
                style={
                  orientation.isPortrait
                    ? styles.InActiveNotification1
                    : styles.InActiveNotification1ls
                }>
                <View style={styles.InActiveNotification2}></View>
              </View>
            </TouchableOpacity>
          )}
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  MainContainer: {
    backgroundColor: Colors.BgGrey,
    height: '100%',
    width: '100%',
    marginTop: Platform.OS === 'ios' ? 0 : -30,
  },
  MainContainerls: {
    backgroundColor: Colors.BgGrey,
    height: '100%',
    width: '100%',
    marginTop: Platform.OS === 'ios' ? -30 : -60,
  },

  // 3dots style
  TopDots: {
    marginTop: 60,
    alignSelf: 'flex-end',
    marginHorizontal: 30,
  },
  TopDotsls: {
    marginTop: Platform.OS === 'ios' ? 60 : 90,
    alignSelf: 'flex-end',
    marginHorizontal: 60,
  },

  TopDotsImage: {
    width: 6,
    height: 27,
  },

  // upperModal styles
  InModalMainContainer: {
    backgroundColor: Colors.White,
    position: 'absolute',
    top: 30,
    right: 10,

    height: 150,
    width: 160,
    alignItems: 'flex-start',
    justifyContent: 'space-around',
    marginRight: 20,
    borderRadius: 15,
  },
  InModalMainContainerls: {
    backgroundColor: Colors.White,
    position: 'absolute',
    top: -20,
    right: 20,
    height: 150,
    width: 160,
    alignItems: 'flex-start',
    justifyContent: 'space-around',
    marginRight: 20,
    borderRadius: 15,
  },
  InModalEditContainer: {
    flexDirection: 'row',
    marginTop: 10,
  },
  InModalEditImg: {
    width: 18,
    height: 20,
    marginLeft: 31,
  },
  InModalEditText: {
    fontSize: 16,
    color: Colors.ChapNameColor,
    fontWeight: '500',
    letterSpacing: 0,
    lineHeight: 26,
    marginLeft: 19,
    marginTop: -4,
  },
  InModalLogoutContainer: {
    flexDirection: 'row',
    marginBottom: 10,
  },
  InModalLogoutImg: {
    width: 20,
    height: 20,
    marginLeft: 31,
  },

  // Lower Modal Styles
  ModalMainContainer: {
    backgroundColor: Colors.White,
    position: 'absolute',
    bottom: -18,
    height: '35%',
    width: '100%',
    marginRight: 20,
    borderRadius: 15,
  },
  ModalMainContainerls: {
    backgroundColor: Colors.White,
    position: 'absolute',
    bottom: -40,
    height: '80%',
    width: '103%',
    marginLeft: -15,

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
  ModalTopRight: {
    marginTop: 30,
  },
  ModalLogoutText: {
    marginTop: 30,
    fontSize: 22,
    fontWeight: 'bold',
    lineHeight: 27,
    letterSpacing: 0,
    fontWeight: '500',
    color: Colors.ChapNameColor,
  },
  ModalLogoutText1: {
    color: Colors.BottomPage,
    fontWeight: '300',
    letterSpacing: 0,
    lineHeight: 28,
    textAlign: 'center',
    fontSize: 20,
    textAlign: 'center',
    width: 230,
    marginTop: 15,
  },
  ModalLogoutText1ls: {
    color: Colors.BottomPage,
    fontWeight: '300',
    letterSpacing: 0,
    lineHeight: 28,
    textAlign: 'center',
    fontSize: 20,
    textAlign: 'center',
    width: 340,
    marginTop: 15,
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
    borderWidth: 2,
    borderRadius: 13,
    marginLeft: Platform.OS === 'ios' ? 90 : 80,
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
    borderWidth: 2,
    borderRadius: 13,
    borderColor: Colors.ReSend,
    marginLeft: Platform.OS === 'ios' ? 90 : 60,
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

  //Profile Container
  ProfilePhotoContainer: {
    borderRadius: 60,
    borderColor: Colors.ActiveTab,
    borderWidth: 2,
    marginTop: 23,
    alignSelf: 'center',
  },
  ProfilePhotoImage: {
    width: 100,
    height: 100,
    margin: 5,
    borderRadius: 60,
  },
  ProfileNameView: {
    alignItems: 'center',
  },
  ProfileName: {
    marginTop: 14,
    fontSize: 30,
    fontWeight: 'bold',
  },
  ProfileMail: {
    marginTop: 5,
    fontSize: 20,
    color: Colors.ProfileMail,
    fontWeight: '400',
  },

  // Middle Container
  MiddleContainer: {
    flexDirection: 'row',
  },
  MiddleCard: {
    marginHorizontal: 20,
    height: 113,
    width: 104.6,
    borderWidth: 1,
    borderColor: Colors.ChapterBorder,
    borderRadius: 18,
    backgroundColor: Colors.White,
    marginTop: 55,
  },
  MiddleCardls: {
    marginLeft: Platform.OS === 'ios' ? 95 : 85,
    height: 120,
    width: 150,
    borderWidth: 1,
    borderColor: Colors.ChapterBorder,
    borderRadius: 18,
    backgroundColor: Colors.White,
    marginTop: 55,
  },
  CardTop: {
    flexDirection: 'row',
  },
  Card1Text: {
    color: Colors.Card1,
    fontSize: 34,
    marginTop: 15,
    marginLeft: 13,
  },
  Card1Text1: {
    marginTop: 28,
    fontWeight: '800',
    fontSize: 17,
    color: Colors.Card1,
  },
  Card2Text: {
    color: Colors.Card2,
    fontSize: 34,
    marginTop: 15,
    marginLeft: 13,
  },
  Card2Text2: {
    marginTop: 28,
    fontWeight: '800',
    fontSize: 17,
    color: Colors.Card2,
  },
  Card3Text: {
    color: Colors.Card3,
    fontSize: 34,
    marginTop: 15,
    marginLeft: 13,
  },
  Card3Text3: {
    marginTop: 28,
    fontWeight: '800',
    fontSize: 17,
    color: Colors.Card3,
  },
  CardBottom: {
    fontSize: 13,
    marginTop: 5,
    marginLeft: 13,
    marginRight: 13,
  },
  CardBottomText: {
    color: Colors.CardBottom,
    letterSpacing: 0,
    lineHeight: 18,
  },

  //Bottom Container
  BottomContainer: {
    marginTop: 51,
  },
  Results: {
    marginHorizontal: 33,
    flexDirection: 'row',
    borderBottomWidth: 2,
    borderColor: Colors.ResultProf,
  },
  Resultsls: {
    marginHorizontal: 90,
    flexDirection: 'row',
    borderBottomWidth: 2,
    borderColor: Colors.ResultProf,
  },
  ResultsImage: {
    width: 16,
    height: 22,
  },
  ResultsTextContainer: {
    marginLeft: 25,
    width: 200,
  },
  ResultsTextContainerls: {
    marginLeft: 50,
    width: 500,
  },
  ResultsText1: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  ResultsText2: {
    marginTop: 4,
    marginBottom: 24,
    color: Colors.ResultText2Prof,
    fontSize: 14,
  },
  ResultsArrowImage: {
    width: 10,
    height: 12,
    marginLeft: 60,
    marginTop: 6,
  },
  ResultsArrowImagels: {
    width: 10,
    height: 12,
    marginLeft: Platform.OS === 'ios' ? 60 : 0,
    marginTop: 6,
  },
  Notifications: {
    marginHorizontal: 33,
    marginTop: 30,
    flexDirection: 'row',
    borderBottomWidth: 2,
    borderColor: Colors.ResultProf,
  },
  Notificationsls: {
    marginHorizontal: 90,
    marginTop: 30,
    flexDirection: 'row',
    borderBottomWidth: 2,
    borderColor: Colors.ResultProf,
  },
  ActiveNotification1: {
    borderRadius: 20,
    width: 50,
    height: 30,
    marginRight: 30,
    marginLeft: 30,
    backgroundColor: Colors.ReSend,
  },
  ActiveNotification1ls: {
    borderRadius: 20,
    width: 50,
    height: 30,
    marginRight: 30,
    marginLeft: Platform.OS == 'ios' ? 30 : -30,
    backgroundColor: Colors.ReSend,
  },
  ActiveNotification2: {
    alignSelf: 'flex-end',
    borderRadius: 20,
    width: 28,
    height: 28,
    marginTop: 1,
    marginRight: 1,
    backgroundColor: Colors.White,
  },
  InActiveNotification1: {
    borderRadius: 20,
    width: 50,
    height: 30,
    marginRight: 30,
    marginLeft: 30,
    backgroundColor: Colors.Lesson,
  },
  InActiveNotification1ls: {
    borderRadius: 20,
    width: 50,
    height: 30,
    marginRight: 30,
    marginLeft: Platform.OS == 'ios' ? 30 : -30,
    backgroundColor: Colors.Lesson,
  },
  InActiveNotification2: {
    borderRadius: 20,
    width: 28,
    height: 28,
    marginTop: 1,
    marginLeft: 1,
    backgroundColor: Colors.White,
  },
  editModalMainContainer: {
    backgroundColor: Colors.White,
    position: 'absolute',
    top: -19,
    left: -19,
    height: Platform.OS === 'ios' ? '45%' : '55%',
    width: '111%',
  },

  editModalMainContainerls: {
    backgroundColor: Colors.White,
    position: 'absolute',
    top: -36,
    left: -19,
    height: Platform.OS === 'ios' ? '120%' : '130%',
    width: '103%',
    paddingHorizontal: 40,
  },
  ModalEditTopContainer: {
    alignItems: 'center',
    flexDirection: 'row',
    margin: 32,
    justifyContent: 'space-between',
  },
  ProfilePhotoImage1: {
    width: 100,
    height: 100,
    margin: 5,
  },
  ProfilePhotoContainer1: {
    borderRadius: 60,
    borderColor: Colors.ProfilePhotoCon,
    borderWidth: 2,
    alignSelf: 'center',
  },
  cameraImg: {
    alignSelf: 'center',
    marginTop: 26,
  },
  input: {
    color: 'black',
    fontSize: 30,
    fontWeight: 'bold',
  },
  EditTextInputContainer: {
    alignSelf: 'center',
  },
  EditModalBottomContainer: {
    alignItems: 'center',
    marginTop: 15,
  },
  EditModalLine: {
    height: 2,
    borderRadius: 20,
    marginLeft: 50,
    marginRight: 50,
    width: 290,
    backgroundColor: Colors.EditModal,
    marginTop: 15,
    marginBottom: 16,
  },
  EditModalLinels: {
    height: 2,
    borderRadius: 20,
    marginLeft: 50,
    marginRight: 50,
    width: 290,
    backgroundColor: Colors.EditModal,
    marginTop: Platform.OS === 'ios' ? 15 : 0,
    marginBottom: 16,
  },
});
export default ProfileScreen;
