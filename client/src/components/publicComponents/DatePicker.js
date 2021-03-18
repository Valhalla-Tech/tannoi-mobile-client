import React from 'react';
import { Text, StyleSheet, Platform, TouchableOpacity } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import { normal } from '../../assets/FontSize';
import { CalculateHeight } from '../../helper/CalculateSize';

const DatePicker = (props) => {
  const {
    value,
    onChange,
    mode,
    dateDisplay,
    show,
    showDatepicker,
    setShow,
    customFormInputStyle,
  } = props;

  return (
    <>
      {show ? (
        <>
          <DateTimePicker
            testID="dateTimePicker"
            value={value}
            mode={mode}
            is24Hour={true}
            display="spinner"
            onChange={onChange}
          />
          {Platform.OS === 'ios' && (
            <Text
              onPress={() => setShow(false)}
              style={styles.selectDateButtonStyle}>
              Select
            </Text>
          )}
        </>
      ) : (
        <TouchableOpacity
          style={{ ...styles.formInputStyle, ...customFormInputStyle }}
          onPress={showDatepicker}>
          <Text style={styles.inputTextStyle}>{dateDisplay}</Text>
        </TouchableOpacity>
      )}
    </>
  );
};

const styles = StyleSheet.create({
  selectDateButtonStyle: {
    fontFamily: normal,
    color: '#6505E1',
    fontSize: CalculateHeight(2),
    alignSelf: 'flex-end',
  },

  inputTextStyle: {
    fontSize: CalculateHeight(1.8),
    fontFamily: normal,
  },

  formInputStyle: {
    borderBottomColor: 'grey',
    borderBottomWidth: 1,
    borderBottomColor: '#E3E6EB',
    fontSize: CalculateHeight(1.8),
    fontFamily: normal,
    justifyContent: 'center',
  },
});

export default DatePicker;
