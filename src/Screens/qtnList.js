import React, {useState} from 'react';
import {Text, Image, View, StyleSheet,TouchableOpacity,ScrollView,FlatList} from 'react-native';
import axios from 'axios';
import {useFocusEffect} from '@react-navigation/core';



const QtnList =({navigation,route})=>{

    const courseId=route?.params.courseId;
    const courseName=route?.params.courseName;
    const token=route?.params.token;
    const key=route?.params.key;
    const baseUrl = 'https://elearningapp-api.herokuapp.com';
    const [questions,setQuestions] = useState([]);
    let n=0;
    


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
                <Text style={styles.qtnNo}>{item.testNumber}.</Text>
                <Text style={styles.qtn}>{item.questions}</Text>
              </TouchableOpacity>
            </ScrollView>
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
    marginTop:Platform.OS === 'ios' ? 50 : 20,
    marginBottom:15,
    marginHorizontal:28,
    },
    headerTxt:{
    marginTop:Platform.OS === 'ios' ? 50 : 20,
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

