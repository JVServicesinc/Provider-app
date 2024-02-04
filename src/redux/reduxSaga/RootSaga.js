import { all } from 'redux-saga/effects';
import AuthSaga from './AuthSaga';
import ProfileSaga from './ProfileSaga';
import ServiceSaga from './ServiceSaga';
import SettingsSaga from './SettingsSaga';
import BookingSaga from './BookingSaga';

const combinedSaga = [
  ...AuthSaga,
  ...ProfileSaga,
  ...ServiceSaga,
  ...SettingsSaga,
  ...BookingSaga,

];

export default function* RootSaga() {
  yield all(combinedSaga);
}
