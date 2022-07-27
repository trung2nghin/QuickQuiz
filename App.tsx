import React, {useEffect} from 'react';
import AppNavigation from './src/navigation/RootStack';
import {persistor, store} from './src/redux/store';
import {PersistGate} from 'redux-persist/integration/react';
import {Provider} from 'react-redux';
import {Alert, LogBox} from 'react-native';
import messaging from '@react-native-firebase/messaging';

LogBox.ignoreLogs(['ViewPropTypes will be removed from React Native.']);

const App = () => {
  messaging().setBackgroundMessageHandler(async remoteMessage => {
    console.log('Message handled in the background!', remoteMessage);
  });

  useEffect(() => {
    const unsubscribe = messaging().onMessage(async remoteMessage => {
      const notification = JSON.stringify(remoteMessage);
      // const cleanNotification = notification?.android?.body;
      Alert.alert('A new FCM message arrived!', JSON.stringify(remoteMessage));
    });
    return unsubscribe;
  }, []);

  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <AppNavigation />
      </PersistGate>
    </Provider>
  );
};

export default App;
