import React, { useEffect } from 'react';
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  FlatList,
  Image
} from 'react-native';
import { getTopic, followTopic, unfollowTopic } from '../../../store/actions/TopicAction';
import { useSelector, useDispatch } from 'react-redux';
import { bold, normal } from '../../../assets/FontSize';

//Icons
import StarIcon from '../../../assets/topicAssets/starIcon.svg';
import InactiveStarIcon from '../../../assets/topicAssets/inactiveStarIcon.svg';

//Component
import Header from '../../../components/publicComponents/Header';
import SearchBar from '../../../components/publicComponents/SearchBar';
import Card from '../../../components/publicComponents/Card';


const TopicIndexScreen = ({ navigation }) => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getTopic());
  }, []);

  const topics = useSelector(state => state.TopicReducer.topics);

  const HeaderContent = () => {
    return (
      <View>
        <View style={styles.headerTitleAndButtonContainerStyle}>
          <Text style={styles.headerTextStyle}>Topics</Text>
          <TouchableOpacity>
            <Text style={styles.editButtonStyle}>Edit</Text>
          </TouchableOpacity>
        </View>
        <SearchBar searchBarIsOpen={false} navigation={navigation} />
      </View>
    );
  };

  const renderTopics = (itemData) => {
    return (
      <TouchableOpacity onPress={() => navigation.navigate('TopicDetailScreen', {
        topicName: itemData.item.name,
        topicId: itemData.item.id
      })} style={styles.topicStyle}>
        <View style={styles.topicDataContainerStyle}>
          <Image source={{uri: itemData.item.image_path}} style={styles.topicIconStyle} />
          <View>
            <Text style={styles.topicNameStyle}>{itemData.item.name}</Text>
            <Text style={styles.discussionCountStyle}>{itemData.item.discussion_count} discussion{itemData.item.discussion_count > 1 ? 's' : null}</Text>
          </View>
        </View>
        <TouchableOpacity onPress={() => itemData.item.isFollowing ? dispatch(unfollowTopic(itemData.item.id)) : dispatch(followTopic(itemData.item.id))}>
          {
            itemData.item.isFollowing ? (
              <StarIcon />
            ) : (
              <InactiveStarIcon />
            )
          } 
        </TouchableOpacity>
      </TouchableOpacity>
    );
  };

  const TopicScreenContent = () => {
    return (
      <View>
        <FlatList
          data={topics}
          keyExtractor={(item, index) => index.toString()}
          renderItem={renderTopics}
        />
      </View>
    );
  };

  return (
    <View>
      <Header child={HeaderContent} customStyle={styles.headerStyle} />
      <Card child={TopicScreenContent} customStyle={styles.cardContainerStyle} />
    </View>
  );
};

const styles = StyleSheet.create({
  headerStyle: {
    paddingHorizontal: "5%",
    paddingTop: "3.5%",
    paddingBottom: "1%"
  },

  headerTextStyle: {
    fontFamily: bold,
    fontSize: 20,
    color: "#464D60"
  },

  editButtonStyle: {
    fontSize: 16,
    fontFamily: bold,
    color: "#0E4EF4"
  },

  headerTitleAndButtonContainerStyle: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: "2%"
  },

  cardContainerStyle: {
    marginHorizontal: "1.8%",
    marginVertical: "2%",
    borderRadius: 8
  },

  topicStyle: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: "5%",
    paddingVertical: "2%",
    borderBottomWidth: 1,
    borderBottomColor: "#F5F7F9"
  },

  topicDataContainerStyle: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between"
  },

  topicIconStyle: {
    width: 35,
    height: 35,
    borderRadius: 50,
    marginRight: "3%"
  },

  topicNameStyle: {
    color: "#464D60",
    fontFamily: normal,
    fontSize: 16,
    marginBottom: -5
  },

  discussionCountStyle: {
    color: "#73798C",
    fontFamily: normal,
    fontSize: 12
  }
});

export default TopicIndexScreen;