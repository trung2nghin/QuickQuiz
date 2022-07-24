import {call, put, takeLatest, takeEvery} from '@redux-saga/core/effects';
import {getQuestion, setQuestion} from './QuestionRedux';
import {requestGetQuestion} from '../../api/QuestionAPIServices';
import {setLoading} from '../Loading/LoadingRedux';

export const handleGetQuestion = function* (): any {
  try {
    yield put(setLoading(true));
    const response = yield call(requestGetQuestion);
    const {data} = response;
    yield put(setQuestion({...data}));
    yield put(setLoading(false));
  } catch (error) {
    console.log(error);
  }
};

export function* watcherSaga() {
  yield takeLatest(getQuestion.type, handleGetQuestion);
}
