import React, {useState} from 'react';
import {SafeAreaView} from 'react-native-safe-area-context';
import Header from '../../components/Header';
import {Fonts, IMAGES} from '../../themes/Themes';
import normalize from '../../utils/helpers/normalize';
import {
  FlatList,
  Image,
  Platform,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import {ScrollView} from 'react-native';
import Button from '../../components/Button';
import Modal from 'react-native-modal';
function DelayBooking(props) {
  const [timeIndex, settimeIndex] = useState(0);
  const [reason, setreason] = useState('');
  const [indexvalue, setindexvalue] = useState();
  const [isButtonEnabled, setIsButtonEnabled] = useState(false);
  const [delayModal, setdelayModal] = useState(false);
  const reasonData = [
    {
      id: 1,
      title: 'A reason here for getting offline',
    },
    {
      id: 2,
      title:
        'A reason here for getting offline, a reason here for getting offline',
    },
    {
      id: 3,
      title: 'A reason here for getting offline',
    },
    {
      id: 4,
      title:
        'A reason here for getting offline, a reason here for getting offline',
    },
  ];
  const reasonrenderItem = ({item, index}) => {
    return (
      <TouchableOpacity
        style={{
          width: '95%',
          // alignSelf: 'center',

          marginVertical: normalize(10),
          paddingLeft: normalize(10),

          flexDirection: 'row',
          alignItems: 'center',
        }}
        onPress={() => {
          setindexvalue(index);
          setIsButtonEnabled(true);
        }}>
        <View
          style={{
            height: normalize(15),
            width: normalize(15),
            borderRadius: normalize(20),
            borderWidth: normalize(1),
            borderColor: indexvalue == index ? 'black' : '#757575',
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

        <Text
          style={{
            color: '#161616',
            fontSize: normalize(11),
            fontFamily: Fonts.PoppinsRegular,
            marginLeft: normalize(10),
          }}>
          {item?.title}
        </Text>
      </TouchableOpacity>
    );
  };
  const delayTime = [
    {
      id: 1,
      time: '15 mins',
    },
    {
      id: 2,
      time: '20 mins',
    },
    {
      id: 3,
      time: '30 mins',
    },
  ];
  const renderdelayTime = ({item, index}) => {
    return (
      <TouchableOpacity
        style={{
          width: normalize(100), // Width of each horizontal item
          // height: 100, // Height of each horizontal item
          borderColor: timeIndex == index ? '#5E17EB' : '#ECECEC',
          backgroundColor: timeIndex == index ? '#F2ECFD' : 'white',
          borderWidth: normalize(1),
          margin: normalize(10),
          justifyContent: 'center',
          alignItems: 'center',
          borderRadius: normalize(10),
          padding: normalize(10),
        }}
        onPress={() => {
          settimeIndex(index);
        }}>
        <Text
          style={{
            color: '#161616',
            fontFamily: Fonts.PoppinsMedium,
            fontSize: normalize(11),
          }}>
          {item?.time}
        </Text>
      </TouchableOpacity>
    );
  };
  const handleTextInputChange = txt => {
    setreason(txt);
    setIsButtonEnabled(txt.trim() !== ''); // Enable the button when there is text input
  };
  const detailsData = [
    {
      id: 1,
      image: IMAGES.ongoing,
      title: 'Gold Facial',
      time: '1 hr',
      info: 'Includes dummy info',
    },
    {
      id: 2,
      image: IMAGES.ongoing,
      title: 'Cleanup',
      time: '30 mins',
      info: 'Includes dummy info',
    },
  ];
  const renderDetails = ({item}) => {
    return (
      <View
        style={{
          borderWidth: normalize(1),
          borderColor: '#dbdbdb',
          borderRadius: normalize(10),
          width: '90%',

          alignSelf: 'center',
          padding: normalize(10),
          flexDirection: 'row',
          marginTop: normalize(15),
        }}>
        <Image
          source={item.image}
          style={{height: normalize(60), width: normalize(60)}}
        />
        <View style={{marginLeft: normalize(10)}}>
          <Text style={style.titlestyle}>{item?.title}</Text>
          <View style={{flexDirection: 'row', alignItems: 'center'}}>
            <View style={style.ViewDot} />
            <Text style={[style.serViceText, {marginTop: normalize(5)}]}>
              {item?.time}
            </Text>
          </View>
          <View style={{flexDirection: 'row', alignItems: 'center'}}>
            <View style={style.ViewDot} />
            <Text style={style.serViceText}>{item?.info}</Text>
          </View>
        </View>
      </View>
    );
  };
  return (
    <SafeAreaView style={{flex: 1, backgroundColor: 'white'}}>
      <Header
        back_button
        back_img_source={IMAGES.Goback}
        LeftImagehght={normalize(20)}
        LeftImagewidth={normalize(20)}
        leftImagebackground={'#dbdbdb'}
        marginBottom={normalize(10)}
        ImagePadding={normalize(5)}
        LeftImggborderradius={normalize(10)}
        gobackmarginLeft={normalize(10)}
        justifyContent={'space-between'}
        backmargintop={Platform.OS == 'android' ? normalize(50) : normalize(20)}
        text
        textRight={normalize(25)}
        title={'Delay Booking'}
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
      <ScrollView showsVerticalScrollIndicator={false}>
        <View
          style={{
            padding: normalize(12),
            width: '100%',
            backgroundColor: '#F3F3F3',
            marginTop: normalize(20),
          }}>
          <Text
            style={{
              color: '#757575',
              fontSize: normalize(11),
              fontFamily: Fonts.PoppinsSemiBold,
              textTransform: 'uppercase',
            }}>
            delay by
          </Text>
        </View>
        <FlatList
          data={delayTime}
          renderItem={renderdelayTime}
          keyExtractor={item => item.id}
          horizontal={true}
          showsHorizontalScrollIndicator={false}
        />
        <View
          style={{
            padding: normalize(12),
            width: '100%',
            backgroundColor: '#F3F3F3',
            marginTop: normalize(20),
          }}>
          <Text
            style={{
              color: '#757575',
              fontSize: normalize(11),
              fontFamily: Fonts.PoppinsSemiBold,
              textTransform: 'uppercase',
            }}>
            reason for delay
          </Text>
        </View>
        <FlatList data={reasonData} renderItem={reasonrenderItem} />
        <View
          style={{
            width: '95%',
            backgroundColor: '#F3F3F3',
            borderRadius: normalize(10),
            height: normalize(150),
            padding: normalize(10),
            margin: normalize(10),
            alignSelf: 'center',
          }}>
          <TextInput
            value={reason}
            onChangeText={txt => handleTextInputChange(txt)}
            placeholder="or comment here. . ."
            placeholderTextColor={'#757575'}
            multiline={true}
            style={{
              width: '100%',
              height: normalize(200),
              fontSize: normalize(12),
              color: 'black',
              fontFamily: Fonts.PoppinsRegular,
              height: normalize(130),
            }}
            textAlignVertical="top"
          />
        </View>
      </ScrollView>
      <Button
        width={'95%'}
        backgroundColor={isButtonEnabled ? 'black' : '#CCCCCC'}
        alignSelf={'center'}
        borderRadius={normalize(8)}
        titlesingle={true}
        title={'Submit'}
        textColor={'white'}
        fontFamily={Fonts.PoppinsMedium}
        fontSize={normalize(12)}
        marginBottom={normalize(20)}
        marginTop={normalize(20)}
        disabled={!isButtonEnabled}
        onPress={() => {
          // props.navigation.navigate('WithoutMask')
          setdelayModal(!delayModal);
        }}
      />

      <Modal
        // avoidKeyboard
        animationIn={'slideInUp'}
        animationOut={'slideOutDown'}
        backdropTransitionOutTiming={0}
        hideModalContentWhileAnimating={true}
        isVisible={delayModal}
        animationInTiming={800}
        animationOutTiming={800}
        onBackButtonPress={() => setdelayModal(false)}
        onBackdropPress={() => setdelayModal(false)}
        style={{
          margin: 0,
          bottom: 0,
          position: 'absolute',
          justifyContent: 'center',
          alignSelf: 'center',
          width: '100%',
        }}>
        {/* Request Service Modal Content */}
        <View
          style={{
            height: normalize(500),
            width: '100%',
            // justifyContent: 'center',
            alignSelf: 'center',
            backgroundColor: 'white',
            borderTopLeftRadius: normalize(20),
            borderTopRightRadius: normalize(20),
          }}>
          {/* Salon Info */}
          <TouchableOpacity
            style={{
              height: normalize(5),
              width: normalize(40),
              backgroundColor: 'rgba(171, 171, 171, 1)',
              alignSelf: 'center',
              borderRadius: normalize(10),
              marginTop: normalize(15),
            }}
            onPress={() => {
              setdelayModal(!delayModal);
            }}
          />
          <View
            style={{
              alignItems: 'center',
              justifyContent: 'center',
              marginVertical: normalize(20),
            }}>
            <Text
              style={{
                color: 'black',
                fontSize: normalize(14),
                fontFamily: Fonts.PoppinsMedium,
                width: normalize(180),
                textAlign: 'center',
                marginTop: normalize(10),
              }}>
              Booking will be delayed by 20 mins
            </Text>
            <Text
              style={{
                color: '#161616',
                fontSize: normalize(12),
                fontFamily: Fonts.PoppinsRegular,
               
                textAlign: 'center',
                // marginTop: normalize(10),
              }}>
           You can delay a service only once
            </Text>
          
          </View>
          <FlatList data={detailsData} renderItem={renderDetails} style={{marginTop:normalize(30)}} />
          <Button
        width={'90%'}
        backgroundColor={'#EA3356'}
        alignSelf={'center'}
        borderRadius={normalize(12)}
        titlesingle={true}
        title={'Delay now'}
        textColor={'white'}
        fontFamily={Fonts.PoppinsMedium}
        fontSize={normalize(12)}
        marginBottom={normalize(20)}
        marginTop={normalize(20)}
        disabled={!isButtonEnabled}
        onPress={() => {
          props.navigation.navigate('WithoutMask')
          setdelayModal(!delayModal);
        }}
      />
        </View>
      </Modal>
    </SafeAreaView>
  );
}

export default DelayBooking;
const style = StyleSheet.create({
  gratndTotal: {
    fontSize: normalize(12),
    fontFamily: Fonts.PoppinsBold,
    color: '#161616',
  },
  BillingViewDesign: {flexDirection: 'row', justifyContent: 'space-between'},
  BillingText: {
    color: '#161616',
    fontFamily: Fonts.PoppinsRegular,
    fontSize: normalize(12),
  },
  BillingDetails: {
    color: '#161616',
    fontSize: normalize(12),
    fontFamily: Fonts.PoppinsSemiBold,
    textDecorationLine: 'underline',
  },
  BillingView: {
    borderWidth: normalize(1),
    borderColor: '#dbdbdb',
    borderRadius: normalize(10),
    width: '100%',
    marginHorizontal: normalize(5),
    alignSelf: 'center',
    // padding: normalize(10),
    // flexDirection: 'row',
    marginTop: normalize(15),
  },
  ViewStyle: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  ViewDot: {
    height: normalize(4),
    width: normalize(4),
    borderRadius: normalize(5),
    backgroundColor: '#757575',
  },
  serViceText: {
    color: '#757575',
    fontSize: normalize(11),
    fontFamily: Fonts.PoppinsRegular,
    marginLeft: normalize(5),
  },
  titlestyle: {
    color: 'black',
    fontFamily: Fonts.PoppinsSemiBold,
    fontSize: normalize(12),
  },
});