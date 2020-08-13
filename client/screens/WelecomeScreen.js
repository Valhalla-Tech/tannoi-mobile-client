import React, { useEffect } from 'react';
import { 
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  Image
} from 'react-native';
import axios from 'axios';

//Image
import welcomeImage from '../assets/WelcomeScreen/welcomeImage.png';
import WelcomePageButton from '../components/PublicComponent/BigButton';

const WelcomeScreen = ({ navigation }) => {
  

  return (
    <View style={styles.welcomePageContainerStyle}>
      {/* Remove comment to use SVG */}
      {/* <View style={{position: "absolute"}}>
        <WelcomeImage />
      </View> */}
      <View style={styles.welcomePageGreetingContainerStyle}>
      <Image source={welcomeImage} style={styles.welcomeImageStyle} />
        <Text 
          style={{
            ...styles.welcomePageGreetingTextStyle, 
            fontSize:28, 
            fontWeight:"bold", 
            marginBottom: "5%"
          }}>
            Discover Everything
          </Text>
        <Text 
          style={{
            ...styles.welcomePageGreetingTextStyle, 
            fontSize:16, 
            marginBottom:"25%"
          }}>
            Your place to talk with friends and {"\n"} communities
          </Text>
      </View>
      <View style={styles.welcomePageLoginButtonStyle}>
        <WelcomePageButton 
          buttonTitle="Sign up with mobile or email"
          buttonStyle={
            {
              backgroundColor: "#5152D0",
              borderColor: "#5152D0",
              color: "#FFFFFF",
              width: "75%",
              height: "18%"
            }
          }
          navigation={navigation}
          navigationPage="RegisterScreen"
          buttonType="navigationButton"
        />
        <WelcomePageButton 
          buttonTitle="Continue with Facebook"
          buttonStyle={
            {
              backgroundColor: "#3B5998",
              borderColor: "#3B5998",
              color: "#FFFFFF",
              width: "75%",
              height: "18%"
            }
          }
          buttonType="navigationButton"
          buttonIconTitle="facebook"
          // buttonType="buttonFunction"
          // buttonFunction={facebookSignIn}
        />
        <WelcomePageButton 
          buttonTitle="Continue with Google"
          buttonStyle={
            {
              backgroundColor: "#FFFFFF",
              borderColor: "#E2E2E2",
              color: "#464D60",
              width: "75%",
              height: "18%"
            }
          }
          navigation={navigation}
          buttonIconTitle="google"
          // buttonType="buttonFunction"
          // buttonFunction={googleSignIn}
        />
        <View style={{flexDirection:"row"}}>
          <Text style={styles.loginButtonTextStyle}>
            Already a member?
          </Text>
          <TouchableOpacity 
            style={{marginLeft: 5}}
            onPress={() => {
              navigation.navigate('LoginScreen');
            }}
          >
            <Text style={{...styles.loginButtonTextStyle, fontWeight:"bold"}}>Login</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  )
};

const styles = StyleSheet.create({
  welcomePageContainerStyle: {
    flex: 1
  },
  
  welcomePageLoginButtonStyle: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },

  welcomePageGreetingContainerStyle: {
    flex: 1.9,
    justifyContent: "flex-end",
    alignItems: "center"
  },

  welcomePageGreetingTextStyle: {
    color: "#FFFFFF",
    textAlign: "center"
  },

  loginButtonTextStyle: {
    color: "#73798C"
  },

  welcomeImageStyle: {
    position:"absolute", 
    resizeMode:"stretch", 
    width:"107%", 
    height:"105%"
  }
});

export default WelcomeScreen;