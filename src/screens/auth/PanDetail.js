import React, {useEffect, useState} from 'react';
import {
  Alert,
  Image,
  KeyboardAvoidingView,
  Linking,
  Platform,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import {Fonts, IMAGES} from '../../themes/Themes';
import normalize from '../../utils/helpers/normalize';
import NewTextInput from '../../components/NewTextInput';
import Button from '../../components/Button';
import Header from '../../components/Header';
import showErrorAlert from '../../utils/helpers/Toast';
import CheckBox from '../../components/CheckBox';
import {useDispatch, useSelector} from 'react-redux';
import ImageCropPicker, {ImagePicker} from 'react-native-image-crop-picker';
import connectionrequest from '../../utils/helpers/NetInfo';
import {
  GetPanDetalsRequest,
  PanDetalsRequest,
} from '../../redux/reducer/AuthReducer';
import Loader from '../../utils/helpers/Loader';
import {useFocusEffect} from '@react-navigation/native';
let status;
export default function PanDetail(props) {
  const dispatch = useDispatch();
  const AuthReducer = useSelector(state => state.AuthReducer);
  const [Pan, setPan] = useState('');
  const [PanError, setPanError] = useState('');
  const [bordercolor3, setbordercolor3] = useState('#79747E');
  const [Select, setSelect] = useState(false);
  const [selectedprofilePhoto, setselectedprofilePhoto] = useState(null);
  const [selectedprofilePhoto1, setselectedprofilePhoto1] = useState(null);

  const Panregex = /^[A-Z]{5}[0-9]{4}[A-Z]$/;
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
          Alert.alert('Camera Permission Denied', 'Go To Setting', [
            {
              text: 'cancel',
            },
            {
              text: 'ok',
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

  function cameraUpload1() {
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

        setselectedprofilePhoto1(imageObj);
        // setprofileimage(imageObj.uri);
      })
      .catch(err => {
        if (err?.code == 'E_NO_CAMERA_PERMISSION') {
          Alert.alert('Camera Permission Denied', 'Go To Setting', [
            {
              text: 'cancel',
            },
            {
              text: 'ok',
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
    if (Pan == '') {
      setbordercolor3('red');
      setPanError('Enter your pan number');
    } else if (!Panregex.test(Pan)) {
      setbordercolor3('red');
      setPanError('Invalid number'); // IFSC code is invalid
    } else {
      let formData = new FormData();
      formData.append('pan_number', Pan);
      formData.append('front_picture', selectedprofilePhoto);
      formData.append('back_picture', selectedprofilePhoto1);
      connectionrequest()
        .then(() => {
          dispatch(PanDetalsRequest(formData));
        })
        .catch(err => {
          showErrorAlert('Please connect to internet');
        });
    }
  };
  const handlerPanNumber = newText3 => {
    setPan(newText3);
    if (newText3 === '') {
      setbordercolor3('red');
      setPanError('Enter your pan number');
    } else if (!Panregex.test(newText3)) {
      setbordercolor3('red');
      setPanError('Invalid number'); // IFSC code is invalid
    } else {
      setbordercolor3('#79747E');
      setPanError(''); // IFSC code is valid, clear the error
    }
  };

  if (status == '' || AuthReducer.status != status) {
    switch (AuthReducer.status) {
      case 'Auth/PanDetalsRequest':
        status = AuthReducer.status;
        break;

      case 'Auth/PanDetalsSuccess':
        status = AuthReducer.status;
        props.navigation.navigate('SinNumber');
        break;
      case 'Auth/PanDetalsFailure':
        status = AuthReducer.status;

        break;
    }
  }
  useFocusEffect(
    React.useCallback(() => {
      dispatch(GetPanDetalsRequest());
    }, []),
  );

  useEffect(() => {
    setPan(AuthReducer?.GetPanDetalsResponse?.data?.document_number);
    setselectedprofilePhoto({
      name: '12345.jpg',
      type: 'image/jpeg',
      uri: AuthReducer?.GetPanDetalsResponse?.data?.document_front_photo,
    });
    setselectedprofilePhoto1({
      name: '12346.jpg',
      type: 'image/jpeg',
      uri: AuthReducer?.GetPanDetalsResponse?.data?.document_back_photo,
    });
  }, [AuthReducer?.GetPanDetalsResponse]);

  return (
    <SafeAreaView style={{flex: 1}}>
      <Loader visible={AuthReducer.status == 'Auth/PanDetalsRequest'} />

      <Header
        back_button
        back_img_source={IMAGES.Goback}
        LeftImagehght={normalize(20)}
        LeftImagewidth={normalize(20)}
        leftImagebackground={'#A0A0A0'}
        ImagePadding={normalize(5)}
        LeftImggborderradius={normalize(10)}
        gobackmarginLeft={normalize(10)}
        justifyContent={'space-between'}
        backmargintop={Platform.OS == 'android' ? normalize(20) : normalize(20)}
        text
        textRight={normalize(15)}
        title={'JEveux'}
        textcolor={'black'}
        textfont={Fonts.PoppinsSemiBold}
        textSize={normalize(25)}
        textAlign={'center'}
        RightImage
        textmartop={Platform.OS == 'android' ? normalize(20) : normalize(20)}
        onPress_back_button={() => {
          props.navigation.navigate('SignUp3');
        }}
      />
      <ScrollView>
        <KeyboardAvoidingView
          style={{flex: 1}}
          behavior={Platform.OS === 'ios' ? 'padding' : null}
          enabled>
          <NewTextInput
            width={'93%'}
            borderRadius={normalize(10)}
            value={Pan}
            onChange={handlerPanNumber}
            textInputHight={normalize(40)}
            // backgroundColor={COLORS.backgroundPink}
            marginTop={normalize(30)}
            name={'PAN (ABCDE1234F)'}
            placeholderTextColor={'#79747E'}
            borderColor={bordercolor3}
            borderWidth={normalize(1)}
            fontFamily={Fonts.PoppinsMedium}
            textwidth={'100%'}
            textmarleft={Platform.OS == 'ios' ? normalize(10) : normalize(5)}
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
                <Text style={styles.TouchText}>Front picture</Text>
              )}
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.TochView}
              onPress={() => {
                cameraUpload1();
              }}>
              <Image
                source={
                  selectedprofilePhoto1
                    ? {uri: selectedprofilePhoto1.uri}
                    : IMAGES.addpic
                }
                style={{
                  height: selectedprofilePhoto1
                    ? normalize(130)
                    : normalize(45),
                  width: selectedprofilePhoto1 ? normalize(120) : normalize(45),
                  borderRadius: normalize(10),
                }}
              />
              {selectedprofilePhoto1 ? null : (
                <Text style={styles.TouchText}>Back picture</Text>
              )}
            </TouchableOpacity>
          </View>
        </KeyboardAvoidingView>
      </ScrollView>
      <TouchableOpacity
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          marginHorizontal: normalize(10),
          width: '100%',
          justifyContent: 'space-between',
        }}
        onPress={() => {
          setSelect(!Select);
        }}>
        <CheckBox
          onChange={() => {
            setSelect(!Select);
          }}
          CheckBox={IMAGES.Tick}
          active={Select}
          tintColor={'white'}
          backgroundColor={'black'}
        />
        <Text
          style={{
            color: '#161616',
            fontSize: normalize(12),
            fontFamily: Fonts.PoppinsRegular,
            width: normalize(300),
          }}>
          I hereby consent to receiving communications from JEveux for any
          relevant opportunities
        </Text>
      </TouchableOpacity>

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
        title={'Next'}
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
const styles = StyleSheet.create({
  TochView: {
    borderStyle: 'dashed',
    width: '43%',
    borderWidth: normalize(1),
    borderRadius: normalize(20),
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: normalize(15),
    height: normalize(150),
    marginHorizontal: normalize(10),
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
