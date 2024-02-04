import React, {useState} from 'react';
import {Text, TouchableOpacity, Image} from 'react-native';
import PropTypes from 'prop-types';
import normalize from '../utils/helpers/normalize';
import {Fonts} from '../themes/Themes';

export default function Dropdown(props) {

  function onPress() {
    if (props.onPress) {
      props.onPress();
    }
  }
  return (
    <TouchableOpacity
      style={{
        width: props.width,
        height: props.height,
        borderRadius: normalize(10), 
        borderWidth: props.borderWidth,
        borderColor: props.borderColor,
        flexDirection: 'row',
        alignItems: 'center',
        alignSelf: props.alignSelf,
        marginTop: props.marginTop,
        justifyContent: 'space-between',
        paddingHorizontal: normalize(10),
        paddingLeft: props.paddingLeft,
        borderBottomWidth: props.borderBottomWidth,
        backgroundColor: props.backgroundColor,
        margin: props.margin,
        marginLeft: props.marginLeft,
        marginRight: props.TouchmarginRight,
        borderBottomColor: props.borderBottomColor,
      }}
      onPress={() => {
        onPress();
      }}>
      <Text
        style={{
          fontSize: props.fontSize,
          fontFamily: props.fontFamily,
          color: props.color,
          width: '80%',
          marginLeft: props.iconMarginleft,
        }}>
        {props.value}
      </Text>

      {props.downArr && (
        <Image
          style={{
            height: props.iconHeight,
            width: props.iconWidth,
            tintColor: props.rightIcontintColor,
          }}
          resizeMode={'contain'}
          source={props.rightIcon}
        />
      )}
    </TouchableOpacity>
  );
}

Dropdown.propTypes = {
  dataList: PropTypes.array,
  modalVisible: PropTypes.bool,
  onItemSelected: PropTypes.func,
  modalBgColor: PropTypes.string,
  modalMaxHeight: PropTypes.number,
  height: PropTypes.any,
  width: PropTypes.any,
  borderRadius: PropTypes.number,
  borderWidth: PropTypes.number,
  borderColor: PropTypes.string,
  marginTop: PropTypes.number,
  value: PropTypes.string,
  selectedvalues: PropTypes.any,
  placeholder: PropTypes.string,

  itemParam: PropTypes.string,
  valueParam: PropTypes.string,
  downArr: PropTypes.bool,
  itemWidth: PropTypes.any,
  alignSelf: PropTypes.string,
  borderBottomWidth: PropTypes.number,
  rightIcon: PropTypes.string,
  paddingLeft: PropTypes.number,
  fontSize: PropTypes.number,
  iconHeight: PropTypes.number,
  iconWidth: PropTypes.number,
  backgroundColor: PropTypes.string,
  leftIcon: PropTypes.string,
  margin: PropTypes.number,
  marginLeft: PropTypes.number,
  marginRight: PropTypes.number,
  iconMarginleft: PropTypes.number,
  isLeftIcon: PropTypes.bool,
  rightIcontintColor: PropTypes.string,
  borderBottomColor: PropTypes.string,
  paddingHorizontal: PropTypes.number,
  color: PropTypes.any,
  fontFamily: PropTypes.any,
  selectedColor: PropTypes.any,
};

Dropdown.defaultProps = {
  dataList: [],
  modalVisible: false,
  onItemSelected: null,
  modalMaxHeight: normalize(300),
  height: normalize(45),
  width: '100%',
  borderRadius: null,
  borderColor: null,
  marginTop: null,
  value: '',
  placeholder: '',
  itemParam: '',
  valueParam: '',
  downArr: true,
  itemWidth: '100%',
  alignSelf: 'center',
  borderBottomWidth: null,
  paddingLeft: null,
  fontSize: normalize(12),
  iconHeight: normalize(19),
  iconWidth: normalize(10),
  margin: null,
  marginLeft: null,
  marginRight: null,
  iconMarginleft: normalize(0),
  isLeftIcon: false,
  paddingHorizontal: normalize(0),
  color: '#3A2228',
  fontFamily: Fonts.MontserratRegular,
  selectedColor: '#3A2228',
};
