import { Dimensions, Platform, PixelRatio } from 'react-native';

export const CalculateHeight = (input) => {
  const height = Dimensions.get('window').height;

  const elemHeight = parseFloat(input);
  return PixelRatio.roundToNearestPixel((height * elemHeight) / 100);
};