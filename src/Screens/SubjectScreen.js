import React, { useEffect, useState } from 'react';
import axios from 'axios';
import {View, Text, StyleSheet, FlatList, Image, TouchableOpacity} from 'react-native';
import useOrientation from '../hooks/useOrientation';

const SubjectScreen = ({token,navigation}) => {
  const orientation = useOrientation();
  const [SubjectsData, setSubjectsData] = useState([]);
  const [fetchSubjects, setFetchSubjects] = useState(false)
  const baseUrl = 'https://elearningapp-api.herokuapp.com';
  const renderSubjects = ({item})=>{
    return (
      <View
        style={orientation.isPortrait ? styles.component : styles.componentls}>
        <TouchableOpacity
          style={styles.row}
          onPress={() =>
            navigation.navigate('SubjectDetails', {
              subject: item.subjectName,
              token: token,
              id: item.subjectId,
            })
          }>
          <Image source={{uri: item.subjectsLogo}} style={styles.img} />
          <Text style={styles.subject}>{item.subjectName}</Text>
        </TouchableOpacity>
      </View>
    );
  }

  //api to get Subjects
  const getSubjects = async () => {
    try {
      const response = await axios.get(`${baseUrl}/subject/get/subjects`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setSubjectsData(response.data.data);
      setFetchSubjects(true)
    } catch (err) {
      console.log(err);
    }
  };
  useEffect(()=>{
    getSubjects()
  },[])

  return (
    <View style={styles.container}>
      <Text style={orientation.isPortrait ? styles.title : styles.titlels}>
        Subjects
      </Text>
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
  titlels: {
    fontSize: 34,
    fontWeight: '800',
    marginTop: 40,
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
  componentls: {
    backgroundColor: '#fff',
    padding: 24,
    marginVertical: 9,
    marginHorizontal: 90,
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


