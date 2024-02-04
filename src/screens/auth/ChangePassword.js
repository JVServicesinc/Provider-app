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
import React, {useState} from 'react';
import {Fonts, IMAGES} from '../../themes/Themes';
import normalize from '../../utils/helpers/normalize';
import NewTextInput from '../../components/NewTextInput';
import Button from '../../components/Button';
import {useDispatch, useSelector} from 'react-redux';
import connectionrequest from '../../utils/helpers/NetInfo';
import {ChangePasswordRequest} from '../../redux/reducer/AuthReducer';
import showErrorAlert from '../../utils/helpers/Toast';
import { t } from "i18next";
let status;

const ChangePassword = props => {
  const dispatch = useDispatch();
  const AuthReducer = useSelector(state => state.AuthReducer);
  const [password, setpassword] = useState('');
  const [confimpassword, setConfirmpassword] = useState('');
  const [correctpass, setcorrectpass] = useState(false);
  const [correctcpassword, setcorrectcpassword] = useState(false);
  const [emptyString, setemptyString] = useState(false);
  const [regexmatch, setregexmatch] = useState(false);

  const next = () => {
    if (password.trim == '') {
      setemptyString(true);
    } else if (password.length < 8) {
      setregexmatch(true);
    } else if (confimpassword !== password) {
      showErrorAlert(t("passwordAndConfirmPasswordNotMatched"));
      setregexmatch(false);
      setemptyString(false);
    } else {
      connectionrequest()
        .then(() => {
          dispatch(
            ChangePasswordRequest({
              email: props.route.params?.email,
              password: password,
            }),
          );
        })
        .catch(err => {
          showErrorAlert('Please connect to internet');
        });
    }
  };
  const handleTextChange = newText => {
    setpassword(newText);

    if (newText !== '') {
      setemptyString(false);
    }
  };

  if (status == '' || AuthReducer.status != status) {
    switch (AuthReducer.status) {
      case 'Auth/ChangePasswordRequest':
        status = AuthReducer.status;
        break;
      case 'Auth/ChangePasswordSuccess':
        status = AuthReducer.status;
        props.navigation.navigate('Login');
        break;
      case 'Auth/ChangePasswordFailure':
        status = AuthReducer.status;

        break;
    }
  }
  return (
    <SafeAreaView style={{flex: 1, backgroundColor: 'white'}}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : null}
        style={{flex: 1}}>
        <StatusBar
          backgroundColor={'white'}
          translucent={true}
          barStyle={'dark-content'}
        />
        <ScrollView
          contentContainerStyle={{flexGrow: 1}}
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}
          style={{flex: 1}}>
          <View style={style.logoView}>
            <Image source={IMAGES.logo} style={style.logoStyle} />
          </View>
          <View>
            <Text
              style={{
                color: 'black',
                fontFamily: Fonts.PoppinsSemiBold,
                fontSize: normalize(22),
                marginLeft: normalize(25),
                marginTop: normalize(20),
              }}>
              {t("changePassword")}
            </Text>
            <Text style={style.welcome}>{t("pleaseChangeYourPassword")}</Text>
            <Text style={style.email}>{t("newPasswordBold")}</Text>
            <NewTextInput
              width={'85%'}
              textwidth={'100%'}
              borderRadius={normalize(5)}
              value={password}
              onChange={handleTextChange}
              marginTop={normalize(2)}
              name={t("enterNewPassword")}
              keyboardType={'email-address'}
              placeholderTextColor={'#79747E'}
              textmarleft={normalize(12)}
              textInputHight={normalize(40)}
              borderColor={
                emptyString
                  ? 'red'
                  : regexmatch
                  ? 'red'
                  : correctpass
                  ? 'red'
                  : '#253274'
              }
              borderWidth={normalize(1)}
              fontFamily={Fonts.PoppinsMedium}
            />
            {emptyString ? (
              <View
                style={{
                  flexDirection: 'row',
                  marginLeft: normalize(30),
                  marginTop: normalize(5),
                  alignItems: 'center',
                }}>
                <Image
                  source={IMAGES.incorrect}
                  style={{height: normalize(15), width: normalize(15)}}
                />

                <Text
                  style={{
                    color: '#CD4545',
                    fontSize: normalize(12),
                    fontFamily: Fonts.PoppinsRegular,
                    marginLeft: normalize(2),
                  }}>
                  Please enter your password
                </Text>
              </View>
            ) : regexmatch ? (
              <View
                style={{
                  flexDirection: 'row',
                  marginLeft: normalize(30),
                  marginTop: normalize(5),
                  alignItems: 'center',
                }}>
                <Image
                  source={IMAGES.incorrect}
                  style={{height: normalize(15), width: normalize(15)}}
                />

                <Text style={style.Invalidemail}>
                  Password should be grater than 8 charactor
                </Text>
              </View>
            ) : null}

            <Text style={[style.email, {marginTop: normalize(10)}]}>
              CONFIRM PASSWORD
            </Text>
            <NewTextInput
              width={'85%'}
              borderColor={correctcpassword ? 'red' : '#253274'}
              borderWidth={normalize(1)}
              borderRadius={normalize(5)}
              value={confimpassword}
              imagemarleft={normalize(10)}
              onChange={txt => setConfirmpassword(txt)}
              isSecure={true}
              //   addisSucureBtn={true}
              textInputHight={normalize(40)}
              marginTop={normalize(2)}
              name={'Enter coonfirm password'}
              textmarleft={normalize(10)}
              fontFamily={Fonts.PoppinsMedium}
              textwidth={normalize(200)}
              placeholderTextColor={'#79747E'}
            />
            {correctcpassword ? (
              <View style={style.InView}>
                <Image
                  source={IMAGES.incorrect}
                  style={{height: normalize(15), width: normalize(15)}}
                />

                <Text style={style.passwordIncorrect}>
                  Password is incorrect
                </Text>
              </View>
            ) : null}

            <Button
              alignSelf={'center'}
              marginTop={normalize(20)}
              marginBottom={normalize(20)}
              backgroundColor={'black'}
              height={normalize(45)}
              width={'80%'}
              borderRadius={normalize(5)}
              textColor={'white'}
              fontSize={normalize(15)}
              title={'Change'}
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
};

