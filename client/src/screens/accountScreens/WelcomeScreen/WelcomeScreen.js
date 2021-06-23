import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, Image, ScrollView, Platform } from 'react-native';
import { GoogleSignin } from '@react-native-community/google-signin';
import { useDispatch, useSelector } from 'react-redux';
import { Bold } from '../../../styles/FontSize';
import {
  GoogleSignIn,
  FacebookSignIn,
  appleSignIn, 
  getTermsOfService,
} from '../../../store/actions/LoginAction';
import { Modal, Button, LoadingSpinner } from '../../../components/elements';
import {
  createAccount,
  confirmEmail,
  getTopic,
  followTopic,
  getPeopleToHear,
  getCommunities,
  openJoinCommunityModal,
  joinCommunity,
} from '../../../store/actions/RegisterAction';
import { userLogin } from '../../../store/actions/LoginAction';
import { getCurrentTermsOfService } from '../../../helper/Store';
import { trackWithMixPanel } from '../../../helper/Mixpanel';
import styles from './styles';
import CreateAccountForm from '../../../components/forms/CreateAccountForm';
import IcFacebook from '../../../assets/ic_facebook.svg';
import IcGoogle from '../../../assets/ic_google.svg';
import WelcomeScreenBackground from '../../../assets/accountAssets/WelcomeScreen/welcomeScreenBackground.png';
import TannoiLogo from '../../../assets/publicAssets/tannoiLogo.svg';
import ConfirmEmailForm from '../../../components/forms/ConfirmEmailForm';
import CommunityRulesForm from '../../../components/forms/CommunityRulesForm';
import AppPermissionForm from '../../../components/forms/AppPermissionForm';
import TopicsToFollowForm from '../../../components/forms/TopicsToFollowForm';
import PeopleToHearForm from '../../../components/forms/PeopleToHearForm';
import CommunitiesToJoinForm from '../../../components/forms/CommunitiesToJoinForm';
import TermsOfServiceForm from '../../../components/forms/TermsOfServiceForm';
import { SignInWithAppleButton } from '../../../components/publicComponents/SignInWithAppleButton';

