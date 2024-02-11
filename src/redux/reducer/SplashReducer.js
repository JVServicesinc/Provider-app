import {createSlice} from '@reduxjs/toolkit';

const initialState = {
  status: '',
  isLoading: null,
  isOnBoarded: null,
};

const SplashSlice = createSlice({
  name: 'Language',
  initialState,
  reducers: {
    /* onStart */
    setOnBoard(state, action) {
      state.isLoading = true;
      state.isOnBoarded = action.payload;
      state.status = action.type;
    },
  },
});

export const {
  /* setLanguage */
  setOnBoard,
} = SplashSlice.actions;

export default SplashSlice.reducer;
