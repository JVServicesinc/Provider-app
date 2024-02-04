import React from 'react';
import {Image, Platform, ScrollView, StatusBar, View} from 'react-native';
import {SafeAreaView} from 'react-native';
import Header from '../../components/Header';
import {Fonts, IMAGES} from '../../themes/Themes';
import normalize from '../../utils/helpers/normalize';
import {Text} from 'react-native';
import Button from '../../components/Button';

function WithoutMask(props) {
  return (
    <SafeAreaView style={{flex: 1, backgroundColor: '#F5C443'}}>
        <StatusBar
          backgroundColor={'#F5C443'}
          translucent={true}
          barStyle={'dark-content'}
        />
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
        backmargintop={Platform.OS == 'android' ? normalize(50) : normalize(20)}
        textmartop={Platform.OS == 'android' ? normalize(50) : normalize(20)}
        onPress_back_button={() => {
          props.navigation.goBack();
        }}
      />
         <ScrollView>
            
      
      <View style={{alignItems: 'center', justifyContent: 'center'}}>
        <Text
          style={{
            color: 'black',
            fontFamily: Fonts.PoppinsSemiBold,
            fontSize: normalize(19),
            marginTop: normalize(25),
          }}>
          Add a picture without mask
        </Text>
        <Text
          style={{
            color: '#161616',
            fontSize: normalize(10.8),
            fontFamily: Fonts.PoppinsRegular,
          }}>
          A picture is shown below for your reference
        </Text>
        <Image
          source={IMAGES.withoutmask}
          style={{height: normalize(200), width: normalize(200),marginTop:normalize(80)}}
        />
      </View>
      </ScrollView>
      <Button width={'95%'}
      backgroundColor={'black'}
      alignSelf={'center'}
      borderRadius={normalize(8)}
      titlesingle={true}
      title={'Proceed'}
      textColor={'white'}
      fontFamily={Fonts.PoppinsMedium}
      fontSize={normalize(12)}
      marginBottom={normalize(20)}
      onPress={()=>{
        props.navigation.navigate('AddPicture')
      }}/>
    </SafeAreaView>
  );
}

export default WithoutMask;
