import React, { Component } from 'react';
import { StyleSheet, View, Text, Image, TouchableOpacity } from 'react-native';
import { bold, normal } from '../../../assets/FontSize';
import { CalculateHeight, CalculateWidth } from '../../../helper/CalculateSize';
import AsyncStorage from '@react-native-community/async-storage';
import { connect } from 'react-redux';
import { getHome, clearHome } from '../../../store/actions/HomeAction';
import { getDiscussion } from '../../../store/actions/DiscussionAction';
import {
  getResponse,
  getSingleResponse,
  clearResponse,
  editResponse,
  getResponseData,
} from '../../../store/actions/ResponseAction';
import axios from '../../../constants/ApiServices';
import BaseUrl from '../../../constants/BaseUrl';

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
      openAddResponse: false,
    };
  }

  componentDidMount() {
    this._isMounted = true;
    this.state.cardIndex !== 'discussion' &&
      this.props.getResponseData(this.props.responseId);
    this._unsubscribe = this.props.navigation.addListener('focus', () => {
      this.state.cardIndex !== 'discussion' &&
        this.props.getResponseData(this.props.responseId);
    });

    this.props.clearResponse(true);

    this.progressInterval = null;
  }

  componentWillUnmount() {
    this._isMounted = false;

    this._unsubscribe();
  }

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
        }
      }
    } catch (error) {
      console.log(error.response.data.msg);
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
          this.props.getResponseData(this.props.responseId);
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
          this.props.getResponseData(this.props.responseId);
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
                this.props.navigation.push('UserProfileScreen', {
                  userId: this.props.profileId,
                })
              }>
              <Image
                source={{ uri: this.state.profilePicture }}
                style={styles.profileImageStyle}
              />
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() =>
                this.props.navigation.push('UserProfileScreen', {
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
              responseTitle={this.props.caption}
              changePlayer={this.props.changePlayer}
              cardIndex={this.props.cardIndex}
              deleteResponseFromResponseScreen={
                this.props.deleteResponseFromResponseScreen
              }
              responseScreenId={this.props.responseScreenId}
              role={this.props.role}
              cardOnDelete={this.props.cardOnDelete}
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
            {this.props.likeForResponse}
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
                this.setState({ openAddResponse: true }));
          }}>
          <Text style={styles.addResponseButtonTextStyle}>Add response</Text>
        </TouchableOpacity>
      </View>
    );
  };

  render() {
    return (
      <View
        style={
          this.state.cardType === 'discussion'
            ? styles.discussionPlayerContainerStyle
            : styles.responsePlayerContainerStyle
        }>
        <this.ProfileAndPostTime />
        {this.props.caption !== '' && (
          <Text style={styles.captionStyle}>{this.props.caption}</Text>
        )}
        <RecordPlayer
          customStyle={{
            marginTop: '7%',
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
          cardIndex={this.props.cardIndex}
          navigation={this.props.navigation}
        />
        {this.props.cardIndex !== 'discussion' &&
          this.props.cardIndex !== 'response' &&
          this.props.topResponsePreview.length > 0 && (
            <TopResponsePreview
              navigation={this.props.navigation}
              topResponseData={this.props.topResponsePreview}
              discussionId={this.props.discussionId}
              customStyle={{
                marginTop: '6%',
              }}
              responseCount={this.props.responseCountForResponse}
              responseId={this.props.responseId}
            />
          )}
        {this.state.cardType === 'response' && <this.VoteAndResponse />}
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
          openModalFromHeader={false}
          dataForUpdate={this.props.response}
          scrollDown={this.props.scrollDownForResponseScreen}
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
    topResponsePreview: state.ResponseReducer.topResponsePreview,
    response: state.ResponseReducer.response,
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
    getResponseData,
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
    padding: '3.5%',
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
    height: CalculateWidth(6),
    width: CalculateWidth(6),
    marginRight: '6.5%',
  },

  profileNameStyle: {
    fontSize: CalculateHeight(1.8),
    color: '#464D60',
    fontFamily: bold,
  },

  tickIconStyle: {
    height: CalculateWidth(3.5),
    width: CalculateWidth(3.5),
    marginLeft: '2%',
  },

  postTimeStyle: {
    color: '#73798C',
    fontSize: CalculateHeight(1.5),
    fontFamily: normal,
  },

  optionButtonContainerStyle: {
    alignItems: 'flex-end',
  },

  responseCardMenuStyle: {
    marginTop: '2%',
    alignItems: 'flex-end',
    height: CalculateHeight(2.5),
    width: '10%',
  },

  captionStyle: {
    fontSize: CalculateHeight(2),
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
    marginTop: '10%',
    borderTopWidth: 1,
    borderTopColor: '#F5F7F9',
    paddingTop: '2.5%',
  },

  voteContainerStyle: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '28%',
    justifyContent: 'space-between',
  },

  voteNumberStyle: {
    marginVertical: '10%',
    fontFamily: normal,
    fontSize: CalculateHeight(1.8),
    color: '#73798C',
  },

  addResponseButtonStyle: {
    color: '#0E4EF4',
    fontSize: CalculateHeight(2),
  },

  addResponseButtonTextStyle: {
    color: '#0E4EF4',
    fontSize: CalculateHeight(2),
    fontFamily: bold,
  },
});

export default connect(
  mapStateToProps,
  dispatchUpdate(),
)(DiscussionScreenPlayerCard);
