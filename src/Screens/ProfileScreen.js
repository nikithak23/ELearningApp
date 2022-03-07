import AsyncStorage from '@react-native-async-storage/async-storage';
import {useFocusEffect} from '@react-navigation/core';
import axios from 'axios';
import React, {useState, useEffect, useContext} from 'react';
import {
  Image,
  Text,
  View,
  flex,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
  ImageBackground,
  TextInput,
} from 'react-native';
import { FlatList } from 'react-native-gesture-handler';
import Modal from 'react-native-modal';
// import ImagePicker from 'react-native-image-picker';
import ImagePicker from 'react-native-image-crop-picker';

const pic1 = '../Images/Profile/photo1.jpeg';
const pic2 = require('../Images/Profile/2photo.jpeg');
const pic3 = require('../Images/Profile/photo3.jpeg');

const profiles = [pic1, pic2, pic3];


const ProfileScreen = ({navigation, token}) => {
  const [notify, setNotify] = useState(false);
  // const [isRight, setIsRight] = useState(true);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isinnerVisible, setIsinnerVissible] = useState(false);
  const [editModalVisible, setEditModalVisible] = useState(false);
  const [editData, setEditData] = useState(false);
  // const [ProfileData, setProfileData] = useState([]);
  const [ProfileData, setProfileData] = useState([]);

  let name1 = ProfileData.name;
  const [fetchData, setFetchData] = useState(false);
  const [name, setName] = useState(name1);

  const [Results, setResults] = useState([]);
  const [profileModalVisivle, setProfileModalVisible] = useState(false)
  const [profilePic, setProfilePic] = useState(
    'https://www.pasrc.org/sites/g/files/toruqf431/files/styles/freeform_750w/public/2021-03/blank-profile-picture_0.jpg?itok=iSBmDxc8',
  );

  console.log('nccc', profileModalVisivle);

  // const [edit, setEdit] = useState(true);
  // const [name, setName] = useState('');
  // const [text, onChangeText] = useState(ProfileData);

  const baseUrl = 'https://elearningapp-api.herokuapp.com';

  const getResults = async () => {
    try {
      const response = await axios.get(`${baseUrl}/subject/get/result`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setResults(response.data.data);

      console.log('the result is', Results);
      // setFetchSubjects(true);
    } catch (err) {
      console.log(err);
    }
  };
  useEffect(() => {
    getResults();
    // setFilterFlatlist(Results);
  }, []);

  const getProfileData = async () => {
    try {
      const response = await axios.get(`${baseUrl}/learn/profile`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      console.log('welocome to profile');
      setProfileData(response.data.data);
      console.log(ProfileData);

      console.log('profile', ProfileData.name);
      setFetchData(true);
      console.log(fetchData);
    } catch (err) {
      console.log(err);
    }
  };

  useFocusEffect(
    React.useCallback(() => {
      getProfileData();
    }, [name]),
  );

  // useEffect(() => {
  //   getProfileData();
  // }, [name]);

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
      // setName(name);
      console.log(response.data);
      console.log('welocome to  edit profile');
      // setEditData;
      console.log();
    } catch (err) {
      console.log(err);
    }
  };

  // useEffect(() => {
  //   editProfileData();
  // }, [name]);

  // const ri = () => {
  //   setIsRight(true);
  //   setName(text);
  // };
  // const ro = () => {
  //   setIsRight(false);
  // };
  const editHandleModalTrue = () => {
    setEditModalVisible(true);
    // setEdit(false);
  };
  const editHandleModalT = async () => {
    setEditModalVisible(false);
    setIsinnerVissible(false);
    setIsModalVisible(false);
    await editProfileData();
    await getProfileData();

    // setIsRight(true);
    // setName(name);
    // setProfileData(text);
  };
  const editHandleModalF = () => {
    setEditModalVisible(false);
    setIsinnerVissible(false);
    setIsModalVisible(false);
    setName(name1);
    // onChangeText(name);
    // setName(name);
    // setIsRight(false);
  };

  const innerhandleModal = () => {
    setIsinnerVissible(true);
    setIsModalVisible(false);
  };
  const innerhandleModal1 = () => {
    setIsModalVisible(true);
  };
  const goBack1 = () => {
    setIsinnerVissible(false);
    setIsModalVisible(false);
    setEditModalVisible(false);
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

  const renderChangeProfile = ({item}) => {
    return(
      <TouchableOpacity onPress={()=>setProfileModalVisible}>
      <Image source={item} style={{height: 60, width: 60}}></Image>
      </TouchableOpacity>
    )
  }

  const changeProfile = () => {
    // setProfileModalVisible(true);
    // console.log('click', profileModalVisivle);
    // return (
    //   <View>
    //     <Modal
    //       animationType="slide"
    //       transparent={true}
    //       isVisible={profileModalVisivle}>
    //       <View style={styles.InModalMainContainer}>
    //         <FlatList
    //           horizontal={true}
    //           data={profiles}
    //           renderItem={renderChangeProfile}
    //           keyExtractor={(item, index) => index.toString()}
    //           showsHorizontalScrollIndicator={false}
    //         />
    //       </View>
    //     </Modal>
    //   </View>
    // );

    // console.warn('choose photo')

    ImagePicker.openPicker({
      width: 300,
      height: 400,
      cropping: true,
    }).then(image => {
      console.log(image);
      setProfilePic(image.path)
    });
  }

  // const handleImage = () => {
  //   console.log('edit')
  //   ImagePicker.showImagePicker({},(response)=>{
  //     console.log('response=', response)
  //   })
  // }

  return (
    <ScrollView style={styles.MainContainer}>
      <TouchableOpacity style={styles.TopDots} onPress={innerhandleModal}>
        <View>
          <Image
            source={require('../Images/Profile/3dots.png')}
            style={styles.TopDotsImage}
          />
        </View>
      </TouchableOpacity>

      <Modal
        transparent={true}
        animationType="slide"
        isVisible={isinnerVisible}>
        <View style={styles.InModalMainContainer}>
          <TouchableOpacity onPress={editHandleModalTrue}>
            <View style={styles.InModalEditContainer}>
              <Image
                source={require('../Images/Profile/edit.png')}
                style={styles.InModalEditImg}
              />
              <Text style={styles.InModalEditText}>Edit</Text>
            </View>
          </TouchableOpacity>
          {/* NB */}
          <Modal isVisible={editModalVisible}>
            <View style={styles.editModalMainContainer}>
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
                  {/* ////////////////////// */}
                  <TouchableOpacity activeOpacity={0.8} onPress={changeProfile}>
                    <ImageBackground
                      source= {{uri: profilePic}}
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
                <View style={styles.EditModalLine}></View>
                <Text style={styles.ProfileMail}>{ProfileData.username}</Text>
              </View>
            </View>
          </Modal>
          {/* NB */}
          <TouchableOpacity onPress={innerhandleModal1}>
            <View style={styles.InModalLogoutContainer}>
              <Image
                source={require('../Images/Profile/logout.png')}
                style={styles.InModalLogoutImg}
              />
              <Text style={styles.InModalEditText}>Logout</Text>
            </View>
          </TouchableOpacity>
          <Modal isVisible={isModalVisible}>
            <View style={styles.ModalMainContainer}>
              <View style={styles.ModalTopContainer}>
                <View style={styles.ModalContainer}></View>
                <Text style={styles.ModalLogoutText}>Logout</Text>
                <Text style={styles.ModalLogoutText1}>
                  Are you sure you want to logout now?
                </Text>
              </View>

              <View style={styles.ModalBottomContainer}>
                <TouchableOpacity
                  style={styles.ModalNoContainer}
                  onPress={goBack}>
                  <Text style={styles.ModalNoText}>No</Text>
                </TouchableOpacity>

                <TouchableOpacity
                  style={styles.ModalYesContainer}
                  onPress={gotoSign}>
                  <View style={styles.ModalYesView}>
                    <Text style={styles.ModalYesText}>Yes</Text>
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

      <View>
        <View style={styles.ProfilePhotoContainer}>
          <Image
            source={{uri: profilePic}}
            style={styles.ProfilePhotoImage}
          />
        </View>
        <View style={styles.ProfileNameView}>
          {/* <Text style={styles.ProfileName}>Prallav Raj</Text> */}
          {/* <Text style={styles.ProfileName}>{text}</Text> */}
          {/* {isRight ? (
            <Text style={styles.ProfileName}>{text}</Text>
          ) : (
            <Text style={styles.ProfileName}>{namee}</Text>
          )} */}
          {/* {isRight ? setName(`{text}`) : null} */}

          {/* {isRight == false && <Text style={styles.ProfileName}>{namee}</Text>} */}
          {/* {edit ? (
            // <Text>{ProfileData}</Text>
          ) */}
          {/* {isRight ? (
            <Text style={styles.ProfileName}>{text}</Text>
          ) : ( */}
          {/* <Text>{name}</Text> */}

          {/* <Text>{ProfileData.name}</Text> */}
          {/* <Text>{name}</Text> */}
          <Text style={styles.ProfileName}>{ProfileData.name}</Text>
          {/* )} */}

          <Text style={styles.ProfileMail}>{ProfileData.username}</Text>
        </View>

        <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
          <View style={styles.MiddleContainer}>
            <View style={styles.MiddleCard}>
              <View style={styles.CardTop}>
                <Text style={styles.Card1Text}>
                  {ProfileData.chapterscompleted}
                </Text>
                <Text style={styles.Card1Text1}>%</Text>
              </View>
              <View style={styles.CardBottom}>
                <Text style={styles.CardBottomText}>Chapters Completed</Text>
              </View>
            </View>

            <View style={styles.MiddleCard}>
              <View style={styles.CardTop}>
                <Text style={styles.Card2Text}>{ProfileData.avgscore}</Text>
                <Text style={styles.Card2Text2}>%</Text>
              </View>
              <View style={styles.CardBottom}>
                <Text style={styles.CardBottomText}>Average Test Score</Text>
              </View>
            </View>

            <View style={styles.MiddleCard}>
              <View style={styles.CardTop}>
                <Text style={styles.Card3Text}>{ProfileData.highestscore}</Text>
                <Text style={styles.Card3Text3}>%</Text>
              </View>
              <View style={styles.CardBottom}>
                <Text style={styles.CardBottomText}>Highest Test Score</Text>
              </View>
            </View>
          </View>
        </ScrollView>
      </View>

      <View style={styles.BottomContainer}>
        <View style={styles.Results}>
          <Image
            source={require('../Images/Profile/resultImage.png')}
            style={styles.ResultsImage}
          />
          <View style={styles.ResultsTextContainer}>
            <Text style={styles.ResultsText1}>Results</Text>
            <Text style={styles.ResultsText2}>
              Check the test score you have attempted
            </Text>
          </View>

          <TouchableOpacity onPress={gotoResult}>
            <Image
              source={require('../Images/Profile/arrow.png')}
              style={styles.ResultsArrowImage}
            />
          </TouchableOpacity>
        </View>
        <View style={styles.Notifications}>
          <Image
            source={require('../Images/Profile/bell.png')}
            style={styles.ResultsImage}
          />
          <View style={styles.ResultsTextContainer}>
            <Text style={styles.ResultsText1}>Notifications</Text>
            <Text style={styles.ResultsText2}>
              Turn off the notification if you don't want to recieve
            </Text>
          </View>
          {notify === true && (
            <TouchableOpacity onPress={() => setNotify(false)}>
              <View style={styles.ActiveNotification1}>
                <View style={styles.ActiveNotification2}></View>
              </View>
            </TouchableOpacity>
          )}

          {notify === false && (
            <TouchableOpacity onPress={() => setNotify(true)}>
              <View style={styles.InActiveNotification1}>
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
    backgroundColor: '#F6FAFF',
    height: '100%',
    width: '100%',
    marginTop: Platform.OS === 'ios' ? 0 : -30,
  },

  // 3dots style

  TopDots: {
    marginTop: 60,
    alignSelf: 'flex-end',
    marginHorizontal: 30,
  },
  TopDotsImage: {width: 6, height: 27},

  // upperModal styles

  InModalMainContainer: {
    backgroundColor: 'white',
    position: 'absolute',
    top: 60,
    right: -10,
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
    color: '#191B26',
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
    backgroundColor: 'white',
    position: 'absolute',
    bottom: -18,
    height: '35%',
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
  ModalTopRight: {
    marginTop: 30,
    // fontSize: 22,
    // fontWeight: 'bold',
    // lineHeight: 27,
    // letterSpacing: 0,
    // fontWeight: '500',
    // color: '#191B26',
  },
  ModalLogoutText: {
    marginTop: 30,
    fontSize: 22,
    fontWeight: 'bold',
    lineHeight: 27,
    letterSpacing: 0,
    fontWeight: '500',
    color: '#191B26',
  },
  ModalLogoutText1: {
    color: '#595B60',
    fontWeight: '300',
    letterSpacing: 0,
    lineHeight: 28,
    textAlign: 'center',
    fontSize: 20,
    textAlign: 'center',
    width: 230,
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

  //Profile Container

  ProfilePhotoContainer: {
    borderRadius: 60,
    borderColor: '#3A7FE7',
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
    color: '#6A7686',
    fontWeight: '400',
  },

  // Middle Container
  MiddleContainer: {
    flexDirection: 'row',
  },
  MiddleCard: {
    marginLeft: 30,
    height: 113,
    width: 104.6,
    borderWidth: 1,
    borderColor: 'rgba(151,151,151,0.1)',
    borderRadius: 18,
    backgroundColor: '#FFFFFF',
    marginTop: 55,
  },
  CardTop: {
    flexDirection: 'row',
  },

  Card1Text: {
    color: '#DB8E9D',
    fontSize: 34,
    marginTop: 15,
    marginLeft: 13,
  },
  Card1Text1: {
    marginTop: 28,
    fontWeight: '800',
    fontSize: 17,
    color: '#DB8E9D',
  },
  Card2Text: {
    color: '#E0CA62',
    fontSize: 34,
    marginTop: 15,
    marginLeft: 13,
  },
  Card2Text2: {
    marginTop: 28,
    fontWeight: '800',
    fontSize: 17,
    color: '#E0CA62',
  },
  Card3Text: {
    color: '#F3B746',
    fontSize: 34,
    marginTop: 15,
    marginLeft: 13,
  },
  Card3Text3: {
    marginTop: 28,
    fontWeight: '800',
    fontSize: 17,
    color: '#F3B746',
  },
  CardBottom: {
    fontSize: 13,
    marginTop: 5,
    marginLeft: 13,
    marginRight: 13,
  },
  CardBottomText: {
    color: '#5F6067',
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
    borderColor: '#EDEEF1',
  },
  ResultsImage: {
    width: 16,
    height: 22,
  },
  ResultsTextContainer: {
    marginLeft: 25,
    width: 200,
  },
  ResultsText1: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  ResultsText2: {
    marginTop: 4,
    marginBottom: 24,
    color: '#858689',
    fontSize: 14,
  },
  ResultsArrowImage: {
    width: 10,
    height: 12,
    marginLeft: 60,
    marginTop: 5,
  },
  Notifications: {
    marginHorizontal: 33,
    marginTop: 30,
    flexDirection: 'row',
    borderBottomWidth: 2,
    borderColor: '#EDEEF1',
  },
  ActiveNotification1: {
    borderRadius: 20,
    width: 50,
    height: 30,
    marginRight: 30,
    marginLeft: 30,
    backgroundColor: '#4C93FF',
  },
  ActiveNotification2: {
    alignSelf: 'flex-end',
    borderRadius: 20,
    width: 28,
    height: 28,
    marginTop: 1,
    marginRight: 1,
    backgroundColor: 'white',
  },
  InActiveNotification1: {
    borderRadius: 20,
    width: 50,
    height: 30,
    marginRight: 30,
    marginLeft: 30,
    backgroundColor: 'grey',
  },
  InActiveNotification2: {
    borderRadius: 20,
    width: 28,
    height: 28,
    marginTop: 1,
    marginLeft: 1,
    backgroundColor: 'white',
  },
  editModalMainContainer: {
    backgroundColor: 'white',
    position: 'absolute',
    top: -19,
    left: -19,
    // right: 1,
    height: '45%',
    width: '111%',
    // marginRight: 20,
    // borderRadius: 15,
  },
  ModalEditTopContainer: {
    alignItems: 'center',
    flexDirection: 'row',
    margin: 32,

    justifyContent: 'space-between',
  },
  // ProfilePhotoContainer: {
  //   borderRadius: 60,
  //   borderColor: '#3A7FE7',
  //   borderWidth: 2,
  //   // marginTop: ,
  //   alignSelf: 'center',
  // },
  ProfilePhotoImage1: {
    width: 100,
    height: 100,
    margin: 5,
    // borderRadius: 60,
  },
  ProfilePhotoContainer1: {
    borderRadius: 60,
    borderColor: 'rgba(58,127,231,0.3)',

    borderWidth: 2,
    // marginTop: ,
    alignSelf: 'center',
  },
  cameraImg: {
    alignSelf: 'center',
    marginTop: 26,
  },
  input: {
    // flex: 1,
    color: 'black',
    fontSize: 30,
    fontWeight: 'bold',
    // height: 40,
    // alignSelf: 'center',
    // paddingHorizontal: 15,
  },
  EditTextInputContainer: {
    alignSelf: 'center',

    // flexDirection: 'row',
    // marginTop: 30,
    // a,
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
    backgroundColor: '#C1C2C4',
    marginTop: 15,
    marginBottom: 16,
  },

  // cover: {
  //   backgroundColor: 'rgba(0,0,0,.5)',
  // },
});
export default ProfileScreen;
