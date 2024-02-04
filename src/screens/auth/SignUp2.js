import React, {useEffect, useState} from 'react';
import {
  Image,
  KeyboardAvoidingView,
  Platform,
  SafeAreaView,
  ScrollView,
  StyleSheet,
} from 'react-native';
import {Fonts, IMAGES} from '../../themes/Themes';
import normalize from '../../utils/helpers/normalize';
import NewTextInput from '../../components/NewTextInput';
import Button from '../../components/Button';
import showErrorAlert from '../../utils/helpers/Toast';
import Header from '../../components/Header';
import connectionrequest from '../../utils/helpers/NetInfo';
import {
  GetSaveBankAccountRequest,
  SaveBankAccountRequest,
} from '../../redux/reducer/AuthReducer';
import {useDispatch, useSelector} from 'react-redux';
import Loader from '../../utils/helpers/Loader';
import {useFocusEffect} from '@react-navigation/native';
import {t} from 'i18next';

let status;
function SignUp2(props) {
  const dispatch = useDispatch();
  const AuthReducer = useSelector(state => state.AuthReducer);

  const [BankName, setBankName] = useState('');
  const [AccNo, setAccNo] = useState('');
  const [ReAccNo, setReAccNo] = useState('');
  const [TransitNo, setTransitNo] = useState('');
  const [InstitutionNo, setInstitutionNo] = useState('');
  const [bordercolor, setbordercolor] = useState('#79747E');
  const [bordercolor1, setbordercolor1] = useState('#79747E');
  const [bordercolor2, setbordercolor2] = useState('#79747E');
  const [bordercolor3, setbordercolor3] = useState('#79747E');
  const [bordercolor4, setbordercolor4] = useState('#79747E');
  const [errorText, setErrorText] = useState('');
  const [Acclength, setAcclength] = useState(false);

  const [ifscError, setIfscError] = useState('');

  const ifscRegex = /^[A-Z]{4}[0][A-Z0-9]{6}$/;

  const next = () => {
    if (BankName == '') {
      setbordercolor('red');
    } else if (AccNo == '') {
      setbordercolor1('red');
    } else if (AccNo.length < 12) {
      setbordercolor1('red');
    } else if (ReAccNo == '') {
      setbordercolor2('red');
      setErrorText(t("accNoAgain"));
    } else if (ReAccNo !== AccNo) {
      setErrorText(t("reaccNumberSame"));
      setbordercolor2('red');
    } else if (TransitNo == '') {
      setbordercolor3('red');
      setIfscError(t("giveTransitNo"));
    }
    else if (TransitNo.length < 5) {
      setIfscError(t("transitNoFiveDigit"));
    } else if (InstitutionNo == '') {
      setbordercolor4('red');
      setErrorText(t("giveInstituionNo"));
    } else if (InstitutionNo.length < 3) {
      setErrorText(t("institutionNoThreeDigit"));
    } else {
      let obj = {
        bank_name: BankName,
        account_number: AccNo,
        transit_no: TransitNo,
        institution_no: InstitutionNo,
      };

      connectionrequest()
        .then(() => {
          dispatch(SaveBankAccountRequest(obj));
        })
        .catch(err => {
          showErrorAlert(t("connectToInternet"));
        });
    }
  };

  const handleTextChange = newText => {
    setBankName(newText);

    if (newText !== '') {
      setbordercolor('#79747E');
    }
  };

  const handleAccNumber = newText1 => {
    // Update the text and border color when the text changes
    setAccNo(newText1);

    if (newText1.length === 0) {
      setbordercolor1('red');
    } else if (newText1.length < 12) {
      setbordercolor1('red');

      setAcclength(true);
    } else {
      // Account number is 12 or more characters, set border color to gray
      setbordercolor1('#79747E');
      setAcclength(false); // Reset Acclength to true when the length is within the valid range
    }
  };

  const handleReAccNumber = newText2 => {
    setReAccNo(newText2);

    if (newText2 !== '') {
      setbordercolor2('#79747E');
    }
    if (newText2 === '') {
      setErrorText(t("accNoAgain"));
      setbordercolor2('red');
    } else if (newText2 !== AccNo) {
      setErrorText(t("reaccNumberSame"));
      setbordercolor2('red');
    } else {
      setErrorText('');
      setbordercolor2('#79747E');
    }
  };

  const handleIfscNumber = newText3 => {
    setTransitNo(newText3);
    if (newText3 === '') {
      setbordercolor3('red');
      setIfscError(t("giveTransitNo"));
    } else if (newText3.length < 5) {
      setbordercolor3('red');
      setIfscError(t("transitNoFiveDigit"));
    }
    else {
      setbordercolor3('#79747E');
      setIfscError(''); // IFSC code is valid, clear the error
    }
  };

  const handleInstitutionNumber = newText4 => {
    setInstitutionNo(newText4);
    if (newText4 === '') {
      setbordercolor4('red');
      setErrorText(t("giveInstituionNo"));
    } else if (newText4.length < 3) {
      setbordercolor4('red');
      setErrorText(t("institutionNoThreeDigit"));
    }
    else {
      setbordercolor4('#79747E');
      setErrorText(''); // IFSC code is valid, clear the error
    }
  };

  if (status == '' || AuthReducer.status != status) {
    switch (AuthReducer.status) {
      case 'Auth/SaveBankAccountRequest':
        status = AuthReducer.status;
        break;

      case 'Auth/SaveBankAccountSuccess':
        status = AuthReducer.status;
        props.navigation.navigate('SignUp3');
        break;
      case 'Auth/SaveBankAccountFailure':
        status = AuthReducer.status;

        break;
    }
  }

  useFocusEffect(
    React.useCallback(() => {
      dispatch(GetSaveBankAccountRequest());
    }, []),
  );

  useEffect(() => {
    setBankName(AuthReducer?.GetSaveBankAccountResponse?.data?.bank_name);
    setAccNo(AuthReducer?.GetSaveBankAccountResponse?.data?.account_number);
    setReAccNo(AuthReducer?.GetSaveBankAccountResponse?.data?.account_number);
    setTransitNo(AuthReducer?.GetSaveBankAccountResponse?.data?.transit_no);
    setInstitutionNo(
      AuthReducer?.GetSaveBankAccountResponse?.data?.institution_no,
    );
  }, [AuthReducer?.GetSaveBankAccountResponse]);

  return (
    <SafeAreaView style={{flex: 1}}>
      <Loader
        visible={
          AuthReducer.status == 'Auth/SaveBankAccountRequest' ||
          AuthReducer.status == 'Auth/GetSaveBankAccountRequest'
        }
      />
      <Header
        back_img_source={IMAGES.Goback}
        ImagePadding={normalize(5)}
        gobackmarginLeft={normalize(10)}
        justifyContent={'center'}
        backmargintop={Platform.OS == 'android' ? normalize(30) : normalize(20)}
        text
        textRight={normalize(25)}
        title={'JEveux'}
        textcolor={'black'}
        textfont={Fonts.PoppinsSemiBold}
        textSize={normalize(25)}
        textAlign={'center'}
        textmartop={Platform.OS == 'android' ? normalize(30) : normalize(20)}
        marginBottom={normalize(10)}
      />
      <ScrollView>
        <KeyboardAvoidingView
          style={{flex: 1}}
          behavior={Platform.OS === 'ios' ? 'padding' : null}
          enabled>
          <NewTextInput
            width={'90%'}
            textwidth={'100%'}
            borderRadius={normalize(10)}
            value={BankName}
            onChange={handleTextChange}
            marginTop={normalize(30)}
            name={t("bankNameRequired")}
            placeholderTextColor={'#79747E'}
            textInputHight={normalize(40)}
            borderColor={bordercolor}
            borderWidth={normalize(1)}
            fontFamily={Fonts.PoppinsMedium}
            textmarleft={Platform.OS == 'ios' ? normalize(10) : normalize(5)}
          />

          <NewTextInput
            width={'90%'}
            textwidth={'100%'}
            borderRadius={normalize(10)}
            value={AccNo}
            onChange={handleAccNumber}
            marginTop={normalize(15)}
            textInputHight={normalize(40)}
            name={t("accountNumberRequired")}
            placeholderTextColor={'#79747E'}
            borderColor={Acclength ? 'red' : bordercolor1}
            borderWidth={normalize(1)}
            fontFamily={Fonts.PoppinsMedium}
            keyboardType={'number-pad'}
            textmarleft={Platform.OS == 'ios' ? normalize(10) : normalize(5)}
          />
          <NewTextInput
            width={'90%'}
            borderRadius={normalize(10)}
            textwidth={'100%'}
            value={ReAccNo}
            textInputHight={normalize(40)}
            onChange={handleReAccNumber}
            marginTop={normalize(15)}
            name={t("reEnterAccNumber")}
            placeholderTextColor={'#79747E'}
            borderColor={bordercolor2}
            borderWidth={normalize(1)}
            fontFamily={Fonts.PoppinsMedium}
            keyboardType={'number-pad'}
            textmarleft={Platform.OS == 'ios' ? normalize(10) : normalize(5)}
          />

          <NewTextInput
            width={'90%'}
            borderRadius={normalize(10)}
            textwidth={'100%'}
            value={TransitNo}
            onChange={handleIfscNumber}
            marginTop={normalize(15)}
            textInputHight={normalize(40)}
            name={t("transitNo")}
            placeholderTextColor={'#79747E'}
            borderColor={bordercolor3}
            borderWidth={normalize(1)}
            fontFamily={Fonts.PoppinsMedium}
            keyboardType={'numeric'}
            maxLength={5}
            textmarleft={Platform.OS == 'ios' ? normalize(10) : normalize(5)}
          />

          <NewTextInput
            width={'90%'}
            borderRadius={normalize(10)}
            textwidth={'100%'}
            value={InstitutionNo}
            onChange={handleInstitutionNumber}
            marginTop={normalize(15)}
            textInputHight={normalize(40)}
            name={t("institutionNo")}
            placeholderTextColor={'#79747E'}
            borderColor={bordercolor4}
            borderWidth={normalize(1)}
            fontFamily={Fonts.PoppinsMedium}
            keyboardType={'numeric'}
            maxLength={3}
            textmarleft={Platform.OS == 'ios' ? normalize(10) : normalize(5)}
          />
        </KeyboardAvoidingView>
      </ScrollView>

      <Button
        alignSelf={'center'}
        marginTop={normalize(10)}
        marginBottom={normalize(10)}
        backgroundColor={'black'}
        height={normalize(40)}
        width={'90%'}
        borderRadius={normalize(10)}
        textColor={'white'}
        fontSize={normalize(15)}
        title={t("next1")}
        titlesingle={true}
        fontFamily={
          Platform.OS == 'ios' ? Fonts.PoppinsSemiBold : Fonts.PoppinsSemiBold
        }
        onPress={() => {
          next();
        }}
      />
    </SafeAreaView>
  );
}
export default SignUp2;

