import React, {useEffect, useState, useRef} from 'react';
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
  TouchableOpacity,
  View,
} from 'react-native';
import normalize from '../../utils/helpers/normalize';
import {Fonts, IMAGES} from '../../themes/Themes';
import LinearGradient from 'react-native-linear-gradient';
import Button from '../../components/Button';
import FastImage from 'react-native-fast-image';

import AsyncStorage from '@react-native-async-storage/async-storage';
import DrawerMenu from '../../components/DrawerMenu';
import Modal from 'react-native-modal';
import Carousel, {Pagination} from 'react-native-snap-carousel';
import {useDispatch, useSelector} from 'react-redux';
import connectionrequest from '../../utils/helpers/NetInfo';
import {ProviderProfileRequest} from '../../redux/reducer/ProfileReducer';
import showErrorAlert from '../../utils/helpers/Toast';
import {useTranslation} from 'react-i18next';
let status;

function Home(props) {
  const {t, i18n} = useTranslation();
  const dispatch = useDispatch();
  const ProfileReducer = useSelector(state => state.ProfileReducer);
  const [weekindex, setweekindex] = useState(0);
  const [modalVisible, setModalVisible] = useState(false);
  const SLIDER_WIDTH = Dimensions.get('window').width + 30;
  const {height, width} = Dimensions.get('screen');
  const [RequestModal, setRequestModal] = useState(false);
  const [currentIndex, setcurrentIndex] = useState(0);
  const modalref = useRef(null);
  const onGoingRef = useRef(null);

  useEffect(() => {
    connectionrequest()
      .then(() => {
        dispatch(ProviderProfileRequest());
      })
      .catch(err => {
        showErrorAlert('Please connect to internet');
      });
  }, []);

  useEffect(() => {
    if (currentIndex >= 0 && currentIndex < ImageIndex.length - 1) {
      onGoingRef.current = setTimeout(() => {
        setcurrentIndex(prevIndex =>
          prevIndex === ImageIndex.length - 1 ? 0 : prevIndex + 1,
        );
      }, 1000);
    } else {
      clearTimeout(onGoingRef.current);
    }
  });

  const ImageIndex = [
    {
      id: 1,
    },
    {
      id: 2,
    },
    {
      id: 3,
    },
  ];
  const _renderItem = ({item, index}) => {
    return (
      <View
        style={{
          width: '90%',
          backgroundColor: '#5E17EB',
          borderRadius: normalize(15),
          flexDirection: 'row',
        }}>
        <View style={{padding: normalize(10), marginLeft: normalize(10)}}>
          <Text
            style={{
              color: 'white',
              fontSize: normalize(22),
              fontFamily: Fonts.PoppinsSemiBold,
            }}>
            Now{' '}
            <Text
              style={{
                color: '#F5C443',
                fontSize: normalize(22),
                fontFamily: Fonts.PoppinsSemiBold,
              }}>
              earn
            </Text>
          </Text>
          <Text
            style={{
              color: 'white',
              fontSize: normalize(22),
              fontFamily: Fonts.PoppinsSemiBold,
              marginTop: normalize(-10),
            }}>
            even{' '}
            <Text
              style={{
                color: '#F5C443',
                fontSize: normalize(22),
                fontFamily: Fonts.PoppinsSemiBold,
              }}>
              more
            </Text>
          </Text>
          <Text
            style={{
              color: 'white',
              fontSize: normalize(12),
              fontFamily: Fonts.PoppinsRegular,
            }}>
            For every service{' '}
          </Text>
          <TouchableOpacity
            style={{
              width: '60%',
              height: normalize(25),
              backgroundColor: 'white',
              marginTop: normalize(15),
              borderRadius: normalize(20),
              justifyContent: 'center',
              marginBottom: normalize(5),
              zIndex: 99,
            }}>
            <Text
              style={{
                color: '#5E17EB',
                fontSize: normalize(10),
                fontFamily: Fonts.PoppinsExtraBold,
                textAlign: 'center',
              }}>
              CLICK HERE
            </Text>
          </TouchableOpacity>
        </View>
        <Image
          source={IMAGES.Hand}
          style={{
            height: normalize(150),

            width: '60%',
            position: 'absolute',
            right: 0,
            bottom: 0,
            top: normalize(-7),
            borderRadius: normalize(10),
          }}
          resizeMode="contain"
        />
      </View>
    );
  };

  const weekData = [
    {
      id: 1,
      name: 'this week',
    },
    {
      id: 2,
      name: 'this month',
    },
    {
      id: 3,
      name: 'this year',
    },
  ];
  const renderData = ({item, index}) => {
    return (
      <TouchableOpacity
        style={{
          backgroundColor: weekindex == index ? 'white' : 'transparent',
          paddingHorizontal: weekindex == index ? normalize(20) : normalize(10),
          paddingVertical: weekindex == index ? normalize(8) : normalize(0),
          borderRadius: normalize(20),
        }}
        onPress={() => {
          setweekindex(index);
        }}>
        <Text
          style={{
            color: weekindex == index ? '#161616' : 'white',
            fontSize: normalize(12),
            fontFamily: Fonts.PoppinsMedium,
          }}>
          {item?.name}
        </Text>
      </TouchableOpacity>
    );
  };
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
  const requestRenderItem = ({item, index}) => {
    return (
      <View
        style={{
          width: '100%',
          alignItems: 'center',
          justifyContent: 'center',
          alignSelf: 'center',
          padding: normalize(15),
          marginHorizontal: normalize(30),
        }}>
        <Image
          source={item?.image1}
          style={{height: normalize(170), width: '75%', alignSelf: 'center'}}
          resizeMode="stretch"
        />
      </View>
    );
  };

  const reasondescription = [
    {
      id: 1,
      title: '45 mins',
    },
    {
      id: 2,
      title: 'For all skin types. Pinacolada mask.',
    },
    {
      id: 3,
      title: '6-step process. Includes 10-min massage',
    },
  ];



  const renderreasondescription = ({item}) => {
    return (
      <View
        style={[
          styles.ViewStyle,
          {marginLeft: normalize(15), marginTop: normalize(5)},
        ]}>
        <View style={styles.ViewDot} />
        <Text style={styles.serViceText}>{item?.title}</Text>
      </View>
    );
  };
  useEffect(() => {
    async function Verify() {
      const popup = await AsyncStorage.getItem('popup');
      if (popup == null) {
        setVisible(true);
      }
    }
    Verify();
  }, []);

  const handleValueFromChild = value => {
    setVisible(false);
  };


  const navigateToMap = () => {
    props.navigation.navigate('MapViewPage');
  }


  return (
    <>
      <SafeAreaView style={{flex: 1, backgroundColor: 'white'}}>
        <View style={{padding: normalize(10), marginBottom: normalize(50)}}>
          <View style={styles.HeaderView}>
            <TouchableOpacity
              onPress={() => {
                setModalVisible(!modalVisible);
              }}>
              <Image source={IMAGES.Menu} style={styles.ImageView} />
            </TouchableOpacity>
            <View>
              <Text style={styles.Location}>{t('Location')}</Text>
              <View style={{flexDirection: 'row'}}>
                <Image
                  source={IMAGES.Location}
                  style={{height: normalize(20), width: normalize(20)}}
                />
                <Text style={styles.LocationText}>Ayodhya Nagar, Bhopal</Text>
              </View>
            </View>
            <TouchableOpacity
              onPress={() => {
                props.navigation.navigate('Notification');
              }}>
              <Image source={IMAGES.Notification} style={styles.ImageView} />
            </TouchableOpacity>
          </View>

          <ScrollView
            style={{flexGrow: 1}}
            nestedScrollEnabled={true}
            showsVerticalScrollIndicator={false}>
            <ImageBackground
              source={IMAGES.background}
              style={styles.ImageBackground}>
              {/* User Info */}
              <View
                style={{
                  width: '100%',
                  borderRadius: normalize(10),
                  backgroundColor: 'white',
                  paddingHorizontal: normalize(10),
                }}>
                <Text style={styles.nameText}>
                  Hello,{' '}
                  {ProfileReducer?.ProviderProfileResponse?.data?.full_name}
                </Text>
                <Image source={IMAGES.hii} style={styles.hiiImage} />
                <Text style={styles.jobsToday}>
                  You’ve completed 3 jobs today!
                </Text>
              </View>
            </ImageBackground>

            <Text style={styles.onGoingText}>Ongoing service</Text>

            <ImageBackground
              resizeMode="stretch"
              source={IMAGES.ongoing}
              style={{
                height: normalize(270),
                width: '100%',
                marginTop: Platform.OS == 'ios' ? normalize(10) : normalize(5),
              }}>
              <LinearGradient
                colors={['rgba(0, 0, 0, 0)', 'rgba(22, 22, 22, 1)']}
                style={{
                  width: '100%',
                  height: normalize(100),
                  bottom: 0,
                  position: 'absolute',
                  borderRadius: normalize(20),
                }}
              />
              <View
                style={{
                  width: '40%',
                  padding: normalize(8),
                  borderRadius: normalize(20),
                  backgroundColor: 'rgba(22, 22, 22, 0.5)',
                  marginTop: normalize(20),
                  marginLeft: normalize(20),
                }}>
                <Text
                  style={{
                    color: 'rgba(255, 255, 255, 1)',
                    textAlign: 'center',
                    fontFamily: Fonts.PoppinsMedium,
                    fontSize: normalize(13),
                  }}>
                  Facial for glow
                </Text>
              </View>
              {/* Additional Service Info */}
              <View style={{position: 'absolute', bottom: normalize(30)}}>
                <View
                  style={{
                    flexDirection: 'row',
                    marginLeft: normalize(20),
                    alignItems: 'center',
                  }}>
                  <View style={styles.serviceName} />
                  <Text style={styles.cleanup}>Clean up</Text>
                </View>

                <View
                  style={{
                    flexDirection: 'row',
                    marginLeft: normalize(20),
                    alignItems: 'center',
                    marginTop:
                      Platform.OS == 'ios' ? normalize(0) : normalize(-5),
                  }}>
                  <View style={styles.serviceName} />
                  <Text style={styles.cleanup}>Gold Facial</Text>
                </View>
              </View>
              <Text
                style={{
                  marginLeft: normalize(20),
                  color: '#E3E3E3',
                  fontSize: normalize(12),
                  position: 'absolute',
                  bottom: normalize(10),
                  fontFamily: Fonts.PoppinsRegular,
                }}>
                45 mins
              </Text>
              {/* Action Buttons */}
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'flex-end',
                  justifyContent: 'flex-end',
                  position: 'absolute',
                  bottom: normalize(20),
                  right: normalize(10),
                }}>
                <TouchableOpacity
                  onPress={() => {
                    setRequestModal(!RequestModal);
                  }}>
                  <Image
                    source={IMAGES.Delay}
                    style={{height: normalize(40), width: normalize(40)}}
                  />
                </TouchableOpacity>
                {/* !!!maps button here */}
                <TouchableOpacity
                 onPress={navigateToMap}>
                  <Image
                    source={IMAGES.Journey}
                    style={{
                      height: normalize(40),
                      width: normalize(40),
                      marginLeft: normalize(10),
                    }}
                  />
                </TouchableOpacity>
              </View>
            </ImageBackground>

            {/* Rest of the content */}
            {/* ... */}
            <View
              style={{
                width: '100%',
                alignSelf: 'center',
                marginTop: normalize(20),
              }}>
              <Carousel
                ref={onGoingRef}
                renderItem={_renderItem}
                data={ImageIndex}
                sliderWidth={width}
                itemWidth={400}
                inactiveSlideOpacity={0}
                autoplay={true}
                autoplayDelay={1000}
                autoplayInterval={3000}
                loop={true}
                showsPageIndicator={true}
              />
              <Pagination
                dotsLength={3}
                activeDotIndex={currentIndex}
                containerStyle={{}}
                dotStyle={{
                  width: normalize(25),
                  height: normalize(5),
                  borderRadius: normalize(5),
                  marginHorizontal: normalize(-7),
                  backgroundColor: 'rgba(140, 82, 255, 1)',
                }}
                inactiveDotStyle={{
                  width: normalize(10),
                  height: normalize(10),
                  borderRadius: normalize(15),
                  backgroundColor: 'rgba(191, 162, 247, 1)',
                }}
                inactiveDotOpacity={0.4}
                inactiveDotScale={0.6}
              />

              <FlatList
                data={weekData}
                renderItem={renderData}
                contentContainerStyle={{
                  backgroundColor: '#8C52FF',
                  width: '100%',
                  borderRadius: normalize(20),
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  paddingHorizontal: normalize(20),
                  paddingVertical: normalize(10),
                  marginTop: normalize(10),
                  alignItems: 'center',
                }}
              />
              <Image
                source={IMAGES.Graph}
                style={{
                  width: '100%',
                  height: normalize(200),
                  marginTop: normalize(20),
                }}
                resizeMode="contain"
              />
              <Text
                style={{
                  color: 'black',
                  fontFamily: Fonts.PoppinsBold,
                  textAlign: 'center',
                  fontSize: normalize(15),
                  marginVertical: normalize(20),
                }}>
                Productivity graph
              </Text>
            </View>
          </ScrollView>

          {/* Drawer Menu */}
          <DrawerMenu
            modalVisible={modalVisible}
            onBackdropPress={() => setModalVisible(!modalVisible)}
            data={true}
            backArrow={true}
            back={IMAGES.cross}
            headerText={true}
          />
        </View>

        {/* Request Service Modal */}
        <Modal
          animationIn={'slideInUp'}
          animationOut={'slideOutDown'}
          backdropTransitionOutTiming={0}
          hideModalContentWhileAnimating={true}
          isVisible={RequestModal}
          animationInTiming={800}
          animationOutTiming={800}
          onBackButtonPress={() => setRequestModal(false)}
          onBackdropPress={() => setRequestModal(false)}
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
              justifyContent: 'center',
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
                setRequestModal(!RequestModal);
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
                }}>
                Salon for women
              </Text>
            </View>

            <FlatList
              data={reasondescription}
              renderItem={renderreasondescription}
              showsVerticalScrollIndicator={false}
              nestedScrollEnabled={true}
              style={{flex: 1}}
              ListHeaderComponent={() => {
                return (
                  <>
                    <Carousel
                      ref={modalref}
                      data={RequestService}
                      sliderWidth={width}
                      windowSize={3}
                      itemWidth={300}
                      autoplay={false}
                      renderItem={({item, index}) => (
                        <FastImage
                          source={item.image1}
                          style={{
                            width: normalize(250),
                            height: normalize(150),
                            alignSelf: 'center',
                          }}
                          resizeMode="stretch"
                        />
                      )}
                    />

                    <View style={{padding: normalize(10)}}>
                      <Text
                        style={{
                          color: 'black',
                          fontFamily: Fonts.PoppinsBold,
                          fontSize:
                            Platform.OS == 'ios'
                              ? normalize(15)
                              : normalize(13),
                          marginTop: normalize(10),
                          marginLeft:
                            Platform.OS == 'ios' ? normalize(0) : normalize(5),
                        }}>
                        Service name
                      </Text>
                      <View
                        style={{flexDirection: 'row', alignItems: 'center'}}>
                        <Image
                          source={IMAGES.Star2}
                          style={{
                            height: normalize(20),
                            width: normalize(20),
                            tintColor: '#F5C443',
                          }}
                        />
                        <Text
                          style={{
                            color: '#161616',
                            fontFamily: Fonts.PoppinsMedium,
                            fontSize: normalize(11),
                            marginLeft: normalize(2),
                          }}>
                          4.8(23K)
                        </Text>
                      </View>
                      <Text
                        style={{
                          color: '#5E17EB',
                          fontFamily: Fonts.PoppinsBold,
                          fontSize: normalize(12),
                          marginLeft: normalize(5),
                          marginTop: normalize(4),
                        }}>
                        ₹499
                      </Text>
                    </View>
                  </>
                );
              }}
            />
            {/* Action Buttons */}
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'space-between',
                marginVertical: normalize(20),
                marginHorizontal: normalize(15),
              }}>
              <Button
                width={'47%'}
                backgroundColor={'black'}
                alignSelf={'center'}
                borderRadius={normalize(8)}
                titlesingle={true}
                title={'Delay'}
                textColor={'white'}
                fontFamily={Fonts.PoppinsMedium}
                fontSize={normalize(12)}
                onPress={() => {
                  props.navigation.navigate('DelayBooking');
                  setRequestModal(!RequestModal);
                }}
              />
              <Button
                width={'47%'}
                backgroundColor={'#52B46B'}
                alignSelf={'center'}
                borderRadius={normalize(8)}
                titlesingle={true}
                title={'Start'}
                textColor={'white'}
                fontFamily={Fonts.PoppinsMedium}
                fontSize={normalize(12)}
                onPress={() => {
                  // Handle Start button action
                }}
              />
            </View>
          </View>
        </Modal>
      </SafeAreaView>
    </>
  );
}

