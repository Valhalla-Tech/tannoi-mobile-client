import React, {Component} from 'react';
import {StyleSheet, View, Text, Image, TouchableOpacity} from 'react-native';
import {bold, normal} from '../../../assets/FontSize';
import AsyncStorage from '@react-native-community/async-storage';
import {connect} from 'react-redux';
import {getHome, clearHome} from '../../../store/actions/HomeAction';
import {getDiscussion} from '../../../store/actions/DiscussionAction';
import {
  getResponse,
  getSingleResponse,
  clearResponse,
  editResponse,
} from '../../../store/actions/ResponseAction';
import axios from '../../../constants/ApiServices';
import BaseUrl from '../../../constants/BaseUrl';
import {GenerateDeepLink} from '../../../helper/GenerateDeepLink';

//Icons
import Upvote from '../../../assets/topicAssets/upvote.svg';
import Downvote from '../../../assets/topicAssets/downvote.svg';
import ActiveUpvote from '../../../assets/topicAssets/activeUpvote.svg';
import ActiveDownvote from '../../../assets/topicAssets/activeDownvote.svg';
import TickIcon from '../../../assets/publicAssets/tickIcon.png';

//Components
import AddResponse from '../../publicComponents/RecorderModal';
import OptionButton from './OptionButton';
import RecordPlayer from '../../publicComponents/RecordPlayer';
import TopResponsePreview from './TopResponsePreview';

class DiscussionScreenPlayerCard extends Component {
  _isMounted = false;

  constructor(props) {
    super(props);

    this.state = {
      playPauseButton: 'Play',
      discussionId: this.props.discussionId,
      playButtonDisabled: true,
      profilePicture: this.props.profilePicture,
      cardType: this.props.cardType,
      recordingFile: this.props.recordingFile,
      profilePicture: this.props.profilePicture,
      profileName: this.props.profileName,
      postTime: this.props.postTime,
      responseId: this.props.responseId,
      like: '',
      nextPlayerAvailable: this.props.nextPlayerAvailable,
      changePlayer: this.props.changePlayer,
      cardIndex: this.props.cardIndex,
      cardLength: this.props.cardLength,
      stopPlayer: this.props.stopPlayer,
      fromNextPreviousButton: this.props.fromNextPreviousButton,
      updateFromNextPreviousButton: this.props.updateFromNextPreviousButton,
      openAddResponseModal: false,
      isChainResponse: this.props.isChainResponse,
      getIsLikeAndIsDislike: this.props.getIsLikeAndIsDislike,
      isPaused: false,
      caption: this.props.caption,
      openAddResponse: false,
    };
  }

  componentDidMount() {
    this._isMounted = true;
    this.state.cardIndex !== 'discussion' &&
      this.props.getSingleResponse(this.state.responseId, 'getDataForResponse');
    this._unsubscribe = this.props.navigation.addListener('focus', () => {
      this.state.cardIndex !== 'discussion' &&
        this.props.getSingleResponse(
          this.state.responseId,
          'getDataForResponse',
        );
    });

    this.props.clearResponse(true);

    this.progressInterval = null;
  }

  componentWillUnmount() {
    this._isMounted = false;

    this._unsubscribe();
  }

  numberConverter = (number) => {
    let numberToString = number.toString();

    if (numberToString.length > 3 && numberToString.length <= 6) {
      return `${numberToString.substring(0, numberToString.length - 3)}k`;
    } else if (numberToString.length > 6 && numberToString.length <= 9) {
      return `${numberToString.substring(0, numberToString.length - 6)}m`;
    } else if (numberToString.length > 9) {
      return `${numberToString.substring(0, numberToString.length - 9)}b`;
    } else {
      return numberToString;
    }
  };

  playCounter = async (playResponse) => {
    try {
      const access_token = await AsyncStorage.getItem('access_token');

      if (playResponse) {
        let responsePlayCounterRequest = await axios({
          method: 'get',
          url: `${BaseUrl}/responses/views/${this.state.responseId}`,
          headers: {
            token: access_token,
          },
        });

        if (responsePlayCounterRequest.data) {
          if (this.props.responseScreenResponseId) {
            // this.props.getSingleResponse(this.props.responseScreenResponseId);
          } else if (this.state.responseId) {
            // this.props.getSingleResponse(this.state.responseId);
            // this.props.getResponse(this.state.discussionId);
          }
        }
      } else {
        let playCounterRequest = await axios({
          method: 'get',
          url: `${BaseUrl}/discussions/views/${this.state.discussionId}`,
          headers: {
            token: access_token,
          },
        });

        if (playCounterRequest.data) {
          // this.props.getDiscussion(this.state.discussionId);
        }
      }
    } catch (error) {
      console.log(error.response);
    }
  };

