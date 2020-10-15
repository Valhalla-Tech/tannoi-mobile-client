import React, { Component } from 'react';
import {
  StyleSheet,
  View,
  Text,
  Image,
  TouchableOpacity,
  PixelRatio
} from 'react-native';
import { bold, normal } from '../../../assets/FontSize';
import {
  Player
} from '@react-native-community/audio-toolkit';
import AsyncStorage from '@react-native-community/async-storage';
import Slider from '@react-native-community/slider';
import axios from 'axios';

//Icons
import PlayerSpeed from '../../../assets/topicAssets/playerSpeed.svg';
import PreviousButton from '../../../assets/topicAssets/notActivePreviousButton.svg';
import NextButton from '../../../assets/topicAssets/notActiveNextButton.svg';
import ActivePlayButton from '../../../assets/topicAssets/activePlayButton.svg';
import PauseButton from '../../../assets/topicAssets/pauseButton.svg';
import ForwardTenButton from '../../../assets/topicAssets/forwardTenButton.svg';
import Upvote from '../../../assets/topicAssets/upvote.svg';
import Downvote from '../../../assets/topicAssets/downvote.svg';
import ActiveNextButton from '../../../assets/topicAssets/activeNextButton.svg';
import ActivePreviousButton from '../../../assets/topicAssets/activePreviousButton.svg';
import ActiveUpvote from '../../../assets/topicAssets/activeUpvote.svg';
import ActiveDownvote from '../../../assets/topicAssets/activeDownvote.svg';

//Component
import AddResponse from '../../../components/topicComponents/discussionScreenComponents/AddResponse';

const getFontSize = (originalSize) => {
  if(PixelRatio.get() < 1.5) {
      return (originalSize * 0.5 ) / PixelRatio.get() 
  }else if(PixelRatio.get() >= 1.5 && PixelRatio.get() < 2.5) {
      return (originalSize * 1.5 ) / PixelRatio.get() 
  }else if(PixelRatio.get() >= 2.5){
      return (originalSize * 2.5 ) / PixelRatio.get() 
  }else{
      return originalSize
  }
}

