import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Switch } from 'react-native';
import { useDispatch } from 'react-redux';
import { userLogout } from '../../../store/actions/LoginAction';
import { clearTopic } from '../../../store/actions/TopicAction';
import { clearLogedInProfile } from '../../../store/actions/ProfileAction';
import { bold, normal } from '../../../assets/FontSize';
import AsyncStorage from '@react-native-community/async-storage';
import axios from '../../../constants/ApiServices';
import BaseUrl from '../../../constants/BaseUrl';

//Components
import ScreenContainer from '../../../components/publicComponents/ScreenContainer';
import Header from '../../../components/publicComponents/Header';
import Card from '../../../components/publicComponents/Card';
import BackButton from '../../../components/publicComponents/BackButton';

const SettingsScreen = ({ navigation }) => {
  const [switchStatus, setSwitchStatus] = useState(false);

  const dispatch = useDispatch();

  useEffect(() => {
    getSetting();
  }, []);

  const objectionableContentSwitch = async () => {
    try {
      setSwitchStatus((prevState) => !prevState);
      let access_token = await AsyncStorage.getItem('access_token');

      let objectionableContentSwitchRequest = await axios({
        method: 'post',
        url: `${BaseUrl}/users/${
          switchStatus ? 'show-content' : 'hide-content'
        }`,
        headers: {
          token: access_token,
        },
        data: {
          type: 'objectionable',
        },
      });

      if (objectionableContentSwitchRequest.data) {
        console.log('success');
        // setSwitchStatus(prevState => !prevState);
      }
    } catch (error) {
      setSwitchStatus((prevState) => !prevState);
      console.log(error);
    }
  };

  const getSetting = async () => {
    try {
      let access_token = await AsyncStorage.getItem('access_token');

      let getSettingRequest = await axios({
        method: 'get',
        url: `${BaseUrl}/pages/setting`,
        headers: {
          token: access_token,
        },
      });

      if (getSettingRequest.data) {
        setSwitchStatus(getSettingRequest.data.hideContentObjectionable);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const HeaderContent = () => {
    return (
      <>
        <View style={styles.backButtonAndTitleContainerStyle}>
          <BackButton
            navigation={navigation}
            styleOption={{
              marginTop: 0,
              marginBottom: 0,
            }}
          />
          <Text style={styles.titleTextStyle}>Settings</Text>
        </View>
        <TouchableOpacity
          onPress={() => {
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
      <TouchableOpacity
        onPress={() => navigation.navigate(screenName)}
        style={
          lastButton
            ? { ...styles.menuButtonStyle, borderBottomWidth: 0 }
            : styles.menuButtonStyle
        }>
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
        {MenuButton('Blocked users', null, 'BlockedUsersScreen', true)}
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
        {MenuButton(
          'Notification settings',
          null,
          'NotificationSettingsScreen',
        )}
      </View>
    );
  };

  const SafetyMenu = () => (
    <View>
      <View style={styles.cardHeaderStyle}>
        <Text style={styles.menuHeaderTextStyle}>Safety</Text>
      </View>
      <View style={styles.objectionableContentSwitchStyle}>
        <Text style={styles.menuButtonTextStyle}>
          Hide objectionable content
        </Text>
        <Switch
          value={switchStatus}
          onValueChange={objectionableContentSwitch}
        />
      </View>
    </View>
  );

  return (
    // <View>
    <ScreenContainer>
      <Header child={HeaderContent} customStyle={styles.headerStyle} />
      <View style={styles.settingsScreenContainerStyle}>
        <Card child={AccountMenu} customStyle={styles.cardStyle} />
        <Card
          child={NotificationsMenu}
          customStyle={{ ...styles.cardStyle, marginTop: '2%' }}
        />
        <Card customStyle={{ ...styles.cardStyle, marginTop: '2%' }}>
          {SafetyMenu()}
        </Card>
      </View>
    </ScreenContainer>
    // </View>
  );
};

const styles = StyleSheet.create({
  headerStyle: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingLeft: '2.5%',
    paddingRight: '5%',
    paddingVertical: '3%',
  },

  settingsScreenContainerStyle: {
    paddingHorizontal: '1.8%',
    paddingVertical: '2%',
  },

  backButtonAndTitleContainerStyle: {
    flexDirection: 'row',
    alignItems: 'center',
  },

  titleTextStyle: {
    marginLeft: '8%',
    fontFamily: bold,
    color: '#464D60',
    fontSize: 20,
  },

  logOutButtonTextStyle: {
    fontFamily: bold,
    color: '#0E4EF4',
    fontSize: 16,
  },

  cardStyle: {
    borderRadius: 8,
  },

  cardHeaderStyle: {
    paddingTop: '3%',
    paddingHorizontal: '5%',
  },

  menuHeaderTextStyle: {
    color: '#464D60',
    fontFamily: bold,
    fontSize: 16,
  },

  menuButtonStyle: {
    paddingHorizontal: '5%',
    borderBottomWidth: 1,
    borderBottomColor: '#F5F7F9',
    paddingVertical: '3%',
  },

  menuButtonTextStyle: {
    color: '#464D60',
    fontSize: 16,
    fontFamily: normal,
  },

  objectionableContentSwitchStyle: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: '5%',
    paddingBottom: '3%',
  },
});

export default SettingsScreen;
