import React, {useEffect, useState} from 'react';
import {
  Alert,
  Image,
  KeyboardAvoidingView,
  Linking,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Platform,
} from 'react-native';
import {Fonts, IMAGES} from '../../themes/Themes';
import normalize from '../../utils/helpers/normalize';
import NewTextInput from '../../components/NewTextInput';
import Button from '../../components/Button';
import Header from '../../components/Header';
import showErrorAlert from '../../utils/helpers/Toast';
import {useDispatch, useSelector} from 'react-redux';
import ImageCropPicker, {ImagePicker} from 'react-native-image-crop-picker';
import connectionrequest from '../../utils/helpers/NetInfo';
import {
  GetSinDetailRequest,
  SinDetailRequest,
} from '../../redux/reducer/AuthReducer';
import Loader from '../../utils/helpers/Loader';
import {useFocusEffect} from '@react-navigation/native';
import { t } from "i18next";
let status;
function SinNumber(props) {
  const dispatch = useDispatch();
  const AuthReducer = useSelector(state => state.AuthReducer);
  const [SinNo, setSinNo] = useState('');
  const [SinError, setSinError] = useState('');
  const [bordercolor3, setbordercolor3] = useState('#79747E');
  const Sinregex = /^\d{3}(-\d{3}){2}$/;
  const [selectedprofilePhoto, setselectedprofilePhoto] = useState(null);

  function cameraUpload() {
    ImageCropPicker.openCamera({
      width: 300,
      height: 400,
      cropping: true,
      title: 'Select Image',
      storageOptions: {
        skipBackup: true,
      },
    })
      .then(image => {
        let arr = image.path.split('/');
        let getOriginalname = arr[arr.length - 1];
        let imageObj = {
          name: getOriginalname,
          type: image.mime,
          uri:
            Platform.OS === 'android'
              ? image.path
              : image.path.replace('file://', ''),
        };

        setselectedprofilePhoto(imageObj);
      })
      .catch(err => {
        if (err?.code == 'E_NO_CAMERA_PERMISSION') {
          Alert.alert(t("cameraPermissionDenied"), t("goToSetting"), [
            {
              text: t("cancel"),
            },
            {
              text: t("ok"),
              onPress: () => {
                if (Platform.OS === 'ios') {
                  Linking.openURL('app-settings:');
                } else {
                  Linking.openSettings();
                }
              },
            },
          ]);
        } else {
        }
      });
  }
  const next = () => {
    if (SinNo == '') {
      setbordercolor3('red');
      setSinError(t("enterSinNumber"));
    } else if (!Sinregex.test(SinNo)) {
      setbordercolor3('red');
      setSinError(t("invalidSinNumber")); // IFSC code is invalid
    } else {
      let formData = new FormData();
      formData.append('sin_number', SinNo);
      formData.append('front_picture', selectedprofilePhoto);
      connectionrequest()
        .then(() => {
          dispatch(SinDetailRequest(formData));
        })
        .catch(err => {
          showErrorAlert(t("giveTransitNo"));
        });
    }
  };
  const handlerPanNumber = newText3 => {
    const formattedSin = newText3.replace(/[^0-9]/g, '');
    let formattedSinWithDashes = formattedSin
      .match(/\d{1,3}/g)
      ?.join('-')
      ?.slice(0, 11);
    setSinNo(formattedSinWithDashes);

    if (formattedSin === '') {
      setbordercolor3('red');
      setSinError(t("invalidSinNumber"));
    } else if (formattedSinWithDashes.length > 11) {
      setbordercolor3('red');
      setSinError(t("sinNumberElevenCharacters"));
    } else {
      setbordercolor3('#79747E');
      setSinError('');
    }
  };

  if (status == '' || AuthReducer.status != status) {
    switch (AuthReducer.status) {
      case 'Auth/SinDetailRequest':
        status = AuthReducer.status;
        break;

      case 'Auth/SinDetailSuccess':
        status = AuthReducer.status;
        props?.navigation?.navigate('TabNavigator');
        break;
      case 'Auth/SinDetailFailure':
        status = AuthReducer.status;

        break;
    }
  }

  useFocusEffect(
    React.useCallback(() => {
      dispatch(GetSinDetailRequest());
    }, []),
  );

  useEffect(() => {
    setSinNo(AuthReducer?.GetSinDetailRes?.data?.document_number);
    setselectedprofilePhoto({
      name: '12345.jpg',
      type: 'image/jpeg',
      uri: AuthReducer?.GetSinDetailRes?.data?.document_front_photo,
    });
  }, [AuthReducer?.GetSinDetailRes]);
  return (
    <SafeAreaView style={{flex: 1}}>
      <Loader visible={AuthReducer.status == 'Auth/SinDetailRequest'} />
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
        title={'JEveux'}
        textcolor={'black'}
        textfont={Fonts.PoppinsSemiBold}
        textSize={normalize(25)}
        textAlign={'center'}
        RightImage
        textmartop={Platform.OS == 'android' ? normalize(20) : normalize(20)}
        onPress_back_button={() => {
          props.navigation.navigate('PanDetail');
        }}
        marginBottom={normalize(10)}
      />
      <ScrollView>
        <KeyboardAvoidingView
          style={{flex: 1}}
          behavior={Platform.OS === 'ios' ? 'padding' : null}
          enabled>
          <NewTextInput
            width={'93%'}
            textwidth={'100%'}
            borderRadius={normalize(10)}
            textInputHight={normalize(40)}
            value={SinNo}
            onChange={handlerPanNumber}
            marginTop={normalize(30)}
            name={t("sinExample")}
            placeholderTextColor={'#79747E'}
            textmarleft={Platform.OS == 'ios' ? normalize(10) : normalize(5)}
            borderColor={bordercolor3}
            borderWidth={normalize(1)}
            fontFamily={Fonts.PoppinsMedium}
          />
          <View
            style={{
              flexDirection: 'row',
              width: '100%',
              alignItems: 'center',
              justifyContent: 'center',
            }}>
            <TouchableOpacity
              style={styles.TochView}
              onPress={() => {
                cameraUpload();
              }}>
              <Image
                source={
                  selectedprofilePhoto
                    ? {uri: selectedprofilePhoto.uri}
                    :
                      IMAGES.addpic
                }
                style={{
                  height: selectedprofilePhoto ? normalize(130) : normalize(45),
                  width: selectedprofilePhoto ? normalize(120) : normalize(45),
                  borderRadius: normalize(10),
                }}
              />
              {selectedprofilePhoto ? null : (
                <Text style={styles.TouchText}>{t("frontPicture")}</Text>
              )}
            </TouchableOpacity>
          </View>
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

export default SinNumber;
const styles = StyleSheet.create({
  TochView: {
    borderStyle: 'dashed',
    width: '43%',
    borderWidth: normalize(1),
    borderRadius: normalize(20),
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: normalize(15),
    marginHorizontal: normalize(10),
    height: normalize(150),
  },
  TouchText: {
    color: '#A0A0A0',
    fontSize: normalize(14),
    fontFamily: Fonts.PoppinsRegular,
    marginTop: normalize(10),
  },
  AddImage: {
    height: normalize(45),
    width: normalize(45),
  },
});
