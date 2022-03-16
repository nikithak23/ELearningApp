import React, {useEffect, useState, useCallback} from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  FlatList,
} from 'react-native';
import Dropdown from '../components/Dropdown';
import useOrientation from '../hooks/useOrientation';
import {Colors} from '../assets/Colors/index';
import {Strings} from '../assets/Strings/index';
import {Icons} from '../assets/Icons';
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
  const orientation = useOrientation();
  const token = route?.params.token;
  const Results = route?.params.Results;

  const [filterSub, setFilterSub] = useState('ALL');
  const [filterFlatlist, setFilterFlatlist] = useState(Results);
  const [modalVisible, setModalVisible] = useState(false);

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
      return (
        setModalVisible(!modalVisible),
        setFilterFlatlist(Results),
        setFilterSub(item)
      );
    } else {
      return setFilterSub(item), setModalVisible(!modalVisible);
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

  // To render the results
  const renderResults = ({item}) => {
    return (
      <View
        style={
          orientation.isPortrait ? styles.Listcomponent : styles.Listcomponentls
        }>
        <View style={styles.firstRow}>
          <Text style={styles.subject}>{item.subjectName.toUpperCase()}</Text>
        </View>
        <View>
          <Text style={styles.name}>{item.courseName}</Text>
        </View>
        <View style={styles.bottom}>
          <View>
            <Text style={styles.textRight}>{Strings.RightAnswers}</Text>
            <Text style={styles.right}>{item.rightAnswer}</Text>
            <Text style={styles.textRight}>{Strings.QuestionsAttempted}</Text>
            <View style={styles.qa}>
              <Text style={styles.right}>{item.attempted}</Text>
              <Text style={styles.of50}> {Strings.of10}</Text>
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
      <View
        style={
          orientation.isPortrait ? styles.TopContainer : styles.TopContainerls
        }>
        <TouchableOpacity
          onPress={() => navigation.navigate('Profile')}
          style={
            orientation.isPortrait ? styles.touchable : styles.touchablels
          }>
          <Image source={Icons.ButtonBack} />
        </TouchableOpacity>
        <View
          style={
            orientation.isPortrait ? styles.TopTextView : styles.TopTextViewls
          }>
          <Text style={styles.TopText1}>{Strings.Results}</Text>
          {/* To render the dropdown component */}
          <Dropdown
            filterSub={filterSub}
            subs={subs}
            modalVisible={modalVisible}
            setModalVisible={setModalVisible}
          />
        </View>
      </View>
      <View style={styles.List}>
        {console.log(Results)}
        {console.log('res', filterFlatlist)}
        {filterFlatlist.length === 0 ? (
          <View style={styles.noTest}>
            <Text style={styles.noTestText}>{Strings.ResultCondition}</Text>
          </View>
        ) : (
          <FlatList
            data={filterFlatlist}
            renderItem={renderResults}
            keyExtractor={(item, index) => item.courseName}
          />
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    height: '100%',
    width: '100%',
    backgroundColor: Colors.BgGrey,
  },
  TopContainer: {
    marginTop: 51,
  },
  TopContainerls: {
    marginTop: 25,
  },
  touchable: {
    height: 20,
    width: 23,
    marginLeft: 32,
  },
  touchablels: {
    height: 20,
    width: 23,
    marginLeft: 96,
  },
  TopTextView: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginRight: 8,
    marginHorizontal: 32,
    marginTop: 24,
  },
  TopTextViewls: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginRight: 75,
    marginHorizontal: 94,
    marginTop: 24,
  },
  TopText1: {
    fontSize: 16,
    fontWeight: '400',
    color: Colors.Title,
    fontSize: 34,
    fontWeight: '600',
    letterSpacing: 0,
  },
  TopText2: {
    fontSize: 16,
    fontWeight: '500',
    color: Colors.BottomPage,
  },
  TopAll: {
    width: 69,
    height: 30,
    borderWidth: 2,
    borderColor: Colors.BottomPage,
    borderRadius: 5,
    alignItems: 'center',
    justifyContent: 'space-around',
    flexDirection: 'row',
  },
  List: {
    marginTop: 37,
  },
  Listcomponent: {
    backgroundColor: Colors.White,
    marginHorizontal: 30,
    paddingHorizontal: 26,
    marginVertical: 10,
    borderColor: Colors.ChapterBorder,
    borderWidth: 1,
    borderRadius: 18,
    height: 245,
    paddingVertical: 24,
  },
  Listcomponentls: {
    backgroundColor: Colors.White,
    marginHorizontal: 90,
    paddingHorizontal: 26,
    marginVertical: 10,
    borderColor: Colors.ChapterBorder,
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
    color: Colors.ActiveTab,
    fontSize: 14,
    fontWeight: '500',
  },
  lesson: {
    color: Colors.BottomPage,
    fontSize: 14,
    textAlign: 'right',
  },
  name: {
    marginTop: 10,
    color: Colors.ChapNameColor,
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
    color: Colors.BottomPage,
    fontSize: 12,
    fontWeight: '300',
  },
  of50: {
    color: Colors.BottomPage,
    fontSize: 14,
    fontWeight: '300',
    marginBottom: 21,
  },
  right: {
    fontSize: 18,
    color: Colors.ChapNameColor,
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
    color: Colors.PercentHigh,
    fontSize: 40,
    marginTop: -10,
  },
  perlow: {
    color: Colors.PercentLow,
    fontSize: 40,
    marginTop: -10,
  },

  per1high: {
    fontSize: 20,
    paddingRight: 14,
    color: Colors.PercentHigh,
    fontWeight: 'bold',
  },
  per1low: {
    fontSize: 20,
    paddingRight: 14,
    color: Colors.PercentLow,
    fontWeight: 'bold',
  },
  modalText: {
    marginBottom: 13,
    textAlign: 'center',
  },
  noTest: {
    marginTop: 80,
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: 30,
  },
  noTestText: {
    color: Colors.ReSend,
    fontSize: 25,
    textAlign: 'center',
    fontWeight: '600',
  },
});
