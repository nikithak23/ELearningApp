import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  ScrollView,
  Platform,
} from 'react-native';
import CircularProgress from 'react-native-circular-progress-indicator';
import useOrientation from '../hooks/useOrientation';
import Icon from 'react-native-vector-icons/Ionicons';
import {Colors} from '../assets/Colors/index';
import {Strings} from '../assets/Strings/index';
import {Icons} from '../assets/Icons/index';
import {Images} from '../assets/Images/index';


const TestResult = ({navigation, route}) => {
  const orientation = useOrientation();
  const percent = route?.params.percent;
  const attempted = route?.params.attempted;
  const rightAnswer = route?.params.rightAnswer;
  const star = route?.params.star;
  const key = route?.params.key;
  const timeup = route?.params.timeup; //timeup=1=>timeup submit, timeup=0=>voluntary submit
  const lessonNumber = route?.params.lessonNumber;
  const token = route?.params.token;
  const lid = route?.params.lid;
  const lName = route?.params.lName;
  const cid = route?.params.cid;
  const cName = route?.params.cName;
  const len = route?.params.len;

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity
          onPress={() =>
            navigation.navigate('CourseScreen', {
              token: token,
              lid: lid,
              lName: lName,
              cId: cid,
              cName: cName,
              lessonNumber: lessonNumber,
            })
          }>
          <Image
            source={Icons.ButtonCancel}
            style={orientation.isPortrait ? styles.btn : styles.btnLs}
          />
        </TouchableOpacity>
      </View>

      <ScrollView>
        <View
          style={
            orientation.isPortrait
              ? styles.resultContainer
              : styles.resultContainerLandscape
          }>
          <View style={styles.starContainer}>
            <View style={{flexDirection: 'row'}}>
              <Text style={styles.starText}>+{star} </Text>
              <Icon name="star" size={20} style={styles.liked} />
            </View>
          </View>
          <CircularProgress
            value={percent}
            radius={80}
            duration={1000}
            textColor="black" 
            fontSize={25}
            valueSuffix={'%'}
            maxValue={100}
            activeStrokeWidth={13}
            inActiveStrokeWidth={13}
            activeStrokeColor={'#0BC763'}
            inActiveStrokeColor={'#999'}
            inActiveStrokeOpacity={0.35}
            title={`${attempted} of ${len} answered`}
            titleColor={'#8E8F93'}
            titleStyle={styles.CircularTxt}></CircularProgress>

          {percent !== 100 && percent !== 0 && timeup === 0 && (
            <>
              <Text
                style={
                  orientation.isPortrait ? styles.Text1 : styles.Text1Landscape
                }>
                Bravo!
              </Text>
              <Text style={styles.Text2}>
                You are just {len - rightAnswer} correct questions away from
                100%. You can do it.
              </Text>
            </>
          )}
          {percent === 100 && timeup === 0 && (
            <>
              <Text
                style={
                  orientation.isPortrait ? styles.Text1 : styles.Text1Landscape
                }>
                Bravo!
              </Text>
              <Text style={styles.Text2}>Congratulations. You did it!</Text>
            </>
          )}
          {percent === 0 && timeup === 0 && (
            <>
              <Text
                style={
                  orientation.isPortrait ? styles.Text1 : styles.Text1Landscape
                }>
                Alas!
              </Text>
              <Text style={styles.Text2}>
                Go for it again, Champ. You got this!
              </Text>
            </>
          )}
          {timeup === 1 && (
            <>
              <Text
                style={
                  orientation.isPortrait ? styles.Text1 : styles.Text1Landscape
                }>
                Oooops!
              </Text>
              <Text style={styles.Text2}>You ran out of time.</Text>
              <Text style={styles.Text2}>
                Your test has been submitted by default.
              </Text>
            </>
          )}
        </View>

        <View>
          <TouchableOpacity
            style={
              orientation.isPortrait
                ? styles.TryAgnContainer
                : styles.TryAgnContainerLandscape
            }
            onPress={() =>
              navigation.navigate('Tests', {
                cid: cid,
                cName: cName,
                token: token,
                id: lid,
                lName: lName,
                key: key + 1,
                timeup: 0,
              })
            }>
            <View style={styles.TryAgnBtn}>
              <Text style={styles.TryAgnTxt}>Try Again</Text>
              <Image
                source={Icons.YesArrow}
                style={styles.TryAgnImg}
              />
            </View>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
};
export default TestResult;

const styles = StyleSheet.create({
  container: {
    height: '100%',
    width: '100%',
    backgroundColor: '#f6f8fa',
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    backgroundColor: 'white',
  },
  btn: {
    marginTop: Platform.OS === 'ios' ? 50 : 20,
    marginBottom: 15,
    marginHorizontal: 28,
  },
  btnLs: {
    marginTop: Platform.OS === 'ios' ? 50 : 20,
    marginBottom: 15,
    marginHorizontal: 90,
  },
  resultContainer: {
    alignItems: 'center',
    marginVertical: 100,
    marginHorizontal: 20,
  },
  resultContainerLandscape: {
    alignItems: 'center',
    marginVertical: 50,
    marginHorizontal: 90,
  },
  Text1: {
    textAlign: 'center',
    fontSize: 20,
    fontWeight: '700',
    color: 'black',
    marginTop: 80,
    marginBottom: 7,
  },
  Text1Landscape: {
    textAlign: 'center',
    fontSize: 20,
    fontWeight: '700',
    color: 'black',
    marginTop: 45,
    marginBottom: 7,
  },
  Text2: {
    textAlign: 'center',
    fontSize: 17,
  },
  CircularTxt: {
    fontWeight: 'bold',
    fontSize: 13,
    marginTop: Platform.OS === 'ios' ? 5 : -10,
  },
  TryAgnContainer: {
    height: 50,
    width: 320,
    borderRadius: 13,
    backgroundColor: '#4C93FF',
    alignSelf: 'center',
  },
  TryAgnContainerLandscape: {
    height: 50,
    width: 320,
    borderRadius: 13,
    backgroundColor: '#4C93FF',
    alignSelf: 'center',
    marginBottom: 50,
    marginTop: 30,
  },
  TryAgnBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
    marginLeft: 70,
  },
  TryAgnTxt: {
    marginVertical: 10,
    fontSize: 20,
    color: 'white',
  },
  TryAgnImg: {
    width: 24,
    height: 24,
  },
  starContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 5,
    marginBottom: -12,
  },
  liked: {
    color: '#0BC763',
    height: 25,
    width: 26,
    alignSelf: 'center',
    marginTop: 3,
  },
  starText: {
    fontSize: 21,
    color: '#0BC763',
    alignSelf: 'center',
    fontWeight: '500',
  },
});
