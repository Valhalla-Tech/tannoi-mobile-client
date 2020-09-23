import React from 'react';
import {
  StyleSheet,
  View,
  Text
} from 'react-native';

//Components
import BackButton from '../../components/PublicComponent/BackButton';

const DiscussionScreen = () => {
  return (
    <View style={styles.discussionScreenContainerStyle}>
      <View style={style.discussionUpperBarStyle}>
        <View>
          <BackButton
            
          />
        </View>
      </View>
    </View>
  )
};

const styles = StyleSheet.create({
  discussionScreenContainerStyle: {

  },

  discussionUpperBarStyle: {

  }
});

export default DiscussionScreen;