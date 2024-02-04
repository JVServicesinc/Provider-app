import React, {Component} from 'react';
import messaging from '@react-native-firebase/messaging';
import {navigate} from '../utils/RootNavigation';

export const requestUserPermission = async () => {
  const authStatus = await messaging().requestPermission();
  const enabled =
    authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
    authStatus === messaging.AuthorizationStatus.PROVISIONAL;

  if (enabled) {
  }
};

export const getFcmToken = async () => {
  try {
    const newFcmToken = await messaging().getToken();
    return newFcmToken;
  } catch (error) {
    console.error(error);
    return null;
  }
};

export const notificationListener = () => {
  //   const dispatch = useDispatch();
  messaging().onNotificationOpenedApp(remoteMessage => {
    console.log(
      'Notification caused app to open from background state:',
      remoteMessage.notification,
    );
    navigate('AlertNotify');
  });

  // Quiet and Background State -> Check whether an initial notification is available
  messaging()
    .getInitialNotification()
    .then(remoteMessage => {
      if (remoteMessage) {
        console.log(
          'Notification caused app to open from quit state:',
          remoteMessage.notification,
        );
        setTimeout(() => {
          navigate('AlertNotify',{bookingData: remoteMessage?.data});
        }, 3000);
      }
    })
    .catch(error => console.log('failed', error));

  // Foreground State
  messaging().onMessage(async remoteMessage => {
    console.log('foreground', remoteMessage);
    navigate('AlertNotify',{bookingData: remoteMessage?.data});
  });
};
