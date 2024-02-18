import {
    StyleSheet,
    View,
    StatusBar,
    SafeAreaView,
    ActivityIndicator,
    // ActivityIndicator,
  } from 'react-native';
import { Colors } from '../../themes/Colors';
import {WebView} from 'react-native-webview';
import React from 'react';
import {IMAGES,Fonts}  from '../../themes/Themes'
  // import {useRoute} from '@react-navigation/native';
import {t} from 'i18next';
import normalize from '../../utils/helpers/normalize';
import Header from '../../components/Header';
import constants from '../../utils/helpers/constants';
import { useNavigation } from '@react-navigation/native';
import { navigate } from '../../utils/RootNavigation';
  
export const AboutUs = () => {
  const navigation = useNavigation();
  // const route = useRoute();
  // const {title, data} = route.params ;

  const ActivityIndicatorElement = () => {
    //making a view to show to while loading the webpage
    return (
      <ActivityIndicator
        color="black"
        size="large"
        style={styles.activityIndicatorStyle}
      />
    );
  };

  return (
    <SafeAreaView style={styles.primary}>
      <View
        style={{
          paddingHorizontal: normalize(18),
          flex: 1,
        }}>
        <StatusBar backgroundColor={'#fff'} barStyle={'dark-content'} />
        <Header
        back_button
        back_img_source={IMAGES.Goback}
        LeftImagehght={normalize(20)}
        LeftImagewidth={normalize(20)}
        leftImagebackground={'#A0A0A0'}
        ImagePadding={normalize(3)}
        LeftImggborderradius={normalize(10)}
        gobackmarginLeft={normalize(10)}
        justifyContent={'space-between'}
        backmargintop={Platform.OS == 'android' ? normalize(20) : normalize(20)}
        text
        textRight={normalize(15)}
        title={'About Us'}
        textcolor={'black'}
        textfont={Fonts.PoppinsSemiBold}
        textSize={normalize(20)}
        textAlign={'center'}
        RightImage
        textmartop={Platform.OS == 'android' ? normalize(28) : normalize(20)}
        onPress_back_button={() => {
           navigation.navigate('Home')
        }}
      />
        <WebView
          //Loading URL
          source={{
            uri: constants.ABOUT_US,
          }}
          //Enable Javascript support
          javaScriptEnabled={true}
          //For the Cache
          domStorageEnabled={true}
          //View to show while loading the webpage
          renderLoading={ActivityIndicatorElement}
          //Want to show the view or not
          startInLoadingState={true}
        />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  primary: {
    flex: 1,
    backgroundColor: Colors.white,
    // paddingHorizontal: normalize(18),
  },
  activityIndicatorStyle: {
    height: '100%',
    justifyContent: 'center',
  },
});
  