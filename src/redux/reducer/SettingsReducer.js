import {createSlice} from '@reduxjs/toolkit';

const initialState = {
  status: {},
  bankDetails: {},
  saveBankDetailsResponse: {},
};

const SettingsSlice = createSlice({
  name: 'Settings',
  initialState,
  reducers: {
    FetchBankDetails(state, action) {
      state.status = action.type;
    },
    FetchBankDetailsSuccess(state, action) {
      state.bankDetails = action.payload;
      state.status = action.type;
    },
    FetchBankDetailsFailure(state, action) {
      state.error = action.error;
      state.status = action.type;
    },
    saveBankDetails(state, action) {
      console.log('inside save', action?.payload);
      state.bankDetails = action?.payload;
      state.status = action.type;
    },
    saveBankDetailsSuccess(state, action) {
      state.saveBankDetailsResponse = action?.payload;
      state.status = action.type;
    },
    saveBankDetailsFailure(state, action) {
      state.error = action?.error;
      state.status = action.type;
    },
  },
});

export const {
  FetchBankDetails,
  FetchBankDetailsSuccess,
  FetchBankDetailsFailure,
  saveBankDetails,
  saveBankDetailsSuccess,
  saveBankDetailsFailure,
} = SettingsSlice.actions;

export default SettingsSlice.reducer;
