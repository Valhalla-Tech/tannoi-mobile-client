import { StyleSheet } from 'react-native';
import { CalculateHeight } from '../../../helper/CalculateSize';
import { Bold } from '../../../styles/FontSize';

export default StyleSheet.create({
  rootStyle: {
    // width: '100%',
    // height: '100%',
    // paddingBottom: '35%',
  },

  titleTextStyle: {
    fontFamily: Bold,
    fontSize: CalculateHeight(3.5),
    color: '#464D60',
    marginBottom: '15%',
  },

  contentContainerStyle: {
    justifyContent: 'space-between',
    // flex: 1,
  },

  formInputStyle: {
    marginBottom: '5%',
  },

  termsOfServiceTextStyle: {
    textAlign: 'center',
    color: '#73798C',
  },

  termsOfServiceButtonTextStyle: {
    color: '#7817FF',
  },

  errorMessageStyle: {
    marginBottom: '2%',
  },

  errorMessageFromServerStyle: {
    padding: '2%',
    borderRadius: 10,
    color: '#FFFFFF',
    backgroundColor: '#fa5050',
    marginBottom: '5%',
  },

  errorMessageStyle: {
    color: 'red',
    marginBottom: '2%',
  },
});
