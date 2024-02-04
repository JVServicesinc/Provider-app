// import React, {useState} from 'react';
// import {
//   FlatList,
//   KeyboardAvoidingView,
//   Platform,
//   SafeAreaView,
//   ScrollView,
//   Text,
//   TextInput,
// } from 'react-native';
// import Header from '../../components/Header';
// import {Fonts, IMAGES} from '../../themes/Themes';
// import normalize from '../../utils/helpers/normalize';
// import {View} from 'react-native';
// import Button from '../../components/Button';

// function Depositmoney(props) {
//   const [amount, setamount] = useState('');
//   const walletblns = [
//     {
//       id: 1,
//       blns: '+ ₹100',
//     },
//     {
//       id: 2,
//       blns: '+ ₹200',
//     },
//   ];
//   const walletrender = ({item}) => {
//     return (
//       <View
//         style={{
//           backgroundColor: '#F3F3F3',
//           borderRadius: normalize(15),
//           // width: '60%',
//           padding: normalize(10),
//           marginHorizontal: normalize(10),
//           marginTop: normalize(50),
//         }}>
//         <Text
//           style={{
//             color: '#757575',
//             fontSize: normalize(13),
//             fontFamily: Fonts.PoppinsMedium,
//           }}>
//           {item?.blns}
//         </Text>
//       </View>
//     );
//   };
//   return (
//     <SafeAreaView style={{flex: 1, backgroundColor: 'white'}}>
//   <Header
//     back_button
//     back_img_source={IMAGES.Goback}
//     LeftImagehght={normalize(20)}
//     LeftImagewidth={normalize(20)}
//     leftImagebackground={'#dbdbdb'}
//     ImagePadding={normalize(5)}
//     LeftImggborderradius={normalize(10)}
//     gobackmarginLeft={normalize(10)}
//     justifyContent={'space-between'}
//     backmargintop={Platform.OS == 'android' ? normalize(20) : normalize(20)}
//     text
//     textRight={normalize(25)}
//     title={'Enter Amount'}
//     textcolor={'black'}
//     textfont={Fonts.PoppinsSemiBold}
//     textSize={normalize(16)}
//     textAlign={'center'}
//     RightImage
//     textmartop={Platform.OS == 'android' ? normalize(20) : normalize(20)}
//     onPress_back_button={() => {
//       props.navigation.goBack();
//     }}
//   />
//       <ScrollView style={{flex: 1}} >
//         <KeyboardAvoidingView
//           behavior={Platform.OS === 'ios' ? 'padding' : null}
//           enabled>
//           <View
//             style={{
//               justifyContent: 'center',
//               alignItems: 'center',
//               //   padding: normalize(100),
//               marginTop: normalize(100),
//             }}>
//             <TextInput
//               value={amount}
//               onChangeText={text => {
//                 setamount(text);
//               }}
//               placeholder="₹0"
//               placeholderTextColor={'#ABABAB'}
//               style={{
//                 color: 'black',
//                 fontSize: normalize(25),
//                 fontFamily: Fonts.PoppinsSemiBold,
//               }}
//               keyboardType="number-pad"
//             />
//             <Text
//               style={{
//                 color: '#161616',
//                 fontSize: normalize(12),
//                 fontFamily: Fonts.PoppinsMedium,
//                 marginTop: normalize(5),
//               }}>
//               Current Balance{' '}
//               <Text style={{fontFamily: Fonts.PoppinsBold}}>₹3600</Text>
//             </Text>
//           </View>
//         </KeyboardAvoidingView>

//       </ScrollView>
//       <FlatList data={walletblns} renderItem={walletrender} horizontal />
//       <Button
//         alignSelf={'center'}
//         marginTop={normalize(10)}
//         marginBottom={normalize(10)}
//         backgroundColor={'black'}
//         height={normalize(40)}
//         width={'90%'}
//         borderRadius={normalize(10)}
//         textColor={'white'}
//         fontSize={normalize(15)}
//         title={'Next'}
//         titlesingle={true}
//         fontFamily={
//           Platform.OS == 'ios' ? Fonts.PoppinsSemiBold : Fonts.PoppinsSemiBold
//         }
//         onPress={() => {
//           // props.navigation.navigate('SignUp2');
//           //   Next();
//         }}
//       />
//     </SafeAreaView>
//   );
// }

// export default Depositmoney;

import React, {useState} from 'react';
import {
  View,
  SafeAreaView,
  ScrollView,
  Text,
  TextInput,
  FlatList,
  KeyboardAvoidingView,
  Platform,
  TouchableOpacity,
} from 'react-native';
import Header from '../../components/Header';
import {Fonts, IMAGES} from '../../themes/Themes';
import normalize from '../../utils/helpers/normalize';
import Button from '../../components/Button';

