import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, { FC, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { StackNavigationProp } from '@react-navigation/stack';
import { useNavigation } from '@react-navigation/native';

import { Container } from '../../components';
import Card from '../components/Card';
import { Metrics, Images } from '../../assets';
import {
  getMediumQuestion,
  getHardQuestion,
  getQuestion,
} from '../../redux/Questions/QuestionRedux';
import { RootState } from '../../redux/store';
import { MainStackParamList } from '../../navigation/MainStack';

type HomeScreenProp = StackNavigationProp<MainStackParamList, 'HOME'>;

const HomeScreen: FC = () => {
  const navigation = useNavigation<HomeScreenProp>();
  const dispatch = useDispatch();

  const onNavGame = useCallback(() => {
    navigation.navigate('GAME');
  }, [navigation]);

  const onGetQuestion = useCallback(() => {
    dispatch(getQuestion());
    onNavGame();
  }, [dispatch]);

  const onGetMediumQuestion = useCallback(() => {
    dispatch(getMediumQuestion());
    onNavGame();
  }, [dispatch]);

  const onGetHardQuestion = useCallback(() => {
    dispatch(getHardQuestion());
    onNavGame();
  }, [dispatch]);

  return (
    <Container header>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.viewImg}>
          <Image source={Images.background.backgroundImg} style={styles.img} />
          <Text style={styles.txtTitle}>
            It’s fine to celebrate {'\n'}success,but it is more {'\n'}important
            to heed the{'\n'}lessons of failure.
          </Text>
          <TouchableOpacity style={styles.btnGuide}>
            <Text style={styles.txtGuide}>How to plays ?</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.viewMain}>
          <Card
            height={Metrics.screen.height / 4}
            bgColor="#FFFFFF"
            borderR={6}
            jCenter>
            <View style={styles.viewCard}>
              <Text style={styles.txtTitleQuiz}>Easy Question</Text>
              <Text style={styles.txtContentQuiz}>
                This game synthesizes easy questions for beginners, wishes you a
                happy game and a relaxing moment.
              </Text>
              <TouchableOpacity style={styles.btnStart} onPress={onGetQuestion}>
                <Text style={styles.txtStart}>Start Quiz</Text>
              </TouchableOpacity>
            </View>
          </Card>
          <Card
            height={Metrics.screen.height / 4}
            bgColor="#FFFFFF"
            borderR={6}
            jCenter>
            <View style={styles.viewCard}>
              <Text style={styles.txtTitleQuiz}>Medium Question</Text>
              <Text style={styles.txtContentQuiz}>
                This game synthesizes medium questions for beginners, wishes you
                a happy game.
              </Text>
              <TouchableOpacity
                style={styles.btnStart}
                onPress={onGetMediumQuestion}>
                <Text style={styles.txtStart}>Start Quiz</Text>
              </TouchableOpacity>
            </View>
          </Card>
          <Card
            height={Metrics.screen.height / 4}
            bgColor="#FFFFFF"
            borderR={6}
            jCenter>
            <View style={styles.viewCard}>
              <Text style={styles.txtTitleQuiz}>Hard Question</Text>
              <Text style={styles.txtContentQuiz}>
                This game synthesizes easy questions for pro players, wishes you
                a happy game, and a relaxing moment.
              </Text>
              <TouchableOpacity
                style={styles.btnStart}
                onPress={onGetHardQuestion}>
                <Text style={styles.txtStart}>Start Quiz</Text>
              </TouchableOpacity>
            </View>
          </Card>
        </View>
      </ScrollView>
    </Container>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  img: {
    width: '100%',
    height: Metrics.screen.height / 3,
    alignSelf: 'center',
    borderBottomLeftRadius: 24,
    borderBottomRightRadius: 24,
  },
  txtTitle: {
    top: Metrics.screen.height / 12 - 20,
    left: 16,
    position: 'absolute',
    color: '#000000',
    fontFamily: 'Roboto-Bold',
    fontSize: 24,
  },
  btnGuide: {
    position: 'absolute',
    width: Metrics.screen.width / 1.6,
    height: 40,
    top: Metrics.screen.height / 3 - 48,
    left: Metrics.screen.width / 5,
    borderRadius: 28,
    backgroundColor: 'black',
    justifyContent: 'center',
    alignItems: 'center',
  },
  viewMain: { marginHorizontal: 16, marginTop: 24, marginBottom: 84 },
  txtGuide: {
    color: '#FFFFFF',
    fontFamily: 'Roboto-Regular',
    fontSize: 16,
  },
  viewImg: {
    width: '100%',
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
  },
  viewCard: {
    margin: 20,
    justifyContent: 'space-around',
  },
  txtTitleQuiz: {
    color: '#000000',
    fontFamily: 'Roboto-Bold',
    fontSize: 22,
  },
  txtContentQuiz: {
    marginVertical: 6,
    fontFamily: 'Roboto-Regular',
    fontSize: 16,
    maxWidth: Metrics.screen.width / 1.5,
  },
  btnStart: {
    alignSelf: 'flex-end',
    backgroundColor: '#000000',
    justifyContent: 'center',
    alignItems: 'center',
    width: Metrics.screen.width / 3.6,
    height: 36,
    borderRadius: 6,
  },
  txtStart: {
    color: '#FFFFFF',
  },
});
