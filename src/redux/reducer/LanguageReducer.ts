import {createSlice} from '@reduxjs/toolkit';
// import constants from '../../utils/helpers/constants';
// import {getData} from '../LocalStore';

const initialState = {
  status: '',
  isLanguageSelected: null,
};

const LanguageSlice = createSlice({
  name: 'Language',
  initialState,
  reducers: {
    /* onStart */
    setLanguage(state, action) {
      state.isLanguageSelected = action.payload;
      state.status = action.type;
    },
  },
});

export const {
  /* setLanguage */
  setLanguage,
} = LanguageSlice.actions;

export default LanguageSlice.reducer;