  upvote = async () => {
    try {
      if (this.props.userType !== 0) {
        const access_token = await AsyncStorage.getItem('access_token');

        let upvoteRequest = await axios({
          method: 'get',
          url: `${BaseUrl}/responses/like/${this.state.responseId}`,
          headers: {
            token: access_token,
          },
        });

        if (upvoteRequest.data) {
          this.props.getSingleResponse(
            this.state.responseId,
            'getDataForResponse',
          );
        }
      } else {
        this.props.navigation.navigate('VerificationNavigation');
      }
    } catch (error) {
      console.log(error.response);
    }
  };

  downvote = async () => {
    try {
      if (this.props.userType !== 0) {
        const access_token = await AsyncStorage.getItem('access_token');

        let downvoteRequest = await axios({
          method: 'get',
          url: `${BaseUrl}/responses/dislike/${this.state.responseId}`,
          headers: {
            token: access_token,
          },
        });

        if (downvoteRequest.data) {
          this.props.getSingleResponse(
            this.state.responseId,
            'getDataForResponse',
          );
        }
      } else {
        this.props.navigation.navigate('VerificationNavigation');
      }
    } catch (error) {
      console.log(error);
    }
  };

  closeAddResponseModal = () => {
    this.setState({
      openAddResponseModal: false,
      openAddResponse: false,
    });
  };

  ProfileAndPostTime = () => {
    return (
      <View>
        <View style={styles.profileAndPostTimeContainerStyle}>
          <View style={styles.profileInfoContainerStyle}>
            <TouchableOpacity
              onPress={() =>
                this.props.navigation.navigate('UserProfileScreen', {
                  userId: this.props.profileId,
                })
              }>
              <Image
                source={{uri: this.state.profilePicture}}
                style={styles.profileImageStyle}
              />
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() =>
                this.props.navigation.navigate('UserProfileScreen', {
                  userId: this.props.profileId,
                })
              }>
              <Text style={styles.profileNameStyle}>
                {this.state.profileName}
              </Text>
            </TouchableOpacity>
            {this.props.profileType === 1 && (
              <Image source={TickIcon} style={styles.tickIconStyle} />
            )}
          </View>
          <Text style={styles.postTimeStyle}>
            {this.state.postTime ? this.state.postTime : ''}
          </Text>
        </View>
        <View style={styles.optionButtonContainerStyle}>
          {this.state.cardIndex !== 'discussion' && (
            <OptionButton
              customStyle={styles.responseCardMenuStyle}
              navigation={this.props.navigation}
              profileId={this.props.profileId}
              modalType="response"
              responseId={this.state.responseId}
              discussionId={this.state.discussionId}
              responseTitle={this.state.caption}
              changePlayer={this.props.changePlayer}
              cardIndex={this.props.cardIndex}
            />
          )}
        </View>
      </View>
    );
  };

  VoteAndResponse = () => {
    return (
      <View style={styles.voteAndAddResponseContainerStyle}>
        <View style={styles.voteContainerStyle}>
          <TouchableOpacity onPress={() => this.upvote()}>
            {this.props.isLikeForResponse ? <ActiveUpvote /> : <Upvote />}
          </TouchableOpacity>
          <Text style={styles.voteNumberStyle}>
            {this.numberConverter(this.props.likeForResponse)}
          </Text>
          <TouchableOpacity onPress={() => this.downvote()}>
            {this.props.isDislikeForResponse ? (
              <ActiveDownvote />
            ) : (
              <Downvote />
            )}
          </TouchableOpacity>
        </View>
        <TouchableOpacity
          style={styles.addResponseButtonStyle}
          onPress={() => {
            this.props.userData.type !== 0 ||
            this.props.userData.id === this.props.profileId
              ? this.setState({
                  openAddResponseModal: true,
                  openAddResponse: true,
                })
              : (this.props.navigation.navigate('VerificationNavigation'),
                this.setState({openAddResponse: true}));
          }}>
          <Text style={styles.addResponseButtonTextStyle}>Add response</Text>
        </TouchableOpacity>
      </View>
    );
  };

  // ReplyButton = () => {
  //   return (
  //     <View style={styles.showReplyButtonContainerStyle}>
  //       <TouchableOpacity
  //         onPress={() => this.props.navigation.push('ResponseScreen', {
  //           responseId: this.state.responseId,
  //           discussionId: this.state.discussionId
  //         })}
  //       >
  //       <Text style={styles.showReplyButtonTextStyle}>{this.props.responseCountForResponse} Rep{this.props.responseCountForResponse > 1 ? 'lies' : 'ly'}</Text>
  //       </TouchableOpacity>
  //     </View>
  //   );
  // };

  render() {
    return (
      <View
        style={
          this.state.cardType === 'discussion'
            ? styles.discussionPlayerContainerStyle
            : styles.responsePlayerContainerStyle
        }>
        <this.ProfileAndPostTime />
        {this.state.caption && (
          <Text style={styles.captionStyle}>{this.state.caption}</Text>
        )}
        <RecordPlayer
          customStyle={{
            marginTop: '10%',
          }}
          recordingFile={this.state.recordingFile}
          isNextPlayerAvailable={
            this.state.nextPlayerAvailable &&
            this.state.cardIndex !== this.state.cardLength - 1
              ? true
              : false
          }
          isPreviousPlayerAvailable={
            this.state.cardType !== 'discussion' &&
            this.state.cardIndex !== 'response'
              ? true
              : false
          }
          nextPlayerFunction={() => {
            this.props.changePlayer(this.state.cardIndex, 'next');
          }}
          previousPlayerFunction={() => {
            this.props.changePlayer(this.state.cardIndex, 'previous');
          }}
          fromNextPreviousButton={this.props.fromNextPreviousButton}
          updateFromNextPreviousButton={this.props.updateFromNextPreviousButton}
          isRecorderModalOpen={this.props.isRecorderModalOpen}
          openAddResponse={this.state.openAddResponse}
          playCounter={() =>
            this.playCounter(this.state.responseId ? true : false)
          }
        />
        {this.props.topResponse && this.props.topResponse.length > 0 && (
          <TopResponsePreview
            navigation={this.props.navigation}
            topResponseData={this.props.topResponse}
            discussionId={this.props.discussionId}
            customStyle={{
              marginTop: '6%',
            }}
            responseCount={this.props.responseCount}
            responseId={this.props.responseId}
          />
        )}
        {this.state.cardType === 'response' && <this.VoteAndResponse />}
        {/* {
          this.props.responseCountForResponse >= 1 && this.state.cardIndex !== 'response' && this.state.cardType !== 'discussion' && (
            <this.ReplyButton />
          )
        } */}
        <AddResponse
          openModal={this.state.openAddResponseModal}
          closeModal={this.closeAddResponseModal}
          discussionId={this.state.discussionId}
          addResponseForResponse={true}
          responseId={this.state.responseId}
          addResponseForResponseInResponseScreen={
            this.state.cardIndex !== 'response' ? true : false
          }
          responseScreenResponseId={this.props.responseScreenResponseId}
        />
      </View>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    likeForResponse: state.ResponseReducer.likeForResponse,
    isLikeForResponse: state.ResponseReducer.isLikeForResponse,
    isDislikeForResponse: state.ResponseReducer.isDislikeForResponse,
    responseCountForResponse: state.ResponseReducer.responseCountForResponse,
    userData: state.HomeReducer.user,
  };
};

