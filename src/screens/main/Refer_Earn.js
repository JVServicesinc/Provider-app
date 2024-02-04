import React from 'react';
import {
  FlatList,
  Image,
  Platform,
  SafeAreaView,
  ScrollView,
  StatusBar,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import Header from '../../components/Header';
import {Fonts, IMAGES} from '../../themes/Themes';
import normalize from '../../utils/helpers/normalize';
import MyStatusBar from '../../utils/MyStatusBar';

function Refer_Earn(props) {
  const referData = [
    {
      id: 1,
      image: IMAGES.user,
      profilename: 'User',
      description: 'profile can explore & book services in a min',
      nextArrow: IMAGES.nextArrow,
    },
    {
      id: 1,
      image: IMAGES.user,
      profilename: 'Freelancer',
      description: 'profile can explore & book services in a min',
      nextArrow: IMAGES.nextArrow,
    },
    {
      id: 1,
      image: IMAGES.user,
      profilename: 'Service Provider',
      description: 'profile can explore & book services in a min',
      nextArrow: IMAGES.nextArrow,
    },
    {
      id: 1,
      image: IMAGES.user,
      profilename: 'Partner',
      description: 'profile can explore & book services in a min',
      nextArrow: IMAGES.nextArrow,
    },
  ];
  const renderData = ({item}) => {
    return (
      <TouchableOpacity
        style={{
          flexDirection: 'row',
          borderWidth: normalize(2),
          borderColor: '#F3F3F3',
          borderRadius: normalize(14),
          marginTop: normalize(15),
          // justifyContent:'center',
          // alignItems: 'center',
          padding: normalize(5),
          width: '100%',
        }}>
        <View style={{flexDirection: 'row'}}>
          <Image
            source={item?.image}
            style={{
              height: normalize(55),
              width: normalize(55),
              marginTop: normalize(2),
            }}
          />
          <View style={{marginLeft: normalize(15)}}>
            <Text
              style={{
                color: 'black',
                fontFamily: Fonts.PoppinsSemiBold,
                fontSize: normalize(14),
              }}>
              {item?.profilename}
            </Text>
            <Text
              style={{
                color: '#757575',
                fontFamily: Fonts.PoppinsRegular,
                fontSize: normalize(12),
                width: normalize(200),
              }}>
              {item?.description}
            </Text>
          </View>
        </View>
        <Image
          source={IMAGES.nextArrow}
          style={{
            height: normalize(30),
            width: normalize(30),
            alignSelf: 'center',
            position: 'absolute',
            right: normalize(10),
            // marginRight:normalize(10)
          }}
        />
      </TouchableOpacity>
    );
  };

  const data = [
    {
      id: 1,
      imagename: IMAGES.winner,
      description:
        'Invite all friends even if they have tried us.You will get rewarded everytime!',
    },
    {
      id: 2,
      imagename: IMAGES.messsage,
      description:
        'Upon inviting, we’ll give them rewards for the services they haven’t tried yet',
    },
    {
      id: 2,
      imagename: IMAGES.price,
      description:
        'For every successful signup, you can win upto ₹500, and minimum ₹100',
    },
  ];

  const renderitem = ({item}) => {
    return (
      <View style={{flexDirection: 'row', alignItems: 'center'}}>
        <View
          style={{
            // height: normalize(30),
            // width: normalize(30),
            borderRadius: normalize(20),
            borderColor: '#F3F3F3',
            borderWidth: normalize(5),
            alignItems: 'center',
            justifyContent: 'center',
            marginTop: normalize(10),
            padding: normalize(5),
          }}>
          <Image
            source={item?.imagename}
            style={{height: normalize(20), width: normalize(20)}}
          />
        </View>
        <Text
          style={{
            color: '#161616',
            fontSize: normalize(11),
            marginLeft: normalize(10),
            fontFamily: Fonts.PoppinsRegular,
            width: normalize(250),
          }}>
          {item?.description}
        </Text>
      </View>
    );
  };
  return (
    <>
      <MyStatusBar backgroundColor={'#F5C443'} barStyle={'light-content'} />
      <SafeAreaView style={{flex: 1}}>
        <View
          style={{
            backgroundColor: '#F5C443',
            // borderTopLeftRadius: normalize(10),
            // borderTopRightRadius: normalize(10),
          }}>
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
              Platform.OS == 'android' ? normalize(30) : normalize(20)
            }
            text
            textRight={normalize(15)}
            title={'Refer & Earn'}
            textcolor={'black'}
            textfont={Fonts.PoppinsMedium}
            textSize={normalize(15)}
            textAlign={'center'}
            RightImage
            textmartop={
              Platform.OS == 'android' ? normalize(30) : normalize(20)
            }
            onPress_back_button={() => {
              props.navigation.goBack();
            }}
          />
          <View
            style={{
              alignItems: 'center',
              justifyContent: 'center',
              paddingBottom: normalize(15),
            }}>
            <Image
              source={IMAGES.refergift}
              style={{
                height: normalize(90),
                width: normalize(90),
                marginTop: normalize(15),
                //   marginVertical: normalize(20),
              }}
              resizeMode="contain"
            />
            <Text
              style={{
                color: 'black',
                fontSize: normalize(12),
                fontFamily: Fonts.PoppinsMedium,
                marginTop: normalize(15),
              }}>
              Refer now & earn up to ₹500
            </Text>
            <Text
              style={{
                color: '#161616',
                fontSize: normalize(11),
                fontFamily: Fonts.PoppinsRegular,
                textAlign: 'center',
                width: normalize(290),
              }}>
              Invite your friends to Seek Me service. They get instant ₹100 off.
              You win upto ₹500 in rewards
            </Text>
          </View>
        </View>
        <ScrollView
          style={{flex: 2, backgroundColor: 'white'}}
          showsVerticalScrollIndicator={false}>
          <View style={{alignContent: 'center', justifyContent: 'center'}}>
            <Text
              style={{
                textAlign: 'center',
                color: 'black',
                fontSize: normalize(12),
                fontFamily: Fonts.PoppinsMedium,
                marginTop: normalize(20),
              }}>
              Referral Code
            </Text>
            <View
              style={{
                borderStyle: 'dashed',
                borderWidth: normalize(1),
                width: '30%',
                padding: normalize(10),
                alignSelf: 'center',
                backgroundColor: '#F5C443',
                borderRadius: normalize(7),
                marginTop: normalize(5),
              }}>
              <Text
                style={{
                  color: 'black',
                  fontSize: normalize(11),
                  fontFamily: Fonts.PoppinsMedium,
                }}>
                HSSMNW123
              </Text>
            </View>
            <View
              style={{
                flexDirection: 'row',
                width: '100%',
                padding: normalize(10),
                alignItems: 'center',
                // justifyContent: 'center',
                justifyContent: 'space-between',
                marginTop: normalize(15),
              }}>
              <Text
                style={{
                  color: '#F5C443',
                  fontFamily: Fonts.PoppinsBold,
                  fontSize: normalize(11),
                }}>
                -----------------
              </Text>
              <Text
                style={{
                  color: 'black',
                  fontSize: normalize(12),
                  fontFamily: Fonts.PoppinsMedium,
                }}>
                or refer as
              </Text>
              <Text
                style={{
                  color: '#F5C443',
                  fontFamily: Fonts.PoppinsBold,
                  fontSize: normalize(11),
                }}>
                -----------------
              </Text>
            </View>
          </View>
          <FlatList
            data={referData}
            renderItem={renderData}
            style={{padding: normalize(10)}}
            showsVerticalScrollIndicator={false}
          />
          <FlatList
            data={data}
            renderItem={renderitem}
            style={{padding: normalize(10)}}
          />
        </ScrollView>
      </SafeAreaView>
    </>
  );
}

export default Refer_Earn;
