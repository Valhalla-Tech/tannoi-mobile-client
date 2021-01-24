import React from 'react';
import {View, Text, TouchableOpacity, StyleSheet} from 'react-native';
import Modal from './Modal';
import {bold, normal} from '../../assets/FontSize';

const SortModal = (props) => {
  const {openModal, closeModal, saveSort} = props;

  const ModalButton = (title, value) => {
    return (
      <TouchableOpacity
        onPress={() => {
          saveSort(value, title);
        }}
        style={styles.modalButtonStyle}>
        <Text style={styles.modalButtonTextStyle}>{title}</Text>
      </TouchableOpacity>
    );
  };

  const ModalContent = () => {
    return (
      <View style={styles.modalContenStyle}>
        <View style={styles.modalHeaderStyle}>
          <Text style={styles.modalHeaderTextStyle}>Sort by</Text>
        </View>
        <View style={styles.modalButtonContainerStyle}>
          {ModalButton('Newest', 'newest')}
          {ModalButton('Votes', 'like')}
          {ModalButton('Most responses', 'mostResponse')}
          {ModalButton('Plays', 'view')}
          {ModalButton('Best mood', 'best_mood')}
          {ModalButton('Worst mood', 'worst_mood')}
        </View>
      </View>
    );
  };

  return (
    <Modal
      openModal={openModal}
      animation="slide"
      closeModal={closeModal}
      customContainerStyle={{
        justifyContent: 'flex-end',
      }}
      customStyle={{
        borderRadius: 0,
        width: '100%',
        height: '50%',
        borderTopLeftRadius: 30,
        borderTopRightRadius: 30,
        justifyContent: 'flex-start',
        alignItems: 'flex-start',
      }}
      child={ModalContent}
    />
  );
};

const styles = StyleSheet.create({
  modalContenStyle: {
    flex: 1,
    width: '100%',
  },

  modalHeaderStyle: {
    paddingHorizontal: '2%',
  },

  modalHeaderTextStyle: {
    fontFamily: bold,
    color: '#6505E1',
    fontSize: 20,
  },

  modalButtonContainerStyle: {
    width: '100%',
    marginTop: '2%',
  },

  modalButtonStyle: {
    width: '100%',
    paddingVertical: '2%',
    paddingHorizontal: '2%',
  },

  modalButtonTextStyle: {
    fontFamily: bold,
    fontSize: 16,
    color: '#464D60',
  },
});

export default SortModal;
