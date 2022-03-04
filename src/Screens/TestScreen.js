import React, {useState, useEffect, useContext} from 'react';
import {Text, Image, View, StyleSheet, ImageBackground, TouchableOpacity,ScrollView} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import axios from 'axios';
import Modal from 'react-native-modal';



const TestScreen =({navigation,route})=>{
    
    const courseId=route?.params.cid;
    const courseName=route?.params.cName;
    const token=route?.params.token;
    const lid=route?.params.id;//reqd to go bck to course page
    const lName=route?.params.lName;//reqd to go back to course page
    const baseUrl = 'https://elearningapp-api.herokuapp.com';
    const [questions,setQuestions] = useState([]);
    let submitData=[];
    //const [noAnswered,setNoAnswered] = useState(1);
    const [n,setN] = useState(0);
    const [markedAnswer,setMarkedAnswer]=useState('');
    const [modalVisible,setModalVisible]=useState(false);
    //const courseId=1;
    //const courseName='Introduction to Physics';
    //const token='eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwiZXhwIjoxNjQ2MzgxNDcxLCJpYXQiOjE2NDYzNjM0NzF9.7UI6PQSKEypBC-Bdg_4uQCZWJt5M429qN3bAduZV1aeLYIMiRSpyY9bu0XXXmA55Fb5d8QR0dJPapUJepHyORQ';
  

    const getQtns = async () => {//Get questions
      try {
        const response = await axios.get(`${baseUrl}/subject/gettest/${courseId}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        console.log('Get questions Api',response.status);
        setQuestions(response.data.data);
      } catch (err) {
        console.log(err);
      }
    };
      //console.log('Questions', questions);
      let len=questions.length;
      //console.log('len',len);
      //console.log(questions[0].questions)

    useEffect(()=>{
        getQtns();
    },[])

  

const sendAns = async () => {//Send Answers
  console.log(markedAnswer);
  //setNoAnswered(noAnswered+1);
  //console.log(noAnswered);
  try {
    const response = await axios.get(`${baseUrl}/subject/begintest/${courseId}/${questions[n].testNumber}?markedAnswer=${markedAnswer}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    console.log('Send answers Api',response.status);
    console.log('Sent');
    console.log(response.data.data);
    
  } catch (err) {
    console.log('Not Sent');
    console.log(err);
  }
};



const submitTest=async()=>{//Submit test
  try {
    const response = await axios.get(`${baseUrl}/subject/submittest/${courseId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    console.log('Submit Test Api',response.status);
    submitData=response.data.data;
    console.log(submitData);
    setModalVisible(false);
    setN(0);
    //setNoAnswered(1);
    //console.log(courseId,lid,courseName)
    navigation.navigate('TestResult',{
      percent:submitData[0].percentScore,
      attempted:submitData[0].attempted,
      rightAnswer:submitData[0].rightAnswer,
      score:submitData[0].score,
      star:submitData[0].star,
      //following params are needed to go back to course page
      cid:courseId, 
      cName:courseName,
      token:token,
      lId:lid,
      lName:lName,
      len:len,
    })
  } catch (err) {
    console.log(err);
    alert(err)
    setModalVisible(false);
  }
};



  const nxt=async()=>{
      if(n<9){
        if(markedAnswer){
          sendAns();
          //console.log(markedAnswer);
          setMarkedAnswer('')
          setN(n+1);  
        }
        else{
          //console.log('Not Sent');
          setN(n+1);
        }
      }
      else{
        if(markedAnswer){
          sendAns();
          //console.log(markedAnswer);
          setMarkedAnswer('')
          //if(noAnswered<10)
          //alert('Answer all the questions to submit the test')
          //else
          setModalVisible(true);
        }
        else{
          //if(noAnswered<10)
          //alert('Answer all the questions to submit the test')
          //else
          setModalVisible(true);
        }
      }
  } 


  const prev=async()=>{
      if(n>0){
        if(markedAnswer){
          sendAns();
          //console.log('Ans',markedAnswer);
          setMarkedAnswer('')
          setN(n-1);  
        }
        else{
          //console.log('Not Sent');
          //console.log('Ans',markedAnswer);
          setN(n-1);
        }
      }
      else{
        if(markedAnswer){
          sendAns();
          //console.log(markedAnswer);
          setMarkedAnswer('')
          alert('You have reached the start of the test.')
        }
        else{
          console.log('Not Sent');
          alert('You have reached the start of the test.')
        }
      }
    } 





  return(
    <View style={styles.container}>

      <View style={styles.header}>
        <TouchableOpacity onPress={()=>navigation.goBack()}>
        <Image source={require('../Images/TestPage/btnCancel.png')} style={styles.btn} />
        </TouchableOpacity >
        <Image source={require('../Images/TestPage/icnTimer.png')} style={styles.timer} />
        <Text style={styles.timer} >Time Remaining</Text>
        <TouchableOpacity onPress={()=>navigation.navigate('QtnList',{
          courseId:courseId,courseName:courseName,token:token
        })}>
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
                {(questions[n].option_D)?(
                <TouchableOpacity style={styles.optionContainer} onPress={()=>setMarkedAnswer(questions[n].option_D)}>
                <Text style={styles.options}>D.   {questions[n].option_D}</Text>
                </TouchableOpacity>
                ):<></>}
      </ScrollView>
      ):null}


    
      <View style={styles.footer}>
      {len!==0? (
        <View>
          <Text style={styles.footerTxt1}>C{courseId}: {courseName}</Text>
          <Text style={styles.footerTxt2}>{n+1} of {len} question</Text>
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
     


      <Modal isVisible={modalVisible}>
          <View style={styles.ModalMainContainer}>
              <View style={styles.ModalTopContainer}>
                <View style={styles.ModalContainer}></View>
                <Text style={styles.ModalLogoutText}>Submit Test</Text>
                <Text style={styles.ModalLogoutText1}>
                  Are you sure you want to submit the test?
                </Text>
              </View>

              <View style={styles.ModalBottomContainer}>
                <TouchableOpacity style={styles.ModalNoContainer} onPress={()=>setModalVisible(false)}>
                  <Text style={styles.ModalNoText}>No</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.ModalYesContainer} onPress={submitTest}>
                  <View style={styles.ModalYesView}>
                    <Text style={styles.ModalYesText}>Yes</Text>
                    <Image source={require('../Images/TestPage/yesArrow.png')} style={styles.ModalYesImg}/>
                  </View>
                </TouchableOpacity>
              </View>
          </View>
      </Modal>


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
      marginTop:Platform.OS === 'ios' ? 50 : 20,
      marginBottom:15,
      marginHorizontal:28,
    },
    timer:{
      marginTop:Platform.OS === 'ios' ? 50 : 20,
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




  ModalMainContainer: {
    backgroundColor: 'white',
    position: 'absolute',
    bottom: -18,
    height: '35%',
    width: '100%',
    marginRight: 20,
    borderRadius: 15,
  },
  ModalTopContainer: {
    alignItems: 'center',
  },
  ModalContainer: {
    height: 2,
    borderRadius: 20,
    width: 40.2,
    backgroundColor: 'rgba(151,151,151,0.49)',
    marginTop: 15,
  },
  ModalLogoutText: {
    marginTop: 30,
    fontSize: 22,
    fontWeight: 'bold',
    lineHeight: 27,
    letterSpacing: 0,
    fontWeight: '500',
    color: '#191B26',
  },
  ModalLogoutText1: {
    color: '#595B60',
    fontWeight: '300',
    letterSpacing: 0,
    lineHeight: 28,
    textAlign: 'center',
    fontSize: 20,
    textAlign: 'center',
    width: 230,
    marginTop: 15,
  },
  ModalBottomContainer: {
    flexDirection: 'row',
    marginTop: 30,
  },
  ModalNoContainer: {
    height: 55,
    width: 125,
    borderWidth: 2,
    borderRadius: 13,
    marginLeft: 31,
    borderColor: '#4C93FF',
    alignItems: 'center',
    justifyContent: 'center',
  },
  ModalNoText: {
    color: '#4C93FF',
    fontSize: 20,
  },
  ModalYesContainer: {
    height: 55,
    width: 125,
    borderWidth: 2,
    borderRadius: 13,
    borderColor: '#4C93FF',
    marginLeft: 31,
    backgroundColor: '#4C93FF',
  },
  ModalYesView: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
    marginHorizontal: 10,
  },
  ModalYesText: {
    marginVertical: 14,
    fontSize: 20,
    color: 'white',
  },
  ModalYesImg: {
    width: 24,
    height: 24,
  },

});



 
                