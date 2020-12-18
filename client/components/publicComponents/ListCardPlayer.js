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
  _isMounted = false;

  constructor(props) {
    super(props);

    this.state = {
      isPlaying: false,
      playerIsReady: false,
      progress: 0
    };
  };

  componentDidMount() {
    this._isMounted = true;
    this.player = null;
    this.loadPlayer();
    this.lastSeek = 0;
  };

  componentWillUnmount() {
    this._isMounted = false;
  };

  static getDerivedStateFromProps(props, state) {
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
    if (this._isMounted) {
      this.setState({
        isPlaying: this.player.isPlaying ? true : false,
        playerIsReady: this.player && this.player.canPlay
      })
    }
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
    if (this.state.recordingFile !== this.state.savedPrevRecordingFile && this._isMounted) {
      this.setState({
        savedPrevRecordingFile: this.state.prevRecordingFile
      });
      this.loadPlayer();
    } else {
      this.player.playPause((error) => {
        if (error) {
          console.log(error);
        };

        if (this.player.isPlaying && !error) {
          this.progressInterval = setInterval(() => {
            if (this.player && this.shouldUpdateProgressBar() && this._isMounted) {
              let currentProgress = Math.max(0, this.player.currentTime) / this.player.duration;
              if (isNaN(currentProgress)) {
                currentProgress = 0;
              };
    
              if (!this.player.isPlaying) {
                this.stopProgressInterval();
              };
    
              this.setState({ progress: currentProgress });
            }
          }, 100);
        };
  
        if (this.player.isPlaying && !error && !this.player.isPaused && !this.props.fromBio) {
          this.playCounter();
        };
  
        this.updateState();
      })
    }
  };

  shouldUpdateProgressBar() {
    return Date.now() - this.lastSeek > 200;
  };

  stopProgressInterval = () => {
    clearInterval(this.progressInterval);
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
              step={0.0001} 
              style={styles.sliderStyle}
              disabled={this.props.recordingFile ? false : true}
              onValueChange={(percentage) => this.seek(percentage)}
              value={this.state.progress}
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