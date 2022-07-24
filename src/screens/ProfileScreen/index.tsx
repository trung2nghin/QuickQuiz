import {FlatList, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React, {FC, useCallback, useEffect, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {StackNavigationProp} from '@react-navigation/stack';
import {useNavigation} from '@react-navigation/native';
import FireBaseAuth from '@react-native-firebase/auth';

import {Container} from '../../components';
import Card from '../components/Card';
import {Metrics} from '../../assets';
import {RootState} from '../../redux/store';
import {MainStackParamList} from '../../navigation/MainStack';
import {setUser, userInfo} from '../../redux/User/UserRedux';

type HomeScreenProp = StackNavigationProp<MainStackParamList, 'HOME'>;

const ProfileScreen: FC = () => {
  const [scoreboard, setScoreboard] = useState<Array<string> | undefined>();

  const [playerName, setPlayerName] = useState<string | undefined>('');

  const navigation = useNavigation<HomeScreenProp>();

  const dispatch = useDispatch();

  const score = useSelector<RootState, Array<number>>(
    state => state.scoreboard,
  );

  const user = useSelector<RootState, userInfo>(state => state.user);

  const stringScore = score.map(num => {
    return String(num);
  });

  const displayName = user?.userName?.replace(/@gmail.com/g, '');

  useEffect(() => {
    setScoreboard(stringScore);
    setPlayerName(displayName);
  }, [score]);

  const onSignOut = useCallback(async () => {
    try {
      const firebaseAuth = await FireBaseAuth();
      await firebaseAuth.signOut();
      await dispatch(setUser(null));
    } catch (error) {
      console.log('error log out', error);
    }
  }, []);

  const renderItem = ({item, index}: {item: string; index: number}) => (
    <>
      {score.length < 8 ? (
        <View style={styles.viewItem}>
          <Text style={styles.txtBoard}>{index + 1}</Text>
          <Text style={styles.txtBoard}>{playerName}</Text>
          <Text style={styles.txtBoard}>{item}</Text>
        </View>
      ) : (
        <></>
      )}
    </>
  );

  return (
    <Container header>
      <View style={styles.viewMain}>
        <Card
          height={Metrics.screen.height / 1.4}
          bgColor="#FFFFFF"
          borderR={6}>
          <View style={styles.viewCard}>
            <Text style={styles.txtTitleQuiz}>Scoreboard history</Text>
            <View style={[styles.viewItem, {width: '82%'}]}>
              <Text style={styles.txtBoard}>Rank</Text>
              <Text style={styles.txtBoard}>Player Name</Text>
              <Text style={styles.txtBoard}>Score</Text>
            </View>
            <View>
              <FlatList
                data={scoreboard}
                renderItem={renderItem}
                style={styles.listScore}
              />
            </View>
          </View>
        </Card>
        <TouchableOpacity style={styles.btnStart} onPress={onSignOut}>
          <Text style={styles.txtStart}>Sign Out</Text>
        </TouchableOpacity>
      </View>
    </Container>
  );
};

export default ProfileScreen;

const styles = StyleSheet.create({
  viewMain: {marginHorizontal: 16, marginTop: 6},
  viewCard: {
    width: '100%',
    marginTop: 24,
  },
  txtTitleQuiz: {
    color: '#000000',
    fontFamily: 'Roboto-Bold',
    fontSize: 36,
    textAlign: 'center',
  },
  txtContentQuiz: {
    marginVertical: 6,
    fontFamily: 'Roboto-Regular',
    fontSize: 16,
    maxWidth: Metrics.screen.width / 1.5,
  },
  listScore: {
    marginHorizontal: 16,
  },
  viewItem: {
    width: '90%',
    height: Metrics.screen.height / 16,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
    alignSelf: 'center',
    marginTop: 6,
    borderRadius: 6,
    backgroundColor: '#000000',
    padding: 12,
  },
  txtBoard: {fontFamily: 'Roboto-Regular', fontSize: 16, color: '#FFFFFF'},
  btnStart: {
    alignSelf: 'center',
    backgroundColor: '#000000',
    justifyContent: 'center',
    alignItems: 'center',
    width: Metrics.screen.width / 3.6,
    height: 36,
    borderRadius: 6,
    marginTop: 12,
  },
  txtStart: {
    color: '#FFFFFF',
  },
});