function Depositmoney(props) {
  const [amount, setAmount] = useState('');
  const [amountValue, setamountValue] = useState('');
  const walletblns = [
    {
      id: 1,
      blns: '+ ₹100',
    },
    {
      id: 2,
      blns: '+ ₹200',
    },
    {
      id: 2,
      blns: '+ ₹200',
    },
    {
      id: 2,
      blns: '+ ₹200',
    },
    {
      id: 2,
      blns: '+ ₹200',
    },
  ];

  const walletrender = ({item}) => {
    return (
      <TouchableOpacity
        style={{
          backgroundColor: '#F3F3F3',
          borderRadius: normalize(15),
          padding: normalize(10),
          marginHorizontal: normalize(10),
          marginTop: normalize(50),
          //   height:normalize(50),
          //   top: 0,
          //   position:'absolute'
        }}
        onPress={() => {
          setamountValue(item?.blns);
        }}>
        <Text
          style={{
            color: '#757575',
            fontSize: normalize(13),
            fontFamily: Fonts.PoppinsMedium,
          }}>
          {item?.blns}
        </Text>
      </TouchableOpacity>
    );
  };

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
        backmargintop={Platform.OS == 'android' ? normalize(40) : normalize(20)}
        text
        textRight={normalize(25)}
        title={'Enter Amount'}
        textcolor={'black'}
        textfont={Fonts.PoppinsSemiBold}
        textSize={normalize(16)}
        textAlign={'center'}
        RightImage
        textmartop={Platform.OS == 'android' ? normalize(40) : normalize(20)}
        onPress_back_button={() => {
          props.navigation.goBack();
        }}
      />
      <ScrollView style={{flex: 1}} nestedScrollEnabled={true}>
        <KeyboardAvoidingView
          behavior={Platform.OS === 'ios' ? 'padding' : null}
          enabled>
          {/* <View
            style={{
              justifyContent: 'center',
              alignItems: 'center',
              marginTop: normalize(100),
              // backgroundColor:'red',
              width:'100%'
            }}>
            <TextInput
            //   value={amountValue ? amountValue : amount}
            value={amount}
              onChangeText={text => {
                // amountValue ? setamountValue(text) :
                 setAmount(text);
              }}
              placeholder="₹0"
              placeholderTextColor={'#ABABAB'}
              style={{
                color: 'black',
                fontSize: normalize(25),
                fontFamily: Fonts.PoppinsSemiBold,
                padding:normalize(1),
                // backgroundColor:'blue',

                width:'10%',
                textAlign:'center'
              }}
              keyboardType="number-pad"
            />
            <Text
              style={{
                color: '#161616',
                fontSize: normalize(12),
                fontFamily: Fonts.PoppinsMedium,
                marginTop: normalize(5),
              }}>
              Current Balance{' '}
              <Text style={{fontFamily: Fonts.PoppinsBold}}>₹3600</Text>
            </Text>
          </View> */}
          <View
            style={{
              justifyContent: 'center',
              alignItems: 'center',
              marginTop: normalize(100),
              // backgroundColor:'red',

              width: '100%',
            }}>
            <TextInput
              value={amount}
              onChangeText={text => {
                setAmount(text);
              }}
              placeholder="₹0"
              placeholderTextColor={'#ABABAB'}
              multiline={true}
              style={{
                width: '40%',
                // height: normalize(200),
                fontSize: normalize(25),
                color: 'black',
                fontFamily: Fonts.PoppinsMedium,
                height: normalize(60),
                textAlign: 'center',

                // backgroundColor:'blue'
              }}
              keyboardType="number-pad"
              // textAlignVertical="top"
            />
            <Text
              style={{
                color: '#161616',
                fontSize: normalize(12),
                fontFamily: Fonts.PoppinsMedium,
                marginTop: normalize(5),
              }}>
              Current Balance{' '}
              <Text style={{fontFamily: Fonts.PoppinsBold}}>₹3600</Text>
            </Text>
          </View>
        </KeyboardAvoidingView>
      </ScrollView>
      <FlatList
        data={walletblns}
        renderItem={walletrender}
        horizontal
        style={{
          //   marginBottom: normalize(10),
          //   paddingHorizontal: normalize(10),
          position: 'absolute',
          bottom: Platform.OS == 'ios' ? normalize(100) : normalize(70),
        }}
        showsHorizontalScrollIndicator={false}
      />

      <Button
        disabled={amount == '' ? true : false}
        alignSelf={'center'}
        marginTop={normalize(10)}
        marginBottom={normalize(10)}
        backgroundColor={amount == '' ? 'grey' : 'black'}
        height={normalize(40)}
        width={'90%'}
        borderRadius={normalize(10)}
        textColor={'white'}
        fontSize={normalize(15)}
        title={'Continue'}
        titlesingle={true}
        fontFamily={Fonts.PoppinsSemiBold}
        onPress={() => {
          // Handle button press logic here
        }}
      />
    </SafeAreaView>
  );
}

export default Depositmoney;
