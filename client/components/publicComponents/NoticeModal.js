import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Modal
} from 'react-native';
import { bold, normal } from '../../assets/FontSize';

const NoticeModal = props => {
  const {
    openModal,
    closeModal,
    message
  } = props;

  return (
    <Modal
      animationType="fade"
      transparent={true}
      visible={openModal}
    >
      <View style={styles.modalBackground}>
        <TouchableOpacity style={{flex: 1}} onPress={()=> {
          closeModal();
        }} ></TouchableOpacity>
      </View>
      <View style={styles.modalContainerStyle}>
        <View style={styles.noticeModalStyle}>
          <Text style={styles.textStyle}>{message}</Text>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalBackground: {
    position: "absolute", 
    backgroundColor: 'rgba(0,0,0,0.8)', 
    height: "100%", 
    width: "100%"
  },

  modalContainerStyle: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center"
  },

  noticeModalStyle: {
    width: "85%",
    height: "10%",
    borderRadius: 20,
    padding: "3.5%",
    backgroundColor: "#FFFFFF",
    justifyContent: "center",
    alignItems: "center"
  },

  textStyle: {
    fontFamily: bold,
    color: "#6505E1"
  }
});

export default NoticeModal;