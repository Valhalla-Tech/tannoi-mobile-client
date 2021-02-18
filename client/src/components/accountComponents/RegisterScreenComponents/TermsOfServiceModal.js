import React from 'react';
import { StyleSheet, View, Text, ScrollView } from 'react-native';
import { bold, normal } from '../../../assets/FontSize';
import { CalculateHeight } from '../../../helper/CalculateSize';

//Components
import CloseButton from '../../publicComponents/CloseButton';
import Modal from '../../publicComponents/Modal';

const TermsOfServiceModal = (props) => {
  const { openTermsOfServiceModal, closeTermsOfServiceModal } = props;

  const ModalContent = () => {
    return (
      <View style={styles.termsOfServiceModalStyle}>
        <CloseButton closeFunction={closeTermsOfServiceModal} />
        <ScrollView>
          <Text style={styles.termsOfServiceTitleStyle}>Terms of service</Text>
          <Text style={styles.termsOfServiceArticleTitleStyle}>AGREEMENT</Text>
          <Text style={styles.termsOfServiceArticleStyle}>
            These Terms of Service constitute a legally binding agreement (the
            "Agreement") by and between ProBoards, Inc. dba Forums.net
            (hereinafter, "Forums.net") and you or your company (in either case,
            "You" or "Your") concerning Your purchase and use of Forums.net's
            website, (the "Website"), products and services, including without
            limitation forum hosting services. The Website, products and
            services are collectively referred to herein as "the Services." By
            using the Services, You represent and warrant that You have read and
            understood, and agree to be bound by, this Agreement, as modified by
            Forums.net from time to time and posted on the Website.
          </Text>
          <Text style={styles.termsOfServiceArticleTitleStyle}>
            PRIVACY POLICY
          </Text>
          <Text style={styles.termsOfServiceArticleStyle}>
            By using the Services, You consent to the collection and use of
            certain information about You, as specified in Forums.net's Privacy
            Policy. Forums.net encourages You to frequently check the Privacy
            Policy for changes.
          </Text>
        </ScrollView>
      </View>
    );
  };

  return (
    <Modal
      openModal={openTermsOfServiceModal}
      closeModal={closeTermsOfServiceModal}
      child={ModalContent}
      animation="slide"
      customStyle={{
        width: '100%',
        height: '85%',
        borderBottomLeftRadius: 0,
        borderBottomRightRadius: 0,
      }}
      customContainerStyle={{
        justifyContent: 'flex-end',
      }}
    />
  );
};

const styles = StyleSheet.create({
  backgroundShadowStyle: {
    backgroundColor: 'rgba(0,0,0,0.8)',
    width: '100%',
    height: '100%',
  },

  termsOfServiceTitleStyle: {
    marginTop: '10%',
    marginBottom: '5%',
    fontSize: CalculateHeight(3),
    fontFamily: bold,
    color: '#464D60',
  },

  termsOfServiceArticleTitleStyle: {
    fontSize: CalculateHeight(2),
    marginBottom: '2%',
    fontFamily: normal,
    color: '#5152D0',
  },

  termsOfServiceArticleStyle: {
    fontSize: CalculateHeight(2),
    fontFamily: normal,
    marginBottom: '8%',
    color: '#464D60',
    lineHeight: 24,
    letterSpacing: 0.4,
  },
});

export default TermsOfServiceModal;
