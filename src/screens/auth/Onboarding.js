import {
    Text,
    ImageBackground,
    StatusBar,
    StyleSheet,
    View,
    FlatList,
    Animated as Anim,
    useWindowDimensions,
    SafeAreaView,
    Image,
    TouchableOpacity,
  } from 'react-native';
  import React, {useRef, useState} from 'react';
  import Paginator from '../../components/Paginator';
  import {useDispatch} from 'react-redux';
  import normalize from '../../utils/helpers/normalize';
  import { Colors } from '../../themes/Colors';
  import { Fonts } from '../../themes/Themes';
  import { IMAGES } from '../../themes/Themes';
  import {Icons} from '../../themes/Icons';
  import {storeData} from '../../redux/LocalStore';
  import {getData} from '../../redux/LocalStore';
  import {setStart} from '../../redux/reducer/AuthReducer';
  import constants from '../../utils/helpers/constants';
  import {useTranslation} from 'react-i18next';
  import {setLanguage} from '../../redux/reducer/LanguageReducer';
  
  const OnBoarding = ({navigation}) => {
    const dispatch = useDispatch();
    const {t, i18n} = useTranslation();
    const {height, width} = useWindowDimensions();
    const [currentindex, setCurrentIndex] = useState(0);
    const sliderRef = useRef(null);
    const scrollX = useRef(new Anim.Value(0)).current;
  
    const viewableItemChanged = useRef(({viewableItems}) => {
      setCurrentIndex(viewableItems[0]?.index);
    }).current;
  
    const viewConfig = useRef({viewAreaCoveragePercentThreshold: 50}).current;
  
    const DATA = [
      {
        image: IMAGES.image1,
        title: t('onBoardingTitle1'),
        des: t('onBoardingDes1'),
      },
      {
        image: IMAGES.image2,
        title: t('onBoardingTitle2'),
        des: t('onBoardingDes2'),
      },
      {
        image: IMAGES.image3,
        title: t('onBoardingTitle3'),
        des: t('onBoardingDes3'),
      },
      {
        image: IMAGES.image4,
        title: t('onBoardingTitle4'),
        des: t('onBoardingDes4'),
      },
    ];
  
    function renderItem({item, index}) {
      return (
        <SafeAreaView
          key={index}
          style={{
            width,
            flex: 1,
            justifyContent: 'flex-end',
          }}>
          <View
            style={{
              height: normalize(300),
              width: normalize(280),
              alignSelf: 'center',
            }}>
            <Image
              source={item.image}
              style={{
                height: index == 1 ? normalize(400) : normalize(265),
                width: index == 1 ? normalize(400) : normalize(265),
                resizeMode: 'contain',
                alignSelf: 'center',
                top: index == 1 ? -normalize(50) : 0,
              }}
            />
          </View>
  
          <View
            style={{
              height: normalize(160),
              width: '100%',
            }}>
            <Text
              style={{
                color: '#1A1D1F',
                fontFamily: Fonts.Poppins_SemiBold,
                fontSize: normalize(14.5),
                alignSelf: 'center',
                textAlign: 'center',
                width: '90%',
              }}>
              {item?.title}
            </Text>
  
            <Text
              style={{
                color: '#A9A9A9',
                fontFamily: Fonts.Poppins_Regular,
                fontSize: normalize(13),
                alignSelf: 'center',
                textAlign: 'center',
                width: '90%',
                marginTop: normalize(8),
              }}>
              {item?.des}
            </Text>
          </View>
        </SafeAreaView>
      );
    }
  
    async function scrollTo() {
      if (currentindex < DATA.length - 1) {
        sliderRef.current.scrollToIndex({index: currentindex + 1});
      } else {
        storeData(constants.STARTING, '1');
        dispatch(setStart('1'));
        dispatch(setLanguage(null));
      }
    }
  
    return (
      <View style={styles.container}>
        <StatusBar
          translucent
          backgroundColor="transparent"
          barStyle={'dark-content'}
        />
  
        <View
          style={{
            flex: 1,
          }}>
          <FlatList
            data={DATA}
            renderItem={renderItem}
            horizontal
            showsHorizontalScrollIndicator={false}
            pagingEnabled
            bounces={false}
            keyExtractor={(item, index) => index.toString()}
            onScroll={Anim.event([{nativeEvent: {contentOffset: {x: scrollX}}}], {
              useNativeDriver: false,
            })}
            scrollEventThrottle={16}
            decelerationRate={0}
            onViewableItemsChanged={viewableItemChanged}
            viewabilityConfig={viewConfig}
            ref={sliderRef}
          />
        </View>
  
        <View
          style={{
            height: normalize(150),
            width: '100%',
          }}>
          <Paginator
            data={DATA}
            scrollX={scrollX}
            viewstyle={{
              alignSelf: 'center',
            }}
          />
  
          <TouchableOpacity
            onPress={() => scrollTo()}
            style={{
              height: normalize(45),
              width: normalize(45),
              backgroundColor: Colors.black,
              alignSelf: 'center',
              borderRadius: normalize(14),
              marginTop: normalize(40),
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            {/* <Image
              source={Icons.RightAngle}
              style={{
                tintColor: Colors.white,
                height: normalize(16),
                width: normalize(10),
                resizeMode: 'contain',
                left: normalize(2),
              }}
            /> */}
          </TouchableOpacity>
        </View>
  
        <TouchableOpacity
          onPress={() => {
            storeData(constants.STARTING, '1');
            dispatch(setStart('1'));
            dispatch(setLanguage(null));
          }}
          style={{
            height: normalize(28),
            width: normalize(55),
            backgroundColor: '#DFDFDF',
            alignSelf: 'center',
            borderRadius: normalize(14),
            justifyContent: 'center',
            alignItems: 'center',
            position: 'absolute',
            right: normalize(15),
            top: normalize(48),
          }}>
          <Text
            style={{
              fontSize: normalize(13),
              color: Colors.black,
              fontFamily: Fonts.Poppins_Regular,
            }}>
            {t('skip')}
          </Text>
        </TouchableOpacity>
      </View>
    );
  };
  
  export default OnBoarding;
  
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      alignItems: 'center',
      backgroundColor: "#fff",
    },
  });
  