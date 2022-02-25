import React,{useEffect, useState} from 'react';
import {Text, View, StyleSheet, Image, ScrollView,TouchableOpacity,TextInput,FlatList} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import {Card, CardTitle, CardContent, CardAction, CardButton, CardImage} from 'react-native-cards';
Icon.loadFont().then();


const Subjects = [
  {title: 'Physics'},
  {title: 'Biology'},
  {title: 'Chemistry'},
  {title: 'Mathematics'},
  {title: 'Geography'},
  {title: 'Art and culture'},
];
const CurrentlyStudying=[
  {title:'Geography',image: require('../Images/Subject/geography.png'),chapter:'Elements of Physical Geography'},
  {title:'Biology',image: require('../Images/Subject/bio.png'),chapter:'Introduction to Biology'},
]



const HomeScreen = ({navigation,route}) => {

  const [enteredText, setEnteredText] = useState ('');
  const [searchedItems, setSearchedItems] = useState([]);
  const [currentlyStud, setCurrentlyStud] = useState(true);

  useEffect (() => {
    setSearchedItems(Subjects.filter(item=>
        {return item.title.toLowerCase().includes(enteredText.toLowerCase());}
        ),
        );
    },[enteredText, Subjects]);

  const notif =()=>{
    navigation.navigate('Notification');
  }

  const goSearch=()=>{
    if(enteredText){
    if(searchedItems.length===0)
    {
      setEnteredText('');
    navigation.navigate('Profile');
    }
    else
    {
    navigation.navigate('Subjects');
    setEnteredText('');
  }
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


  const renderCurrentStud = ({item})=>{
    return (
      
      <Card style = {styles.bottomCards}>
        <View style={styles.imgContainer}>
          <Image source = {item.image} style= {styles.img} />
        </View>
          <Text style={styles.subName}>{item.title.toUpperCase()}</Text>
          <Text style={styles.ChapName}>{item.chapter}</Text>
      </Card>
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
                value={enteredText}
                style={styles.input}  
            />
            <TouchableOpacity onPress={goSearch}>
              <Icon
              name="search"
              size={33}
              color="#FFFFFF"
              style={styles.searchIcon}
            />
            </TouchableOpacity>
         </View>
         <View style={{alignItems:'flex-start'}}>
          {enteredText !== '' ? searchSuggestions() : null}
         </View>


         {currentlyStud === true ?          
        <View >
            <Text style={styles.currentHead}>CURRENTLY STUDYING</Text>
            <FlatList 
              data = {CurrentlyStudying}
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
    //justifyContent: 'center',
    //alignItems: 'center',
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
  backgroundColor:'#4C93FF',
  borderRadius:13,
  borderColor:'rgba(76,147,255,0.4)',
  padding:10,
  marginHorizontal:10,
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

});
export default HomeScreen;
