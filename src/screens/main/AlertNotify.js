import React, { useEffect, useRef, useState } from 'react';
import {
  Dimensions,
  FlatList,
  Image,
  ImageBackground,
  Platform,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import MyStatusBar from '../../utils/MyStatusBar';
import normalize from '../../utils/helpers/normalize';
import { Fonts, IMAGES } from '../../themes/Themes';
import Carousel, { Pagination } from 'react-native-snap-carousel';
import FastImage from 'react-native-fast-image';
import Button from '../../components/Button';
const SLIDER_WIDTH = Dimensions.get('window').width + 30;
const ITEM_WIDTH = Math.round(SLIDER_WIDTH * 0.8);
const { height, width } = Dimensions.get('screen');
import Modal from 'react-native-modal'; ``
import { TouchableOpacity } from 'react-native';
import { CountdownCircleTimer } from 'react-native-countdown-circle-timer'
import { goBack, navigate } from '../../utils/RootNavigation';
import moment from 'moment';
import { useDispatch } from 'react-redux';
import { AcceptBookingRequest, RejectBookingRequest } from '../../redux/reducer/BookingReducer';


function AlertNotify(props) {
  // console.log("booking data-------->",typeof props.route.params.bookingData.details.details)

  const [notifyDetails, setnotyfyDetail] = useState(false);
  const modalref = useRef(null);
  const [currentIndex, setcurrentIndex] = useState(0);
  const [AcceptRequestModal, setAcceptRequestModal] = useState(false);
  const dispatch = useDispatch();
  const bookingData = props.route.params?.bookingData ?? null;
  const data=props.route.params?.bookingData?JSON.parse(bookingData.details):{}
  // console.log("booking data-------->000",Object.values(data.details))

  const RequestService = [
    {
      id: 1,
      image1: IMAGES.ongoing,
    },
    {
      id: 2,
      image1: IMAGES.ongoing,
    },
    {
      id: 2,
      image1: IMAGES.ongoing,
    },
  ];

  // const reasondescription = [
  //   ...data.details
  // ];

  const children = ({ remainingTime }) => {
    const minutes = Math.floor(remainingTime / 60)
    const seconds = remainingTime % 60
    return `${minutes}:${seconds.toString().padStart(2, "0")}`
  }

  const renderTime = (remainingTime) => {

    return (
      <View style={{ alignItems: 'center' }}>
        <Text
          style={{
            fontSize: 30,
            color: '#fff',
            fontFamily: Fonts.PoppinsBold,
          }}
        >{remainingTime}</Text>
      </View>
    );
  };

  const renderreasondescription = ({ item }) => {
    return (
      <View
        style={[
          styles.ViewStyle,
          {
            marginLeft: normalize(5),
            marginTop: normalize(5)
          },
        ]}>
        <View style={styles.ViewDot} />
        <Text style={styles.serViceText}>{item}</Text>
      </View>
    );
  };

  return (
    <View style={{ flex: 1, backgroundColor: '#5E17EB' }}>
      {notifyDetails ? (
        <SafeAreaView style={{ flex: 1, backgroundColor: '#5E17EB' }}>
          <MyStatusBar backgroundColor={'black'} barStyle={'light-content'} />
          <View style={{ padding: normalize(10), flex: 1 }}>
            <ScrollView style={{ flex: 1 }}>
              <Carousel
                // layout={'default'}
                ref={modalref}
                data={RequestService}
                sliderWidth={width}
                // windowSize={3}
                itemWidth={400}
                // inactiveSlideOpacity={1}
                onSnapToItem={index => setcurrentIndex(index)}
                autoplay={true}
                autoplayDelay={1000}
                autoplayInterval={3000}
                renderItem={({ item, index }) => (
                  <>
                    <ImageBackground
                      source={item.image1}
                      style={{
                        width: normalize(300),
                        height: normalize(180),
                        marginTop:
                          Platform.OS == 'ios' ? normalize(0) : normalize(20),
                      }}
                      resizeMode="stretch">
                      <View
                        style={{
                          position: 'absolute',
                          bottom: 0,
                          alignItems: 'center',
                          justifyContent: 'center',
                          alignSelf: 'center',
                          // :normalize(-20)
                        }}>
                        <Pagination
                          dotsLength={3}
                          activeDotIndex={currentIndex}
                          containerStyle={{}}
                          dotStyle={{
                            width: normalize(25),
                            height: normalize(5),
                            // borderRadius: normalize(5),
                            marginHorizontal: normalize(-7),

                            backgroundColor: 'rgba(140, 82, 255, 1)',
                          }}
                          inactiveDotStyle={{
                            width: normalize(25),
                            height: normalize(5),
                            // borderRadius: normalize(15),
                            backgroundColor: 'white',
                          }}
                          inactiveDotOpacity={0.9}
                          inactiveDotScale={0.7}
                        />
                      </View>
                    </ImageBackground>
                  </>
                )}
              />

              <Text
                style={{
                  color: 'white',
                  fontSize: normalize(19),
                  fontFamily: Fonts.PoppinsBold,
                  marginTop: normalize(25),
                }}>
                {bookingData?.serviceName}
              </Text>
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  marginTop: normalize(5),
                }}>
                {/* <Image
                  source={bookingData?.order_items[0]?.service_image_url}
                  style={{ height: normalize(15), width: normalize(15) }}
                /> */}
                <Text
                  style={{
                    color: 'white',
                    fontFamily: Fonts.PoppinsSemiBold,
                    fontSize: normalize(14),
                    marginLeft: normalize(5),
                  }}>
                  {`$ ${data.price} (${data.rating})`}
                </Text>
              </View>
              <Text
                style={{
                  color: 'white',
                  fontFamily: Fonts.PoppinsBold,
                  fontSize: normalize(20),
                  marginLeft: normalize(5),
                  marginTop: normalize(5),
                }}>
                {/* ${bookingData?.total} */}
              </Text>
              <FlatList
                data={Object.values(data.details)}
                renderItem={renderreasondescription}
                showsVerticalScrollIndicator={false}
              />
            </ScrollView>
          </View>
        </SafeAreaView>
      ) : (
        <>
          <MyStatusBar backgroundColor={'#5E17EB'} barStyle={'light-content'} />
          <ImageBackground source={IMAGES.background22} style={{ flex: 1 }}>
            <ScrollView>
              <View style={{ alignItems: 'center', justifyContent: 'center' }}>
                <Image
                  source={IMAGES.Bell}
                  style={{
                    height: normalize(35),
                    width: normalize(35),
                    marginTop: normalize(90),
                  }}
                />
                <Text
                  style={{
                    color: 'white',
                    fontSize: normalize(15),
                    fontFamily: Fonts.PoppinsBold,
                    marginTop: normalize(10),
                  }}>
                  New Request
                </Text>
                <View
                  style={{
                    flex: 1,
                    marginTop: '10%',
                  }}
                >
                  <CountdownCircleTimer
                    size={150}
                    isPlaying
                    duration={180}
                    isSmoothColorTransition={false}
                    colors={['#52B46B', '#FFA500', '#FF0000', '#FF0000']}
                    colorsTime={[180, 120, 60, 0]}
                    // colors={['#004777', '#F7B801', '#A30000', '#A30000']}
                    // colorsTime={[7, 5, 2, 0]}
                    strokeWidth={6}
                    onComplete={() => {
                      props.navigation.navigate('Home');
                    }}
                  >
                    {(remainingTime) => renderTime(children(remainingTime))}
                  </CountdownCircleTimer>
                </View>
              </View>
            </ScrollView>
            <TouchableOpacity
              style={{ alignItems: 'center', marginBottom: normalize(0) }}
              onPress={() => {
                setnotyfyDetail(true);
              }}>
              <Text
                style={{
                  color: 'white',
                  fontSize: normalize(12),
                  fontFamily: Fonts.PoppinsMedium,
                  //   textAlign: 'center',
                }}>
                Service detail
              </Text>
              <Image
                source={IMAGES.DownArrow2}
                style={{
                  height: normalize(20),
                  width: normalize(20),
                  tintColor: 'white',
                }}
                resizeMode="contain"
              />
            </TouchableOpacity>
          </ImageBackground>
        </>
      )}
      <Modal
        // avoidKeyboard
        animationIn={'slideInUp'}
        animationOut={'slideOutDown'}
        backdropTransitionOutTiming={0}
        hideModalContentWhileAnimating={true}
        isVisible={AcceptRequestModal}
        animationInTiming={800}
        animationOutTiming={800}
        onBackButtonPress={() => setAcceptRequestModal(false)}
        onBackdropPress={() => setAcceptRequestModal(false)}
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
            height: normalize(250),
            width: '100%',
            // justifyContent: 'center',
            // alignSelf: 'center',
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
              setAcceptRequestModal(!AcceptRequestModal);
            }}
          />
          <ScrollView>
            <View
              style={{
                alignItems: 'center',
                justifyContent: 'center',
                // marginVertical: normalize(20),
              }}>
              <Image
                source={IMAGES.Scooty}
                style={{ height: normalize(80), width: normalize(80) }}
              />
              <Text
                style={{
                  color: 'black',
                  fontSize: normalize(16),
                  fontFamily: Fonts.PoppinsBold,
                }}>
                Start with directions
              </Text>
              <Text
                style={{
                  color: 'black',
                  fontSize: normalize(14),
                  fontFamily: Fonts.PoppinsRegular,
                  textAlign: 'center',
                  marginTop: normalize(10),
                }}>
                Booking cannot be delayed once started you’ll get directions to
                client’s place
              </Text>
            </View>
          </ScrollView>

          <Button
            width={'95%'}
            titlesingle={true}
            alignSelf={'center'}
            fontSize={normalize(13)}
            fontFamily={Fonts.PoppinsMedium}
            title={'Start'}
            backgroundColor={'#52B46B'}
            textColor={'white'}
            borderRadius={normalize(10)}
            marginBottom={normalize(20)}
            onPress={() => {
              // props.navigation.navigate('ServiceOtp');
              props.navigation.navigate('MapViewPage');
              setAcceptRequestModal(!AcceptRequestModal);
            }}
          />
        </View>
      </Modal>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          marginHorizontal: normalize(10),
          marginVertical: normalize(30),
        }}>
        <Button
          width={'48%'}
          titlesingle={true}
          title={'Reject'}
          fontSize={normalize(13)}
          fontFamily={Fonts.PoppinsMedium}
          backgroundColor={'#EA3356'}
          borderRadius={normalize(10)}
          textColor={'white'}
          onPress={() => {
            dispatch(RejectBookingRequest({ order_id: bookingData?.uniq_order_id }));
            goBack()
          }}
        />
        <Button
          width={'48%'}
          titlesingle={true}
          fontSize={normalize(13)}
          fontFamily={Fonts.PoppinsMedium}
          title={'Accept'}
          backgroundColor={'#52B46B'}
          textColor={'white'}
          borderRadius={normalize(10)}
          onPress={() => {
            dispatch(AcceptBookingRequest({ order_id: bookingData?.uniq_order_id }));
            goBack()
            // setAcceptRequestModal(!AcceptRequestModal);
          }}
        />
      </View>
    </View>
  );
}

export default AlertNotify;
const styles = StyleSheet.create({
  ViewStyle: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  ViewDot: {
    height: normalize(5),
    width: normalize(5),
    borderRadius: normalize(5),
    backgroundColor: '#BFA2F7',
  },
  serViceText: {
    color: '#BFA2F7',
    fontSize: normalize(12),
    fontFamily: Fonts.PoppinsRegular,
    marginLeft: normalize(5),
  },
});
