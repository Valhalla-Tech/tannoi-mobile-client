import React, { Component } from 'react';
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  Platform,
  PermissionsAndroid,
} from 'react-native';
import { Player, Recorder } from '@react-native-community/audio-toolkit';
import Slider from '@react-native-community/slider';
import { bold, normal } from '../../assets/FontSize';
import { CalculateHeight, CalculateWidth } from '../../helper/CalculateSize';

//Icon
import RecordButton from '../../assets/topicAssets/recordButton.svg';

class NewDiscussionScreenRecorder extends Component {
  _isMounted = false;

  constructor(props) {
    super(props);

    this.state = {
      recordingFile: '',
      timer: '',
      progress: 0,
      duration: 0,
      durationRemaining: 0,
      durationDisplay: '',
      durationPlayerDisplay: '',
    };
  }

  componentDidMount() {
    this.recorder = null;
    this.player = null;
    this.countdown = null;
    this.lastSeek = 0;

    this.loadRecorder();
    this.loadPlayer();

    this.counter = null;
    this.progressInterval = null;
    this._isMounted = true;
  }

  componentWillUnmount() {
    this._isMounted = false;
    this.player.isPlaying && this.playRecording();
    this.recorder.isRecording && this.voiceRecord(false);
    this.stopProgressInterval();
  }

  startCounter = () => {
    this.counter = setInterval(() => {
      if (this._isMounted) {
        this.setState({
          timer: this.state.timer - 1,
        });
      }
    }, 1000);
  };

  stopCounter = () => {
    clearInterval(this.counter);
    if (this._isMounted) {
      this.setState({
        timer: '',
      });
    }
  };

  loadRecorder() {
    if (this.recorder) {
      this.recorder.destroy();
    }

    this.recorder = new Recorder('discussionRecord.mp4');
  }

  loadPlayer() {
    if (this.player) {
      this.player.destroy();
    }

    this.player = new Player('discussionRecord.mp4', {
      autoDestroy: false,
    }).prepare((error) => {
      if (error) {
        console.log('error at loadPlayer():');
        console.log(error);
      }
    });
  }

