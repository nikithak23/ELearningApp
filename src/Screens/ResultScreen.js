import React, {useState} from 'react';
import {
  Button,
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  FlatList,
} from 'react-native';

const Results = [
  {
    title: 'PHYSICS',
    Lesson: 'Lesson 1',
    Name: 'Animal Nutrition:Food Chain',
    right: '35',
    qa: '35',
    per: '75',
  },
  {
    title: 'BIOLOGY',
    Lesson: 'Lesson 2',
    Name: 'Photosynthesis',
    right: '40',
    qa: '46',
    per: '90',
  },
  {
    title: 'CHEMISTRY',
    Lesson: 'Lesson 1',
    Name: 'Introduction to Chemistry',
    right: '18',
    qa: '18',
    per: '20',
  },
  {
    title: 'PHYSICS',
    Lesson: 'Lesson 2',
    Name: 'Animal Nutrition',
    right: '35',
    qa: '35',
    per: '75',
  },
];

export default function ResultsScreen({navigation}) {
  const renderResults = ({item}) => {
    return (
      <View style={styles.Listcomponent}>
        <View style={styles.firstRow}>
          <Text style={styles.subject}>{item.title}</Text>
          <Text style={styles.lesson}>{item.Lesson}</Text>
        </View>
        <View>
          <Text style={styles.name}>{item.Name}</Text>
        </View>
        <View style={styles.bottom}>
          <View>
            <Text style={styles.textRight}>Right Answers</Text>
            <Text style={styles.right}>{item.right}</Text>
            <Text style={styles.textRight}>Questions attempted</Text>
            <View style={styles.qa}>
              <Text style={styles.right}>{item.qa}</Text>
              <Text style={styles.of50}> of 50</Text>
            </View>
          </View>
          <View style={styles.percentage}>
            <Text style={styles.per}>{item.per}</Text>
            <Text style={styles.per1}>%</Text>
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
          <View></View>

          <TouchableOpacity>
            <View style={styles.TopAll}>
              <Text style={styles.TopText2}>All</Text>
              <Image
                source={require('../Images/Profile/Results/allDown.png')}
              />
            </View>
          </TouchableOpacity>
        </View>
      </View>

      <View style={styles.List}>
        <FlatList
          data={Results}
          renderItem={renderResults}
          keyExtractor={(item, index) => item.Name}
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
    marginLeft: 32,
  },
  touchable: {
    height: 20,
    width: 23,
  },
  TopTextView: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',

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
  per: {
    color: '#0BC763',
    fontSize: 50,

    marginTop: -10,
  },
  per1: {
    fontSize: 25,
    paddingRight: 14,
    color: '#0BC763',
    fontWeight: 'bold',
  },
});
