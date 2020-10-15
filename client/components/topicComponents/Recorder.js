import React, { Component } from 'react';
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  Platform,
  PermissionsAndroid
} from 'react-native';
import {
  Player,
  Recorder,
  MediaStates
} from '@react-native-community/audio-toolkit';
import { bold, normal } from '../../assets/FontSize';

//Icon
import RecordButton from '../../assets/topicAssets/recordButton.svg'

class NewDiscussionScreenRecorder extends Component {
  constructor(props) {
    super(props);

    this.state = {
      recordingFile: '',
      timer: ''
    };
  };

  componentDidMount() {
    this.recorder = null;
    this.player = null;
    this.countdown = null;

    this.reloadRecorder();
    this.reloadPlayer();

    this.counter = null;
  };

  startCounter = () => {
    this.counter = setInterval(() => {
      this.setState({
        timer: this.state.timer - 1
      });
    }, 1000);
  };

  stopCounter = () => {
    clearInterval(this.counter);
    
    this.setState({
      timer: ''
    });
  };

  reloadRecorder() {
    if (this.recorder) {
      this.recorder.destroy();
    }

    this.recorder = new Recorder('discussionRecord.m4a');
  };

  reloadPlayer() {
    if (this.player) {
      this.player.destroy();
    }

    this.player = new Player('discussionRecord.m4a', {
      autoDestroy: false
    }).prepare((error) => {
      if (error) {
        console.log('error at _reloadPlayer():');
        console.log(error);
      }
    });
  };

  checkPermission = async () => {
    if (Platform.OS !== 'android') {
      return Promise.resolve(true);
    }

    let result;
    try {
        result = await PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.RECORD_AUDIO, { title:'Microphone Permission', message:'Tannoi needs access to your microphone to use voice feature.' });

        if (result === PermissionsAndroid.RESULTS.GRANTED) {
          return true;
        } else {
          return false;
        }
    } catch(error) {
        console.error('failed getting permission, result:', result);
        return false
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

  voiceRecord = toggleFromTimer => {
    if (this.player) {
      this.player.destroy();
    }
    
    let permission = this.checkPermission();
    
    permission.then((hasPermission) => {
      if (toggleFromTimer && this.recorder.isRecording) {

        this.recorder.toggleRecord((error, stopped) => {
          if (stopped) {
            this.reloadRecorder();
          }
          
          this.stopCounter();
          this.playRecording();
        });
      } else if (!toggleFromTimer) {
        this.recorder.toggleRecord((error, stopped) => {
          if (stopped) {
            this.reloadRecorder();
          }
          
        });

        if (this.recorder.isRecording) {
          this.stopCounter();
          this.playRecording();
        } else {
          this.setState({
            timer: 30
          });

          this.recordingTimer();
          this.startCounter();
        };
      }
    })
  };

  playRecording = () => {
    this.setState({
      recordingFile: '/data/user/0/tannoi.client/files/discussionRecord.m4a'
    });
    this.props.addRecordingFile('/data/user/0/tannoi.client/files/discussionRecord.m4a');
    this.clearTimer();

    this.player.playPause((error, paused) => {
      if (error) {
        console.log(error);
      };
    });
  };

  stopPlayer = () => {
    this.player.stop((error) => {
      console.log(error);
    });
  };

  render() {
    return (
      <View>
        <Text style={this.props.recorderStyle ? {...styles.timerStyle, ...this.props.recorderStyle} : styles.timerStyle}>{this.state.timer}</Text>
        <View style={styles.newDiscussionScreenRecorderContainerStyle}>
          <TouchableOpacity
            onPress={() => this.state.recordingFile && this.stopPlayer() }
            style={this.state.recordingFile ? styles.stopButtonStyle : {...styles.stopButtonStyle, borderColor: "#a1a5ab"}}
            disabled={this.state.recordingFile === ''}
          >
            <Text style={this.state.recordingFile ? styles.stopButtonTextStyle : {...styles.stopButtonTextStyle, color: "#a1a5ab"}}>Stop</Text> 
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => this.voiceRecord(false)}
          >
            <RecordButton />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => this.state.recordingFile && this.playRecording()}
            style={this.state.recordingFile ? styles.playOrPauseButtonStyle : {...styles.playOrPauseButtonStyle, borderColor: "#a1a5ab"}}
            disabled={this.state.recordingFile === ''}
          >
              <Text style={this.state.recordingFile ? styles.playOrPauseButtonTextStyle : {...styles.playOrPauseButtonTextStyle, color: "#a1a5ab"}}>Play / Pause</Text>
          </TouchableOpacity>
        </View>
      </View>
    )
  };
};

const styles = StyleSheet.create({
  timerStyle: {
    marginTop: "50%",
    textAlign: "center",
    color: "#5152D0",
    fontSize: 20,
    fontFamily: bold
  },

  newDiscussionScreenRecorderContainerStyle: {
    alignItems: "center",
    marginTop: "5%",
    paddingBottom: "5%",
    flexDirection: "row",
    justifyContent: "space-around"
  },

  stopButtonStyle: {
    borderWidth: 1,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 10,
    borderColor: "#de181f",
    height: 40,
    width: 100
  },

  stopButtonTextStyle: {
    color: "#de181f",
    fontFamily: bold
  },
  
  playOrPauseButtonStyle: {
    borderWidth: 1,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 10,
    borderColor: "#5152D0",
    height: 40,
    width: 100
  },

  playOrPauseButtonTextStyle: {
    color: "#5152D0",
    fontFamily: bold
  }
});

export default NewDiscussionScreenRecorder;