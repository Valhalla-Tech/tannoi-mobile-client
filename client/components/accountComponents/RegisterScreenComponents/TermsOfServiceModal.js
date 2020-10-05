import React, { useState } from 'react';
import {
  StyleSheet,
  Modal,
  View,
  Text,
  ScrollView
} from 'react-native';

//Component
import CloseButton from '../../publicComponents/CloseButton';

const TermsOfServiceModal = props => {
  const {
    openTermsOfServiceModal,
    closeTermsOfServiceModal
  } = props;

  return (
    <Modal
      animationType="slide"
      visible={openTermsOfServiceModal}
      transparent={true}
    >
      <View style={styles.backgroundShadowStyle}></View>
        <View style={styles.termsOfServiceModalStyle}>
          <CloseButton closeFunction={closeTermsOfServiceModal} />
          <ScrollView>
            <Text style={styles.termsOfServiceTitleStyle}>Terms of service</Text>
            <Text style={styles.termsOfServiceArticleTitleStyle}>AGREEMENT</Text>
            <Text style={styles.termsOfServiceArticleStyle}>
              These Terms of Service constitute a legally binding 
              agreement (the "Agreement") by and between ProBoards, 
              Inc. dba Forums.net (hereinafter, "Forums.net") 
              and you or your company (in either case, "You" or "Your") 
              concerning Your purchase and use of Forums.net's website, 
              (the "Website"), products and services, including without 
              limitation forum hosting services. The Website, products 
              and services are collectively referred to herein as "the 
              Services." By using the Services, You represent and warrant 
              that You have read and understood, and agree to be bound by, 
              this Agreement, as modified by Forums.net from time to time 
              and posted on the Website.
            </Text>
            <Text style={styles.termsOfServiceArticleTitleStyle}>PRIVACY POLICY</Text>
            <Text style={styles.termsOfServiceArticleStyle}>
              By using the Services, You consent to the collection and 
              use of certain information about You, as specified in Forums.net's Privacy Policy. 
              Forums.net encourages You to frequently check the Privacy Policy for changes.
            </Text>
          </ScrollView>
        </View>
      </Modal>
  );
};

const styles = StyleSheet.create({
  backgroundShadowStyle: {
    backgroundColor:'rgba(0,0,0,0.8)', 
    width:"100%", 
    height:"100%"
  },

  termsOfServiceModalStyle: {
    position: "absolute",
    top: 65,
    backgroundColor: "#FFFFFF",
    width: "100%",
    height: "100%",
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    display: "flex",
    padding: 20,
    paddingBottom: 55
  },

  termsOfServiceTitleStyle: {
    marginTop: 32,
    marginBottom: 16,
    fontSize: 28,
    fontWeight: "bold",
    color: "#464D60"
  },

  termsOfServiceArticleTitleStyle: {
    fontSize: 16,
    marginBottom: 4,
    fontWeight: "600",
    color: "#5152D0"
  },

  termsOfServiceArticleStyle: {
    fontSize: 16,
    marginBottom: 24,
    color: "#464D60",
    lineHeight: 24,
    letterSpacing: 0.4
  }
});

export default TermsOfServiceModal;