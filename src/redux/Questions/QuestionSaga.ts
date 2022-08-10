import {
  call,
  put,
  takeLatest,
  takeEvery,
  all,
} from '@redux-saga/core/effects';
import {
  getHardQuestion,
  getMediumQuestion,
  getQuestion,
  setQuestion,
} from './QuestionRedux';
import {
  requestGetHardQuestion,
  requestGetMediumQuestion,
  requestGetQuestion,
} from '../../api/QuestionAPIServices';
import { setLoading } from '../Loading/LoadingRedux';

export const handleGetQuestion = function* (): any {
  try {
    yield put(setLoading(true));
    const response = yield call(requestGetQuestion);
    const { data } = response;
    yield put(setQuestion({ ...data }));
    yield put(setLoading(false));
  } catch (error) {
    console.log(error);
  }
};

export const handleMediumGetQuestion = function* (): any {
  try {
    yield put(setLoading(true));
    const response = yield call(requestGetMediumQuestion);
    const { data } = response;
    yield put(setQuestion({ ...data }));
    yield put(setLoading(false));
  } catch (error) {
    console.log(error);
  }
};

export const handleHardGetQuestion = function* (): any {
  try {
    yield put(setLoading(true));
    const response = yield call(requestGetHardQuestion);
    const { data } = response;
    yield put(setQuestion({ ...data }));
    yield put(setLoading(false));
  } catch (error) {
    console.log(error);
  }
};

export function* watcherSaga() {
  yield all([
    takeLatest(getQuestion.type, handleGetQuestion),
    takeLatest(getMediumQuestion.type, handleMediumGetQuestion),
    takeLatest(getHardQuestion.type, handleHardGetQuestion),
  ]);
}
