import React, { useState } from 'react';
import {
  FlatList,
  Image,
  Platform,
  SafeAreaView,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import normalize from '../../utils/helpers/normalize';
import {Fonts, IMAGES} from '../../themes/Themes';

function Dashboard(props) {
  const [weekindex, setweekindex] = useState(0);
  const rankingData = [
    {
      id: 1,
      topic: 'total bookings',
      number: '26',
      image1: IMAGES.bookings,
    },
    {
      id: 2,
      topic: 'total earnings',
      number: '$5.1',
      image1: IMAGES.earnings,
    },
    {
      id: 3,
      topic: 'overall ratings',
      number: '4.5',
      image1: IMAGES.bookings,
    },
  ];
  const renderItem = ({item}) => {
    return (
      <View
        style={{
          backgroundColor: 'black',
          borderRadius: normalize(20),
          padding: normalize(10),
          height: normalize(110),
          marginTop: normalize(20),

          width: normalize(100), // Width of each horizontal item
          // height: 100, // Height of each horizontal item

          borderWidth: normalize(1),
          margin: normalize(5),
          justifyContent: 'center',
          // alignItems: 'center',
        }}>
        <Text
          style={{
            color: 'white',
            fontFamily: Fonts.PoppinsMedium,
            fontSize: normalize(15),
          }}>
          {item?.topic}
        </Text>

        {item?.id == 2 ? (
          <Text
            style={{
              color: 'white',
              fontFamily: Fonts.PoppinsBold,
              fontSize: normalize(22),
            }}>
            {item?.number}k
          </Text>
        ) :  <Text
        style={{
          color: 'white',
          fontFamily: Fonts.PoppinsBold,
          fontSize: normalize(22),
        }}>
        {item?.number}
      </Text>}
        {/* </Text> */}
        <Image
          source={item?.image1}
          style={{
            height: normalize(35),
            width: normalize(35),
            position: 'absolute',
            alignSelf: 'center',
            bottom: normalize(-17),
            // top:110

            // top:normalize(10)
          }}
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
  return (
    <SafeAreaView style={{flex: 1, backgroundColor: 'white'}}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={{padding: normalize(10)}}>
          <TouchableOpacity
            style={{
              flexDirection: 'row',
              borderColor: 'black',
              borderWidth: normalize(1.5),
              borderRadius: normalize(14),
              justifyContent: 'space-between',
              alignItems: 'center',
              marginTop:Platform.OS=='ios'? normalize(20):normalize(40)
              // padding: normalize(10),
            }} onPress={()=>props.navigation.navigate('WinnerAnimation')}>
            <View style={{flexDirection: 'row', alignItems: 'center'}}>
              <Image
                source={IMAGES.RankingImage}
                style={{
                  height: normalize(60),
                  width: normalize(60),
                  marginTop: normalize(4),
                }}
              />
              <View>
                <Text
                  style={{
                    color: 'black',
                    fontSize: normalize(13),
                    fontFamily: Fonts.PoppinsSemiBold,
                  }}>
                  Weekly Ranking
                </Text>
                <Text
                  style={{
                    color: '#515151',
                    fontSize: normalize(11),
                    fontFamily: Fonts.PoppinsRegular,
                  }}>
                  you are rank 3
                </Text>
              </View>
            </View>

            <Image
              source={IMAGES.nextArrowblack}
              style={{
                height: normalize(25),
                width: normalize(25),
                marginRight: normalize(10),
              }}
            />
          </TouchableOpacity>
          <FlatList
            data={rankingData}
            renderItem={renderItem}
            horizontal
            showsHorizontalScrollIndicator={false}
          />
           <FlatList
                data={weekData}
                renderItem={renderData}
                contentContainerStyle={{
                  backgroundColor: '#393939',
                  width: '100%',
                  borderRadius: normalize(22),

                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  paddingHorizontal: normalize(20),
                  paddingVertical: normalize(10),
                  marginTop: normalize(40),
                  // height:normalize(100)
                  alignItems: 'center',
                }}
              />
              <Image
                source={IMAGES.Graph}
                style={{
                  width: '100%',
                  height: normalize(200),
                  marginTop: normalize(25),
                }}
                resizeMode="contain"
              />
                 <Image
                source={IMAGES.piechart}
                style={{
                  width: '100%',
                  height: normalize(200),
                  marginTop: normalize(40),
                }}
                resizeMode="contain"
              />
               <Text
                style={{
                  color: 'black',
                  fontFamily: Fonts.PoppinsSemiBold,
                  textAlign: 'center',
                  fontSize: normalize(15),
                  marginVertical: normalize(20),
                }}>
               Earnings graph
              </Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

export default Dashboard;
