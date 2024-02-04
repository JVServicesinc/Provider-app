import React, { Fragment, useEffect, useState } from 'react';
import {
  FlatList,
  Text,
  View,
  Image,
  Dimensions,
  TouchableOpacity,
  StyleSheet,
  Platform,
} from 'react-native';
import Modal from 'react-native-modal';

import PropTypes from 'prop-types';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import normalize from '../utils/helpers/normalize';
import { Fonts, IMAGES } from '../themes/Themes';
import connectionrequest from '../utils/helpers/NetInfo';
import { useDispatch, useSelector } from 'react-redux';
import { logoutRequest } from '../redux/reducer/AuthReducer';
import showErrorAlert from '../utils/helpers/Toast';
import {
  ChangeStatusRequest,
} from '../redux/reducer/ProfileReducer';

export default function DrawerMenu(props) {
  const dispatch = useDispatch();
  const ProfileReducer = useSelector(state => state.ProfileReducer);
  const [isEnabled, setIsEnabled] = useState(
    ProfileReducer?.ProviderProfileResponse?.data?.provider_status == 'online'
      ? true
      : false,
  );

  useEffect(() => {
    setIsEnabled(
      ProfileReducer?.ProviderProfileResponse?.data?.provider_status == 'online'
        ? true
        : false,
    );
  }, [ProfileReducer?.ProviderProfileResponse]);
  function onBackdropPress() {
    if (props.onBackdropPress) {
      props.onBackdropPress();
    }
  }
  const toggleSwitch = () => {
    if (isEnabled) {
      navigation.navigate('OfflineReason', {
      });
      onBackdropPress();
    } else {
      setIsEnabled(true);
      let obj = {
        status: 'online',
        reson: '',
      };
      connectionrequest()
        .then(() => {
          dispatch(ChangeStatusRequest(obj));
        })
        .catch(err => {
          showErrorAlert('Please connect to internet');
        });
    }
  };

  const navigation = useNavigation();
  const profileData = [
    {
      id: 0,
      icon: IMAGES.subscription,
      name: 'Subscription',
    },
    {
      id: 1,
      icon: IMAGES.ratecard,
      name: 'Rate Card',
    },
    {
      id: 2,
      icon: IMAGES.bank,
      name: 'Bank Details',
    },

    {
      id: 3,
      icon: IMAGES.rafer,
      name: 'Refer & Earn',
    },
    {
      id: 4,
      icon: IMAGES.rate,
      name: 'Rate us',
    },
    {
      id: 5,
      icon: IMAGES.aboutus,
      name: 'About JEveux',
    },
    {
      id: 6,
      icon: IMAGES.subscription,
      name: 'Language',
    },
    {
      id: 7,

      icon: IMAGES.logout,
      name: 'Logout',
    },
    {
      id: 8,
      icon: IMAGES.Notification22,
      name: 'NotificationAlert',
    },
    {
      id: 9,
      icon: IMAGES.subscription,
      name: 'Slots',
    },
  ];
  function menuRender({ item, index }) {
    return (
      <>
        <TouchableOpacity
          onPress={() => {
            index == 0 && navigation.navigate('Subscription'),
              onBackdropPress(),
              index == 1 && navigation.navigate('RateCard');
            index == 2 && navigation.navigate('BankDetails', onBackdropPress()),
              index == 3 &&
              navigation.navigate('Refer_Earn', onBackdropPress());
            index == 6 && navigation.navigate('Language'),
              index == 7 &&
              connectionrequest()
                .then(() => {
                  dispatch(logoutRequest());
                })
                .catch(err => {
                  showErrorAlert('Please connect to internet');
                });
            index == 8 && navigation.navigate('AlertNotify');
            index == 9 && navigation.navigate('Slots');
          }}
          style={{
            flexDirection: 'row',

            width: '100%',

            alignSelf: 'center',
            alignItems: 'center',
            marginTop: index == 0 ? normalize(10) : normalize(25),
          }}>
          <Image
            source={item?.icon}
            style={{
              height: normalize(20),
              width: normalize(20),
              marginHorizontal: normalize(20),
            }}
            resizeMode="contain"
          />
          <Text
            style={{
              color: 'white',
              fontSize: normalize(13),
              fontFamily: Fonts.PoppinsMedium,
            }}>
            {item?.name}
          </Text>
        </TouchableOpacity>
      </>
    );
  }

  return (
    <Modal
      animationIn={'fadeInLeftBig'}
      animationOut={'fadeOutLeftBig'}
      animationInTiming={700}
      animationOutTiming={700}
      backdropTransitionOutTiming={0}
      hideModalContentWhileAnimating={true}
      statusBarTranslucent={true}
      useNativeDriver={true}
      backdropOpacity={0.5}
      isVisible={props.modalVisible}
      style={{ margin: 0 }}
      onBackdropPress={() => onBackdropPress()}>
      <Fragment>
        <SafeAreaView
          style={{
            flex: 1,
            width: '80%',
            backgroundColor: 'black',
          }}>
          <View style={{ padding: normalize(15) }}>
            <TouchableOpacity
              onPress={() => {
                onBackdropPress();
              }}
              style={{
                marginTop: normalize(40),
              }}>
              {props.backArrow ? (
                <Image
                  source={props.back}
                  style={{ height: normalize(30), width: normalize(30) }}
                  resizeMode="contain"
                />
              ) :
                null}
            </TouchableOpacity>
            <Image
              source={IMAGES.demoprofile}
              style={{
                height: normalize(60),
                width: normalize(60),
                marginTop: normalize(25),
              }}
            />
            <Text
              style={{
                color: 'white',
                fontSize: normalize(15),
                fontFamily: Fonts.PoppinsMedium,
                marginTop: normalize(15),
              }}>
              {ProfileReducer?.ProviderProfileResponse?.data?.full_name}
            </Text>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
                marginTop: normalize(2),
              }}>
              <Text
                style={{
                  color: 'white',
                  fontSize: normalize(12),
                  fontFamily: Fonts.PoppinsRegular,
                }}>
                {ProfileReducer?.ProviderProfileResponse?.data?.mobile}
              </Text>
              <TouchableOpacity
                onPress={() => {
                  navigation.navigate('EditProfile'), onBackdropPress();
                }}>
                <Image
                  source={IMAGES.edit}
                  style={{ height: normalize(15), width: normalize(15) }}
                />
              </TouchableOpacity>
            </View>
            <TouchableOpacity
              style={[
                styles.container,
                {
                  backgroundColor: isEnabled ? '#52B46B' : '#757575',
                  alignItems: 'center',
                  flexDirection: 'row',
                  justifyContent: 'center',
                },
              ]}
              onPress={toggleSwitch}>
              <Text
                style={[
                  styles.label,
                  {
                    marginLeft: isEnabled ? normalize(0) : normalize(10),
                    marginRight: isEnabled ? normalize(10) : normalize(0),
                    marginTop:
                      Platform.OS == 'ios' ? normalize(0) : normalize(3),
                  },
                ]}>
                {isEnabled ? 'Online' : 'Offline'}
              </Text>
              <Image
                source={isEnabled ? IMAGES.toogle : IMAGES.offline}
                style={{
                  height: normalize(20),
                  width: normalize(20),
                  marginLeft: normalize(5),
                  marginRight: normalize(5),
                  position: 'absolute',
                  right: isEnabled ? 0 : null,
                  left: !isEnabled ? 0 : null,
                }}
              />
            </TouchableOpacity>
          </View>
          <View
            style={{
              borderBottomWidth: normalize(1),
              borderBottomColor: '#BFA2F7',
              marginVertical: normalize(15),
            }}
          />
          {props.data ? (
            <FlatList
              data={profileData}
              renderItem={menuRender}
              showsVerticalScrollIndicator={false}
              ListFooterComponent={() => {
                return <View style={{ height: normalize(30) }} />;
              }}
            />
          ) : null}
        </SafeAreaView>
      </Fragment>
    </Modal>
  );
}

DrawerMenu.propTypes = {
  modalVisible: PropTypes.bool,
  title: PropTypes.string,
  data: PropTypes.array,
  renderItem: PropTypes.func,
  onBackdropPress: PropTypes.func,
  onPressCross: PropTypes.func,
  profilePic: PropTypes.string,
  full_name: PropTypes.string,
  phone_no: PropTypes.string,
};

DrawerMenu.defaultProps = {
  modalVisible: false,
  title: '',
  data: [],
  renderItem: () => { },
  onBackdropPress: () => { },
  onPressCross: () => { },
  profilePic: '',
  full_name: '',
  phone_no: '',
};
const styles = StyleSheet.create({
  menutxt: {
    color: 'black',
    fontSize: normalize(12),
    fontFamily:
      Platform?.OS == 'ios' ? Fonts.PoppinsMedium : Fonts.PoppinsMedium,
    width: normalize(150),
  },
  container: {
    width: normalize(90), // Adjust the width as needed
    height: normalize(30), // Adjust the height as needed
    alignItems: 'center',
    borderRadius: 20,
    marginTop: normalize(13), // Half of the height to make it round
  },
  label: {
    fontSize: normalize(14),
    fontFamily: Fonts.PoppinsMedium,
    color: 'white',
  },
});
