import React, { useState } from "react";
import {View, Text, StyleSheet, TouchableOpacity, Image} from 'react-native';

const Options = ['ALL', 'STUDYING', 'LIKED'];

const SubjectDetails = ({navigation}) => {
    const btnBack = require('../Images/Notification/btnback.png');
    const [selected, setSelected] = useState('ALL')
    return (
      <View style={styles.container}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Image source={btnBack} style={styles.btnBack} />
        </TouchableOpacity>
        <Text style={styles.title}>Biology</Text>
        <View style={styles.rowOpts}>
          {Options.map((opt, index) => (
            <View style={opt === 'STUDYING' ? styles.line : null}>
              <TouchableOpacity onPress={() => setSelected(opt)}>
                <Text style={opt === selected ? styles.active : styles.optText}>
                  {Options[index]}
                </Text>
              </TouchableOpacity>
            </View>
          ))}
        </View>
        <View style={styles.courses}>
          <View style={styles.courseImg}>
            <Text>Intro to Bio imhg</Text>
          </View>
          <View style={styles.courseTitle}>
            <Text>Intro to Bio</Text>
          </View>
        </View>
        <Text style={styles.selectedCourse}>v</Text>
        <View style={styles.lessons}>
          <View style={styles.row}>
            <Text style={styles.lessonName}>ANIMAL NUTRITION</Text>
            <Text style={styles.lessonNum}>Lesson 1</Text>
          </View>
          <>
            <Text style={styles.chaps}>Food Substances</Text>
            <Text style={styles.summary}>Classes and sources</Text>
          </>
        </View>
      </View>
    );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f6f8fa',
  },
  btnBack: {
    height: 25,
    width: 29,
    marginLeft: 32,
    marginTop: 51,
  },
  title: {
    fontSize: 34,
    fontWeight: '700',
    marginTop: 22,
    marginLeft: 32,
    marginBottom: 12,
    color: '#292929',
  },
  rowOpts: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    justifyContent: 'space-around',
    padding: 15,
    marginHorizontal: 30,
    borderWidth: 1,
    borderColor: '#fff',
    borderColor: 15,
    borderRadius: 20,
    marginTop: 15,
  },
  optText: {
    color: '#aaa',
    fontWeight: '500',
    fontSize: 15,
    justifyContent: 'center',
    paddingHorizontal: 30,
  },
  active: {
    color: '#1b7ced',
    fontWeight: '500',
    fontSize: 15,
    justifyContent: 'center',
    paddingHorizontal: 30,
  },
  courses: {
    flexDirection: 'column',
    marginHorizontal: 30,
    marginTop: 25,
    borderWidth: 0.5,
    borderColor: 15,
    borderRadius: 15,
    width: 170,
  },
  courseImg: {
    backgroundColor: '#ffa4a4',
    padding: 35,
    borderTopRightRadius: 15,
    borderTopLeftRadius: 15,
  },
  courseTitle: {
    color: '#292929',
    padding: 25,
    backgroundColor: '#fff',
    borderBottomRightRadius: 15,
    borderBottomLeftRadius: 15,
  },
  row: {
    flexDirection: 'row',
  },
  lessons: {
    backgroundColor: '#fff',
    marginHorizontal: 30,
    marginVertical: 12,
    borderWidth: 0.5,
    borderColor: '#fff',
    borderColor: 15,
    borderRadius: 15,
  },
  lessonName: {
    color: '#1b7ced',
    fontSize: 13,
    fontWeight: 'bold',
    marginTop: 30,
    marginLeft: 19,
    marginBottom: 30,
  },
  lessonNum: {
    color: '#999',
    marginTop: 31.5,
    marginLeft: 13,
    fontSize: 12,
    fontWeight: '300',
  },
  chaps: {
    color: '#000',
    fontSize: 22,
    fontWeight: '400',
    marginLeft: 19,
    letterSpacing: 0.5,
  },
  summary: {
    color: '#999',
    fontSize: 16,
    fontWeight: '300',
    marginTop: 5,
    marginLeft: 19,
    letterSpacing: 0.3,
    marginBottom: 30,
  },
  line: {
    borderLeftWidth: 0.5,
    borderRightWidth: 0.5,
    marginTop: -12,
    marginBottom: -12,
    height: 42,
    borderColor: '#ddd',
    width: 138,
    justifyContent: 'center',
  },
  selectedCourse: {
    color: '#fff',
    fontSize: 29,
    fontWeight: '900',
    shadowOpacity: 1,
    shadowColor: '#fff',
    marginHorizontal: 30,
    marginLeft: 108,
    marginTop: -17,
  },
});

export default SubjectDetails;