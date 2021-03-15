import React from 'react';
import { TouchableOpacity } from 'react-native';

//Icon
import CloseIcon from '../../assets/accountAssets/ModalComponent/closeIcon.svg';

const CloseButton = (props) => {
  const { closeFunction, customStyle } = props;

  return (
    <TouchableOpacity style={{ ...customStyle }} onPress={closeFunction}>
      <CloseIcon />
    </TouchableOpacity>
  );
};

export default CloseButton;
