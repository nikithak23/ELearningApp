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
    <ScrollView
      style={{
        backgroundColor: '#F6FAFF',
        height: '100%',
        width: '100%',
        marginTop: Platform.OS === 'ios' ? 0 : -30,
      }}>
      <TouchableOpacity
        style={{marginTop: 60, alignSelf: 'flex-end', marginHorizontal: 30}}
        onPress={innerhandleModal}>
        <View>
          <Image
            source={require('../Images/Profile/3dots.png')}
            style={{width: 6, height: 27}}
          />
        </View>
      </TouchableOpacity>

      <Modal isVisible={isinnerVisible}>
        <View
          style={{
            backgroundColor: 'white',
            position: 'absolute',
            top: 60,
            right: -10,
            // height: '10%',
            // width: '30%',
            height: 150,
            width: 160,
            alignItems: 'flex-start',
            justifyContent: 'space-around',
            marginRight: 20,
            borderRadius: 15,
          }}>
          <TouchableOpacity>
            <View
              style={{
                flexDirection: 'row',
                marginTop: 10,

                // alignSelf: 'center',
                // justifyContent: 'space-around',
              }}>
              <Image
                source={require('../Images/Profile/edit.png')}
                style={{width: 18, height: 20, marginLeft: 31}}
              />
              <Text
                style={{
                  fontSize: 16,
                  color: '#191B26',
                  fontWeight: '500',
                  letterSpacing: 0,
                  lineHeight: 26,
                  marginLeft: 19,
                  marginTop: -4,
                }}>
                Edit
              </Text>
            </View>
          </TouchableOpacity>

          <TouchableOpacity onPress={innerhandleModal1}>
            <View style={{flexDirection: 'row', marginBottom: 10}}>
              <Image
                source={require('../Images/Profile/logout.png')}
                style={{width: 20, height: 20, marginLeft: 31}}
              />
              <Text
                style={{
                  fontSize: 16,
                  color: '#191B26',
                  fontWeight: '500',
                  letterSpacing: 0,
                  lineHeight: 26,
                  marginLeft: 18,
                  marginTop: -4,
                }}>
                Logout
              </Text>
            </View>
          </TouchableOpacity>

          <Modal isVisible={isModalVisible}>
            <View
              style={{
                backgroundColor: 'white',
                position: 'absolute',
                bottom: -18,
                height: '35%',
                width: '100%',
                marginRight: 20,
                borderRadius: 15,
              }}>
              <View style={{alignItems: 'center'}}>
                <View
                  style={{
                    height: 2,
                    borderRadius: 20,
                    width: 40.2,
                    backgroundColor: 'rgba(151,151,151,0.49)',
                    marginTop: 15,
                  }}></View>
                <Text
                  style={{
                    marginTop: 30,
                    fontSize: 22,
                    fontWeight: 'bold',
                    lineHeight: 27,
                    letterSpacing: 0,
                    fontWeight: '500',
                    color: '#191B26',
                  }}>
                  Logout
                </Text>

                <Text
                  style={{
                    color: '#595B60',

                    fontWeight: '300',
                    letterSpacing: 0,
                    lineHeight: 28,
                    textAlign: 'center',
                    fontSize: 20,
                    textAlign: 'center',
                    width: 230,
                    marginTop: 15,
                  }}>
                  Are you sure you want to logout now?
                </Text>
              </View>

              <View
                style={{
                  flexDirection: 'row',

                  marginTop: 30,
                }}>
                <TouchableOpacity
                  style={{
                    height: 55,
                    width: 125,
                    borderWidth: 2,
                    borderRadius: 13,
                    marginLeft: 31,
                    borderColor: '#4C93FF',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                  onPress={goBack}>
                  <Text
                    style={{
                      color: '#4C93FF',
                      fontSize: 20,
                    }}>
                    No
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={{
                    height: 55,
                    width: 125,
                    borderWidth: 2,
                    borderRadius: 13,
                    borderColor: '#4C93FF',
                    marginLeft: 31,
                    backgroundColor: '#4C93FF',
                  }}
                  onPress={gotoSign}>
                  <View
                    style={{
                      flexDirection: 'row',
                      alignItems: 'center',
                      justifyContent: 'space-around',
                      marginHorizontal: 10,
                    }}>
                    <Text
                      style={{
                        // textAlign: 'center',
                        marginVertical: 14,
                        fontSize: 20,
                        color: 'white',
                      }}>
                      Yes
                    </Text>
                    <Image
                      source={require('../Images/Profile/yesArrow.png')}
                      style={{width: 24, height: 24}}
                    />
                  </View>
                </TouchableOpacity>
              </View>
            </View>
          </Modal>
        </View>
      </Modal>

      <View>
        <View
          style={{
            borderRadius: 60,
            borderColor: '#3A7FE7',
            borderWidth: 2,
            marginTop: 23,
            alignSelf: 'center',
          }}>
          <Image
            source={require('../Images/Profile/photo1.jpeg')}
            style={{width: 100, height: 100, margin: 5, borderRadius: 60}}
          />
        </View>
        <View style={{alignItems: 'center'}}>
          <Text style={{marginTop: 14, fontSize: 30, fontWeight: 'bold'}}>
            Prallav Raj
          </Text>
          <Text
            style={{
              marginTop: 5,
              fontSize: 20,
              color: '#6A7686',
              fontWeight: '400',
            }}>
            prallav.raj@gmail.com
          </Text>
        </View>

        <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
          <View style={{flexDirection: 'row'}}>
            <View
              style={{
                marginLeft: 30,
                height: 113,
                width: 104.6,
                borderWidth: 1,
                borderColor: 'rgba(151,151,151,0.1)',
                borderRadius: 18,
                backgroundColor: '#FFFFFF',
                marginTop: 55,
              }}>
              <View style={{flexDirection: 'row'}}>
                <Text
                  style={{
                    color: '#DB8E9D',
                    fontSize: 34,
                    marginTop: 15,
                    marginLeft: 13,
                  }}>
                  30
                </Text>
                <Text
                  style={{
                    marginTop: 28,
                    fontWeight: '800',
                    fontSize: 17,
                    color: '#DB8E9D',
                  }}>
                  %
                </Text>
              </View>
              <View
                style={{
                  fontSize: 13,
                  marginTop: 5,
                  marginLeft: 13,
                  marginRight: 13,
                }}>
                <Text
                  style={{color: '#5F6067', letterSpacing: 0, lineHeight: 18}}>
                  Chapters Completed
                </Text>
              </View>
            </View>

            <View
              style={{
                marginLeft: 30,
                height: 113,
                width: 104.6,
                borderWidth: 1,
                borderColor: 'rgba(151,151,151,0.1)',
                borderRadius: 18,
                backgroundColor: '#FFFFFF',
                marginTop: 55,
              }}>
              <View style={{flexDirection: 'row'}}>
                <Text
                  style={{
                    color: '#E0CA62',
                    fontSize: 34,
                    marginTop: 15,
                    marginLeft: 13,
                  }}>
                  70
                </Text>
                <Text
                  style={{
                    marginTop: 28,
                    fontWeight: '800',
                    fontSize: 17,
                    color: '#E0CA62',
                  }}>
                  %
                </Text>
              </View>
              <View
                style={{
                  fontSize: 13,
                  marginTop: 5,
                  marginLeft: 13,
                  marginRight: 13,
                }}>
                <Text
                  style={{color: '#5F6067', letterSpacing: 0, lineHeight: 18}}>
                  Average Test Score
                </Text>
              </View>
            </View>

            <View
              style={{
                marginLeft: 30,
                height: 113,
                width: 104.6,
                borderWidth: 1,
                borderColor: 'rgba(151,151,151,0.1)',
                borderRadius: 18,
                backgroundColor: '#FFFFFF',
                marginTop: 55,
              }}>
              <View style={{flexDirection: 'row'}}>
                <Text
                  style={{
                    color: '#F3B746',
                    fontSize: 34,
                    marginTop: 15,
                    marginLeft: 13,
                  }}>
                  75
                </Text>
                <Text
                  style={{
                    marginTop: 28,
                    fontWeight: '800',
                    fontSize: 17,
                    color: '#F3B746',
                  }}>
                  %
                </Text>
              </View>
              <View
                style={{
                  fontSize: 13,
                  marginTop: 5,
                  marginLeft: 13,
                  marginRight: 13,
                }}>
                <Text
                  style={{color: '#5F6067', letterSpacing: 0, lineHeight: 18}}>
                  Highest Test Score
                </Text>
              </View>
            </View>
          </View>
        </ScrollView>
      </View>
      <View style={{marginTop: 51}}>
        <View
          style={{
            marginHorizontal: 33,
            flexDirection: 'row',
            borderBottomWidth: 2,
            borderColor: '#EDEEF1',
          }}>
          <Image
            source={require('../Images/Profile/resultImage.png')}
            style={{width: 16, height: 22}}
          />
          <View style={{marginLeft: 25, width: 200}}>
            <Text style={{fontSize: 18, fontWeight: 'bold'}}>Results</Text>
            <Text
              style={{
                marginTop: 4,
                marginBottom: 24,
                color: '#858689',
                fontSize: 14,
              }}>
              Check the test score you have attempted
            </Text>
          </View>

          <TouchableOpacity onPress={gotoResult}>
            <Image
              source={require('../Images/Profile/arrow.png')}
              style={{
                width: 10,
                height: 12,
                marginLeft: 60,
                marginTop: 5,
              }}
            />
          </TouchableOpacity>

          {/* </View> */}
        </View>
        <View
          style={{
            marginHorizontal: 33,
            marginTop: 30,
            flexDirection: 'row',
            borderBottomWidth: 2,
            borderColor: '#EDEEF1',
          }}>
          <Image
            source={require('../Images/Profile/bell.png')}
            style={{width: 16, height: 22}}
          />
          <View style={{marginLeft: 25, width: 200}}>
            <Text style={{fontSize: 18, fontWeight: 'bold'}}>
              Notifications
            </Text>
            <Text
              style={{
                marginTop: 4,
                marginBottom: 24,
                color: '#858689',
                fontSize: 14,
              }}>
              Turn off the notification if you don't want to recieve
            </Text>
          </View>
          {notify === true && (
            <TouchableOpacity onPress={() => setNotify(false)}>
              <View
                style={{
                  borderRadius: 20,
                  width: 50,
                  height: 30,
                  marginRight: 30,
                  marginLeft: 30,

                  backgroundColor: '#4C93FF',
                }}>
                <View
                  style={{
                    alignSelf: 'flex-end',
                    borderRadius: 20,
                    width: 28,
                    height: 28,
                    marginTop: 1,
                    marginRight: 1,
                    backgroundColor: 'white',
                  }}></View>
              </View>
            </TouchableOpacity>
          )}

          {notify === false && (
            <TouchableOpacity onPress={() => setNotify(true)}>
              <View
                style={{
                  borderRadius: 20,
                  width: 50,
                  height: 30,
                  marginRight: 30,
                  marginLeft: 30,
                  //   borderWidth: 1,
                  //   borderColor: 'black',
                  backgroundColor: 'grey',
                }}>
                <View
                  style={{
                    borderRadius: 20,
                    width: 28,
                    height: 28,
                    marginTop: 1,
                    marginLeft: 1,
                    backgroundColor: 'white',
                  }}></View>
              </View>
            </TouchableOpacity>
          )}
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  cover: {
    backgroundColor: 'rgba(0,0,0,.5)',
  },
});
export default ProfileScreen;
