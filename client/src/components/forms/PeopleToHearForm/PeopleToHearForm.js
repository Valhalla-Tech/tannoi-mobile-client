import React, { useState } from 'react';
import { View, Text, FlatList, Image } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import {
  followPeople,
  unFollowPeople,
} from '../../../store/actions/RegisterAction';
import { Button } from '../../elements';
import { trackWithMixPanel } from '../../../helper/Mixpanel';
import styles from './styles';

const PeopleToHearForm = (props) => {
  const { onSubmit, onSkip, userData } = props;

  const [followedPeople, setFollowedPeople] = useState([]);

  const { people } = useSelector((state) => state.RegisterReducer);

  const dispatch = useDispatch();

  const truncate = (bio) => {
    if (bio.length > 25) {
      return `${bio.substring(0, 26)}...`;
    } else {
      return bio;
    }
  };

  const isFollowing = (userId) => {
    let checkFollowedPeople = followedPeople.indexOf(userId);
    if (checkFollowedPeople !== -1) return true;
    else return false;
  };

  const addFollowedPeople = async (userId) => {
    let followPeopleRequest = await dispatch(followPeople(userId));
    if (followPeopleRequest.status) {
      trackWithMixPanel('User: Registration - Followed Another User', {
        distinct_id: userData.id,
        followed_user_id: userId,
      });
      setFollowedPeople((prevState) => [...prevState, userId]);
    } else {
      console.log(followPeopleRequest.msg);
    }
  };

  const removeFollowedPeople = async (userId) => {
    let unFollowPeopleRequest = await dispatch(unFollowPeople(userId));

    if (unFollowPeopleRequest.status) {
      trackWithMixPanel('User: Registration - Unfollowed Another User', {
        distinct_id: userData.id,
        unfollowed_user_id: userId,
      });
      if (followedPeople.length > 1) {
        setFollowedPeople(followedPeople.filter((index) => index !== userId));
      } else {
        setFollowedPeople([]);
      }
    } else {
      console.log(unFollowPeopleRequest.msg);
    }
  };

  const RenderProfile = (data) => (
    <View style={styles.profileContainerStyle}>
      <View style={styles.profileHeaderStyle}>
        <Image
          source={{ uri: data.item.profile_photo_path }}
          style={styles.profilePhotoStyle}
        />
        <Button
          name={isFollowing(data.item.id) ? 'Unfollow' : 'Follow'}
          customStyle={{
            ...styles.followButtonStyle,
            borderColor: isFollowing(data.item.id) ? null : '#7817FF',
            color: isFollowing(data.item.id) ? '#FFFFFF' : '#7817FF',
            borderWidth: isFollowing(data.item.id) ? 0 : 1,
            backgroundColor: isFollowing(data.item.id) ? '#7817FF' : null,
          }}
          onPress={() =>
            isFollowing(data.item.id)
              ? removeFollowedPeople(data.item.id)
              : addFollowedPeople(data.item.id)
          }
        />
      </View>
      <Text style={styles.boldTextStyle}>{data.item.name}</Text>
      <Text style={styles.normalTextStyle}>{truncate(data.item.bio)}</Text>
    </View>
  );

  return (
    <View style={styles.rootStyle}>
      <View style={styles.formContainerStyle}>
        <Text style={styles.titleTextStyle}>People to hear</Text>
        <FlatList
          data={people}
          renderItem={RenderProfile}
          numColumns={2}
          columnWrapperStyle={styles.columnWrapperStyle}
        />
      </View>
      <View>
        {followedPeople.length >= 1 && (
          <Button
            customStyle={styles.nextButtonStyle}
            name="Next"
            onPress={() => onSubmit()}
          />
        )}
        <Button
          customStyle={styles.skipButtonStyle}
          name="Skip"
          onPress={() => onSkip()}
        />
      </View>
    </View>
  );
};

export default PeopleToHearForm;
