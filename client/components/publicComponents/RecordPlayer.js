import React, { useState, useEffect, Component } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity
} from 'react-native';
import Slider from '@react-native-community/slider';
import Sound from 'react-native-sound';

//Icons
import PlayerSpeed from '../../assets/topicAssets/playerSpeed.svg';
import PreviousButton from '../../assets/topicAssets/notActivePreviousButton.svg';
import NextButton from '../../assets/topicAssets/notActiveNextButton.svg';
import ActivePlayButton from '../../assets/topicAssets/activePlayButton.svg';
import PauseButton from '../../assets/topicAssets/pauseButton.svg';
import ForwardTenButton from '../../assets/topicAssets/forwardTenButton.svg';
import ActiveNextButton from '../../assets/topicAssets/activeNextButton.svg';
import ActivePreviousButton from '../../assets/topicAssets/activePreviousButton.svg';

//Component
import LoadingSpinner from '../publicComponents/LoadingSpinner';

class RecordPlayer extends Component {
  _isMounted = false;

  constructor(props) {
    super(props);

    this.state = {
      loading: false,
      isPlaying: false,
      progress: 0,
      isPaused: false,
      durationLeft: '',
      durationPlayed: ''
    }
  }

  componentDidMount() {
    this._isMounted = true;
    this.setState({
      loading: true
    })
    this.soundPlayer = null;
    this.progressInterval = null;
    this.loadPlayer();
  }

  componentWillUnmount() {
    this._isMounted = false;
    this.soundPlayer.stop();
    this.stopUpdateProgressBar();
  }

  seek(percentage) {
    let position = percentage * this.soundPlayer.getDuration();

    this.setState({
      progress: percentage
    })
    this.soundPlayer.setCurrentTime(position);
  };

  forwardTenSecond() {
    this.soundPlayer.getCurrentTime(seconds => {
      this.soundPlayer.setCurrentTime(seconds + 10);
    });
  }

  getDuration() {
    this.soundPlayer.getCurrentTime(seconds => {
      let floredSecondPlayed = Math.floor(seconds);
      let floredSecondLeft = Math.floor(this.soundPlayer.getDuration()) - floredSecondPlayed;

      if (floredSecondPlayed < 10) {
        floredSecondPlayed = `0${floredSecondPlayed}`;
      }

      if (floredSecondLeft < 10) {
        floredSecondLeft = `0${floredSecondLeft}`;
      }

      this.setState({
        durationPlayed: `0:${floredSecondPlayed}`,
        durationLeft: `0:${floredSecondLeft}`
      })
    });
  }

  updateProgressBar() {
    this.progressInterval = setInterval(() => {
      this.soundPlayer.getCurrentTime(seconds => {
        if (this.props.isRecorderModalOpen || this.props.openAddResponse) {
          this.playRecording(this.state.isPlaying);
        }
        this.getDuration();
        let currentProgress = Math.max(0, seconds) / this.soundPlayer.getDuration();
        if (this._isMounted) {
          this.setState({
            progress: currentProgress
          });
        }
      });
    }, 100);
  }

  stopUpdateProgressBar() {
    clearInterval(this.progressInterval);
  }

  loadPlayer() {
    this.soundPlayer = new Sound(this.props.recordingFile, Sound.MAIN_BUNDLE, (error) => {
      if (error) {
        console.log(error);
      }

      if (this._isMounted) {
        this.setState({
          loading: false
        });
        this.getDuration();
        if (this.props.fromNextPreviousButton) {
          this.playRecording();
          this.props.updateFromNextPreviousButton(false);
        }
      }
    });
  }

  playRecording = async (isPlaying) => {
    if (isPlaying) {
      this.soundPlayer.pause(() => {
        this.setState({
          isPlaying: false,
          isPaused: true
        });
      });
      this.stopUpdateProgressBar();
    } else {
      if (!this.state.isPaused) {
        this.props.playCounter();
      }
      this.setState({
        isPlaying: true,
        isPaused: false
      });
      this.updateProgressBar();
      this.soundPlayer.play(success => {
        this.setState({
          isPlaying: false,
          progress: 0
        });
        this.stopUpdateProgressBar();
      });
    }
  };

  render() {
    return (
      <View style={{...this.props.customStyle}}>
        <View style={styles.durationContainerStyle}>
          <Text>{this.state.durationPlayed}</Text>
          <Text>{this.state.durationLeft}</Text>
        </View>
        <Slider
          step={0.0001}
          thumbTintColor="#5152D0"
          minimumTrackTintColor="#5152D0"
          value={this.state.progress}
          disabled={this.state.loading}
          onValueChange={percentage => this.seek(percentage)}
        />
        <View style={styles.playerContainerStyle}>
          <PlayerSpeed />
          <TouchableOpacity
            onPress={() => this.props.isPreviousPlayerAvailable && (
              this.props.previousPlayerFunction(),
              this.props.updateFromNextPreviousButton(true)
            )}
            disabled={this.props.isPreviousPlayerAvailable ? false : true}
          >
            {
              this.props.isPreviousPlayerAvailable ? <ActivePreviousButton /> : <PreviousButton />
            }
          </TouchableOpacity>
          {
            this.state.loading ? <LoadingSpinner loadingSpinnerForComponent={true} /> : (
              <TouchableOpacity onPress={() => {
                this.playRecording(this.state.isPlaying);
              }}>
                {
                  !this.state.isPlaying ? <ActivePlayButton /> : <PauseButton />
                }
              </TouchableOpacity>
            )
          }
          <TouchableOpacity
            onPress={() => this.props.isNextPlayerAvailable && (
              this.props.nextPlayerFunction(),
              this.props.updateFromNextPreviousButton(true)
            )}
            disabled={this.props.isNextPlayerAvailable ? false : true}
          >
            {
              this.props.isNextPlayerAvailable ? <ActiveNextButton /> : <NextButton />
            }
          </TouchableOpacity>
          <TouchableOpacity onPress={() => this.forwardTenSecond()}>
            <ForwardTenButton />
          </TouchableOpacity>
        </View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  playerContainerStyle: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: "8%"
  },

  durationContainerStyle: {
    flexDirection: "row",
    justifyContent: "space-between"
  }
});

export default RecordPlayer;