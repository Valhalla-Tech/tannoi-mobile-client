import React, {useState} from 'react';
import {
  View,
  StyleSheet,
  TouchableWithoutFeedback,
  Keyboard
} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {addDescription} from '../../store/actions/CreateCommunityAction';

//Components
import CreateCommunityHeader from '../../components/communityComponent/CreateCommunityHeader';
import CreateCommunityInput from '../../components/communityComponent/CreateCommunityInput';
import CreateCommunityProgress from '../../components/communityComponent/CreateCommunityProgress';
import Button from '../../components/publicComponents/Button';

const CommunityDescriptionScreen = ({navigation}) => {
  const savedDescription = useSelector(state => state.CreateCommunityReducer.communityDescription);

  const [description, setDescription] = useState(savedDescription !== '' ? savedDescription : '');
  
  const dispatch = useDispatch();

  const inputDescription = (value) => {
    setDescription(value);
  };

  return (
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
      <View style={{flex: 1}}>
        <CreateCommunityHeader navigation={navigation} />
        <View style={styles.communityDescriptionContainerStyle}>
          <CreateCommunityInput
            placeholder='Tell us about your community'
            customStyle={{
              marginTop: '30%'
            }}
            inputFunction={inputDescription}
            value={description}
          />
          <View style={styles.footerContainerStyle}>
              <CreateCommunityProgress stepNumber={2} />
              {description.length > 0 && (
                <Button
                  buttonStyle={{
                    color: '#FFFFFF',
                    backgroundColor: '#5152D0',
                    borderWidth: 0,
                    width: '25%',
                    marginBottom: 0,
                    fontSize: 15,
                    padding: 0,
                    paddingVertical: '1%'
                  }}
                  buttonTitle="OK"
                  buttonFunction={() => {
                    dispatch(addDescription(description));
                    navigation.navigate('CommunityGuidelineScreen');
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

  footerContainerStyle: {
    height: '8%',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
    flexDirection: 'row',
  },
});

export default CommunityDescriptionScreen;
