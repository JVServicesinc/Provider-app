import React, {useState} from 'react';
import {
  FlatList,
  Platform,
  SafeAreaView,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import Header from '../../components/Header';
import {Fonts, IMAGES} from '../../themes/Themes';
import normalize from '../../utils/helpers/normalize';
import Button from '../../components/Button';
import {useDispatch, useSelector} from 'react-redux';
import {
  ChangeStatusRequest,
  ProviderProfileRequest,
} from '../../redux/reducer/ProfileReducer';
import connectionrequest from '../../utils/helpers/NetInfo';
import showErrorAlert from '../../utils/helpers/Toast';
let status;

function OfflineReason(props) {
  const dispatch = useDispatch();
  const ProfileReducer = useSelector(state => state.ProfileReducer);
  const [indexvalue, setindexvalue] = useState();
  const [reason, setreason] = useState('');
  const [autoreason, setAutoreason] = useState('');
  const [auto, setAuto] = useState(false);

  const reasonData = [
    {
      id: 1,
      title: 'A reason here for getting offline',
    },
    {
      id: 2,
      title:
        'A reason here for getting offline, a reason here for getting offline',
    },
    {
      id: 3,
      title: 'A reason here for getting offline',
    },
    {
      id: 4,
      title:
        'A reason here for getting offline, a reason here for getting offline',
    },
  ];
  const reasonrenderItem = ({item, index}) => {
    return (
      <TouchableOpacity
        style={{
          width: '95%',
          marginVertical: normalize(10),
          paddingLeft: normalize(10),
          flexDirection: 'row',
          alignItems: 'center',
        }}
        onPress={() => {
          setindexvalue(index);
          setAuto(true);
          setAutoreason(item?.title);
          setreason('');
        }}>
        <View
          style={{
            height: normalize(15),
            width: normalize(15),
            borderRadius: normalize(20),
            borderWidth: normalize(1),
            borderColor: indexvalue == index ? 'black' : '#757575',
            alignItems: 'center',
            justifyContent: 'center',
          }}>
          {indexvalue == index ? (
            <View
              style={{
                height: normalize(10),
                width: normalize(10),
                borderRadius: normalize(20),
                backgroundColor: '#000000',
              }}
            />
          ) : null}
        </View>

        <Text
          style={{
            color: '#161616',
            fontSize: normalize(11),
            fontFamily: Fonts.PoppinsRegular,
            marginLeft: normalize(10),
          }}>
          {item?.title}
        </Text>
      </TouchableOpacity>
    );
  };
  const handleSubmit = () => {
    let obj = {
      status: 'offline',
      reson: auto ? autoreason : reason,
    };
    connectionrequest()
      .then(() => {
        dispatch(ChangeStatusRequest(obj));
      })
      .catch(err => {
        showErrorAlert('Please connect to internet');
      });
  };
  const handleTextInputChange = txt => {
    setreason(txt);
    setAutoreason('');
    setindexvalue(-1);
    setAuto(false);
  };

  if (status == '' || ProfileReducer.status != status) {
    switch (ProfileReducer.status) {
      case 'Profile/ChangeStatusRequest':
        status = ProfileReducer.status;
        break;
      case 'Profile/ChangeStatusSuccess':
        status = ProfileReducer.status;
        dispatch(ProviderProfileRequest());
        props.navigation.navigate('Home');
        break;
      case 'Profile/ChangeStatusFailure':
        status = ProfileReducer.status;
        break;
    }
  }

  return (
    <SafeAreaView style={{flex: 1, backgroundColor: 'white'}}>
      <Header
        back_button
        back_img_source={IMAGES.Goback}
        LeftImagehght={normalize(20)}
        LeftImagewidth={normalize(20)}
        leftImagebackground={'#dbdbdb'}
        ImagePadding={normalize(5)}
        LeftImggborderradius={normalize(10)}
        gobackmarginLeft={normalize(10)}
        justifyContent={'space-between'}
        backmargintop={Platform.OS == 'android' ? normalize(50) : normalize(20)}
        text
        textRight={normalize(25)}
        title={'Go Offline'}
        textcolor={'black'}
        textfont={Fonts.PoppinsSemiBold}
        textSize={normalize(16)}
        textAlign={'center'}
        RightImage
        textmartop={Platform.OS == 'android' ? normalize(50) : normalize(20)}
        onPress_back_button={() => {
          props.navigation.goBack();
        }}
      />
      <ScrollView>
        <FlatList
          data={reasonData}
          renderItem={reasonrenderItem}
          ListHeaderComponent={() => {
            return (
              <View
                style={{
                  padding: normalize(12),
                  width: '100%',
                  backgroundColor: '#F3F3F3',
                  marginTop: normalize(20),
                }}>
                <Text
                  style={{
                    color: '#757575',
                    fontSize: normalize(11),
                    fontFamily: Fonts.PoppinsSemiBold,
                    textTransform: 'uppercase',
                  }}>
                  reason for getting offline
                </Text>
              </View>
            );
          }}
        />
        <View
          style={{
            width: '95%',
            backgroundColor: '#F3F3F3',
            borderRadius: normalize(10),
            height: normalize(150),
            padding: normalize(10),
            margin: normalize(10),
            alignSelf: 'center',
          }}>
          <TextInput
            value={reason}
            onChangeText={handleTextInputChange}
            placeholder="or comment your reason here. . ."
            placeholderTextColor={'#757575'}
            multiline={true}
            style={{
              width: '100%',
              height: normalize(200),
              fontSize: normalize(12),
              color: 'black',
              fontFamily: Fonts.PoppinsRegular,
              height: normalize(130),
            }}
            textAlignVertical="top"
          />
        </View>
      </ScrollView>
      <Button
        width={'95%'}
        backgroundColor={
          reason.trim() == '' && autoreason.trim() == '' ? '#CCCCCC' : 'black'
        }
        alignSelf={'center'}
        borderRadius={normalize(8)}
        titlesingle={true}
        title={'Submit'}
        textColor={'white'}
        fontFamily={Fonts.PoppinsMedium}
        marginBottom={normalize(20)}
        disabled={reason.trim() == '' && autoreason.trim() == '' ? true : false}
        fontSize={normalize(12)}
        onPress={() => {
          handleSubmit();
        }}
      />
    </SafeAreaView>
  );
}

export default OfflineReason;
