import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, Image, ScrollView } from 'react-native';
import { GoogleSignin } from '@react-native-community/google-signin';
import { useDispatch, useSelector } from 'react-redux';
import { Bold } from '../../../styles/FontSize';
import {
  GoogleSignIn,
  FacebookSignIn,
  getTermsOfService,
} from '../../../store/actions/LoginAction';
import { Modal, Button, LoadingSpinner } from '../../../components/elements';
import { createAccount } from './action';
import { getCurrentTermsOfService } from '../../../helper/Store';
import styles from './styles';
import CreateAccountForm from '../../../components/forms/CreateAccountForm';
import IcFacebook from '../../../assets/ic_facebook.svg';
import IcGoogle from '../../../assets/ic_google.svg';
import WelcomeScreenBackground from '../../../assets/accountAssets/WelcomeScreen/welcomeScreenBackground.png';
import TannoiLogo from '../../../assets/publicAssets/tannoiLogo.svg';

const WelcomeScreen = ({ navigation }) => {
  const [registerModalIsOpen, setRegisterModalIsOpen] = useState(false);
  const [termsOfService, setTermsOfService] = useState('');
  const [showAgreeButton, setShowAgreeButton] = useState(false);
  const [registerPage, setRegisterPage] = useState(3);
  const [createAccountData, setCreateAccountData] = useState({});

  const dispatch = useDispatch();
  const { isLoading } = useSelector((state) => state.RegisterReducer);

  const googleSignIn = () => {
    dispatch(GoogleSignIn());
  };

  const facebookSignIn = () => {
    dispatch(FacebookSignIn());
  };

  const writeTermsOfService = async () => {
    let termsOfService = await getCurrentTermsOfService();

    setTermsOfService(termsOfService);
  };

  useEffect(() => {
    dispatch(getTermsOfService());
    writeTermsOfService();
    GoogleSignin.configure({
      // scopes: ['https://www.googleapis.com/auth/drive.readonly'], // what API you want to access on behalf of the user, default is email and profile
      webClientId:
        '1036887341767-4foinu1uvd66srmivikbplncka4ind72.apps.googleusercontent.com', // client ID of type WEB for your server (needed to verify user ID and offline access)
      offlineAccess: true, // if you want to access Google API on behalf of the user FROM YOUR SERVER
      // hostedDomain: '', // specifies a hosted domain restriction
      // loginHint: '', // [iOS] The user's ID, or email address, to be prefilled in the authentication UI if possible. [See docs here](https://developers.google.com/identity/sign-in/ios/api/interface_g_i_d_sign_in.html#a0a68c7504c31ab0b728432565f6e33fd)
      forceCodeForRefreshToken: true, // [Android] related to `serverAuthCode`, read the docs link below *.
      // accountName: '', // [Android] specifies an account name on the device that should be used
      iosClientId:
        '1036887341767-eejfcvk64h570oudr1e3nsul09gp44vj.apps.googleusercontent.com', // [iOS] optional, if you want to specify the client ID of type iOS (otherwise, it is taken from GoogleService-Info.plist)
    });
  }, []);

  const WelcomeScreenUpperSection = () => {
    return (
      <View style={styles.welcomeScreenGreetingContainerStyle}>
        <Image
          source={WelcomeScreenBackground}
          style={styles.welcomeScreenBackgroundStyle}
          resizeMode="stretch"
        />
        <TannoiLogo />
        <Text style={styles.headerBoldTextStyle}>Discover Everything</Text>
        <Text style={styles.headerNormalTextStyle}>
          A place for you to talk with friends {'\n'} and communities
        </Text>
      </View>
    );
  };

  const WelcomeScreenLoginButton = () => {
    return (
      <View style={{ flexDirection: 'row' }}>
        <Text style={styles.loginButtonTextStyle}>Already a member?</Text>
        <TouchableOpacity
          style={{ marginLeft: 5 }}
          onPress={() => {
            navigation.navigate('LoginScreen');
          }}>
          <Text style={{ ...styles.loginButtonTextStyle, fontFamily: Bold }}>
            Login
          </Text>
        </TouchableOpacity>
      </View>
    );
  };

  const TermsOfServiceSection = () => {
    return (
      <ScrollView>
        <Text>{termsOfService}</Text>
        {showAgreeButton && (
          <Button
            customStyle={{
              backgroundColor: '#7817FF',
              borderWidth: 0,
              color: '#FFFFFF',
            }}
            name="I Agree"
            onPress={async () => {
              let createAccountRequest = await dispatch(
                createAccount(createAccountData),
              );

              if (createAccountRequest) {
                setRegisterPage(3);
              } else {
                console.log('gagal');
              }
            }}
          />
        )}
      </ScrollView>
    );
  };

  const RegistrationStatusBar = (isFilled) => (
    <View
      style={{
        ...styles.registrationStatusBarStyle,
        backgroundColor: isFilled ? '#5152D0' : '#E3E6EB',
      }}
    />
  );

  const RegisterModal = () => (
    <Modal
      isOpen={registerModalIsOpen}
      closeModal={() => {
        setRegisterPage(1);
        setRegisterModalIsOpen(false);
      }}
      animation="slide"
      customContainerStyle={{
        justifyContent: 'flex-end',
      }}
      customStyle={{
        width: '100%',
        justifyContent: 'flex-start',
        alignItems: 'flex-start',
        height: '90%',
        borderBottomLeftRadius: 0,
        borderBottomRightRadius: 0,
      }}>
      <View style={styles.registerModalHeaderStyle}>
        {registerPage !== 1 && (
          <Button
            isBackButton={true}
            customStyle={{ position: 'absolute', left: '1%' }}
            onPress={() => {
              setRegisterPage((prevState) => prevState - 1);
            }}
          />
        )}
        <Text style={styles.registerModalHeaderTextStyle}>Sing up</Text>
        <Button
          isCloseButton={true}
          customStyle={{ position: 'absolute', right: '1%' }}
          onPress={() => {
            setRegisterPage(1);
            setRegisterModalIsOpen(false);
          }}
        />
      </View>
      <View style={styles.registrationStatusBarContainerStyle}>
        <View style={styles.statusBarStyle}>
          {RegistrationStatusBar(true)}
          {RegistrationStatusBar()}
          {RegistrationStatusBar()}
          {RegistrationStatusBar()}
          {RegistrationStatusBar()}
          {RegistrationStatusBar()}
        </View>
        <Text style={styles.statusBarNumberTextStyle}>1/6</Text>
      </View>
      {registerPage === 2 && TermsOfServiceSection()}
      {registerPage === 1 && (
        <CreateAccountForm
          onPressTermsOfService={() => {
            setShowAgreeButton(false);
            setRegisterPage(2);
          }}
          onSubmit={(data) => {
            setShowAgreeButton(true);
            setRegisterPage(2);
            setCreateAccountData(data);
          }}
        />
      )}
      {isLoading && <LoadingSpinner coverView={true} />}
    </Modal>
  );

  const WelcomeScreenButton = (
    title,
    customStyle,
    onPress,
    CustomIcon,
    customIconStyle,
  ) => {
    return (
      <Button
        name={title}
        customStyle={customStyle}
        navigation={navigation}
        onPress={() => onPress()}
        CustomIcon={CustomIcon}
        customIconStyle={customIconStyle}
      />
    );
  };

  const WelcomeScreenButtonSection = () => {
    return (
      <View style={styles.welcomeScreenLoginButtonStyle}>
        {WelcomeScreenButton(
          'Sign up with email',
          {
            ...styles.buttonStyle,
            backgroundColor: '#5152D0',
            borderColor: '#5152D0',
            color: '#FFFFFF',
          },
          () => navigation.navigate('RegisterScreen'),
        )}
        {WelcomeScreenButton(
          'Continue with Facebook',
          {
            ...styles.buttonStyle,
            backgroundColor: '#3B5998',
            borderColor: '#3B5998',
            color: '#FFFFFF',
          },
          () => facebookSignIn(),
          IcFacebook,
          styles.buttonIconStyle,
        )}
        {WelcomeScreenButton(
          'Continue with Google',
          {
            ...styles.buttonStyle,
            backgroundColor: '#FFFFFF',
            borderColor: '#E2E2E2',
            color: '#464D60',
          },
          () => googleSignIn(),
          IcGoogle,
          styles.buttonIconStyle,
        )}
        <WelcomeScreenLoginButton />
      </View>
    );
  };

  return (
    <View style={styles.welcomeScreenContainerStyle}>
      <WelcomeScreenUpperSection />
      <WelcomeScreenButtonSection />
      {RegisterModal()}
    </View>
  );
};

export default WelcomeScreen;
