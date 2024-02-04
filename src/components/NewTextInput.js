import React, {useState} from 'react';
import {
  Image,
  Platform,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import normalize from '../utils/helpers/normalize';
import {Fonts, IMAGES} from '../themes/Themes';

const NewTextInput = props => {
  const [visible, setVisible] = useState(props.isSecure);
  function onPressssequre() {
    setVisible(!visible);
  }
  function textcancel() {
    if (props.textcancel) {
      props.textcancel();
    }
  }
  function onFocus() {
    if (props.onFocus) {
      props.onFocus();
    }
  }

  return (
    <View
      style={{
        flexDirection: 'row',
        borderWidth: props.borderWidth,
        borderColor: props.borderColor,
        borderRadius: props.borderRadius,
        backgroundColor: props.backgroundColor,
        padding: props.padding,
        width: props.width,
        alignSelf: 'center',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginTop: props.marginTop,
        shadowColor: props.shadowColor,
        marginBottom: props.marginBottom,
        shadowOpacity: props.shadowOpacity,
        shadowRadius: props.shadowRadius,
      }}>
      {props?.leftImage ? (
        <Image
          source={props.inputicon}
          style={{
            width: props.leftImagewidth,
            height: props.leftImageheight,
            resizeMode: 'contain',
            transform: props.Imagetransform,
            marginLeft: props.imagemarleft,
          }}
        />
      ) : null}

      {props.phonecode ? (
        <Text
          style={{
            color: 'black',
            fontFamily: Fonts.PoppinsMedium,
            fontSize: normalize(12),
            marginHorizontal: normalize(8),
          }}>
          {props.code}
        </Text>
      ) : null}
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          width: '100%',
        }}>
        <TextInput
          placeholder={props.name}
          value={props.value}
          placeholderTextColor={props.placeholderTextColor}
          style={[
            styles.inputbox,
            {
              width: props.textwidth,
              marginLeft: props.textmarleft,
              fontFamily: props.fontFamily,
              height: props.textInputHight,
            },
          ]}
          textAlignVertical={props.textAlignVertical}
          secureTextEntry={visible}
          maxLength={props.maxLength}
          keyboardType={props.keyboardType}
          multiline={props.multiline}
          onFocus={() => onFocus()}
          onChangeText={props.onChange}></TextInput>
        {props.star && (
          <Text
            style={{
              fontSize: normalize(14),
              color: 'red',
              fontFamily: Fonts.PoppinsSemiBold,
              marginLeft: normalize(2),
            }}>
            *
          </Text>
        )}
        {props.addisSucureBtn ? (
          <TouchableOpacity
            onPress={() => onPressssequre()}
            style={{
              height: normalize(30),
              width: normalize(25),
              marginLeft: normalize(20),
              borderRadius: normalize(20),
              alignSelf: 'center',
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <Image
              source={!visible ? IMAGES.eyeopen : IMAGES.eyehideicon}
              style={{
                height: '70%',
                width: '85%',
                alignSelf: 'center',
                justifyContent: 'center',
                overflow: 'visible',
                tintColor: '#253274',
              }}
              resizeMode="contain"
            />
          </TouchableOpacity>
        ) : null}
      </View>

      {props.rightImage ? (
        <TouchableOpacity onPress={() => textcancel()}>
          <Image
            source={props.rightinputicon}
            style={{
              width: props.rightImagewidth,
              height: props.rightImageheight,
              resizeMode: 'contain',
            }}
          />
        </TouchableOpacity>
      ) : null}
    </View>
  );
};

export default NewTextInput;
const styles = StyleSheet.create({
  inputbox: {
    fontSize: Platform.OS == 'ios' ? normalize(12) : normalize(12),
    color: '#0D0D0C',
  },
});
