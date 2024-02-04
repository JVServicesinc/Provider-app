import { call, put, select, takeLatest } from 'redux-saga/effects';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {
  AdharDetailsFailure,
  AdharDetailsSuccess,
  PanDetalsFailure,
  PanDetalsSuccess,
  SaveBankAccountFailure,
  SaveBankAccountSuccess,
  SinDetailFailure,
  SinDetailSuccess,
  getTokenFailure,
  getTokenRequest,
  getTokenSuccess,
  logoutFailure,
  logoutSuccess,
  setTokenSuccess,
  signUpFailure,
  signUpSuccess,
  signinFailure,
  signinSuccess,
  workTypeFailure,
  workTypeSuccess,
  GetSaveBankAccountSuccess,
  GetSaveBankAccountFailure,
  GetPanDetalsSuccess,
  GetPanDetalsFailure,
  GetAdharDetailsSuccess,
  GetAdharDetailsFailure,
  GetSinDetailSuccess,
  GetSinDetailFailure,
  ChangePasswordSuccess,
  ChangePasswordFailure,
  sendForgotOtpSuccess,
  sendForgotOtpFailure,
  ForgotOtpVerifySuccess,
  ForgotOtpVerifyFailure,
} from '../reducer/AuthReducer';

import { getApi, postApi } from '../../utils/helpers/ApiRequest';
import showErrorAlert from '../../utils/helpers/Toast';
import constants from '../../utils/helpers/constants';
import { navigate } from '../../utils/RootNavigation';
import { getFcmToken } from '../../utils/Notification';


let getItem = state => state.AuthReducer;

export function* getTokenSaga() {
  try {
    const response = yield call(AsyncStorage.getItem, constants.TOKEN);

    if (response != null) {
      yield put(getTokenSuccess(response));
    } else {
      yield put(getTokenSuccess(null));
    }
  } catch (error) {
    yield put(getTokenFailure(error));
  }
}

export function* signUpSaga(action) {
  let header = {
    Accept: 'application/json',
    contenttype: 'application/json',
  };
  try {
    let response = yield call(postApi, 'auth/register', action.payload, header);
    if (response.status == 200) {
      yield put(signUpSuccess(response.data));
      showErrorAlert('Please Verify Your Otp');
    } else {
      yield put(signUpFailure(response.data));
      showErrorAlert(response?.data?.message);
    }
  } catch (error) {
    showErrorAlert(error?.response?.data?.errors?.[0]);
    yield put(signUpFailure(error.response));
  }
}

export function* sendForgotOtpSaga(action) {
  let header = {
    Accept: 'application/json',
    contenttype: 'application/json',
  };
  try {
    let response = yield call(
      postApi,
      'auth/forgot-password/send-otp',
      action.payload,
      header,
    );
    if (response.status == 200) {
      yield put(sendForgotOtpSuccess(response.data));
      showErrorAlert(response?.data?.message);
    } else {
      yield put(sendForgotOtpFailure(response.data));
      showErrorAlert(response?.data?.message);
    }
  } catch (error) {
    showErrorAlert(error?.response?.data?.errors?.[0]);
    yield put(sendForgotOtpFailure(error.response));
  }
}

export function* ForgotOtpVerifySaga(action) {
  let header = {
    Accept: 'application/json',
    contenttype: 'application/json',
  };
  try {
    let response = yield call(
      postApi,
      'auth/forgot-password/validate-otp',
      action.payload,
      header,
    );

    if (response.status == 200) {
      yield put(ForgotOtpVerifySuccess(response.data));
      showErrorAlert(response?.data?.message);
    } else {
      yield put(ForgotOtpVerifyFailure(response.data));
      showErrorAlert(response?.data?.message);
    }
  } catch (error) {
    showErrorAlert(error?.response?.data?.errors?.[0]);
    yield put(ForgotOtpVerifyFailure(error.response));
  }
}

export function* ChangePasswordSaga(action) {
  let header = {
    Accept: 'application/json',
    contenttype: 'application/json',
  };
  try {
    let response = yield call(
      postApi,
      'auth/forgot-password/change-password',
      action.payload,
      header,
    );

    if (response.status == 200) {
      yield put(ChangePasswordSuccess(response.data));
      showErrorAlert(response?.data?.message);
    } else {
      yield put(ChangePasswordFailure(response.data));
      showErrorAlert(response?.data?.message);
    }
  } catch (error) {
    showErrorAlert(error?.response?.data?.errors?.[0]);
    yield put(ChangePasswordFailure(error.response));
  }
}

export function* WorkTypeSaga(action) {
  let header = {
    Accept: 'application/json',
    contenttype: 'multipart/form-data',
  };
  try {
    let response = yield call(getApi, 'work-type', header);
    if (response.status == 200) {
      yield put(workTypeSuccess(response.data));
    } else {
      yield put(workTypeFailure(response.data));

      showErrorAlert(response?.data?.message);
    }
  } catch (error) {
    showErrorAlert(error?.response?.data?.message);
    yield put(workTypeFailure(error.response));
  }
}

