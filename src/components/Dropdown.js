import React, {useEffect, useState} from 'react';
import {
  Alert,
  TouchableOpacity,
  Modal,
  StyleSheet,
  Text,
  Pressable,
  View,
  ScrollView,
  Image
} from 'react-native';
import useOrientation from '../hooks/useOrientation';

const Dropdown = ({filterSub, subs, modalVisible ,setModalVisible}) => {
  const downarrow = require('../Images/Profile/Results/allDown.png');
  // const Subjects = [
  //       'ALL',
  //     'PHYSICS',
  //     'BIOLOGY',
  //     'CHEMISTRY',
  //     'MATHEMATICS',
  //     'GEOGRAPHY',
  //     'ART AND CULTURE',
  // ];
  // const [filterSub, setFilterSub] = useState('All')
  // const onPressSub = (item) => {
  //   return (
  //     setFilterSub(item),
  //     setModalVisible(!modalVisible)
  //     );
  // }
  // const subs = Subjects.map((item,index)=>{
  //   return (
  //     <TouchableOpacity key={index}>
  //       <Text
  //         style={styles.modalText}
  //         onPress={() => onPressSub(item)}>
  //         {item}
  //       </Text>
  //     </TouchableOpacity>
  //   );
  // })
  //const [modalVisible, setModalVisible] = useState(false);
  

  const renderDropdown = () => {
    const orientation = useOrientation();
    return (
      <View style={styles.centeredView}>
        <Modal
          animationType="fade"
          transparent={true}
          visible={modalVisible}
          // onRequestClose={() => {
          //   Alert.alert('Modal has been closed.');
          //   setModalVisible(!modalVisible);
          // }}
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
  // modalText: {
  //   marginBottom: 15,
  //   textAlign: 'center',
  // },
  arrow:{
    marginLeft:15,
    marginTop:5,
    marginRight:3
  }
});

export default Dropdown;

