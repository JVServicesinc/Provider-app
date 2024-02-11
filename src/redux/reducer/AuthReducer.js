import {createSlice} from '@reduxjs/toolkit';

const initialState = {
  status: {},
  token: null,
  setToken: '',
  isLoading: true,
  error: {},
  signUpResponse: {},
  workTypeResponse: {},
  SaveBankAccountResponse: {},
  PanDetalsResponse: {},
  AdharDetailsRes: {},
  SinDetailRes: {},
  GetSaveBankAccountResponse: {},
  GetPanDetalsResponse: {},
  GetAdharDetailsRes: {},
  GetSinDetailRes: {},
  signinResponse: {},
  sendForgotOtpResponse: {},
  ForgotOtpVerifyResponse: {},
  ChangePasswordResponse: {},
  logoutResponse: {},
};

const AuthSlice = createSlice({
  name: 'Auth',
  initialState,
  reducers: {
    /* Token */
    setUserToken(state, action) {
      state.token = action.payload;
      state.status = action.type;
    },

    //getToken
    getTokenRequest(state, action) {
      state.status = action.type;
    },
    getTokenSuccess(state, action) {
      state.isLoading = false;
      state.token = action.payload;
      state.status = action.type;
    },
    getTokenFailure(state, action) {
      state.isLoading = false;
      state.error = action.error;
      state.status = action.type;
    },

    setTokenSuccess(state, action) {
      state.setToken = action.payload;
      state.status = action.type;
    },
    // //SignUp
    signUpRequest(state, action) {
      state.status = action.type;
    },
    signUpSuccess(state, action) {
      state.signUpResponse = action.payload;
      state.status = action.type;
    },
    signUpFailure(state, action) {
      state.error = action.error;
      state.signUpResponse = action.payload;
      state.status = action.type;
    },
    //workType

    workTypeRequest(state, action) {
      state.status = action.type;
    },
    workTypeSuccess(state, action) {
      state.workTypeResponse = action.payload;
      state.status = action.type;
    },
    workTypeFailure(state, action) {
      state.error = action.error;
      state.status = action.type;
    },

    //Save Bank Account
    SaveBankAccountRequest(state, action) {
      state.status = action.type;
    },
    SaveBankAccountSuccess(state, action) {
      state.SaveBankAccountResponse = action.payload;
      state.status = action.type;
    },
    SaveBankAccountFailure(state, action) {
      state.error = action.error;
      state.status = action.type;
    },
    //PanDetals

    PanDetalsRequest(state, action) {
      state.status = action.type;
    },
    PanDetalsSuccess(state, action) {
      state.PanDetalsResponse = action.payload;
      state.status = action.type;
    },
    PanDetalsFailure(state, action) {
      state.error = action.error;
      state.status = action.type;
    },

    //AdharDetails
    AdharDetailsRequest(state, action) {
      state.status = action.type;
    },
    AdharDetailsSuccess(state, action) {
      state.AdharDetailsRes = action.payload;
      state.status = action.type;
    },
    AdharDetailsFailure(state, action) {
      state.error = action.error;
      state.status = action.type;
    },

    //SinDetail
    SinDetailRequest(state, action) {
      state.status = action.type;
    },
    SinDetailSuccess(state, action) {
      state.SinDetailRes = action.payload;
      state.status = action.type;
    },
    SinDetailFailure(state, action) {
      state.error = action.error;
      state.status = action.type;
    },

    //Save Bank Account
    GetSaveBankAccountRequest(state, action) {
      state.status = action.type;
    },
    GetSaveBankAccountSuccess(state, action) {
      state.GetSaveBankAccountResponse = action.payload;
      state.status = action.type;
    },
    GetSaveBankAccountFailure(state, action) {
      state.error = action.error;
      state.status = action.type;
    },
    //PanDetals

    GetPanDetalsRequest(state, action) {
      state.status = action.type;
    },
    GetPanDetalsSuccess(state, action) {
      state.GetPanDetalsResponse = action.payload;
      state.status = action.type;
    },
    GetPanDetalsFailure(state, action) {
      state.error = action.error;
      state.status = action.type;
    },

    //AdharDetails
    GetAdharDetailsRequest(state, action) {
      state.status = action.type;
    },
    GetAdharDetailsSuccess(state, action) {
      state.GetAdharDetailsRes = action.payload;
      state.status = action.type;
    },
    GetAdharDetailsFailure(state, action) {
      state.error = action.error;
      state.status = action.type;
    },

    //SinDetail
    GetSinDetailRequest(state, action) {
      state.status = action.type;
    },
    GetSinDetailSuccess(state, action) {
      state.GetSinDetailRes = action.payload;
      state.status = action.type;
    },
    GetSinDetailFailure(state, action) {
      state.error = action.error;
      state.status = action.type;
    },

    // //SignIn
    signinRequest(state, action) {
      state.status = action.type;
    },
    signinSuccess(state, action) {
      state.signinResponse = action.payload;
      state.status = action.type;
    },
    signinFailure(state, action) {
      state.error = action.error;
      state.signinResponse = action.payload;
      state.status = action.type;
    },

    // send forgot password otp
    sendForgotOtpRequest(state, action) {
      state.status = action.type;
    },
    sendForgotOtpSuccess(state, action) {
      state.sendForgotOtpResponse = action.payload;
      state.status = action.type;
    },
    sendForgotOtpFailure(state, action) {
      state.error = action.error;
      state.signinResponse = action.payload;
      state.status = action.type;
    },

    // send forgot password otp
    ChangePasswordRequest(state, action) {
      state.status = action.type;
    },
    ChangePasswordSuccess(state, action) {
      state.ChangePasswordResponse = action.payload;
      state.status = action.type;
    },
    ChangePasswordFailure(state, action) {
      state.error = action.error;
      state.signinResponse = action.payload;
      state.status = action.type;
    },

    // send forgot password otp
    ForgotOtpVerifyRequest(state, action) {
      state.status = action.type;
    },
    ForgotOtpVerifySuccess(state, action) {
      state.ForgotOtpVerifyResponse = action.payload;
      state.status = action.type;
    },
    ForgotOtpVerifyFailure(state, action) {
      state.error = action.error;
      state.signinResponse = action.payload;
      state.status = action.type;
    },

    // //logout
    logoutRequest(state, action) {
      state.status = action.type;
    },
    logoutSuccess(state, action) {
      state.logoutResponse = action.payload;
      state.status = action.type;
    },
    logoutFailure(state, action) {
      state.error = action.error;
      state.status = action.type;
    },
  },
});