// //signIn
export function* signinSaga(action) {
  let header = {
    Accept: 'application/json',
    contenttype: 'application/json',
  };
  try {
    let response = yield call(postApi, 'auth/login', action.payload, header);
    if (response.status == '200') {
      yield put(signinSuccess(response.data));
      yield put(setTokenSuccess(response?.data?.data?.access_token));
      
      const Header2 = {
        Accept: 'application/json',
        contenttype: 'application/json',
        accesstoken: response?.data?.data?.access_token,
      };
      let response1 = yield call(getApi, 'user/profile', Header2);

      const Header3 = {
        Accept: 'application/json',
        contenttype: 'application/json',
        accesstoken: response?.data?.data?.access_token,
      };

      const token = yield call(getFcmToken);

      yield call(postApi, 'user/device-token', {
        device_token:  token
      }, Header3);

      if (response1.status == '200') {
        if (response1?.data?.data?.onboarding_step_status == 'completed') {
          yield call(
            AsyncStorage.setItem,
            constants.TOKEN,
            response?.data?.data?.access_token,
          );
          yield put(getTokenSuccess(response?.data?.data?.access_token));
          showErrorAlert(response?.data?.message);
        } else {
          response1?.data?.data?.onboarding_step_status ==
            'basic_registration_complete'
            ? navigate('SignUp2')
            : response1?.data?.data?.onboarding_step_status == 'bank_complete'
              ? navigate('SignUp3')
              : response1?.data?.data?.onboarding_step_status == 'aadhar_complete'
                ? navigate('PanDetail')
                : response1?.data?.data?.onboarding_step_status == 'pan_complete'
                  ? navigate('SinNumber')
                  : '';
        }
      }
    } else {
      yield put(signinFailure(error));
      showErrorAlert(response?.data?.message);
    }
  } catch (error) {
    yield put(signinFailure(error));
    showErrorAlert(error?.response?.data?.message);
  }
}

//SaveBankAccount
export function* SaveBankAccountSaga(action) {
  let items = yield select(getItem);
  let header = {
    Accept: 'application/json',
    contenttype: 'application/json',
    accesstoken: items?.setToken,
  };
  try {
    let response = yield call(
      postApi,
      'onboarding/kyc/bank-accounts',
      action.payload,
      header,
    );
    if (response?.status == 200) {
      yield put(SaveBankAccountSuccess(response?.data));
    } else {
      yield put(SaveBankAccountFailure(response?.data));
    }
  } catch (error) {
    yield put(SaveBankAccountFailure(error));
  }
}

export function* AdharDetailsSaga(action) {
  let items = yield select(getItem);
  let header = {
    Accept: 'application/json',
    contenttype: 'multipart/form-data',
    accesstoken: items?.setToken,
  };
  try {
    let response = yield call(
      postApi,
      'onboarding/kyc/aadhar',
      action.payload,
      header,
    );

    if (response.status == 200) {
      yield put(AdharDetailsSuccess(response.data));
      showErrorAlert(response.data.message);
    } else {
      yield put(AdharDetailsFailure(response.data));

      showErrorAlert(response?.data?.message);
    }
  } catch (error) {
    showErrorAlert(error?.response?.data?.errors?.[0]);
    yield put(AdharDetailsFailure(error.response));
  }
}

//PanDetails
export function* PanDetailsSaga(action) {
  let items = yield select(getItem);
  let header = {
    Accept: 'application/json',
    contenttype: 'multipart/form-data',
    accesstoken: items?.setToken,
  };
  try {
    let response = yield call(
      postApi,
      'onboarding/kyc/pan',
      action.payload,
      header,
    );

    if (response.status == 200) {
      yield put(PanDetalsSuccess(response.data));
      showErrorAlert(response.data.message);
    } else {
      yield put(PanDetalsFailure(response.data));

      showErrorAlert(response?.data?.message);
    }
  } catch (error) {
    showErrorAlert(error?.response?.data?.errors?.[0]);
    yield put(PanDetalsFailure(error.response));
  }
}

//SinDetails
export function* SinDetailsSaga(action) {
  let items = yield select(getItem);
  let header = {
    Accept: 'application/json',
    contenttype: 'multipart/form-data',
    accesstoken: items?.setToken,
  };
  try {
    let response = yield call(
      postApi,
      'onboarding/kyc/sin',
      action.payload,
      header,
    );

    if (response.status == 200) {
      yield put(SinDetailSuccess(response.data));
      yield call(AsyncStorage.setItem, constants.TOKEN, items?.setToken);
      yield put(getTokenSuccess(items?.setToken));
      showErrorAlert(response.data.message);
    } else {
      yield put(SinDetailFailure(response.data));

      showErrorAlert(response?.data?.message);
    }
  } catch (error) {
    showErrorAlert(error?.response?.data?.errors?.[0]);
    yield put(SinDetailFailure(error.response));
  }
}

