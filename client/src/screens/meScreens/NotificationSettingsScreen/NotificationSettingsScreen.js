import React, {useState, useEffect} from 'react';
import {View, Text, StyleSheet, Switch} from 'react-native';
import {bold, normal} from '../../../assets/FontSize';
import {GlobalPadding} from '../../../constants/Size';
import {CalculateHeight} from '../../../helper/CalculateSize';
import axios from '../../../constants/ApiServices';
import AsyncStorage from '@react-native-community/async-storage';
import BaseUrl from '../../../constants/BaseUrl';

//Components
import Card from '../../../components/publicComponents/Card';
import Header from '../../../components/publicComponents/Header';
import BackButton from '../../../components/publicComponents/BackButton';
import LoadingSpinner from '../../../components/publicComponents/LoadingSpinner';

const NotificationSettingsScreen = ({navigation}) => {
  const [emailNotificationStatus, setEmailNotificationStatus] = useState('');

  useEffect(() => {
    getUserNotificationStatus();
  }, []);

  const getUserNotificationStatus = async () => {
    try {
      let access_token = await AsyncStorage.getItem('access_token');

      let getUserNotificationStatusRequest = await axios({
        method: 'get',
        url: `${BaseUrl}/pages/setting`,
        headers: {
          token: access_token,
        },
      });

      if (getUserNotificationStatusRequest.data) {
        setEmailNotificationStatus(
          getUserNotificationStatusRequest.data.emailNotification.All,
        );
      }
    } catch (error) {
      console.log(error);
    }
  };

  const emailSwitch = async () => {
    try {
      setEmailNotificationStatus((prevState) => !prevState);

      let access_token = await AsyncStorage.getItem('access_token');

      let emailSwitchRequest = await axios({
        method: 'post',
        url: emailNotificationStatus
          ? `${BaseUrl}/users/delete-notification`
          : `${BaseUrl}/users/add-notification`,
        headers: {
          token: access_token,
        },
        data: {
          type: 'All',
        },
      });

      if (emailSwitchRequest.data) {
        console.log('Success');
      }
    } catch (error) {
      setEmailNotificationStatus((prevState) => !prevState);

      console.log(error);
    }
  };

  const HeaderContent = () => {
    return (
      <>
        <BackButton
          navigation={navigation}
          styleOption={{
            marginTop: 0,
            marginBottom: 0,
          }}
        />
        <Text style={styles.titleTextStyle}>Notification settings</Text>
      </>
    );
  };

  const NotificationSettingsSwitch = () => {
    return (
      <View style={styles.notificationSettingsSwitchStyle}>
        <Text style={styles.notificationSwithchTextStyle}>
          Send me an email
        </Text>
        <Switch
          value={emailNotificationStatus}
          trackColor={{true: '#6505E1', false: ''}}
          thumbColor={'#6505E1'}
          onValueChange={emailSwitch}
        />
      </View>
    );
  };

  const NotificationSettingsCardContent = () => {
    return (
      <View>
        {emailNotificationStatus === '' ? (
          <LoadingSpinner loadingSpinnerForComponent={true} />
        ) : (
          <>
            <View style={styles.cardHeaderStyle}>
              <Text style={styles.cardHeaderTextStyle}>Notify me</Text>
            </View>
            {NotificationSettingsSwitch()}
          </>
        )}
      </View>
    );
  };

  return (
    <View>
      <Header child={HeaderContent} customStyle={styles.headerStyle} />
      <View style={styles.notificationSettingsScreenContainerStyle}>
        <Card
          child={NotificationSettingsCardContent}
          customStyle={styles.cardStyle}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  headerStyle: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: '2.5%',
    paddingVertical: '3%',
  },

  notificationSettingsScreenContainerStyle: {
    paddingHorizontal: GlobalPadding,
  },

  titleTextStyle: {
    marginLeft: '3%',
    fontFamily: bold,
    color: '#464D60',
    fontSize: 20,
  },

  cardStyle: {
    borderRadius: 8,
    marginTop: '2%',
  },

  cardHeaderStyle: {
    paddingTop: '3%',
    paddingHorizontal: '5%',
  },

  cardHeaderTextStyle: {
    fontFamily: bold,
    color: '#464D60',
    fontSize: CalculateHeight(2.2),
  },

  notificationSettingsSwitchStyle: {
    paddingHorizontal: '5%',
    paddingVertical: '3%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },

  notificationSwithchTextStyle: {
    fontFamily: normal,
    fontSize: CalculateHeight(2),
  },
});

export default NotificationSettingsScreen;