export default ChangePassword;

const style = StyleSheet.create({
  email: {
    fontFamily: Fonts.PoppinsRegular,
    fontSize: normalize(11),
    color: '#7C84AC',
    marginLeft: normalize(25),
    marginTop: normalize(35),
  },
  Invalidemail: {
    color: '#CD4545',
    fontSize: normalize(12),
    fontFamily: Fonts.PoppinsRegular,
    marginLeft: normalize(2),
  },
  logoView: {
    backgroundColor: 'white',
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: normalize(50),
  },
  welcome: {
    fontFamily: Fonts.PoppinsRegular,
    fontSize: normalize(11),
    color: '#7C84AC',
    marginLeft: normalize(25),
    marginTop: normalize(5),
  },
  forgotText: {
    fontFamily: Fonts.PoppinsRegular,
    fontSize: normalize(13),
    color: '#253274',
    marginLeft: normalize(25),
    marginTop: normalize(10),
    textAlign: 'right',
    marginRight: normalize(32),
  },
  passwordIncorrect: {
    color: '#CD4545',
    fontSize: normalize(12),
    fontFamily: Fonts.PoppinsRegular,
    marginLeft: normalize(2),
  },
  logoStyle: {
    width: normalize(150),
    height: normalize(150),
    resizeMode: 'contain',
  },
  createAcc: {
    fontFamily: Fonts.PoppinsRegular,
    fontSize: normalize(11),
    color: '#7C84AC',
    marginLeft: normalize(25),
    marginTop: normalize(20),
    textAlign: 'center',
  },
  SignUp: {
    fontFamily: Fonts.PoppinsRegular,
    fontSize: normalize(11),
    color: '#000000',
    marginTop: normalize(20),
    textDecorationLine: 'underline',
  },
  InView: {
    flexDirection: 'row',
    marginLeft: normalize(30),
    marginTop: normalize(5),
    alignItems: 'center',
  },
  PasswordText: {
    fontFamily: Fonts.PoppinsRegular,
    fontSize: normalize(11),
    color: '#7C84AC',
    marginLeft: normalize(25),
    marginTop: normalize(10),
  },
});
