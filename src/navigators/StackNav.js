import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import React, {useEffect, useState} from 'react';
import Splash from '../screens/splashScreen/Splash';
import Login from '../screens/auth/Login';
import SignUp from '../screens/auth/SignUp';

import SignUp3 from '../screens/auth/SignUp3';
import PanDetail from '../screens/auth/PanDetail';

import SinNumber from '../screens/auth/SinNumber';
import ForgotPassword from '../screens/auth/ForgotPassword';
import OTPverification from '../screens/auth/OTPverification';
import TabNavigator from './TabNavigator';
import BookingDetails from '../screens/main/BookingDetails';
import Filter from '../screens/main/Filter';
import Notification from '../screens/main/Notification';
import Subscription from '../screens/main/Subscription';
import EditProfile from '../screens/main/EditProfile';
import BankDetails from '../screens/main/BankDetails';
import Refer_Earn from '../screens/main/Refer_Earn';
import OfflineReason from '../screens/main/OfflineReason';
import DelayBooking from '../screens/main/DelayBooking';
import WithoutMask from '../screens/main/WithoutMask';
import AddPicture from '../screens/main/AddPicture';
import WinnerAnimation from '../screens/main/WinnerAnimation';
import ChatScreen from '../screens/main/ChatScreen';
import AlertNotify from '../screens/main/AlertNotify';
import ServiceOtp from '../screens/main/ServiceOtp';
import AddServicePicture from '../screens/main/AddServicePicture';
import StartService from '../screens/main/StartService';
import MapViewPage from '../screens/main/MapViewPage';
import Depositmoney from '../screens/main/Depositmoney';
import Verification from '../screens/auth/Verification';
import {useSelector} from 'react-redux';
import SignUp2 from '../screens/auth/SignUp2';
import {navigationRef} from '../utils/RootNavigation';
import ChangePassword from '../screens/auth/ChangePassword';
import RateCard from '../screens/main/RateCard';
import Language from '../screens/main/Language';
import Slots from '../screens/main/Slots';
import {LanguageSplash} from '../screens/splashScreen/LanguageSplash';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {MapScreen} from '../screens/main/map';
import OnBoarding from '../screens/auth/Onboarding';

const Stack = createStackNavigator();

export default function StackNav() {
  const AuthReducer = useSelector(state => state.AuthReducer);
  const LanguageReducer = useSelector(state => state.LanguageReducer);
  // const [language, setLanguage] = useState(null);

  // useEffect(() => {
  //   console.log('sdvsvd',AuthReducer)
  //   AsyncStorage.getItem('language').then(res => {
  //     console.log(res);
  //     if (res != null) {
  //       setLanguage(res);
  //     } else {
  //       setLanguage(null);
  //     }
  //   });
  // }, []);

  const Screens =
    AuthReducer?.token == null
      ? {
          Onboarding:OnBoarding,
          Login: Login,
          SignUp: SignUp,
          Verification: Verification,
          ForgotPassword: ForgotPassword,
          OTPverification: OTPverification,
          SignUp2: SignUp2,
          SignUp3: SignUp3,
          PanDetail: PanDetail,
          SinNumber: SinNumber,
          ChangePassword: ChangePassword,
        }
      : {
          TabNavigator: TabNavigator,
          BookingDetails: BookingDetails,
          Filter: Filter,
          Notification: Notification,
          Subscription: Subscription,
          EditProfile: EditProfile,
          BankDetails: BankDetails,
          Refer_Earn: Refer_Earn,
          OfflineReason: OfflineReason,
          DelayBooking: DelayBooking,
          WithoutMask: WithoutMask,
          AddPicture: AddPicture,
          WinnerAnimation: WinnerAnimation,
          ChatScreen: ChatScreen,
          AlertNotify: AlertNotify,
          ServiceOtp: ServiceOtp,
          AddServicePicture: AddServicePicture,
          StartService: StartService,
          MapViewPage: MapViewPage,
          Depositmoney: Depositmoney,
          RateCard: RateCard,
          Language: Language,
          Slots: Slots,
          MapScreen: MapScreen,
        };
  if (AuthReducer?.isLoading) {
    // return <Splash />;
    // return <LanguageSplash />;
    // return <LanguageSplash />;
    console.log('languae',LanguageReducer.isLanguageSelected)
    if (LanguageReducer.isLanguageSelected == null) {
      return <LanguageSplash />;
    } else {
      // pibkc the language async - i18n change language()
      return <Login />;
    }
  } else {
    return (
      <NavigationContainer ref={navigationRef}>
        <Stack.Navigator screenOptions={{headerShown: false}}>
          {Object.entries({
            ...Screens,
          }).map(([name, component]) => {
            return <Stack.Screen key={name} name={name}  component={component} />;
          })}
        </Stack.Navigator>
      </NavigationContainer>
    );
  }
}
