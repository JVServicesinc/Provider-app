import React from 'react';
import {Image, TouchableOpacity} from 'react-native';

import normalize from '../utils/helpers/normalize';
import PropTypes from 'prop-types';


export default function CheckBox(props) {
  return (
    <TouchableOpacity
      onPress={() => props.onChange(!props.active)}
      activeOpacity={0.6}
      style={{
        backgroundColor: props.backgroundColor,
        borderColor: props.borderColor,
        borderWidth: props.borderWidth,
        borderRadius: normalize(4),
        width: normalize(16),
        height: normalize(16),
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        marginStart: props.marstart,
        marginTop: props.marginTop,
      }}>
      {props.active ? (
        <Image
          source={props.CheckBox}
          style={{
            height: normalize(10),
            width: normalize(10),
            tintColor: 'white',
           
          }}
          resizeMode="contain"></Image>
      ) : null}
    </TouchableOpacity>
  );
}

CheckBox.propTypes = {
  onChange: PropTypes.func,
  active: PropTypes.bool,
  marstart: PropTypes.any,
  backgroundColor: PropTypes.any,
  borderWidth: PropTypes.any,
  marginTop: PropTypes.any,
  borderColor: PropTypes.any,
};

CheckBox.defaultProps = {
  onChange: () => {},
  active: false,
  backgroundColor: 'black',
  borderWidth: normalize(1),
  borderColor: 'black',
};
