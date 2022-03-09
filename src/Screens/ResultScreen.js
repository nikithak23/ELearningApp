import React, {useEffect, useState, useCallback} from 'react';
import {
  Button,
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  FlatList,
  Modal,
  ScrollView,
} from 'react-native';
import axios from 'axios';
import Dropdown from '../components/Dropdown';
import {useFocusEffect} from '@react-navigation/core';
import { transform } from 'lodash';

// const Results = [
//   {
//     title: 'PHYSICS',
//     Lesson: 'Lesson 1',
//     Name: 'Animal Nutrition:Food Chain',
//     right: '35',
//     qa: '35',
//     per: '75',
//   },
//   {
//     title: 'BIOLOGY',
//     Lesson: 'Lesson 2',
//     Name: 'Photosynthesis',
//     right: '40',
//     qa: '46',
//     per: '90',
//   },
//   {
//     title: 'CHEMISTRY',
//     Lesson: 'Lesson 1',
//     Name: 'Introduction to Chemistry',
//     right: '18',
//     qa: '18',
//     per: '20',
//   },
//   {
//     title: 'PHYSICS',
//     Lesson: 'Lesson 2',
//     Name: 'Animal Nutrition',
//     right: '35',
//     qa: '35',
//     per: '75',
//   },
// ];

const Subjects = [
  'ALL',
  'PHYSICS',
  'BIOLOGY',
  'CHEMISTRY',
  'MATHEMATICS',
  'GEOGRAPHY',
  'ART AND CULTURE',
];

