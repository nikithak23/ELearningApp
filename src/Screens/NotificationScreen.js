import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  Image,
  TouchableOpacity,
} from 'react-native';
import axios from 'axios';
import {useFocusEffect} from '@react-navigation/core';
import useOrientation from '../hooks/useOrientation';

const btnBack = require('../Images/Notification/btnback.png');
const NotificationData = [
  {
    title: 'Complete the test!',
    desc: 'This is a dummy test which will be changed later',
  },
  {
    title: 'Hurry up!',
    desc: 'This is a dummy test which will be changed later',
  },
  {
    title: 'Hurray!',
    desc: 'This is a dummy test which will be changed later',
  },
];

const NotificationScreen = ({navigation, route}) => {
  const orientation = useOrientation();
  const baseUrl = 'https://elearningapp-api.herokuapp.com';
  const token = route?.params.token;
  const [notif, setNotif] = useState([])
  
  const timeRegex = /[0-2][0-9]:[0-5][0-9]:[0-5][0-9]/g;
  const hrRegex = /[0-2][0-9]/;
  const minRegex = /:[0-5][0-9]:/;
 
  
  const [date, setDate] = useState(new Date().toUTCString());
  

  useEffect(() => {
    getNotifs();
  }, [notif]
  ),

  useFocusEffect(
    React.useCallback(()=>{
      setDate(new Date().toUTCString())
    },[])
  )
   

  const getNotifs = async () => {
    try {
      const response = await axios.get(`${baseUrl}/subject/notification`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      console.log('notiffffff ', response.data.data);
      setNotif(response.data.data);
    } catch (err) {
      console.log(err);
    }
  };

  const renderNotifications = ({item}) => {
    let time = date.match(timeRegex)
    let presentHr = time[0].match(hrRegex)
    let notifHr = item.time.match(hrRegex)
    let presentMin = time[0].match(minRegex)[0].match(/(\d+)/)
    let notifMin = item.time.match(minRegex)[0].match(/(\d+)/);
    const hrDiff =  Number(presentHr)-Number(notifHr)
    const minDiff = Number(presentMin[0]) - Number(notifMin[0])
    console.log('time', '====',item.time, '====', time[0], 'difff==> ', hrDiff, '>>>>', minDiff)

    const timeDiff = () => {
      if (hrDiff > 0) {
        if (minDiff > -1) {
          return `${hrDiff} hr ago`;
        } else {
          return `${60 - Math.abs(minDiff)} min ago`;
        }
      }
      else {
        if(minDiff < 5){
          return `Just now`;
        }
        else{
          return `${minDiff} min ago`
        }
      }
    }
    
    console.log('my date', new Date());
    console.log('time', '========', time[0]);
    return (
      <View
        style={orientation.isPortrait ? styles.component : styles.componentls}>
        <View>
          <View style={styles.row}>
            <Text style={styles.subtitle}>{item.notificationHeader}</Text>
            <Text style={styles.time}>{timeDiff()}</Text>
          </View>

          <Text style={styles.notif}>{item.notificationContent}</Text>
        </View>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={() => navigation.goBack()}>
        <Image source={btnBack} style={styles.btnBack} />
      </TouchableOpacity>
      <Text style={styles.title}>Notifications</Text>
      <FlatList
        data={notif}
        renderItem={renderNotifications}
        keyExtractor={(item, index) => index.toString()}
      />
    </View>
  );
}



const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f6f8fa',
  },
  title: {
    fontSize: 34,
    fontWeight: '700',
    marginTop: 22,
    marginLeft: 32,
    marginBottom: 12,
    color: '#292929',
  },
  component: {
    backgroundColor: '#fff',
    paddingTop: 22,
    paddingLeft: 21,
    paddingBottom: 23,
    marginVertical: 11,
    marginHorizontal: 32,
    borderWidth: 1,
    borderColor: '#fff',
    borderRadius: 15,
    zIndex: 100,
  },
  componentls: {
    backgroundColor: '#fff',
    paddingTop: 22,
    paddingLeft: 21,
    paddingBottom: 23,
    marginVertical: 11,
    marginHorizontal: 90,
    borderWidth: 1,
    borderColor: '#fff',
    borderRadius: 15,
    zIndex: 100,
  },
  subtitle: {
    fontSize: 19,
    color: '#191b26',
    fontWeight: '700',
  },
  row: {
    flexDirection: 'row',
  },
  notif: {
    color: '#191b26',
    fontSize: 14,
    marginTop: 6,
    fontWeight: '500',
  },
  time: {
    fontSize: 13,
    color: '#b0b5c6',
    fontWeight: '500',
    alignSelf: 'flex-end',
    textAlign: 'right',
    position: 'absolute',
    marginLeft: 230,
  },
  btnBack: {
    height: 25,
    width: 29,
    marginLeft: 32,
    marginTop: 51,
  },
});

export default NotificationScreen;
