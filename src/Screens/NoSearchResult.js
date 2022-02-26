import React,{useState} from 'react';
import {Text, View,StyleSheet, Image, ScrollView,TouchableOpacity,TextInput,FlatList} from 'react-native';

const NoSearchResult=({navigation})=> {

  const [enteredText, setEnteredText] = useState ('');

  const goSearch=()=>{
    if(enteredText){
    navigation.navigate('Subjects');
    setEnteredText('');
  }
  }


return(
<View style={styles.container}>
      <TouchableOpacity onPress={() => navigation.goBack()}>
        <Image source={require('../Images/Search/btnBack.png')} style={styles.btnBack} />
      </TouchableOpacity>
      <Text style={styles.title}>Search Result</Text>
      <Image style={styles.image} source={require('../Images/Search/notFound.png')}/>
      <Text style={styles.text}>Not Found</Text>
      <Text style={styles.desc}>Search not found please try again</Text>

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

</View>
)};

export default NoSearchResult;


const styles = StyleSheet.create({
    container: {
      height: '100%',
      width: '100%',
      //justifyContent: 'center',
      //alignItems: 'center',
      //backgroundColor:'#4C93FF',
    },
    btnBack: {
      marginTop: 32,
      marginHorizontal:32,
    },
    title:{
      marginTop: 20,
      marginHorizontal:32,
      color:'#292929',
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
      color:'#000000',
      fontSize:28,
      fontWeight:'600',
      textAlign:'center',
    },
    desc:{
      marginTop:7,
      color:'#676666',
      fontSize:16,
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
      marginTop:30,
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

  });