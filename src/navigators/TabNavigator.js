import React from 'react';
import {
  Text,
  Image,
  View,
  StyleSheet,
  Platform,
} from 'react-native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {Fonts, IMAGES} from '../themes/Themes';
import normalize from '../utils/helpers/normalize';
import Home from '../screens/TabNav/Home';
import Bookings from '../screens/TabNav/Bookings';
import Wallet from '../screens/TabNav/Wallet';
import Dashboard from '../screens/TabNav/Dashboard';

const Tab = createBottomTabNavigator();

function TabScreen() {
  return (
    <Tab.Navigator
      initialRouteName="Home"
      screenOptions={{
        keyboardHidesTabBar: true,
        activeTintColor: 'black',
        inactiveTintColor: 'grey',
        showIcon: true,
        tabBarShowLabel: false,
        headerShown: false,
        unmountOnBlur: true,
        tabBarStyle: {
          alignItems: 'center',
          justifyContent: 'center',
          paddingTop: normalize(5),
          height: Platform.OS == 'ios' ? normalize(70) : normalize(60),
        },
        tabBarLabelStyle: {
          fontSize: normalize(10),
          fontWeight: 'bold',
          fontFamily: Fonts.PoppinsMedium,
        },
      }}>
      <Tab.Screen
        name="Home"
        component={Home}
        options={{
          tabBarIcon: ({focused}) => {
            return (
              <View>
                {focused ? (
                  <View
                    style={{justifyContent: 'center', alignItems: 'center'}}>
                    <Image
                      style={{
                        marginTop: Platform.OS === 'ios' ? normalize(5) : 0,
                        height: normalize(20),
                        width: normalize(18),
                      }}
                      source={IMAGES.Home}
                      resizeMode="contain"
                    />
                    <Text
                      style={{
                        fontSize: normalize(11),
                        color: 'black',
                        fontFamily: Fonts.PoppinsMedium,
                        marginStart: normalize(2),
                      }}>
                      Home
                    </Text>
                  </View>
                ) : (
                  <View
                    style={{justifyContent: 'center', alignItems: 'center'}}>
                    <Image
                      style={{
                        height: normalize(20),
                        width: normalize(18),
                        marginTop: Platform.OS === 'ios' ? normalize(5) : 0,
                      }}
                      source={IMAGES.HomeNot}
                      resizeMode="contain"
                    />
                    <Text
                      style={{
                        fontSize: normalize(12),
                        color: '#B4B4B4',
                        marginStart: normalize(2),
                        fontFamily: Fonts.PoppinsRegular,
                      }}>
                      Home
                    </Text>
                  </View>
                )}
              </View>
            );
          },
        }}
      />
      <Tab.Screen
        name="Bookings"
        component={Bookings}
        options={{
          tabBarIcon: ({focused}) => {
            return (
              <View>
                {focused ? (
                  <View
                    style={{justifyContent: 'center', alignItems: 'center'}}>
                    <Image
                      style={{
                        marginTop: Platform.OS === 'ios' ? normalize(5) : 0,
                        height: normalize(20),
                        width: normalize(18),
                      }}
                      source={IMAGES.Selectbooking}
                      resizeMode="contain"
                    />
                    <Text
                      style={{
                        fontSize: normalize(11),
                        color: 'black',
                        fontFamily: Fonts.PoppinsMedium,
                        marginStart: normalize(2),
                      }}>
                      Bookings
                    </Text>
                  </View>
                ) : (
                  <View
                    style={{justifyContent: 'center', alignItems: 'center'}}>
                    <Image
                      style={{
                        height: normalize(25),
                        width: normalize(25),
                        marginTop: Platform.OS === 'ios' ? normalize(5) : 0,
                      }}
                      source={IMAGES.Bookings}
                      resizeMode="contain"
                    />
                    <Text
                      style={{
                        fontSize: normalize(11),
                        color: '#B4B4B4',
                        marginStart: normalize(2),
                        fontFamily: Fonts.PoppinsMedium,
                      }}>
                      Bookings
                    </Text>
                  </View>
                )}
              </View>
            );
          },
        }}
      />
      <Tab.Screen
        name="Wallet"
        component={Wallet}
        options={{
          tabBarIcon: ({focused}) => {
            return (
              <View>
                <View style={{justifyContent: 'center', alignItems: 'center'}}>
                  <Image
                    style={{
                      tintColor: focused ? 'black' : '#B4B4B4',
                      height: normalize(25),
                      width: normalize(25),
                      marginTop: Platform.OS === 'ios' ? normalize(5) : 0,
                    }}
                    source={IMAGES.Wallet}
                    resizeMode="contain"
                  />
                  <Text
                    style={{
                      fontSize: normalize(11),
                      color: '#B4B4B4',
                      marginStart: normalize(2),
                      fontFamily: Fonts.PoppinsMedium,
                    }}>
                    Wallet
                  </Text>
                </View>
              </View>
            );
          },
        }}
      />
      <Tab.Screen
        name="Dashboard"
        component={Dashboard}
        options={{
          tabBarIcon: ({focused}) => {
            return (
              <View>
                {focused ? (
                  <View
                    style={{justifyContent: 'center', alignItems: 'center'}}>
                    <Image
                      style={{
                        marginTop: Platform.OS === 'ios' ? normalize(5) : 0,
                        height: normalize(22),
                        width: normalize(18),
                      }}
                      source={IMAGES.selectDashboard}
                      resizeMode="contain"
                    />
                    <Text
                      style={{
                        fontSize: normalize(11),
                        color: 'black',
                        fontFamily: Fonts.PoppinsMedium,
                        marginStart: normalize(2),
                      }}>
                      Dashboard
                    </Text>
                  </View>
                ) : (
                  <View
                    style={{justifyContent: 'center', alignItems: 'center'}}>
                    <Image
                      style={{
                        height: normalize(25),
                        width: normalize(25),
                        marginTop: Platform.OS === 'ios' ? normalize(5) : 0,
                      }}
                      source={IMAGES.Dashboard}
                      resizeMode="contain"
                    />
                    <Text
                      style={{
                        fontSize: normalize(11),
                        color: '#B4B4B4',
                        marginStart: normalize(2),
                        fontFamily: Fonts.PoppinsMedium,
                      }}>
                      Dashboard
                    </Text>
                  </View>
                )}
              </View>
            );
          },
        }}
      />
    </Tab.Navigator>
  );
}
export default function TabNavigator() {
  return <TabScreen />;
}

