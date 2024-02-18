import React, {useEffect, useState} from 'react';
import {
  FlatList,
  Image,
  ListRenderItem,
  Platform,
  SafeAreaView,
  StatusBar,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import {getData, storeData} from '../../redux/LocalStore';
import constants from '../../utils/helpers/constants';
import i18n from '../../utils/helpers/i18n.config';
import Header from '../../components/Header';
import { useNavigation } from '@react-navigation/native';
import {Colors} from '../../themes/Colors';
import {Item} from 'react-native-paper/lib/typescript/components/Drawer/Drawer';
import {Fonts, IMAGES} from '../../themes/Themes';
import normalize from '../../utils/helpers/normalize';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {useTranslation} from 'react-i18next';

interface LanguageModel {
  id: string;
  title: string;
  code: string;
}

const LanguageInfo: LanguageModel[] = [
  {
    id: '1',
    title: 'English',
    code: 'enUS',
  },
  {
    id: '2',
    title: 'French',
    code: 'frCA',
  },
  
];

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: '100%',
    alignItems: 'center',
  },
  subContainer: {
    width: '90%',
    height: '100%',
  },
  renderContainer: {
    width: '100%',
    height: '60%',
    justifyContent: 'center',
    alignItems: 'center',
    // backgroundColor:'red',
    // marginTop:'10%'
  },
  renderSubContainer: {
    width: '100%',
    height: '100%',
    // backgroundColor:'pink',
    justifyContent: 'center',
    borderColor: Colors.grey_cloud,
    borderWidth: normalize(1),
    borderRadius: normalize(5),
    // backgroundColor: '#fff',
    // elevation: 5,
    // shadowOffset: {width: 0, height: 1},
    shadowOpacity: 0.3,
    shadowRadius: 2,
  },
  languageTouchable: {
    width: '100%',
    height: '100%',
    justifyContent: 'space-between',
    alignItems: 'center',
    flexDirection: 'row',
    paddingHorizontal: '5%',
  },
  languageTitle: {
    color: '#161616',
    fontFamily: Fonts.PoppinsSemiBold,
    fontSize: normalize(13),
  },
});

export const ChooseLanguage = () => {
  const {t} = useTranslation();
  const [selectedLanguage, setSelectedLanguage] = useState<string>('');
  const navigation:any = useNavigation();
  const changeLanguage = (language: string) => {
    storeData(constants.LANGUAGE, language, () => {
      i18n.changeLanguage(language);
      setSelectedLanguage(language);
    });
  };

  useEffect(() => {
    getData(constants.LANGUAGE, (value: string) => {
      setSelectedLanguage(value);
    });
  }, []);

  const renderItem: ListRenderItem<LanguageModel> = ({item, index}) => (
    <View key={index} style={styles.renderContainer}>
      <View style={styles.renderSubContainer}>
        <TouchableOpacity
          style={styles.languageTouchable}
          onPress={() => {
            changeLanguage(item.code);
          }}>
          <Text style={[styles.languageTitle, {fontSize: normalize(13)}]}>
            {item.title}
          </Text>
          {/* {item.code === selectedLanguage && ( */}
          <Image
            style={{
              height: normalize(20),
              width: normalize(20),
              resizeMode: 'contain',
            }}
            source={
              item.code === selectedLanguage ? IMAGES.Home : IMAGES.HomeImage
            }
          />
          {/* )} */}
        </TouchableOpacity>
      </View>
    </View>
  );

  return (
    <>
      {selectedLanguage !== '' && (
        <SafeAreaView
          style={{
            flex: 1,
            backgroundColor: Colors.white,
          }}>
          <View style={styles.container}>
            <View style={styles.subContainer}>
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
        title={'Choose Language'}
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
              <FlatList
                 contentContainerStyle={{height:'15%',marginTop:'10%'}}
                data={LanguageInfo}
                renderItem={renderItem}
                keyExtractor={item => item.id}
              />
            </View>
          </View>
        </SafeAreaView>
      )}
    </>
  );
};
