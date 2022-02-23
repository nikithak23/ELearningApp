import React from 'react';
import {View, Text, StyleSheet} from 'react-native';

const SubjectScreen = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.txt}>subjecttsss</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f6f8fa',
  },
  txt:{
    padding:80,
    fontSize:16
  }
})

export default SubjectScreen;


