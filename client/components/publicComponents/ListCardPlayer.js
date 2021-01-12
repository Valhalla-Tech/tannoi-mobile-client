import React, { Component } from 'react';
import AsyncStorage from '@react-native-community/async-storage';
import {
  View,
  TouchableOpacity,
  StyleSheet,
  Text
} from 'react-native';
import { connect } from 'react-redux';
import { getHome } from '../../store/actions/HomeAction';
import { changeCurrentPlayerId } from '../../store/actions/PlayerAction';
import axios from '../../constants/ApiServices';
import BaseUrl from '../../constants/BaseUrl';
import Slider from '@react-native-community/slider';
import Sound from 'react-native-sound';

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
      isPaused: false,
      playerIsReady: true,
      firstPlay: true,
      progress: 0,
      playerReload: false,
      playerId: ''
    };
  };

  componentDidMount() {
    this.soundPlayer = null;
    this._isMounted = true;
    this.progressInterval = null;

    this._blur = this.props.navigation.addListener('blur', () => {
      this._isMounted = false;
    });
  };

  componentWillUnmount() {
    this._isMounted = false;
    this._blur;
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
        // this.props.getHome();
      }
    } catch (error) {
      console.log(error);
    }
  };

  loadPlayer(propsChanged) {
    this.setState({
      playerIsReady: false
    });

    this.soundPlayer = new Sound(this.props.recordingFile, Sound.MAIN_BUNDLE, (error) => {
      if (error) {
        console.log(error);
      } else if (this._isMounted) {
        {
          this.setState({
            playerIsReady: true,
            firstPlay: false
          })
        }

        this.playRecording(this.state.isPlaying);
      }
    })
  };

  playRecording = (isPlaying) => {
    if (isPlaying) {
      this.soundPlayer.pause(() => {
        this.setState({
          isPlaying: false,
          isPaused: true
        });
      });
      this.stopUpdateProgressBar();
    } else {
      if (this.state.recordingFile !== this.state.savedPrevRecordingFile && this._isMounted) {
        this.setState({
          savedPrevRecordingFile: this.state.prevRecordingFile
        });

        this.loadPlayer()
      }

      if (!this.state.isPaused) {
        this.playCounter();
      }

      this.setState({
        isPlaying: true,
        isPaused: false
      });

      if (this.props.currentPlayerId !== this.props.discussionId) {
        this.props.changeCurrentPlayerId(this.props.discussionId);
      }

      this.updateProgressBar();

      if (this._isMounted) {
        this.soundPlayer.play(success => {
          this.setState({
            isPlaying: false,
            progress: 0
          });
  
          this.stopUpdateProgressBar();
        });
      }
    }
  };
  
  updateProgressBar() {
    this.progressInterval = setInterval(() => {
      this.soundPlayer.getCurrentTime(seconds => {
        if (this.props.currentPlayerId !== this.props.discussionId) {
          this.playRecording(true);
          this.stopUpdateProgressBar();
        }

        let currentProgress = Math.max(0, seconds) / this.soundPlayer.getDuration();
        if (this._isMounted) {
          this.setState({
            progress: currentProgress
          });
        }
      })
    }, 100);
  }

  stopUpdateProgressBar() {
    clearInterval(this.progressInterval);
  }

  seek(percentage) {
    let position = percentage * this.soundPlayer.getDuration();

    this.setState({
      progress: percentage
    })
    this.soundPlayer.setCurrentTime(position);
  };

  render() {
    return (
      <View style={styles.playerContainerStyle}>
        <TouchableOpacity onPress={() => this.state.firstPlay ? this.loadPlayer() : this.playRecording(this.state.isPlaying)}>
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
              thumbTintColor="#5152D0"
              minimumTrackTintColor="#5152D0"
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
    getHome,
    changeCurrentPlayerId
  }
};

const mapStateToProps = (state) => {
  return {
    currentPlayerId: state.PlayerReducer.currentPlayerId
  }
};

export default connect(
  mapStateToProps,
  dispatchUpdate()
)(HomeListPlayerCard);