export default Home;
const styles = StyleSheet.create({
  serviceName: {
    height: normalize(6),
    width: normalize(6),
    backgroundColor: 'white',
    borderRadius: normalize(10),
  },
  loaderContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    width: '100%',
    height: '100%',
  },

  HeaderView: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: Platform.OS == 'ios' ? normalize(0) : normalize(10),
  },
  ImageView: {height: normalize(35), width: normalize(35)},
  LocationText: {
    color: '#161616',
    fontFamily: Fonts.PoppinsBold,
    fontSize: normalize(12),
    marginTop: normalize(2),
  },
  Location: {
    color: '#757575',
    fontSize: normalize(12),
    fontFamily: Fonts.PoppinsRegular,
    textAlign: 'center',
  },
  ImageBackground: {
    height: normalize(70),
    width: '100%',
    backgroundColor: 'black',
    marginTop: normalize(20),
    borderRadius: normalize(15),
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: normalize(10),
  },
  hiiImage: {
    height: normalize(20),
    width: normalize(20),
    alignSelf: 'flex-end',
    position: 'absolute',
    top: normalize(15),
    right: normalize(15),
  },
  jobsToday: {
    color: '#757575',
    fontFamily: Fonts.PoppinsRegular,
    fontSize: normalize(12),
    marginBottom: normalize(5),
  },
  nameText: {
    color: '#161616',
    fontSize: normalize(12),
    fontFamily: Fonts.PoppinsSemiBold,
    marginTop: normalize(10),
  },
  onGoingText: {
    color: '#161616',
    fontSize: normalize(14),
    fontFamily: Fonts.PoppinsSemiBold,
    marginTop: Platform.OS == 'ios' ? normalize(25) : normalize(20),
  },
  gradient: {
    justifyContent: 'center',
    alignItems: 'center',
  },

  cleanup: {
    color: 'white',
    fontSize: normalize(15),
    fontFamily: Fonts.PoppinsMedium,
    marginLeft: normalize(8),
  },
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
    fontSize: normalize(12),
    fontFamily: Fonts.PoppinsRegular,
    marginLeft: normalize(5),
  },
});
