import React, { useState } from 'react';
import { FlatList, Platform, SafeAreaView, StyleSheet, Text, View } from 'react-native';
import Header from '../../components/Header';
import { Fonts, IMAGES } from '../../themes/Themes';
import normalize from '../../utils/helpers/normalize';
import { ScrollView } from 'react-native';
import { TouchableOpacity } from 'react-native';
import { Image } from 'react-native';
import ImageCropPicker, { ImagePicker } from 'react-native-image-crop-picker';
import Button from '../../components/Button';
import showErrorAlert from '../../utils/helpers/Toast';
function AddServicePicture(props) {
  const [selectedProfilePhotos, setSelectedProfilePhotos] = useState([]);

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

        setSelectedProfilePhotos(prevPhotos => [...prevPhotos, imageObj]);
      })
      .catch(err => {
        if (err?.code === 'E_NO_CAMERA_PERMISSION') {
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
  const photoData = ({ item, index }) => {
    return (
      <Image
        key={index}
        source={{ uri: item.uri }}
        style={{
          width: '45%',
          height: normalize(150),
          marginHorizontal: normalize(8),
          marginTop: normalize(15),
          borderRadius: normalize(10),
        }}
      />
    );
  };
  const next = () => {
    if (selectedProfilePhotos.length < 2) {
      showErrorAlert('Please click the photo')
    }
    else {
      setSelectedProfilePhotos([])
      props?.route?.params?.AddServicePicture
        ? props.navigation.navigate('Home')
        : props.navigation.navigate('StartService');
    }
  }
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: 'white' }}>
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
        marginBottom={normalize(10)}
      />
      <ScrollView>
        <View style={{ padding: normalize(10) }}>
          <Text
            style={{
              color: 'black',
              fontSize: normalize(20),
              fontFamily: Fonts.PoppinsSemiBold,
              marginTop: normalize(20),
            }}>
            {props?.route?.params?.AddServicePicture
              ? 'Add 2 clear pictures of after service'
              : 'Add 2 clear pictures of before service'}
          </Text>
          <Text
            style={{
              color: '#757575',
              fontSize: normalize(11),
              fontFamily: Fonts.PoppinsRegular,
            }}>
            Take proper closeup and clear pictures
          </Text>
          <FlatList
            data={selectedProfilePhotos}
            renderItem={photoData}
            numColumns={2}
            contentContainerStyle={{ width: '100%' }}
          />
          <TouchableOpacity
            style={styles.TochView}
            onPress={() => {
              cameraUpload();
            }}>
            <Image source={IMAGES.addpic} style={styles.AddImage} />
            <Text style={styles.TouchText}>Add a file</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
      <Button
        width={'95%'}
        titlesingle={true}
        alignSelf={'center'}
        fontSize={normalize(13)}
        fontFamily={Fonts.PoppinsMedium}
        title={'Submit'}
        backgroundColor={selectedProfilePhotos.length > 1 ? 'black' : '#D8D8D8'}
        textColor={'white'}
        borderRadius={normalize(10)}
        marginBottom={normalize(20)}
        onPress={() => {
          Platform.OS == 'ios' ?
            props?.route?.params?.AddServicePicture
              ? props.navigation.navigate('Home')
              : props.navigation.navigate('StartService') :
            next();
        }}
      />
    </SafeAreaView>
  );
}

export default AddServicePicture;
const styles = StyleSheet.create({
  TochView: {
    borderStyle: 'dashed',
    width: '43%',
    borderWidth: normalize(1),
    borderRadius: normalize(10),
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: normalize(30),
    paddingVertical: normalize(30),
    marginHorizontal: normalize(10),
  },
  TouchText: {
    color: '#A0A0A0',
    fontSize: normalize(12),
    fontFamily: Fonts.PoppinsRegular,
    marginTop: normalize(3),
  },
  AddImage: {
    height: normalize(40),
    width: normalize(40),
  },
});
