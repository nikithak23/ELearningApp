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
  const baseUrl = 'https://elearningapp-api.herokuapp.com';
  const token = route?.params.token;
  const [notif, setNotif] = useState([]);
  const [date, setDate] = useState(new Date().toUTCString());
  const timeRegex = /[0-2][0-9]:[0-5][0-9]:[0-5][0-9]/g;
  useEffect(() => {
    getNotifs();
  }, [notif]);

  useFocusEffect(
    React.useCallback(() => {
      console.log('date', date);
    }),
  );

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
    let time = date.match(timeRegex);
    console.log('my date', new Date());
    console.log('time', '========', time[0]);
    return (
      <View style={styles.component}>
        <View>
          <View style={styles.row}>
            <Text style={styles.subtitle}>{item.notificationHeader}</Text>
            <Text style={styles.time}>{item.time}</Text>
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
};

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
