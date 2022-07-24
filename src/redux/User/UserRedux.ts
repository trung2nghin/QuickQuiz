import {createSlice} from '@reduxjs/toolkit';

export type userInfo = {
  displayName?: string | null;
  userName?: string;
  emailVerified?: boolean;
  isAnonymous?: boolean;
  metadata?: string;
  phoneNumber?: string | null;
  photoURL?: string | null;
  providerId?: string;
  refreshToken?: string;
  uid?: string;
} | null;

const initialState: userInfo = null;

const userSlice = createSlice({
  name: 'user',
  initialState: initialState,
  reducers: {
    getUser() {},
    setUser(state, action) {
      const myUser = action.payload;
      return myUser;
    },
  },
});

export const {getUser, setUser} = userSlice.actions;

export default userSlice.reducer;
