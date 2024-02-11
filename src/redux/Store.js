import {configureStore} from '@reduxjs/toolkit';
import createSagaMiddleware from 'redux-saga';
import {logger} from 'redux-logger';
import AuthReducer from './reducer/AuthReducer';

import RootSaga from './reduxSaga/RootSaga';
import ProfileReducer from './reducer/ProfileReducer';
import ServiceReducer from './reducer/ServiceReducer';
import SettingsReducer from './reducer/SettingsReducer';
import BookingReducer from './reducer/BookingReducer';
import LanguageReducer from './reducer/LanguageReducer';

let SagaMiddleware = createSagaMiddleware();
const middleware = [SagaMiddleware, logger];
export default configureStore({
  reducer: {
    AuthReducer: AuthReducer,
    LanguageReducer:LanguageReducer,
    ProfileReducer: ProfileReducer,
    ServiceReducer: ServiceReducer,
    SettingsReducer: SettingsReducer,
    BookingReducer:BookingReducer
  },
  middleware,
});
SagaMiddleware.run(RootSaga);
