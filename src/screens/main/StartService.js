import React, { useState } from 'react';
import {
  FlatList,
  ImageBackground,
  SafeAreaView,
  ScrollView,
  styleheet,
  StyleSheet,
  Text,
  View,
  TouchableOpacity
} from 'react-native';
import {Fonts, IMAGES} from '../../themes/Themes';
import normalize from '../../utils/helpers/normalize';
import {Image} from 'react-native';
import Button from '../../components/Button';
import Header from '../../components/Header';
import Svg, {Circle, Line} from 'react-native-svg';
import MyStatusBar from '../../utils/MyStatusBar';
import Modal from 'react-native-modal';
import NewTextInput from '../../components/NewTextInput';
function StartService(props, {progress}) {
    const [color, setcolor] = useState(false)
    const [ServiceModal, setServiceModal] = useState(false);
    const [serviceSearch, setserviceSearch] = useState('');
  const circleRadius = normalize(8);
  const strokeWidth = 2;
  const gap = 0; // Gap between circles
  const circleDiameter = (circleRadius - strokeWidth / 2) * 2;

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
  const renderDetails = ({item}) => {
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
          <Text style={style.titlestyle}>{item?.title}</Text>
          <View style={{flexDirection: 'row', alignItems: 'center'}}>
            <View style={style.ViewDot} />
            <Text style={[style.serViceText, {marginTop: normalize(5)}]}>
              {item?.time}
            </Text>
          </View>
          <View style={{flexDirection: 'row', alignItems: 'center'}}>
            <View style={style.ViewDot} />
            <Text style={style.serViceText}>{item?.info}</Text>
          </View>
        </View>
      </View>
    );
  };



  const [AddServiceData, setAddServiceData] = useState([
    {
      id: 1,
      image1: IMAGES.makeup,
      text1: 'Diamond Facial',
      price: '₹699',
      service1: '45 mins',
      service2: 'Includes dummy info',
      isSelected: false,
    },
    {
      id: 1,
      image1: IMAGES.makeup,
      text1: 'Diamond Facial',
      price: '₹699',
      service1: '45 mins',
      service2: 'Includes dummy info',
      isSelected: false,
    },
  ]);
  function detail(index) {
    let newarr = [...AddServiceData];
    newarr[index].isSelected = !newarr[index].isSelected;
    setAddServiceData(newarr);
  }

  const ServicerenderDetails = ({item, index}) => {
    return (
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          marginHorizontal: normalize(12),
          marginTop: normalize(20),
        }}>
        <View style={{flexDirection: 'row'}}>
          <Image
            source={item?.image1}
            style={{height: normalize(75), width: normalize(75)}}
          />
          <View>
            <Text
              style={{
                color: 'black',
                fontSize: normalize(13),
                fontFamily: Fonts.PoppinsMedium,
                marginLeft: normalize(10),
              }}>
              {item?.text1}
            </Text>
            <Text
              style={{
                color: '#5E17EB',
                fontSize: normalize(13),
                fontFamily: Fonts.PoppinsBold,
                marginLeft: normalize(10),
              }}>
              {item?.price}
            </Text>
            <View style={[style.ViewStyle,{marginLeft:normalize(10)}]}>
              <View style={style.ViewDot} />
              <Text style={style.serViceText}>{item?.service1}</Text>
            </View>
            <View style={[style.ViewStyle,{marginLeft:normalize(10)}]}>
              <View style={style.ViewDot} />
              <Text style={style.serViceText}>{item?.service2}</Text>
            </View>
          </View>
        </View>

        <TouchableOpacity
          style={{
            flexDirection: 'row',
            borderRadius: normalize(10),
            width: '23%',
            height: normalize(25),
            padding: Platform.OS == 'ios' ? normalize(6) : normalize(0),

            backgroundColor: 'white',
            shadowColor: '#000',
            shadowOffset: {width: 0, height: 2},
            shadowOpacity: 0.25,
            shadowRadius: 3.84,
            backgroundColor: 'white',
            alignItems: 'center',
            justifyContent: 'center',
            elevation: 5,
          }}
          onPress={() => {
            detail(index);
          }}>
          {item?.isSelected ? (
            <View style={{alignItems: 'center', flexDirection: 'row'}}>
              <Image
                source={IMAGES.write}
                style={{height: normalize(15), width: normalize(15)}}
                resizeMode="contain"
              />
              <Text
                style={{
                  color: '#52B46B',
                  fontSize: normalize(11),
                  fontFamily: Fonts.PoppinsMedium,
                  marginLeft: normalize(5),
                  marginTop: Platform.OS == 'ios' ? normalize(0) : normalize(3),
                }}>
                Added
              </Text>
            </View>
          ) : (
            <Text
              style={{
                color: '#5E17EB',
                fontSize: normalize(12),
                fontFamily: Fonts.PoppinsMedium,
                marginTop: Platform.OS == 'ios' ? normalize(0) : normalize(3),
              }}>
              + Add
            </Text>
          )}
        </TouchableOpacity>
      </View>
    );
  };


  return (
    <>
       <MyStatusBar backgroundColor={'#5E17EB'} barStyle={'light-content'} />
       <SafeAreaView style={{flex: 1}}>
      <ImageBackground
        source={IMAGES.startSevice}
        style={{height: normalize(300), width: '100%'}}>
        <Header
          back_button
          back_img_source={IMAGES.Goback}
          LeftImagehght={normalize(20)}
          LeftImagewidth={normalize(20)}
          leftImagebackground={'#d3d3d3'}
          ImagePadding={normalize(5)}
          LeftImggborderradius={normalize(10)}
          gobackmarginLeft={normalize(10)}
          // backmargintop={normalize(20)}
          onPress_back_button={() => {
            props.navigation.goBack();
          }}
          marginBottom={normalize(10)}
        />
        <Image
          source={IMAGES.Timer}
          style={{
            height: normalize(150),
            width: normalize(150),
            alignSelf: 'center',
            //   marginTop: normalize(60),
          }}
        />

        {/* <View style={style.progressBarContainer}>
      <View style={style.circleWithTextContainer}>
        <Svg width={circleRadius * 2} height={circleRadius * 2}>
          <Circle
            cx={circleRadius}
            cy={circleRadius}
            r={circleRadius - strokeWidth / 2}
            stroke="#007bff"
            strokeWidth={strokeWidth}
            fill={progress >= 1 ? '#007bff' : 'transparent'}
          />
        </Svg>
        <Text style={style.circleText}>Reached Destination</Text>
      </View>
      <Svg width={gap} height={strokeWidth * 2}>
        <Line
          x1="0"
          y1={strokeWidth}
          x2={gap}
          y2={strokeWidth}
          stroke="rgba(245, 196, 67, 1)"
          strokeWidth={strokeWidth}
        />
      </Svg>
      <View style={style.circleWithTextContainer}>
        <Svg width={circleRadius * 2} height={circleRadius * 2}>
          <Circle
            cx={circleRadius}
            cy={circleRadius}
            r={circleRadius - strokeWidth / 2}
            stroke="#007bff"
            strokeWidth={strokeWidth}
            fill={progress >= 2 ? '#007bff' : 'transparent'}
          />
        </Svg>
        <Text style={style.circleText}>Service started</Text>
      </View>
      <View style={style.lineContainer}>
        <Svg width={gap} height={strokeWidth * 2}>
          <Line x1="0" y1={strokeWidth} x2={gap} y2={strokeWidth} stroke="#007bff" strokeWidth={strokeWidth} />
        </Svg>
      </View>
      <View style={style.circleWithTextContainer}>
        <Svg width={circleRadius * 2} height={circleRadius * 2}>
          <Circle
            cx={circleRadius}
            cy={circleRadius}
            r={circleRadius - strokeWidth / 2}
            stroke="#007bff"
            strokeWidth={strokeWidth}
            fill={progress >= 3 ? '#007bff' : 'transparent'}
          />
        </Svg>
        <Text style={style.circleText}>Service completed</Text>
      </View>
    </View> */}

        <View style={style.progressBarContainer}>
          <View style={style.circleWithTextContainer}>
            <Svg width={circleRadius * 2} height={circleRadius * 2}>
              <Circle
                cx={circleRadius}
                cy={circleRadius}
                r={circleRadius - strokeWidth / 2}
                // stroke="#007bff"
                // strokeWidth={strokeWidth}
                // fill={progress >= 1 ? '#007bff' : 'transparent'}
                fill={'#F5C443'}
              />
              <Image
                source={IMAGES.Tick} // Path to your tick image asset
                style={{
                  position: 'absolute',
                  tintColor: 'white',
                  top: 5,
                  left: 5,

                  width: normalize(10),
                  height: normalize(10),
                }}
                resizeMode="contain"
              />
            </Svg>
            <Text style={style.circleText}>Reached Destination</Text>
          </View>
          {/* <Svg width={gap} height={circleRadius * 2}> */}

          {/* <Line
      x1="0"
      y1={circleRadius - strokeWidth / 2}
      x2={gap}
      y2={circleRadius - strokeWidth / 2}
      stroke="rgba(245, 196, 67, 1)"
      strokeWidth={strokeWidth}
    /> */}
          {/* </Svg> */}
          <Image
            source={IMAGES.line}
            style={{
              height: normalize(10),
              width: '35%',
              marginTop: normalize(2),
            }}
            resizeMode="contain"
          />

          <View style={style.circleWithTextContainer}>
            <Svg width={circleRadius * 2} height={circleRadius * 2}>
              <Circle
                cx={circleRadius}
                cy={circleRadius}
                r={circleRadius - strokeWidth / 2}
                // stroke="#007bff"
                // strokeWidth={strokeWidth}
                // fill={progress >= 2 ? '#007bff' : 'transparent'}
                fill={'#2B95E9'}
              />
              <Image
                source={IMAGES.Tick} // Path to your tick image asset
                style={{
                  position: 'absolute',
                  tintColor: 'white',
                  top: 5,
                  left: 5,

                  width: normalize(10),
                  height: normalize(10),
                }}
                resizeMode="contain"
              />
            </Svg>
            <Text style={style.circleText}>Service started</Text>
          </View>
          {/* <Svg width={gap} height={circleRadius * 2}>
    <Line
      x1="0"
      y1={circleRadius - strokeWidth / 2}
      x2={gap}
      y2={circleRadius - strokeWidth / 2}
      stroke="rgba(43, 149, 233, 1)"
      strokeWidth={strokeWidth}
    />
  </Svg> */}
          <Image
            source={IMAGES.line}
            style={{
              height: normalize(10),
              width: '35%',
              marginTop: normalize(2),
            }}
            resizeMode="contain"
          />
          <View style={style.circleWithTextContainer}>
            <Svg width={circleRadius * 2} height={circleRadius * 2}>
              <Circle
                cx={circleRadius}
                cy={circleRadius}
                r={circleRadius - strokeWidth / 2}
                stroke={color ? null :"#BFA2F7"} 
                // strokeWidth={strokeWidth}
                fill={color ? 'green' : 'transparent'}
              />
              {
                color ?  <Image
                source={IMAGES.Tick} // Path to your tick image asset
                style={{
                  position: 'absolute',
                  tintColor: 'white',
                  top: 5,
                  left: 5,

                  width: normalize(10),
                  height: normalize(10),
                }}
                resizeMode="contain"
              />:null
              }
              
            </Svg>
            <Text style={[style.circleText,{color:color?'white':'#BFA2F7'}]}>Service completed</Text>
          </View>
        </View>
      </ImageBackground>
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
          <FlatList data={detailsData} renderItem={renderDetails} />
        </View>
      </ScrollView>
      <View
        style={{
          flexDirection: 'row',

          //   width: '100%',

          //   backgroundColor: 'red',

          // padding: normalize(10),
          justifyContent: 'space-between',
          marginHorizontal: normalize(10),
          paddingVertical: normalize(10),
          //   marginVertical: normalize(30),
        }}>
        <Button
          width={'48%'}
          titlesingle={true}
          title={'Add Extras'}
          fontSize={normalize(11)}
          fontFamily={Fonts.PoppinsMedium}
          backgroundColor={'black'}
          borderRadius={normalize(10)}
          textColor={'white'}
          onPress={() => {
            // props.navigation.navigate('ChatScreen');
            setServiceModal(!ServiceModal)
          }}
        />
        <Button
          width={'48%'}
          titlesingle={true}
          fontSize={normalize(11)}
          fontFamily={Fonts.PoppinsMedium}
          title={'Job Finished'}
          backgroundColor={'#52B46B'}
          textColor={'white'}
          borderRadius={normalize(10)}
          onPress={() => {
            setcolor(true),
            props.navigation.navigate('AddServicePicture',{AddServicePicture:'AddServicePicture'})
            // setAcceptRequestModal(!AcceptRequestModal);
          }}
        />




<Modal
          // avoidKeyboard
          animationIn={'slideInUp'}
          animationOut={'slideOutDown'}
          backdropTransitionOutTiming={0}
          hideModalContentWhileAnimating={true}
          isVisible={ServiceModal}
          animationInTiming={800}
          animationOutTiming={800}
          onBackButtonPress={() => setServiceModal(false)}
          onBackdropPress={() => setServiceModal(false)}
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
              // justifyContent: 'center',
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
                setServiceModal(!ServiceModal);
              }}
            />
            <View
              style={{
                // alignItems: 'center',
                // justifyContent: 'center',
                // marginVertical: normalize(20),
                padding: normalize(10),
              }}>
              <Text
                style={{
                  color: 'black',
                  fontSize: normalize(14),
                  fontFamily: Fonts.PoppinsMedium,
                  width: normalize(180),
                  marginTop: normalize(10),
                }}>
                Add services
              </Text>
              <NewTextInput
                width={'100%'}
                borderColor={'#E3E3E3'}
                borderWidth={normalize(1)}
                borderRadius={normalize(10)}
                value={serviceSearch}
                imagemarleft={normalize(10)}
                onChange={txt => setserviceSearch(txt)}
                // marginTop={normalize(2)}
                textInputHight={normalize(40)}
                name={'Search by service name'}
                marginTop={normalize(20)}
                // textmarleft={normalize(5)}
                fontFamily={Fonts.PoppinsRegular}
                textwidth={normalize(250)}
                placeholderTextColor={'#757575'}
                textmarleft={normalize(5)}
                leftImage={true}
                inputicon={IMAGES.search}
                leftImagewidth={normalize(20)}
                leftImageheight={normalize(20)}
              />
            </View>
            <FlatList data={AddServiceData} renderItem={ServicerenderDetails} showsVerticalScrollIndicator={false} />
            <Button
              width={'90%'}
              backgroundColor={'black'}
              alignSelf={'center'}
              borderRadius={normalize(12)}
              titlesingle={true}
              title={'Proceed'}
              textColor={'white'}
              fontFamily={Fonts.PoppinsMedium}
              fontSize={normalize(12)}
              marginBottom={normalize(20)}
              marginTop={normalize(20)}
              // disabled={!isButtonEnabled}
              onPress={() => {
                props.navigation.navigate('ServiceOtp',{AddService:'AddService'})
                setServiceModal(!ServiceModal);
              }}
            />
          </View>
        </Modal>



      </View>
    </SafeAreaView>
    </>
   
  );
}

export default StartService;
const style = StyleSheet.create({
  gratndTotal: {
    fontSize: normalize(12),
    fontFamily: Fonts.PoppinsBold,
    color: '#161616',
  },
  BillingViewDesign: {flexDirection: 'row', justifyContent: 'space-between'},
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
  progressBarContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around', // Adjust the spacing between circles
    marginTop: normalize(50),

    // alignItems:'center'
    // width:'100%',
    marginHorizontal: normalize(20),
    // alignItems:'center'
  },
  circleWithTextContainer: {
    alignItems: 'center',
 
  },
  circleText: {
    marginTop: normalize(5), // Adjust the spacing between circle and text
    textAlign: 'center',
    color: 'white',
    width: normalize(70),
    fontFamily: Fonts.PoppinsMedium,
    fontSize: normalize(11),
  },
  lineContainer: {
    justifyContent: 'center', // Center the line vertically with circles
  },
});
