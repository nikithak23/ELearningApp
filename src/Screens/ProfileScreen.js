import React, {useState} from 'react';
import {
  Image,
  Text,
  View,
  flex,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
} from 'react-native';
import Modal from 'react-native-modal';

const ProfileScreen = ({navigation}) => {
  const [notify, setNotify] = useState(false);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isinnerVisible, setIsinnerVissible] = useState(false);

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
    navigation.navigate('Profile');
  };
  const gotoSign = () => {
    setIsinnerVissible(false);
    setIsModalVisible(false);
    navigation.navigate('SignIn');
  };

  const gotoResult = () => {
    navigation.navigate('Results');
  };

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
          <TouchableOpacity>
            <View style={styles.InModalEditContainer}>
              <Image
                source={require('../Images/Profile/edit.png')}
                style={styles.InModalEditImg}
              />
              <Text style={styles.InModalEditText}>Edit</Text>
            </View>
          </TouchableOpacity>

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
            source={require('../Images/Profile/photo1.jpeg')}
            style={styles.ProfilePhotoImage}
          />
        </View>
        <View style={styles.ProfileNameView}>
          <Text style={styles.ProfileName}>Prallav Raj</Text>
          <Text style={styles.ProfileMail}>prallav.raj@gmail.com</Text>
        </View>

        <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
          <View style={styles.MiddleContainer}>
            <View style={styles.MiddleCard}>
              <View style={styles.CardTop}>
                <Text style={styles.Card1Text}>30</Text>
                <Text style={styles.Card1Text1}>%</Text>
              </View>
              <View style={styles.CardBottom}>
                <Text style={styles.CardBottomText}>Chapters Completed</Text>
              </View>
            </View>

            <View style={styles.MiddleCard}>
              <View style={styles.CardTop}>
                <Text style={styles.Card2Text}>70</Text>
                <Text style={styles.Card2Text2}>%</Text>
              </View>
              <View style={styles.CardBottom}>
                <Text style={styles.CardBottomText}>Average Test Score</Text>
              </View>
            </View>

            <View style={styles.MiddleCard}>
              <View style={styles.CardTop}>
                <Text style={styles.Card3Text}>75</Text>
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

  cover: {
    backgroundColor: 'rgba(0,0,0,.5)',
  },
});
export default ProfileScreen;
