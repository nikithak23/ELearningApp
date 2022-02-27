import React,{useState} from 'react';
import axios from 'axios';
import {Text, View,StyleSheet, Image, ScrollView,TouchableOpacity,TextInput,FlatList} from 'react-native';
import {StackActions} from '@react-navigation/native';

const NoSearchResult=({navigation})=> {

  const baseUrl = 'https://elearningapp-api.herokuapp.com';
  const token='eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwiZXhwIjoxNjQ1OTUzMzQwLCJpYXQiOjE2NDU5MzUzNDB9.KZwtiCEdRyIdliQRKqe3KLjx9jjKUTlppvNHC3Bs_WDpn3LWPYmK2VNwGIONyghgxKH6IwOfDKz9nQ2KIatkOw';
  const [enteredText, setEnteredText] = useState ('');


  const goSearch=async()=>{
    if(enteredText){
      console.log(enteredText);
      try {
        const response = await axios.get(`${baseUrl}/subject/search/${enteredText}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        console.log(response.status);
        let subjectData=response.data.data;
        let subName=subjectData[0].subjectName
        console.log(subName);
        if(response.status===200){
          setEnteredText('');
          navigation.navigate('Subjects');
        }
      } 
      
      catch (err) {
        setEnteredText('');
        console.log(err);
        alert('Enter a valid Search Item');
      }
  }

  else{
    alert('Enter a Search Item');
  }
  }


return(
<View style={styles.container}>
      <TouchableOpacity onPress={() => navigation.goBack()}>
        <Image source={require('../Images/Search/btnBack.png')} style={styles.btnBack} />
      </TouchableOpacity>
      <Text style={styles.title}>Search Result</Text>
      <Image style={styles.image} source={require('../Images/Search/notFound.png')}/>
      <Text style={styles.text}>Not Found</Text>
      <Text style={styles.desc}>Search not found please try again</Text>

      <View style={styles.searchContainer}>
            <TextInput
                onChangeText={value => setEnteredText(value)} 
                value={enteredText}
                style={styles.input}  
            />
            <TouchableOpacity onPress={goSearch}>
              <Image source={require('../Images/Search/searchIcon.png')} style={styles.searchIcon}/>
            </TouchableOpacity>
         </View>

</View>
)};

export default NoSearchResult;


const styles = StyleSheet.create({
    container: {
      height: '100%',
      width: '100%',
      //justifyContent: 'center',
      //alignItems: 'center',
      //backgroundColor:'#4C93FF',
    },
    btnBack: {
      marginTop: 32,
      marginHorizontal:32,
    },
    title:{
      marginTop: 20,
      marginHorizontal:32,
      color:'#292929',
      fontSize:32,
      fontWeight:'700',
    },
    image:{
      alignSelf:'center',
      height:254.28,
      width:192.08,
      marginTop:50,
    },
    text:{
      marginTop:50,
      color:'#000000',
      fontSize:28,
      fontWeight:'600',
      textAlign:'center',
    },
    desc:{
      marginTop:7,
      color:'#676666',
      fontSize:16,
      textAlign:'center',
    },
    searchContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      height: 70,
      borderWidth: 1,
      borderColor: 'rgba(41,94,255,0.05)',
      backgroundColor:'#FFFFFF',
      borderRadius:18,
      marginTop:30,
      marginHorizontal:30,
    },
    input: {
    flex:1,
    color:'black',
    fontSize:20,
    paddingHorizontal:15,
    },
    searchIcon:{
    marginTop:18,
    marginHorizontal:-4
    },

  });