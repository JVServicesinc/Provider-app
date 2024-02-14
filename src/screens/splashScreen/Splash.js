import React, {Fragment, useEffect} from 'react';
import {
  View,
  ImageBackground,
  Image,
  StyleSheet,
  StatusBar,
} from 'react-native';
import {IMAGES} from '../../themes/Themes';
import {useDispatch} from 'react-redux';
import {getTokenRequest} from '../../redux/reducer/AuthReducer';
import {getData} from '../../redux/LocalStore';
import constants from '../../utils/helpers/constants';
import {setOnBoard} from '../../redux/reducer/SplashReducer';
import '../../utils/helpers/i18n.config';
import {useTranslation} from 'react-i18next';
import {setLanguage} from '../../redux/reducer/LanguageReducer';
import {setUserToken} from '../../redux/reducer/AuthReducer';

export default function Splash(props) {
  const dispatch = useDispatch();
  const {i18n} = useTranslation();
  // useEffect(() => {
  //   setTimeout(() => {
  //     dispatch(getTokenRequest());
  //   }, 2000);
  // }, []);

  function getInfo() {
    getData(constants.ONBOARDED, res => {
      if (res !== '') {
        // dispatch(setOnBoard('1'));
        getData(constants.LANGUAGE, res1 => {
          if (res1 !== '') {
            getData(constants.TOKEN, value => {
              if (value !== '') {
                dispatch(setOnBoard('1'));
                dispatch(setLanguage(true));
                dispatch(setUserToken(value));
              } else {
                dispatch(setOnBoard('1'));
                dispatch(setLanguage(true));
                dispatch(setUserToken(null));
              }
            });
          } else {
            dispatch(setOnBoard('1'));
            dispatch(setLanguage(false));
          }
        });
      } else {
        dispatch(setOnBoard(null));
      }
    });
  }

  useEffect(() => {
    getData(constants.LANGUAGE, value => {
      console.log('UseEffect--->', value);
      value !== '' && i18n.changeLanguage(value);
    });
    const timeout = setTimeout(() => {
      clearTimeout(timeout);
      getInfo();
    }, 500);
  }, []);

  return (
    <View
      style={{
        backgroundColor: 'red',
        flex: 1,
      }}>
      <StatusBar
        barStyle="light-content"
        hidden={false}
        backgroundColor={'transparent'}
        translucent={true}
      />
      <ImageBackground
        resizeMode="cover"
        style={{
          backgroundColor: 'black',
          height: '105%',
          width: '100%',
        }}
        source={IMAGES.splashScreen}
      />
    </View>
  );
}
