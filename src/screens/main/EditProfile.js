import React, {useEffect, useState} from 'react';
import {Platform, SafeAreaView, ScrollView, Text, View} from 'react-native';
import Header from '../../components/Header';
import normalize from '../../utils/helpers/normalize';
import {Fonts, IMAGES} from '../../themes/Themes';
import NewTextInput from '../../components/NewTextInput';
import Button from '../../components/Button';
import { useDispatch, useSelector } from 'react-redux';
import connectionrequest from '../../utils/helpers/NetInfo';
import { ProviderProfileRequest } from '../../redux/reducer/ProfileReducer';
import showErrorAlert from '../../utils/helpers/Toast';
let status
function EditProfile(props) {
  const dispatch = useDispatch();
  const AuthReducer = useSelector(state => state.AuthReducer);
  const ProfileReducer = useSelector(state => state.ProfileReducer);

  useEffect(() => {
    connectionrequest()
      .then(() => {
        dispatch(ProviderProfileRequest());
      })
      .catch(err => {
        showErrorAlert('Please connect to internet');
      });
  }, []);

  const [fullname, setfullname] = useState('');
  const [email, setemail] = useState('');
  const [mobile, setmobile] = useState('');
  if (status == '' || ProfileReducer.status != status) {
    switch (ProfileReducer.status) {
      case 'Profile/ProviderProfileRequest':
        status = ProfileReducer.status;
     ;
        break;

      case 'Profile/ProviderProfileSuccess':
        status = ProfileReducer.status;
        setfullname(ProfileReducer?.ProviderProfileResponse?.data?.full_name)
        setemail(ProfileReducer?.ProviderProfileResponse?.data?.email)
        setmobile(ProfileReducer?.ProviderProfileResponse?.data?.mobile)
  
   
        break;
      case 'Profile/ProviderProfileFailure':
        status = ProfileReducer.status;

        break;
    }
  }
  return (
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
        backmargintop={Platform.OS == 'android' ? normalize(20) : normalize(20)}
        text
        textRight={normalize(25)}
        title={'Edit Profile'}
        textcolor={'black'}
        textfont={Fonts.PoppinsSemiBold}
        textSize={normalize(16)}
        textAlign={'center'}
        RightImage
        textmartop={Platform.OS == 'android' ? normalize(20) : normalize(20)}
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
            marginTop:normalize(30)
          }}>
          Full Name
        </Text>
        <View
          style={{
            borderBottomWidth: normalize(1),
            borderBottomColor: '#EBEBEB',
          }}>
          <NewTextInput
            value={fullname}
            onChange={text => setfullname(text)}
            textwidth={'100%'}
            // marginTop={normalize(10)}
            // marginTop={Platform.OS=='ios'? normalize(30):normalize(0)}
            textInputHight={Platform.OS=='ios'? normalize(30):normalize(30)}
            
          />
        </View>
        <Text
          style={{
            color: '#757575',
            fontSize: normalize(11),
            fontFamily: Fonts.PoppinsMedium,
            marginTop:normalize(25)
          }}>
        Email
        </Text>
        <View
          style={{
            borderBottomWidth: normalize(1),
            borderBottomColor: '#EBEBEB',
          }}>
          <NewTextInput
            value={email}
            onChange={text => setemail(text)}
            textwidth={'100%'}
            // marginTop={normalize(10)}
            textInputHight={Platform.OS=='ios'? normalize(30):normalize(30)}
          />
        </View>
        <Text
          style={{
            color: '#757575',
            fontSize: normalize(11),
            fontFamily: Fonts.PoppinsMedium,
            marginTop:normalize(25)
          }}>
         Mobile Number
        </Text>
        <View
          style={{
            borderBottomWidth: normalize(1),
            borderBottomColor: '#EBEBEB',
          }}>
          <NewTextInput
            value={mobile}
            onChange={text => setmobile(text)}
            textwidth={'100%'}
            // marginTop={normalize(10)}
            textInputHight={Platform.OS=='ios'? normalize(30):normalize(30)}
          />
        </View>
      </View>
      </ScrollView>
      <Button width={'95%'}
      backgroundColor={ fullname.length>0||email.length>0||mobile.length>0 ?'black':'grey'}
      alignSelf={'center'}
      borderRadius={normalize(10)}
      titlesingle={true}
      title={'Save Changes'}
      textColor={'white'}
      fontFamily={Fonts.PoppinsMedium}
      marginBottom={normalize(20)}
      fontSize={normalize(12)}/>
    </SafeAreaView>
  );
}

export default EditProfile;
