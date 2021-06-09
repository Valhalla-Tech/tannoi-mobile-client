import React from 'react';
import { Text, StyleSheet, Platform, TouchableOpacity } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import { Normal } from '../../../styles/FontSize';
import { CalculateHeight } from '../../../helper/CalculateSize';

const DatePicker = (props) => {
  const {
    value,
    onChange,
    mode,
    dateDisplay,
    show,
    showDatepicker,
    setShow,
    customStyle,
    placeholder,
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
            textColor="blue"
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
          style={{ ...styles.formInputStyle, ...customStyle }}
          onPress={showDatepicker}>
          <Text
            style={{
              ...styles.inputTextStyle,
              color: placeholder ? '#73798C' : styles.inputTextStyle.color,
              fontSize: placeholder ? CalculateHeight(2) : undefined,
            }}>
            {dateDisplay !== '' ? dateDisplay : placeholder ? placeholder : ''}
          </Text>
        </TouchableOpacity>
      )}
    </>
  );
};

const styles = StyleSheet.create({
  selectDateButtonStyle: {
    fontFamily: Normal,
    color: '#6505E1',
    fontSize: CalculateHeight(2),
    alignSelf: 'flex-end',
  },

  inputTextStyle: {
    fontSize: CalculateHeight(1.8),
    fontFamily: Normal,
  },

  formInputStyle: {
    borderBottomColor: 'grey',
    borderBottomWidth: 1,
    borderBottomColor: '#E3E6EB',
    fontSize: CalculateHeight(1.8),
    fontFamily: Normal,
    justifyContent: 'center',
  },
});

export default DatePicker;
