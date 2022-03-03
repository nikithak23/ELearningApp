import React, {useState, useEffect, useContext} from 'react';
import {Text, Image, View, StyleSheet, ImageBackground, TouchableOpacity,ScrollView} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import axios from 'axios';



const TestScreen =({navigation,route})=>{

    const baseUrl = 'https://elearningapp-api.herokuapp.com';
    const [questions,setQuestions] = useState([]);
    const [n,setN] = useState(0);
    const [markedAnswer,setMarkedAnswer]=useState('');
    const courseId=1;
    const courseName='Introduction to Physics';
    const token='eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwiZXhwIjoxNjQ2MzI2MTg3LCJpYXQiOjE2NDYzMDgxODd9.b5gSXYhPa6PU_YQXlOQ3e1FmK-Ty3lIsSVcVEGQGbw3tMODjdtTOf_geLOL-AES5ri8u0K0k5WCzcOPqAddy0g';
  

    const getQtns = async () => {//Recently studied api
      try {
        const response = await axios.get(`${baseUrl}/subject/gettest/1`, {
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
      //console.log(questions[0].questions)

      useEffect(()=>{
        getQtns();
        },[])

  

const sendAns = async () => {//Send Answers
  try {
    const response = await axios.get(`${baseUrl}/subject/begintest/${courseId}/${questions[n].id}`, 
    {markedAnswer},
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
    );
    console.log(response.status);
    console.log('Sent');
    console.log(response.data.data);
  } catch (err) {
    console.log('Not Sent');
    console.log(err);
  }
};


    const nxt=async()=>{
      if(n<9){
        if(markedAnswer){
          sendAns();
          console.log(markedAnswer);
          setMarkedAnswer('')
          setN(n+1);  
        }
        else{
          console.log('Not Sent');
          console.log('Ans',markedAnswer);
          setN(n+1);
        }
      }

      else{
        if(markedAnswer){
          sendAns();
          console.log(markedAnswer);
          setMarkedAnswer('')
          alert('Do you wish to Submit?')
        }
        else{
          console.log('Not Sent');
          console.log('Ans',markedAnswer);
          alert('Do you wish to Submit?')
        }
      }
      
    } 

    const prev=async()=>{
      if(n>0){
        if(markedAnswer){
          sendAns();
          console.log('Ans',markedAnswer);
          setMarkedAnswer('')
          setN(n-1);  
        }
        else{
          console.log('Not Sent');
          console.log('Ans',markedAnswer);
          setN(n-1);
        }
      }
      else{
        if(markedAnswer){
          sendAns();
          console.log(markedAnswer);
          setMarkedAnswer('')
          alert('You have reached the start of the test.')
        }
        else{
          console.log('Not Sent');
          console.log('Ans',markedAnswer);
          alert('You have reached the start of the test.')
        }
      }
    } 





  return(
    <View style={styles.container}>

      <View style={styles.header}>
        <TouchableOpacity>
        <Image source={require('../Images/TestPage/btnCancel.png')} style={styles.btn} />
        </TouchableOpacity >
        <Image source={require('../Images/TestPage/icnTimer.png')} style={styles.timer} />
        <Text style={styles.timer} >Time Remaining</Text>
        <TouchableOpacity onPress={()=>navigation.navigate('QtnList')}>
        <Image source={require('../Images/TestPage/icnQtnList.png')} style={styles.btn} />
        </TouchableOpacity >
      </View>


      {len!==0? (
      <ScrollView>
                <Text style={styles.qtn}>{questions[n].questions}</Text>
                <TouchableOpacity style={styles.optionContainer} onPress={()=>setMarkedAnswer(questions[n].option_A)}>
                <Text style={styles.options}>A.   {questions[n].option_A}</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.optionContainer} onPress={()=>setMarkedAnswer(questions[n].option_B)}>
                <Text style={styles.options}>B.   {questions[n].option_B}</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.optionContainer} onPress={()=>setMarkedAnswer(questions[n].option_C)}>
                <Text style={styles.options}>C.   {questions[n].option_C}</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.optionContainer} onPress={()=>setMarkedAnswer(questions[n].option_D)}>
                <Text style={styles.options}>D.   {questions[n].option_D}</Text>
                </TouchableOpacity>
      </ScrollView>
      ):null}


    
      <View style={styles.footer}>
      {len!==0? (
        <View>
          <Text style={styles.footerTxt1}>C{courseId}: {courseName}</Text>
          <Text style={styles.footerTxt2}>{questions[n].id} of {len} question</Text>
        </View>
        ):null}
        <View style={{flexDirection:'row'}}>
        <TouchableOpacity onPress={prev}>
        <Image source={require('../Images/TestPage/btnPrevQtn.png')} style={styles.footerBtn} />
        </TouchableOpacity >
        <TouchableOpacity onPress={nxt}>
        <Image source={require('../Images/TestPage/btnNxtQtn.png')} style={styles.footerBtn} />
        </TouchableOpacity >
        
        </View>
      </View>
     


    </View>
    )
}
export default TestScreen;


const styles = StyleSheet.create({
    container: {
    height: '100%',
    width: '100%',
    backgroundColor:'#f6f8fa',
    flex:1,
    },
    header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor:'white',
    },
    btn: {
      marginTop:20,
      marginBottom:15,
      marginHorizontal:28,
    },
    timer:{
      marginTop:20,
      marginBottom:15,
      marginHorizontal:-45,
      alignSelf:'center'
    },
    footer: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      backgroundColor:'white',
      bottom:0,
    },
    footerBtn:{
      marginTop:20,
      marginBottom:15,
      marginRight:28,
    },
    footerTxt1:{
      marginLeft:28,
      marginTop:9,
      color:'black',
      fontSize:14,
      fontWeight:'500'
    },
    footerTxt2:{
      marginLeft:28,
      fontSize:14
    },
  qtn: {
    fontSize: 20,
    lineHeight:28,
    color: 'black',
    fontWeight:'700',
    textAlign:'center',
    marginTop:35,
    marginBottom:25,
    marginHorizontal:28
  },
  optionContainer:{
    //borderColor:'black',
    //borderWidth:1,
    borderRadius:25,
    marginVertical:5,
    backgroundColor:'white',
    marginHorizontal:28,
  },
  options: {
    fontSize: 15,
    color: '#595B60',
    fontWeight:'500',
    textAlign:'left',
    marginVertical:18,
    marginHorizontal:15,
  },




  

  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    height: 70,
    borderWidth: 1,
    borderColor: 'rgba(41,94,255,0.05)',
    backgroundColor:'#FFFFFF',
    borderRadius:18,
    marginTop:50,
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
search: {
  color:'black',
  fontSize:15,
  fontWeight:'400',
  paddingHorizontal:15,
  marginHorizontal:30,
  marginVertical:3,
},
currentHead:{
  marginTop:25,
  marginHorizontal:30,
  fontSize: 16,
  color: '#595B60',
  letterSpacing:0.69
},
bottomCards:{
  marginLeft:25,  
  backgroundColor:'#FFFFFF', 
  width:260,
  height:270,
  marginTop:10,
  borderRadius:18
},
imgContainer:{
  width:260,height:160,
  borderTopRightRadius:18,borderTopLeftRadius:18,
  backgroundColor:'#FFA4A4'
},
img:{
  height:80,
  width:80,
  marginHorizontal:90,
  marginVertical:40,
},
subName:{
  color:'#3A7FE7',
  fontSize:13,
  fontWeight:'500',
  paddingHorizontal:10,
  paddingTop:6
},
ChapName:{
  color:'#191B26',
  fontSize:18,
  fontWeight:'500',
  paddingHorizontal:10,
  paddingTop:2
},
percentText:{
  color:'green',
  fontSize:13,
  fontWeight:'400',
  //paddingHorizontal:0,
  paddingTop:6
},
progressBar: {
  height: 3,
  width: '70%',
  flexDirection: "row",
  backgroundColor: '#8E8F93',
  //borderColor: 'black',
  //borderWidth: 2,
  //borderRadius: 5,
  marginTop:10,
  marginHorizontal:10,
}

});



 
                