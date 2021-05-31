import React, { useEffect, forwardRef } from 'react';
import { TouchableOpacity, StyleSheet } from 'react-native';
import { CalculateHeight, CalculateWidth } from '../../../helper/CalculateSize';

const AddDiscussionButton = forwardRef((props, ref) => {
    const { onPress, onLayout } = props;

    return (<TouchableOpacity
        onLayout={e => onLayout(e)}
        style={styles.rootStyle}
        ref={ref}
        onPress={() => onPress()} />);
});

const styles = StyleSheet.create({
  rootStyle: {
    marginBottom: '35%',
    borderWidth: 10,
    height: CalculateWidth(16),
    width: CalculateWidth(12),
    borderRadius: 30,
    backgroundColor: '#2B085C',
    borderColor: '#7817FF',
  },
});

export default AddDiscussionButton;
