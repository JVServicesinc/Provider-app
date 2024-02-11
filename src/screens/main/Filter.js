import React, {useState} from 'react';
import {
  FlatList,
  Image,
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
import DatePicker from 'react-native-date-picker';
import moment from 'moment';
import ProgressCircle from 'react-native-progress/Bar';
import {Slider} from 'react-native-elements';
import Button from '../../components/Button';

function Filter(props) {
  const [indexValue, setIndexValue] = useState(0);
  const [filtername, setfiltername] = useState('Date');
  const [date, setDate] = useState(new Date());
  const [open, setOpen] = useState(false);
  const [minPrice, setMinPrice] = useState(100);
  const [maxPrice, setMaxPrice] = useState(1000);
  const [currentPrice, setCurrentPrice] = useState(500);

  const percentage = ((currentPrice - minPrice) / (maxPrice - minPrice)) * 100;

  const updateCurrentPrice = () => {
    const newCurrentPrice =
      Math.floor(Math.random() * (maxPrice - minPrice + 1)) + minPrice;
    setCurrentPrice(newCurrentPrice);
  };
  const FilterData = [
    {
      id: 1,
      name: 'Date',
    },
    {
      id: 2,
      name: 'Billing',
    },
    {
      id: 3,
      name: 'Service',
    },
  ];
  const renderFilterData = ({item, index}) => {
    return (
      <TouchableOpacity
        style={{
          backgroundColor: indexValue == index ? 'white' : '#EBEBEB',

          padding: normalize(15),
        }}
        onPress={() => {
          setIndexValue(index);
          setfiltername(item?.name);
        }}>
        <Text style={{color:'#757575',fontSize:normalize(12),fontFamily:Fonts.PoppinsRegular}}>{item.name}</Text>
      </TouchableOpacity>
    );
  };
  const [serviceData, setserviceData] = useState([
    {
      id: 1,
      serviceName: 'Service name 1',
      number: '32',
      isSelected: false,
    },
    {
      id: 2,
      serviceName: 'Service name 2',
      number: '02',
      isSelected: false,
    },
    {
      id: 3,
      serviceName: 'Service name 3',
      number: '11',
      isSelected: false,
    },
    {
      id: 4,
      serviceName: 'Service name 4',
      number: '00',
      isSelected: false,
    },
    {
      id: 5,
      serviceName: 'Service name 5',
      number: '45',
      isSelected: false,
    },
  ]);

  function detail(index) {
    let newarr = [...serviceData];
    newarr[index].isSelected = !newarr[index].isSelected;
    setserviceData(newarr);
  }

  const renderServiceData = ({item, index}) => {
    return (
      <TouchableOpacity
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          marginHorizontal: normalize(15),
          marginTop: normalize(12),
          alignItems: 'center',
        }}
        onPress={() => {
          detail(index);
        }}>
        <View style={{flexDirection: 'row', alignItems: 'center'}}>
          <Image
            source={item?.isSelected ? IMAGES.SelectedChk : IMAGES.CheckBox}
            style={{height: normalize(15), width: normalize(15)}}
          />
          <Text
            style={{
              color: '#161616',
              fontSize: normalize(12),
              fontFamily: Fonts.PoppinsRegular,
              marginLeft: normalize(5),
            }}>
            {item?.serviceName}
          </Text>
        </View>
        <Text
          style={{
            color: '#757575',
            fontSize: normalize(12),
            fontFamily: Fonts.PoppinsRegular,
          }}>
          {item?.number}
        </Text>
      </TouchableOpacity>
    );
  };
  return (
    <SafeAreaView style={{flex: 1}}>
      <View
        style={{
          backgroundColor: 'white',
          borderBottomColor: '#EBEBEB',
          borderBottomWidth: normalize(1),
          paddingBottom:normalize(5)
        }}>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',

            marginHorizontal: normalize(15),
            marginTop: Platform.OS == 'ios' ? normalize(25) : normalize(50),
          }}>
          <Text
            style={{
              color: '#161616',
              fontSize: normalize(13),
              fontFamily: Fonts.PoppinsMedium,
            }}>
            Filters
          </Text>
          <TouchableOpacity>
          <Text
            style={{
              color: '#000000',
              fontSize: normalize(12),
              textTransform: 'uppercase',
              fontFamily: Fonts.PoppinsMedium,
            }}>
            Clear All
          </Text>
          </TouchableOpacity>
         
        </View>
      </View>
      
      <View style={{flexDirection: 'row', width: '100%', flex: 1}}>
        <View
          style={{
            width: '30%',
          }}>
          <FlatList
            data={FilterData}
            renderItem={renderFilterData}
            contentContainerStyle={{backgroundColor: '#EBEBEB'}}
          />
        </View>
        <View style={{width: '70%', backgroundColor: 'white'}}>
          {filtername == 'Date' ? (
            <View>
              <Text
                style={{
                  color: '#161616',
                  fontSize: normalize(13),
                  fontFamily: Fonts.PoppinsRegular,
                  marginTop: normalize(15),
                  marginLeft: normalize(20),
                }}>
                Select a date
              </Text>
              <TouchableOpacity
                style={{
                  width: '90%',
                  alignSelf: 'center',
                  marginTop: normalize(15),
                  borderColor: '#79747E',
                  borderWidth: normalize(1),
                  borderRadius: normalize(10),
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  padding: normalize(10),
                  alignItems: 'center',
                }}
                onPress={() => setOpen(true)}>
                <Text
                  style={{
                    color: '#757575',
                    fontSize: normalize(12),
                    fontFamily: Fonts.PoppinsMedium,
                  }}>
                  {moment(date).format('DD/MM/YYYY')}
                </Text>
                <Image
                  source={IMAGES.calender}
                  style={{height: normalize(20), width: normalize(20)}}
                />
              </TouchableOpacity>
            </View>
          ) : filtername == 'Billing' ? (
            <View>
              <Text
                style={{
                  color: '#161616',
                  fontSize: normalize(13),
                  fontFamily: Fonts.PoppinsRegular,
                  marginTop: normalize(15),
                  marginLeft: normalize(20),
                }}>
                Billing Range
              </Text>
              <Text
                style={{
                  color: '#161616',
                  fontSize: normalize(13),
                  fontFamily: Fonts.PoppinsSemiBold,
                  marginTop: normalize(10),
                  marginLeft: normalize(20),
                }}>
                $499 - $9999
              </Text>
              <Image
                source={IMAGES.Progress}
                style={{
                  height: normalize(20),
                  width: normalize(180),
                  marginTop: normalize(10),
                  marginLeft: normalize(20),
                }}
                resizeMode="contain"
              />
            </View>
          ) : filtername == 'Service' ? (
            <View>
              <Text
                style={{
                  color: '#161616',
                  fontSize: normalize(13),
                  fontFamily: Fonts.PoppinsRegular,
                  marginTop: normalize(15),
                  marginLeft: normalize(20),
                }}>
                Select Service
              </Text>
              <FlatList
                data={serviceData}
                renderItem={renderServiceData}
                style={{marginTop: normalize(10)}}
              />
            </View>
          ) : null}
        </View>
      </View>

      
      <View
        style={{
          flexDirection: 'row',
          width: '100%',

          backgroundColor: 'white',

          padding: normalize(10),
          justifyContent: 'space-between',
        }}>
        <Button
          width={'48%'}
          titlesingle={true}
          title={'Close'}
          backgroundColor={'#A8A8A8'}
          borderRadius={normalize(10)}
          textColor={'white'}
          onPress={() => {
            props.navigation.goBack();
          }}
        />
        <Button
          width={'48%'}
          titlesingle={true}
          title={'Apply'}
          backgroundColor={'black'}
          textColor={'white'}
          borderRadius={normalize(10)}
        />
      </View>

      <DatePicker
        modal
        mode="date"
        open={open}
        date={date}
        onConfirm={date => {
          setOpen(false);
          setDate(date);
        }}
        onCancel={() => {
          setOpen(false);
        }}
      />

      {/* </View> */}
    </SafeAreaView>
  );
}

export default Filter;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 20,
  },
});