class DiscussionScreenPlayerCard extends Component {
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
      responseLike: this.props.responseLike,
      getResponseFromDiscussion: this.props.getResponseFromDiscussion,
      nextPlayerAvailable: this.props.nextPlayerAvailable,
      changePlayer: this.props.changePlayer,
      cardIndex: this.props.cardIndex,
      cardLength: this.props.cardLength,
      stopPlayer: this.props.stopPlayer,
      getDiscussion: this.props.getDiscussion,
      fromNextPreviousButton: this.props.fromNextPreviousButton,
      updateFromNextPreviousButton: this.props.updateFromNextPreviousButton,
      openAddResponseModal: false,
      responseCount: this.props.responseCount,
      isLike: false,
      isDislike: false,
      isChainResponse: this.props.isChainResponse,
      getIsLikeAndIsDislike: this.props.getIsLikeAndIsDislike,
      progress: 0
    }
  }

  componentDidMount() {
    this.player = null;
    this.lastSeek = 0;

    this.loadPlayer();

    this.getResponse();

    this.progressInterval = null;
  };

  componentWillUnmount() {
    if (this.state.playPauseButton === 'Pause') {
      this.playRecording();
    };

    clearInterval(this.progressInterval);
  };

  updateState(err) {
    this.setState({
      playPauseButton: this.player && this.player.isPlaying ? 'Pause' : 'Play',

      playButtonDisabled: !this.player || !this.player.canPlay
    });
  };
  
  loadPlayer() {
    if (this.player) {
      this.player.destroy();
    }
    
    this.player = new Player(this.state.recordingFile, {
      autoDestroy: false
    })
    this.player.speed = 0.0;
    this.player.prepare((error) => {
      if (error) {
        console.log('error at _reloadPlayer():');
        console.log(error);
      }

      this.progressInterval = setInterval(() => {
        if (this.player && this.shouldUpdateProgressBar()) {
          let currentProgress = Math.max(0, this.player.currentTime) / this.player.duration;
          if (isNaN(currentProgress)) {
            currentProgress = 0;
          }
          this.setState({ progress: currentProgress });
        }
      }, 100);
      
      this.updateState();

      if (this.state.fromNextPreviousButton && this.player.canPlay) {
        this.playRecording();
        this.state.updateFromNextPreviousButton(false);
      }
    });
    
    this.updateState();
    
    this.player.on('ended', () => {
      this.updateState();
    });
    this.player.on('pause', () => {
      this.updateState();
    });
  };
  
  playRecording() {
    this.player.playPause((error, paused) => {
      if (error) {
        console.log(error);
        this.loadPlayer();
      };

      if (this.player.isPlaying && this.state.cardType === 'discussion' && !error) {
        this.playCounter();
      };
      
      this.updateState();
    });
  };

  seek(percentage) {
    if (!this.player) {
      return;
    }

    this.lastSeek = Date.now();

    let position = percentage * this.player.duration;

    this.player.seek(position, () => {
      this.updateState();
    });
  };

  shouldUpdateProgressBar() {
    return Date.now() - this.lastSeek > 200;
  };
  
  forwardTenSeconds() {
    this.player.seek(this.player.currentTime + 10000, () => {
      this.updateState();
    });
  };
  
  numberConverter = number => {
    let numberToString = number.toString();

    if (numberToString.length > 3 && numberToString.length <= 6) {
      return `${numberToString.substring(0, numberToString.length - 3)}k`;
    } else if (numberToString.length > 6 && numberToString.length <= 9) {
      return `${numberToString.substring(0, numberToString.length - 6)}m`;
    } else if (numberToString.length > 9) {
      return `${numberToString.substring(0, numberToString.length - 9)}b`;
    } else {
      return numberToString
    };
  };

  playCounter = async () => {
    try {
      const access_token = await AsyncStorage.getItem('access_token');

      let playCounterRequest = await axios({
        method: 'get',
        url: `https://dev.entervalhalla.tech/api/tannoi/v1//discussions/views/${this.state.discussionId}`,
        headers: {
          token: access_token
        }
      })

      if (playCounterRequest.data) {
        this.state.getDiscussion();
      }
    } catch (error) {
      console.log(error.response);
    }
  };

  getResponse = async () => {
    try {
      const access_token = await AsyncStorage.getItem('access_token');
      
      if (access_token) {
        let getResponseRequest = await axios({
          url: `https://dev.entervalhalla.tech/api/tannoi/v1/responses/single/${this.state.responseId}`,
          method: 'get',
          headers: {
            'token': access_token
          }
        });
        
        if (getResponseRequest.data) {
          this.setState({
            like: getResponseRequest.data.likes,
            isLike: getResponseRequest.data.isLike,
            isDislike: getResponseRequest.data.isDislike
          });
        }
      }
    } catch (error) {
      console.log(error.response);
    }
  };

  upvote = async () => {
    try {
      const access_token = await AsyncStorage.getItem('access_token');

      let upvoteRequest = await axios({
        method: 'get',
        url: `https://dev.entervalhalla.tech/api/tannoi/v1/responses/like/${this.state.responseId}`,
        headers: {
          token: access_token
        }
      })

      if (upvoteRequest.data) {
        this.getResponse();
      }
    } catch (error) {
      console.log(error.response);
    };
  };

  downvote = async () => {
    try {
      const access_token = await AsyncStorage.getItem('access_token');

      let downvoteRequest = await axios({
        method: 'get',
        url: `https://dev.entervalhalla.tech/api/tannoi/v1/responses/dislike/${this.state.responseId}`,
        headers: {
          token: access_token
        }
      })

      if (downvoteRequest.data) {
        this.getResponse();
      }
    } catch (error) {
      console.log(error);
    };
  };

  convertPostTime = postTimeInput => {
    let postTimeToNewDate = new Date(postTimeInput);
    let postTimeToGMTString = postTimeToNewDate.toGMTString();
    let postTimeToNewDateSplitted = postTimeToGMTString.split(' ');
    
    
    let date = postTimeToNewDateSplitted[1];
    let month = postTimeToNewDateSplitted[2];
    let year = postTimeToNewDateSplitted[3];
    let time = postTimeToNewDateSplitted[4].substring(0, 5);
    
    if (date[0] === '0') {
      date = date[1]
    }

    return `${date} ${month} ${year}, ${time}`;
  };

  closeAddResponseModal = () => {
    this.setState({
      openAddResponseModal: false
    })
  }

  render() {
    return (
      <View style={this.state.cardType === 'discussion' ? styles.discussionPlayerContainerStyle : styles.responsePlayerContainerStyle}>
        <View style={styles.profileAndPostTimeContainerStyle}>
          <View style={styles.profileInfoContainerStyle}>
            <Image source={{uri: this.state.profilePicture}} style={styles.profileImageStyle} />
            <Text style={styles.profileNameStyle}>{this.state.profileName}</Text>
          </View>
          <Text style={styles.postTimeStyle}>{this.state.postTime ? this.convertPostTime(this.state.postTime) : ''}</Text>
        </View>
        <View style={styles.sliderStyle}>
          <Slider 
            step={0.0001} 
            onValueChange={(percentage) => this.seek(percentage)} value={this.state.progress} 
            thumbTintColor="#5152D0"
            minimumTrackTintColor="#5152D0"
          />
        </View>
        <View style={styles.playerContainerStyle}>
          <TouchableOpacity>
            <PlayerSpeed />
          </TouchableOpacity>
          {
            this.state.cardType !== 'discussion' ? (
              <TouchableOpacity
                onPress={() => {
                  if (this.state.playPauseButton === 'Pause') {
                    this.state.changePlayer(this.state.cardIndex, 'previous');
                    this.playRecording();
                    this.state.updateFromNextPreviousButton(true);
                  } else {
                    this.state.changePlayer(this.state.cardIndex, 'previous');
                    this.state.updateFromNextPreviousButton(true);
                  }
                }}
              >
                <ActivePreviousButton />
              </TouchableOpacity>
            ) : (
              <PreviousButton />
            )
          }
          <TouchableOpacity onPress={() => this.playRecording()}>
            {
              this.state.playButtonDisabled ? (
                <Text>Loading...</Text>
              ) : (
                this.state.playPauseButton === 'Play' ? (
                  <ActivePlayButton />
                ) : this.state.playPauseButton === 'Pause' && (
                  <PauseButton />
                )
              )
            }
          </TouchableOpacity>
          {
            this.state.nextPlayerAvailable && this.state.cardIndex !== this.state.cardLength - 1 ? (
              <TouchableOpacity 
                onPress={() => {
                  if (this.state.playPauseButton === 'Pause') {
                    this.state.changePlayer(this.state.cardIndex, 'next');
                    this.playRecording();
                    this.state.updateFromNextPreviousButton(true);
                  } else {
                    this.state.changePlayer(this.state.cardIndex, 'next');
                    this.state.updateFromNextPreviousButton(true);
                  }
                }}
              >
                <ActiveNextButton />
              </TouchableOpacity>
            ) : (
              <NextButton />
            )
          }
          <TouchableOpacity onPress={() => this.forwardTenSeconds()}>
            <ForwardTenButton />
          </TouchableOpacity>
        </View>
        {
          this.state.cardType === 'response' && (
            <View style={styles.voteAndAddResponseContainerStyle}>
              <View style={styles.voteContainerStyle}>
                <TouchableOpacity onPress={() => this.upvote()}>
                  {
                    this.state.isLike ? (
                      <ActiveUpvote />
                    ) : (
                      <Upvote />
                    )
                  }
                </TouchableOpacity>
                <Text style={styles.voteNumberStyle}>
                  {this.numberConverter(this.state.like)}
                </Text>
                <TouchableOpacity onPress={() => this.downvote()}>
                {
                    this.state.isDislike ? (
                      <ActiveDownvote />
                    ) : (
                      <Downvote />
                    )
                  }
                </TouchableOpacity>
              </View>
              <TouchableOpacity
                style={styles.addResponseButtonStyle}
                onPress={() => {
                  this.setState({
                    openAddResponseModal: true
                  })
                }}
              >
                <Text style={styles.addResponseButtonTextStyle}>Add response</Text>
              </TouchableOpacity>
            </View>
          )
        }
        {
          this.state.responseCount >= 1 && (
            <View style={styles.showReplyButtonContainerStyle}>
              <TouchableOpacity
                onPress={() => this.props.navigation.push('ResponseScreen', {
                  responseId: this.state.responseId,
                  discussionId: this.state.discussionId
                })}
              >
              <Text style={styles.showReplyButtonTextStyle}>{this.state.responseCount} Rep{this.state.responseCount > 1 ? 'lies' : 'ly'}</Text>
              </TouchableOpacity>
            </View>
          )
        }
        <AddResponse
          openAddResponseModal={this.state.openAddResponseModal}
          closeAddResponseModal={this.closeAddResponseModal}
          discussionId={this.state.discussionId}
          getResponse={this.state.getResponseFromDiscussion}
          addResponseForResponse={true}
          responseId={this.state.responseId}
        />
      </View>
    )
  }
};

