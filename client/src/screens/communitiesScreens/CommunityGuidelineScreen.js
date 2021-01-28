import React, {useState} from 'react';
import {
  View,
  Text,
  Switch,
  TouchableWithoutFeedback,
  Keyboard,
  StyleSheet,
} from 'react-native';
import {normal} from '../../assets/FontSize';
import {CalculateHeight} from '../../helper/CalculateSize';
import {useDispatch, useSelector} from 'react-redux';
import {addGuideline} from '../../store/actions/CreateCommunityAction';

//Components
import CreateCommunityHeader from '../../components/communityComponent/CreateCommunityHeader';
import CreateCommunityInput from '../../components/communityComponent/CreateCommunityInput';
import CreateCommunityProgress from '../../components/communityComponent/CreateCommunityProgress';
import Button from '../../components/publicComponents/Button';

const CommunityGuidelineScreen = ({navigation}) => {
  const savedGuideline = useSelector(
    (state) => state.CreateCommunityReducer.communityGuideline,
  );
  const savedType = useSelector(
    (state) => state.CreateCommunityReducer.communityType,
  );
  const [guideline, setGuideline] = useState(
    savedGuideline !== '' ? savedGuideline : '',
  );
  const [privateCommunity, setPrivateCommunity] = useState(
    savedType !== '' ? (savedType === 1 ? false : true) : false,
  );

  const dispatch = useDispatch();

  const inputGuideline = (value) => {
    setGuideline(value);
  };

  const Footer = () => {
    return (
      <View style={styles.footerStyle}>
        <View style={styles.privateOptionContainerStyle}>
          <Text style={styles.privateTextStyle}>Make private</Text>
          <Switch
            value={privateCommunity}
            onValueChange={() => setPrivateCommunity((prevState) => !prevState)}
            trackColor={{true: '#6505E1', false: ''}}
            thumbColor="#6505E1"
          />
        </View>
        <Text style={styles.privateCommuityInstructionTextStyle}>
          When a community is set to private, members of your community can only
          view or join it by invitation.
        </Text>
        <View style={styles.progressContainerStyle}>
          <CreateCommunityProgress stepNumber={3} />
          <Button
            buttonStyle={{
              color: '#FFFFFF',
              backgroundColor: '#5152D0',
              borderWidth: 0,
              width: '25%',
              marginBottom: 0,
              fontSize: 15,
              padding: 0,
              paddingVertical: '1%',
            }}
            buttonTitle="OK"
            buttonFunction={() => {
              dispatch(addGuideline(guideline, privateCommunity ? 2 : 1));
              navigation.navigate('CreateCommunityTopicScreen');
            }}
          />
        </View>
      </View>
    );
  };

  return (
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
      <View style={{flex: 1}}>
        <CreateCommunityHeader navigation={navigation} />
        <View style={{flex: 1}}>
          <View style={styles.communityGuidelineContainerStyle}>
            <View>
              <Text style={styles.guidelineTextStyle}>
                Guidelines of community (optional)
              </Text>
              <CreateCommunityInput
                placeholder="Write guidelines of your community"
                customStyle={{
                  fontSize: CalculateHeight(2),
                }}
                inputFunction={inputGuideline}
                value={guideline}
              />
            </View>
          </View>
          {Footer()}
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  communityGuidelineContainerStyle: {
    flex: 1,
    paddingHorizontal: '10%',
    justifyContent: 'space-between',
  },

  guidelineTextStyle: {
    marginTop: '30%',
    fontFamily: normal,
    fontSize: CalculateHeight(2),
    marginLeft: '.8%',
    marginBottom: '2%',
  },

  footerStyle: {
    borderTopWidth: 1,
    borderTopColor: '#E3E6EB',
    paddingHorizontal: '10%',
    paddingTop: '2%',
  },

  privateOptionContainerStyle: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '1.5%',
  },

  privateTextStyle: {
    fontFamily: normal,
    fontSize: CalculateHeight(2),
    color: '#464D60',
  },

  privateCommuityInstructionTextStyle: {
    color: '#73798C',
    marginBottom: '8%',
  },

  progressContainerStyle: {
    flexDirection: 'row',
    alignItems: 'flex-end',
  },
});

export default CommunityGuidelineScreen;
