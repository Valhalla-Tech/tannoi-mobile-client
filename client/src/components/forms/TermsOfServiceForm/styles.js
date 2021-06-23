import { StyleSheet } from 'react-native';
import { CalculateHeight, CalculateWidth } from '../../../helper/CalculateSize';
import { Bold, Normal } from '../../../styles/FontSize';

export default StyleSheet.create({
  rootStyle: {
    flex: 1,
    justifyContent: 'space-between',
  },

  titleTextStyle: {
    fontFamily: Bold,
    fontSize: CalculateHeight(3),
    color: '#464D60',
    marginBottom: '5%',
  },

  normalTextStyle: {
    fontFamily: Normal,
    fontSize: CalculateHeight(1.8),
    color: '#464D60',
    marginBottom: '5%',
    maxWidth: '95%'
  },

  linkStyle: {
    color: '#7817FF',
  },

  radioTextStyleBold: {
    fontFamily: Bold,
    fontSize: CalculateHeight(1.5),
    color: '#464D60',
  },

  radioTextStyle: {
    fontFamily: Normal,
    fontSize: CalculateHeight(1.5),
    color: '#464D60',
    maxWidth: '80%',
  },

  radioButtonContainerStyle: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: '5%',
  },

  radioButtonStyle: {
    marginRight: '5%',
  },
  
  agreeButtonStyle: {
    borderRadius: 50,
    marginBottom: '2%',
  },

  nextButtonStyle: {
    backgroundColor: '#7817FF',
    borderWidth: 0,
    color: '#FFFFFF',
    borderRadius: 50,
  },
});
