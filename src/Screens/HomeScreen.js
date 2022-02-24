import React from 'react';
import {Text, View, StyleSheet, Image, ScrollView,TouchableOpacity} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
Icon.loadFont().then();



const HomeScreen = ({navigation,route}) => {
 
  const notif =()=>{
    navigation.navigate('Subjects');
  }


  return (
    <View>
    <View style={styles.header}>
      <TouchableOpacity onPress={notif}>
      <Icon
        name="notifications-outline"
        size={33}
        color="#8E8F93"
        style={styles.icon}
      />
    </TouchableOpacity >
    </View>

    <View style={styles.container}>
      <Text style={styles.greet}>Hi, Name</Text>
      <Text style={styles.desc}>What would you like to study today?</Text>
      <Text style={styles.desc}>you can search below.</Text>
    </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    height: '100%',
    width: '100%',
    //justifyContent: 'center',
    alignItems: 'center',
    //backgroundColor:'#4C93FF',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
  icon: {
    marginTop: 30,
    marginHorizontal:32,
  },
  greet: {
    fontSize: 36,
    color: 'black',
    fontWeight:'500',
    lineHeight: 43,
    textAlign:'center',
    marginTop:22,
    marginBottom:28,
  },
  desc: {
    fontSize: 21,
    color: '#595B60',
    fontWeight:'300',
    lineHeight: 28,
    textAlign:'center',
  },
});
export default HomeScreen;
