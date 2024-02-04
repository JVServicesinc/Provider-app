import {
  View,
  Text,
  StatusBar,
  Keyboard,
  TouchableOpacity,
  StyleSheet,
  Platform,
  SafeAreaView,
  Alert,
  TextInput
} from 'react-native';
import React, {useEffect, useRef, useState} from 'react';
import OTPInput from '../../components/OTPInput';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {Fonts, IMAGES} from '../../themes/Themes';
import normalize from '../../utils/helpers/normalize';
import auth from '@react-native-firebase/auth';
import showErrorAlert from '../../utils/helpers/Toast';
import connectionrequest from '../../utils/helpers/NetInfo';
import {signinRequest} from '../../redux/reducer/AuthReducer';
import {useDispatch, useSelector} from 'react-redux';
import { t } from "i18next";
let status;
const Verification = (props, {navigation}) => {
  const dispatch = useDispatch();
  const AuthReducer = useSelector(state => state.AuthReducer);
  const [phonepin, setPhonePin] = useState('');
  const [verify, setverify] = useState(false);
  const [loading, setLoading] = useState(false);
  const formattedPhoneNumber = props.route.params?.formattedPhoneNumber;
  const Data = props.route.params?.Data;

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

  async function resendVerificationCode(formattedPhoneNumber) {
    auth()
      .signInWithPhoneNumber(formattedPhoneNumber)

      .then(res => {})
      .catch(error => {
        Alert.alert(t("enteredWrongOtp"));
      });
  }

  async function confirmCode(pin) {
    if (pin == '' || pin.length !== 6) {
      Alert.alert(t("pleaseFillOtpField"));
    } else {
      try {
        setLoading(true);
        const credential = auth.PhoneAuthProvider.credential(
          Data._verificationId,
          pin,
        );
        auth()
          .signInWithCredential(credential)
          .then(res => {
            setverify(true);
            connectionrequest()
              .then(() => {
                dispatch(
                  signinRequest({
                    username: props.route.params?.email,
                    password: props?.route?.params?.password,
                  }),
                );
              })
              .catch(err => {
                setverify(false);
                setLoading(false);
                showErrorAlert(t("connectToInternet"));
              });
          })
          .catch(error => {
            setverify(false);
            setLoading(false);
            Alert.alert(error);
          });
      } catch (error) {
        if (error.code == 'auth/invalid-verification-code') {
          Alert.alert(error);
        } else {
          Alert.alert('Something Went Wrong');
        }
      }
    }
  }

  if (status == '' || AuthReducer.status != status) {
    switch (AuthReducer.status) {
      case 'Auth/signinRequest':
        status = AuthReducer.status;
        break;

      case 'Auth/signinSuccess':
        status = AuthReducer.status;
        setLoading(false);
        break;
      case 'Auth/signinFailure':
        status = AuthReducer.status;
        setLoading(false);

        break;
    }
  }

  return (
    <SafeAreaView style={{flex: 1, backgroundColor: '#fff'}}>
      <StatusBar backgroundColor={'white'} barStyle={'dark-content'} />

      <KeyboardAwareScrollView
        extraScrollHeight={Platform.OS === 'ios' ? 100 : 0}
        enableOnAndroid={true}
        style={{
          flex: 1,
        }}>
        <View style={styles.headerContainer}>
          <Text style={styles.headerTitle}>{t("verification")}</Text>
        </View>

        <View
          style={{
            width: '100%',
            alignSelf: 'center',
            marginTop: normalize(50),
          }}>
          <Text style={styles.confirmText}>{t("confirmation")}</Text>
          <Text
            style={{
              color: '#000',
              fontSize: normalize(13),
              fontFamily: Fonts.PoppinsRegular,
              marginTop: normalize(20),
              textAlign: 'center',
              width: '80%',
              alignSelf: 'center',
            }}>
            {t("pleaseTypeVerificationCode")}{' '}
            {props.route.params?.formattedPhoneNumber}
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

          <TouchableOpacity
            style={styles.confirm}
            onPress={() => {
              let pin = pin1 + pin2 + pin3 + pin4 + pin5 + pin6
              confirmCode(pin);
            }}>
            <Text style={styles.loading}>
              {loading ? t("verifying") : verify ? t("verified") : t("verify")}
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.resend}
            onPress={() => {
              resendVerificationCode(formattedPhoneNumber);
            }}>
            <Text style={styles.resendfText}>{t("resendCode")}</Text>
          </TouchableOpacity>
        </View>
      </KeyboardAwareScrollView>
    </SafeAreaView>
  );
};

export default Verification;

const styles = StyleSheet.create({
  container: {
    height: '100%',
    width: '102%',
    alignSelf: 'center',
    zIndex: 1,
  },
  confirmText: {
    color: '#000',
    fontSize: normalize(16),
    fontFamily: Fonts.PoppinsMedium,
    textTransform: 'uppercase',
    marginLeft: normalize(15),
    textAlign: 'center',
  },
  resendfText: {
    color: '#2B95E9',
    fontSize: normalize(12),
    fontFamily: Fonts.PoppinsRegular,
  },
  resend: {
    alignSelf: 'center',
    marginTop: normalize(10),
    height: normalize(35),
    justifyContent: 'center',
  },
  confirm: {
    marginTop: normalize(20),
    height: normalize(42),
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#000',
    borderRadius: normalize(8),
    width: '70%',
    alignSelf: 'center',
  },
  loading: {
    color: 'white',
    fontSize: normalize(18),
    textTransform: 'uppercase',
    fontFamily: Fonts.PoppinsMedium,
  },
  headerContainer: {
    height: normalize(55),
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: normalize(15),
  },
  backTouch: {
    justifyContent: 'center',
    alignItems: 'center',
    height: '100%',
    width: normalize(50),
    position: 'absolute',
    left: 0,
  },
  backImg: {
    resizeMode: 'contain',
    width: normalize(15),
    height: normalize(15),
    marginTop: Platform.OS == 'ios' ? normalize(0) : normalize(20),
  },
  headerTitle: {
    color: '#000113',
    fontSize: normalize(24),
    fontFamily: Fonts.PoppinsSemiBold,
    marginTop: Platform.OS == 'ios' ? normalize(0) : normalize(20),
    textAlign: 'center',
    marginLeft: normalize(15),
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
