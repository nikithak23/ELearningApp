import React, {useState} from 'react';
import {Text, Image, View, StyleSheet,TouchableOpacity,ScrollView,FlatList} from 'react-native';
import axios from 'axios';
import {useFocusEffect} from '@react-navigation/core';
import useOrientation from '../hooks/useOrientation';


const QtnList =({navigation,route})=>{

    const orientation = useOrientation();
    const courseId=route?.params.courseId;
    const courseName=route?.params.courseName;
    const token=route?.params.token;
    const key=route?.params.key;
    const answered=route?.params.answered;
    const baseUrl = 'https://elearningapp-api.herokuapp.com';
    const [questions,setQuestions] = useState([]);
    let n=0;
    console.log('ansssssss',answered);


    const getQtns = async () => {//Get questions api
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
    let len=questions.length;


    useFocusEffect(React.useCallback(() => {
          getQtns();
        }, []),
    );




    const renderQuestions = ({item}) => {
      
        return (
            <ScrollView>
              <TouchableOpacity style={{flexDirection:'row'}} onPress={()=>{
                navigation.navigate('Tests',{
                  cid:courseId,
                  cName:courseName,
                  token:token,
                  num:item.testNumber,
                  key:key}
                  )}
                  }>
                
                <Text style={orientation.isPortrait?answered.includes(item.testNumber)?[styles.qtnNo,{color:'blue'}]:styles.qtnNo
                            :answered.includes(item.testNumber)?[styles.qtnNoLs,{color:'blue'}]:styles.qtnNoLs}>
                {item.testNumber}.</Text>
                <Text style={orientation.isPortrait?answered.includes(item.testNumber)?[styles.qtn,{color:'blue'}]:styles.qtn
                            :answered.includes(item.testNumber)?[styles.qtnLs,{color:'blue'}]:styles.qtnLs}>
                    {item.questions}</Text>
              </TouchableOpacity>
            </ScrollView>
        );
    };
        
//answered.includes(item.testNumber)?[styles.qtn,{color:'blue'}]:styles.qtn
  return(
    <View style={styles.container}>

      <View style={styles.header}>
          <TouchableOpacity onPress={()=>navigation.goBack()}>
            <Image source={require('../Images/TestPage/btnBack.png')} 
            style={orientation.isPortrait?styles.btn:styles.btnLs} />
          </TouchableOpacity >
          <Text style={orientation.isPortrait?styles.headerTxt:styles.headerTxtLandscape} >Questions</Text>
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
    marginTop:Platform.OS === 'ios' ? 50 : 20,
    marginBottom:15,
    marginHorizontal:28,
    },
    btnLs: {
      marginTop:Platform.OS === 'ios' ? 50 : 20,
      marginBottom:15,
      marginHorizontal:90,
      },
    headerTxt:{
    marginTop:Platform.OS === 'ios' ? 50 : 20,
    marginBottom:15,
    marginHorizontal:80,
    color:'black',
    fontSize:15,
    fontWeight:'500'
    },
    headerTxtLandscape:{
    marginTop:Platform.OS === 'ios' ? 50 : 20,
    marginBottom:15,
    marginHorizontal:120,
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
   qtnNoLs: {
    fontSize: 15,
    lineHeight:20,
    color: 'black',
    fontWeight:'500',
    textAlign:'left',
    marginVertical:15,
    marginLeft:90
    },
    qtnLs: {
    fontSize: 15,
    lineHeight:20,
    color: 'black',
    fontWeight:'500',
    textAlign:'left',
    marginVertical:15,
    marginLeft:22,
    width:'83%',
    marginRight:90,
   },
});

