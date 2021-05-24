import React, { useState } from 'react';
import { View, Text, FlatList } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import {
  joinCommunity,
  leaveCommunity,
  openJoinCommunityModal,
  searchCommunity,
} from '../../../store/actions/RegisterAction';
import { Button, FormInput } from '../../elements';
import styles from './styles';

const CommunitiesToJoin = (props) => {
  const { onSubmit, onSkip } = props;
  const [joinedCommunity, setJoinedCommunity] = useState([]);
  const [communityCode, setCommunityCode] = useState('');

  const { communities } = useSelector((state) => state.RegisterReducer);

  const dispatch = useDispatch();

  const addJoinedCommunity = async (communityId) => {
    let joinCommunityRequest = await dispatch(joinCommunity(communityId));

    if (joinCommunityRequest.status) {
      setJoinedCommunity((prevState) => [...prevState, communityId]);
    } else {
      console.log(joinCommunityRequest.msg);
    }
  };

  const removeJoinedCommunity = async (communityId) => {
    let leaveCommunityRequest = await dispatch(leaveCommunity(communityId));

    if (leaveCommunityRequest.status) {
      if (joinedCommunity.length > 1) {
        setJoinedCommunity(
          joinedCommunity.filter((index) => index !== communityId),
        );
      } else {
        setJoinedCommunity([]);
      }
    } else {
      console.log(leaveCommunityRequest.msg);
    }
  };

  const isJoining = (communityId) => {
    let checkJoinedCommunity = joinedCommunity.indexOf(communityId);
    if (checkJoinedCommunity !== -1) return true;
    else return false;
  };

  const RenderCommunity = (data) => (
    <View style={styles.communityContainerStyle}>
      <View style={styles.communityProfileDataContainerStyle}>
        <Text style={styles.communityNameTextStyle}>{data.item.name}</Text>
        <Text style={styles.communityBioTextStyle}>{data.item.name}</Text>
      </View>
      <Button
        name={isJoining(data.item.id) ? 'Joined' : 'Join'}
        customStyle={{
          ...styles.joinButtonStyle,
          borderColor: isJoining(data.item.id) ? null : '#7817FF',
          color: isJoining(data.item.id) ? '#FFFFFF' : '#7817FF',
          borderWidth: isJoining(data.item.id) ? 0 : 1,
          backgroundColor: isJoining(data.item.id) ? '#7817FF' : null,
        }}
        onPress={() =>
          isJoining(data.item.id)
            ? removeJoinedCommunity(data.item.id)
            : addJoinedCommunity(data.item.id)
        }
      />
    </View>
  );

  return (
    <View style={styles.rootStyle}>
      <Text style={styles.titleTextStyle}>Communities to join</Text>
      <View style={styles.formContainerStyle}>
        <FlatList
          data={communities}
          renderItem={RenderCommunity}
          keyExtractor={(item, index) => index.toString()}
        />
      </View>
      <View>
        <View style={styles.enterCodeContainerStyle}>
          <FormInput
            customRootStyle={styles.formInputCustomRootStyle}
            customStyle={styles.formInputCustomStyle}
            placeholder="Enter code"
            onChangeText={(value) => setCommunityCode(value)}
          />
          <Button
            name="Join"
            customStyle={styles.enterCodeJoinButtonStyle}
            onPress={async () => {
              await dispatch(searchCommunity(communityCode));
              dispatch(openJoinCommunityModal(true));
            }}
          />
        </View>
        <Button
          name="Next"
          customStyle={styles.nextButtonStyle}
          onPress={() => onSubmit()}
        />
        <Button
          name="Skip"
          customStyle={styles.skipButtonStyle}
          onPress={() => onSkip()}
        />
      </View>
    </View>
  );
};

export default CommunitiesToJoin;
