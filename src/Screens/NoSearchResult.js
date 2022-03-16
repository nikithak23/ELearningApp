import React,{useState,useEffect} from 'react';
import axios from 'axios';
import {Text, View,StyleSheet, Image, ScrollView,TouchableOpacity,TextInput,FlatList} from 'react-native';
import useOrientation from '../hooks/useOrientation';
import {Colors} from '../assets/Colors/index';
import {Strings} from '../assets/Strings/index';
import {Icons} from '../assets/Icons/index';
import {Images} from '../assets/Images/index';
import { Icon } from 'react-native-elements/dist/icons/Icon';


const NoSearchResult=({navigation,route})=> {
  const orientation = useOrientation();
  const baseUrl = 'https://elearningapp-api.herokuapp.com';
  const token=route.params.token;
  const [enteredText, setEnteredText] = useState ('');
  const [searchedItems, setSearchedItems] = useState([]);
  let [Sub, setSub] = useState([]);

  const getSub = async () => {
    //Get subjects api
    try {
      const response = await axios.get(`${baseUrl}/subject/get/subjects`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setSub(response.data.data);
    } catch (err) {
      console.log(err);
    }
  };
  useEffect(()=>{
    getSub();
  },[])

  useEffect (() => {
    setSearchedItems(Sub.filter(item=>
        {return item.subjectName.toLowerCase().includes(enteredText.toLowerCase());
        }),
        );
    },[enteredText,Sub]);

  const goSearch = async() => {
    if(enteredText){
      try {
        const response = await axios.get(`${baseUrl}/subject/search/${enteredText}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        let subjectData=response.data.data;
        let subName=subjectData[0].subjectName;
        let subId=subjectData[0].subjectId;
        if(response.status===200){
          setEnteredText('');
          navigation.navigate('SubjectDetails', {
            subject:subName,
            token: token,
            id: subId,
          })
        }
      } 
      
      catch (err) {
        setEnteredText('');
        console.log(err);
        alert('Enter a valid Search Item');
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
          setEnteredText(item.subjectName);
          setSearchedItems(enteredText);
          }}>
        <Text style={styles.search}>{item.subjectName}</Text>
        </TouchableOpacity>
      </View>
    );
  }

  const searchSuggestions = () => {
    return (
    <View>
      {searchedItems.length <= 0 ? null:(
          <FlatList
            data={searchedItems}
            keyExtractor = {(item, index)=> index.toString()}
            horizontal={false}
            showVerticalScrollIndicator={false}
            renderItem={renderSearchList}
          />
          )}
    </View>
  );
}

return(
  <View style={styles.container}>

      <TouchableOpacity onPress={() => navigation.goBack()}>
        <Image source={Icons.ButtonBack} 
        style={orientation.isPortrait?styles.btnBack:styles.btnBackLs} />
      </TouchableOpacity>

      <ScrollView>
          <Text style={orientation.isPortrait?styles.title:styles.titleLs}>Search Result</Text>
          <Image style={styles.image} source={Images.NotFound}/>
          <Text style={styles.text}>Not Found</Text>
          <Text style={styles.desc}>Search not found please try again</Text>

          <View style={orientation.isPortrait?styles.searchContainer:styles.searchContainerLandscape}>
            <TextInput
                onChangeText={value => setEnteredText(value)} 
                value={enteredText}
                style={styles.input}  
            />
            <TouchableOpacity onPress={goSearch}>
              <Image source={Icons.SearchIcon} style={styles.searchIcon}/>
            </TouchableOpacity>
          </View>

          <View style={{alignItems:'flex-start'}}>
            {enteredText !== '' ? searchSuggestions() : null}
          </View>
      </ScrollView> 

</View>
)};

export default NoSearchResult;


const styles = StyleSheet.create({
    container: {
      height: '100%',
    },
    btnBack: {
      marginTop: Platform.OS === 'ios' ? 50 : 32,
      marginHorizontal:32,
    },
    btnBackLs: {
      marginTop: Platform.OS === 'ios' ? 50 : 32,
      marginHorizontal:92,
    },
    title:{
      marginTop: 20,
      marginHorizontal:32,
      color:Colors.Title,
      fontSize:32,
      fontWeight:'700',
    },
    titleLs:{
      marginTop: 20,
      marginHorizontal:92,
      color:Colors.Title,
      fontSize:32,
      fontWeight:'700',
    },
    image:{
      alignSelf:'center',
      height:254.28,
      width:192.08,
      marginTop:50,
    },
    text:{
      marginTop:50,
      color:Colors.Black,
      fontSize:28,
      fontWeight:'600',
      textAlign:'center',
    },
    desc:{
      marginTop:7,
      color:Colors.Description,
      fontSize:16,
      textAlign:'center',
    },
    searchContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      height: 70,
      borderWidth: 1,
      borderColor: Colors.SearchBorder,
      backgroundColor:Colors.White,
      borderRadius:18,
      marginTop:30,
      marginHorizontal:30,
    },
    searchContainerLandscape: {
      flexDirection: 'row',
      alignItems: 'center',
      height: 70,
      borderWidth: 1,
      borderColor: Colors.SearchBorder,
      backgroundColor:Colors.White,
      borderRadius:18,
      marginTop:30,
      marginHorizontal:90,
      marginBottom:90
    },
    input: {
      flex:1,
      color:Colors.Black,
      fontSize:20,
      paddingHorizontal:15,
    },
    searchIcon:{
      marginTop:18,
      marginHorizontal:-4
    },
    search: {
      color:Colors.Black,
      fontSize:15,
      fontWeight:'400',
      paddingHorizontal:15,
      marginHorizontal:30,
      marginVertical:3,
    },
  });