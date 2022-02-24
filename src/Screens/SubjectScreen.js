import React from 'react';
import {View, Text, StyleSheet, FlatList, Image} from 'react-native';

const Subjects = [
  {title: 'Physics', image: require('../Images/Subject/physics.png')},
  {title: 'Biology', image: require('../Images/Subject/bio.png')},
  {title: 'Chemistry', image: require('../Images/Subject/chem.png')},
  {title: 'Mathematics', image: require('../Images/Subject/math.png')},
  {title: 'Geography', image: require('../Images/Subject/geography.png')},
  {title: 'Art and culture', image: require('../Images/Subject/art.png')},
];

const SubjectScreen = () => {
  const renderSubjects = ({item})=>{
    return (
      <View style={styles.component}>
        <View style={styles.row}>
          <Image source = {item.image} style= {styles.img} />
          <Text style={styles.subject}>{item.title}</Text>
        </View>
      </View>
    );
  }
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Subjects</Text>
      <FlatList 
        data = {Subjects}
        renderItem = {renderSubjects}
        keyExtractor = {(item, index)=> index.toString()}
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
    zIndex: 100,
  },
  subject: {
    fontSize: 21,
    color: '#191b26',
    fontWeight: '700',
    marginLeft: 22
  },
  row: {
    flexDirection: 'row',
  },
  img: {
    width: 44,
    height: 44,
    marginTop: -10,
    marginLeft: -10
  },
});

export default SubjectScreen;


