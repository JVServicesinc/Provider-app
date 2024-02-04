import React, {useEffect, useRef, useState} from 'react';
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
import normalize from '../../utils/helpers/normalize';
import {Fonts, IMAGES} from '../../themes/Themes';
const SLIDER_WIDTH = Dimensions.get('window').width + 30;
import {TouchableOpacity} from 'react-native';
import {useIsFocused} from '@react-navigation/native';
import {useDispatch, useSelector} from 'react-redux';
import {ProviderProfileRequest} from '../../redux/reducer/ProfileReducer';
import connectionrequest from '../../utils/helpers/NetInfo';
import showErrorAlert from '../../utils/helpers/Toast';
import Loader from '../../utils/helpers/Loader';
let status;
function Wallet(props) {
  const dispatch = useDispatch();
  const ProfileReducer = useSelector(state => state.ProfileReducer);
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
  const walletHistory = [
    {
      id: 1,
      date: '05 FEB 2022',
      image: IMAGES.demoprofile,
      name: 'Recieved for Facial service',
      price: '+ ₹499',
      time: '11:58 am',
    },
    {
      id: 1,
      date: '05 FEB 2022',
      image: IMAGES.demoprofile,
      name: 'Money added to the wallet',
      price: '+ ₹1000',
      time: '09:43pm',
    },
  ];
  const WalletRender = ({item}) => {
    return (
      <>
        <Text
          style={{
            padding: normalize(10),
            fontSize: normalize(12),
            color: '#757575',
            fontFamily: Fonts.PoppinsBold,
            marginTop: normalize(10),
          }}>
          {item?.date}
        </Text>
        <View
          style={{
            width: '100%',
            backgroundColor: 'white',
            padding: normalize(10),
            marginTop: normalize(10),
            flexDirection: 'row',
            justifyContent: 'space-between',
          }}>
          <View style={{flexDirection: 'row', alignItems: 'center'}}>
            <Image
              source={item?.image}
              style={{height: normalize(50), width: normalize(50)}}
            />
            <View style={{marginLeft: normalize(10)}}>
              <Text
                style={{
                  color: '#161616',
                  fontSize: normalize(14),
                  fontFamily: Fonts.PoppinsMedium,
                  width: normalize(150),
                }}>
                {item?.name}
              </Text>
              <Text
                style={{
                  color: '#757575',
                  fontSize: normalize(12),
                  fontFamily: Fonts.PoppinsRegular,
                }}>
                {item?.time}
              </Text>
            </View>
          </View>
          <Text
            style={{
              color: '#52B46B',
              fontFamily: Fonts.PoppinsBold,
              fontSize: normalize(15),
            }}>
            {item?.price}
          </Text>
        </View>
      </>
    );
  };
  return (
    <>
      <Loader visible={Loading} />
      <SafeAreaView style={{flex: 1}}>
        <ScrollView style={{flex: 1}}>
          <View
            style={{
              width: '100%',
              backgroundColor: 'white',
              padding: normalize(10),
            }}>
            <View
              style={{
                width: '100%',
                backgroundColor: 'black',
                alignSelf: 'center',
                borderRadius: normalize(15),
                marginTop: Platform.OS == 'ios' ? normalize(0) : normalize(30),
              }}>
              <View style={{padding: normalize(20)}}>
                <Text
                  style={{
                    color: 'white',
                    fontSize: normalize(13),
                    fontFamily: Fonts.PoppinsMedium,
                  }}>
                  Wallet Balance
                </Text>
                <Text
                  style={{
                    color: 'white',
                    fontSize: normalize(25),
                    fontFamily: Fonts.PoppinsMedium,
                  }}>
                  ₹5,080
                </Text>
              </View>

              <View style={{flexDirection: 'row', width: '100%'}}>
                <TouchableOpacity
                  style={{
                    width: '50%',
                    backgroundColor: '#686868',
                    borderBottomLeftRadius: normalize(15),
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}
                  onPress={() => {
                    props.navigation.navigate('Depositmoney');
                  }}>
                  <Text
                    style={{
                      color: 'white',
                      fontFamily: Fonts.PoppinsMedium,
                      fontSize: normalize(12),
                      textTransform: 'uppercase',
                    }}>
                    Deposit money
                  </Text>
                </TouchableOpacity>
                <View
                  style={{
                    width: '50%',
                    backgroundColor: '#CFCFCF',
                    padding: normalize(15),
                    borderBottomRightRadius: normalize(15),
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}>
                  <Text
                    style={{
                      color: 'black',
                      fontFamily: Fonts.PoppinsMedium,
                      fontSize: normalize(12),
                      textTransform: 'uppercase',
                    }}>
                    Deposit money
                  </Text>
                </View>
              </View>
            </View>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                marginTop: normalize(35),
                marginBottom: normalize(10),
              }}>
              <Text
                style={{
                  color: 'black',
                  fontSize: normalize(17),
                  fontFamily: Fonts.PoppinsSemiBold,
                }}>
                Transaction history
              </Text>
              <View style={{flexDirection: 'row', alignItems: 'flex-end'}}>
                <Text
                  style={{
                    color: '#757575',
                    fontSize: normalize(15),
                    fontFamily: Fonts.PoppinsMedium,
                  }}>
                  Filter
                </Text>
                <Image
                  source={IMAGES.filter}
                  style={{
                    height: normalize(25),
                    width: normalize(25),
                    marginLeft: normalize(10),
                  }}
                />
              </View>
            </View>
          </View>
          <FlatList data={walletHistory} renderItem={WalletRender} />
        </ScrollView>
      </SafeAreaView>
    </>
  );
}

export default Wallet;
