import React, { useState } from 'react';
import { Image, Platform, ScrollView, StatusBar, View } from 'react-native';
import { SafeAreaView } from 'react-native';
import Header from '../../components/Header';
import { Fonts, IMAGES } from '../../themes/Themes';
import normalize from '../../utils/helpers/normalize';
import { Text } from 'react-native';
import Button from '../../components/Button';
import ImageCropPicker from 'react-native-image-crop-picker';
function AddPicture(props) {
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

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: 'white' }}>
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
        leftImagebackground={'#F3F3F3'}
        ImagePadding={normalize(5)}
        LeftImggborderradius={normalize(10)}
        gobackmarginLeft={normalize(10)}
        justifyContent={'space-between'}
        backmargintop={Platform.OS == 'android' ? normalize(50) : normalize(20)}
        textmartop={Platform.OS == 'android' ? normalize(50) : normalize(20)}
        onPress_back_button={() => {
          props.navigation.goBack();
        }}
      />
      <ScrollView>
        <View style={{ alignItems: 'center', justifyContent: 'center' }}>
          <Text
            style={{
              color: 'black',
              fontFamily: Fonts.PoppinsSemiBold,
              fontSize: normalize(19),
              marginTop: normalize(25),
              textAlign: 'center',
            }}>
            Click a picture including your face and upper body
          </Text>
          <Text
            style={{
              color: '#757575',
              fontSize: normalize(10.8),
              fontFamily: Fonts.PoppinsRegular,
            }}>
            Don’t make any movement while clicking picture
          </Text>
          <View
            style={{
              width: '60%',

              borderRadius: normalize(15),
              backgroundColor: '#F3F3F3',
              alignItems: 'center',
              justifyContent: 'center',
              height: normalize(180),
              marginTop: normalize(60),
            }}>
            <Image
              source={
                selectedprofilePhoto ? { uri: selectedprofilePhoto.uri } : null
              }
              style={{
                height: normalize(180),
                width: '100%',
              }}
            />
          </View>
        </View>
      </ScrollView>
      <Button
        width={'95%'}
        backgroundColor={'black'}
        alignSelf={'center'}
        borderRadius={normalize(8)}
        titlesingle={true}
        title={'Click'}
        textColor={'white'}
        fontFamily={Fonts.PoppinsMedium}
        marginBottom={normalize(20)}
        fontSize={normalize(12)}
        onPress={() => {
          cameraUpload();
        }}
      />
    </SafeAreaView>
  );
}

export default AddPicture;
