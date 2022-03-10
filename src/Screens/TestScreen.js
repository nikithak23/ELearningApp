import React, {useState, useEffect} from 'react';
import {
  Text,
  Image,
  View,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Platform,
} from 'react-native';
import axios from 'axios';
import Modal from 'react-native-modal';
import {useFocusEffect} from '@react-navigation/core';
import {CountdownCircleTimer} from 'react-native-countdown-circle-timer';
import useOrientation from '../hooks/useOrientation';

const TestScreen = ({navigation, route}) => {
  const orientation = useOrientation();
  const courseId = route?.params.cid;
  const courseName = route?.params.cName;
  const token = route?.params.token;
  const lid = route?.params.id; //reqd to go bck to course page
  const lName = route?.params.lName; //reqd to go back to course page
  const baseUrl = 'https://elearningapp-api.herokuapp.com';
  const [questions, setQuestions] = useState([]);
  const [option, setOption] = useState('');
  let key = route.params.key ? route.params.key : 0; //to restart the timer
  let submitData = [];
  let timeup = route?.params.timeup ? route.params.timeup : 0;
  const [timer, setTimer] = useState(true);
  let num = route.params.num ? route.params.num - 1 : 0;
  const [n, setN] = useState(0);
  const [markedAnswer, setMarkedAnswer] = useState('');
  const [modalVisible, setModalVisible] = useState(false);
  let [answered, setAnswered] = useState([]);

  const getQtns = async () => {
    //Get questions api
    try {
      const response = await axios.get(
        `${baseUrl}/subject/gettest/${courseId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );
      console.log('Get questions Api', response.status);
      setQuestions(response.data.data);
    } catch (err) {
      console.log(err);
    }
  };
  let len = questions.length;

  useEffect(() => {
    getQtns();
  }, []);

  useFocusEffect(
    React.useCallback(() => {
      setN(num);
      setTimer(true);
    }, [num]),
  );

  const sendAns = async () => {
    //Send Answers api
    console.log(markedAnswer);
    try {
      const response = await axios.get(
        `${baseUrl}/subject/begintest/${courseId}/${questions[n].testNumber}?markedAnswer=${markedAnswer}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );
      console.log('Send answers Api', response.status);
      setAnswered([...answered, n + 1]);
      console.log('Sent');
      console.log(response.data.data);
    } catch (err) {
      console.log('Not Sent');
      console.log(err);
    }
  };
  console.log('answereedddd', answered);

  const submitTest = async () => {
    //Submit test api
    try {
      const response = await axios.get(
        `${baseUrl}/subject/submittest/${courseId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );
      console.log('Submit Test Api', response.status);
      submitData = response.data.data;
      setModalVisible(false);
      setN(0);
      setOption('');
      console.log('SUBMITTEST', timeup);

      await navigation.navigate('TestResult', {
        percent: submitData[0].percentScore,
        attempted: submitData[0].attempted,
        rightAnswer: submitData[0].rightAnswer,
        score: submitData[0].score,
        star: submitData[0].star,
        key: key,
        timeup: timeup,
        //following params are needed to go back to course page
        cid: courseId,
        cName: courseName,
        token: token,
        lId: lid,
        lName: lName,
        len: len,
      });
    } catch (err) {
      console.log(err);
      alert(err);
      setModalVisible(false);
    }
  };

  const nxt = async () => {
    if (n < 9) {
      if (markedAnswer) {
        sendAns();
        setMarkedAnswer('');
        setOption('');
        setN(n + 1);
      } else {
        setOption('');
        setN(n + 1);
      }
    } else {
      if (markedAnswer) {
        sendAns();
        setMarkedAnswer('');
        setOption('');
        setModalVisible(true);
      } else {
        setOption('');
        setModalVisible(true);
      }
    }
  };

  const prev = async () => {
    if (n > 0) {
      if (markedAnswer) {
        sendAns();
        setMarkedAnswer('');
        setOption('');
        setN(n - 1);
      } else {
        setOption('');
        setN(n - 1);
      }
    } else {
      if (markedAnswer) {
        sendAns();
        setMarkedAnswer('');
        alert('You have reached the start of the test.');
      } else {
        console.log('Not Sent');
        alert('You have reached the start of the test.');
      }
    }
  };

  const formatRemainingTime = time => {
    const minutes = Math.floor((time % 3600) / 60);
    const seconds = time % 60;
    return `${minutes}:${seconds}`;
  };
  const renderTime = ({remainingTime}) => {
    return (
      <View>
        <Text>{formatRemainingTime(remainingTime)}</Text>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Image
            source={require('../Images/TestPage/btnCancel.png')}
            style={orientation.isPortrait ? styles.btn : styles.btnLs}
          />
        </TouchableOpacity>

        <View
          style={orientation.isPortrait ? styles.timer : styles.timerLandscape}>
          <CountdownCircleTimer
            isPlaying={timer}
            key={key}
            size={37}
            strokeWidth={3}
            duration={60}
            colors={['#32cd32', '#F7B801', '#A30000', '#A30000']}
            colorsTime={[19, 19, 20, 0]}
            onComplete={() => {
              timeup = 1;
              submitTest();
            }}>
            {renderTime}
          </CountdownCircleTimer>
        </View>
        <Text
          style={
            orientation.isPortrait
              ? styles.timerText
              : styles.timerTextLandscape
          }>
          Time remaining
        </Text>

        <TouchableOpacity
          onPress={() => {
            setOption('');
            navigation.navigate('QtnList', {
              courseId: courseId,
              courseName: courseName,
              token: token,
              key: key,
              answered: answered,
            });
          }}>
          <Image
            source={require('../Images/TestPage/icnQtnList.png')}
            style={orientation.isPortrait ? styles.btn : styles.btnLs}
          />
        </TouchableOpacity>
      </View>

      {len !== 0 ? (
        <ScrollView
          style={orientation.isPortrait ? null : styles.midcontainerLandscape}
          showsVerticalScrollIndicator={false}>
          <Text style={styles.qtn}>{questions[n].questions}</Text>
          <TouchableOpacity
            style={
              option === 'A'
                ? styles.optionContainerSelected
                : styles.optionContainer
            }
            onPress={() => {
              setOption('A');
              setMarkedAnswer(questions[n].option_A);
            }}>
            <Text
              style={option === 'A' ? styles.optionsSelected : styles.options}>
              A. {questions[n].option_A}
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={
              option === 'B'
                ? styles.optionContainerSelected
                : styles.optionContainer
            }
            onPress={() => {
              setOption('B');
              setMarkedAnswer(questions[n].option_B);
            }}>
            <Text
              style={option === 'B' ? styles.optionsSelected : styles.options}>
              B. {questions[n].option_B}
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={
              option === 'C'
                ? styles.optionContainerSelected
                : styles.optionContainer
            }
            onPress={() => {
              setOption('C');
              setMarkedAnswer(questions[n].option_C);
            }}>
            <Text
              style={option === 'C' ? styles.optionsSelected : styles.options}>
              C. {questions[n].option_C}
            </Text>
          </TouchableOpacity>

          {questions[n].option_D ? (
            <TouchableOpacity
              style={
                option === 'D'
                  ? styles.optionContainerSelected
                  : styles.optionContainer
              }
              onPress={() => {
                setOption('D');
                setMarkedAnswer(questions[n].option_D);
              }}>
              <Text
                style={
                  option === 'D' ? styles.optionsSelected : styles.options
                }>
                D. {questions[n].option_D}
              </Text>
            </TouchableOpacity>
          ) : (
            <></>
          )}
        </ScrollView>
      ) : null}

      <View style={styles.footer}>
        {len !== 0 ? (
          <View>
            <Text
              style={
                orientation.isPortrait ? styles.footerTxt1 : styles.footerTxt1Ls
              }>
              C{courseId}: {courseName}
            </Text>
            <Text
              style={
                orientation.isPortrait ? styles.footerTxt2 : styles.footerTxt2Ls
              }>
              {n + 1} of {len} question
            </Text>
          </View>
        ) : null}
        <View style={{flexDirection: 'row'}}>
          <TouchableOpacity onPress={prev}>
            <Image
              source={require('../Images/TestPage/btnPrevQtn.png')}
              style={
                orientation.isPortrait ? styles.footerBtn : styles.footerBtnLs
              }
            />
          </TouchableOpacity>
          <TouchableOpacity onPress={nxt}>
            <Image
              source={require('../Images/TestPage/btnNxtQtn.png')}
              style={
                orientation.isPortrait ? styles.footerBtn : styles.footerBtnLs
              }
            />
          </TouchableOpacity>
        </View>
      </View>

      <Modal isVisible={modalVisible}>
        <View
          style={
            orientation.isPortrait
              ? styles.ModalMainContainer
              : styles.ModalMainContainerLandscape
          }>
          <View style={styles.ModalTopContainer}>
            <View style={styles.ModalContainer}></View>
            <Text style={styles.ModalLogoutText}>Submit Test</Text>
            <Text style={styles.ModalLogoutText1}>
              Are you sure you want to submit the test?
            </Text>
          </View>
          <View style={styles.ModalBottomContainer}>
            <TouchableOpacity
              style={
                orientation.isPortrait
                  ? styles.ModalNoContainer
                  : styles.ModalNoContainerLandscape
              }
              onPress={() => setModalVisible(false)}>
              <Text style={styles.ModalNoText}>No</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={
                orientation.isPortrait
                  ? styles.ModalYesContainer
                  : styles.ModalYesContainerLandscape
              }
              onPress={() => {
                setTimer(false); //if not set to false, timer will keep running in the background
                submitTest();
              }}>
              <View style={styles.ModalYesView}>
                <Text style={styles.ModalYesText}>Yes</Text>
                <Image
                  source={require('../Images/TestPage/yesArrow.png')}
                  style={styles.ModalYesImg}
                />
              </View>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
};
export default TestScreen;

const styles = StyleSheet.create({
  container: {
    height: '100%',
    width: '100%',
    backgroundColor: '#f6f8fa',
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: 'white',
  },
  btn: {
    marginTop: Platform.OS === 'ios' ? 50 : 20,
    marginBottom: 15,
    marginHorizontal: 28,
  },
  btnLs: {
    marginTop: Platform.OS === 'ios' ? 25 : 20,
    marginBottom: 15,
    marginHorizontal: 90,
  },
  //timer0:{
  //  marginTop:Platform.OS === 'ios' ? 50 : 20,
  //  marginBottom:15,
  //  marginHorizontal:-17,
  //  alignSelf:'center'
  //},
  timerText: {
    marginTop: Platform.OS === 'ios' ? 50 : 20,
    marginBottom: 15,
    marginHorizontal: -40,
    alignSelf: 'center',
  },
  timer: {
    marginHorizontal: -40,
    alignSelf: 'center',
    marginTop: Platform.OS === 'ios' ? 30 : 5,
  },
  timerTextLandscape: {
    marginTop: Platform.OS === 'ios' ? 25 : 20,
    marginBottom: 15,
    marginHorizontal: Platform.OS === 'ios' ? -120 : -80,
    alignSelf: 'center',
  },
  timerLandscape: {
    marginHorizontal: Platform.OS === 'ios' ? -120 : -80,
    alignSelf: 'center',
    marginTop: 5,
  },
  footer: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: 'white',
    position: 'absolute',
    bottom: 0,
  },
  footerBtn: {
    marginTop: 20,
    marginBottom: 15,
    marginRight: 28,
  },
  footerTxt1: {
    marginLeft: 28,
    marginTop: 9,
    color: 'black',
    fontSize: 14,
    fontWeight: '500',
  },
  footerTxt2: {
    marginLeft: 28,
    fontSize: 14,
  },
  footerBtnLs: {
    marginTop: 20,
    marginBottom: 15,
    marginRight: 95,
    marginLeft: -50,
  },
  footerTxt1Ls: {
    marginLeft: 90,
    marginTop: 9,
    color: 'black',
    fontSize: 14,
    fontWeight: '500',
  },
  footerTxt2Ls: {
    marginLeft: 90,
    fontSize: 14,
  },
  midcontainerLandscape: {
    marginBottom: 90,
    marginHorizontal: 55,
  },
  qtn: {
    fontSize: 20,
    lineHeight: 28,
    color: 'black',
    fontWeight: '700',
    textAlign: 'center',
    marginTop: 35,
    marginBottom: 25,
    marginHorizontal: 28,
  },
  optionContainer: {
    borderRadius: 25,
    marginVertical: 5,
    backgroundColor: 'white',
    marginHorizontal: 28,
  },
  optionContainerSelected: {
    borderColor: '#4C93FF',
    borderWidth: 1,
    borderRadius: 25,
    marginVertical: 5,
    backgroundColor: 'white',
    marginHorizontal: 28,
  },
  options: {
    fontSize: 15,
    color: '#595B60',
    fontWeight: '500',
    textAlign: 'left',
    marginVertical: 18,
    marginHorizontal: 15,
  },
  optionsSelected: {
    fontSize: 15,
    color: '#4C93FF',
    fontWeight: '500',
    textAlign: 'left',
    marginVertical: 18,
    marginHorizontal: 15,
  },
  ModalMainContainer: {
    backgroundColor: 'white',
    position: 'absolute',
    bottom: -18,
    height: '35%',
    width: '100%',
    marginRight: 20,
    borderRadius: 15,
  },
  ModalMainContainerLandscape: {
    backgroundColor: 'white',
    position: 'absolute',
    bottom: -18,
    height: '80%',
    width: '100%',
    marginRight: 20,
    borderRadius: 15,
  },
  ModalTopContainer: {
    alignItems: 'center',
  },
  ModalContainer: {
    height: 2,
    borderRadius: 20,
    width: 40.2,
    backgroundColor: 'rgba(151,151,151,0.49)',
    marginTop: 15,
  },
  ModalLogoutText: {
    marginTop: 30,
    fontSize: 22,
    fontWeight: 'bold',
    lineHeight: 27,
    letterSpacing: 0,
    fontWeight: '500',
    color: '#191B26',
  },
  ModalLogoutText1: {
    color: '#595B60',
    fontWeight: '300',
    letterSpacing: 0,
    lineHeight: 28,
    textAlign: 'center',
    fontSize: 20,
    textAlign: 'center',
    width: 230,
    marginTop: 15,
  },
  ModalBottomContainer: {
    flexDirection: 'row',
    marginTop: 30,
  },
  ModalNoContainer: {
    height: 55,
    width: 125,
    borderWidth: 2,
    borderRadius: 13,
    marginLeft: 35,
    borderColor: '#4C93FF',
    alignItems: 'center',
    justifyContent: 'center',
  },
  ModalNoText: {
    color: '#4C93FF',
    fontSize: 20,
  },
  ModalYesContainer: {
    height: 55,
    width: 125,
    borderWidth: 2,
    borderRadius: 13,
    borderColor: '#4C93FF',
    marginLeft: 31,
    backgroundColor: '#4C93FF',
  },
  ModalYesView: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
    marginHorizontal: 10,
  },
  ModalYesText: {
    marginVertical: 14,
    fontSize: 20,
    color: 'white',
  },
  ModalYesImg: {
    width: 24,
    height: 24,
  },
  ModalNoContainerLandscape: {
    height: 55,
    width: 200,
    borderWidth: 2,
    borderRadius: 13,
    marginLeft: Platform.OS === 'ios' ? 165 : 115,
    borderColor: '#4C93FF',
    alignItems: 'center',
    justifyContent: 'center',
  },
  ModalYesContainerLandscape: {
    height: 55,
    width: 200,
    borderWidth: 2,
    borderRadius: 13,
    borderColor: '#4C93FF',
    marginLeft: 31,
    backgroundColor: '#4C93FF',
  },
});

/*
//Clock icon
<Image source={require('../Images/TestPage/icnTimer.png')} style={styles.timer0} />
*/
