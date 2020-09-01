import React from 'react';
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  FlatList
} from 'react-native';

//Profile picture example
import ProfilePictureExample from '../../assets/homeAssets/bigProfilePicture.png';

//Component
import DiscussionOfTheWeekCard from './DiscussionOfTheWeekCard';

const DISCUSSION_OF_THE_WEEK_DATA = [
  {
    id: '1',
    name: 'Bob Brownfoot',
    title: 'Ronaldo & Messi beat McGrogy’s record',
    imageUrl: ProfilePictureExample,
    votes: "234000",
    replies: "150000",
    plays: "449000",
    time: "24"
  },
  {
    id: '2',
    name: 'Monica Hall',
    title: 'Time capsule of 2020',
    imageUrl: ProfilePictureExample,
    votes: "234000",
    replies: "150000",
    plays: "449000",
    time: "24"
  },
  {
    id: '3',
    name: 'Bertram Gilfoyle',
    title: 'How did you pick and get your job done?',
    imageUrl: ProfilePictureExample,
    votes: "234000",
    replies: "150000",
    plays: "449000",
    time: "24"
  }
];


const DiscussionOfTheWeek = () => {

  return (
    <View style={styles.discussionOfTheWeekContainerStyle}>
      <Text style={styles.discussionOfTheWeekTitleStyle}>Discussion of the week</Text>
      <FlatList
        contentContainerStyle={styles.discussionOfTheWeekCardContainerStyle}
        data={DISCUSSION_OF_THE_WEEK_DATA}
        renderItem={itemData => (
          <DiscussionOfTheWeekCard
            imageUrl={itemData.item.imageUrl}
            name={itemData.item.name}
            title={itemData.item.title}
            votes={itemData.item.votes}
            replies={itemData.item.replies}
            plays={itemData.item.plays}
            time={itemData.item.time}
          />
        )}
      />
      <View style={{flex: 1, alignItems: "center"}}>
        <TouchableOpacity style={styles.moreButton}>
          <Text style={styles.moreButtonTextStyle}>More</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  discussionOfTheWeekContainerStyle: {
    backgroundColor: "#FFFFFF",
    marginTop: 8,
    marginHorizontal: 8,
    marginBottom: 38,
    borderRadius: 8,
    paddingBottom: "6.5%"
  },

  discussionOfTheWeekTitleStyle: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#464D60",
    marginVertical: "4%",
    marginLeft: "5%"
  },

  moreButton: {
    position: "absolute", 
    borderWidth: 1.5, 
    borderColor: "#5152D0", 
    paddingHorizontal: 20, 
    paddingVertical: 4, 
    borderRadius: 25, 
    top: 10, 
    backgroundColor: "#FFFFFF"
  },

  moreButtonTextStyle: {
    color: "#5152D0", 
    fontSize: 14
  }
});

export default DiscussionOfTheWeek;