export const {
  setUserToken,

  signUpRequest,
  signUpSuccess,
  signUpFailure,
  workTypeRequest,
  workTypeSuccess,
  workTypeFailure,

  SaveBankAccountRequest,
  SaveBankAccountSuccess,
  SaveBankAccountFailure,
  PanDetalsRequest,
  PanDetalsSuccess,
  PanDetalsFailure,
  AdharDetailsRequest,
  AdharDetailsSuccess,
  AdharDetailsFailure,
  SinDetailRequest,
  SinDetailSuccess,
  SinDetailFailure,

  GetSaveBankAccountRequest,
  GetSaveBankAccountSuccess,
  GetSaveBankAccountFailure,
  GetPanDetalsRequest,
  GetPanDetalsSuccess,
  GetPanDetalsFailure,
  GetAdharDetailsRequest,
  GetAdharDetailsSuccess,
  GetAdharDetailsFailure,
  GetSinDetailRequest,
  GetSinDetailSuccess,
  GetSinDetailFailure,

  signinRequest,
  signinSuccess,
  signinFailure,
  getTokenRequest,
  getTokenSuccess,
  getTokenFailure,
  logoutRequest,
  logoutSuccess,
  logoutFailure,
  setTokenSuccess,

  sendForgotOtpRequest,
  sendForgotOtpSuccess,
  sendForgotOtpFailure,

  ChangePasswordRequest,
  ChangePasswordSuccess,
  ChangePasswordFailure,

  ForgotOtpVerifyRequest,
  ForgotOtpVerifySuccess,
  ForgotOtpVerifyFailure,
} = AuthSlice.actions;

export default AuthSlice.reducer;