//Get SaveBankAccount
export function* GetSaveBankAccountSaga(action) {
  let items = yield select(getItem);
  let header = {
    Accept: 'application/json',
    contenttype: 'application/json',
    accesstoken: items?.setToken,
  };
  try {
    let response = yield call(
      getApi,
      'onboarding/kyc/bank-accounts',

      header,
    );
    if (response?.status == 200) {
      yield put(GetSaveBankAccountSuccess(response?.data));
    } else {
      yield put(GetSaveBankAccountFailure(response?.data));
    }
  } catch (error) {
    yield put(GetSaveBankAccountFailure(error));
  }
}

//Get AdharDetails
export function* GetAdharDetailsSaga(action) {
  let items = yield select(getItem);
  let header = {
    Accept: 'application/json',
    contenttype: 'multipart/form-data',
    accesstoken: items?.setToken,
  };
  try {
    let response = yield call(
      getApi,
      'onboarding/kyc/aadhar',
      header,
    );

    if (response.status == 200) {
      yield put(GetAdharDetailsSuccess(response.data));
    } else {
      yield put(GetAdharDetailsFailure(response.data));

      showErrorAlert(response?.data?.message);
    }
  } catch (error) {
    showErrorAlert(error?.response?.data?.errors?.[0]);
    yield put(GetAdharDetailsFailure(error.response));
  }
}

// Get PanDetails
export function* GetPanDetailsSaga(action) {
  let items = yield select(getItem);
  let header = {
    Accept: 'application/json',
    contenttype: 'multipart/form-data',
    accesstoken: items?.setToken,
  };
  try {
    let response = yield call(
      getApi,
      'onboarding/kyc/pan',
      header,
    );

    if (response.status == 200) {
      yield put(GetPanDetalsSuccess(response.data));
    } else {
      yield put(GetPanDetalsFailure(response.data));

      showErrorAlert(response?.data?.message);
    }
  } catch (error) {
    showErrorAlert(error?.response?.data?.errors?.[0]);
    yield put(GetPanDetalsFailure(error.response));
  }
}

export function* GetSinDetailsSaga(action) {
  let items = yield select(getItem);
  let header = {
    Accept: 'application/json',
    contenttype: 'multipart/form-data',
    accesstoken: items?.setToken,
  };
  try {
    let response = yield call(
      getApi,
      'onboarding/kyc/sin',
      header,
    );

    if (response.status == 200) {
      yield put(GetSinDetailSuccess(response.data));
    } else {
      yield put(GetSinDetailFailure(response.data));
      showErrorAlert(response?.data?.message);
    }
  } catch (error) {
    showErrorAlert(error?.response?.data?.errors?.[0]);
    yield put(GetSinDetailFailure(error.response));
  }
}

//logout
export function* logout_Saga(action) {
  let header = {
    Accept: 'application/json',
    contenttype: 'application/json',
  };
  try {
    yield call(AsyncStorage.removeItem, constants.TOKEN);
    yield put(getTokenSuccess(null));
    yield put(logoutSuccess('logout'));
    showErrorAlert('Logout successfully');
  } catch (error) {
    yield put(logoutFailure(error));
  }
}

const watchFunction = [
  (function* () {
    yield takeLatest('Auth/getTokenRequest', getTokenSaga);
  })(),
  (function* () {
    yield takeLatest('Auth/signUpRequest', signUpSaga);
  })(),
  (function* () {
    yield takeLatest('Auth/sendForgotOtpRequest', sendForgotOtpSaga);
  })(),
  (function* () {
    yield takeLatest('Auth/ForgotOtpVerifyRequest', ForgotOtpVerifySaga);
  })(),
  (function* () {
    yield takeLatest('Auth/ChangePasswordRequest', ChangePasswordSaga);
  })(),
  (function* () {
    yield takeLatest('Auth/workTypeRequest', WorkTypeSaga);
  })(),

  (function* () {
    yield takeLatest('Auth/SaveBankAccountRequest', SaveBankAccountSaga);
  })(),
  (function* () {
    yield takeLatest('Auth/PanDetalsRequest', PanDetailsSaga);
  })(),
  (function* () {
    yield takeLatest('Auth/AdharDetailsRequest', AdharDetailsSaga);
  })(),
  (function* () {
    yield takeLatest('Auth/SinDetailRequest', SinDetailsSaga);
  })(),

  (function* () {
    yield takeLatest('Auth/GetSaveBankAccountRequest', GetSaveBankAccountSaga);
  })(),
  (function* () {
    yield takeLatest('Auth/GetPanDetalsRequest', GetPanDetailsSaga);
  })(),
  (function* () {
    yield takeLatest('Auth/GetAdharDetailsRequest', GetAdharDetailsSaga);
  })(),
  (function* () {
    yield takeLatest('Auth/GetSinDetailRequest', GetSinDetailsSaga);
  })(),
  (function* () {
    yield takeLatest('Auth/signinRequest', signinSaga);
  })(),
  (function* () {
    yield takeLatest('Auth/logoutRequest', logout_Saga);
  })(),
];
export default watchFunction;
