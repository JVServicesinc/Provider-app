import {
  Dimensions,
  FlatList,
  Platform,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Button,
  ScrollView,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {useNavigation} from '@react-navigation/native';
import Header from '../../components/Header';
import {Fonts, IMAGES} from '../../themes/Themes';
import normalize from '../../utils/helpers/normalize';
import {useDispatch, useSelector} from 'react-redux';
import {
  GetSlotsRequest,
} from '../../redux/reducer/ServiceReducer';

const Slots = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(GetSlotsRequest());
  }, []);

  const TimeSlot = [
    '01:00:00',
    '02:00:00',
    '03:00:00',
    '04:00:00',
    '05:00:00',
    '06:00:00',
    '07:00:00',
    '09:00:00',
    '10:00:00',
    '11:00:00',
    '12:00:00',
    '13:00:00',
    '14:00:00',
    '15:00:00',
    '16:00:00',
    '17:00:00',
    '18:00:00',
    '19:00:00',
    '20:00:00',
    '22:00:00',
    '23:00:00',
    '24:00:00',
  ];

  const [timeSlotsData, setTimeSlotsData] = useState([
    {
      id: 1,
      weeekday: 1,
      weeekday_name: 'Sunday',
      timings: [''],
    },
    {
      id: 2,
      weeekday: 2,
      weeekday_name: 'Monday',
      timings: [''],
    },
    {
      id: 3,
      weeekday: 3,
      weeekday_name: 'Tuesday',
      timings: [''],
    },
    {
      id: 4,
      weeekday: 4,
      weeekday_name: 'Wednesday',
      timings: [''],
    },
    {
      id: 5,
      weeekday: 5,
      weeekday_name: 'Thursday',
      timings: [''],
    },
    {
      id: 6,
      weeekday: 6,
      weeekday_name: 'Friday',
      timings: [''],
    },
    {
      id: 7,
      weeekday: 7,
      weeekday_name: 'Saturday',
      timings: [''],
    },
  ]);

  return (
    <SafeAreaView style={{flex: 1, backgroundColor: '#fff'}}>
      <Header
        back_button
        back_img_source={IMAGES.Goback}
        LeftImagehght={normalize(20)}
        LeftImagewidth={normalize(20)}
        leftImagebackground={'#F3F3F3'}
        ImagePadding={normalize(5)}
        LeftImggborderradius={normalize(10)}
        gobackmarginLeft={normalize(10)}
        justifyContent={'space-between'}
        backmargintop={Platform.OS == 'android' ? normalize(30) : normalize(20)}
        text
        textRight={normalize(40)}
        title={'Slots'}
        textcolor={'black'}
        textfont={Fonts.PoppinsMedium}
        textSize={normalize(15)}
        textAlign={'center'}
        RightImage
        textmartop={Platform.OS == 'android' ? normalize(30) : normalize(20)}
        onPress_back_button={() => {
          navigation.goBack();
        }}
      />
      {/* <View style={{marginTop: normalize(20), marginHorizontal: normalize(20)}}>
        <FlatList
          data={selectSlot}
          horizontal
          showsHorizontalScrollIndicator={false}
          renderItem={({item}) => {
            return (
              <View>
                <TouchableOpacity
                  style={{
                    width: normalize(70),
                    paddingVertical: normalize(6),
                    borderWidth: normalize(1),
                    borderRadius: normalize(10),
                    alignItems: 'center',
                    marginRight: normalize(10),
                  }}>
                  <Text>{item?.weeekday_name}</Text>
                </TouchableOpacity>
              </View>
            );
          }}
        />
      </View>
      <View style={{marginTop: normalize(20), marginHorizontal: normalize(20)}}>
        <FlatList
          data={TimeSlot}
          key={'#'}
          numColumns={4}
          columnWrapperStyle={{justifyContent: 'space-between'}}
          renderItem={({item}) => {
            return (
              <TouchableOpacity
                style={{
                  width: normalize(60),
                  paddingVertical: normalize(6),
                  borderWidth: normalize(1),
                  borderRadius: normalize(8),
                  marginVertical: normalize(5),
                  justifyContent: 'center',
                  alignItems: 'center',
                }}>
                <Text>{item}</Text>
              </TouchableOpacity>
            );
          }}
        />
      </View> */}
      <ScrollView showsVerticalScrollIndicator={false}>
        {timeSlotsData.map(day => (
          <View
            key={day.weeekday_name}
            style={{marginHorizontal: normalize(20)}}>
            <Text style={{marginVertical: normalize(10)}}>
              {day.weeekday_name}
            </Text>
            <FlatList
              data={TimeSlot}
              key={'#'}
              numColumns={4}
              columnWrapperStyle={{justifyContent: 'space-between'}}
              renderItem={({item}) => {
                return (
                  <TouchableOpacity
                    style={{
                      padding: normalize(5),
                      borderWidth: 1,
                      borderRadius: normalize(10),
                      marginTop: normalize(10),
                    }}
                    key={item}
                    title={item}>
                    <Text style={{color: '#000'}}>{item}</Text>
                  </TouchableOpacity>
                );
              }}
            />
          </View>
        ))}
        <TouchableOpacity
          // onPress={() => dispatch(UpdateSlotsRequest(timeSlotsData))}
          style={{
            paddingVertical: normalize(10),
            borderRadius: normalize(12),
            backgroundColor: '#000',
            margin: normalize(30),
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <Text style={{color: '#fff'}}>Submit</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Slots;

const styles = StyleSheet.create({});
