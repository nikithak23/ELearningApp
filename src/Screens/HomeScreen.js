import React,{useEffect, useState} from 'react';
import {Text, View, StyleSheet, Image, ScrollView,TouchableOpacity,TextInput} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
Icon.loadFont().then();


const HomeScreen = ({navigation,route}) => {

  const [enteredText, setEnteredText] = useState ('');
  const notif =()=>{
    navigation.navigate('Subjects');
  }


  return (
    <View style={{backgroundColor:'#f6f8fa'}}>
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



          <View style={styles.searchContainer}>
            <TextInput
                onChangeText={value => setEnteredText(value)} 
                //value={enteredText}
                style={styles.input}  
            />
            <TouchableOpacity>
              <Icon
              name="search"
              size={33}
              color="#FFFFFF"
              style={styles.searchIcon}
            />
            </TouchableOpacity>
        </View>
       
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
  searchContainer: {
    flexDirection: 'row',
    //justifyContent: 'center',
    alignItems: 'center',
    height: 70,
    borderWidth: 1,
    borderColor: '#FFFFFF',
    backgroundColor:'#FFFFFF',
    borderRadius:18,
    marginTop:50,
    marginHorizontal:30,
    //shadowColor:'0 12px 18px 0 rgba(41,94,255,0.05)',
},
  input: {
  flex:1,
  color:'black',
  fontSize:20,
  paddingHorizontal:15,
},
searchIcon:{
  backgroundColor:'#4C93FF',
  borderRadius:13,
  padding:10,
  marginHorizontal:10,
  //shadowColor:'0 10px 20px 0 rgba(76,147,255,0.4)',
},
});
export default HomeScreen;
