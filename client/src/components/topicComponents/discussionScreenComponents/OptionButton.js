import React, {useState} from 'react';
import {TouchableOpacity, StyleSheet} from 'react-native';
import {useDispatch} from 'react-redux';
import {getOneProfile} from '../../../store/actions/ProfileAction';

//Components
import DiscussionCardMenu from '../../../assets/topicAssets/discussionCardMenu.svg';
import OptionModal from './OptionModal';

const OptionButton = (props) => {
  const {
    customStyle,
    navigation,
    discussionId,
    profileId,
    openPrivateModal,
    modalType,
    responseId,
    discussionTitle,
    responseTitle,
    changePlayer,
    cardIndex,
  } = props;

  const dispatch = useDispatch();

  const [optionModal, setOptionModal] = useState(false);

  const closeOptionModal = () => {
    setOptionModal(false);
  };

  const openOptionModal = () => {
    setOptionModal(true);
    dispatch(getOneProfile());
  };

  return (
    <>
      <TouchableOpacity onPress={() => openOptionModal()} style={customStyle}>
        <DiscussionCardMenu />
      </TouchableOpacity>
      <OptionModal
        openOptionModal={optionModal}
        closeOptionModal={closeOptionModal}
        discussionId={discussionId}
        navigation={navigation}
        profileId={profileId}
        openPrivateModal={openPrivateModal}
        modalType={modalType}
        responseId={responseId}
        discussionTitle={discussionTitle}
        responseTitle={responseTitle}
        changePlayer={changePlayer}
        cardIndex={cardIndex}
      />
    </>
  );
};

const styles = StyleSheet.create({});

export default OptionButton;
