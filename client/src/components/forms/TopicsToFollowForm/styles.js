import { StyleSheet } from 'react-native';
import { CalculateHeight } from '../../../helper/CalculateSize';
import { Bold, Normal } from '../../../styles/FontSize';

export default StyleSheet.create({
  rootStyle: {
    flex: 1,
    justifyContent: 'space-between',
  },

  upperContainerStyle: {
    maxHeight: '50%'
  },

  titleTextStyle: {
    fontFamily: Bold,
    fontSize: CalculateHeight(3.5),
    color: '#464D60',
    marginBottom: '2%',
  },

  normalTextStyle: {
    fontFamily: Normal,
    fontSize: CalculateHeight(2.3),
    color: '#464D60',
    marginBottom: '5%'
  },

  topicContainerStyle: {
    flexDirection: 'column',
  },

  topicButtonStyle: {
    marginRight: '2%',
    marginBottom: '2%',
    borderRadius: 50,
  },

  nextButtonStyle: {
    backgroundColor: '#7817FF',
    borderWidth: 0,
    color: '#FFFFFF',
    borderRadius: 50,
    marginBottom: '2%'
  },

  skipButtonStyle: {
    borderWidth: 0,
    color: '#73798C'
  },
});
