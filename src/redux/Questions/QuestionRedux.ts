import {createSlice} from '@reduxjs/toolkit';

export type questionInfo = {
  response_code?: number;
  results?: {
    category?: string;
    type?: string;
    difficulty?: string;
    question?: string;
    correct_answer?: string;
    incorrect_answers?: Array<string>;
  }[];
};

const initialState: questionInfo = {};

const questionSlice = createSlice({
  name: 'question',
  initialState: initialState,
  reducers: {
    getQuestion() {},
    setQuestion(state, action) {
      const questionData = action.payload;
      return {...state, ...questionData};
    },
  },
});

export const {getQuestion, setQuestion} = questionSlice.actions;

export default questionSlice.reducer;
