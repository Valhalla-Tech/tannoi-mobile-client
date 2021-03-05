import React, { useState, useEffect, useRef } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableWithoutFeedback,
  Modal,
  Animated,
} from 'react-native';

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

  const [resetOpacity, setResetOpacity] = useState(false);

  const fadeAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    if (openModal) {
      setResetOpacity(false);
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 500,
        useNativeDriver: true,
      }).start();
    } 
  }, [openModal]);

  return (
    <Modal animationType={animation} transparent={true} visible={openModal}>
      <TouchableWithoutFeedback
        style={{ flex: 1, borderWidth: 10 }}
        onPress={() => {
          closeModal();
          setResetOpacity(true);
        }}
        disabled={disableButton}>
        <View style={{ flex: 1 }}>
          <Animated.View
            style={{
              ...styles.modalBackgroundStyle,
              opacity: resetOpacity ? 0 : fadeAnim,
            }}
          />
          <View
            style={{ ...styles.modalContainerStyle, ...customContainerStyle }}>
            <View style={{ ...styles.modalStyle, ...customStyle }}>
              {children || (child && child())}
              {modalButton && modalButton()}
            </View>
          </View>
        </View>
      </TouchableWithoutFeedback>
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

  modalBackgroundStyle: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.8)',
    position: 'absolute',
    width: '100%',
    height: '100%',
  },

  modalContainerStyle: {
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
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