const dispatchUpdate = () => {
  return {
    getHome,
    clearHome,
    getDiscussion,
    getResponse,
    getSingleResponse,
    clearResponse,
    editResponse,
  };
};

const styles = StyleSheet.create({
  discussionPlayerContainerStyle: {
    backgroundColor: '#FFFFFF',
    paddingHorizontal: '3.5%',
    paddingVertical: '6%',
    borderBottomRightRadius: 8,
    borderBottomLeftRadius: 8,
  },

  responsePlayerContainerStyle: {
    backgroundColor: '#FFFFFF',
    padding: '4%',
    marginHorizontal: '2%',
    marginBottom: '2%',
    borderRadius: 8,
  },

  profileAndPostTimeContainerStyle: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },

  profileInfoContainerStyle: {
    flexDirection: 'row',
    alignItems: 'center',
  },

  profileImageStyle: {
    borderRadius: 50,
    height: 24,
    width: 24,
    marginRight: 12,
  },

  profileNameStyle: {
    fontSize: 14,
    color: '#464D60',
    fontFamily: bold,
  },

  tickIconStyle: {
    height: 15,
    width: 15,
    marginLeft: '2%',
  },

  postTimeStyle: {
    color: '#73798C',
    fontSize: 12,
    fontFamily: normal,
  },

  optionButtonContainerStyle: {
    alignItems: 'flex-end',
  },

  responseCardMenuStyle: {
    marginTop: '2%',
    alignItems: 'flex-end',
    height: 15,
    width: '10%',
  },

  captionStyle: {
    marginTop: '3%',
    fontSize: 15,
    fontFamily: normal,
  },

  playerContainerStyle: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: '7%',
  },

  voteAndAddResponseContainerStyle: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 24,
    borderTopWidth: 1,
    borderTopColor: '#F5F7F9',
    paddingTop: 12,
  },

  voteContainerStyle: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '28%',
    justifyContent: 'space-between',
  },

  voteNumberStyle: {
    marginVertical: 6,
    fontFamily: normal,
    fontSize: 14,
    color: '#73798C',
  },

  addResponseButtonStyle: {
    color: '#0E4EF4',
    fontSize: 16,
  },

  addResponseButtonTextStyle: {
    color: '#0E4EF4',
    fontSize: 16,
    fontFamily: bold,
  },

  showReplyButtonContainerStyle: {
    alignItems: 'center',
    marginTop: '5%',
    borderTopWidth: 1,
    borderTopColor: '#F5F7F9',
    paddingTop: '5%',
  },

  showReplyButtonTextStyle: {
    fontSize: 15,
    color: '#0E4EF4',
    fontFamily: bold,
  },
});

export default connect(
  mapStateToProps,
  dispatchUpdate(),
)(DiscussionScreenPlayerCard);
