import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import Card from '../publicComponents/Card';
import ListCardPlayer from '../publicComponents/ListCardPlayer';
import DisplayBirthDate from '../../helper/DisplayBirthDate';
import {bold, normal} from '../../assets/FontSize';
import LoadingSpinner from '../publicComponents/LoadingSpinner';

const AboutSection = (props) => {
  const {
    customStyle,
    bio,
    gender,
    birthDate,
    bioVoiceFile,
    isLoading,
    navigation,
  } = props;

  const AboutData = (title, data) => {
    return (
      <View style={styles.aboutDataStyle}>
        {title === 'Bio' && bioVoiceFile !== null ? (
          <ListCardPlayer
            recordingFile={bioVoiceFile}
            fromBio={true}
            navigation={navigation}
          />
        ) : (
          <View style={styles.aboutDataIconStyle}></View>
        )}
        <View style={styles.dataContentStyle}>
          <Text style={styles.dataTextStyle}>{data}</Text>
          <Text style={styles.dataTitleStyle}>{title}</Text>
        </View>
      </View>
    );
  };

  const AboutSectionContent = () => {
    return (
      <View>
        {isLoading ? (
          <LoadingSpinner loadingSpinnerForComponent={true} />
        ) : (
          <>
            {AboutData('Bio', bio ? bio : '-')}
            {AboutData('Gender', gender ? gender : '-')}
            {AboutData(
              'Birthday',
              birthDate !== '' && birthDate !== null
                ? DisplayBirthDate(new Date(birthDate))
                : '-',
            )}
          </>
        )}
      </View>
    );
  };

  return <Card child={AboutSectionContent} customStyle={customStyle} />;
};

const styles = StyleSheet.create({
  aboutDataStyle: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: '2%',
    paddingVertical: '3%',
    borderBottomWidth: 1,
    borderBottomColor: '#F5F7F9',
  },

  aboutDataIconStyle: {
    width: 50,
    height: 50,
    borderRadius: 50,
    backgroundColor: '#F5F7F9',
  },

  dataContentStyle: {
    width: '100%',
    paddingLeft: '2%',
  },

  dataTextStyle: {
    fontFamily: normal,
    color: '#464D60',
    fontSize: 16,
    maxWidth: '90%',
  },

  dataTitleStyle: {
    fontFamily: normal,
    fontSize: 12,
    color: '#73798C',
  },
});

export default AboutSection;
