import React, { Component } from 'react';
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity
} from 'react-native';
import {
  Player
} from '@react-native-community/audio-toolkit';

//Icon
import ActivePlayButton from '../../../assets/homeAssets/activePlayButton.svg';
import PauseButton from '../../../assets/homeAssets/pauseButton.svg';

//Component
import LoadingSpinner from '../../publicComponents/LoadingSpinner';

class HomeListPlayerCard extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isPlaying: false,
      playerIsReady: false
    };
  };

  componentDidMount() {
    this.player = null;

    this.reloadPlayer();
  };

  updateState() {
    this.setState({
      isPlaying: this.player.isPlaying ? true : false,
      playerIsReady: this.player && this.player.canPlay
    })
  };

  reloadPlayer() {
    if (this.player) {
      this.player.destroy();
    };

    this.player = new Player(this.props.recordingFile, {
      autoDestroy: false
    }).prepare((error) => {
      if (error) {
        console.log(error);
      };

      this.updateState();
    });

    this.player.on('ended', () => {
      this.updateState();
    });
    this.player.on('pause', () => {
      this.updateState();
    });
  };

  playRecording = () => {
    this.player.playPause((error) => {
      if (error) {
        console.log(error);
      };

      this.updateState();
    })
  };

  render() {
    return (
      <TouchableOpacity onPress={() => this.playRecording()}>
        {
          this.state.playerIsReady ? (
            this.state.isPlaying ? (
              <PauseButton />
            ) : (
              <ActivePlayButton />
            ) 
          ) : (
            <LoadingSpinner loadingSpinnerForComponent={true} />
          )
        }
      </TouchableOpacity>
    )
  };
};

export default HomeListPlayerCard;