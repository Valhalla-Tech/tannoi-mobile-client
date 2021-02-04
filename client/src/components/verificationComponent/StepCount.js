import React from 'react';
import { View, StyleSheet } from 'react-native';
import { useSelector } from 'react-redux';

const StepCount = (props) => {
  const { rootCustomStyle } = props;

  const currentStep = useSelector(
    (state) => state.VerificationReducer.stepCount,
  );

  return (
    <View style={styles.stepContainerRootStyle}>
      <View style={styles.stepContainerStyle}>
        <View
          style={
            currentStep === 1 || currentStep === 2
              ? {
                  ...styles.stepStyle,
                  ...rootCustomStyle,
                  backgroundColor: '#6505E1',
                }
              : { ...styles.stepStyle, ...rootCustomStyle }
          }
        />
        <View
          style={
            currentStep === 2
              ? {
                  ...styles.stepStyle,
                  ...rootCustomStyle,
                  backgroundColor: '#6505E1',
                }
              : { ...styles.stepStyle, ...rootCustomStyle }
          }
        />
        <View style={{ ...styles.stepStyle, ...rootCustomStyle }} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  stepContainerRootStyle: {
    alignItems: 'center',
    height: '2.5%',
  },

  stepContainerStyle: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    height: '100%',
    width: '25%',
  },

  stepStyle: {
    width: 15,
    height: 15,
    borderRadius: 50,
    backgroundColor: '#a1a5ab',
  },
});

export default StepCount;
