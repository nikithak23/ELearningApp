import React, {useEffect, useState} from 'react';
import axios from 'axios';
import {
  Text,
  View,
  StyleSheet,
  Image,
  ScrollView,
  TouchableOpacity,
  TextInput,
  FlatList,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import {Card} from 'react-native-cards';
import Animated from 'react-native-reanimated';
import {useFocusEffect} from '@react-navigation/core';
import useOrientation from '../hooks/useOrientation';
Icon.loadFont().then();





const HomeScreen = ({navigation, route, token}) => {

  const orientation = useOrientation();
  const baseUrl = 'https://elearningapp-api.herokuapp.com';
  const [enteredText, setEnteredText] = useState('');
  const [searchedItems, setSearchedItems] = useState([]);
  let [DataRecent, setDataRecent] = useState([]);
  let [Sub, setSub] = useState([]);
  let [userName, setUserName] = useState('');
  let recentId;



  const getName = async () => {//Name Api
    try {
      const resp = await axios.get(`${baseUrl}/subject/get/name`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setUserName(resp.data.data.toUpperCase());
    } catch (err) {
      console.log(err);
    }
  };


  const getData = async () => {
    //Recently studied api
    try {
      const response = await axios.get(`${baseUrl}/subject/get/studying`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      console.log(response.status);
      setDataRecent(response.data.data);
    } catch (err) {
      console.log(err);
    }
  };


  const getSub = async () => {
    //Subject api
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
  

  let len = DataRecent.length;
  useFocusEffect(
    React.useCallback(() => {
      getData();
      getName();
      getSub();
    }, []),
  );
  


  useEffect(() => {
    setSearchedItems(
      Sub.filter(item => {
        return item.subjectName
          .toLowerCase()
          .includes(enteredText.toLowerCase());
      }),
    );
  }, [enteredText, Sub]);


  const notif = () => {
    navigation.navigate('Notification', {token: token});
  };


  const goSearch = async () => {
    if (enteredText) {
      console.log(enteredText);
      try {
        const response = await axios.get(
          `${baseUrl}/subject/search/${enteredText}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          },
        );
        console.log(response.status);
        let subjectData = response.data.data;
        let subName = subjectData[0].subjectName;
        let subId = subjectData[0].subjectId;
        if (response.status === 200) {
          setEnteredText('');
          
          navigation.navigate('SubjectDetails', {
            subject: subName,
            token: token,
            id: subId,
          });
        }
      } catch (err) {
        setEnteredText('');
        console.log(err);
        navigation.navigate('NoSearch', {token: token});
      }
    } else {
      alert('Enter a Search Item');
    }
  };


  const renderSearchList = ({item}) => {
    return (
      <View>
        <TouchableOpacity
          onPress={() => {
            setEnteredText(item.subjectName);
            setSearchedItems(enteredText);
          }}>
          <Text style={styles.search}>{item.subjectName}</Text>
        </TouchableOpacity>
      </View>
    );
  };
  const searchSuggestions = () => {
    return (
      <View>
        {searchedItems.length <= 0 ? null : (
          <FlatList
            data={searchedItems}
            keyExtractor={(item, index) => index.toString()}
            horizontal={false}
            showVerticalScrollIndicator={false}
            renderItem={renderSearchList}
          />
        )}
      </View>
    );
  };


  const renderCurrentStud = ({item}) => {
    let percent = item.percent + '%';
    recentId=item.homeId;
    return (
      <Card style={orientation.isPortrait?styles.bottomCards:styles.bottomCardsLandscape}>
        <TouchableOpacity onPress={()=>{
          
          navigation.navigate('SubjectDetails', {
            token: token,
            subject:item.subjectName,
            id:item.subjectId,
            courseId:item.courseId,
          });
        }}>
          <View style={recentId%2===0?styles.imgContainer0:styles.imgContainer1}>
            <Image source={{uri: item.subjectLogo}} style={styles.img} />
          </View>
          <Text style={styles.subName}>{item.subjectName.toUpperCase()}</Text>
          <Text style={styles.ChapName}>{item.courseName}</Text>
          <View style={{flexDirection: 'row', alignItems: 'center'}}>
          <View style={styles.progressBar}>
            <Animated.View
              style={
                ([StyleSheet.absoluteFill],
                {backgroundColor: 'green', width: percent})
              }
            />
          </View>
          <Text style={styles.percentText}>{item.percent}% </Text>
          </View>
        </TouchableOpacity>
      </Card>
    );
  };



  return (
    <View style={{backgroundColor: '#f6f8fa'}}>
        <View style={styles.header}>
          <TouchableOpacity onPress={notif}>
            <Icon
              name="notifications-outline"
              size={33}
              color="#8E8F93"
              style={styles.icon}
            />
          </TouchableOpacity>
        </View>

      <ScrollView style={styles.container}>
          <Text style={styles.greet}>Hi, {userName}</Text>
          <Text style={styles.desc}>What would you like to study today?</Text>
          <Text style={styles.desc}>you can search below.</Text>

          <View style={styles.searchContainer}>
            <TextInput
              onChangeText={value => setEnteredText(value)}
              value={enteredText}
              style={styles.input}
            />
            <TouchableOpacity onPress={goSearch}>
              <Image
                source={require('../Images/Search/searchIcon.png')}
                style={styles.searchIcon}
              />
            </TouchableOpacity>
          </View>
          <View style={{alignItems: 'flex-start'}}>
            {enteredText !== '' ? searchSuggestions() : null}
          </View>

          {len !== 0 ? (
            <View>
              <Text style={styles.currentHead}>CURRENTLY STUDYING</Text>
              <FlatList
                data={DataRecent}
                renderItem={renderCurrentStud}
                keyExtractor={(item, index) => index.toString()}
                horizontal={true}
                showsHorizontalScrollIndicator={false}
              />
            </View>
          ) : null}
      </ScrollView>

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
    marginTop: Platform.OS === 'ios' ? 50 : 30,
    marginHorizontal: 32,
  },
  greet: {
    fontSize: 36,
    color: 'black',
    fontWeight: '500',
    lineHeight: 43,
    textAlign: 'center',
    marginTop: 20,
    marginBottom: 20,
  },
  desc: {
    fontSize: 21,
    color: '#595B60',
    fontWeight: '300',
    lineHeight: 28,
    textAlign: 'center',
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    height: 70,
    borderWidth: 1,
    borderColor: 'rgba(41,94,255,0.05)',
    backgroundColor: '#FFFFFF',
    borderRadius: 18,
    marginTop: 50,
    marginHorizontal: 30,
  },
  input: {
    flex: 1,
    color: 'black',
    fontSize: 20,
    paddingHorizontal: 15,
  },
  searchIcon: {
    marginTop: 18,
    marginHorizontal: -4,
  },
  search: {
    color: 'black',
    fontSize: 15,
    fontWeight: '400',
    paddingHorizontal: 15,
    marginHorizontal: 30,
    marginVertical: 3,
  },
  currentHead: {
    marginTop: 25,
    marginHorizontal: 30,
    fontSize: 16,
    color: '#595B60',
    letterSpacing: 0.69,
  },
  bottomCards: {
    marginLeft: 25,
    backgroundColor: '#FFFFFF',
    width: 260,
    height: 270,
    marginTop: 10,
    borderRadius: 18,
  },
  bottomCardsLandscape: {
    marginLeft: 25,
    //marginHorizontal: 25,
    backgroundColor: '#FFFFFF',
    width: 260,
    height: 270,
    marginTop: 10,
    borderRadius: 18,
    marginBottom:90,
  },
  imgContainer0: {
    width: 260,
    height: 160,
    borderTopRightRadius: 18,
    borderTopLeftRadius: 18,
    backgroundColor:'#FFA4A4',
  },
  imgContainer1: {
    width: 260,
    height: 160,
    borderTopRightRadius: 18,
    borderTopLeftRadius: 18,
    backgroundColor:'#A4C5FF',
  },
  img: {
    height: 80,
    width: 80,
    marginHorizontal: 90,
    marginVertical: 40,
  },
  subName: {
    color: '#3A7FE7',
    fontSize: 13,
    fontWeight: '500',
    paddingHorizontal: 10,
    paddingTop: 6,
  },
  ChapName: {
    color: '#191B26',
    fontSize: 18,
    fontWeight: '500',
    paddingHorizontal: 10,
    paddingTop: 2,
  },
  percentText: {
    color: 'green',
    fontSize: 13,
    fontWeight: '400',
    paddingTop: 6,
  },
  progressBar: {
    height: 3,
    width: '70%',
    flexDirection: 'row',
    backgroundColor: '#8E8F93',
    marginTop: 10,
    marginHorizontal: 10,
  },
});
export default HomeScreen;



