import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableWithoutFeedback,
  Keyboard,
} from 'react-native';
import { bold, normal } from '../../../assets/FontSize';
import { CalculateHeight } from '../../../helper/CalculateSize';
import { GlobalPadding } from '../../../constants/Size';

import Header from '../../../components/publicComponents/Header';
import BackButton from '../../../components/publicComponents/BackButton';
import Card from '../../../components/publicComponents/Card';
import CreateCommunityInput from '../../../components/communityComponent/CreateCommunityInput';

const GuidelinesScreen = ({ navigation, route }) => {
  const { guidelines, isAdmin } = route.params;

  const [editedGuidelines, setEditedGuidelines] = useState(guidelines);

  const HeaderContent = () => (
    <>
      <BackButton
        styleOption={{
          marginTop: 0,
          marginBottom: 0,
        }}
        navigation={navigation}
      />
      <Text style={styles.headerTextStyle}>Community's guideline</Text>
    </>
  );

  const GuidelinesCard = () => (
    <>
      {isAdmin ? (
        <CreateCommunityInput
          customStyle={{
            fontSize: CalculateHeight(2),
          }}
          value={editedGuidelines}
          inputFunction={(value) => setEditedGuidelines(value)}
        />
      ) : (
        <Text style={styles.guidelinesTextStyle}>{guidelines}</Text>
      )}
    </>
  );

  return (
    <View style={{ flex: 1 }}>
      <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
        <View style={{flex: 1}}>
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
  },

  headerTextStyle: {
    fontFamily: bold,
    marginLeft: '3%',
    fontSize: CalculateHeight(2.5),
    color: '#464D60',
  },

  guidelinesConainerStyle: {
    paddingVertical: GlobalPadding,
    paddingHorizontal: GlobalPadding,
  },

  guidelinesStyle: {
    borderRadius: 8,
    padding: '5%',
  },

  guidelinesTextStyle: {
    fontFamily: normal,
    fontSize: CalculateHeight(2),
  },
});

export default GuidelinesScreen;
