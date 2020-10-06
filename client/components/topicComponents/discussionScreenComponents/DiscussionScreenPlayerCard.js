import React, { useState, useEffect, Component } from 'react';
import {
  StyleSheet,
  View,
  Text,
  Image,
  TouchableOpacity,
  Button
} from 'react-native';
import { bold, normal } from '../../../assets/FontSize';
import {
  Player
} from '@react-native-community/audio-toolkit';
import AsyncStorage from '@react-native-community/async-storage';
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

class DiscussionScreenPlayerCard extends Component {
  constructor(props) {
    super(props);

    this.state = {
      playPauseButton: 'Play',
      playButtonDisabled: true,
      profilePicture: this.props.profilePicture,
      cardType: this.props.cardType,
      recordingFile: this.props.recordingFile,
      profilePicture: this.props.profilePicture,
      profileName: this.props.profileName,
      postTime: this.props.postTime,
      responseId: this.props.responseId,
      getResponseLike: this.props.getResponseLike,
      like: '',
      getResponseFromDiscussion: this.props.getResponseFromDiscussion,
      nextPlayerAvailable: this.props.nextPlayerAvailable,
      changePlayer: this.props.changePlayer,
      cardIndex: this.props.cardIndex,
      cardLength: this.props.cardLength,
      stopPlayer: this.props.stopPlayer
    }
  }

  componentDidMount() {
    this.player = null;

    this.loadPlayer();
  };

  componentWillUnmount() {
    if (this.state.playPauseButton === 'Pause') {
      this.playRecording();
    }
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
      
      this.updateState();
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
      }

      console.log(this.player.isPlaying);
      
      this.updateState();
    });
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

  getResponse = async () => {
    try {
      let access_token = await AsyncStorage.getItem('access_token');
      let getResponseRequest = await axios({
        url: `https://dev.entervalhalla.tech/api/tannoi/v1/responses/discussion/1?page=1`,
        method: 'get',
        headers: {
          'token': access_token
        }
      });

      if (getResponseRequest.data) {
        getResponseRequest.data.data.forEach(response => {
          if (response.id === this.state.responseId) {
            this.setState({
              like: response.likes
            })
          }
        });
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
        this.state.getResponseFromDiscussion();
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
        this.state.getResponseFromDiscussion();
      }
    } catch (error) {
      console.log(error.response);
    };
  };

  render() {
    return (
      <View style={this.state.cardType === 'discussion' ? styles.discussionPlayerContainerStyle : styles.responsePlayerContainerStyle}>
        <View style={styles.profileAndPostTimeContainerStyle}>
          <View style={styles.profileInfoContainerStyle}>
            <Image source={{uri: this.state.profilePicture}} style={styles.profileImageStyle} />
            <Text style={styles.profileNameStyle}>{this.state.profileName}</Text>
          </View>
          <Text style={styles.postTimeStyle}>{this.state.postTime}</Text>
        </View>
        <View style={styles.playerContainerStyle}>
          <TouchableOpacity>
            <PlayerSpeed />
          </TouchableOpacity>
          <TouchableOpacity>
            <PreviousButton />
          </TouchableOpacity>
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
              <TouchableOpacity onPress={() => {
                if (this.state.playPauseButton === 'Pause') {
                  this.state.changePlayer(this.state.cardIndex, 'next');
                  this.playRecording();
                } else {
                  this.state.changePlayer(this.state.cardIndex, 'next');
                }
              }}>
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
                  <Upvote />
                </TouchableOpacity>
                <Text style={styles.voteNumberStyle}>{this.state.like === '' ? this.numberConverter(this.state.getResponseLike(this.state.responseId)) : this.numberConverter(this.state.like)}</Text>
                <TouchableOpacity onPress={() => this.downvote()}>
                  <Downvote />
                </TouchableOpacity>
              </View>
              <TouchableOpacity
                style={styles.addResponseButtonStyle}
                // onPress={() => setOpenAddResponseModal(true)}
              >
                <Text style={styles.addResponseButtonTextStyle}>Add response</Text>
              </TouchableOpacity>
            </View>
          )
        }
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

  playerContainerStyle: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 68
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
  }
});

export default DiscussionScreenPlayerCard;