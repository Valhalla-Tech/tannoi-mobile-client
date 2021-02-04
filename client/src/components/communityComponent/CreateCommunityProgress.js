import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { normal } from '../../assets/FontSize';

const CreateCommunityProgress = (props) => {
  const { stepNumber } = props;

  return (
    <View>
      <Text style={styles.stepTextStyle}>Step {stepNumber}</Text>
      <View style={styles.barContainerStyle}>
        <View
          style={{
            ...styles.barProgressStyle,
            borderTopLeftRadius: 10,
            borderBottomLeftRadius: 10,
            backgroundColor: '#7E37B6',
          }}
        />
        <View
          style={
            stepNumber === 2 || stepNumber === 3 || stepNumber === 4
              ? { ...styles.barProgressStyle, backgroundColor: '#7E37B6' }
              : styles.barProgressStyle
          }
        />
        <View
          style={
            stepNumber === 3 || stepNumber === 4
              ? { ...styles.barProgressStyle, backgroundColor: '#7E37B6' }
              : styles.barProgressStyle
          }
        />
        <View
          style={
            stepNumber === 4
              ? {
                  ...styles.barProgressStyle,
                  borderTopRightRadius: 10,
                  borderBottomRightRadius: 10,
                  backgroundColor: '#7E37B6',
                }
              : {
                  ...styles.barProgressStyle,
                  borderTopRightRadius: 10,
                  borderBottomRightRadius: 10,
                }
          }
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  stepTextStyle: {
    marginBottom: '1%',
    color: '#73798C',
    fontFamily: normal,
  },

  barContainerStyle: {
    flexDirection: 'row',
    alignItems: 'center',
    height: '10%',
  },

  barProgressStyle: {
    height: '100%',
    width: '18%',
    height: '100%',
    backgroundColor: '#C9CCD5',
  },
});

export default CreateCommunityProgress;
