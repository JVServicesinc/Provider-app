import { call, put, select, takeLatest } from 'redux-saga/effects';
import { getApi, postApi } from '../../utils/helpers/ApiRequest';
import {
  GetSlotsFailure,
  GetSlotsSuccess,
  ProviderServicesFailure,
  ProviderServicesSuccess,
  ServicesAddFailure,
  ServicesAddSuccess,
  ServicetypesFailure,
  ServicetypesSuccess,
  UpdateSlotsFailure,
  UpdateSlotsSuccess,
} from '../reducer/ServiceReducer';
import showErrorAlert from '../../utils/helpers/Toast';
let getItem = state => state.AuthReducer;

//Service types
export function* ServicetypesSaga(action) {
  let items = yield select(getItem);
  let header = {
    Accept: 'application/json',
    contenttype: 'application/json',
    accesstoken: items?.token,
  };
  try {
    let response = yield call(getApi, 'provider/service-types', header);

    if (response?.status == 200) {
      yield put(ServicetypesSuccess(response?.data));
    } else {
      yield put(ServicetypesFailure(response?.data));
    }
  } catch (error) {
    yield put(ServicetypesFailure(error));
  }
}

//Provider Services list
export function* ProviderServicesSaga(action) {
  let items = yield select(getItem);
  let header = {
    Accept: 'application/json',
    contenttype: 'application/json',
    accesstoken: items?.token,
  };
  try {
    let response = yield call(getApi, 'provider/services', header);

    if (response?.status == 200) {
      yield put(ProviderServicesSuccess(response?.data));
    } else {
      yield put(ProviderServicesFailure(response?.data));
    }
  } catch (error) {
    yield put(ProviderServicesFailure(error));
  }
}

//Get Slots
export function* GetSlotsSaga(action) {
  let items = yield select(getItem);
  let header = {
    Accept: 'application/json',
    contenttype: 'application/json',
    accesstoken: items?.token,
  };
  try {
    let response = yield call(getApi, 'provider/slots', header);
    console.log('RESONSE SDOMF',response.data)

    if (response?.status == 200) {
      yield put(GetSlotsSuccess(response?.data));
    } else {
      yield put(GetSlotsFailure(response?.data));
    }
  } catch (error) {
    yield put(GetSlotsFailure(error));
  }
}

//Services Add
export function* ServicesAddSaga(action) {
  let items = yield select(getItem);
  let header = {
    Accept: 'application/json',
    contenttype: 'application/json',
    accesstoken: items?.token,
  };
  try {
    let response = yield call(
      postApi,
      'provider/services/add',
      action.payload,
      header,
    );
    if (response?.status == 200) {
      yield put(ServicesAddSuccess(response?.data));
    } else {
      yield put(ServicesAddFailure(response?.data));
    }
  } catch (error) {
    yield put(ServicesAddFailure(error));
  }
}

export function* UpdateSlotsSaga(action) {
  let items = yield select(getItem);
  let header = {
    Accept: 'application/json',
    contenttype: 'application/json',
    accesstoken: items?.token,
  };
  try {
    let response = yield call(
      postApi,
      'provider/slots',
      action.payload,
      header,
    );
    if (response?.status == 200) {
      yield put(UpdateSlotsSuccess(response?.data));
      showErrorAlert('TimeSlot Updated');
    } else {
      yield put(UpdateSlotsFailure(response?.data));
      showErrorAlert('TimeSlot Update Failer');
    }
  } catch (error) {
    yield put(UpdateSlotsFailure(error));
    showErrorAlert('TimeSlot Update Failer');
  }
}

const watchFunction = [
  (function* () {
    yield takeLatest('Service/ServicetypesRequest', ServicetypesSaga);
  })(),
  (function* () {
    yield takeLatest('Service/ProviderServicesRequest', ProviderServicesSaga);
  })(),
  (function* () {
    yield takeLatest('Service/ServicesAddRequest', ServicesAddSaga);
  })(),
  (function* () {
    yield takeLatest('Service/GetSlotsRequest', GetSlotsSaga);
  })(),
  (function* () {
    yield takeLatest('Service/UpdateSlotsRequest', UpdateSlotsSaga);
  })(),
];
export default watchFunction;
