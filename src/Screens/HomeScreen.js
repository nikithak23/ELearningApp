import React,{useEffect, useState} from 'react';
import axios from 'axios';
import {Text, View, StyleSheet, Image, ScrollView,TouchableOpacity,TextInput,FlatList} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import {Card, CardTitle, CardContent, CardAction, CardButton, CardImage} from 'react-native-cards';
import Animated from 'react-native-reanimated';
Icon.loadFont().then();


const Subjects = [
  {title: 'Physics'},
  {title: 'Biology'},
  {title: 'Chemistry'},
  {title: 'Mathematics'},
  {title: 'Geography'},
  {title: 'Art and culture'},
];
/*
const CurrentlyStudying=[
  {title:'Geography',image: require('../Images/Subject/geography.png'),chapter:'Elements of Physical Geography'},
  {title:'Biology',image: require('../Images/Subject/bio.png'),chapter:'Introduction to Biology'},
]
*/

const HomeScreen = ({navigation,route,token,name,data}) => {
  //console.log(token);
  //console.log(name);
  //console.log(data)
  const baseUrl = 'https://elearningapp-api.herokuapp.com';
  const [enteredText, setEnteredText] = useState ('');
  const [searchedItems, setSearchedItems] = useState([]);
//const [currentlyStud, setCurrentlyStud] = useState(true);

  
  /*
  const [SubObj, setSubObj] = useState([]);
  const [Sub, setSub] = useState([]);
  const getSubjects = async () => {
    try {
      const response = await axios.get(`${baseUrl}/subject/get/subjects`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setSubObj(response.data.data);
      //console.log(SubObj[6].subjectName)
    } catch (err) {
      console.log(err);
    }
    for(i=0;i<7;i++){
      Sub[i].title=SubObj[i].subjectName;
      console.log(Sub);
    }
  };
  getSubjects();
  */
  

  useEffect (() => {
    
    setSearchedItems(Subjects.filter(item=>
        {return item.title.toLowerCase().includes(enteredText.toLowerCase());}
        ),
        );
    },[enteredText, Subjects]);


  const notif =()=>{
    navigation.navigate('Notification');
  }

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
      navigation.navigate('NoSearch',{token:token});
      //alert('Enter a valid Search Item');
    }
}

else{
  alert('Enter a Search Item');
}
}


const renderSearchList=({item})=>{
    return (
      <View>
        <TouchableOpacity onPress={()=>{
          setEnteredText(item.title);
          setSearchedItems(enteredText);
          }}>
        <Text style={styles.search}>{item.title}</Text>
        </TouchableOpacity>
      </View>
    
    );
  }

  const searchSuggestions = () => {
    return (
    <View>
     {searchedItems.length <= 0 ? null:
        (   <FlatList
            data={searchedItems}
            keyExtractor = {(item, index)=> index.toString()}
            horizontal={false}
            showVerticalScrollIndicator={false}
            renderItem={renderSearchList}/>
        )}
    </View>
    );
}


let percent='50%';
  const renderCurrentStud = ({item})=>{
    return ( 
      <Card style = {styles.bottomCards}>
        <View style={styles.imgContainer}>
          <Image source = {{uri : item.subjectName}} style= {styles.img} />
        </View>
          <Text style={styles.subName}>{item.subjectLogo.toUpperCase()}</Text>
          <Text style={styles.ChapName}>{item.courseName}</Text>
          <View style={{flexDirection:'row',alignItems:'center'}}>
          <View style={styles.progressBar}>
         <Animated.View style={[StyleSheet.absoluteFill],{backgroundColor:'green',width:percent}}/>
          </View>
          <Text style={styles.percentText}>{item.percent}% </Text>
          <Text style={styles.percentText}>{percent}</Text>
          </View>
          
      </Card>
    );
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
            <Text style={styles.greet}>Hi, {name}</Text>
            <Text style={styles.desc}>What would you like to study today?</Text>
            <Text style={styles.desc}>you can search below.</Text>


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
         <View style={{alignItems:'flex-start'}}>
          {enteredText !== '' ? searchSuggestions() : null}
         </View>


         {data!==null ?          
        <View>
            <Text style={styles.currentHead}>CURRENTLY STUDYING</Text>
            <FlatList 
              data = {data}
              renderItem = {renderCurrentStud}
              keyExtractor = {(item, index)=> index.toString()}
              horizontal={true}
              showsHorizontalScrollIndicator={false}
            />
        </View>
            : null}

         
        </View>

    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    height: '100%',
    width: '100%',
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
    marginTop:20,
    marginBottom:20,
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
  backgroundColor: 'gray',
  borderColor: 'black',
  //borderWidth: 2,
  borderRadius: 5,
  marginTop:10,
  marginHorizontal:10,
}

});
export default HomeScreen;
