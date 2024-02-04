import { call, put, select, takeLatest } from 'redux-saga/effects';
import showErrorAlert from '../../utils/helpers/Toast';
import { getApi, getApiWithParam, postApi } from '../../utils/helpers/ApiRequest';
import { goBack, navigate } from '../../utils/RootNavigation';
import { AcceptBookingRequestFailure, AcceptBookingRequestSuccess, FetchCancelledBookingListRequestFailure, FetchCancelledBookingListRequestSuccess, FetchCompletedBookingListRequestFailure, FetchCompletedBookingListRequestSuccess, FetchEachBookingDetailsFailure, FetchEachBookingDetailsSuccess, FetchUpcomingBookingListRequestSuccess, FetchUpcomngBookingListRequestFailure, RejectBookingRequestFailure, RejectBookingRequestSuccess } from '../reducer/BookingReducer';
let getItem = state => state.AuthReducer;


export function* AccepptBookingRequestSaga(action) {
    let items = yield select(getItem);
    let header = {
        Accept: 'application/json',
        contenttype: 'multipart/form-data',
        accesstoken: items?.token,
    };
    try {
        console.log(action.payload)
        let response = yield call(postApi, 'orders/accept', action.payload, header);
        if (response?.status == 200) {
            yield put(AcceptBookingRequestSuccess(response?.data));
            showErrorAlert("order confirmed successfully");
        } else {
            yield put(AcceptBookingRequestFailure(response?.data));
            showErrorAlert("Something went wrong");
        }
    } catch (error) {
        yield put(AcceptBookingRequestFailure(error));
        showErrorAlert("Something went wrong");
    }
}

export function* RejectBookingRequestSaga(action) {
    let items = yield select(getItem);
    let header = {
        Accept: 'application/json',
        contenttype: 'multipart/form-data',
        accesstoken: items?.token,
    };
    try {
        let response = yield call(
            postApi,
            'orders/reject',
            action.payload,
            header,
        );
        if (response?.status == 200) {
            yield put(RejectBookingRequestSuccess(response?.data));
            showErrorAlert("booking rejected successfully");
        } else {
            yield put(RejectBookingRequestFailure(response?.data));
            showErrorAlert("Something went wrong");
        }
    } catch (error) {
        yield put(RejectBookingRequestFailure(error));
        showErrorAlert("Something went wrong");
    }
}

export function* FetchCompletedBookingListSaga(action) {
    let items = yield select(getItem);
    let header = {
        Accept: 'application/json',
        contenttype: 'application/json',
        accesstoken: items?.token,
    };
    try {
        let response = yield call(
            getApi,
            'provider/bookings?page=1&order_status=completed',
            header,
        );
        if (response?.status == 200) {
            yield put(FetchCompletedBookingListRequestSuccess(response?.data));
        } else {
            yield put(FetchCompletedBookingListRequestFailure(response?.data));
            showErrorAlert("Something went wrong");
        }
    } catch (error) {
        yield put(FetchCompletedBookingListRequestFailure(error));
        showErrorAlert("Something went wrong");
    }
}

export function* FetchCancelledBookingListSaga(action) {
    let items = yield select(getItem);
    let header = {
        Accept: 'application/json',
        contenttype: 'application/json',
        accesstoken: items?.token,
    };
    try {
        let response = yield call(
            getApi,
            'provider/bookings?page=1&order_status=cancelled',
            header,
        );
        if (response?.status == 200) {
            yield put(FetchCancelledBookingListRequestSuccess(response?.data));
        } else {
            yield put(FetchCancelledBookingListRequestFailure(response?.data));
            showErrorAlert("Something went wrong");
        }
    } catch (error) {
        yield put(FetchCancelledBookingListRequestFailure(error));
        showErrorAlert("Something went wrong");
    }
}

export function* FetchUpcomingBookingListSaga(action) {
    let items = yield select(getItem);
    let header = {
        Accept: 'application/json',
        contenttype: 'application/json',
        accesstoken: items?.token,
    };
    try {
        let response = yield call(
            getApi,
            'provider/bookings?page=1&order_status=pending',
            header,
        );
        if (response?.status == 200) {
            yield put(FetchUpcomingBookingListRequestSuccess(response?.data));
        } else {
            yield put(FetchUpcomngBookingListRequestFailure(response?.data));
            showErrorAlert("Something went wrong");
        }
    } catch (error) {
        yield put(FetchUpcomngBookingListRequestFailure(error));
        showErrorAlert("Something went wrong");
    }
}

export function* FetchEachBookingDetailsSaga(action) {
    let items = yield select(getItem);
    let header = {
        Accept: 'application/json',
        contenttype: 'application/json',
        accesstoken: items?.token,
    };
    try {
        let response = yield call(
            getApi,
            `provider/bookings/${action?.payload}`,
            header,
        );
        if (response?.status == 200) {
            yield put(FetchEachBookingDetailsSuccess(response?.data));
        } else {
            yield put(FetchEachBookingDetailsFailure(response?.data));
            showErrorAlert("Something went wrong");
        }
    } catch (error) {
        yield put(FetchEachBookingDetailsFailure(error));
        showErrorAlert("Something went wrong");
    }
}

const watchFunction = [
    (function* () {
        yield takeLatest('ServiceBookings/AcceptBookingRequest', AccepptBookingRequestSaga);
    })(),
    (function* () {
        yield takeLatest('ServiceBookings/RejectBookingRequest', RejectBookingRequestSaga);
    })(),
    (function* () {
        yield takeLatest('ServiceBookings/FetchCompletedBookingList', FetchCompletedBookingListSaga);
    })(),
    (function* () {
        yield takeLatest('ServiceBookings/FetchCancelledBookingList', FetchCancelledBookingListSaga);
    })(),
    (function* () {
        yield takeLatest('ServiceBookings/FetchUpcomingBookingList', FetchUpcomingBookingListSaga);
    })(),
    (function* () {
        yield takeLatest('ServiceBookings/FetchEachBookingDetails', FetchEachBookingDetailsSaga);
    })(),
];
export default watchFunction;
