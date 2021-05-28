import { StyleSheet } from 'react-native';
import { Bold, Normal } from '../../../styles/FontSize';
import { CalculateHeight, CalculateWidth } from '../../../helper/CalculateSize';

export default StyleSheet.create({
  rootStyle: {
    flex: 1,
  },

  titleTextStyle: {
    fontFamily: Bold,
    color: '#464D60',
    fontSize: CalculateHeight(3.5),
  },

  normalTextStyle: {
    fontFamily: Normal,
    marginTop: '3%',
    color: '#73798C',
    fontSize: CalculateHeight(2),
  },

  pinInputContainerStyle: {
    flexDirection: 'row',
    marginTop: '10%',
    marginBottom: '5%',
  },

  pinInputStyle: {
    marginRight: '5%',
  },

  buttonTextStyle: {
    color: '#7817FF',
  },

  errorMessageStyle: {
    padding: '2%',
    borderRadius: 10,
    color: '#FFFFFF',
    backgroundColor: '#fa5050',
    marginBottom: '5%',
    marginTop: '5%',
    marginBottom: '-5%'
  },
});
