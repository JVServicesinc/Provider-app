import React, { useEffect, useState } from 'react';
import {
  Alert,
  FlatList,
  Image,
  KeyboardAvoidingView,
  Platform,
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import { Fonts, IMAGES } from '../../themes/Themes';
import normalize from '../../utils/helpers/normalize';
import NewTextInput from '../../components/NewTextInput';
import Dropdown from '../../components/Dropdown';
import Picker from '../../components/Picker';
import Button from '../../components/Button';
import showErrorAlert from '../../utils/helpers/Toast';
import Header from '../../components/Header';
import auth from '@react-native-firebase/auth';
import connectionrequest from '../../utils/helpers/NetInfo';
import { signUpRequest, workTypeRequest } from '../../redux/reducer/AuthReducer';
import { useDispatch, useSelector } from 'react-redux';
import Loader from '../../utils/helpers/Loader';
import { Snackbar } from 'react-native-paper';
import {t} from 'i18next';

let status;
function SignUp(props) {
  const dispatch = useDispatch();
  const AuthReducer = useSelector(state => state.AuthReducer);

  const [Fullname, setFullname] = useState('');
  const [show, setShow] = useState(false);
  const [countryCode, setCountryCode] = useState('+91');
  const [Flag, setFlag] = useState(IMAGES.IndianFlag);
  const [MobileNumber, setMobileNumber] = useState('');
  const [email, setemail] = useState('');
  const [Password, setPassword] = useState('');
  const [city, setcity] = useState('');
  const [cities,setCities]=useState('')
  const [WorktypeModal, setWorktypeModal] = useState(false);
  const [cityModal, setCityModal] = useState(false);
  const [WorktypeName, setWorktypeName] = useState('');

  const [emptyString, setemptyString] = useState(false);
  const [emptyString1, setemptyString1] = useState(false);
  const [emptyString2, setemptyString2] = useState(false);
  const [emptyString3, setemptyString3] = useState(false);
  const [emptyString4, setemptyString4] = useState(false);
  const [emptyString5, setemptyString5] = useState(false);
  const [regexemailchk, setregexemailchk] = useState(false);

  const [visible, setVisible] = useState(false);
  const onToggleSnackBar = () => setVisible(!visible);
  const onDismissSnackBar = () => setVisible(false);

  const regex =
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

  useEffect(() => {
    connectionrequest()
      .then(() => {
        dispatch(workTypeRequest());
      })
      .catch(err => {
        showErrorAlert('Please connect to internet');
      });
  }, []);
  

  // Handle user state changes
  function onAuthStateChanged(user) { }

  const getCitiesList=(data)=>{
    const cities=fetch("https://countriesnow.space/api/v0.1/countries/cities", {
      method: "POST",
      body: JSON.stringify({
        country:data=='+91'?'india':'canada'
      }),
      headers: {
        "Content-type": "application/json; charset=UTF-8"
      }
    })
      .then((response) => response.json())
      .then((json) => setCities(json.data));
  }

  useEffect(async () => {
    const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
    getCitiesList(countryCode)
    return subscriber; // unsubscribe on unmount
  }, []);

  const Next = () => {
    if (Fullname == '') {
      // showErrorAlert('Please enter your full name');
      showErrorAlert(t('enterFullName'));
      setemptyString(true);
    } else if (MobileNumber == '') {
      setemptyString1(true);
    } else if (MobileNumber.length != 10) {
      showErrorAlert(t('enter10DigitNumber'));
    } else if (email == '') {
      showErrorAlert(t('enterEmail'));
      setemptyString2(true);
    } else if (!regex.test(email)) {
      showErrorAlert(t('invalidEmail'));
      setregexemailchk(true);
    } else if (Password == '') {
      setemptyString5(true);
    
    }else if(Password!==''&&Password.length<8){
      setemptyString5(true);
      showErrorAlert(t('Password should be more than 8 characters'));
    } 
    else if (city == '') {
      showErrorAlert(t('enterCity'));
      setemptyString3(true);
    } else if (WorktypeName == '') {
      setemptyString4(true);
      showErrorAlert(t('selectWork'));
    } else {
      // signInWithPhoneNumber(MobileNumber, countryCode);
      let obj = {
        full_name: Fullname,
        mobile: MobileNumber,
        email: email,
        city: city,
        work_type: WorktypeName,
        password: Password,
        user_type: 'provider',
      };
      connectionrequest()
        .then(() => {
          dispatch(signUpRequest(obj));
        })
        .catch(err => {
          showErrorAlert(t('connectToInternet'));
        });
    }
  };

  const handleTextChange = (text, inputIdentifier) => {
    if (inputIdentifier === 'Fullname') {
      setFullname(text);
    } else if (inputIdentifier === 'MobileNumber') {
      setMobileNumber(text);
    } else if (inputIdentifier === 'email') {
      setemail(text);
      if (text !== '' && regex.test(text)) {
        setemptyString2(false);
        setregexemailchk(false);
      } else {
        setemptyString2(true);
        setregexemailchk(true);
      }
    } else if (inputIdentifier == 'Password') {
      setPassword(text);
    } else if (inputIdentifier === 'city') {
      setcity(text);
    }

    // Handle empty string conditions for all input fields
    if (text !== '') {
      if (inputIdentifier === 'Fullname') {
        setemptyString(false);
      } else if (inputIdentifier === 'MobileNumber') {
        setemptyString1(false);
      } else if (inputIdentifier === 'city') {
        setemptyString3(false);
      } else if (inputIdentifier == 'Password') {
        setemptyString5(false);
      }
    } else {
      if (inputIdentifier === 'Fullname') {
        setemptyString(true);
      } else if (inputIdentifier === 'MobileNumber') {
        setemptyString1(true);
      } else if (inputIdentifier == 'Password') {
        setemptyString5(true);
      } else if (inputIdentifier === 'city') {
        setemptyString3(true);
      } else if (inputIdentifier === 'WorktypeName') {
        // Assuming you have a selectedDropdownValue state
        if (text !== '') {
          setWorktypeName(text);
          setemptyString4(false);
        } else {
          setWorktypeName('');
          setemptyString4(true);
        }
      }
    }
  };

  const countryData = [
    {
      id: 1,
      name: 'India',
      code: '+91',
      flag: IMAGES.IndianFlag,
    },
    {
      id: 2,
      name: 'Canada',
      code: '+1',
      flag: IMAGES.canada,
    },
  ];

  const renderCountry = ({ item }) => {
    return (
      <TouchableOpacity
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          padding: normalize(10),
          backgroundColor: '#D8D8D8',
          marginTop: normalize(5),
          justifyContent: 'center',
        }}
        onPress={() => {
          getCitiesList(item?.code)
          setCountryCode(item?.code);
          setFlag(item?.flag);
          setShow(!show);
        }}>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'center',
          }}>
          <Image
            source={item?.flag}
            style={{ height: normalize(20), width: normalize(20) }}
          />
        </View>
        <Text
          style={{
            color: 'black',
            fontSize: normalize(13),
            fontFamily: Fonts.PoppinsMedium,
            marginLeft: normalize(10),
          }}>
          {item?.code}
        </Text>
        <Text
          style={{
            color: 'black',
            fontSize: normalize(13),
            fontFamily: Fonts.PoppinsMedium,
            marginLeft: normalize(10),
          }}>
          {item?.name}
        </Text>
      </TouchableOpacity>
    );
  };

  async function signInWithPhoneNumber(phoneNumber, countryCode) {
    const formattedPhoneNumber = `${countryCode}${phoneNumber}`;
    auth()
      .signInWithPhoneNumber(formattedPhoneNumber)
      .then(res => {
        props.navigation.navigate('Verification', {
          Data: res,
          formattedPhoneNumber: formattedPhoneNumber,
          email: email,
          password: Password,
        });
      })
      .catch(error => {
        Alert.alert(t('enteredWrongOtp'));
      });
  }

  if (status == '' || AuthReducer.status != status) {
    switch (AuthReducer.status) {
      case 'Auth/signUpRequest':
        status = AuthReducer.status;
        break;

      case 'Auth/signUpSuccess':
        status = AuthReducer.status;
        signInWithPhoneNumber(MobileNumber, countryCode);
        break;
      case 'Auth/signUpFailure':
        status = AuthReducer.status;
        onToggleSnackBar();

        break;
    }
  }

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: 'white' }}>
      <Loader visible={AuthReducer.status == 'Auth/signUpRequest'} />
      <StatusBar
        backgroundColor={'white'}
        translucent={true}
        barStyle={'dark-content'}
      />

      <Header
        back_button
        back_img_source={IMAGES.Goback}
        LeftImagehght={normalize(20)}
        LeftImagewidth={normalize(20)}
        leftImagebackground={'#dbdbdb'}
        ImagePadding={normalize(5)}
        LeftImggborderradius={normalize(10)}
        gobackmarginLeft={normalize(10)}
        justifyContent={'space-between'}
        backmargintop={Platform.OS == 'android' ? normalize(50) : normalize(20)}
        // text
        rightImagesrc={IMAGES.logo}
        textRight={normalize(25)}
        // title={'JEveux'}
        textcolor={'black'}
        textfont={Fonts.PoppinsSemiBold}
        textSize={normalize(25)}
        textAlign={'center'}
        // RightImage
        centerImage
        textmartop={Platform.OS == 'android' ? normalize(50) : normalize(20)}
        onPress_back_button={() => {
          props.navigation.goBack();
        }}
        marginBottom={normalize(10)}
      />

      <ScrollView>
        <KeyboardAvoidingView
          style={{ flex: 1 }}
          behavior={Platform.OS === 'ios' ? 'padding' : null}
          enabled>
          <NewTextInput
            width={'90%'}
            textwidth={'90%'}
            borderRadius={normalize(10)}
            value={Fullname}
            textInputHight={normalize(40)}
            onChange={newText => handleTextChange(newText, 'Fullname')}
            marginTop={normalize(20)}
            name={t("fullName")}
            placeholderTextColor={'#79747E'}
            borderColor={emptyString ? 'red' : '#79747E'}
            borderWidth={normalize(1)}
            fontFamily={Fonts.PoppinsMedium}
            textmarleft={Platform.OS == 'ios' ? normalize(10) : normalize(5)}

          // marginLeft={normalize(10)}
          />

          <View
            style={{
              flexDirection: 'row',
              width: '90%',
              borderRadius: normalize(10),
              borderColor: emptyString1 ? 'red' : '#79747E',
              borderWidth: normalize(1),
              marginTop: normalize(15),
              alignSelf: 'center',
            }}>
            <TouchableOpacity
              style={{
                width: '30%',
                borderRightWidth: normalize(1),
                borderRightColor: '#79747E',
                alignItems: 'center',
                justifyContent: 'center',
                flexDirection: 'row',
              }}
              onPress={() => setShow(!show)}>
              <Image
                source={Flag}
                style={{ height: normalize(20), width: normalize(20) }}
              />
              <Text
                style={{
                  color: '#79747E',
                  fontSize: normalize(15),
                  fontFamily: Fonts.PoppinsMedium,
                  marginLeft: normalize(5),
                  textAlign: 'center',
                  marginTop: Platform.OS == 'ios' ? normalize(0) : normalize(5),
                }}>
                {countryCode}
              </Text>
              <Image
                source={IMAGES.Down}
                style={{
                  height: normalize(15),
                  width: normalize(15),
                  marginLeft: normalize(10),
                }}
              />
            </TouchableOpacity>
            <NewTextInput
              width={normalize(200)}
              textwidth={'90%'}
              textInputHight={normalize(40)}
              value={MobileNumber}
              onChange={newText => handleTextChange(newText, 'MobileNumber')}
              name={t("mobileNumber")}
              placeholderTextColor={'#79747E'}
              fontFamily={Fonts.PoppinsMedium}
              keyboardType={'number-pad'}
              textmarleft={Platform.OS == 'ios' ? normalize(10) : normalize(5)}
            />
          </View>
          {show ? (
            <View
              style={{
                width: '40%',
                backgroundColor: 'white',
                borderColor: '#79747E',
                borderWidth: normalize(1),
                borderRadius: normalize(5),
                padding: normalize(2),
                // alignSelf:'center',
                position: 'absolute',
                bottom: normalize(80),
                // opacity:0
                zIndex: 99,
                left: normalize(15),
                // height:normalize(20)
                marginTop: normalize(5), // r
              }}>
              <FlatList data={countryData} renderItem={renderCountry} />
            </View>
          ) : null}

          <NewTextInput
            width={'90%'}
            textInputHight={normalize(40)}
            textwidth={'90%'}
            borderRadius={normalize(10)}
            value={email}
            onChange={newText => handleTextChange(newText, 'email')}
            marginTop={normalize(15)}
            textmarleft={Platform.OS == 'ios' ? normalize(10) : normalize(5)}
            name={t("emailAddress")}
            placeholderTextColor={'#79747E'}
            borderColor={
              emptyString2 ? 'red' : regexemailchk ? 'red' : '#79747E'
            }
            borderWidth={normalize(1)}
            fontFamily={Fonts.PoppinsMedium}
            keyboardType={'email-address'}
          />
          <NewTextInput
            width={'90%'}
            textwidth={'90%'}
            borderRadius={normalize(10)}
            value={Password}
            textInputHight={normalize(40)}
            onChange={newText => handleTextChange(newText, 'Password')}
            marginTop={normalize(20)}
            name={t("password")}
            placeholderTextColor={'#79747E'}
            borderColor={emptyString5 ? 'red' : '#79747E'}
            borderWidth={normalize(1)}
            fontFamily={Fonts.PoppinsMedium}
            textmarleft={Platform.OS == 'ios' ? normalize(10) : normalize(5)}
          />
{/* 
          <NewTextInput
            width={'90%'}
            borderRadius={normalize(10)}
            textwidth={'90%'}
            textInputHight={normalize(40)}
            value={city}
            onChange={newText => handleTextChange(newText, 'city')}
            // backgroundColor={COLORS.backgroundPink}
            marginTop={normalize(15)}
            name={t("city")}
            textmarleft={Platform.OS == 'ios' ? normalize(10) : normalize(5)}
            placeholderTextColor={'#79747E'}
            borderColor={emptyString3 ? 'red' : '#79747E'}
            borderWidth={normalize(1)}
            fontFamily={Fonts.PoppinsMedium}
          // marginLeft={normalize(10)}
          /> */}
          <Picker
          backgroundColor={'white'}
          dataList={cities}
          modalVisible={cityModal}
          paddingLeft={normalize(0)}
          modalHeading
          height={normalize(500)}
          TextmodalHeading={t("Choose Your City")}
          ModalDown={true}
          modalDown={() => {
            setCityModal(!cityModal);
          }}
          onBackdropPress={() => setCityModal(!cityModal)}
          renderData={({ item, index }) => {
            return (
              <TouchableOpacity
                onPress={() => {
                  setcity(item);

                  setCityModal(false);
                }}
                style={[styles.dropDownItem]}>
                <Text style={[styles.dropDownItemText]}>{item}</Text>
              </TouchableOpacity>
            );
          }}
        />
        <Dropdown
          width={'90%'}
          borderWidth={normalize(1)}
          height={normalize(42)}
          borderColor={emptyString4 ? 'red' : '#79747E'}
          rightIcon={IMAGES.DownArrow2}
          iconHeight={normalize(15)}
          iconWidth={normalize(15)}
          marginTop={normalize(15)}
          value={city == '' ? t("City") : city}
          onPress={() => {
            setCityModal(!cityModal);
          }}
        />
        </KeyboardAvoidingView>
        <Picker
          backgroundColor={'white'}
          dataList={AuthReducer?.workTypeResponse?.data}
          modalVisible={WorktypeModal}
          paddingLeft={normalize(0)}
          modalHeading
          TextmodalHeading={t("chooseYourWork")}
          ModalDown={true}
          modalDown={() => {
            setWorktypeModal(!WorktypeModal);
          }}
          onBackdropPress={() => setWorktypeModal(!WorktypeModal)}
          renderData={({ item, index }) => {
            return (
              <TouchableOpacity
                onPress={() => {
                  setWorktypeName(item);

                  setWorktypeModal(false);
                }}
                style={[styles.dropDownItem]}>
                <Text style={[styles.dropDownItemText]}>{item}</Text>
              </TouchableOpacity>
            );
          }}
        />
        <Dropdown
          width={'90%'}
          borderWidth={normalize(1)}
          height={normalize(42)}
          borderColor={emptyString4 ? 'red' : '#79747E'}
          rightIcon={IMAGES.DownArrow2}
          iconHeight={normalize(15)}
          iconWidth={normalize(15)}
          marginTop={normalize(15)}
          value={WorktypeName == '' ? t("workType") : WorktypeName}
          onPress={() => {
            setWorktypeModal(!WorktypeModal);
          }}
        />
      </ScrollView>

      <Button
        alignSelf={'center'}
        marginTop={normalize(10)}
        marginBottom={normalize(50)}
        backgroundColor={'black'}
        height={normalize(40)}
        width={'90%'}
        borderRadius={normalize(10)}
        textColor={'white'}
        fontSize={normalize(15)}
        title={'Next'}
        titlesingle={true}
        fontFamily={
          Platform.OS == 'ios' ? Fonts.PoppinsSemiBold : Fonts.PoppinsSemiBold
        }
        onPress={() => {
          Next();
        }}
      />
    </SafeAreaView>
  );
}

export default SignUp;

const styles = StyleSheet.create({
  ErrorText: {
    color: 'red',
    textAlign: 'center',
    fontSize: normalize(15),
    fontFamily: Fonts.PoppinsMedium,
  },
  dropDownItem: {
    paddingVertical: normalize(12),
    borderBottomColor: '#DDDDDD',
    borderBottomWidth: normalize(1),
  },
  dropDownItemText: {
    fontSize: normalize(12),
    // lineHeight: normalize(8),
    fontFamily: Fonts.PoppinsMedium,
    color: '#79747E',
    textTransform: 'uppercase',
    paddingLeft: normalize(20),
  },
});
