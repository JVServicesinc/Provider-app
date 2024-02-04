import React, {useState} from 'react';
import {
  TouchableOpacity,
  StyleSheet,
  View,
  Text,
  Image,
  Platform,
} from 'react-native';

import PropTypes from 'prop-types';
import normalize from '../utils/helpers/normalize';

export default function Header(props) {
  function onPress_back_button() {
    if (props.onPress_back_button) {
      props.onPress_back_button();
    }
  }

  return (
    <View
      style={{
        flexDirection: 'row',
        backgroundColor: props.backgroundColor,
        justifyContent: props.justifyContent,
        alignItems: 'center',
        marginBottom: props.marginBottom,
        marginHorizontal: props.marginHorizontal,
      }}>
      {props.back_button && (
        <TouchableOpacity
          onPress={() => {
            onPress_back_button();
          }}
          style={{
            marginLeft: props.gobackmarginLeft,
            marginTop: props.backmargintop,
            backgroundColor: props.leftImagebackground,
            borderRadius: props.LeftImggborderradius,
            padding: props.ImagePadding,
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <Image
            style={{
              height: props.LeftImagehght,
              width: props.LeftImagewidth,
              marginLeft: props.backmarginLeft,
            }}
            source={props.back_img_source}
            resizeMode="contain"
          />
        </TouchableOpacity>
      )}

      {props.text && (
        <Text
          style={{
            color: props.textcolor,
            fontFamily: props.textfont,
            fontSize: props.textSize,
            textAlign: props.textAlign,
            marginTop: props.textmartop,
            marginRight: props.textRight,
          }}>
          {props.title}
        </Text>
      )}
      {props.RightImage && (
        <Image
          style={{
            height: props.rightheight,
            width: props.rightwidth,
            marginTop: props.imageMarginTop,
          }}
          source={props.rightImagesrc}
        />
      )}
    </View>
  );
}

Header.propTypes = {
  onPress_back_button: PropTypes.func,
  back_button: PropTypes.bool,
  back_button_sigle: PropTypes.bool,
  back_img_source: PropTypes.any,
  backgroundColor: PropTypes.any,
  LeftImagehght: PropTypes.any,
  LeftImagewidth: PropTypes.any,
  leftImagebackground: PropTypes.any,
  ImagePadding: PropTypes.any,
  LeftImggborderradius: PropTypes.any,
  gobackmarginLeft: PropTypes.any,
  backmargintop: PropTypes.any,
  marginBottom: PropTypes.any,
  tintColor: PropTypes.any,
  rightIcon: PropTypes.any,
  onPress_rightIcon: PropTypes.func,
  titleMarginLeft: PropTypes.any,
  titlewidth: PropTypes.any,
  fontSize: PropTypes.any,
  titleMarginRight: PropTypes.any,
  rHeight: PropTypes.any,
  rWidth: PropTypes.any,
};
Header.defaultProps = {
  onPress_back_button: () => {},
  onPress_rightIcon: () => {},
  back_button: false,
  back_button_sigle: false,
  backgroundColor: '',
  titleMarginLeft: normalize(0),
  titleMarginRight: 0,
};

