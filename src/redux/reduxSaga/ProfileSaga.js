import { call, put, select, takeLatest } from 'redux-saga/effects';
import {
  ChangeStatusFailure,
  ChangeStatusSuccess,
  ProviderProfileFailure,
  ProviderProfileSuccess,
} from '../reducer/ProfileReducer';
import { getApi, postApi } from '../../utils/helpers/ApiRequest';
let getItem = state => state.AuthReducer;

//ProviderProfile
export function* ProviderProfileSaga(action) {
  let items = yield select(getItem);
  let header = {
    Accept: 'application/json',
    contenttype: 'application/json',
    accesstoken: items?.token,
  };
  try {
    let response = yield call(getApi, 'user/profile', header);
    if (response?.status == 200) {
      yield put(ProviderProfileSuccess(response?.data));
    } else {
      yield put(ProviderProfileFailure(response?.data));
    }
  } catch (error) {
    yield put(ProviderProfileFailure(error));
  }
}

//Change Status
export function* ChangeStatusSaga(action) {
  let items = yield select(getItem);
  let header = {
    Accept: 'application/json',
    contenttype: 'application/json',
    accesstoken: items?.token,
  };
  try {
    let response = yield call(
      postApi,
      'provider/change-status',
      action.payload,
      header,
    );
    if (response?.status == 200) {
      yield put(ChangeStatusSuccess(response?.data));
    } else {
      yield put(ChangeStatusFailure(response?.data));
    }
  } catch (error) {
    yield put(ChangeStatusFailure(error));
  }
}

const watchFunction = [
  (function* () {
    yield takeLatest('Profile/ProviderProfileRequest', ProviderProfileSaga);
  })(),
  (function* () {
    yield takeLatest('Profile/ChangeStatusRequest', ChangeStatusSaga);
  })(),
];
export default watchFunction;
