import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableWithoutFeedback,
  Keyboard,
  TouchableOpacity,
} from 'react-native';
import { bold, normal } from '../../../assets/FontSize';
import { CalculateHeight } from '../../../helper/CalculateSize';
import { GlobalPadding } from '../../../constants/Size';
import AsyncStorage from '@react-native-community/async-storage';
import axios from '../../../constants/ApiServices';
import BaseUrl from '../../../constants/BaseUrl';

import Header from '../../../components/publicComponents/Header';
import BackButton from '../../../components/publicComponents/BackButton';
import Card from '../../../components/publicComponents/Card';
import CreateCommunityInput from '../../../components/communityComponent/CreateCommunityInput';
import LoadingSpinner from '../../../components/publicComponents/LoadingSpinner';
import Button from '../../../components/publicComponents/Button';

const GuidelinesScreen = ({ navigation, route }) => {
  const { guidelines, isAdmin, communityId } = route.params;

  const [editedGuidelines, setEditedGuidelines] = useState(guidelines);
  const [isLoading, setIsLoading] = useState(false);

  const editGuidelines = async () => {
    try {
      setIsLoading(true);

      let access_token = await AsyncStorage.getItem('access_token');

      const formData = new FormData();

      formData.append('guidelines', editedGuidelines)

      let editGuidelinesRequest = await axios({
        method: 'put',
        url: `${BaseUrl}/communities/edit/${communityId}`,
        headers: {
          'Content-Type': 'multipart/form-data',
          token: access_token,
        },
        data: formData,
      });

      if (editGuidelinesRequest.data) {
        setIsLoading(false);
      }
    } catch (error) {
      setIsLoading(false);
      console.log(error);
    }
  };

  const HeaderContent = () => (
    <>
      <View style={styles.headerButtonAndTitleContainerStyle}>
        <BackButton
          styleOption={{
            marginTop: 0,
            marginBottom: 0,
          }}
          navigation={navigation}
        />
        <Text style={styles.headerTextStyle}>Community guidelines</Text>
      </View>
      <TouchableOpacity onPress={() => editGuidelines()}>
        <Text style={styles.saveButtonStyle}>Save</Text>
      </TouchableOpacity>
    </>
  );

  const GuidelinesCard = () => (
    <>
      {isAdmin ? (
        <>
          <CreateCommunityInput
            customStyle={{
              fontSize: CalculateHeight(2),
            }}
            value={editedGuidelines}
            inputFunction={(value) => setEditedGuidelines(value)}
            placeholder="Write your guideline"
          />
          <View style={styles.saveButtonContainerStyle}>
            {
              isLoading && <LoadingSpinner loadingSpinnerForComponent={true} />
            }
          </View>
        </>
      ) : (
        <Text style={styles.guidelinesTextStyle}>{guidelines}</Text>
      )}
    </>
  );

  return (
    <View style={{ flex: 1 }}>
      <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
        <View style={{ flex: 1 }}>
          <Header child={HeaderContent} customStyle={styles.headerStyle} />
          <View style={styles.guidelinesConainerStyle}>
            <ScrollView>
              <Card
                child={GuidelinesCard}
                customStyle={styles.guidelinesStyle}
              />
            </ScrollView>
          </View>
        </View>
      </TouchableWithoutFeedback>
    </View>
  );
};

const styles = StyleSheet.create({
  headerStyle: {
    paddingHorizontal: '3%',
    paddingVertical: '3%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },

  headerButtonAndTitleContainerStyle: {
    flexDirection: 'row',
    alignItems: 'center',
  },

  headerTextStyle: {
    fontFamily: bold,
    marginLeft: '3%',
    fontSize: CalculateHeight(2.5),
    color: '#464D60',
  },

  saveButtonStyle: {
    fontFamily: bold,
    color: '#0E4EF4',
    fontSize: CalculateHeight(2),
  },

  guidelinesConainerStyle: {
    paddingVertical: GlobalPadding,
    paddingHorizontal: GlobalPadding,
    flex: 1,
  },

  guidelinesStyle: {
    borderRadius: 8,
    padding: '5%',
  },

  guidelinesTextStyle: {
    fontFamily: normal,
    fontSize: CalculateHeight(2),
  },

  saveButtonContainerStyle: {
    alignItems: 'flex-end',
  },
});

export default GuidelinesScreen;
