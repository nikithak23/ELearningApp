import React,{useEffect, useState} from 'react';
import {Text, View, StyleSheet, Image, ScrollView,TouchableOpacity,TextInput,FlatList} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
Icon.loadFont().then();


const Subjects = [
  {title: 'Physics'},
  {title: 'Biology'},
  {title: 'Chemistry'},
  {title: 'Mathematics'},
  {title: 'Geography'},
  {title: 'Art and culture'},
];


const HomeScreen = ({navigation,route}) => {

  const [enteredText, setEnteredText] = useState ('');
  const [searchedItems, setSearchedItems] = useState([]);

  useEffect (() => {
    setSearchedItems(Subjects.filter(item=>
        {return item.title.toLowerCase().includes(enteredText.toLowerCase());}
        ),
        );
    },[enteredText, Subjects]);

  const notif =()=>{
    navigation.navigate('Subjects');
  }

  const goSearch=()=>{
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

  const renderSearchList=({item})=>{
    return (
      <View>
        <TouchableOpacity onPress={()=>{setEnteredText(item.title)}}>
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
    marginTop:22,
    marginBottom:28,
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
    //justifyContent: 'center',
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
  fontSize:14,
  paddingHorizontal:15,
  marginHorizontal:30,
  marginVertical:4
},


});
export default HomeScreen;