const WelcomeScreen = ({ navigation, route }) => {
  const [registerModalIsOpen, setRegisterModalIsOpen] = useState(false);
  const [termsOfService, setTermsOfService] = useState('');
  const [showAgreeButton, setShowAgreeButton] = useState(false);
  const [registerPage, setRegisterPage] = useState(1);
  const [createAccountData, setCreateAccountData] = useState({});
  const [errMsgFromServer, setErrMsgFromServer] = useState('');

  const dispatch = useDispatch();
  const {
    isLoading,
    topics,
    communityFromCode,
    joinCommunityModalIsOpen,
  } = useSelector((state) => state.RegisterReducer);

  const writeTermsOfService = async () => {
    await dispatch(getTermsOfService());

    let termsOfService = await getCurrentTermsOfService();

    setTermsOfService(termsOfService);
  };

  useEffect(() => {
    if (
      route.params !== undefined &&
      route.params.fromLoginScreen !== undefined &&
      route.params.fromLoginScreen
    ) {
      setRegisterPage(6);
      dispatch(getTopic());
      setRegisterModalIsOpen(true);
    }

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

              if (createAccountRequest.status) {
                let { email, name } = createAccountData;
                trackWithMixPanel(
                  'User: Registration - Accepted Terms Of Service',
                  {
                    name,
                    email,
                  },
                );
                setErrMsgFromServer('');
                setRegisterPage(3);
              } else {
                setErrMsgFromServer(createAccountRequest.msg);
                setRegisterPage(1);
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
      disableButton={true}
      animation="slide"
      customContainerStyle={{
        justifyContent: 'flex-end',
      }}
      customStyle={{
        width: '100%',
        justifyContent: 'flex-start',
        alignItems: 'flex-start',
        maxHeight: registerPage === 1 ? undefined : '90%',
        height: Platform.OS === 'ios' && '90%',
        borderBottomLeftRadius: 0,
        borderBottomRightRadius: 0,
      }}>
      <View style={styles.registerModalHeaderStyle}>
        {registerPage !== 1 &&
          registerPage !== 3 &&
          registerPage !== 4 &&
          registerPage !== 5 && (
            <Button
              isBackButton={true}
              customStyle={{ position: 'absolute', left: '1%' }}
              onPress={() => {
                setRegisterPage((prevState) => prevState - 1);
              }}
            />
          )}
        <Text style={styles.registerModalHeaderTextStyle}>Sign up</Text>
        {registerPage !== 3 && registerPage !== 4 && registerPage !== 5 && (
          <Button
            isCloseButton={true}
            customStyle={{ position: 'absolute', right: '1%' }}
            onPress={() => {
              setRegisterPage(1);
              registerPage === 1 || registerPage === 2
                ? (setRegisterModalIsOpen(false),
                  setErrMsgFromServer(''),
                  setRegisterPage(1))
                : dispatch(userLogin());
            }}
          />
        )}
      </View>
      <View style={styles.registrationStatusBarContainerStyle}>
        <View style={styles.statusBarStyle}>
          {RegistrationStatusBar(true)}
          {RegistrationStatusBar(registerPage >= 2)}
          {RegistrationStatusBar(registerPage >= 3)}
          {RegistrationStatusBar(registerPage >= 4)}
          {RegistrationStatusBar(registerPage >= 5)}
          {RegistrationStatusBar(registerPage >= 6)}
          {RegistrationStatusBar(registerPage >= 7)}
          {RegistrationStatusBar(registerPage >= 8)}
        </View>
        <Text style={styles.statusBarNumberTextStyle}>{registerPage}/8</Text>
      </View>
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
          errMsg={errMsgFromServer}
        />
      )}
      {registerPage === 2 && (
        <TermsOfServiceForm
          onSubmit={async (isAgree) => {
            if (!isAgree) {
              setRegisterPage(1);
              setRegisterModalIsOpen(false);
            } else {
              let createAccountRequest = await dispatch(
                createAccount(createAccountData),
              );

              if (createAccountRequest.status) {
                let { email, name } = createAccountData;
                trackWithMixPanel(
                  'User: Registration - Accepted Terms Of Service',
                  {
                    name,
                    email,
                  },
                );
                setErrMsgFromServer('');
                setRegisterPage(3);
              } else {
                setErrMsgFromServer(createAccountRequest.msg);
                setRegisterPage(1);
              }
            }
          }}
          showAgreeButton={showAgreeButton}
        />
      )}
      {registerPage === 3 && (
        <CommunityRulesForm
          onSubmit={() => {
            let { email, name } = createAccountData;
            trackWithMixPanel(
              'User: Registration - Accepts Community Guildelines',
              {
                email,
                name,
              },
            );
            setRegisterPage(4);
          }}
        />
      )}
      {registerPage === 4 && (
        <AppPermissionForm
          onSubmit={() => {
            let { email, name } = createAccountData;
            trackWithMixPanel('User: Registration - Granted Permissions', {
              email,
              name,
            });
            setRegisterPage(5);
          }}
        />
      )}
      {registerPage === 5 && (
        <ConfirmEmailForm
          isLoading={isLoading}
          onSubmit={async (data) => {
            let confirmEmailRequest = await dispatch(confirmEmail(data));
            let { email, name } = createAccountData;
            if (confirmEmailRequest.status) {
              trackWithMixPanel('User: Registration - Verified OTP', {
                email,
                name,
              });
              setCreateAccountData({
                name,
                email,
                id: confirmEmailRequest.userData.id,
              });
              trackWithMixPanel('User: Created An Account', {
                email,
                name,
                distinct_id: confirmEmailRequest.userData.id,
              });
              setErrMsgFromServer('');
              dispatch(getTopic());
              setRegisterPage(6);
            } else {
              setErrMsgFromServer(
                confirmEmailRequest.msg === 'Token Expired'
                  ? 'Invalid Token'
                  : confirmEmailRequest.msg,
              );
            }
          }}
          errMsg={errMsgFromServer}
        />
      )}
      {registerPage === 6 && (
        <TopicsToFollowForm
          topics={topics}
          onSkip={() => {
            dispatch(getPeopleToHear());
            setRegisterPage(7);
          }}
          onSubmit={async (data) => {
            let followTopicRequest = await dispatch(followTopic(data));
            if (followTopicRequest) {
              data.forEach((el) => {
                trackWithMixPanel('User: Registration - Followed A Topic', {
                  distinct_id: createAccountData.id,
                  topic_id: el,
                });
              });
              dispatch(getPeopleToHear());
              setRegisterPage(7);
            }
          }}
        />
      )}
      {registerPage === 7 && (
        <PeopleToHearForm
          userData={createAccountData}
          onSubmit={() => {
            dispatch(getCommunities());
            setRegisterPage(8);
          }}
          onSkip={() => {
            dispatch(getCommunities());
            setRegisterPage(8);
          }}
        />
      )}
      {registerPage === 8 && (
        <CommunitiesToJoinForm
          userData={createAccountData}
          onSubmit={() => {
            trackWithMixPanel('User: Logged In', {
              distinct_id: createAccountData.id,
            });
            dispatch(userLogin());
          }}
          onSkip={() => {
            trackWithMixPanel('User: Logged In', {
              distinct_id: createAccountData.id,
            });
            dispatch(userLogin());
          }}
        />
      )}
      {isLoading && <LoadingSpinner coverView={true} />}
      {JoinCommunityModal()}
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

  const JoinCommunityModal = () => {
    return (
      <Modal
        isOpen={joinCommunityModalIsOpen}
        closeModal={() => dispatch(openJoinCommunityModal(false))}>
        {communityFromCode !== 'This Community is Private' &&
        communityFromCode !== 'Community Not Found' ? (
          <>
            <Text style={styles.joinCommunityHeaderTextStyle}>
              Join this community
            </Text>
            <Text style={styles.communityNameStyle}>
              {communityFromCode.name}
            </Text>
            <Button
              name="Join Community"
              customStyle={styles.joinCommunityButtonStyle}
              onPress={async () => {
                let joinCommunityRequest = await dispatch(
                  joinCommunity(communityFromCode.id),
                );

                if (joinCommunityRequest.status) {
                  dispatch(openJoinCommunityModal(false));
                } else {
                  dispatch(openJoinCommunityModal(false));
                  console.log(joinCommunityRequest.msg);
                }
              }}
            />
          </>
        ) : (
          <Text style={styles.joinCommunityHeaderTextStyle}>
            {communityFromCode}
          </Text>
        )}
      </Modal>
    );
  };

  const appleSignInBtn = (result) => {
    console.log('Resssult',result);
    dispatch(appleSignIn(result))
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
          () => setRegisterModalIsOpen(true),
        )}
        {WelcomeScreenButton(
          'Continue with Facebook',
          {
            ...styles.buttonStyle,
            backgroundColor: '#3B5998',
            borderColor: '#3B5998',
            color: '#FFFFFF',
          },
          async () => {
            dispatch(
              FacebookSignIn((value) => {
                if (value.openRegisterModal) {
                  setRegisterPage(6);
                  dispatch(getTopic());
                  setRegisterModalIsOpen(true);
                }
              }),
            );
          },
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
          async () => {
            let googleSignInRequest = await dispatch(GoogleSignIn());

            if (googleSignInRequest.openRegisterModal) {
              setRegisterPage(6);
              dispatch(getTopic());
              setRegisterModalIsOpen(true);
            }
          },
          IcGoogle,
          styles.buttonIconStyle,
        )}
        {Platform.OS === 'ios' ? SignInWithAppleButton({
          buttonStyle: {
            ...styles.buttonStyle,
            backgroundColor: 'black',
            borderRadius: 10,
            marginBottom: '3%',
            alignItems: 'center',
            justifyContent: 'center',
            flexDirection: 'row',
            borderWidth: 1,
          }, 
          callBack: appleSignInBtn,
          buttonText: "Continue With Apple",
        }) : null}
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
