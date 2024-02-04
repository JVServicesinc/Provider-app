import React, {useEffect, useRef, useState} from 'react';
import Button from '../../components/Button';
import {Fonts, IMAGES} from '../../themes/Themes';
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
  Keyboard,
  TouchableOpacity,
  TextInput,
} from 'react-native';
import normalize from '../../utils/helpers/normalize';
import showErrorAlert from '../../utils/helpers/Toast';
import OTPInput from '../../components/OTPInput';
import connectionrequest from '../../utils/helpers/NetInfo';
import {
  ForgotOtpVerifyRequest,
  sendForgotOtpRequest,
} from '../../redux/reducer/AuthReducer';
import {useDispatch, useSelector} from 'react-redux';
let status;

function OTPverification(props) {
  const dispatch = useDispatch();
  const AuthReducer = useSelector(state => state.AuthReducer);
  const [phonepin, setPhonePin] = useState('');
  const [counter, setCounter] = useState(60);

  const inputRef1 = useRef(null);
  const inputRef2 = useRef(null);
  const inputRef3 = useRef(null);
  const inputRef4 = useRef(null);
  const inputRef5 = useRef(null);
  const inputRef6 = useRef(null);

  const [pin1, setPin1] = useState('');
  const [pin2, setPin2] = useState('');
  const [pin3, setPin3] = useState('');
  const [pin4, setPin4] = useState('');
  const [pin5, setPin5] = useState('');
  const [pin6, setPin6] = useState('');

  const next = (pin) => {
    if (pin == '' || pin.length !== 6) {
      showErrorAlert('Please fill the otp field');
    } else {
      connectionrequest()
        .then(() => {
          dispatch(
            ForgotOtpVerifyRequest({
              email: props.route.params?.email,
              otp: pin,
            }),
          );
        })
        .catch(err => {
          showErrorAlert('Please connect to internet');
        });
    }
  };

  const ResendOtp = () => {
    connectionrequest()
      .then(() => {
        dispatch(
          sendForgotOtpRequest({
            email: props.route.params?.email,
          }),
        );
      })
      .catch(err => {
        showErrorAlert('Please connect to internet');
      });
  };

  useEffect(() => {
    const timer =
      counter > 0 && setInterval(() => setCounter(counter - 1), 1000);
    return () => {
      clearInterval(timer);
    };
  }, [counter]);

  if (status == '' || AuthReducer.status != status) {
    switch (AuthReducer.status) {
      case 'Auth/ForgotOtpVerifyRequest':
        status = AuthReducer.status;
        break;
      case 'Auth/ForgotOtpVerifySuccess':
        status = AuthReducer.status;
        props.navigation.navigate('ChangePassword', {
          email: props.route.params?.email,
        });

        break;
      case 'Auth/ForgotOtpVerifyFailure':
        status = AuthReducer.status;

        break;
    }
  }

  return (
    <SafeAreaView style={{flex: 1, backgroundColor: 'white'}}>
      <KeyboardAvoidingView
        extraScrollHeight={Platform.OS === 'ios' ? 100 : 0}
        enableOnAndroid={true}
        // behavior={Platform.OS === 'ios' ? 'padding' : null}
        style={{flex: 1}}>
        <StatusBar
          backgroundColor={'white'}
          translucent={true}
          barStyle={'dark-content'}
        />
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{flexGrow: 1}}
          keyboardShouldPersistTaps="handled"
          style={{flex: 1}}>
          <View
            style={{
              backgroundColor: 'white',
              width: '100%',
              alignItems: 'center',
              justifyContent: 'center',
              marginTop: normalize(50),
            }}>
            <Image
              source={IMAGES.otpImage} // Replace with your image source
              style={{
                width: normalize(200),
                height: normalize(200),
                resizeMode: 'contain',
              }}
            />
          </View>
          <View>
            <Text
              style={{
                color: 'black',
                textAlign: 'center',
                fontFamily: Fonts.PoppinsSemiBold,
                fontSize: normalize(22),
                marginLeft: normalize(20),
                marginTop: normalize(45),
              }}>
              OTP VERIFICATION
            </Text>
            <Text
              style={{
                fontFamily: Fonts.PoppinsRegular,
                fontSize: normalize(11),
                color: '#5B5858',
                marginLeft: normalize(20),
                marginTop: normalize(10),
                textAlign: 'center',
              }}>
              Enter the OTP sent to{' '}
            </Text>
            <Text
              style={{
                fontFamily: Fonts.PoppinsSemiBold,
                fontSize: normalize(11),
                color: '#253274',
                marginLeft: normalize(20),
                textAlign: 'center',
              }}>
              {'props.route.params?.email'}
            </Text>

            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                alignSelf: 'center',
                shadowColor: 'rgba(195, 195, 195, 0.9)',
                shadowOffset: {
                  width: 0,
                  height: 2,
                },
                shadowOpacity: 0.25,
                shadowRadius: 3.84,
                elevation: 5,
                marginTop: normalize(30),
              }}>
              <TextInput
                style={[styles.otpContainer]}
                ref={inputRef1}
                value={pin1}
                keyboardType="numeric"
                maxLength={1}
                onChangeText={val => {
                  setPin1(val);
                  if (!pin1.length >= 1) {
                    inputRef2.current.focus();
                  }
                }}
              />
              <TextInput
                style={[styles.otpContainer]}
                ref={inputRef2}
                value={pin2}
                keyboardType="numeric"
                maxLength={1}
                onChangeText={val => {
                  setPin2(val);
                  if (!pin2.length >= 1) {
                    inputRef3.current.focus();
                  } else if (!pin2.length < 1) {
                    inputRef1.current.focus();
                  }
                }}
              />
              <TextInput
                style={[styles.otpContainer]}
                ref={inputRef3}
                value={pin3}
                keyboardType="numeric"
                maxLength={1}
                onChangeText={val => {
                  setPin3(val);
                  if (!pin3.length >= 1) {
                    inputRef4.current.focus();
                  } else if (!pin3.length < 1) {
                    inputRef2.current.focus();
                  }
                }}
              />
              <TextInput
                style={[styles.otpContainer]}
                ref={inputRef4}
                value={pin4}
                keyboardType="numeric"
                maxLength={1}
                onChangeText={val => {
                  setPin4(val);
                  if (!pin4.length >= 1) {
                    inputRef5.current.focus();
                  } else if (!pin4.length < 1) {
                    inputRef3.current.focus();
                  }
                }}
              />

              <TextInput
                style={[styles.otpContainer]}
                ref={inputRef5}
                value={pin5}
                keyboardType="numeric"
                maxLength={1}
                onChangeText={val => {
                  setPin5(val);
                  if (!pin5.length >= 1) {
                    inputRef6.current.focus();
                  } else if (!pin5.length < 1) {
                    inputRef4.current.focus();
                  }
                }}
              />

              <TextInput
                style={[styles.otpContainer]}
                ref={inputRef6}
                value={pin6}
                keyboardType="numeric"
                maxLength={1}
                onChangeText={val => {
                  setPin6(val);
                  if (!pin6.length >= 1) {
                    inputRef6.current.focus();
                  } else if (!pin6.length < 1) {
                    inputRef5.current.focus();
                  }
                }}
              />
            </View>

            <Text
              style={{
                color: '#464646',
                fontSize: normalize(14),
                fontFamily: Fonts.PoppinsMedium,
                textAlign: 'center',
                marginTop: normalize(25),
              }}>
              {counter} Sec
            </Text>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                alignSelf: 'center',
              }}>
              <Text
                style={{
                  color: '#5A5A5A',
                  fontFamily: Fonts.PoppinsRegular,
                  fontSize: normalize(12),
                  textAlign: 'center',
                  marginVertical: normalize(30),
                }}>
                Don’t receive code ?
              </Text>
              <TouchableOpacity onPress={() => ResendOtp()}>
                <Text
                  style={{
                    color: '#383737',
                    fontFamily: Fonts.PoppinsSemiBold,
                    fontSize: normalize(12),
                  }}>
                  {' Re-send'}
                </Text>
              </TouchableOpacity>
            </View>

            <Button
              alignSelf={'center'}
              marginTop={normalize(10)}
              marginBottom={normalize(10)}
              backgroundColor={'black'}
              height={normalize(45)}
              width={'85%'}
              borderRadius={normalize(5)}
              textColor={'white'}
              fontSize={normalize(15)}
              title={'Submit'}
              titlesingle={true}
              fontFamily={
                Platform.OS == 'ios'
                  ? Fonts.PoppinsSemiBold
                  : Fonts.PoppinsSemiBold
              }
              onPress={() => {
                let pin = pin1 + pin2 + pin3 + pin4 + pin5 + pin6
                next(pin);
              }}
            />
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

export default OTPverification;
// borderRadius: normalize(10),
const styles = StyleSheet.create({
  otpview: {
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    marginTop: normalize(35),
  },
  textinputStyle: {
    width: normalize(40),
    fontSize: normalize(24),
    borderColor: '#26292B',
    borderRadius: normalize(10),
    height: normalize(40),
    color: 'black',
    backgroundColor: 'rgba(0, 0, 0, 0.12)', // Set the background color for the shadow
    shadowColor: 'rgba(0, 0, 0, 0.12)', // Set the shadow color
    shadowOffset: {width: 0, height: 2}, // Set the shadow offset (adjust as needed)
    shadowOpacity: 0.5, // Set the shadow opacity (adjust as needed)
    shadowRadius: 4, // Set the shadow radius (adjust as needed)
    elevation: 5,
  },
  otpContainer: {
    borderRadius: normalize(4),
    height: normalize(55),
    width: normalize(45),
    borderWidth: 1,
    borderColor: '#000',
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: normalize(2.5),
    textAlign: 'center',
    fontSize: normalize(20),
    fontFamily: Fonts.PoppinsSemiBold,
    color: 'black'
  },
});
