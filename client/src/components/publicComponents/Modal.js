import React, { useState, useEffect, useRef } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableWithoutFeedback,
  TouchableOpacity,
  Modal,
  Animated,
  ScrollView,
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
      <View style={{ ...styles.modalContainerStyle, ...customContainerStyle }}>
        <TouchableOpacity
          style={{ height: '100%', width: '100%', position: 'absolute'}}
          onPress={() => {
            closeModal();
            setResetOpacity(true);
          }}
          disabled={disableButton}>
          <Animated.View
            style={{
              ...styles.modalBackgroundStyle,
              opacity: resetOpacity ? 0 : fadeAnim,
            }}
          />
        </TouchableOpacity>
        <View style={{ ...styles.modalStyle, ...customStyle }}>
          {children || (child && child())}
          {modalButton && modalButton()}
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalBackground: {
    backgroundColor: 'rgba(0,0,0,0.8)',
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
    borderRadius: 20,
    padding: '5%',
    backgroundColor: '#FFFFFF',
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default MainModal;