export default function ResultsScreen({navigation, route}) {
  const baseUrl = 'https://elearningapp-api.herokuapp.com';

  const token = route?.params.token;
  const Results = route?.params.Results;

  const [filterSub, setFilterSub] = useState('ALL');
  // const [Results, setResults] = useState([]);
  const [filterFlatlist, setFilterFlatlist] = useState(Results);
  const [modalVisible, setModalVisible] = useState(false);

  // const getResults = async () => {
  //   try {
  //     const response = await axios.get(`${baseUrl}/subject/get/result`, {
  //       headers: {
  //         Authorization: `Bearer ${token}`,
  //       },
  //     });
  //     setResults(response.data.data);

  //     console.log('the result is', Results);
  //     // setFetchSubjects(true);
  //   } catch (err) {
  //     console.log(err);
  //   }
  // };
  // useEffect(() => {
  //   // getResults();
  //   setFilterFlatlist(Results);
  // }, []);

  useEffect(() => {
    if (filterSub === 'ALL') {
      setFilterFlatlist(Results);
    } else {
      setFilterFlatlist(
        Results.filter(item => {
          return item.subjectName
            .toLowerCase()
            .includes(filterSub.toLowerCase());
        }),
      );
    }
  }, [filterSub]);

  const onPressSub = item => {
    if (item === 'ALL') {
      //setFilterSub(item);
      return (
        setModalVisible(!modalVisible),
        setFilterFlatlist(Results),
        setFilterSub(item)
      );
    } else {
      return (
        setFilterSub(item), setModalVisible(!modalVisible)
        // setFilterFlatlist(
        //   Results.filter(item => {
        //     return item.title.toLowerCase().includes(filterSub.toLowerCase());
        //   }),
        //   console.log(filterFlatlist)
        // )
      );
    }
  };
  const subs = Subjects.map((item, index) => {
    return (
      <TouchableOpacity key={index}>
        <Text style={styles.modalText} onPress={() => onPressSub(item)}>
          {item}
        </Text>
      </TouchableOpacity>
    );
  });

  const renderResults = ({item}) => {
    return (
      <View style={styles.Listcomponent}>
        <View style={styles.firstRow}>
          <Text style={styles.subject}>{item.subjectName.toUpperCase()}</Text>
          {/* <Text style={styles.lesson}>{item.courseId}</Text> */}
        </View>
        <View>
          <Text style={styles.name}>{item.courseName}</Text>
        </View>
        <View style={styles.bottom}>
          <View>
            <Text style={styles.textRight}>Right Answers</Text>
            <Text style={styles.right}>{item.rightAnswer}</Text>
            <Text style={styles.textRight}>Questions attempted</Text>
            <View style={styles.qa}>
              <Text style={styles.right}>{item.attempted}</Text>
              <Text style={styles.of50}> of 10</Text>
            </View>
          </View>
          <View style={styles.percentage}>
            <Text
              style={item.percentScore >= 50 ? styles.perhigh : styles.perlow}>
              {item.percentScore}
            </Text>
            <Text
              style={
                item.percentScore >= 50 ? styles.per1high : styles.per1low
              }>
              %
            </Text>
          </View>
        </View>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <View style={styles.TopContainer}>
        <TouchableOpacity
          onPress={() => navigation.navigate('Profile')}
          style={styles.touchable}>
          <Image
            source={require('../Images/Profile/Results/back.png')}
            style={styles.backButton}
          />
        </TouchableOpacity>
        <View style={styles.TopTextView}>
          <Text style={styles.TopText1}>Results</Text>
          <Dropdown 
            filterSub={filterSub}
            subs={subs}
            modalVisible={modalVisible}
            setModalVisible={setModalVisible}
          />
        </View>
      </View>

      <View style={styles.List}>
        <FlatList
          data={filterFlatlist}
          renderItem={renderResults}
          keyExtractor={(item, index) => item.courseName}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    height: '100%',
    width: '100%',
    backgroundColor: '#F6FAFF',
  },
  TopContainer: {
    marginTop: 51,
  },
  backButton: {
    // marginLeft: 32,
  },
  touchable: {
    height: 20,
    width: 23,
    marginLeft: 32,
  },
  TopTextView: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginRight: 8,
    marginHorizontal: 32,
    marginTop: 24,
  },
  TopText1: {
    fontSize: 16,
    fontWeight: '400',

    color: '#292929',
    fontSize: 34,
    fontWeight: '600',
    letterSpacing: 0,
  },
  TopText2: {
    fontSize: 16,
    fontWeight: '500',
    color: '#595B60',
  },
  TopAll: {
    width: 69,
    height: 30,
    borderWidth: 2,
    borderColor: '#4C93FF',
    borderRadius: 5,
    alignItems: 'center',
    justifyContent: 'space-around',
    flexDirection: 'row',
  },
  List: {
    marginTop: 37,
  },
  Listcomponent: {
    backgroundColor: 'white',
    marginHorizontal: 30,
    paddingHorizontal: 26,
    marginVertical: 10,
    borderColor: 'rgba(151,151,151,0.1)',
    borderWidth: 1,
    borderRadius: 18,
    height: 245,
    paddingVertical: 24,
  },
  firstRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  subject: {
    color: '#3A7FE7',
    fontSize: 14,
    fontWeight: '500',
  },
  lesson: {
    color: '#595B60',
    fontSize: 14,
    textAlign: 'right',
  },
  name: {
    marginTop: 10,
    color: '#191B26',
    fontSize: 22,
    fontWeight: '500',
  },
  bottom: {
    flexDirection: 'row',
    marginTop: 25,
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  textRight: {
    color: '#595B60',
    fontSize: 12,
    fontWeight: '300',
  },
  of50: {
    color: '#595B60',
    fontSize: 14,
    fontWeight: '300',
    marginBottom: 21,
  },
  right: {
    fontSize: 18,
    color: '#191B26',
    marginTop: 8,
    marginBottom: 20,
  },
  qa: {
    flexDirection: 'row',
    alignItems: 'flex-end',
  },
  percentage: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  perhigh: {
    color: '#0BC763',
    fontSize: 40,
    marginTop: -10,
  },
  perlow: {
    color: '#F24545',
    fontSize: 40,
    marginTop: -10,
  },

  per1high: {
    fontSize: 20,
    paddingRight: 14,
    color: '#0BC763',
    fontWeight: 'bold',
  },
  per1low: {
    fontSize: 20,
    paddingRight: 14,
    color: '#F24545',
    fontWeight: 'bold',
  },
  modalText: {
    marginBottom: 13,
    textAlign: 'center',
  },
});
