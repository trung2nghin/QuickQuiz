import React from 'react';
import AppNavigation from './src/navigation/RootStack';
import {persistor, store} from './src/redux/store';
import {PersistGate} from 'redux-persist/integration/react';
import {Provider} from 'react-redux';
import {LogBox} from 'react-native';

LogBox.ignoreLogs(['ViewPropTypes will be removed from React Native.']);

const App = () => {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <AppNavigation />
      </PersistGate>
    </Provider>
  );
};

export default App;
