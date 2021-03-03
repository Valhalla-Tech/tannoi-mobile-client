import React, { useState, useEffect } from 'react';
import {
  Text,
  TouchableOpacity,
  StyleSheet,
  ActionSheetIOS,
} from 'react-native';
import { normal } from '../../assets/FontSize';
import { CalculateHeight } from '../../helper/CalculateSize';

const IosPicker = (props) => {
  const { placeholder, data, onChangeValue, customStyle } = props;

  const [name, setName] = useState([]);
  const [selectedName, setSelectedName] = useState('');

  useEffect(() => {
    if (data !== '') {
      let nameDisplay = [];

      data.forEach((data) => {
        nameDisplay.push(data.name);
      });

      setName(nameDisplay);
    }
  }, [data]);

  const options = () =>
    ActionSheetIOS.showActionSheetWithOptions(
      {
        options: name,
        // destructiveButtonIndex: 2,
        // cancelButtonIndex: 0,
        userInterfaceStyle: 'dark',
      },
      (buttonIndex) => {
        setSelectedName(name[buttonIndex]);
        onChangeValue(data[buttonIndex].id);
      },
    );

  return (
    <TouchableOpacity
      onPress={() => options()}
      style={{ ...styles.iosPickerStyle, ...customStyle }}>
      <Text style={styles.iosPickerTextStyle}>{selectedName !== '' ? selectedName : placeholder}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  iosPickerStyle: {
    borderBottomWidth: 1,
    borderBottomColor: '#E3E6EB',
  },

  iosPickerTextStyle: {
    fontFamily: normal,
    fontSize: CalculateHeight(2),
    color: '#73798C',
  },
});

export default IosPicker;
