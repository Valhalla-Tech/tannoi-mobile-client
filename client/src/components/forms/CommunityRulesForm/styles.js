import { StyleSheet } from 'react-native';
import { CalculateHeight } from '../../../helper/CalculateSize';
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

  rulesContainerStyle: {
    marginBottom: '5%',
  },

  rulesTextStyle: {
    fontFamily: Bold,
    fontSize: CalculateHeight(2.25),
    color: '#7817FF',
    marginBottom: '2%',
  },

  rulesDescriptionTextStyle: {
    fontFamily: Normal,
    fontSize: CalculateHeight(2),
    color: '#464D60',
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
