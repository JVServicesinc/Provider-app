import React, {useEffect, useState} from 'react';
import {Platform, SafeAreaView, ScrollView, Text, View} from 'react-native';
import Header from '../../components/Header';
import normalize from '../../utils/helpers/normalize';
import {Fonts, IMAGES} from '../../themes/Themes';
import NewTextInput from '../../components/NewTextInput';
import Button from '../../components/Button';
import connectionrequest from '../../utils/helpers/NetInfo';
import {useDispatch, useSelector} from 'react-redux';
import showErrorAlert from '../../utils/helpers/Toast';
import Loader from '../../utils/helpers/Loader';
import { FetchBankDetails, saveBankDetails } from '../../redux/reducer/SettingsReducer';

function BankDetails(props) {
  const dispatch = useDispatch();
  const {data} = useSelector(state => state?.SettingsReducer?.bankDetails);
  const SettingReducer = useSelector(state => state?.SettingsReducer);
  const [bankname, setbankname] = useState('');
  const [accno, setaccno] = useState('');
  const [ifsccode, setifsccode] = useState('');
  const [transitNo, setTransitNo] = useState('');
  const [instituteNo, setInstituteNo] = useState('');
  const [emptyString, setemptyString] = useState(false);
  const [saveProgress, setSaveProgress] = useState(false);

  console.log('SettingsReducer', data);

  useEffect(() => {
    connectionrequest()
      .then(() => {
        dispatch(FetchBankDetails());
      })
      .catch(err => {
        console.log('err', err);
        showErrorAlert('Please connect to internet');
      });
  }, []);

  useEffect(() => {
    if (data) {
      setbankname(data?.bank_name ? data?.bank_name : '');
      setaccno(data?.account_number ? data?.account_number : '');
      setifsccode(data?.ifsc_code ? data?.ifsc_code : '');
      setTransitNo(data?.transit_no ? data?.transit_no : '');
      setInstituteNo(data?.institution_no ? data?.institution_no : '');
    }
  }, [data]);

  const saveHandler = () => {
    console.log('ifsccode', ifsccode);
    setSaveProgress(true);
    if (bankname === '') {
      setemptyString(true);
    } else if (accno === '') {
      setemptyString(true);
    } else {
      connectionrequest()
        .then(() => {
          dispatch(
            saveBankDetails({
              bank_name: bankname,
              account_number: accno,
              ifsc_code: ifsccode,
              transit_no: transitNo,
              institution_no: instituteNo,
            }),
          );
        })
        .catch(err => {
          console.log('err', err);
          showErrorAlert('Please connect to internet');
        });
    }
  };
  
  return (
    <>
      <Loader visible={SettingReducer.status == 'Settings/saveBankDetails'} />
      <SafeAreaView style={{flex: 1, backgroundColor: 'white'}}>
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
          backmargintop={
            Platform.OS == 'android' ? normalize(50) : normalize(20)
          }
          text
          textRight={normalize(25)}
          title={'Bank Details'}
          textcolor={'black'}
          textfont={Fonts.PoppinsSemiBold}
          textSize={normalize(16)}
          textAlign={'center'}
          RightImage
          textmartop={Platform.OS == 'android' ? normalize(50) : normalize(20)}
          onPress_back_button={() => {
            props.navigation.goBack();
          }}
        />
        <ScrollView>
          <View style={{padding: normalize(10)}}>
            <Text
              style={{
                color: '#757575',
                fontSize: normalize(11),
                fontFamily: Fonts.PoppinsMedium,
                marginTop: normalize(30),
              }}>
              Bank Name
            </Text>
            <View
              style={{
                borderBottomWidth: normalize(1),
                borderBottomColor:
                  saveProgress && bankname === '' ? 'red' : '#EBEBEB',
              }}>
              <NewTextInput
                value={bankname}
                onChange={text => setbankname(text)}
                textwidth={'100%'}
                // marginTop={normalize(10)}
                textInputHight={
                  Platform.OS == 'ios' ? normalize(30) : normalize(32)
                }
              />
            </View>
            <Text
              style={{
                color: '#757575',
                fontSize: normalize(11),
                fontFamily: Fonts.PoppinsMedium,
                marginTop: normalize(25),
              }}>
              Account Number
            </Text>
            <View
              style={{
                borderBottomWidth: normalize(1),
                borderBottomColor:
                  saveProgress && accno === '' ? 'red' : '#EBEBEB',
              }}>
              <NewTextInput
                value={accno}
                onChange={text => setaccno(text)}
                textwidth={'100%'}
                // marginTop={normalize(10)}
                textInputHight={
                  Platform.OS == 'ios' ? normalize(30) : normalize(32)
                }
              />
            </View>
  
            <Text
              style={{
                color: '#757575',
                fontSize: normalize(11),
                fontFamily: Fonts.PoppinsMedium,
                marginTop: normalize(25),
              }}>
              Transit No
            </Text>
            <View
              style={{
                borderBottomWidth: normalize(1),
                borderBottomColor:
                  saveProgress && transitNo === '' ? 'red' : '#EBEBEB',
              }}>
              <NewTextInput
                value={transitNo}
                onChange={text => setTransitNo(text)}
                textwidth={'100%'}
                // marginTop={normalize(10)}
                textInputHight={
                  Platform.OS == 'ios' ? normalize(30) : normalize(32)
                }
              />
            </View>
            <Text
              style={{
                color: '#757575',
                fontSize: normalize(11),
                fontFamily: Fonts.PoppinsMedium,
                marginTop: normalize(25),
              }}>
              Institution No
            </Text>
            <View
              style={{
                borderBottomWidth: normalize(1),
                borderBottomColor:
                  saveProgress && instituteNo === '' ? 'red' : '#EBEBEB',
              }}>
              <NewTextInput
                value={instituteNo}
                onChange={text => setInstituteNo(text)}
                textwidth={'100%'}
                // marginTop={normalize(10)}
                textInputHight={
                  Platform.OS == 'ios' ? normalize(30) : normalize(32)
                }
              />
            </View>
          </View>
        </ScrollView>
        <Button
          onPress={saveHandler}
          width={'95%'}
          backgroundColor={
            bankname?.length > 0 || accno.length > 0 ? 'black' : '#D8D8D8'
          }
          alignSelf={'center'}
          borderRadius={normalize(10)}
          titlesingle={true}
          title={'Save Changes'}
          textColor={'white'}
          fontFamily={Fonts.PoppinsMedium}
          marginBottom={normalize(20)}
          fontSize={normalize(12)}
        />
      </SafeAreaView>
    </>
  );
}

export default BankDetails;
