import React, {useState, useEffect} from 'react';
import axios from 'axios';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  FlatList,
  ScrollView,
} from 'react-native';
import CircularProgress from 'react-native-circular-progress-indicator';
import Icon from 'react-native-vector-icons/Ionicons';


const TestResult=({navigation,route})=>{
  const percent=route?.params.percent;
  const score=route?.params.score;
  const token=route?.params.token;
  const lid=route?.params.lid;
  const lName=route?.params.lName;
  const cid=route?.params.cid;
  const cName=route?.params.cName;

  console.log(percent,score,cid,cName,lid,lName,token);
return(
<View style={styles.container}>

  <View style={styles.header}>
    <TouchableOpacity onPress={()=>navigation.navigate('CourseScreen',{
      token:token,
      lid:lid,
      lName:lName,
      cid:cid,
      cName:cName,
    })}>
    <Image source={require('../Images/TestPage/btnCancel.png')} style={styles.btn} />
    </TouchableOpacity >
  </View>

  <View style={styles.resultContainer}>
            <CircularProgress
              value={percent}
              radius={80}
              duration={1000}
              textColor='black' //{'transparent'}
              fontSize={25}
              valueSuffix={'%'}
              maxValue={100}
              activeStrokeWidth={10.5}
              inActiveStrokeWidth={10.5}
              inActiveStrokeColor={'#999'}
              inActiveStrokeOpacity={0.35}
            >
            </CircularProgress>
            <Text style={styles.Text1}>Bravo!</Text>
            <Text style={styles.Text2}>You are just {(100-percent)/10} correct questions away from 100%. You can do it.
            </Text>
  </View>

</View>
)
}
export default TestResult;

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
  resultContainer:{
    //justifyContent:'center',
    alignItems:'center',
    marginVertical:120,
    marginHorizontal:20,
  },
  Text1:{
    textAlign:'center',
    fontSize:20,
    fontWeight:'700',
    color:'black',
    marginTop:80,
    marginBottom:7,

  },
  Text2:{
    textAlign:'center',
    fontSize:17,

  },
});

