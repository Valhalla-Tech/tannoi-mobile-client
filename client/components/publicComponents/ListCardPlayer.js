import React, { Component } from 'react';
import AsyncStorage from '@react-native-community/async-storage';
import {
  View,
  TouchableOpacity,
  StyleSheet,
  Text
} from 'react-native';
import {
  Player
} from '@react-native-community/audio-toolkit';
import { connect } from 'react-redux';
import { getHome } from '../../store/actions/HomeAction';
import axios from '../../constants/ApiServices';
import BaseUrl from '../../constants/BaseUrl';
import Slider from '@react-native-community/slider';

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
      playerIsReady: false,
      // recordingFile: this.props.recordingFile
    };
  };

  componentDidMount() {
    this.player = null;
    this.loadPlayer();
  };

  static getDerivedStateFromProps(props, state) {
    // Re-run the filter whenever the list array or filter text change.
    // Note we need to store prevPropsList and prevFilterText to detect changes.
    if (props.recordingFile !== state.prevRecordingFile) {
      return {
        savedPrevRecordingFile: state.prevRecordingFile === undefined ? props.recordingFile : state.prevRecordingFile,
        prevRecordingFile: props.recordingFile,
        recordingFile: props.recordingFile
      }
    }
    return null;
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

    this.player = new Player(this.state.recordingFile, {
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
    if (this.state.recordingFile !== this.state.savedPrevRecordingFile) {
      this.setState({
        savedPrevRecordingFile: this.state.prevRecordingFile
      });
      this.loadPlayer();
    } else {
      this.player.playPause((error) => {
        if (error) {
          console.log(error);
        };
  
        if (this.player.isPlaying && !error && !this.player.isPaused && !this.props.fromBio) {
          this.playCounter();
        };
  
        this.updateState();
      })
    }
  };

  render() {
    return (
      <View style={styles.playerContainerStyle}>
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
        {
          this.props.isSlider && (
            <Slider
              style={styles.sliderStyle}
              disabled={this.props.recordingFile ? false : true}
            />
          )
        }
      </View>
    )
  };
};

const styles = StyleSheet.create({
  playerContainerStyle: {
    flexDirection: "row"
  },

  sliderStyle: {
    width: "90%"
  }
});

const dispatchUpdate = () => {
  return {
    getHome
  }
};

export default connect(
  null,
  dispatchUpdate()
)(HomeListPlayerCard);