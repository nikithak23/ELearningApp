import * as React from 'react';
import {
  Button,
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
} from 'react-native';

import Modal from 'react-native-modal';

export default function TabOneScreen({navigation}) {
  const [isModalVisible, setIsModalVisible] = React.useState(false);
  const [isinnerVisible, setIsinnerVissible] = React.useState(false);

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
    navigation.navigate('Results');
  };
  const gotoSign = () => {
    setIsinnerVissible(false);
    setIsModalVisible(false);
    navigation.navigate('SignIn');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Tab One</Text>
      <View style={styles.separator} />

      <Button title="button" onPress={innerhandleModal} />
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
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  text: {
    fontSize: 16,
    fontWeight: '400',
    textAlign: 'center',
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: '80%',
  },
});
