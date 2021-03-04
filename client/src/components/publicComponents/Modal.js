import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Modal } from 'react-native';

const MainModal = (props) => {
  const {
    openModal,
    closeModal,
    child,
    children,
    modalButton,
    customStyle,
    customContainerStyle,
    animation = 'fade',
    disableButton,
  } = props;

  return (
    <Modal animationType={animation} transparent={true} visible={openModal}>
      <TouchableOpacity
        style={{ flex: 1, backgroundColor: 'rgba(0,0,0,0.8)' }}
        onPress={() => {
          closeModal();
        }}
        disabled={disableButton}>
        <View
          style={{ ...styles.modalContainerStyle, ...customContainerStyle }}>
          <View style={{ ...styles.modalStyle, ...customStyle }}>
            {children || (child && child())}
            {modalButton && modalButton()}
          </View>
        </View>
      </TouchableOpacity>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalBackground: {
    position: 'absolute',
    backgroundColor: 'rgba(0,0,0,0.8)',
    height: '100%',
    width: '100%',
  },

  modalContainerStyle: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },

  modalStyle: {
    width: '85%',
    // height: '10%',
    borderRadius: 20,
    padding: '5%',
    backgroundColor: '#FFFFFF',
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default MainModal;
