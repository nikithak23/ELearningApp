import React from 'react';
import {
  Modal,
  StyleSheet,
  Text,
  Pressable,
  View,
  ScrollView,
  Image
} from 'react-native';

const Dropdown = ({filterSub, subs, modalVisible ,setModalVisible}) => {
  const downarrow = require('../Images/Profile/Results/allDown.png');
  const renderDropdown = () =>{
    return (
      <View style={styles.centeredView}>
        <Modal
          animationType="fade"
          transparent={true}
          visible={modalVisible}
        >
          <View style={styles.centeredView}>
            <View style={styles.modalView}>
              <ScrollView>{subs}</ScrollView>
            </View>
          </View>
        </Modal>
        <Pressable
          style={[styles.button, styles.buttonOpen]}
          onPress={() => setModalVisible(true)}>
          <Text style={styles.textStyle}>{filterSub}</Text>
          <Image source={downarrow} style={styles.arrow} />
        </Pressable>
      </View>
    );
  };
  
  return renderDropdown();
};

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'flex-end',
  },
  modalView: {
    margin: 32,
    marginTop:130,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 22,
    alignItems: 'center',
    shadowOpacity: 0.15,
    shadowRadius: 3,
    elevation: 5,
    height: 250,
  },
  button: {
    borderRadius: 6,
    padding: 3,
    elevation: 2,
  },
  buttonOpen: {
    backgroundColor: '#fff',
    borderWidth:1.5,
    borderColor: '#4c93ff',
    marginRight: 25,
    flexDirection: 'row',
  },
  buttonClose: {
    backgroundColor: '#2196F3',
  },
  textStyle: {
    color: '#292929',
    fontWeight: '500',
    textAlign: 'center',
    marginLeft:6
  },
  arrow:{
    marginLeft:15,
    marginTop:5,
    marginRight:3
  }
});

export default Dropdown;

