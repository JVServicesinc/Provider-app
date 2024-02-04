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
import normalize from '../../utils/helpers/normalize';
import { Fonts, IMAGES } from '../../themes/Themes';
import NewTextInput from '../../components/NewTextInput';
import Button from '../../components/Button';
import Loader from '../../utils/helpers/Loader';
import { useIsFocused } from '@react-navigation/native';
import connectionrequest from '../../utils/helpers/NetInfo';
import { ProviderProfileRequest } from '../../redux/reducer/ProfileReducer';
import showErrorAlert from '../../utils/helpers/Toast';
import { useDispatch, useSelector } from 'react-redux';
import moment from 'moment';
import { FetchCancelledBookingList, FetchCompletedBookingList, FetchUpcomingBookingList } from '../../redux/reducer/BookingReducer';
let status
function Bookings(props) {
  const dispatch = useDispatch();
  const ProfileReducer = useSelector(state => state.ProfileReducer);
  const [Index, setIndex] = useState(0);
  const [Search, setSearch] = useState('');
  const BookingReducer = useSelector(state => state?.BookingReducer);
  const isFocused = useIsFocused();
  const [Loading, setloading] = useState(true);

  useEffect(() => {
    if (isFocused) {
      setloading(true);
      connectionrequest()
        .then(() => {
          dispatch(ProviderProfileRequest());
        })
        .catch(err => {
          showErrorAlert('Please connect to internet');
        });
    }
  }, [isFocused]);

  if (status == '' || ProfileReducer.status != status) {
    switch (ProfileReducer.status) {
      case 'Profile/ProviderProfileRequest':
        status = ProfileReducer.status;
        setloading(true);
        break;

      case 'Profile/ProviderProfileSuccess':
        status = ProfileReducer.status;

        ProfileReducer?.ProviderProfileResponse?.data?.onboarding_step_status ==
          'basic_registration_complete'
          ? props.navigation.navigate('SignUp2')
          : ProfileReducer?.ProviderProfileResponse?.data
            ?.onboarding_step_status == 'bank_complete'
            ? props.navigation.navigate('SignUp3')
            : ProfileReducer?.ProviderProfileResponse?.data
              ?.onboarding_step_status == 'aadhar_complete'
              ? props.navigation.navigate('PanDetail')
              : ProfileReducer?.ProviderProfileResponse?.data
                ?.onboarding_step_status == 'pan_complete'
                ? props.navigation.navigate('SinNumber')
                : '';
        setloading(false);
        break;
      case 'Profile/ProviderProfileFailure':
        status = ProfileReducer.status;
        setloading(false);
        break;
    }
  }

  const renderServiceData = ({ item }) => {
    return (
      <View
        style={{
          width: '100%',
          borderRadius: normalize(15),
          backgroundColor: '#F0F0F0',
          padding: normalize(14),
          marginVertical: normalize(10),
        }}>
        <Text
          style={{
            color: '#161616',
            fontSize: normalize(16),
            fontFamily: Fonts.PoppinsSemiBold,
          }}>
          {item?.customer_name}
        </Text>
        <Text
          style={{
            color: '#161616',
            fontFamily: Fonts.PoppinsMedium,
            fontSize: normalize(11),
          }}>
          {moment(item?.booking_date).format('MMMM Do YYYY, h:mm a')}
        </Text>

        {item?.line_items?.map((e, i) => {
          return (
            <View style={[style.ViewStyle, { marginTop: normalize(12) }]}>
              <View style={style.ViewDot} />
              <Text style={style.serViceText}>{e?.service_name}</Text>
            </View>
          )
        })}
        <Button
          width={'100%'}
          backgroundColor={'black'}
          borderRadius={normalize(10)}
          alignSelf={'center'}
          titlesingle={true}
          title={'View details'}
          textColor={'white'}
          fontFamily={Fonts.PoppinsMedium}
          marginTop={normalize(15)}
          marginBottom={normalize(15)}
          onPress={() => {
            props.navigation.navigate('BookingDetails', { data: item });
          }}
        />
      </View>
    );
  };

  const renderCancelledData = ({ item }) => {
    console.log(item, "---------item---------");
    return (
      <View
        style={{
          width: '100%',
          borderRadius: normalize(15),
          backgroundColor: '#F0F0F0',
          padding: normalize(14),
          marginVertical: normalize(10),
        }}>
        <Text
          style={{
            color: '#161616',
            fontSize: normalize(16),
            fontFamily: Fonts.PoppinsSemiBold,
          }}>
          {item?.customer_name}
        </Text>
        <Text
          style={{
            color: '#161616',
            fontFamily: Fonts.PoppinsMedium,
            fontSize: normalize(11),
          }}>
          {moment(item?.booking_date).format('MMMM Do YYYY, h:mm a')}
        </Text>
        {item?.line_items?.map((e, i) => {
          return (
            <View style={[style.ViewStyle, { marginTop: normalize(12) }]}>
              <View style={style.ViewDot} />
              <Text style={style.serViceText}>{e?.service_name}</Text>
            </View>
          )
        })}

        <View
          style={{
            width: '70%',
            backgroundColor: '#ABABAB',
            borderRadius: normalize(15),
            padding: normalize(5),
            marginTop: normalize(25),
          }}>
          <Text
            style={{
              color: 'white',
              fontFamily: Fonts.PoppinsRegular,
              fontSize: normalize(13),
              textAlign: 'center',
            }}>
            Reason for cancellation
          </Text>
        </View>
        <Text
          style={{
            color: '#757575',
            fontFamily: Fonts.PoppinsRegular,
            fontSize: normalize(13),
            marginTop: normalize(10),
            marginLeft: normalize(10),
          }}>
          The reason for cancellation  of booking willbe displayed here
        </Text>
      </View>
    );
  };

  useEffect(() => {
    if (Search != '') {
      setIndex(-1);
    } else {
      Index;
    }
  });

  useEffect(() => {
    connectionrequest()
      .then(() => {
        dispatch(FetchCompletedBookingList());
        dispatch(FetchCancelledBookingList());
        dispatch(FetchUpcomingBookingList());
      })
      .catch(err => {
        console.log('err', err);
        showErrorAlert('Please connect to internet');
      });
  }, [])

  const SearchData = [
    {
      id: 1,
      image: IMAGES.ongoing,
      title: 'Facial for glow',
      description: 'Harry S',
      time: '10 Apr, 02:30 pm',
    },
    {
      id: 2,
      image: IMAGES.ongoing,
      title: 'Facial for glow',
      description: 'Harry S',
      time: '10 Apr, 02:30 pm',
    },
    {
      id: 3,
      image: IMAGES.ongoing,
      title: 'Facial for glow',
      description: 'Harry S',
      time: '10 Apr, 02:30 pm',
    },
  ];
  const SearchItem = ({ item }) => {
    return (
      <View
        style={{
          flexDirection: 'row',
          padding: normalize(5),
          marginTop: normalize(10),
          alignItems: 'center',
        }}>
        <Image
          source={item.image}
          style={{ height: normalize(50), width: normalize(50) }}
        />
        <View style={{ marginLeft: normalize(10) }}>
          <Text
            style={{
              color: '#060606',
              fontFamily: Fonts.PoppinsMedium,
              fontSize: normalize(13),
              marginTop: normalize(5)
            }}>
            {item?.title}
          </Text>
          <Text
            style={{
              color: '#ABABAB',
              fontSize: normalize(12),
              fontFamily: Fonts.PoppinsMedium,
            }}>
            {item?.description}
          </Text>
          <Text
            style={{
              color: '#060606',
              fontFamily: Fonts.PoppinsSemiBold,
              fontSize: normalize(11),
            }}>
            {item?.time}
          </Text>
        </View>
      </View>
    );
  };
  return (
    <>
      <Loader visible={Loading} />
      <SafeAreaView style={{ flex: 1, backgroundColor: 'white' }}>
        <ScrollView
          style={{ flex: 1, backgroundColor: 'white' }}
          showsVerticalScrollIndicator={false}>
          {Search.length > 0 ? null : (
            <View
              style={{
                flexDirection: 'row',
                borderBottomColor: '#EBEBEB',
                borderBottomWidth: normalize(1),
                justifyContent: 'space-between',
                marginTop: Platform.OS == 'ios' ? normalize(30) : normalize(20),
                paddingHorizontal: normalize(20),
              }}>
              <TouchableOpacity
                onPress={() => {
                  setIndex(0);
                }}
                style={{
                  borderBottomColor: Index == 0 ? 'black' : '#EBEBEB',
                  borderBottomWidth: Index == 0 ? normalize(3) : normalize(0),
                  width: '30%',
                  alignItems: 'center',
                }}>
                <Text
                  style={{
                    color: Index == 0 ? 'black' : '#A2A2A2',
                    fontSize: normalize(13),
                    fontFamily: Fonts.PoppinsMedium,
                  }}>
                  Completed
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => {
                  setIndex(1);
                }}
                style={{
                  borderBottomColor: Index == 1 ? 'black' : '#EBEBEB',
                  borderBottomWidth: Index == 1 ? normalize(3) : normalize(0),
                  width: '30%',
                  alignItems: 'center',
                }}>
                <Text
                  style={{
                    color: Index == 1 ? 'black' : '#A2A2A2',
                    fontSize: normalize(13),
                    fontFamily: Fonts.PoppinsMedium,
                    textAlign: 'center'
                  }}>
                  Cancelled
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => {
                  setIndex(2);
                }}
                style={{
                  borderBottomColor: Index == 2 ? 'black' : '#EBEBEB',
                  borderBottomWidth: Index == 2 ? normalize(3) : normalize(0),
                  width: '30%',
                  alignItems: 'center',
                }}>
                <Text
                  style={{
                    color: Index == 1 ? 'black' : '#A2A2A2',
                    fontSize: normalize(13),
                    fontFamily: Fonts.PoppinsMedium,
                  }}>
                  Upcomming
                </Text>
              </TouchableOpacity>
            </View>
          )}

          <View style={{ padding: normalize(10) }}>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                marginVertical: normalize(5),
              }}>
              <NewTextInput
                width={Search.length > 0 ? '100%' : '83%'}
                borderColor={'#E3E3E3'}
                borderWidth={normalize(1)}
                borderRadius={normalize(10)}
                value={Search}
                imagemarleft={normalize(10)}
                onChange={txt => setSearch(txt)}
                textInputHight={normalize(40)}
                name={'Search by service name'}
                marginTop={Platform.OS == 'ios' ? normalize(0) : Search.length > 0 ? normalize(25) : normalize(0)}
                fontFamily={Fonts.PoppinsRegular}
                textwidth={normalize(170)}
                placeholderTextColor={'#757575'}
                textmarleft={normalize(5)}
                leftImage={true}
                inputicon={Search.length > 0 ? IMAGES.Goback : IMAGES.search}
                leftImagewidth={Search.length > 0 ? normalize(20) : normalize(20)}
                leftImageheight={
                  Search.length > 0 ? normalize(20) : normalize(20)
                }
              />
              {Search.length > 0 ? null : (
                <TouchableOpacity
                  style={{
                    borderColor: '#E3E3E3',
                    borderWidth: normalize(1),
                    alignItems: 'center',
                    borderRadius: normalize(15),
                    width: normalize(40),
                    justifyContent: 'center',
                  }}
                  onPress={() => {
                    props.navigation.navigate('Filter');
                  }}>
                  <Image
                    source={IMAGES.filter}
                    style={{ height: normalize(25), width: normalize(25) }}
                  />
                </TouchableOpacity>
              )}
            </View>
            {Index == 0 ? (
              <FlatList
                data={BookingReducer?.completeBookingList}
                renderItem={renderServiceData} />
            ) : Index == 1 ? (
              <FlatList
                data={BookingReducer?.CancelledBookingList}
                renderItem={renderCancelledData}
              />
            ) :
              Index == 2 ? (
                <FlatList
                  data={BookingReducer?.upcomingBookingList}
                  renderItem={renderServiceData}
                />
              ) :
                Search.length > 0 ? (
                  <FlatList data={SearchData} renderItem={SearchItem} />
                ) : null}
          </View>

        </ScrollView>
      </SafeAreaView>

    </>

  );
}

export default Bookings;
const style = StyleSheet.create({
  ViewStyle: {
    flexDirection: 'row',
    alignItems: 'center',
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
