import React, {useState} from 'react';
import {
  FlatList,
  Image,
  Platform,
  SafeAreaView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {Fonts, IMAGES} from '../../themes/Themes';
import normalize from '../../utils/helpers/normalize';
import Header from '../../components/Header';
import Button from '../../components/Button';
import MyStatusBar from '../../utils/MyStatusBar';
import Modal from 'react-native-modal';
import NewTextInput from '../../components/NewTextInput';

function Subscription(props) {
  const [indexvalue, setindexvalue] = useState(0);
 
  const Plans = [
    {
      id: 1,
      date: '1 Year',
      description: 'Pay for a full year',
      price: '299',
    },
    {
      id: 2,
      date: '6 Year',
      description: 'pay monthly, cancel anytime',
      price: '299',
    },
    {
      id: 3,
      date: '2 Year',
      description: 'pay monthly, cancel anytime',
      price: '299',
    },
  ];
  const renderPlans = ({item, index}) => {
    return (
      <TouchableOpacity
        style={{
          width: '95%',
          alignSelf: 'center',
          backgroundColor: '#F2EBFF',
          borderRadius: normalize(15),
          marginVertical: normalize(10),
          padding: normalize(13),
          flexDirection: 'row',
          justifyContent: 'space-between',
          borderWidth: indexvalue == index ? normalize(2) : normalize(0),
        }}
        onPress={() => {
          setindexvalue(index);
        }}>
        <View style={{flexDirection: 'row'}}>
          <View
            style={{
              height: normalize(15),
              width: normalize(15),
              borderRadius: normalize(20),
              borderWidth: normalize(1),
              alignItems: 'center',
              justifyContent: 'center',
            }}>
            {indexvalue == index ? (
              <View
                style={{
                  height: normalize(10),
                  width: normalize(10),
                  borderRadius: normalize(20),
                  backgroundColor: '#000000',
                }}
              />
            ) : null}
          </View>
          <View style={{marginLeft: normalize(10)}}>
            <Text
              style={{
                color: '#161616',
                fontSize: normalize(12),
                fontFamily: Fonts.PoppinsSemiBold,
              }}>
              {item?.date}
            </Text>
            <Text
              style={{
                color: '#161616',
                fontSize: normalize(11),
                fontFamily: Fonts.PoppinsRegular,
              }}>
              {item?.description}
            </Text>
          </View>
        </View>
        <View>
          <Text
            style={{
              color: '#5E17EB',
              fontFamily: Fonts.PoppinsSemiBold,
              fontSize: normalize(11),
            }}>
            <Text
              style={{
                color: '#5E17EB',
                fontFamily: Fonts.PoppinsRegular,
                fontSize: normalize(10),
              }}>
              $
            </Text>
            {item?.price}
            <Text
              style={{
                color: '#5E17EB',
                fontFamily: Fonts.PoppinsRegular,
                fontSize: normalize(10),
              }}>
              /m
            </Text>
          </Text>
          {indexvalue == index ? (
            <Image
              source={IMAGES.selectplan}
              style={{
                height: normalize(25),
                width: normalize(26),
                position: 'absolute',
                left: normalize(29),
                top: normalize(-13),
              }}
            />
          ) : null}
        </View>
      </TouchableOpacity>
    );
  };
 
  return (
    <>
      <MyStatusBar backgroundColor={'black'} barStyle={'light-content'} />

      <SafeAreaView style={{flex: 1}}>
        <View style={{backgroundColor: 'black'}}>
          <Header
            back_button
            back_img_source={IMAGES.Goback}
            LeftImagehght={normalize(20)}
            LeftImagewidth={normalize(20)}
            leftImagebackground={'white'}
            ImagePadding={normalize(5)}
            LeftImggborderradius={normalize(10)}
            gobackmarginLeft={normalize(10)}
            justifyContent={'space-between'}
            backmargintop={
              Platform.OS == 'android' ? normalize(20) : normalize(20)
            }
            text
            textRight={normalize(15)}
            title={'Subscription'}
            textcolor={'white'}
            textfont={Fonts.PoppinsMedium}
            textSize={normalize(17)}
            textAlign={'center'}
            RightImage
            textmartop={
              Platform.OS == 'android' ? normalize(20) : normalize(20)
            }
            onPress_back_button={() => {
              props.navigation.goBack();
            }}
          />
          <View style={{alignItems: 'center', justifyContent: 'center'}}>
            <Image
              source={IMAGES.Star}
              style={{
                height: normalize(45),
                width: normalize(45),
                marginVertical: normalize(20),
              }}
            />
            <View style={styles.viewDesign}>
              <Image source={IMAGES.Star2} style={styles.ImageDesin} />
              <Text style={styles.TextDesign}>
                Feature 1 dummy detail here{' '}
              </Text>
            </View>
            <View style={[styles.viewDesign, {marginTop: normalize(8)}]}>
              <Image source={IMAGES.Star2} style={styles.ImageDesin} />
              <Text style={styles.TextDesign}>
                Feature 1 dummy detail here{' '}
              </Text>
            </View>
            <View
              style={[
                styles.viewDesign,
                {marginTop: normalize(8), paddingBottom: normalize(20)},
              ]}>
              <Image source={IMAGES.Star2} style={styles.ImageDesin} />
              <Text style={styles.TextDesign}>
                Feature 1 dummy detail here{' '}
              </Text>
            </View>
          </View>
        </View>
        <FlatList
          data={Plans}
          renderItem={renderPlans}
          style={{marginTop: normalize(15)}}
        />
        <Button
          width={'95%'}
          backgroundColor={'black'}
          alignSelf={'center'}
          borderRadius={normalize(8)}
          titlesingle={true}
          title={'Make payment'}
          textColor={'white'}
          fontFamily={Fonts.PoppinsMedium}
          marginBottom={normalize(20)}
          fontSize={normalize(12)}
          // onPress={() => {
          //   setServiceModal(!ServiceModal);
          //   // Handle Start button action
          // }}
        />
       
      </SafeAreaView>
    </>
  );
}

export default Subscription;
const styles = StyleSheet.create({
  viewDesign: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  ImageDesin: {
    height: normalize(18),
    width: normalize(18),
  },
  TextDesign: {
    color: 'white',
    fontSize: normalize(11),
    marginLeft: normalize(4),
    fontFamily: Fonts.PoppinsMedium,
  },
  ViewStyle: {
    flexDirection: 'row',
    alignItems: 'center',
    marginLeft: normalize(10),
  },
  ViewDot: {
    height: normalize(5),
    width: normalize(5),
    borderRadius: normalize(5),
    backgroundColor: '#757575',
  },
  serViceText: {
    color: '#757575',
    fontSize: normalize(13),
    fontFamily: Fonts.PoppinsRegular,
    marginLeft: normalize(5),
  },
});
