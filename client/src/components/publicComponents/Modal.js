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
  } = props;

  return (
    <Modal animationType={animation} transparent={true} visible={openModal}>
      <View style={styles.modalBackground}>
        <TouchableOpacity
          style={{ flex: 1 }}
          onPress={() => {
            closeModal();
          }}></TouchableOpacity>
      </View>
      <View style={{ ...styles.modalContainerStyle, ...customContainerStyle }}>
        <View style={{ ...styles.noticeModalStyle, ...customStyle }}>
          {children || (child && child())}
          {modalButton && modalButton()}
        </View>
      </View>
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

  noticeModalStyle: {
    width: '85%',
    height: '10%',
    borderRadius: 20,
    padding: '5%',
    backgroundColor: '#FFFFFF',
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default MainModal;
