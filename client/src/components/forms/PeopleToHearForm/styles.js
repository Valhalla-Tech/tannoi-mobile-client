import { StyleSheet } from 'react-native';
import { CalculateHeight, CalculateWidth } from '../../../helper/CalculateSize';
import { Bold, Normal } from '../../../styles/FontSize';

export default StyleSheet.create({
  rootStyle: {
    flex: 1,
    justifyContent: 'space-between',
    width: '100%',
  },

  columnWrapperStyle: {
    justifyContent: 'space-between',
    width: '100%',
  },

  formContainerStyle: {
    maxHeight: '68%',
  },

  titleTextStyle: {
    fontFamily: Bold,
    fontSize: CalculateHeight(3.5),
    color: '#464D60',
    marginBottom: '2%',
  },

  profileContainerStyle: {
    width: '45%',
    marginBottom: '5%',
  },

  profileHeaderStyle: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },

  profilePhotoStyle: {
    width: CalculateWidth(8),
    height: CalculateWidth(8),
    borderRadius: 50,
  },

  followButtonStyle: {
    fontSize: CalculateHeight(1.5),
    borderRadius: 50,
  },

  boldTextStyle: {
    fontFamily: Bold,
    fontSize: CalculateHeight(2),
    color: '#464D60',
  },

  normalTextStyle: {
    fontFamily: Normal,
    fontSize: CalculateHeight(1.5),
    color: '#73798C',
  },

  nextButtonStyle: {
    backgroundColor: '#7817FF',
    borderWidth: 0,
    color: '#FFFFFF',
    borderRadius: 50,
    marginBottom: '2%',
  },

  skipButtonStyle: {
    borderWidth: 0,
    color: '#73798C',
  },
});
