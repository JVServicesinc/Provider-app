import { call, put, select, takeLatest} from 'redux-saga/effects';
import showErrorAlert from '../../utils/helpers/Toast';
import { FetchBankDetailsFailure, FetchBankDetailsSuccess, saveBankDetailsFailure, saveBankDetailsSuccess } from '../reducer/SettingsReducer';
import { getApi, postApi } from '../../utils/helpers/ApiRequest';
import { goBack, navigate } from '../../utils/RootNavigation';
let getItem = state => state.AuthReducer;

//Fetch BankDetails
export function* FetchBankDetailsSaga(action) {
    let items = yield select(getItem);
    let header = {
        Accept: 'application/json',
        contenttype: 'application/json',
        accesstoken: items?.token,
    };
    try {
        let response = yield call(getApi, 'onboarding/kyc/bank-accounts', header);
        if (response?.status == 200) {
            yield put(FetchBankDetailsSuccess(response?.data));
        } else {
            yield put(FetchBankDetailsFailure(response?.data));
        }
    } catch (error) {
        yield put(FetchBankDetailsFailure(error));
    }
}

//Save BankDetails
export function* SaveBankDetailsSaga(action) {
    console.log('inside FetchBank');
    let items = yield select(getItem);
    let header = {
        Accept: 'application/json',
        contenttype: 'application/json',
        accesstoken: items?.token,
    };
    try {
        let response = yield call(
            postApi,
            'onboarding/kyc/bank-accounts',
            action.payload,
            header,
        );
        console.log('response data', response);
        if (response?.status == 200) {
            yield put(saveBankDetailsSuccess(response?.data));
            showErrorAlert(response?.data?.message);
            goBack()
        } else {
            yield put(saveBankDetailsFailure(response?.data));
        }
    } catch (error) {
        yield put(saveBankDetailsFailure(error));
        showErrorAlert(error?.response?.data?.message);
    }
}
const watchFunction = [
    (function* () {
        yield takeLatest('Settings/FetchBankDetails', FetchBankDetailsSaga);
    })(),
    (function* () {
        yield takeLatest('Settings/saveBankDetails', SaveBankDetailsSaga);
    })(),
];
export default watchFunction;
