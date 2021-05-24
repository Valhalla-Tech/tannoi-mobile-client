import { StyleSheet } from 'react-native';
import { Bold, Normal, Medium } from '../../../styles/FontSize';
import { CalculateHeight } from '../../../helper/CalculateSize';

export default StyleSheet.create({
  welcomeScreenContainerStyle: {
    flex: 1,
  },

  welcomeScreenLoginButtonStyle: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },

  welcomeScreenGreetingContainerStyle: {
    flex: 1.5,
    alignItems: 'center',
    justifyContent: 'center',
    paddingBottom: '20%',
    marginBottom: '20%',
  },

  welcomeScreenBackgroundStyle: {
    position: 'absolute',
    height: '95%',
    width: '100%',
    top: '40%',
  },

  headerBoldTextStyle: {
    fontFamily: Bold,
    marginTop: '10%',
    fontSize: CalculateHeight(3),
  },

  headerNormalTextStyle: {
    fontFamily: Normal,
    textAlign: 'center',
    fontSize: CalculateHeight(2),
  },

  loginButtonTextStyle: {
    color: '#73798C',
    fontFamily: Normal,
  },

  welcomeImageStyle: {
    resizeMode: 'stretch',
    width: '80%',
    height: '80%',
  },

  registerModalHeaderStyle: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    marginBottom: '8%',
  },

  registerModalHeaderTextStyle: {
    fontSize: CalculateHeight(3),
    fontFamily: Medium,
    color: '#464D60',
    alignSelf: 'center',
  },

  registrationStatusBarContainerStyle: {
    width: '100%',
    marginBottom: '5%',
    height: '3%',
  },

  statusBarStyle: {
    height: '30%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: '2%',
  },

  registrationStatusBarStyle: {
    width: '10%',
    height: '100%',
    borderRadius: 10,
  },

  statusBarNumberTextStyle: {
    alignSelf: 'flex-end',
    color: '#464D60',
    fontFamily: Normal,
  },

  buttonStyle: {
    width: '75%',
    height: '18%',
    marginBottom: '2%',
  },

  buttonIconStyle: {
    position: 'absolute',
    left: '5%',
  },

  joinCommunityHeaderTextStyle: {
    fontFamily: Bold,
    fontSize: CalculateHeight(3),
    color: '#464D60',
    marginBottom: '3%'
  },

  communityNameStyle: {
    fontFamily: Bold,
    fontSize: CalculateHeight(2.5),
    color: '#464D60',
    marginBottom: '8%'
  },

  joinCommunityButtonStyle: {
    borderRadius: 50,
    borderColor: '#7817FF',
    color: '#7817FF',
  },
});
