import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { persistStore, persistReducer } from 'redux-persist';
import AsyncStorage from '@react-native-async-storage/async-storage';
import createSagaMiddleware from 'redux-saga';

import { watcherSaga } from './Questions/QuestionSaga';
import questionReducer from './Questions/QuestionRedux';
import loadingReducer from './Loading/LoadingRedux';
import userReducer from './User/UserRedux';
import scoreboardReducer from './Scoreboard/ScoreboardRedux';

const persistConfig = {
  key: 'root',
  storage: AsyncStorage,
  whitelist: ['user', 'scoreboard'],
};

const sagaMiddleware = createSagaMiddleware();

const reducer = combineReducers({
  question: questionReducer,
  loading: loadingReducer,
  user: userReducer,
  scoreboard: scoreboardReducer,
});

const persistedReducer = persistReducer(persistConfig, reducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      serializableCheck: false,
    }).concat(sagaMiddleware),
});

sagaMiddleware.run(watcherSaga);

export const persistor = persistStore(store);
// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
