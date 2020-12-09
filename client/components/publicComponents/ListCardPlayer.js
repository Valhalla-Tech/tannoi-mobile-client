import React, { Component } from 'react';
import AsyncStorage from '@react-native-community/async-storage';
import {
  TouchableOpacity
} from 'react-native';
import {
  Player
} from '@react-native-community/audio-toolkit';
import { connect } from 'react-redux';
import { getHome } from '../../store/actions/HomeAction';
import axios from '../../constants/ApiServices';
import BaseUrl from '../../constants/BaseUrl';

//Icons
import ActivePlayButton from '../../assets/homeAssets/activePlayButton.svg';
import PauseButton from '../../assets/homeAssets/pauseButton.svg';

//Component
import LoadingSpinner from './LoadingSpinner';

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
    this.loadPlayer();
  };

  updateState() {
    this.setState({
      isPlaying: this.player.isPlaying ? true : false,
      playerIsReady: this.player && this.player.canPlay
    })
  };

  playCounter = async () => {
    try {
      const access_token = await AsyncStorage.getItem('access_token');

      let playCounterRequest = await axios({
        method: 'get',
        url: `${BaseUrl}/discussions/views/${this.props.discussionId}`,
        headers: {
          token: access_token
        }
      })

      if (playCounterRequest.data) {
        this.props.getHome();
      }
    } catch (error) {
      console.log(error);
    }
  };

  loadPlayer() {
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

      if (this.player.isPlaying && !error && !this.player.isPaused) {
        this.playCounter();
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

const dispatchUpdate = () => {
  return {
    getHome
  }
};

export default connect(
  null,
  dispatchUpdate()
)(HomeListPlayerCard);