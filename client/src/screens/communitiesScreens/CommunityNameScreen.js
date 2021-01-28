import React, {useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TouchableWithoutFeedback,
  Keyboard,
  Image,
} from 'react-native';
import {CalculateWidth, CalculateHeight} from '../../helper/CalculateSize';
import {useDispatch, useSelector} from 'react-redux';
import {addName} from '../../store/actions/CreateCommunityAction';
import {LinearTextGradient} from 'react-native-text-gradient';
import {normal} from '../../assets/FontSize';

//Icon
import NoProfileIcon from '../../assets/communitiesAssets/img-no-profile-pic.svg';

//Components
import CreateCommunityHeader from '../../components/communityComponent/CreateCommunityHeader';
import CreateCommunityInput from '../../components/communityComponent/CreateCommunityInput';
import CreateCommunityProgress from '../../components/communityComponent/CreateCommunityProgress';
import Button from '../../components/publicComponents/Button';
import {UploadImage} from '../../helper/UploadImage';

const CommunityNameScreen = ({navigation}) => {
  const [communityName, setCommunityName] = useState('');
  const [communityProfileImage, setCommunityProfileImage] = useState('');
  const [textDisplay, setTextDisplay] = useState('');
  const [editMode, setEditMode] = useState(true);

  const dispatch = useDispatch();

  const inputCommunityName = (value) => {
    setCommunityName(value);
  };

  const onBlur = () => {
    setEditMode(false);
    setTextDisplay(communityName);
  };

  return (
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
      <View style={{flex: 1}}>
        <CreateCommunityHeader
          isCancelButton={false}
          isCloseButton={true}
          navigation={navigation}
        />
        <View style={styles.communityNameContainerStyle}>
          <View>
            <TouchableOpacity
              onPress={() =>
                UploadImage((value) => {
                  setCommunityProfileImage(value);
                })
              }
              style={styles.communityProfilePictureButtonStyle}>
              {communityProfileImage !== '' ? (
                <Image
                  source={{uri: communityProfileImage}}
                  style={styles.communityProfileImageStyle}
                />
              ) : (
                <NoProfileIcon />
              )}
            </TouchableOpacity>
            {textDisplay !== '' && !editMode ? (
              <TouchableOpacity style={styles.textDisplayButtonStyle} onPress={() => setEditMode(true)}>
                <LinearTextGradient
                  style={{fontFamily: normal, fontSize: CalculateHeight(3.5)}}
                  locations={[0, 1]}
                  colors={['#5051DB', '#7E37B6']}
                  start={{x: 0, y: 0}}
                  end={{x: 1, y: 0}}>
                  <Text>{textDisplay}</Text>
                </LinearTextGradient>
              </TouchableOpacity>
            ) : (
              <CreateCommunityInput
                placeholder="Community Name"
                inputFunction={inputCommunityName}
                onBlur={onBlur}
                value={communityName}
                autoFocus={editMode && textDisplay !== ''}
              />
            )}
            <Text style={styles.instructionTextStyle}>
              eg: Arsenal FC Fans
            </Text>
          </View>
          <View style={styles.footerContainerStyle}>
            <CreateCommunityProgress stepNumber={1} />
            {communityName.trim().length > 0 && (
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
                  dispatch(addName(communityName, communityProfileImage));
                  navigation.navigate('CommunityDescriptionScreen');
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
  communityNameContainerStyle: {
    flex: 1,
    paddingHorizontal: '10%',
    justifyContent: 'space-between',
    paddingBottom: '10%',
  },

  communityProfilePictureButtonStyle: {
    marginTop: '30%',
    marginBottom: '10%',
    width: '25%',
  },

  communityProfileImageStyle: {
    height: CalculateWidth(20),
    width: CalculateWidth(20),
    borderRadius: 50,
  },

  textDisplayButtonStyle: {
    marginLeft: '1%'
  },

  instructionTextStyle: {
    color: '#C9CCD5',
    marginLeft: '2%',
    marginTop: '3%',
  },

  footerContainerStyle: {
    height: '8%',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
    flexDirection: 'row',
  },
});

export default CommunityNameScreen;
