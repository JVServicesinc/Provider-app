import React, {useEffect, useRef, useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  SafeAreaView,
  Platform,
  ImageBackground,
  // Animated,
} from 'react-native';
import {Fonts, IMAGES} from '../../themes/Themes';
import normalize from '../../utils/helpers/normalize';
import MyStatusBar from '../../utils/MyStatusBar';
import Header from '../../components/Header';
import {FlatList} from 'react-native';
import {TouchableOpacity} from 'react-native';
import * as Animatable from 'react-native-animatable';

const WinnerAnimation = props => {
  const [weekindex, setweekindex] = useState(0);
  const weekData = [
    {
      id: 1,
      name: 'today',
    },
    {
      id: 2,
      name: 'this week',
    },
    {
      id: 3,
      name: 'this month',
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

  const RankingData = [
    {
      id: 1,
      image: IMAGES.winnerprofile,
      name: 'Tom Hardy',
      ranking: '4th',
      rank2: '254 p',
    },
    {
      id: 1,
      image: IMAGES.winnerprofile,
      name: 'Tom Hardy',
      ranking: '4th',
      rank2: '254 p',
    },
    {
      id: 1,
      image: IMAGES.winnerprofile,
      name: 'Tom Hardy',
      ranking: '4th',
      rank2: '254 p',
    },
  ];
  const rankingItem = ({item}) => {
    return (
      <>
        <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
          <View style={{flexDirection: 'row'}}>
            <Image
              source={item?.image}
              style={{height: normalize(45), width: normalize(45)}}
              resizeMode="contain"
            />
            <View style={{marginLeft: normalize(12)}}>
              <Text
                style={{
                  color: 'black',
                  fontSize: normalize(13),
                  fontFamily: Fonts.PoppinsMedium,
                }}>
                {item?.name}
              </Text>
              <Text
                style={{
                  color: '#757575',
                  fontFamily: Fonts.PoppinsRegular,
                  fontSize: normalize(13),
                }}>
                {item?.rank2}
              </Text>
            </View>
          </View>
          <Text
            style={{
              color: '#5E17EB',
              fontFamily: Fonts.PoppinsBold,
              fontSize: normalize(14),
            }}>
            {item.ranking}
          </Text>
        </View>
        <View
          style={{
            borderWidth: normalize(1),
            borderColor: '#EBEBEB',
            marginVertical: normalize(10),
          }}
        />
      </>
    );
  };
  const winner = [
    {
      id: 1,
      winnerImage: IMAGES.seconduser,
      ShadowImage: IMAGES.secondImage,
      text: '2nd',
    },
    {
      id: 2,
      winnerImage: IMAGES.firstuser,
      ShadowImage: IMAGES.firstImage,
      text: '1st',
    },
    {
      id: 3,
      winnerImage: IMAGES.thirdrduser,
      ShadowImage: IMAGES.thirdImage,
      text: '3rd',
    },
  ];
  // const animation = useRef(new Animated.Value(0)).current;
  // const slideUpAnimation = () => {
  //   Animated.spring(animation, {
  //     toValue: 1,
  //     duration: 3000,
  //     useNativeDriver: true,
  //     delay: 500,
  //   }).start();
  // };
  // const fadeAnim1 = useRef(new Animated.Value(0)).current;
  // const fadeAnim2 = useRef(new Animated.Value(0)).current;
  // const fadeAnim3 = useRef(new Animated.Value(0)).current;
  const [toValue, setToValue] = useState(0);
  // const fadeIn1 = () => {
  //   // Will change fadeAnim value to 1 in 2 seconds
  //   Animated.timing(fadeAnim1, {
  //     toValue: 1,
  //     duration: 1000,
  //     useNativeDriver: true,
  //   }).start();
  // };
  // const fadeIn2 = () => {
  //   // Will change fadeAnim value to 1 in 3 seconds
  //   Animated.timing(fadeAnim2, {
  //     toValue: 1,
  //     duration: 2000,
  //     useNativeDriver: true,
  //   }).start();
  // };
  // const fadeIn3 = () => {
  //   // Will change fadeAnim value to 1 in 4 seconds
  //   Animated.timing(fadeAnim3, {
  //     toValue: 1,
  //     duration: 2000,
  //     useNativeDriver: true,
  //   }).start();
  // };
  // useEffect(() => {
  //   fadeIn1();
  //   fadeIn2();
  //   fadeIn3();
  // }, []);

  // const fadeIn = (animatedValue, duration, delay) => {
  //   return Animated.timing(animatedValue, {
  //     toValue: 1,
  //     duration: duration,
  //     useNativeDriver: true,
  //     delay: delay,
  //   });
  // };
  // const loopAnimation = () => {
  //   Animated.loop(
  //     Animated.sequence([
  //       fadeIn(fadeAnim1, 800, 0), // Faster fade in
  //       fadeIn(fadeAnim2, 800, 300), // Delay of 300 milliseconds
  //       fadeIn(fadeAnim3, 800, 300), // Delay of 300 milliseconds
  //     ]),
  //   ).start();
  // };
  const loopAnimation = () => {
    Animated.loop(
      Animated.sequence([
        fadeIn(fadeAnim1, 800, 0),
        Animated.delay(300), // Delay of 300 milliseconds before starting the next animation
        fadeIn(fadeAnim2, 800, 0),
        Animated.delay(300), // Delay of 300 milliseconds before starting the next animation
        fadeIn(fadeAnim3, 800, 0),
        Animated.delay(300), // Delay of 300 milliseconds before starting the next animation
      ]),
    ).start();
  };

  // useEffect(() => {
  // loopAnimation();
  // slideUpAnimation();
  // }, []);

  const winnerData = ({item, index}) => {
    return (
      <Animatable.View
        animation="fadeInUpBig"
        // style={{
        //   transform: [
        //     {
        //       translateY: animation.interpolate({
        //         inputRange: [0, 1],
        //         outputRange: [0, normalize(-50)],
        //       }),

        //     },
        //   ],
        // }}
      >
        <View style={styles.winnerItem}>
          {/* <Animated.View
          animation="slideInUp"
        

          // style={{
          //   opacity: fadeAnim1,
          //   transform: [
          //     {
          //       translateY: fadeAnim1.interpolate({
          //         inputRange: [0, 1],
          //         outputRange: [10, -10],
          //       }),
          //     },
          //     {
          //       rotate:
          //         index === 0
          //           ? Platform.OS == 'ios'
          //             ? '-10deg'
          //             : '-5deg'
          //           : index === 1
          //           ? '0deg'
          //           : index === 2
          //           ? Platform.OS == 'ios'
          //             ? '10deg'
          //             : '0deg'
          //           : '0deg',
          //     },
          //   ],
          // }}
        > */}
          <Image
            source={item?.winnerImage}
            style={[styles.winnerImage]}
            resizeMode="contain"
          />
          <ImageBackground
            source={item?.ShadowImage}
            style={[styles.shadowImage]}
            resizeMode="contain">
            <Text
              style={{
                textAlign: 'center',
                color: 'white',
                fontSize: normalize(14),
                fontFamily: Fonts.PoppinsMedium,
                top: normalize(60),
              }}>
              {item?.text}
            </Text>
          </ImageBackground>
        </View>
      </Animatable.View>
    );
  };
  return (
    <>
      <MyStatusBar backgroundColor={'#363636'} barStyle={'light-content'} />

      <SafeAreaView style={{flex: 1}}>
        {/* <View style={{backgroundColor: '#363636', flex:1}}> */}

        <ImageBackground
          source={IMAGES.emoji}
          style={{backgroundColor: '#363636', flex: 1}}>
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
              Platform.OS == 'android' ? normalize(20) : normalize(20)
            }
            text
            textRight={normalize(15)}
            title={'Leaderboard'}
            textcolor={'white'}
            textfont={Fonts.PoppinsMedium}
            textSize={normalize(17)}
            textAlign={'center'}
            RightImage
            textmartop={
              Platform.OS == 'android' ? normalize(20) : normalize(20)
            }
            onPress_back_button={() => {
              props.navigation.goBack();
            }}
          />
          {/* <Image
            source={IMAGES.emoji}
            // style={[styles.winnerImage]}
            resizeMode="contain"
          /> */}
          <FlatList
            data={weekData}
            renderItem={renderData}
            scrollEnabled={false}
            // horizontal
            contentContainerStyle={{
              backgroundColor: '#838383',
              width: '95%',
              borderRadius: normalize(22),
              alignSelf: 'center',
              flexDirection: 'row',
              justifyContent: 'space-between',
              paddingHorizontal: normalize(20),
              paddingVertical: normalize(5),
              marginVertical: normalize(40),
              // height:normalize(100)
              alignItems: 'center',
              // position:'absolute',
              // overflow:'hidden'
              // marginLeft:normalize(8)
            }}
          />
          <FlatList
            data={winner}
            renderItem={winnerData}
            horizontal
            contentContainerStyle={{
              // alignItems: 'center',
              // justifyContent: 'center',
              marginHorizontal: normalize(25),
              marginTop: normalize(15),
              // position:'absolute',
              // overflow:'hidden'
            }}
            scrollEnabled={false}
          />
        </ImageBackground>

        {/* </View> */}
        <View
          style={{
            backgroundColor: 'white',
            borderTopEndRadius: normalize(15),
            borderTopStartRadius: normalize(15),
            marginTop: normalize(-13),
            padding: normalize(25),
            flex: 1,
          }}>
          <FlatList data={RankingData} renderItem={rankingItem} />
        </View>
      </SafeAreaView>
    </>
  );
};

export default WinnerAnimation;
const styles = StyleSheet.create({
  // ... other styles

  winnerItem: {
    alignItems: 'center',
    marginHorizontal: normalize(10),
    // marginTop: normalize(50),
  },
  winnerImage: {
    height: normalize(70),
    width: normalize(70),
  },
  shadowImage: {
    height: normalize(150),
    width: normalize(70),
    marginTop: normalize(-40), // Adjust the marginTop for proper alignment
  },
});
