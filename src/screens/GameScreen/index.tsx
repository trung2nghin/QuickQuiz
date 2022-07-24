import {
  ActivityIndicator,
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {FC, useCallback, useEffect, useRef, useState} from 'react';
import {useNavigation} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';
import {useDispatch, useSelector} from 'react-redux';
import CircularProgress, {
  ProgressRef,
} from 'react-native-circular-progress-indicator';
import TextTicker from 'react-native-text-ticker';

import {Container} from '../../components';
import Card from '../components/Card';
import {Metrics} from '../../assets';
import {Header} from '../components';
import {questionInfo} from '../../redux/Questions/QuestionRedux';
import {RootState} from '../../redux/store';
import {RootStackParamList} from '../../navigation/RootStack';
import {setRecord} from '../../redux/Scoreboard/ScoreboardRedux';

interface results {
  category?: string;
  type?: string;
  difficulty?: string;
  question?: string;
  correct_answer?: string;
  incorrect_answers?: string[];
}

type GameScreenProp = StackNavigationProp<RootStackParamList, 'GAME'>;

const GameScreen: FC = () => {
  const [questionList, setQuestionList] = useState<Array<results>>();

  const [questionNumber, setQuestionNumber] = useState(0);

  const [isLoading, setIsLoading] = useState(false);

  const [checkAnswer, setCheckAnswer] = useState(false);

  const [lockAnswerButton, setLockAnswerButton] = useState(false);

  const [chooseAnswer, setChooseAnswer] = useState(4);

  const [totalScore, setTotalScore] = useState(0);

  const [overTime, setOverTime] = useState(false);

  const progressRef = useRef<ProgressRef>(null);

  const navigation = useNavigation<GameScreenProp>();

  const dispatch = useDispatch();

  const loading = useSelector<RootState, boolean>(state => state.loading);

  const question = useSelector<RootState, questionInfo>(
    state => state.question,
  );

  let myQuestion = questionList?.[questionNumber]?.question;

  myQuestion = String(myQuestion)
    ?.replace(/#039;s/g, '')
    ?.replace(/039/g, '')
    ?.replace(/&quot;/g, '')
    ?.replace(/[!@#$%^&*(),;]/g, '');

  let incorrectsAnswer: string[] | undefined =
    questionList?.[questionNumber]?.incorrect_answers;

  let correctAnswer: string | undefined =
    questionList?.[questionNumber]?.correct_answer;

  let currentAnswer;

  if (incorrectsAnswer && correctAnswer) {
    currentAnswer = [...incorrectsAnswer, correctAnswer].sort();
  }

  useEffect(() => {
    setQuestionList(question?.results);
    setIsLoading(loading);
  }, [questionList, question, loading]);

  const onNextQuestion = useCallback(() => {
    setLockAnswerButton(false);
    setChooseAnswer(4);
    progressRef?.current?.reAnimate();
    setOverTime(false);
    questionNumber < 10
      ? setQuestionNumber(prev => prev + 1)
      : setQuestionNumber(10);
  }, [questionNumber, progressRef]);

  const onChooseAnswer = useCallback(
    (item: string, index: number) => {
      if (item === questionList?.[questionNumber]?.correct_answer) {
        setCheckAnswer(true);
        setChooseAnswer(index);
        setTotalScore(prev => prev + 1);
      } else {
        setChooseAnswer(index);
        setCheckAnswer(false);
      }
      setLockAnswerButton(true);
    },
    [questionNumber, questionList, chooseAnswer],
  );

  const onOverTime = useCallback(() => {
    if (questionNumber < 10) {
      setOverTime(false);
      setQuestionNumber(prev => prev + 1);
      setChooseAnswer(4);
      setLockAnswerButton(false);
      progressRef?.current?.reAnimate();
    } else {
      setQuestionNumber(10);
      progressRef?.current?.pause();
    }
  }, [overTime, questionNumber, progressRef]);

  const onGoBack = useCallback(() => {
    dispatch(setRecord(totalScore));
    navigation.goBack();
  }, [navigation, dispatch, totalScore, setTotalScore]);

  const renderItem = ({item, index}: {item: string; index: number}) => (
    <TouchableOpacity
      style={[
        styles.btnAnswer,
        {
          backgroundColor:
            checkAnswer && index === chooseAnswer
              ? 'green'
              : checkAnswer === false && index === chooseAnswer
              ? 'red'
              : '#FFFFFF',
        },
      ]}
      disabled={lockAnswerButton || overTime}
      onPress={() => onChooseAnswer(item, index)}>
      <TextTicker
        style={styles.txtContentQuiz}
        numberOfLines={1}
        duration={5000}
        loop>
        {index === 0 ? 'A' : index === 1 ? 'B' : index === 2 ? 'C' : 'D'}.{' '}
        {item
          ?.replace(/quot/g, '')
          ?.replace(/[!@#$%^&*(),;]/g, '')
          ?.replace(/&#039;/g, '')
          ?.replace(/&#039s/g, '')}
      </TextTicker>
    </TouchableOpacity>
  );

  return (
    <Container header={<Header icon="chevron-back-outline" />}>
      <View style={styles.viewImg}>
        {isLoading ? (
          <View style={styles.loadingAnimation}>
            <ActivityIndicator size={72} color="#333333" />
          </View>
        ) : (
          <>
            {questionNumber >= 10 ? (
              <Text style={styles.txtFinish}>GAME OVER !!!</Text>
            ) : (
              <>
                <Text style={styles.txtNumberQuiz}>
                  Question Number: {questionNumber + 1}/10
                </Text>
                <CircularProgress
                  ref={progressRef}
                  value={0}
                  maxValue={10}
                  radius={Metrics.screen.width / 5}
                  initialValue={10}
                  progressValueColor="black"
                  activeStrokeWidth={15}
                  inActiveStrokeWidth={15}
                  inActiveStrokeColor={'#999999'}
                  activeStrokeColor={'#2465FD'}
                  activeStrokeSecondaryColor={'#C25AFF'}
                  inActiveStrokeOpacity={0.3}
                  duration={10000}
                  onAnimationComplete={onOverTime}
                />
              </>
            )}
          </>
        )}
      </View>
      <View style={styles.viewMain}>
        <Card
          height={Metrics.screen.height / 1.8}
          bgColor="#FFFFFF"
          borderR={6}>
          {isLoading ? (
            <View style={styles.loadingAnimation}>
              <ActivityIndicator size={72} color="#333333" />
            </View>
          ) : (
            <View style={styles.viewCard}>
              {questionNumber >= 10 ? (
                <>
                  <Text style={styles.txtFinish}>CONGRATULATION !!!</Text>
                  <Text style={styles.txtFinish}>
                    {totalScore < 7 ? `NOOB` : `OUT STANDING`}
                  </Text>
                  <Text style={styles.txtFinish}>
                    Your total score: {totalScore}
                  </Text>
                </>
              ) : (
                <>
                  <Text style={styles.txtTitleQuiz}>{myQuestion}</Text>
                  <View style={styles.viewAnswer}>
                    <FlatList
                      data={currentAnswer}
                      renderItem={renderItem}
                      keyExtractor={index => index.toString()}
                      style={styles.list}
                    />
                  </View>
                </>
              )}
              {questionNumber >= 10 ? (
                <TouchableOpacity style={styles.btnNext} onPress={onGoBack}>
                  <Text style={styles.txtNext}>Next Challenge</Text>
                </TouchableOpacity>
              ) : (
                <TouchableOpacity
                  style={styles.btnNext}
                  onPress={onNextQuestion}>
                  <Text style={styles.txtNext}>
                    {questionNumber === 9 ? 'Finish' : 'Next Quiz'}
                  </Text>
                </TouchableOpacity>
              )}
            </View>
          )}
        </Card>
      </View>
    </Container>
  );
};

export default GameScreen;

const styles = StyleSheet.create({
  viewImg: {
    width: '100%',
    height: Metrics.screen.height / 3,
    backgroundColor: '#FFFFFF',
    borderBottomLeftRadius: 24,
    borderBottomRightRadius: 24,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    alignItems: 'center',
    justifyContent: 'space-around',
    padding: 16,
  },
  viewMain: {marginHorizontal: 16, height: Metrics.screen.height * 0.5},
  txtGuide: {
    color: '#FFFFFF',
    fontFamily: 'Roboto-Regular',
    fontSize: 16,
  },
  txtNumberQuiz: {
    color: '#000000',
    fontFamily: 'Roboto-Bold',
    fontSize: 20,
    minWidth: '95%',
    textAlign: 'center',
  },
  loadingAnimation: {height: '100%', justifyContent: 'center'},
  viewCard: {
    height: '90%',
    margin: 20,
    alignItems: 'center',
    justifyContent: 'space-around',
  },
  txtTitleQuiz: {
    color: '#000000',
    fontFamily: 'Roboto-Bold',
    fontSize: 20,
    minHeight: '25%',
    minWidth: '95%',
  },
  txtContentQuiz: {
    fontFamily: 'Roboto-Regular',
    fontSize: 18,
    color: '#000000',
  },
  btnAnswer: {
    width: '100%',
    height: 40,
    justifyContent: 'center',
    borderRadius: 4,
    borderWidth: 2,
    paddingLeft: 8,
    borderColor: '#000000',
    marginBottom: 6,
    alignSelf: 'center',
  },
  viewAnswer: {
    marginVertical: 12,
    width: '100%',
    alignItems: 'center',
  },
  list: {width: '95%'},
  btnNext: {
    backgroundColor: '#000000',
    justifyContent: 'center',
    alignItems: 'center',
    width: Metrics.screen.width / 2.5,
    height: 36,
    borderRadius: 6,
  },
  txtNext: {
    color: '#FFFFFF',
  },
  txtFinish: {
    fontFamily: 'Roboto-Bold',
    fontSize: 36,
    color: '#000000',
  },
});
