import React, { useState } from 'react';
import {
  Image,
  KeyboardAvoidingView,
  Platform,
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  View,
} from 'react-native';

import { Fonts, IMAGES } from '../../themes/Themes';
import normalize from '../../utils/helpers/normalize';
import NewTextInput from '../../components/NewTextInput';
import Button from '../../components/Button';
import connectionrequest from '../../utils/helpers/NetInfo';
import { useDispatch, useSelector } from 'react-redux';
import { sendForgotOtpRequest } from '../../redux/reducer/AuthReducer';
import Loader from '../../utils/helpers/Loader';
let status;

function ForgotPassword(props) {
  const dispatch = useDispatch();
  const AuthReducer = useSelector(state => state.AuthReducer);
  const [email, setEmail] = useState('');
  const [emailerror, setEmailerror] = useState('');
  const [bordercolor3, setbordercolor3] = useState('#C2C6D8');
  const regex =
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  const next = () => {
    if (email == '') {
      setbordercolor3('red');
      setEmailerror('Give your email Id');
    } else {
      connectionrequest()
        .then(() => {
          dispatch(
            sendForgotOtpRequest({
              email: email,
            }),
          );
        })
        .catch(err => {
          showErrorAlert('Please connect to internet');
        });
    }
  };
  const handleEmailIdNumber = newText3 => {
    setEmail(newText3);
    if (newText3 === '') {
      setbordercolor3('red');
      setEmailerror('Give your email Id');
    } else if (!regex.test(newText3)) {
      setbordercolor3('red');
      setEmailerror('Email is invalid');
    } else {
      setbordercolor3('#C2C6D8');
      setEmailerror('');
    }
  };

  if (status == '' || AuthReducer.status != status) {
    switch (AuthReducer.status) {
      case 'Auth/sendForgotOtpRequest':
        status = AuthReducer.status;
        break;
      case 'Auth/sendForgotOtpSuccess':
        status = AuthReducer.status;
        props.navigation.navigate('OTPverification', { email: email });
        break;
      case 'Auth/sendForgotOtpFailure':
        status = AuthReducer.status;

        break;
    }
  }
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: 'white' }}>
      <Loader visible={AuthReducer.status == 'Auth/sendForgotOtpRequest'} />
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : null}
        style={{ flex: 1 }}>
        <StatusBar
          backgroundColor={'white'}
          translucent={true}
          barStyle={'dark-content'}
        />
        <ScrollView
          contentContainerStyle={{ flexGrow: 1 }}
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}
          style={{ flex: 1 }}>
          <View style={style.viewStyle}>
            <Image
              source={IMAGES.forgotImage} // Replace with your image source
              style={style.forgotImage}
            />
          </View>
          <View>
            <Text style={style.text1}>Forgot Password?</Text>
            <Text style={style.text2}>
              Don’t worry ! It happens. Please enter the email we will send the
              OTP in this email.
            </Text>

            <NewTextInput
              width={'85%'}
              textwidth={'100%'}
              borderRadius={normalize(5)}
              value={email}
              onChange={handleEmailIdNumber}
              marginTop={normalize(15)}
              textInputHight={normalize(40)}
              name={'Enter your email'}
              placeholderTextColor={'#79747E'}
              borderColor={bordercolor3}
              borderWidth={normalize(1)}
              fontFamily={Fonts.PoppinsRegular}
              textmarleft={normalize(5)}
            />

            {emailerror !== '' ? (
              <View style={{ alignItems: 'center', justifyContent: 'center' }}>
                <Text style={style.emailerror}>{emailerror}</Text>
              </View>
            ) : null}

            <Button
              alignSelf={'center'}
              marginTop={normalize(40)}
              backgroundColor={'black'}
              height={normalize(45)}
              width={'85%'}
              borderRadius={normalize(5)}
              textColor={'white'}
              fontSize={normalize(15)}
              title={'Continue'}
              titlesingle={true}
              fontFamily={
                Platform.OS == 'ios'
                  ? Fonts.PoppinsSemiBold
                  : Fonts.PoppinsSemiBold
              }
              onPress={() => {
                next();
              }}
            />
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

export default ForgotPassword;
const style = StyleSheet.create({
  emailerror: {
    color: '#EA3356',
    fontSize: normalize(12),
    textAlign: 'center',
    fontFamily: Fonts.PoppinsMedium,
    width: normalize(205),
    marginTop: normalize(10),
  },
  viewStyle: {
    backgroundColor: 'white',
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: normalize(50),
  },
  text2: {
    fontFamily: Fonts.PoppinsRegular,
    fontSize: normalize(11),
    color: '#5B5858',
    marginLeft: normalize(20),
    marginVertical: normalize(15),
  },
  text1: {
    color: 'black',
    fontFamily: Fonts.PoppinsSemiBold,
    fontSize: normalize(22),
    marginLeft: normalize(20),
    marginTop: normalize(20),
  },
  forgotImage: {
    width: normalize(200),
    height: normalize(200),
    resizeMode: 'contain',
  },
});
