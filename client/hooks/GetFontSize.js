import React from 'react';
import {
  PixelRatio
} from 'react-native';

export default getFontSize = (originalSize) => {
  if(PixelRatio.get() < 1.5) {
      return (originalSize * 0.5 ) / PixelRatio.get() 
  }else if(PixelRatio.get() >= 1.5 && PixelRatio.get() < 2.5) {
      return (originalSize * 1.5 ) / PixelRatio.get() 
  }else if(PixelRatio.get() >= 2.5){
      return (originalSize * 2.5 ) / PixelRatio.get() 
  }else{
      return originalSize
  }
};