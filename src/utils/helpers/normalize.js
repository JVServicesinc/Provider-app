import {PixelRatio, Platform, Dimensions} from 'react-native';

const scale = Dimensions.get('window').width / 320;

export default normalize = size => {
  const newSize = size * scale;

  return Math.round(PixelRatio.roundToNearestPixel(newSize));
};
