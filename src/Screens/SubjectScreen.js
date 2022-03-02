import React, { useEffect, useState } from 'react';
import axios from 'axios';
import {View, Text, StyleSheet, FlatList, Image, TouchableOpacity} from 'react-native';
import { NavigationContainer } from '@react-navigation/native';

let Subjects = [
  {title: 'Physics', image: require('../Images/Subject/physics.png')},
  {title: 'Biology', image: require('../Images/Subject/bio.png')},
  {title: 'Chemistry', image: require('../Images/Subject/chem.png')},
  {title: 'Mathematics', image: require('../Images/Subject/math.png')},
  {title: 'Geography', image: require('../Images/Subject/geography.png')},
  {title: 'Art and culture', image: require('../Images/Subject/art.png')},
];

const SubjectScreen = ({token,navigation}) => {
  let [SubjectsData, setSubjectsData] = useState([]);
  let sub;
  const [fetchSubjects, setFetchSubjects] = useState(false)
  const baseUrl = 'https://elearningapp-api.herokuapp.com';
  const renderSubjects = ({item})=>{
    return (
      <View style={styles.component}>
        <TouchableOpacity style={styles.row} onPress={()=>navigation.navigate('SubjectDetails')}>
          <Image source = {{uri : item.subjectsLogo}} style= {styles.img} />
          <Text style={styles.subject}>{item.subjectName}</Text>
        </TouchableOpacity>
      </View>
    );
  }

  const getSubjects = async () => {
    try {
      const response = await axios.get(`${baseUrl}/subject/get/subjects`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      sub='hii'
      console.log('done');
      setSubjectsData(response.data.data);
      console.log('printttttt',SubjectsData[0].subjectName);
      // sub = SubjectsData[0].subjectName;
      console.log('SubjectsData', SubjectsData)
      setFetchSubjects(true)
      console.log('done',fetchSubjects)
    } catch (err) {
      console.log(err);
    }
  };
console.log('printttttt222222', SubjectsData);
  useEffect(()=>{
    getSubjects()
  },[])

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Subjects</Text>
      {/* {fetchSubjects === true ? <Text style={styles.title}>{sub}</Text> : null} */}
      {/* <Text>{SubjectsData[0].subjectName}</Text> */}
      <FlatList
        data={SubjectsData}
        renderItem={renderSubjects}
        keyExtractor={item => item.subjectId}
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
    fontWeight: '800',
    marginTop: 85,
    marginLeft: 32,
    marginBottom: 12,
    color: '#292929',
  },
  component: {
    backgroundColor: '#fff',
    padding: 24,
    marginVertical: 9,
    marginHorizontal: 32,
    borderWidth: 1,
    borderColor: '#fff',
    borderRadius: 15,
    borderColor: 10,
  },
  subject: {
    fontSize: 21,
    color: '#191b26',
    fontWeight: '700',
    marginLeft: 22,
  },
  row: {
    flexDirection: 'row',
  },
  img: {
    width: 44,
    height: 44,
    marginTop: -10,
    marginLeft: -10,
  },
});

export default SubjectScreen;


