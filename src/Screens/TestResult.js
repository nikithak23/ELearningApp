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



const TestResult=({navigation,route})=>{
  const percent=route?.params.percent;
  const score=route?.params.score;
  const attempted=route?.params.attempted;
  const rightAnswer=route?.params.rightAnswer;
  const star =route?.params.star;
  const key=route?.params.key;
  const timeup=route?.params.timeup;//timeup=1=>timeup submit, timeup=0=>voluntary submit
  //console.log('RESULTpage',timeup);
  //console.log(key);

  const token=route?.params.token;
  const lid=route?.params.lid;
  const lName=route?.params.lName;
  const cid=route?.params.cid;
  const cName=route?.params.cName;
  const len=route?.params.len;
  //console.log(cid,lid,cName)
return(
<View style={styles.container}>

  <View style={styles.header}>
    <TouchableOpacity onPress={()=>
      navigation.navigate('CourseScreen',{
      token:token,
      lid:lid,
      lName:lName,
      cId:cid,
      cName:cName,
    })
    }>
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
              title={`${attempted} of ${len} answered`} 
              titleColor={'#8E8F93'}
              titleStyle={styles.CircularTxt}
            >
            </CircularProgress>
            {percent!==100&&percent!==0&&timeup===0&&
            <>
            <Text style={styles.Text1}>Bravo!</Text>
            <Text style={styles.Text2}>You are just {len-rightAnswer} correct questions away from 100%. You can do it.</Text>
            </>}
            {percent===100&&timeup===0&&
            <>
            <Text style={styles.Text1}>Bravo!</Text>
            <Text style={styles.Text2}>Congratulations. You did it!</Text>
            </>}
            {percent===0&&timeup===0&&
            <>
            <Text style={styles.Text1}>Alas!</Text>
            <Text style={styles.Text2}>Go for it again, Champ. You got this!</Text>
            </>}
            {timeup===1&&
            <>
            <Text style={styles.Text1}>Oooops!</Text>
            <Text style={styles.Text2}>You ran out of time.</Text>
            <Text style={styles.Text2}>Your test has been submitted by default.</Text>
            </>}
    </View>

    <View>
            <TouchableOpacity style={styles.TryAgnContainer} onPress={() =>
              navigation.navigate('Tests',{ 
                cid: cid, 
                cName: cName,
                token:token,
                id:lid,
                lName:lName,
                key:key+1,
                timeup:0
              })
            }>
              <View style={styles.TryAgnBtn}>
                  <Text style={styles.TryAgnTxt}>Try Again</Text>
                  <Image source={require('../Images/TestPage/yesArrow.png')} style={styles.TryAgnImg}/>
              </View>
            </TouchableOpacity>
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
    marginTop:Platform.OS === 'ios' ? 50 : 20,
    marginBottom:15,
    marginHorizontal:28,
  },
  resultContainer:{
    //justifyContent:'center',
    alignItems:'center',
    marginVertical:100,
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
  CircularTxt:{
    fontWeight: 'bold',
    fontSize:13,
    marginTop:-10,
  },

  TryAgnContainer: {
    height: 50,
    width: 320,
    borderRadius: 13,
    backgroundColor: '#4C93FF',
    alignSelf:'center',
  },
  TryAgnBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
    marginLeft: 70,
  },
  TryAgnTxt: {
    marginVertical: 10,
    fontSize: 20,
    color: 'white',
  },
  TryAgnImg: {
    width: 24,
    height: 24, 
  },
});

