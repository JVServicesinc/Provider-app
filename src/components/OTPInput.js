import React, {useRef, useState, useEffect} from 'react';
import {View, Text, Pressable, TextInput} from 'react-native';
import normalize from '../utils/helpers/normalize';
import {Fonts} from '../themes/Themes';

const OTPInput = ({code, setCode, maximumLength, setIsPinReady, style}) => {
  const boxArray = new Array(maximumLength).fill(0);
  const inputRef = useRef();

  const [isInputBoxFocused, setIsInputBoxFocused] = useState(false);

  const handleOnPress = () => {
    setIsInputBoxFocused(true);
    inputRef.current.focus();
  };

  const handleOnBlur = () => {
    setIsInputBoxFocused(false);
  };

  useEffect(() => {
    setIsPinReady(code.length === maximumLength);
    return () => {
      setIsPinReady(false);
    };
  }, [code]);

  const boxDigit = (_, index) => {
    const emptyInput = '';
    const digit = code[index] || emptyInput;

    const isCurrentValue = index === code.length;
    const isLastValue = index === maximumLength - 1;
    const isCodeComplete = code.length === maximumLength;

    const isValueFocused = isCurrentValue || (isLastValue && isCodeComplete);

    return (
      <View
        style={{
          borderRadius: normalize(4),
          height: normalize(55),
          width: normalize(45),
          borderWidth: 1,
          borderColor: '#000',
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <Text
          style={{
            color: isInputBoxFocused && isValueFocused ? 'black' : 'black',
            fontSize: normalize(20),
            fontFamily: Fonts.PoppinsSemiBold,
            top: normalize(2),
          }}>
          {digit}
        </Text>
      </View>
    );
  };

  return (
    <View
      style={[
        {
          justifyContent: 'center',
          alignItems: 'center',
        },
        style,
      ]}>
      <Pressable
        style={{
          justifyContent: 'space-evenly',
          flexDirection: 'row',
          width: '100%',
        }}
        onPress={handleOnPress}>
        {boxArray.map(boxDigit)}
      </Pressable>
      <TextInput
        value={code}
        onChangeText={setCode}
        maxLength={maximumLength}
        keyboardType="numeric"
        ref={inputRef}
        onBlur={handleOnBlur}
        style={{
          opacity: 1,
          position: 'absolute',
          backgroundColor: 'transparent',
          height: 0,
          width: 0,
        }}
      />
    </View>
  );
};

export default OTPInput;
