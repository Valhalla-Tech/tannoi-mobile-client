import React, { useState } from 'react';
import { View, Text, FlatList } from 'react-native';
import styles from './styles';
import { Button } from '../../elements';

const TopicsToFollowForm = (props) => {
  const { topics, onSkip, onSubmit } = props;
  const [selectedTopics, setSelectedTopics] = useState([]);

  const selectTopic = (topicId) => {
    if (selectedTopics.length < 5) {
      setSelectedTopics((prevState) => [...prevState, topicId]);
    }
  };

  const deselectTopic = (topicId) => {
    if (selectedTopics.length > 1) {
      setSelectedTopics(selectedTopics.filter((index) => index !== topicId));
    } else {
      setSelectedTopics([]);
    }
  };

  const checkSelectedTopic = (topicId) => {
    let checkSelectedTopic = selectedTopics.indexOf(topicId);
    if (checkSelectedTopic !== -1) return true;
    else return false;
  };

  const RenderList = (data) => (
    <Button
      customStyle={{
        ...styles.topicButtonStyle,
        color: checkSelectedTopic(data.item.id) ? '#FFFFFF' : '#73798C',
        borderColor: checkSelectedTopic(data.item.id) ? null : '#73798C',
        backgroundColor: checkSelectedTopic(data.item.id) ? '#7817FF' : null,
        borderWidth: checkSelectedTopic(data.item.id) ? 0 : 1,
      }}
      name={data.item.name}
      onPress={() =>
        checkSelectedTopic(data.item.id)
          ? deselectTopic(data.item.id)
          : selectTopic(data.item.id)
      }
      disabled={
        selectedTopics.length >= 5 && checkSelectedTopic(data.item.id) === false
      }
    />
  );

  return (
    <View style={styles.rootStyle}>
      <View style={styles.upperContainerStyle}>
        <Text style={styles.titleTextStyle}>Topics to Follow</Text>
        <Text style={styles.normalTextStyle}>
          Select 5 topics that interest you to get started
        </Text>
        <FlatList
          data={topics}
          renderItem={RenderList}
          contentContainerStyle={styles.topicContainerStyle}
          keyExtractor={(item, index) => index.toString()}
          numColumns={3}
          columnWrapperStyle={{ flexWrap: 'wrap' }}
        />
      </View>
      <View>
        {selectedTopics.length > 0 && (
          <Button
            name="Next"
            customStyle={styles.nextButtonStyle}
            onPress={() => onSubmit(selectedTopics)}
          />
        )}
        <Button
          name="Skip"
          customStyle={styles.skipButtonStyle}
          onPress={() => onSkip()}
        />
      </View>
    </View>
  );
};

export default TopicsToFollowForm;