const styles = StyleSheet.create({
  discussionPlayerContainerStyle: {
    backgroundColor: "#FFFFFF",
    padding: 16
  },

  responsePlayerContainerStyle: {
    backgroundColor: "#FFFFFF",
    padding: 16,
    margin: 8,
    borderRadius: 8
  },

  profileAndPostTimeContainerStyle: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between"
  },

  profileInfoContainerStyle: {
    flexDirection: "row",
    alignItems: "center"
  },

  profileImageStyle: {
    borderRadius: 50,
    height: 24,
    width: 24,
    marginRight: 12
  },

  profileNameStyle: {
    fontSize: 14,
    color: "#464D60",
    fontFamily: bold
  },

  postTimeStyle: {
    color: "#73798C",
    fontSize: 12,
    fontFamily: normal
  },

  sliderStyle: {
    marginTop: 30
  },

  playerContainerStyle: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 35
  },

  voteAndAddResponseContainerStyle: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 24,
    borderTopWidth: 1,
    borderTopColor: "#F5F7F9",
    paddingTop: 12
  },

  voteContainerStyle: {
    flexDirection: "row",
    alignItems: "center",
    width: "42%",
    justifyContent: "space-between"
  },

  voteNumberStyle: {
    marginVertical: 6,
    fontFamily: normal,
    fontSize: 14,
    color: "#73798C"
  },

  addResponseButtonStyle: {
    color: "#0E4EF4",
    fontSize: 16
  },

  addResponseButtonTextStyle: {
    color: "#0E4EF4",
    fontSize: 16,
    fontFamily: bold
  },

  showReplyButtonContainerStyle: {
    alignItems: "center",
    marginTop: "5%",
    borderTopWidth: 1,
    borderTopColor: "#F5F7F9",
    paddingTop: "5%"
  },

  showReplyButtonTextStyle: {
    fontSize: 15,
    color: "#0E4EF4",
    fontFamily: bold
  }
});

export default DiscussionScreenPlayerCard;