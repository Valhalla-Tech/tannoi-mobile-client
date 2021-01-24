import React, {Component} from 'react';
import AsyncStorage from '@react-native-community/async-storage';
import {View, TouchableOpacity, StyleSheet, Text} from 'react-native';
import {Player} from '@react-native-community/audio-toolkit';
import {connect} from 'react-redux';
import {getHome} from '../../store/actions/HomeAction';
import {changeCurrentPlayerId} from '../../store/actions/PlayerAction';
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
      playerIsReady: true,
      firstPlay: true,
      progress: 0,
      playerReload: false,
      playerId: '',
    };
  }

  componentDidMount() {
    this._isMounted = true;
    this.player = null;
    this.lastSeek = 0;
  }

  componentWillUnmount() {
    this._isMounted = false;

    if (this.player) {
      if (this.player.isPlaying) {
        this.playRecording();
      }
    }
  }

  static getDerivedStateFromProps(props, state) {
    if (props.recordingFile !== state.prevRecordingFile) {
      return {
        savedPrevRecordingFile:
          state.prevRecordingFile === undefined
            ? props.recordingFile
            : state.prevRecordingFile,
        prevRecordingFile: props.recordingFile,
        recordingFile: props.recordingFile,
      };
    }
    return null;
  }

  updateState() {
    if (this._isMounted) {
      this.setState({
        isPlaying: this.player.isPlaying ? true : false,
        playerIsReady: this.player && this.player.canPlay,
      });
    }
  }

  playCounter = async () => {
    try {
      const access_token = await AsyncStorage.getItem('access_token');

      let playCounterRequest = await axios({
        method: 'get',
        url: `${BaseUrl}/discussions/views/${this.props.discussionId}`,
        headers: {
          token: access_token,
        },
      });

      if (playCounterRequest.data) {
        // this.props.getHome();
      }
    } catch (error) {
      console.log(error);
    }
  };

  loadPlayer(propsChanged) {
    this.setState({
      playerIsReady: false,
    });

    if (this.player) {
      this.player.destroy();
    }

    this.player = new Player(this.state.recordingFile, {
      autoDestroy: false,
    });

    this.player.speed = 0.0;

    this.player.prepare((error) => {
      if (error) {
        console.log(error);
      }

      this.updateState();

      this.playRecording();

      if (propsChanged) {
        this.playRecording();
      }
    });

    this.player.on('ended', () => {
      this.updateState();
    });

    this.player.on('pause', () => {
      this.updateState();
    });
  }

  playRecording = () => {
    this.setState({
      firstPlay: false,
    });

    if (
      this.props.currentPlayerId !== this.player._playerId &&
      !this.player.isPlaying
    ) {
      this.props.changeCurrentPlayerId(this.player._playerId);
    }

    if (
      this.state.recordingFile !== this.state.savedPrevRecordingFile &&
      this._isMounted
    ) {
      this.setState({
        savedPrevRecordingFile: this.state.prevRecordingFile,
        playerReload: true,
      });
      this.loadPlayer(true);
    } else {
      this.player.playPause((error) => {
        if (error) {
          console.log(error);
          this.loadPlayer();
        }

        if (this.player.isPlaying && !error) {
          this.setState({
            playerReload: false,
            playerId: this.player._playerId,
          });

          if (this.player) {
            this.player.speed = 1.0;
          }

          this.progressInterval = setInterval(() => {
            if (
              this.player &&
              this.shouldUpdateProgressBar() &&
              this._isMounted
            ) {
              let currentProgress =
                Math.max(0, this.player.currentTime) / this.player.duration;
              if (isNaN(currentProgress)) {
                currentProgress = 0;
              }

              if (!this.player.isPlaying) {
                this.stopProgressInterval();
              }

              if (
                this.props.currentPlayerId !== this.player._playerId &&
                this.player.isPlaying
              ) {
                this.playRecording();
              }

              this.setState({progress: currentProgress});
            }
          }, 100);
        }

        if (
          this.player.isPlaying &&
          !error &&
          !this.player.isPaused &&
          !this.props.fromBio
        ) {
          this.playCounter();
        }

        this.updateState();
      });
    }
  };

  shouldUpdateProgressBar() {
    return Date.now() - this.lastSeek > 200;
  }

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
  }

  render() {
    return (
      <View style={styles.playerContainerStyle}>
        <TouchableOpacity
          onPress={() =>
            this.state.firstPlay ? this.loadPlayer() : this.playRecording()
          }>
          {this.state.playerIsReady && !this.state.playerReload ? (
            this.state.isPlaying ? (
              <PauseButton />
            ) : (
              <ActivePlayButton />
            )
          ) : (
            <LoadingSpinner loadingSpinnerForComponent={true} />
          )}
        </TouchableOpacity>
        {this.props.isSlider && (
          <Slider
            step={0.0001}
            style={styles.sliderStyle}
            disabled={this.props.recordingFile ? false : true}
            onValueChange={(percentage) => this.seek(percentage)}
            value={this.state.progress}
          />
        )}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  playerContainerStyle: {
    flexDirection: 'row',
  },

  sliderStyle: {
    width: '90%',
  },
});

const dispatchUpdate = () => {
  return {
    getHome,
    changeCurrentPlayerId,
  };
};

const mapStateToProps = (state) => {
  return {
    currentPlayerId: state.PlayerReducer.currentPlayerId,
  };
};

export default connect(mapStateToProps, dispatchUpdate())(HomeListPlayerCard);