  checkPermission = async () => {
    if (Platform.OS !== 'android') {
      return Promise.resolve(true);
    }

    let result;
    try {
      result = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.RECORD_AUDIO,
        {
          title: 'Microphone Permission',
          message:
            'Tannoi needs access to your microphone to use voice feature.',
        },
      );

      if (result === PermissionsAndroid.RESULTS.GRANTED) {
        return true;
      } else {
        return false;
      }
    } catch (error) {
      console.error('failed getting permission, result:', result);
      return false;
    }
  };

  recordingTimer = () => {
    this.countdown = setTimeout(() => {
      this.voiceRecord(true);
    }, 30000);
  };

  clearTimer = () => {
    clearTimeout(this.countdown);
  };

  voiceRecord = (toggleFromTimer) => {
    if (this.player) {
      this.player.destroy();
    }

    let permission = this.checkPermission();

    permission.then((hasPermission) => {
      if (toggleFromTimer && this.recorder.isRecording && this._isMounted) {
        this.recorder.toggleRecord((error, stopped) => {
          if (stopped) {
            this.loadRecorder();
          }

          this.stopCounter();
          this.playRecording();
        });
      } else if (!toggleFromTimer) {
        this.recorder.toggleRecord((error, stopped) => {
          if (stopped) {
            this.loadRecorder();
          }
        });

        if (this.recorder.isRecording && this._isMounted) {
          this.stopCounter();
          this.playRecording();
        } else if (this._isMounted) {
          this.props.removeRecordingFile && this.props.removeRecordingFile();
          if (this._isMounted) {
            this.setState({
              timer: 30,
            });
          }

          this.recordingTimer();
          this.startCounter();
        }
      }
    });
  };

  playRecording = () => {
    if (this._isMounted) {
      this.setState({
        recordingFile: '/data/user/0/tannoi.client/files/discussionRecord.mp4',
      });
    }
    this.props.addRecordingFile(
      '/data/user/0/tannoi.client/files/discussionRecord.mp4',
    );
    this.clearTimer();

    if (this._isMounted || (!this._isMounted && this.player.isPlaying)) {
      this.player.playPause((error, paused) => {
        if (error) {
          console.log(error);
        }

        if (this.player.isPlaying && !error) {
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

              this.updateDuration(this.player.currentTime);

              if (!this.player.isPlaying) {
                if (!this.player.isPaused) {
                  this.getDuration();
                }

                this.stopProgressInterval();
              }

              if (this._isMounted) {
                this.setState({ progress: currentProgress });
              }
            }
          }, 100);
        }
      });
    }
  };

  stopPlayer = () => {
    this.player.stop((error) => {
      console.log(error);
      this.getDuration();
      this.stopProgressInterval();
      if (this._isMounted) {
        this.setState({
          progress: 0,
        });
      }
    });
  };

  stopProgressInterval = () => {
    clearInterval(this.progressInterval);
  };

  updateDuration = (currentTime) => {
    let durationRemaining = this.player.duration - currentTime;
    let durationRemainingToString = durationRemaining.toString();
    let currentTimeToString = currentTime.toString();

    if (this._isMounted) {
      this.setState({
        durationDisplay:
          durationRemainingToString.length === 4
            ? `0:0${durationRemainingToString[0]}`
            : durationRemainingToString.length === 5
            ? `0:${durationRemainingToString[0]}${durationRemainingToString[1]}`
            : '0:00',
        durationPlayedDisplay:
          currentTimeToString.length === 4
            ? `0:0${currentTimeToString[0]}`
            : currentTimeToString.length === 5
            ? `0:${currentTimeToString[0]}${currentTimeToString[1]}`
            : '0:00',
      });
    }
  };

  getDuration = () => {
    let durationToString = this.player.duration.toString();

    if (durationToString.length === 4 && this._isMounted) {
      this.setState({
        durationDisplay: `0:0${durationToString[0]}`,
        durationPlayedDisplay: '0:00',
      });
    } else if (durationToString.length === 5 && this._isMounted) {
      this.setState({
        durationDisplay: `0:${durationToString[0]}${durationToString[1]}`,
        durationPlayedDisplay: '0:00',
      });
    }
  };

  seek(percentage) {
    if (!this.player) {
      return;
    }

    this.lastSeek = Date.now();

    let position = percentage * this.player.duration;

    this.player.seek(position, () => {
      // this.updateState();
    });
  }

  shouldUpdateProgressBar() {
    return Date.now() - this.lastSeek > 200;
  }

  render() {
    return (
      <View>
        {this.state.recordingFile !== '' && !this.props.isVerification && (
          <View style={styles.sliderStyle}>
            <View style={styles.durationContainerStyle}>
              <Text style={styles.durationStyle}>
                {this.state.durationDisplay}
              </Text>
              <Text style={styles.durationStyle}>
                {this.state.durationPlayedDisplay}
              </Text>
            </View>
            <Slider
              step={0.0001}
              onValueChange={(percentage) => this.seek(percentage)}
              value={this.state.progress}
              thumbTintColor="#5152D0"
              minimumTrackTintColor="#5152D0"
            />
          </View>
        )}
        <Text
          style={
            this.props.recorderStyle
              ? { ...styles.timerStyle, ...this.props.recorderStyle }
              : styles.timerStyle
          }>
          {this.state.timer}
        </Text>
        <View style={styles.newDiscussionScreenRecorderContainerStyle}>
          {this.state.recordingFile !== '' && !this.recorder.isRecording && (
            <TouchableOpacity
              onPress={() => this.state.recordingFile && this.stopPlayer()}
              style={
                this.state.recordingFile
                  ? styles.stopButtonStyle
                  : { ...styles.stopButtonStyle, borderColor: '#a1a5ab' }
              }
              disabled={this.state.recordingFile === ''}>
              <Text
                style={
                  this.state.recordingFile
                    ? styles.stopButtonTextStyle
                    : { ...styles.stopButtonTextStyle, color: '#a1a5ab' }
                }>
                Reset
              </Text>
            </TouchableOpacity>
          )}
          <TouchableOpacity onPress={() => this.voiceRecord(false)}>
            <RecordButton />
          </TouchableOpacity>
          {this.state.recordingFile !== '' && !this.recorder.isRecording && (
            <TouchableOpacity
              onPress={() => this.state.recordingFile && this.playRecording()}
              style={
                this.state.recordingFile
                  ? styles.playOrPauseButtonStyle
                  : { ...styles.playOrPauseButtonStyle, borderColor: '#a1a5ab' }
              }
              disabled={this.state.recordingFile === ''}>
              <Text
                style={
                  this.state.recordingFile
                    ? styles.playOrPauseButtonTextStyle
                    : { ...styles.playOrPauseButtonTextStyle, color: '#a1a5ab' }
                }>
                Play / Pause
              </Text>
            </TouchableOpacity>
          )}
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  sliderStyle: {
    color: '#464D60',
  },

  durationContainerStyle: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },

  durationStyle: {
    fontFamily: normal,
  },

  timerStyle: {
    marginTop: '5%',
    textAlign: 'center',
    color: '#5152D0',
    fontSize: CalculateHeight(2.5),
    fontFamily: bold,
  },

  newDiscussionScreenRecorderContainerStyle: {
    alignItems: 'center',
    marginTop: '5%',
    paddingBottom: '5%',
    flexDirection: 'row',
    justifyContent: 'space-around',
  },

  stopButtonStyle: {
    borderWidth: 1,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
    borderColor: '#de181f',
    paddingVertical: '1%',
    width: '30%',
  },

  stopButtonTextStyle: {
    color: '#de181f',
    fontFamily: bold,
  },

  playOrPauseButtonStyle: {
    borderWidth: 1,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
    borderColor: '#5152D0',
    paddingVertical: '1%',
    width: '30%',
  },

  playOrPauseButtonTextStyle: {
    color: '#5152D0',
    fontFamily: bold,
  },
});

export default NewDiscussionScreenRecorder;
