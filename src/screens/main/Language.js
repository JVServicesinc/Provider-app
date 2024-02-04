import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  Platform,
  TouchableOpacity,
} from 'react-native';
import React from 'react';
import Header from '../../components/Header';
import {Fonts, IMAGES} from '../../themes/Themes';
import normalize from '../../utils/helpers/normalize';
import {useTranslation} from 'react-i18next';

const Language = props => {
  const {t, i18n} = useTranslation();

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
        title={t('Language')}
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
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          marginHorizontal: normalize(20),
        }}>
        <TouchableOpacity
          style={styles.btn}
          onPress={() => {
            i18n.changeLanguage('en');
          }}>
          <Text>English</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.btn}
          onPress={() => {
            i18n.changeLanguage('fr');
          }}>
          <Text>French</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default Language;

const styles = StyleSheet.create({
  btn: {
    height: normalize(120),
    width: normalize(120),
    borderRadius: normalize(10),
    borderWidth: normalize(1),
    marginTop: normalize(20),
    justifyContent: 'center',
    alignItems: 'center',
  },
});
