import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  Image,
  TouchableOpacity,
  Platform,
} from 'react-native';
import axios from 'axios';
import {useFocusEffect} from '@react-navigation/core';
import useOrientation from '../hooks/useOrientation';
import {Icons} from '../assets/Icons';
import {Strings} from '../assets/Strings';
import {Colors} from '../assets/Colors';
import {getNotificationApi} from '../Service/Service';

const NotificationScreen = ({navigation, route}) => {
  const btnBack = Icons.ButtonBack;
  const orientation = useOrientation();

  const token = route?.params.token;
  const [notif, setNotif] = useState([]);
  const timeRegex = /[0-2][0-9]:[0-5][0-9]:[0-5][0-9]/g;
  const hrRegex = /[0-2][0-9]/;
  const minRegex = /:[0-5][0-9]:/;
  const [date, setDate] = useState(new Date().toUTCString());

  useEffect(() => {
    getNotifs();
  }, [notif]),
    useFocusEffect(
      React.useCallback(() => {
        setDate(new Date().toUTCString());
      }, []),
    );

  //api to get notifications
  const getNotifs = async () => {
    try {
      // const response = await axios.get(`${baseUrl}/subject/notification`, {
      //   headers: {
      //     Authorization: `Bearer ${token}`,
      //   },
      // });
      const response = await getNotificationApi(token);
      setNotif(response.data.data);
    } catch (err) {
      console.log(err);
    }
  };

  const renderNotifications = ({item}) => {
    let time = date.match(timeRegex);
    let presentHr = time[0].match(hrRegex);
    let notifHr = item.time.match(hrRegex);
    let presentMin = time[0].match(minRegex)[0].match(/(\d+)/);
    let notifMin = item.time.match(minRegex)[0].match(/(\d+)/);
    const hrDiff = Number(presentHr) - Number(notifHr);
    const minDiff = Number(presentMin[0]) - Number(notifMin[0]);

    const timeDiff = () => {
      if (hrDiff > 0) {
        if (minDiff > -1) {
          return `${hrDiff} ${Strings.HrAgo}`;
        } else {
          return `${60 - Math.abs(minDiff)} ${Strings.MinAgo}`;
        }
      } else {
        if (minDiff < 5) {
          return `${Strings.JustNow}`;
        } else {
          return `${minDiff} ${Strings.MinAgo}`;
        }
      }
    };

    return (
      <View
        style={orientation.isPortrait ? styles.component : styles.componentls}>
        <View>
          <View style={styles.row}>
            <Text style={styles.subtitle}>{item.notificationHeader}</Text>
            <Text style={orientation.isPortrait ? styles.time : styles.timels}>
              {timeDiff()}
            </Text>
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
      <Text style={styles.title}>${Strings.Notifications}</Text>
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
    backgroundColor: Colors.BgGrey,
  },
  title: {
    fontSize: 34,
    fontWeight: '700',
    marginTop: 22,
    marginLeft: 32,
    marginBottom: 12,
    color: Colors.Title,
  },
  component: {
    backgroundColor: Colors.White,
    paddingTop: 22,
    paddingLeft: 21,
    paddingBottom: 23,
    marginVertical: 11,
    marginHorizontal: 32,
    borderWidth: 1,
    borderColor: Colors.White,
    borderRadius: 15,
    zIndex: 100,
  },
  componentls: {
    backgroundColor: Colors.White,
    paddingTop: 22,
    paddingLeft: 21,
    paddingBottom: 23,
    marginVertical: 11,
    marginHorizontal: 90,
    borderWidth: 1,
    borderColor: Colors.White,
    borderRadius: 15,
    zIndex: 100,
  },
  subtitle: {
    fontSize: 19,
    color: Colors.ChapNameColor,
    fontWeight: '700',
  },
  row: {
    flexDirection: 'row',
  },
  notif: {
    color: Colors.ChapNameColor,
    fontSize: 14,
    marginTop: 6,
    fontWeight: '500',
  },
  time: {
    fontSize: 13,
    color: Colors.Time,
    fontWeight: '500',
    alignSelf: 'flex-end',
    textAlign: 'right',
    position: 'absolute',
    marginLeft: 230,
  },
  timels: {
    fontSize: 13,
    color: Colors.Time,
    fontWeight: '500',
    alignSelf: 'flex-end',
    textAlign: 'right',
    position: 'absolute',
    marginLeft: Platform.OS === 'ios' ? 550 : 430,
  },
  btnBack: {
    height: 25,
    width: 29,
    marginLeft: 32,
    marginTop: Platform.OS === 'ios' ? 51 : 31,
  },
});

export default NotificationScreen;
