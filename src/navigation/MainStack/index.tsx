import React from 'react';
import {StyleSheet, View} from 'react-native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {BlurView} from '@react-native-community/blur';

import {HomeScreen, ProfileScreen} from '../../screens';
import {questionInfo} from '../../redux/Questions/QuestionRedux';
import {Metrics} from '../../assets';

export type MainStackParamList = {
  HOME: undefined;
  PROFILE: undefined;
  GAME: undefined;
};

const Tab = createBottomTabNavigator<MainStackParamList>();

const MainStack = () => {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarStyle: styles.tabBar,
      }}>
      <Tab.Screen
        component={HomeScreen}
        name="HOME"
        options={{
          headerShown: false,
          tabBarShowLabel: false,
          tabBarBackground: () => (
            <View style={styles.tabBarBg}>
              <BlurView
                blurType="light"
                blurAmount={2}
                reducedTransparencyFallbackColor="white"
                style={styles.absolute}
              />
            </View>
          ),
          tabBarIcon: ({focused, size}) =>
            focused ? (
              <Ionicons name="game-controller" color={'#000000'} size={size} />
            ) : (
              <Ionicons
                name="game-controller-outline"
                color={'#000000'}
                size={size}
              />
            ),
        }}
      />
      <Tab.Screen
        component={ProfileScreen}
        name="PROFILE"
        options={{
          headerShown: false,
          tabBarShowLabel: false,
          tabBarBackground: () => (
            <View style={styles.tabBarBg}>
              <BlurView
                blurType="light"
                blurAmount={2}
                reducedTransparencyFallbackColor="white"
                style={styles.absolute}
              />
            </View>
          ),
          tabBarIcon: ({focused, size}) =>
            focused ? (
              <Ionicons name="person" color={'#000000'} size={size} />
            ) : (
              <Ionicons name="person-outline" color={'#000000'} size={size} />
            ),
        }}
      />
    </Tab.Navigator>
  );
};

export default MainStack;

const styles = StyleSheet.create({
  tabBar: {
    height: 64,
    position: 'absolute',
    bottom: 16,
    left: Metrics.screen.width / 4,
    right: Metrics.screen.width / 4,
    borderRadius: 8,
  },
  tabBarBg: {
    borderRadius: 8,
    overflow: 'hidden',
    flex: 1,
    width: '100%',
    backgroundColor: 'transparent',
  },
  absolute: {
    position: 'absolute',
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
    borderRadius: 8,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 12,
    },
    shadowOpacity: 0.58,
    shadowRadius: 16.0,
    elevation: 24,
    backgroundColor: '#00000036',
  },
});
