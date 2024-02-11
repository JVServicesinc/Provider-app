import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  Platform,
  TouchableOpacity,
  FlatList,
  Dimensions,
  TextInput,
  Image,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import Header from '../../components/Header';
import {Fonts, IMAGES} from '../../themes/Themes';
import normalize from '../../utils/helpers/normalize';
import {useDispatch, useSelector} from 'react-redux';
import {
  ProviderServicesRequest,
  ServicesAddRequest,
  ServicetypesRequest,
} from '../../redux/reducer/ServiceReducer';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import Dropdown from '../../components/Dropdown';
import Modal from 'react-native-modal';
import constants from '../../utils/helpers/constants';
import axios from 'axios';
import showErrorAlert from '../../utils/helpers/Toast';
import connectionrequest from '../../utils/helpers/NetInfo';
import Loader from '../../utils/helpers/Loader';
let status;

const RateCard = props => {
  const dispatch = useDispatch();
  const ServiceReducer = useSelector(state => state.ServiceReducer);
  const AuthReducer = useSelector(state => state.AuthReducer);

  const [serviceList, setServiceList] = useState([]);

  const [typelist, setTypeList] = useState([]);
  const [catlist, setCatList] = useState([]);
  const [sublist, setSubList] = useState([]);

  const [show, setShow] = useState('');
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [type_id, setType_id] = useState(null);
  const [category_id, setCategory_id] = useState(null);
  const [subcategory_id, setSubcategory_id] = useState(null);
  const [price, setPrice] = useState('');
  const [duration, setDuration] = useState('');

  const [typeModal, setTypeModal] = useState(false);
  const [catModal, setCatModal] = useState(false);
  const [subModal, setSubModal] = useState(false);

  const [type, setType] = useState('');
  const [category, setCategory] = useState('');
  const [subcategory, setSubcategory] = useState('');

  const [error, setError] = useState(false);
  const [error1, setError1] = useState(false);
  const [error2, setError2] = useState(false);
  const [error3, setError3] = useState(false);
  const [error4, setError4] = useState(false);
  const [error5, setError5] = useState(false);
  const [error6, setError6] = useState(false);

  useEffect(() => {
    setServiceList(ServiceReducer?.ProviderServicesResponse?.message);
  }, [ServiceReducer?.ProviderServicesResponse]);

  useEffect(() => {
    setTypeList(ServiceReducer?.ServicetypesResponse?.data);
  }, [ServiceReducer?.ServicetypesResponse]);

  const getCatList = async () => {
    try {
      const accessToken = await AuthReducer?.token;
      const headers = {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: `Bearer ${accessToken ?? ''}`,
      };
      const {data} = await axios({
        method: 'GET',
        url: `provider/service-categoires?service_type_id=${type_id}`,
        baseURL: constants.BASE_URL,
        headers,
      });
      setCatList(data?.data);
    } catch (err) {
    }
  };
  const getSubCatList = async () => {
    try {
      const accessToken = await AuthReducer?.token;
      const headers = {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        // 'x-access-token': accessToken,
        Authorization: `Bearer ${accessToken ?? ''}`,
      };
      const {data} = await axios({
        method: 'GET',
        url: `provider/service-categoires/${category_id}/subcategory`,
        baseURL: constants.BASE_URL,
        headers,
      });
      setSubList(data?.data);
    } catch (err) {
    }
  };

  const onSubmitPress = () => {
    if (name.trim('') == '') {
      setError(true);
    } else if (description.trim('') == '') {
      setError1(true);
    } else if (type == '') {
      setError2(true);
    } else if (category == '') {
      setError3(true);
    } else if (subcategory == '') {
      setError4(true);
    } else if (price == '') {
      setError5(true);
    } else if (price < 1) {
      setError5(true);
      showErrorAlert('Enter a vaild cost');
    } else if (duration == '') {
      setError6(true);
    } else if (duration < 1 || duration > 24) {
      setError6(true);
      showErrorAlert('Enter a vaild duration');
    } else {
      connectionrequest()
        .then(() => {
          dispatch(
            ServicesAddRequest({
              name: name,
              description: description,
              category_id: category_id,
              subcategory_id: subcategory_id,
              price: price,
              duration: duration,
            }),
          );
        })
        .catch(err => {
          showErrorAlert('Please connect to internet');
        });
    }
  };

  useEffect(() => {
    dispatch(ServicetypesRequest());
    dispatch(ProviderServicesRequest());
  }, []);

  useEffect(() => {
    getCatList();
    setCategory(''), setCategory_id(null);
    setSubcategory(''), setSubcategory_id(null);
  }, [type_id]);

  useEffect(() => {
    getSubCatList();
    setSubcategory(''), setSubcategory_id(null);
  }, [category_id]);

  if (status == '' || ServiceReducer.status != status) {
    switch (ServiceReducer.status) {
      case 'Service/ServicesAddRequest':
        status = ServiceReducer.status;
        break;
      case 'Service/ServicesAddSuccess':
        status = ServiceReducer.status;
        setShow(false);
        dispatch(ProviderServicesRequest());
        setName('');
        setDescription('');
        setCategory('');
        setSubcategory('');
        setPrice('');
        setDuration('');

        break;
      case 'Service/ServicesAddFailure':
        status = ServiceReducer.status;
        break;
    }
  }

  return (
    <SafeAreaView style={{flex: 1, backgroundColor: '#fff'}}>
      <Loader visible={ServiceReducer.status == 'Service/ServicesAddRequest'} />
      <KeyboardAwareScrollView
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}>
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
          backmargintop={
            Platform.OS == 'android' ? normalize(30) : normalize(20)
          }
          text
          textRight={normalize(40)}
          title={'Rate card'}
          textcolor={'black'}
          textfont={Fonts.PoppinsMedium}
          textSize={normalize(15)}
          textAlign={'center'}
          RightImage
          textmartop={Platform.OS == 'android' ? normalize(30) : normalize(20)}
          onPress_back_button={() => {
            props.navigation.goBack();
          }}
        />
        <View style={{paddingHorizontal: normalize(15)}}>
          <TouchableOpacity
            onPress={() => setShow(true)}
            style={{
              paddingVertical: normalize(10),
              backgroundColor: '#000',
              justifyContent: 'center',
              alignItems: 'center',
              borderRadius: normalize(12),
              marginTop: normalize(16),
            }}>
            <Text style={styles.txtw}>+ Add New Secvices</Text>
          </TouchableOpacity>

          {show && (
            <View>
              <TextInput
                placeholderTextColor={'#000'}
                placeholder="Service Name"
                value={name}
                onChangeText={txt => setName(txt)}
                style={{
                  ...styles.txtinput,
                  borderColor: error ? 'red' : 'gray',
                }}
              />
              <TextInput
                placeholderTextColor={'#000'}
                placeholder="Service Description"
                value={description}
                onChangeText={txt => setDescription(txt)}
                style={{
                  ...styles.txtinput,
                  borderColor: error1 ? 'red' : 'gray',
                }}
              />

              <Dropdown
                width={'100%'}
                borderWidth={normalize(1)}
                height={normalize(40)}
                fontFamily={Fonts.PoppinsMedium}
                fontSize={normalize(12)}
                borderColor={error2 ? 'red' : 'gray'}
                rightIcon={IMAGES.DownArrow2}
                iconHeight={normalize(15)}
                iconWidth={normalize(15)}
                marginTop={normalize(10)}
                value={type == '' ? 'Service Type' : type}
                onPress={() => {
                  setTypeModal(!typeModal);
                }}
              />
              <Dropdown
                width={'100%'}
                borderWidth={normalize(1)}
                height={normalize(40)}
                fontFamily={Fonts.PoppinsMedium}
                fontSize={normalize(12)}
                borderColor={error3 ? 'red' : 'gray'}
                rightIcon={IMAGES.DownArrow2}
                iconHeight={normalize(15)}
                iconWidth={normalize(15)}
                marginTop={normalize(10)}
                value={category == '' ? 'Service Category' : category}
                onPress={() => {
                  setCatModal(!catModal);
                }}
              />
              <Dropdown
                width={'100%'}
                color={'#000'}
                fontFamily={Fonts.PoppinsMedium}
                fontSize={normalize(12)}
                borderWidth={normalize(1)}
                height={normalize(40)}
                borderColor={error4 ? 'red' : 'gray'}
                rightIcon={IMAGES.DownArrow2}
                iconHeight={normalize(15)}
                iconWidth={normalize(15)}
                marginTop={normalize(10)}
                value={subcategory == '' ? 'Service Subcategory' : subcategory}
                onPress={() => {
                  setSubModal(!subModal);
                }}
              />

              <TextInput
                placeholderTextColor={'#000'}
                placeholder="Service Cost"
                keyboardType="number-pad"
                value={price}
                onChangeText={txt => setPrice(txt)}
                style={{
                  ...styles.txtinput,
                  borderColor: error5 ? 'red' : 'gray',
                }}
              />
              <TextInput
                placeholderTextColor={'#000'}
                placeholder="Service Duration"
                keyboardType="number-pad"
                value={duration}
                onChangeText={txt => setDuration(txt)}
                style={{
                  ...styles.txtinput,
                  borderColor: error6 ? 'red' : 'gray',
                }}
              />
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  marginTop: normalize(10),
                }}>
                <TouchableOpacity
                  style={styles.btn}
                  onPress={() => setShow(false)}>
                  <Text style={styles.txtw}>Cancle</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={styles.btn}
                  onPress={() => {
                    onSubmitPress();
                  }}>
                  <Text style={styles.txtw}>Submit</Text>
                </TouchableOpacity>
              </View>
            </View>
          )}

          <Text
            style={{
              color: '#000',
              fontSize: normalize(13),
              fontFamily: Fonts.PoppinsMedium,
              marginTop: normalize(16),
            }}>
            List of Secvices
          </Text>

          <FlatList
            data={serviceList}
            renderItem={({item}) => {
              return (
                <View
                  style={{
                    borderWidth: normalize(1),
                    borderColor: 'gray',
                    borderRadius: normalize(8),
                    paddingVertical: normalize(10),
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    paddingHorizontal: normalize(10),
                    marginVertical: normalize(4),
                  }}>
                  <Text
                    numberOfLines={2}
                    style={{...styles.txtb, width: '60%'}}>
                    {item?.name}
                  </Text>
                  <Text style={styles.txtb}>${item?.price}</Text>
                </View>
              );
            }}
            ListEmptyComponent={() => {
              return (
                <View
                  style={{
                    width: Dimensions.get('window').width,
                    height: normalize(50),
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}>
                  <Text>No data avilable</Text>
                </View>
              );
            }}
          />

          <View style={{...styles.container, borderColor: '#F2ECFD'}}>
            <View style={{...styles.colorview, backgroundColor: '#F2ECFD'}}>
              <View style={{...styles.circle, backgroundColor: '#8C52FF'}}>
                <Image source={IMAGES.Bag} style={styles.img} />
              </View>
              <View>
                <Text style={styles.txtsmb}>Service Earning</Text>
                <Text style={styles.txtb}>earnings per job</Text>
              </View>
            </View>

            <View style={{padding: normalize(15)}}>
              <View style={styles.faj}>
                <View>
                  <Text style={styles.txtb}>Total Distance pay</Text>
                  <Text style={styles.txtgray}>
                    for total distance travelled
                  </Text>
                </View>
                <View style={styles.grayback}>
                  <Text style={styles.txtsmb}>
                    + $5.25 <Text style={styles.txtgray}>per km</Text>
                  </Text>
                </View>
              </View>

              <View style={styles.dashline} />

              <View style={styles.faj}>
                <Text style={styles.txtgray}>Incentive distance pay</Text>
                <Text style={styles.txtgray}>$0.35 per km</Text>
              </View>

              <View style={styles.faj}>
                <Text style={styles.txtgray}>Base distance pay</Text>
                <Text style={styles.txtgray}>$5 per km</Text>
              </View>

              <View style={styles.dashline} />

              <View style={styles.faj}>
                <View>
                  <Text style={styles.txtb}>Minimum base pay</Text>
                  <Text style={styles.txtgray}>guranteed pay for service</Text>
                </View>
                <View style={styles.grayback}>
                  <Text style={styles.txtsmb}>
                    + $15 <Text style={styles.txtgray}>per km</Text>
                  </Text>
                </View>
              </View>
            </View>
          </View>

          <View style={{...styles.container, borderColor: '#D2EBFF'}}>
            <View style={{...styles.colorview, backgroundColor: '#D2EBFF'}}>
              <View style={{...styles.circle, backgroundColor: '#2B95E9'}}>
                <Image source={IMAGES.Cup} style={styles.img} />
              </View>
              <View>
                <Text style={styles.txtsmb}>Daily Target Pay</Text>
                <Text style={styles.txtb}>for reaching job pay targets</Text>
              </View>
            </View>
            <View style={{padding: normalize(15)}}>
              <Text
                style={{
                  ...styles.txtgray,
                  color: '#2B95E9',
                  marginBottom: normalize(8),
                }}>
                Only one of these targets can be earned in a day
              </Text>

              <View style={styles.faj}>
                <View>
                  <Text style={styles.txtb}>Daily</Text>
                  <Text style={styles.txtgray}>12am - 11:59pm</Text>
                </View>
                <View style={styles.grayback}>
                  <Text style={styles.txtgray}>
                    up to <Text style={styles.txtsmb}>+ $300</Text>
                  </Text>
                </View>
              </View>

              <View style={{...styles.faj, marginTop: normalize(10)}}>
                <Text
                  style={{
                    ...styles.txtb,
                    color: '#757575',
                    width: '26%',
                  }}>
                  Target Pay
                </Text>
                <Text style={styles.txtgray}>$160 </Text>
                <Text style={styles.txtgray}>$160 </Text>
                <Text style={styles.txtgray}>$160 </Text>
                <Text style={styles.txtgray}>$160 </Text>
              </View>

              <View
                style={{
                  ...styles.faj,
                  backgroundColor: '#F3F3F3',
                  height: normalize(4),
                  marginTop: normalize(8),
                }}>
                <Text
                  style={{
                    ...styles.txtb,
                    color: '#757575',
                    width: '26%',
                  }}></Text>
                <View style={styles.dot} />
                <View style={styles.dot} />
                <View style={styles.dot} />
                <View style={styles.dot} />
              </View>

              <View style={{...styles.faj, marginTop: normalize(10)}}>
                <Text
                  style={{
                    ...styles.txtb,
                    color: '#757575',
                    width: '26%',
                  }}>
                  Order Pay
                </Text>
                <Text style={styles.txtgray}>$165*</Text>
                <Text style={styles.txtgray}>$165*</Text>
                <Text style={styles.txtgray}>$165*</Text>
                <Text style={styles.txtgray}>$165*</Text>
              </View>
            </View>
          </View>
        </View>

        <View style={{height: normalize(100)}} />
      </KeyboardAwareScrollView>

      <Modal
        animationIn={'slideInUp'}
        animationOut={'slideOutDown'}
        backdropTransitionOutTiming={0}
        hideModalContentWhileAnimating={true}
        isVisible={typeModal || catModal || subModal}
        style={{width: '100%', alignSelf: 'center', margin: 0}}
        animationInTiming={800}
        animationOutTiming={500}
        onBackButtonPress={() => {
          setTypeModal(false);
          setCatModal(false);
          setSubModal(false);
        }}
        onBackdropPress={() => {
          setTypeModal(false);
          setCatModal(false);
          setSubModal(false);
        }}>
        <View
          style={{
            flex: 1,
            backgroundColor: '#ddd',
            position: 'absolute',
            bottom: 0,
            left: 0,
            right: 0,
            zIndex: 10,
            backgroundColor: '#fff',
            borderTopRightRadius: normalize(7),
            borderTopLeftRadius: normalize(7),
            overflow: 'hidden',
            paddingBottom: Platform.OS == 'ios' ? normalize(16) : 0,
          }}>
          <View style={{height: normalize(200)}}>
            <Text
              style={{
                fontFamily: Fonts.PoppinsMedium,
                fontSize: normalize(14),
                color: '#000',
                textAlign: 'center',
                marginVertical: normalize(10),
              }}>
              {typeModal
                ? 'Service type'
                : catModal
                ? 'Service Category'
                : subModal
                ? 'Service SubCategory'
                : ''}
            </Text>
            {typeModal ? (
              <FlatList
                data={typelist}
                contentContainerStyle={[
                  Platform.OS == 'ios' ? {paddingBottom: normalize(15)} : null,
                ]}
                showsVerticalScrollIndicator={false}
                keyExtractor={(item, index) => index.toString()}
                renderItem={({item, index}) => {
                  return (
                    <TouchableOpacity
                      onPress={() => {
                        setTypeModal(false);
                        setType(item?.name);
                        setType_id(Number(item?.id));
                      }}
                      style={styles.touchcon}>
                      <Text style={styles.touchtxt}>{item?.name}</Text>
                    </TouchableOpacity>
                  );
                }}
              />
            ) : catModal ? (
              <FlatList
                data={catlist}
                contentContainerStyle={[
                  Platform.OS == 'ios' ? {paddingBottom: normalize(15)} : null,
                ]}
                showsVerticalScrollIndicator={false}
                keyExtractor={(item, index) => index.toString()}
                renderItem={({item, index}) => {
                  return (
                    <TouchableOpacity
                      onPress={() => {
                        setCatModal(false);
                        setCategory(item?.name);
                        setCategory_id(Number(item?.id));
                      }}
                      style={styles.touchcon}>
                      <Text style={styles.touchtxt}>{item?.name}</Text>
                    </TouchableOpacity>
                  );
                }}
              />
            ) : subModal ? (
              <FlatList
                data={sublist}
                contentContainerStyle={[
                  Platform.OS == 'ios' ? {paddingBottom: normalize(15)} : null,
                ]}
                showsVerticalScrollIndicator={false}
                keyExtractor={(item, index) => index.toString()}
                renderItem={({item, index}) => {
                  return (
                    <TouchableOpacity
                      onPress={() => {
                        setSubModal(false);
                        setSubcategory(item?.name);
                        setSubcategory_id(Number(item?.id));
                      }}
                      style={styles.touchcon}>
                      <Text style={styles.touchtxt}>{item?.name}</Text>
                    </TouchableOpacity>
                  );
                }}
              />
            ) : (
              ''
            )}
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
};

