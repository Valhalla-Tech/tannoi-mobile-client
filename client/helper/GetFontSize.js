import { Dimensions, Platform, PixelRatio } from 'react-native';

// const {
//   width: SCREEN_WIDTH,
//   height: SCREEN_HEIGHT,
// } = Dimensions.get('window');

// based on iphone 5s's scale
// const scale = SCREEN_WIDTH / 320   ;

// export default function GetFontSize(size) {
  // const newSize = size * scale 
  //   if (Platform.OS === 'ios') {
    //     return Math.round(PixelRatio.roundToNearestPixel(newSize))
    //   } else {
      //     return Math.round(PixelRatio.roundToNearestPixel(newSize)) - 2
      //   }
      // }
export const GetFontSize = (input) => {
  const height = Dimensions.get('window').height;

  const elemHeight = parseFloat(input);
  return PixelRatio.roundToNearestPixel((height * elemHeight) / 100);
};