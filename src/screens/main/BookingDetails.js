import React, { useEffect, useState } from 'react';
import {
  FlatList,
  Image,
  Platform,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import Header from '../../components/Header';
import { Fonts, IMAGES } from '../../themes/Themes';
import normalize from '../../utils/helpers/normalize';
import Button from '../../components/Button';
import Modal from 'react-native-modal';
import NewTextInput from '../../components/NewTextInput';
import { useIsFocused } from '@react-navigation/native';
import Loader from '../../utils/helpers/Loader';
import connectionrequest from '../../utils/helpers/NetInfo';
import { FetchEachBookingDetails } from '../../redux/reducer/BookingReducer';
import showErrorAlert from '../../utils/helpers/Toast';
import { useDispatch, useSelector } from 'react-redux';
import moment from 'moment';

function BookingDetails(props) {
  const [FeedbackModal, setFeedbackModal] = useState(false);
  const [title, settitle] = useState('');
  const [maxRating, setMaxRating] = useState([1, 2, 3, 4, 5]);
  const [description, setdescription] = useState('');
  const [defaultRating, setDefaultRating] = useState('');
  const BookingReducer = useSelector(state => state?.BookingReducer);
  const [Loading, setloading] = useState(false);
  const detailsData = [
    {
      id: 1,
      image: IMAGES.ongoing,
      title: 'Diamond Facial',
      time: '2 hrs',
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
  const isFocused = useIsFocused();
  const bookingDataDetails = props?.route?.params?.data;
  const dispatch = useDispatch()

  console.log(BookingReducer?.BookingDetails, "----------- booking -----------");

  useEffect(() => {
    if (isFocused) {
      dispatch(FetchEachBookingDetails(bookingDataDetails?.booking_id));
    }
  }, [isFocused]);


  const renderDetails = ({ item }) => {

    return (
      <View
        style={{
          borderWidth: normalize(1),
          borderColor: '#dbdbdb',
          borderRadius: normalize(10),
          width: '100%',

          alignSelf: 'center',
          padding: normalize(10),
          flexDirection: 'row',
          marginTop: normalize(15),
        }}>
        <Image
          source={{ uri: item.service_image }}
          style={{ height: normalize(60), width: normalize(60) }}
        />
        <View style={{ marginLeft: normalize(10) }}>
          <Text style={style.titlestyle}>{item?.service_name}</Text>
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <View style={style.ViewDot} />
            <Text style={[style.serViceText, { marginTop: normalize(5) }]}>
              {item?.service_duration}
            </Text>
          </View>
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <View style={style.ViewDot} />
            <Text style={style.serViceText}>{item?.service_desp}</Text>
          </View>
        </View>
      </View>
    );
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <Loader visible={Loading} />
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
        backmargintop={Platform.OS == 'android' ? normalize(50) : normalize(20)}
        text
        textRight={normalize(25)}
        title={bookingDataDetails?.customer_name}
        textcolor={'black'}
        textfont={Fonts.PoppinsSemiBold}
        textSize={normalize(15)}
        textAlign={'center'}
        RightImage
        textmartop={Platform.OS == 'android' ? normalize(50) : normalize(20)}
        onPress_back_button={() => {
          props.navigation.goBack();
        }}
        marginBottom={normalize(10)}
      />
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={{ padding: normalize(10) }}>
          <View
            style={{
              flexDirection: 'row',
              width: '100%',
              justifyContent: 'space-between',
              alignItems: 'center',
              marginTop: normalize(10),
            }}>
            <Text
              style={{
                width: normalize(60),
                color: '#161616',
                fontSize: normalize(12),
                fontFamily: Fonts.PoppinsSemiBold,
              }}>
              {moment(BookingReducer?.BookingDetails?.created_at).format('MMMM Do YYYY')}
            </Text>
            <Text
              style={{
                color: '#161616',
                fontFamily: Fonts.PoppinsSemiBold,
                fontSize: normalize(12),
              }}>
              {moment(BookingReducer?.BookingDetails?.created_at).format('h:mm a')}
            </Text>
          </View>

          <FlatList
            data={BookingReducer?.BookingDetails?.line_items}
            renderItem={renderDetails}
          />

          <View style={style.BillingView}>
            <View style={{ padding: normalize(10) }}>
              <Text style={style.BillingDetails}>Billing Details</Text>
              {BookingReducer?.BookingDetails?.line_items.map((item) => {
                return (
                  <View
                    style={[style.BillingViewDesign, { marginTop: normalize(15) }]}>
                    {console.log(item, "---------- item ---------")}
                    <Text style={style.BillingText}>{item?.service_name}</Text>
                    <Text style={style.BillingText}>{item?.unit_price}</Text>
                  </View>
                )
              })}
              <View
                style={[style.BillingViewDesign, { marginTop: normalize(5) }]}>
                <Text style={style.BillingText}>Convinience Fee</Text>
                <Text style={style.BillingText}>₹50</Text>
              </View>
              <View
                style={[style.BillingViewDesign, { marginTop: normalize(20) }]}>
                <Text style={style.gratndTotal}>Grand Total</Text>
                <Text style={style.gratndTotal}>{BookingReducer?.BookingDetails?.total}</Text>
              </View>
            </View>

            <View
              style={{
                backgroundColor: '#dbdbdb',
                flexDirection: 'row',
                justifyContent: 'space-between',
                width: '100%',
                padding: normalize(10),
                borderBottomLeftRadius: normalize(10),
                borderBottomRightRadius: normalize(10),
                marginTop: normalize(10),
              }}>
              <Text style={style.BillingText}>Payment mode</Text>
              <Text style={style.BillingText}>Cash</Text>
            </View>
          </View>
          <View style={[style.BillingView]}>
            <View style={{ flexDirection: 'row', padding: normalize(10) }}>
              <Image
                source={IMAGES.HomeImage}
                style={{ height: normalize(20), width: normalize(20) }}
              />
              <View style={{ marginLeft: normalize(5), marginTop: normalize(2) }}>
                <Text
                  style={{
                    color: '#161616',
                    fontFamily: Fonts.PoppinsMedium,
                    fontSize: normalize(12),
                  }}>
                  Home
                </Text>
                <Text
                  style={{
                    color: '#757575',
                    fontFamily: Fonts.PoppinsRegular,
                    fontSize: normalize(11),
                  }}>
                    {BookingReducer?.BookingDetails?.billing_address?.street_address} 
                  {" "}{BookingReducer?.BookingDetails?.billing_address?.city}{" "}
                  {BookingReducer?.BookingDetails?.billing_address?.province}{" "} 
                  {BookingReducer?.BookingDetails?.billing_address?.zip_code}{" "} 
                  </Text>
              </View>
            </View>

            <View
              style={{
                flexDirection: 'row',
                padding: normalize(10),
                alignItems: 'center',
              }}>
              <Image
                source={IMAGES.Clock}
                style={{ height: normalize(20), width: normalize(20) }}
              />

              <Text
                style={{
                  color: '#757575',
                  fontFamily: Fonts.PoppinsRegular,
                  fontSize: normalize(12),
                  marginLeft: normalize(5),
                }}>
                Sat, Apr 09 - 07:30 PM
              </Text>
            </View>
          </View>
          <Button
            width={'100%'}
            backgroundColor={'black'}
            borderRadius={normalize(10)}
            alignSelf={'center'}
            titlesingle={true}
            title={'Write feedback'}
            textColor={'white'}
            fontFamily={Fonts.PoppinsMedium}
            marginTop={normalize(40)}
            marginBottom={normalize(15)}
            onPress={() => {
              setFeedbackModal(!FeedbackModal);
            }}
          />
        </View>
      </ScrollView>
      <Modal
        // avoidKeyboard
        animationIn={'slideInUp'}
        animationOut={'slideOutDown'}
        backdropTransitionOutTiming={0}
        hideModalContentWhileAnimating={true}
        isVisible={FeedbackModal}
        animationInTiming={800}
        animationOutTiming={800}
        onBackButtonPress={() => setFeedbackModal(false)}
        onBackdropPress={() => setFeedbackModal(false)}
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

            backgroundColor: 'white',
            borderTopLeftRadius: normalize(20),
            borderTopRightRadius: normalize(20),
          }}>
          <Text
            style={{
              color: 'black',
              fontSize: normalize(12),
              marginTop: normalize(15),
              fontFamily: Fonts.PoppinsMedium,
              textAlign: 'center'
            }}>
            Give Your Feedback To User
          </Text>
          <ScrollView showsVerticalScrollIndicator={false}>
            <View style={{ padding: normalize(20) }}>
              <Text
                style={{
                  color: 'black',
                  fontSize: normalize(15),
                  fontFamily: Fonts.PoppinsMedium,
                }}>
                Title
              </Text>
              <NewTextInput
                width={'100%'}
                textwidth={'100%'}
                borderRadius={normalize(10)}
                value={title}
                onChange={settitle}
                // backgroundColor={COLORS.backgroundPink}
                marginTop={normalize(10)}
                name={'Title'}
                placeholderTextColor={'#79747E'}
                borderColor={'#79747E'}
                borderWidth={normalize(1)}
                fontFamily={Fonts.PoppinsMedium}
                textInputHight={normalize(40)}
                textmarleft={
                  Platform.OS == 'ios' ? normalize(10) : normalize(5)
                }
              // marginLeft={normalize(10)}
              />
              <Text
                style={{
                  color: 'black',
                  fontSize: normalize(15),
                  fontFamily: Fonts.PoppinsMedium,
                  marginTop: normalize(20),
                }}>
                Description
              </Text>
              <NewTextInput
                textAlignVertical={'top'}
                width={'100%'}
                textwidth={'90%'}
                borderRadius={normalize(10)}
                value={description}
                onChange={setdescription}
                // backgroundColor={COLORS.backgroundPink}
                marginTop={normalize(10)}
                name={'Description'}
                placeholderTextColor={'#79747E'}
                borderColor={'#79747E'}
                borderWidth={normalize(1)}
                fontFamily={Fonts.PoppinsMedium}
                textInputHight={normalize(90)}
                multiline={true}
                textmarleft={
                  Platform.OS == 'ios' ? normalize(10) : normalize(5)
                }
              // marginLeft={normalize(10)}
              />
              <Text
                style={{
                  color: 'black',
                  fontSize: normalize(15),
                  fontFamily: Fonts.PoppinsMedium,
                  marginTop: normalize(20),
                }}>
                Rate This User
              </Text>
              <View
                style={{
                  justifyContent: 'flex-start',
                  flexDirection: 'row',
                  marginTop: normalize(10),
                  // marginLeft: normalize(12),
                }}>
                {maxRating.map((item, key) => {
                  return (
                    <TouchableOpacity
                      activeOpacity={1}
                      key={item}
                      onPress={() => setDefaultRating(item)}
                      style={{
                        marginHorizontal: normalize(5),
                        flexDirection: 'row',
                      }}>
                      <Image
                        style={{ height: normalize(20), width: normalize(20) }}
                        // source={Icons.star}
                        source={
                          item <= defaultRating ? IMAGES.Star : IMAGES.star_grey
                        }
                      />
                    </TouchableOpacity>
                  );
                })}
              </View>
            </View>
          </ScrollView>
          <Text
            style={{
              color: 'black',
              fontSize: normalize(13),
              fontFamily: Fonts.PoppinsMedium,
              textAlign: 'center',
              marginBottom: normalize(10),
            }}>
            Once you submit!you can't change it
          </Text>
          <Button
            width={'90%'}
            backgroundColor={'#52B46B'}
            alignSelf={'center'}
            borderRadius={normalize(8)}
            titlesingle={true}
            title={'Submit'}
            textColor={'white'}
            fontFamily={Fonts.PoppinsMedium}
            marginBottom={normalize(20)}
            fontSize={normalize(12)}
            onPress={() => {
              setFeedbackModal(!FeedbackModal)
              // Handle Start button action
            }}
          />
        </View>
      </Modal>
    </SafeAreaView>
  );
}

export default BookingDetails;
const style = StyleSheet.create({
  gratndTotal: {
    fontSize: normalize(12),
    fontFamily: Fonts.PoppinsBold,
    color: '#161616',
  },
  BillingViewDesign: { flexDirection: 'row', justifyContent: 'space-between' },
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
