import {createSlice} from '@reduxjs/toolkit';

const initialState: Array<number> = [];

const scoreboardSlice = createSlice({
  name: 'scoreboard',
  initialState: initialState,
  reducers: {
    setRecord(state, action) {
      const record: Array<number> = [action.payload];
      const scoreboard = [...state, ...record].sort((a, b) => b - a);
      return scoreboard;
    },
  },
});

export const {setRecord} = scoreboardSlice.actions;

export default scoreboardSlice.reducer;
