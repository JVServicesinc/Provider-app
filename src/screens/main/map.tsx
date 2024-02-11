import React, {useEffect, useState} from 'react';
import {
  Alert,
  FlatList,
  Image,
  ImageSourcePropType,
  Linking,
  Platform,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  ToastAndroid,
  TouchableOpacity,
  View,
} from 'react-native';
import MapView, {Marker, Polyline} from 'react-native-maps';
import {io} from 'socket.io-client';
import {PermissionsAndroid} from 'react-native';
import Geolocation from 'react-native-geolocation-service';
import {check, PERMISSIONS, request, RESULTS} from 'react-native-permissions';
import normalize from '../../utils/helpers/normalize';
import {Fonts, IMAGES} from '../../themes/Themes';
import Header from '../../components/Header';
import Modal from 'react-native-modal';
import Button from '../../components/Button';

const socket = io('http://159.203.18.75:3000');
const MAP_PLATFROM_TYPE = Platform.OS === 'android' ? 'terrain' : 'standard';
const PROVIDER_GOOGLE = 'google';

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: '100%',
  },
  safeArea: {
    width: '100%',
    height: '100%',
  },
  mapContainer: {
    width: '100%',
    height: '50%',
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

type CurrentRegion = {
  latitude: number;
  longitude: number;
  latitudeDelta: number;
  longitudeDelta: number;
  heading: number | null;
};

export const MapScreen = (props: {
  navigation: {goBack: () => void; navigate: (arg0: string) => void};
}) => {
  const [directions, setDirections] = useState<any[]>([]);
  const [currentRegion, setCurrentRegion] = useState<CurrentRegion>();
  const [timerCount, setTimerCount] = useState(0);
  const [customerModal, setcustomerModal] = useState(false);

  useEffect(() => {
    if (Platform.OS == 'android') {
      requestLocationPermission();
    } else {
      checkLocationPermission();
    }

    handleDirections();
    connectSocket();

    // const interval = setInterval(() => {
    //   setTimerCount(timerCount => timerCount + 1);
    //   getCurrentLocation();
    //   // sendCurrentLocation();
    //   // printSocketLiveLocationUpdate();
    // }, 10 * 1000);

    return () => {
      // clearInterval(interval);
    };
  }, []);

  const checkLocationPermission = async () => {
    const result = await check(PERMISSIONS.IOS.LOCATION_WHEN_IN_USE);
    switch (result) {
      case RESULTS.UNAVAILABLE:
        console.log(
          'This feature is not available (on this device / in this context)',
        );
        break;
      case RESULTS.DENIED:
        const newResult = await request(PERMISSIONS.IOS.LOCATION_WHEN_IN_USE);
        console.log(
          'The permission has not been requested / is denied but requestable',
          newResult,
        );
        break;
      case RESULTS.LIMITED:
        console.log('The permission is limited: some actions are possible');
        break;
      case RESULTS.GRANTED:
        console.log('The permission is granted');
        break;
      case RESULTS.BLOCKED:
        console.log('The permission is denied and not requestable anymore');
        break;
    }
  };
  function printSocketLiveLocationUpdate() {
    socket.on('live-data-updated', data => {
      console.log('Live data updated ===> ', data);
    });
  }

  const requestLocationPermission = async () => {
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
        {
          title: 'Location Permission',
          message: 'App needs access to your location',
          buttonNeutral: 'Ask Me Later',
          buttonNegative: 'Cancel',
          buttonPositive: 'OK',
        },
      );
      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        ToastAndroid.show('Location permission granted', ToastAndroid.SHORT);
        console.log('You can access location');
        getCurrentLocation();
      } else {
        // code of element to grant location
        ToastAndroid.show('Location permission denied', ToastAndroid.SHORT);
        console.log('Location permission denied');
        handleLocationPermissionDenied();
      }
    } catch (err) {
      console.warn(err);
    }
  };

  function handleLocationPermissionDenied() {
    Alert.alert(
      'Location Permission Denied',
      'This app needs location permissions to function properly. You can grant them in app settings.',
      [
        {
          text: 'Cancel',
          style: 'cancel',
        },
        {text: 'Open Settings', onPress: openAppSettings},
      ],
    );
  }

  function openAppSettings() {
    Linking.openSettings().catch(() => {
      Alert.alert('Unable to open settings');
    });
  }

  function sendCurrentLocation() {
    getCurrentLocation();
    socket.emit('update-live-data', {
      latitude: currentRegion?.latitude,
      longitude: currentRegion?.longitude,
    });
    printSocketLiveLocationUpdate();
  }

  function getCurrentLocation() {
    Geolocation.getCurrentPosition(
      //Geolocation
      position => {
        // console.log('position -- ',position);
        let currentRegion = {
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
          latitudeDelta: 0.01,
          longitudeDelta: 0.01,
          heading: position?.coords.heading,
        };
        console.log('currentRegion -- ', currentRegion);

        setCurrentRegion(currentRegion);
      },
      error => {
        console.log('error : ', error);
      },
      {
        // enableHighAccuracy: false,
        // timeout: 200000,
        // maximumAge: 3600000,
        enableHighAccuracy: true,
        timeout: 3000,
        // maximumAge: 10000,
      },
    );
  }

  const decodePolyline = (encoded: any) => {
    const points = [];
    let index = 0,
      lat = 0,
      lng = 0;

    while (index < encoded.length) {
      let b,
        shift = 0,
        result = 0;
      do {
        b = encoded.charCodeAt(index++) - 63;
        result |= (b & 0x1f) << shift;
        shift += 5;
      } while (b >= 0x20);

      const dlat = (result & 1) !== 0 ? ~(result >> 1) : result >> 1;
      lat += dlat;

      shift = 0;
      result = 0;
      do {
        b = encoded.charCodeAt(index++) - 63;
        result |= (b & 0x1f) << shift;
        shift += 5;
      } while (b >= 0x20);

      const dlng = (result & 1) !== 0 ? ~(result >> 1) : result >> 1;
      lng += dlng;

      points.push({latitude: lat / 1e5, longitude: lng / 1e5});
    }
    return points;
  };

  const handleDirections = () => {
    // Fetch directions from Google Maps Directions API
    // Replace 'YOUR_GOOGLE_MAPS_API_KEY' with your actual API key
    // const origin = `${'17.3676'},${'78.5246'}`;
    // const destination = `${'17.4374'},${'78.4487'}`;

    const origin = '17.3676,78.5246';
    const destination = '17.4374,78.4487';

    fetch(
      `https://maps.googleapis.com/maps/api/directions/json?origin=${origin}&destination=${destination}&key=AIzaSyDJzLxbnSawJABJlKpUpopVZGt9Adp08uQ`,
    )
      .then(response => response.json())
      .then(data => {
        // console.log("Routes Data -- ", data);
        if (data.routes.length > 0) {
          const route = data.routes[0].overview_polyline.points;
          const decodedRoute = decodePolyline(route);
          // console.log("Decode Polyline -- ", decodedRoute);

          setDirections(decodedRoute);
        } else {
          // console.log('No Routes Found -- ', origin, destination);
        }
      })
      .catch(error => {
        console.error('Error fetching directions:', error);
      });
  };

  const connectSocket = () => {
    socket.on('connect', () => {
      console.log('Connected to socket server');
    });
  };

  const renderDetails = ({
    item,
  }: {
    item: {
      image: ImageSourcePropType;
      title: string;
      time: string;
      info: string;
    };
  }) => {
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
          source={item.image}
          style={{height: normalize(60), width: normalize(60)}}
        />
        <View style={{marginLeft: normalize(10)}}>
          <Text style={styles.titlestyle}>{item?.title}</Text>
          <View style={{flexDirection: 'row', alignItems: 'center'}}>
            <View style={styles.ViewDot} />
            <Text style={[styles.serViceText, {marginTop: normalize(2)}]}>
              {item?.time}
            </Text>
          </View>
          <View style={{flexDirection: 'row', alignItems: 'center'}}>
            <View style={styles.ViewDot} />
            <Text style={styles.serViceText}>{item?.info}</Text>
          </View>
        </View>
      </View>
    );
  };

  {
    /* OLD MAP VIEW CODE*/
  }
  {
    /*<MapView*/
  }
  {
    /*  style={{height: '100%', width: '100%'}}*/
  }
  {
    /*  initialRegion={{*/
  }
  {
    /*    latitude: 37.78825,*/
  }
  {
    /*    longitude: -122.4324,*/
  }
  {
    /*    latitudeDelta: 0.0922,*/
  }
  {
    /*    longitudeDelta: 0.0421,*/
  }
  {
    /*  }}*/
  }
  {
    /*/>*/
  }

  return (
    <View style={{flex: 1}}>
      {/* NEW MAP VIEW SECTION */}
      <MapView
        style={{flex: 1}}
        mapType={MAP_PLATFROM_TYPE}
        provider={PROVIDER_GOOGLE}
        initialRegion={{
          latitude: 17.3676,
          longitude: 78.5246,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        }}>
        <Marker
          coordinate={{
            latitude: 17.3676,
            longitude: 78.5246,
          }}
          title="Origin"
        />
        <Marker
          coordinate={{
            latitude: 17.4374,
            longitude: 78.4487,
          }}
          title="Destination"
        />
        {directions && (
          <Polyline
            coordinates={directions}
            strokeWidth={5}
            strokeColor="#4285F4" // Choose your desired color
          />
        )}
      </MapView>

      <View style={{position: 'absolute'}}>
        <Header
          back_button
          back_img_source={IMAGES.Goback}
          LeftImagehght={normalize(20)}
          LeftImagewidth={normalize(20)}
          leftImagebackground={'white'}
          ImagePadding={normalize(5)}
          LeftImggborderradius={normalize(10)}
          gobackmarginLeft={normalize(10)}
          backmargintop={normalize(50)}
          onPress_back_button={() => {
            props.navigation.goBack();
          }}
          marginBottom={normalize(10)}
        />
      </View>
      <TouchableOpacity
        style={{
          width: '95%',
          backgroundColor: 'white',
          borderRadius: normalize(10),
          position: 'absolute',
          bottom: normalize(50),
          alignSelf: 'center',
          padding: normalize(10),
          flexDirection: 'row',
          alignItems: 'center',
        }}
        onPress={() => {
          setcustomerModal(!customerModal);
        }}>
        <Image
          source={IMAGES.Location}
          style={{height: normalize(25), width: normalize(25)}}
        />
        <View>
          <Text
            style={{
              color: 'black',
              fontSize: normalize(14),
              fontFamily: Fonts.PoppinsMedium,
              width: normalize(240),
            }}>
            89, Bhel Nagar, Piplani, Ayodhya Nagar Extension
          </Text>
          <Text
            style={{
              color: '#757575',
              fontFamily: Fonts.PoppinsRegular,
              fontSize: normalize(12),
            }}>
            Ayodhya Bypass
          </Text>
        </View>
      </TouchableOpacity>

      <Modal
        backdropOpacity={0}
        animationIn={'slideInUp'}
        animationOut={'slideOutDown'}
        backdropTransitionOutTiming={0}
        hideModalContentWhileAnimating={true}
        isVisible={customerModal}
        animationInTiming={800}
        animationOutTiming={800}
        onBackButtonPress={() => setcustomerModal(false)}
        onBackdropPress={() => setcustomerModal(false)}
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
            height: normalize(400),
            width: '100%',

            backgroundColor: '#FFFFFF',
            shadowColor: '#000',
            shadowOffset: {width: 0, height: 2},
            shadowOpacity: 0.25,
            shadowRadius: 3.84,
            elevation: 5,
            borderRadius: 10,
            borderTopLeftRadius: normalize(20),
            borderTopRightRadius: normalize(20),
          }}>
          <TouchableOpacity
            style={{
              height: normalize(3),
              width: normalize(30),
              backgroundColor: '#EBEBEB',
              alignSelf: 'center',
              borderRadius: normalize(10),
              marginTop: normalize(15),
            }}
            onPress={() => {
              setcustomerModal(!customerModal);
            }}
          />
          <ScrollView showsVerticalScrollIndicator={false}>
            <View style={{padding: normalize(10), flex: 1}}>
              <Text
                style={{
                  color: 'black',
                  marginTop: normalize(10),
                  fontFamily: Fonts.PoppinsSemiBold,
                  fontSize: normalize(12),
                }}>
                Harry style
              </Text>
              <Text
                style={{
                  color: '#757575',

                  fontFamily: Fonts.PoppinsRegular,
                  fontSize: normalize(11),
                }}>
                89, Bhel Nagar, Piplani, Ayodhya Bypass, Bhopal,Madhya Pradesh
                462022, India
              </Text>
              <View style={{flexDirection: 'row', marginTop: normalize(10)}}>
                <TouchableOpacity>
                  <Image
                    source={IMAGES.Calling2}
                    style={{height: normalize(25), width: normalize(25)}}
                  />
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() => {
                    props.navigation.navigate('ChatScreen');
                    setcustomerModal(!customerModal);
                  }}>
                  <Image
                    source={IMAGES.Messsagebutton}
                    style={{
                      height: normalize(25),
                      width: normalize(25),
                      marginLeft: normalize(10),
                    }}
                  />
                </TouchableOpacity>
              </View>
              <FlatList
                data={detailsData}
                renderItem={renderDetails}
                showsVerticalScrollIndicator={false}
              />
            </View>
          </ScrollView>

          <TouchableOpacity onPress={sendCurrentLocation}>
            <Text style={{color: 'black'}}>Socket update location</Text>
          </TouchableOpacity>
          <Button
            width={'90%'}
            backgroundColor={'#52B46B'}
            alignSelf={'center'}
            borderRadius={normalize(8)}
            titlesingle={true}
            title={'Start Service'}
            textColor={'white'}
            fontFamily={Fonts.PoppinsMedium}
            marginBottom={normalize(20)}
            marginTop={normalize(10)}
            fontSize={normalize(12)}
            onPress={() => {
              setcustomerModal(!customerModal);
              props.navigation.navigate('ServiceOtp');
            }}
          />
        </View>
      </Modal>
    </View>
  );

  // return (
  //   <View style={styles.container}>
  //
  //     <SafeAreaView style={styles.safeArea}>
  //       <View style={styles.mapContainer}>
  //         <MapView
  //           style={{ flex: 1 }}
  //           initialRegion={{
  //             latitude: 17.3676,
  //             longitude: 78.5246,
  //             latitudeDelta: 0.0922,
  //             longitudeDelta: 0.0421
  //           }}>
  //           <Marker
  //             coordinate={{
  //               latitude: 17.3676,
  //               longitude: 78.5246
  //             }}
  //             title="Origin"
  //           />
  //           <Marker
  //             coordinate={{
  //               latitude: 17.4374,
  //               longitude: 78.4487
  //             }}
  //             title="Destination"
  //           />
  //           {directions && (
  //             <Polyline
  //               coordinates={directions}
  //               strokeWidth={5}
  //               strokeColor="#4285F4" // Choose your desired color
  //             />
  //           )}
  //         </MapView>
  //
  //         <TouchableOpacity onPress={handleLocationPermissionDenied}>
  //           <Text style={{ color: "black" }}>Grant permission</Text>
  //         </TouchableOpacity>
  //
  //         <TouchableOpacity onPress={getCurrentLocation}>
  //           <Text style={{ color: "black" }}>Get current position</Text>
  //         </TouchableOpacity>
  //
  //         <TouchableOpacity onPress={sendCurrentLocation}>
  //           <Text style={{ color: "black" }}>Socket update location</Text>
  //         </TouchableOpacity>
  //       </View>
  //     </SafeAreaView>
  //   </View>
  // );
};

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
  {
    id: 2,
    image: IMAGES.ongoing,
    title: 'Cleanup',
    time: '30 mins',
    info: 'Includes dummy info',
  },
  {
    id: 2,
    image: IMAGES.ongoing,
    title: 'Cleanup',
    time: '30 mins',
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
