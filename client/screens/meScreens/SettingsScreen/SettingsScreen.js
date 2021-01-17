import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet
} from 'react-native';
import { useDispatch } from 'react-redux';
import { userLogout } from '../../../store/actions/LoginAction';
import { clearTopic } from '../../../store/actions/TopicAction';
import { clearLogedInProfile } from '../../../store/actions/ProfileAction';
import { bold, normal } from '../../../assets/FontSize';

//Components
import Header from '../../../components/publicComponents/Header';
import Card from '../../../components/publicComponents/Card';
import BackButton from '../../../components/publicComponents/BackButton';

const SettingsScreen = ({ navigation }) => {
  const dispatch = useDispatch();

  const HeaderContent = () => {
    return (
      <>
        <View style={styles.backButtonAndTitleContainerStyle}>
          <BackButton
            navigation={navigation}
            styleOption={{
              marginTop: 0,
              marginBottom: 0
            }}
          />
          <Text style={styles.titleTextStyle}>Settings</Text>
        </View>
        <TouchableOpacity onPress={() => {
          dispatch(userLogout());
          dispatch(clearTopic());
          dispatch(clearLogedInProfile());
        }}>
          <Text style={styles.logOutButtonTextStyle}>Log out</Text>
        </TouchableOpacity>
      </>
    );
  };

  const MenuButton = (buttonTitle, buttonIcon, screenName, lastButton) => {
    return (
      <TouchableOpacity onPress={() => navigation.navigate(screenName)} style={lastButton ? {...styles.menuButtonStyle, borderBottomWidth: 0} : styles.menuButtonStyle}>
        <Text style={styles.menuButtonTextStyle}>{buttonTitle}</Text>
      </TouchableOpacity>
    );
  };

  const AccountMenu = () => {
    return (
      <View>
        <View style={styles.cardHeaderStyle}>
          <Text style={styles.menuHeaderTextStyle}>Account</Text>
        </View>
        {MenuButton('Edit profile', null, 'EditProfileScreen')}
        {/*
        {MenuButton('Change password')}
        {MenuButton('Log in options', null, null, true)}
        */}
      </View>
    );
  };

  const NotificationsMenu = () => {
    return (
      <View>
        <View style={styles.cardHeaderStyle}>
          <Text style={styles.menuHeaderTextStyle}>Notifications</Text>
        </View>
        {MenuButton('Notification settings', null, 'NotificationSettingsScreen')}
      </View>
    );
  };

  return (
    <View>
      <Header
        child={HeaderContent}
        customStyle={styles.headerStyle}
      />
      <View style={styles.settingsScreenContainerStyle}>
        <Card
          child={AccountMenu}
          customStyle={styles.cardStyle}
        />
        <Card
          child={NotificationsMenu}
          customStyle={{...styles.cardStyle, marginTop: "2%"}}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  headerStyle: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingLeft: "2.5%",
    paddingRight: "5%",
    paddingVertical: "3%"
  },

  settingsScreenContainerStyle: {
    paddingHorizontal: "1.8%",
    paddingVertical: "2%"
  },

  backButtonAndTitleContainerStyle: {
    flexDirection: "row",
    alignItems: "center"
  },

  titleTextStyle: {
    marginLeft: "8%",
    fontFamily: bold,
    color: "#464D60",
    fontSize: 20
  },

  logOutButtonTextStyle: {
    fontFamily: bold,
    color: "#0E4EF4",
    fontSize: 16
  },

  cardStyle: {
    borderRadius: 8
  },

  cardHeaderStyle: {
    paddingTop: "3%",
    paddingHorizontal: "5%"
  },

  menuHeaderTextStyle: {
    color: "#464D60",
    fontFamily: bold,
    fontSize: 16
  },

  menuButtonStyle: {
    paddingHorizontal: "5%",
    borderBottomWidth: 1,
    borderBottomColor: "#F5F7F9",
    paddingVertical: "3%"
  },

  menuButtonTextStyle: {
    color: "#464D60",
    fontSize: 16,
    fontFamily: normal
  }
});

export default SettingsScreen;