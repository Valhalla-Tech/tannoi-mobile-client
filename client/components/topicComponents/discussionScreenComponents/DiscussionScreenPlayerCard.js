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

//Icons
import PlayerSpeed from '../../../assets/topicAssets/playerSpeed.svg';
import PreviousButton from '../../../assets/topicAssets/notActivePreviousButton.svg';
import NextButton from '../../../assets/topicAssets/notActiveNextButton.svg';
import ActivePlayButton from '../../../assets/topicAssets/activePlayButton.svg';
import PauseButton from '../../../assets/topicAssets/pauseButton.svg';
import ForwardTenButton from '../../../assets/topicAssets/forwardTenButton.svg';

class DiscussionScreenPlayerCard extends Component {
  constructor(props) {
    super(props);

    this.state = {
      playPauseButton: 'Play',
      profilePicture: this.props.profilePicture,
      cardType: this.props.cardType,
      recordingFile: this.props.recordingFile
    }
  }

  componentDidMount() {
    this.player = null;

    this.loadPlayer();
  }

  updateState(err) {
    this.setState({
      playPauseButton: this.player && this.player.isPlaying ? 'Pause' : 'Play',

      playButtonDisabled: !this.player
    });
  }

  loadPlayer() {
    if (this.player) {
      this.player.destroy();
    }

    this.player = new Player(this.state.recordingFile, {
      autoDestroy: false
    })
    .prepare((error) => {
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
        console.log(error)
      }
      console.log(this.player.duration, this.player.currentTime);
      this.updateState();
    });
  }

  forwardTenSeconds() {
    this.player.seek(this.player.currentTime + 10000, () => {
      this.updateState();
    });
  };

  render() {
    return (
      <View style={this.state.cardType === 'discussion' ? styles.discussionPlayerContainerStyle : styles.responsePlayerContainerStyle}>
      <View>
        <View style={styles.profileAndPostContainerTimeStyle}>
          <View style={styles.profileInfoContainerStyle}>
            <Image source={{uri: this.state.profilePicture}} style={styles.profileImageStyle} />
            <Text style={styles.profileNameStyle}>Richard Hendricks</Text>
          </View>
          <Text style={styles.postTimeStyle}>1 Jun 2020, 12:45</Text>
        </View>
        <View style={styles.playerContainerStyle}>
          <TouchableOpacity>
            <PlayerSpeed />
          </TouchableOpacity>
          <TouchableOpacity>
            <PreviousButton />
          </TouchableOpacity>
          <View>
            <TouchableOpacity onPress={() => this.playRecording()}>
              {
                this.state.playPauseButton === 'Play' ? (
                  <ActivePlayButton />
                ) : this.state.playPauseButton === 'Pause' && (
                  <PauseButton />
                )
              }
            </TouchableOpacity>
          </View>
            <TouchableOpacity>
              <NextButton />
            </TouchableOpacity>
            <TouchableOpacity onPress={() => this.forwardTenSeconds()}>
              <ForwardTenButton />
            </TouchableOpacity>
          </View>
        </View>
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

  profileAndPostContainerTimeStyle: {
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
  }
});

export default DiscussionScreenPlayerCard;