import React from 'react';
import {
  TouchableOpacity,
  Text
} from 'react-native';

//Icon
import CloseIcon from '../../assets/ModalComponent/closeIcon.svg';

const CloseButton = props => {
  const {closeFunction} = props;

  return (
    <TouchableOpacity
      onPress={closeFunction}
    >
      <CloseIcon />
    </TouchableOpacity>
  );
};

export default CloseButton;