import React from 'react';
import {
  View,
  StyleSheet,
  Animated,
  useWindowDimensions,
} from 'react-native';
import normalize from '../utils/helpers/normalize';
import { Colors } from '../themes/Colors';

export default function Paginator({data, scrollX, viewstyle}) {
  const {width} = useWindowDimensions();

  return (
    <View style={[viewstyle, styles.conatiner]}>
      {data.map((_, i) => {
        const inputRange = [(i - 1) * width, i * width, (i + 1) * width];

        const dotWidth = scrollX.interpolate({
          inputRange,
          outputRange: [normalize(8), normalize(30), normalize(8)],
          extrapolate: 'clamp',
        });

        const opacity = scrollX.interpolate({
          inputRange,
          outputRange: [0.3, 1, 0.3],
          extrapolate: 'clamp',
        });

        const bgColor = scrollX.interpolate({
          inputRange,
          outputRange: [Colors.davy_grey, Colors.black, Colors.davy_grey],
          extrapolate: 'clamp',
        });

        return (
          <Animated.View
            style={[
              styles.dot,
              {
                width: dotWidth,
                opacity,
                backgroundColor: bgColor,
              },
            ]}
            key={i.toString()}
          />
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  conatiner: {
    flexDirection: 'row',
  },
  dot: {
    height: normalize(8),
    borderRadius: normalize(5),
    marginHorizontal: normalize(5),
  },
});
