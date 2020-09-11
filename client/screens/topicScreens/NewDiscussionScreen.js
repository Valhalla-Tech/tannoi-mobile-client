import React, { useState } from 'react';
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  TouchableWithoutFeedback,
  Keyboard,
  KeyboardAvoidingView,
  ScrollView
} from 'react-native';
import { bold, normal } from '../../assets/FontSize';
import { Picker } from '@react-native-community/picker';
// import RNSiriWaveView from 'react-native-siri-wave-view';

//Component
import BackButton from '../../components/PublicComponent/BackButton';
import FormInput from '../../components/PublicComponent/FormInput';

const NewDiscussionScreen = ({ navigation }) => {
  const [discussionTitle, setDiscussionTitle] = useState('');
  const [selectedTopic, setSelectedTopic] = useState('Select topic');
  const [hastags, setHastags] = useState([]);

  return (
    <ScrollView>
      <TouchableWithoutFeedback
        onPress={() => Keyboard.dismiss()}
      >
        <View style={styles.newDiscussionContainerStyle}>
          <View style={styles.newDiscussionUpperBarStyle}>
            <View style={styles.backButtonAndTitleContainerStyle}>
              <BackButton
                navigation={navigation}
                styleOption={{
                  marginTop: 0,
                  marginBottom: 0
                }}
              />
              <Text style={styles.newDiscussionTitleStyle}>New discussion</Text>
            </View>
            <TouchableOpacity>
              <Text style={styles.publishButtonTextStyle}>Publish</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.newDiscussionFormContainerStyle}>
            <FormInput
              formInputTitle="Discussion title"
            />
            <Text style={styles.formInputTitleStyle}>Topic</Text>
            <Picker
              style={styles.topicPickerStyle}
              selectedValue={selectedTopic}
            >
              <Picker.Item label="Select topic" value="Select topic" />
              <Picker.Item label="JavaScript" value="js" />
            </Picker>
            <FormInput
              formInputTitle="Add hastags"
            />
            <View style={styles.newDiscussionRecorderContainerStyle}>
            
            </View>
          </View>
        </View>
      </TouchableWithoutFeedback>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  newDiscussionContainerStyle: {
    flex: 1
  },

  newDiscussionUpperBarStyle: {
    backgroundColor: "#FFFFFF",
    flexDirection: "row",
    paddingLeft: 22,
    paddingRight: 16,
    paddingTop: 30,
    paddingBottom: 10,
    justifyContent: "space-between",
    alignItems: "center"
  },

  backButtonAndTitleContainerStyle: {
    flexDirection: "row",
    alignItems: "center"
  },

  newDiscussionTitleStyle: {
    fontFamily: bold,
    fontSize: 20,
    color: "#464D60",
    marginLeft: 14
  },

  publishButtonTextStyle: {
    color: "#0E4EF4",
    fontSize: 16,
    fontFamily: bold
  },

  newDiscussionFormContainerStyle: {
    backgroundColor: "#FFFFFF",
    margin: 8,
    borderRadius: 8,
    paddingHorizontal: 16,
    paddingTop: 4
  },

  formInputTitleStyle: {
    color: "#73798C",
    fontFamily: normal,
    fontSize: 14,
    marginBottom: 12
  },

  topicPickerStyle: {
    height: 47,
    borderBottomColor: "#E3E6EB",
    fontSize: 16,
    marginBottom: 24,
    fontFamily: normal,
    color: "#73798C"
  },

  newDiscussionRecorderContainerStyle: {
    marginTop: "65%"
  }
});

export default NewDiscussionScreen;