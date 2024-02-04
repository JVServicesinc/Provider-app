import React from 'react';
import {
  FlatList,
  Image,
  Platform,
  SafeAreaView,
  Text,
  View,
} from 'react-native';
import Header from '../../components/Header';
import {Fonts, IMAGES} from '../../themes/Themes';
import normalize from '../../utils/helpers/normalize';

function Notification(props) {
  const NotificationData = [
    {
      id: 1,
      image: IMAGES.Notification22,
      Title: 'Refer & Earn more',
      Description:
        'New notification here dummy info, more dummy info here dummy info here.',
      Date: 'Thu 21 Apr',
    },
    {
      id: 2,
      image: IMAGES.Notification22,
      Title: 'Refer & Earn more',
      Description:
        'New notification here dummy info, more dummy info here dummy info here.',
      Date: 'Thu 21 Apr',
    },
  ];
  const NotificationItem = ({item}) => {
    return (
      <>
        <View
          style={{
            flexDirection: 'row',
            padding: normalize(10),
          }}>
          <Image
            source={item?.image}
            style={{height: normalize(35), width: normalize(35)}}
          />
          <View style={{marginLeft: normalize(5)}}>
            <Text
              style={{
                color: 'black',
                fontSize: normalize(12),
                fontFamily: Fonts.PoppinsMedium,
              }}>
              {item?.Title}
            </Text>
            <Text
              style={{
                color: '#757575',
                fontSize: normalize(11),
                width: normalize(250),
                fontFamily: Fonts.PoppinsRegular,
              }}>
              {item?.Description}
            </Text>
            <Text
              style={{
                color: 'black',
                fontFamily: Fonts.PoppinsRegular,
                fontSize: normalize(10),
              }}>
              {item?.Date}
            </Text>
          </View>
        </View>
        <View
          style={{
            borderBottomWidth: normalize(1),
            borderColor: '#EBEBEB',
            width: '90%',
            alignSelf: 'center',
          }}
        />
      </>
    );
  };
  return (
    <SafeAreaView style={{flex: 1, backgroundColor: 'white'}}>
      <Header
        back_button
        back_img_source={IMAGES.Goback}
        LeftImagehght={normalize(15)}
        LeftImagewidth={normalize(15)}
        leftImagebackground={'#d3d3d3'}
        ImagePadding={normalize(10)}
        LeftImggborderradius={normalize(10)}
        gobackmarginLeft={normalize(10)}
        backmargintop={Platform.OS == 'android' ? normalize(50) : normalize(20)}
        onPress_back_button={() => {
          props.navigation.goBack();
        }}
      />
      <FlatList
        data={NotificationData}
        renderItem={NotificationItem}
        style={{marginTop: normalize(15)}}
      />
    </SafeAreaView>
  );
}

export default Notification;
