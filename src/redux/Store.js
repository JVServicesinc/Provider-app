import {configureStore} from '@reduxjs/toolkit';
import createSagaMiddleware from 'redux-saga';
// import {logger} from 'redux-logger';
import AuthReducer from './reducer/AuthReducer';

import RootSaga from './reduxSaga/RootSaga';
import ProfileReducer from './reducer/ProfileReducer';
import ServiceReducer from './reducer/ServiceReducer';
import SettingsReducer from './reducer/SettingsReducer';
import BookingReducer from './reducer/BookingReducer';
import LanguageReducer from './reducer/LanguageReducer';
import SplashReducer from './reducer/SplashReducer';

let SagaMiddleware = createSagaMiddleware();
const middleware = [SagaMiddleware]; //logger
export default configureStore({
  reducer: {
    SplashReducer: SplashReducer,
    LanguageReducer: LanguageReducer,
    AuthReducer: AuthReducer,
    ProfileReducer: ProfileReducer,
    ServiceReducer: ServiceReducer,
    SettingsReducer: SettingsReducer,
    BookingReducer: BookingReducer,
  },
  middleware,
});
SagaMiddleware.run(RootSaga);
