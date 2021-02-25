import React, { useState } from 'react';
import {
  View,
  StyleSheet,
  TouchableWithoutFeedback,
  Keyboard,
  TouchableOpacity,
  Text,
} from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { addDescription } from '../../../store/actions/CreateCommunityAction';
import { LinearTextGradient } from 'react-native-text-gradient';
import { CalculateHeight } from '../../../helper/CalculateSize';
import { normal } from '../../../assets/FontSize';

//Components
import CreateCommunityHeader from '../../../components/communityComponent/CreateCommunityHeader';
import CreateCommunityInput from '../../../components/communityComponent/CreateCommunityInput';
import CreateCommunityProgress from '../../../components/communityComponent/CreateCommunityProgress';
import Button from '../../../components/publicComponents/Button';

const CommunityDescriptionScreen = ({ navigation, route }) => {
  const {
    communityId,
    communityGuidelinesEdit,
    communityTopicsEdit,
    communityDescriptionEdit,
    communityTypeEdit,
  } = route.params;

  const savedDescription = useSelector(
    (state) => state.CreateCommunityReducer.communityDescription,
  );

  const [description, setDescription] = useState(
    communityDescriptionEdit ?
    communityDescriptionEdit :
    savedDescription !== '' ?
    savedDescription :
    '',
  );
  const [textDisplay, setTextDisplay] = useState('');
  const [editMode, setEditMode] = useState(true);

  const dispatch = useDispatch();

  const inputDescription = (value) => {
    setDescription(value);
  };

  const onBlur = () => {
    setEditMode(false);
    setTextDisplay(description);
  };

  return (
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
      <View style={{ flex: 1 }}>
        <CreateCommunityHeader navigation={navigation} />
        <View style={styles.communityDescriptionContainerStyle}>
          {textDisplay !== '' && !editMode ? (
            <TouchableOpacity
              style={styles.textDisplayButtonStyle}
              onPress={() => setEditMode(true)}>
              <LinearTextGradient
                style={{ fontFamily: normal, fontSize: CalculateHeight(3.5) }}
                locations={[0, 1]}
                colors={['#5051DB', '#7E37B6']}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 0 }}>
                <Text>{textDisplay}</Text>
              </LinearTextGradient>
            </TouchableOpacity>
          ) : (
            <CreateCommunityInput
              placeholder="Tell us more about your community"
              customStyle={{
                marginTop: '30%',
              }}
              inputFunction={inputDescription}
              value={description}
              onBlur={onBlur}
              autoFocus={editMode && textDisplay !== ''}
            />
          )}
          <View style={styles.footerContainerStyle}>
            <CreateCommunityProgress stepNumber={2} />
            {description.trim().length > 0 && (
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
                  dispatch(addDescription(description));
                  navigation.navigate('CommunityGuidelineScreen', {
                    communityId,
                    communityGuidelinesEdit,
                    communityTopicsEdit,
                    communityTypeEdit,
                  });
                }}
              />
            )}
          </View>
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  communityDescriptionContainerStyle: {
    flex: 1,
    marginHorizontal: '10%',
    justifyContent: 'space-between',
    paddingBottom: '10%',
  },

  textDisplayButtonStyle: {
    marginLeft: '1%',
    marginTop: '35%',
  },

  footerContainerStyle: {
    height: '8%',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
    flexDirection: 'row',
  },
});

export default CommunityDescriptionScreen;