export default RateCard;

const styles = StyleSheet.create({
  container: {
    borderWidth: normalize(1),
    borderRadius: normalize(20),
    marginTop: normalize(15),
    overflow: 'hidden',
  },
  colorview: {
    height: normalize(76),
    width: '100%',
    padding: normalize(15),
    flexDirection: 'row',
    alignItems: 'center',
  },
  txtinput: {
    height: normalize(40),
    width: '100%',
    borderWidth: normalize(1),
    borderColor: 'gray',
    borderRadius: normalize(12),
    fontFamily: Fonts.PoppinsMedium,
    fontSize: normalize(12),
    color: '#000',
    paddingHorizontal: normalize(15),
    marginTop: normalize(10),
  },
  btn: {
    paddingVertical: normalize(8),
    width: '48%',
    backgroundColor: '#000',
    borderRadius: normalize(12),
    justifyContent: 'center',
    alignItems: 'center',
  },
  txtw: {
    color: 'white',
    fontSize: normalize(13),
    fontFamily: Fonts.PoppinsMedium,
  },
  touchcon: {
    width: Dimensions.get('window').width,
    paddingLeft: normalize(16),
    paddingVertical: normalize(10),
    borderBottomWidth: 1,
    borderColor: 'gray',
  },
  touchtxt: {
    fontFamily: Fonts.PoppinsMedium,
    fontSize: normalize(11),
    color: 'gray',
    textTransform: 'uppercase',
  },
  txtb: {
    fontFamily: Fonts.PoppinsMedium,
    fontSize: normalize(11),
    color: '#000',
    lineHeight: normalize(14),
  },
  txtsmb: {
    fontFamily: Fonts.PoppinsSemiBold,
    fontSize: normalize(14),
    color: '#000',
    lineHeight: normalize(16),
  },
  img: {
    height: normalize(20),
    width: normalize(20),
    resizeMode: 'contain',
  },
  circle: {
    height: normalize(45),
    width: normalize(45),
    borderRadius: normalize(100),
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: normalize(10),
  },
  txtgray: {
    fontFamily: Fonts.PoppinsMedium,
    fontSize: normalize(10),
    color: '#757575',
  },
  grayback: {
    backgroundColor: '#F3F3F3',
    paddingVertical: normalize(7),
    paddingHorizontal: normalize(5),
    borderRadius: normalize(20),
  },
  dashline: {
    borderBottomWidth: normalize(1),
    borderStyle: 'dashed',
    marginVertical: normalize(8),
    borderBottomColor: '#e6e1e1',
  },
  faj: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  dot: {
    height: normalize(9),
    width: normalize(9),
    backgroundColor: '#2B95E9',
    borderRadius: normalize(50),
    marginRight: normalize(8),
  },
});
