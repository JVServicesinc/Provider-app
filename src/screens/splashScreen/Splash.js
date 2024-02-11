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
import {setLanguage} from '../../redux/reducer/LanguageReducer';
import {setUserToken} from '../../redux/reducer/AuthReducer';

export default function Splash(props) {
  const dispatch = useDispatch();
  // useEffect(() => {
  //   setTimeout(() => {
  //     dispatch(getTokenRequest());
  //   }, 2000);
  // }, []);

  function getInfo() {
    getData(constants.ONBOARDED, res => {
      if (res !== '') {
        dispatch(setOnBoard('1'));
        getData(constants.LANGUAGE, res1 => {
          if (res1 !== '') {
            dispatch(setLanguage(true));
          } else {
            getData(constants.TOKEN, value => {
              dispatch(setUserToken(value));
              //   dispatch(setStart('1'));
              //   dispatch(
              //     setLanguage(
              //       value === '' || value === null || value === undefined
              //         ? null
              //         : null,
              //     ),
              //   );
            });
          }
        });
      } else {
        dispatch(setOnBoard(null));
      }
    });
  }

  useEffect(() => {
    getData(constants.LANGUAGE, value => {
      value !== '' && i18n.changeLanguage(value);
    });
    const timeout = setTimeout(() => {
      clearTimeout(timeout);
      getInfo();
    }, 1500);
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
