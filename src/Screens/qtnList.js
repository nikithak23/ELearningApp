import React, {useState, useEffect, useContext} from 'react';
import {Text, Image, View, StyleSheet, ImageBackground, TouchableOpacity,ScrollView,FlatList} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import axios from 'axios';



const QtnList =({navigation,route})=>{

    const courseId=route?.params.courseId;
    const courseName=route?.params.courseName;
    const token=route?.params.token;
    const baseUrl = 'https://elearningapp-api.herokuapp.com';
    const [questions,setQuestions] = useState([]);
    let n=0;
    //const courseId=1;
    //const courseName='Introduction to Physics';
    //const token='eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwiZXhwIjoxNjQ2MzI2MTg3LCJpYXQiOjE2NDYzMDgxODd9.b5gSXYhPa6PU_YQXlOQ3e1FmK-Ty3lIsSVcVEGQGbw3tMODjdtTOf_geLOL-AES5ri8u0K0k5WCzcOPqAddy0g';
  

    const getQtns = async () => {//Recently studied api
      try {
        const response = await axios.get(`${baseUrl}/subject/gettest/${courseId}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        console.log(response.status);
        setQuestions(response.data.data);
      } catch (err) {
        console.log(err);
      }
    };
      //console.log('Questions', questions);
      let len=questions.length;
      console.log('len',len);

      useEffect(()=>{
        getQtns();
        },[])




    const renderQuestions = ({item}) => {
        return (
            <View style={{flexDirection:'row'}}>
                <Text style={styles.qtnNo}>{item.id}.</Text>
                <Text style={styles.qtn}>{item.questions}</Text>
            </View>
        );
    };
        

  return(
    <View style={styles.container}>

      <View style={styles.header}>
        <TouchableOpacity onPress={()=>navigation.goBack()}>
        <Image source={require('../Images/TestPage/btnBack.png')} style={styles.btn} />
        </TouchableOpacity >
        <Text style={styles.headerTxt} >Questions</Text>
      </View>


      {len!==0? (
        <FlatList
        data={questions}
        renderItem={renderQuestions}
        keyExtractor={(item) => item.id}
      />
      ):null}
     
    </View>
    )
}
export default QtnList;


const styles = StyleSheet.create({
    container: {
    height: '100%',
    width: '100%',
    backgroundColor:'#f6f8fa',
    flex:1,
    },
    header: {
    flexDirection: 'row',
    backgroundColor:'white',
    marginBottom:17,
    },
    btn: {
      marginTop:20,
      marginBottom:15,
      marginHorizontal:28,
    },
    headerTxt:{
      marginTop:20,
      marginBottom:15,
      marginHorizontal:80,
      color:'black',
      fontSize:15,
      fontWeight:'500'
    },
    qtnNo: {
        fontSize: 15,
        lineHeight:20,
        color: 'black',
        fontWeight:'500',
        textAlign:'left',
        marginVertical:15,
        marginLeft:20
      },
    qtn: {
        fontSize: 15,
        lineHeight:20,
        color: 'black',
        fontWeight:'500',
        textAlign:'left',
        marginVertical:15,
        marginLeft:22,
        width:'83%'
      },
    
});

