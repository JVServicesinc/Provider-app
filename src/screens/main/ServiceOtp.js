import React, {useRef, useState} from 'react';
import {
  KeyboardAvoidingView,
  Platform,
  SafeAreaView,
  StyleSheet,
  Text,
  TextInput,
} from 'react-native';
import Header from '../../components/Header';
import {Fonts, IMAGES} from '../../themes/Themes';
import normalize from '../../utils/helpers/normalize';
import {ScrollView} from 'react-native';
import {View} from 'react-native';
import Button from '../../components/Button';
import showErrorAlert from '../../utils/helpers/Toast';

function ServiceOtp(props) {
  const [otp, setOtp] = useState('');

  const [blureffect, setBlureffect] = useState(false);
  const [blureffect1, setBlureffect1] = useState(false);
  const [blureffect2, setBlureffect2] = useState(false);
  const [blureffect3, setBlureffect3] = useState(false);
  const inputRef1 = useRef(null);
  const inputRef2 = useRef(null);
  const inputRef3 = useRef(null);
  const inputRef4 = useRef(null);
  const [pin1, setPin1] = useState('');
  const [pin2, setPin2] = useState('');
  const [pin3, setPin3] = useState('');
  const [pin4, setPin4] = useState('');
  const [attemptedSubmit, setAttemptedSubmit] = useState(false);

  const next = () => {
    if (pin1 == '' || pin2 == '' || pin3 == '' || pin4 == '') {
      showErrorAlert('Please fill the otp field');
    } else {
      showErrorAlert('Verified');
      props.navigation.navigate('AddServicePicture');
    }
  };
  const validateInputs = () => {
    const isValid = pin1 !== '' && pin2 !== '' && pin3 !== '' && pin4 !== '';
    if (!isValid) {
      setAttemptedSubmit(true);
    } else {
      setAttemptedSubmit(false);
    }
    return isValid;
  };

  return (
    <SafeAreaView style={{flex: 1, backgroundColor: 'white'}}>
      <Header
        back_button
        back_img_source={IMAGES.Goback}
        LeftImagehght={normalize(20)}
        LeftImagewidth={normalize(20)}
        leftImagebackground={'#d3d3d3'}
        ImagePadding={normalize(5)}
        LeftImggborderradius={normalize(10)}
        gobackmarginLeft={normalize(10)}
        backmargintop={Platform.OS == 'android' ? normalize(20) : normalize(20)}
        onPress_back_button={() => {
          props.navigation.goBack();
        }}
      />
      <ScrollView>
        <KeyboardAvoidingView
          style={{flex: 1}}
          behavior={Platform.OS === 'ios' ? 'padding' : null}
          enabled>
          <Text
            style={{
              color: 'black',
              fontSize: normalize(18),
              fontFamily: Fonts.PoppinsMedium,
              textAlign: 'center',
              marginTop: normalize(35),
            }}>
            {props.route.params?.AddService
              ? 'Enter the new OTP'
              : '  Enter OTP to start service'}
          </Text>
          <Text
            style={{
              color: '#757575',
              fontSize: normalize(12),
              fontFamily: Fonts.PoppinsRegular,
              textAlign: 'center',
              //   marginTop:normalize(35)
            }}>
            {props.route.params?.AddService
              ? 'OTP has been updated at customer’s end, as new services are added'
              : ' Provided to customer on their service detail page'}
          </Text>
          <View
            style={{
              paddingTop: normalize(25),
              paddingHorizontal: normalize(20),
              flexDirection: 'row',
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <View style={styles.optWrapper}>
              <View
                // style={[
                //   styles.otpInputWrapper,
                //   {borderColor: pin1.length > 0 ? 'black' : '#79747E'},
                // ]}
                style={[
                  styles.otpInputWrapper,
                  {
                    borderColor:
                      attemptedSubmit && pin1 === '' ? 'red' : 'black',
                  },
                ]}>
                <TextInput
                  ref={inputRef1}
                  value={pin1}
                  keyboardType="numeric"
                  placeholder="-"
                  maxLength={1}
                  onBlur={() => {
                    setBlureffect(false);
                  }}
                  onChangeText={val => {
                    setPin1(val);
                    if (val.length > 0) {
                      inputRef2.current.focus();
                    }
                  }}
                  onFocus={() => setBlureffect(true)}
                  style={styles.otpInput}
                />
              </View>
              <View
                // style={[
                //   styles.otpInputWrapper,
                //   {borderColor: pin2.length > 0 ? 'black' : '#79747E'},
                // ]}
                style={[
                  styles.otpInputWrapper,
                  {
                    borderColor:
                      attemptedSubmit && pin2 === '' ? 'red' : 'black',
                  },
                ]}>
                <TextInput
                  keyboardType="numeric"
                  placeholder="-"
                  maxLength={1}
                  ref={inputRef2}
                  value={pin2}
                  onBlur={() => {
                    setBlureffect1(false);
                  }}
                  onFocus={() => setBlureffect1(true)}
                  onKeyPress={({nativeEvent}) => {
                    if (nativeEvent.key === 'Backspace') {
                      inputRef1.current.focus();
                    }
                  }}
                  onChangeText={val => {
                    setPin2(val);
                    if (val.length > 0) {
                      inputRef3.current.focus();
                    } else {
                      inputRef1.current.focus();
                    }
                  }}
                  style={styles.otpInput}
                />
              </View>
              <View
                // style={[
                //   styles.otpInputWrapper,
                //   {borderColor: pin3.length > 0 ? 'black' : '#79747E'},
                // ]}
                style={[
                  styles.otpInputWrapper,
                  {
                    borderColor:
                      attemptedSubmit && pin3 === '' ? 'red' : 'black',
                  },
                ]}>
                <TextInput
                  keyboardType="numeric"
                  placeholder="-"
                  maxLength={1}
                  ref={inputRef3}
                  value={pin3}
                  onKeyPress={({nativeEvent}) => {
                    if (nativeEvent.key === 'Backspace') {
                      inputRef2.current.focus();
                    }
                  }}
                  onBlur={() => {
                    setBlureffect2(false);
                  }}
                  onFocus={() => setBlureffect2(true)}
                  onChangeText={val => {
                    setPin3(val);
                    if (val.length > 0) {
                      inputRef4.current.focus();
                    } else {
                      inputRef2.current.focus();
                    }
                  }}
                  style={styles.otpInput}
                />
              </View>
              <View
                // style={[
                //   styles.otpInputWrapper,
                //   {borderColor: pin4.length > 0 ? 'black' : '#79747E'},
                // ]}
                style={[
                  styles.otpInputWrapper,
                  {
                    borderColor:
                      attemptedSubmit && pin4 === '' ? 'red' : 'black',
                  },
                ]}>
                <TextInput
                  keyboardType="numeric"
                  placeholder="-"
                  maxLength={1}
                  ref={inputRef4}
                  value={pin4}
                  onKeyPress={({nativeEvent}) => {
                    if (nativeEvent.key === 'Backspace') {
                      inputRef3.current.focus();
                    }
                  }}
                  onBlur={() => {
                    setBlureffect3(false);
                  }}
                  onFocus={() => setBlureffect3(true)}
                  onChangeText={val => {
                    setPin4(val);
                    if (val.length > 0) {
                      inputRef4.current.focus();
                    } else {
                      inputRef3.current.focus();
                    }
                  }}
                  style={[styles.otpInput]}
                />
              </View>
            </View>
          </View>
        </KeyboardAvoidingView>
      </ScrollView>
      <Button
        width={'95%'}
        backgroundColor={
          pin1 == '' || pin2 == '' || pin3 == '' || pin4 == ''
            ? 'grey'
            : 'black'
        }
        alignSelf={'center'}
        borderRadius={normalize(10)}
        titlesingle={true}
        title={'Continue'}
        textColor={'white'}
        fontFamily={Fonts.PoppinsMedium}
        marginBottom={normalize(20)}
        fontSize={normalize(12)}
        // onPress={()=>{
        //   next()

        // }}
        onPress={() => {
          setAttemptedSubmit(true);
          if (validateInputs()) {
            // showErrorAlert('Verified');
            setPin1('')
            setPin2('')
            setPin3('')
            setPin4('')
            props.route.params?.AddService
              ? props.navigation.navigate('StartService')
              : props.navigation.navigate('AddServicePicture');
          }
        }}
      />
    </SafeAreaView>
  );
}

export default ServiceOtp;
const styles = StyleSheet.create({
  otpInputWrapper: {
    height: normalize(50),
    width: '19%',
    //   backgroundColor: 'white',
    borderRadius: normalize(10),
    borderColor: '#79747E',
    borderWidth: normalize(1),
  },
  optWrapper: {
    flexDirection: 'row',
    marginTop: normalize(50),
    marginBottom: normalize(20),
    justifyContent: 'space-between',
    width: '100%',
  },
  otpInput: {
    height: normalize(55),
    width: '100%',
    borderRadius: normalize(8),
    fontSize: normalize(22),
    color: 'blue',
    textAlign: 'center',
    fontFamily: Fonts.PoppinsMedium,
  },
});
