import * as React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {useSelector} from 'react-redux';

import MainStack from './MainStack';
import {GameScreen, LoginScreen, SignUpScreen} from '../screens';
import {RootState} from '../redux/store';
import {userInfo} from '../redux/User/UserRedux';
import {useEffect, useState} from 'react';

export type RootStackParamList = {
  LOGIN: undefined;
  SIGN_UP: undefined;
  MAIN_STACK: undefined;
  GAME: undefined;
};

const Stack = createStackNavigator<RootStackParamList>();

const RootStack = () => {
  const [checkAuthen, setCheckAuthen] = useState<userInfo>();

  const user = useSelector<RootState, userInfo>(state => state.user);

  useEffect(() => {
    setCheckAuthen(user);
  }, [user, checkAuthen, setCheckAuthen]);

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="LOGIN">
        {!!checkAuthen === false || checkAuthen === {} ? (
          <>
            <Stack.Screen
              component={LoginScreen}
              name="LOGIN"
              options={{headerShown: false}}
            />
            <Stack.Screen
              component={SignUpScreen}
              name="SIGN_UP"
              options={{headerShown: false}}
            />
          </>
        ) : (
          <>
            <Stack.Screen
              component={MainStack}
              name="MAIN_STACK"
              options={{headerShown: false}}
            />
            <Stack.Screen
              component={GameScreen}
              name="GAME"
              options={{headerShown: false}}
            />
          </>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default RootStack;
