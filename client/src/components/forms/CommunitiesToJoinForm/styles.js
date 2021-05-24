import { StyleSheet } from 'react-native';
import { CalculateHeight, CalculateWidth } from '../../../helper/CalculateSize';
import { Bold, Normal } from '../../../styles/FontSize';

export default StyleSheet.create({
  rootStyle: {
    flex: 1,
    justifyContent: 'space-between',
    width: '100%',
  },

  titleTextStyle: {
    fontFamily: Bold,
    fontSize: CalculateHeight(3.5),
    color: '#464D60',
    marginBottom: '2%',
  },

  formContainerStyle: {
    maxHeight: '60%',
  },

  communityContainerStyle: {
    marginBottom: '5%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '100%',
  },

  communityProfileDataContainerStyle: {
    maxWidth: '80%',
  },

  communityNameTextStyle: {
    color: '#464D60',
    fontSize: CalculateHeight(2.5),
    fontFamily: Bold,
  },

  communityBioTextStyle: {
    color: '#73798C',
    fontSize: CalculateHeight(1.8),
    fontFamily: Normal,
  },

  joinButtonStyle: {
    borderRadius: 50,
    fontSize: CalculateHeight(1.5),
    paddingHorizontal: '5%',
    paddingVertical: '2%',
  },

  enterCodeContainerStyle: {
    flexDirection: 'row',
    width: '100%',
    justifyContent: 'space-between',
    marginVertical: '5%',
  },

  formInputCustomRootStyle: {
    width: '75%',
    flexDirection: 'column',
    marginRight: '2%',
  },

  formInputCustomStyle: {
    textAlign: 'center',
    borderWidth: 1,
    width: '100%',
    borderRadius: 10,
    borderColor: '#E3E6EB',
  },

  enterCodeJoinButtonStyle: {
    borderRadius: 50,
    paddingHorizontal: '5%',
    borderColor: '#7817FF',
    color: '#7817FF',
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
