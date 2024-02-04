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

export default function Splash(props) {
  const dispatch = useDispatch();
  useEffect(() => {
    setTimeout(() => {
      // props.navigation.navigate('SignUp');
      // props.navigation.navigate('Login');
      dispatch(getTokenRequest());
    }, 2000);
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
