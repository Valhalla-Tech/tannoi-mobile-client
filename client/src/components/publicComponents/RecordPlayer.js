import React, { Component } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Platform,
} from 'react-native';
import Slider from '@react-native-community/slider';
// import Sound from 'react-native-sound';
import { Player } from '@react-native-community/audio-toolkit';

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
import LoadingSpinner from './LoadingSpinner';

class RecordPlayer extends Component {
  _isMounted = false;

  constructor(props) {
    super(props);

    this.state = {
      loading: true,
      isPlaying: false,
      progress: 0,
      isPaused: false,
      durationLeft: '0:00',
      durationPlayed: '0:00',
    };
  }

  componentDidMount() {
    this.props.onRef(this);
    this.player = null;
    this._isMounted = true;
    this.lastSeek = 0;
    this.progressInterval = null;

    this.loadPlayer();

    this._blur = this.props.navigation.addListener('blur', () => {
      this._isMounted = false;
      this.stopProgressInterval();
      this.player.stop((error) => console.log(error));
    });

    this._unsubscribe = this.props.navigation.addListener('focus', () => {
      this._isMounted = true;
      this.setState({
        loading: true,
        isPlaying: false,
        progress: 0,
        isPaused: false,
        durationLeft: '0:00',
        durationPlayed: '0:00',
      });
      this.loadPlayer();
    });
  }

  componentWillUnmount() {
    this.props.onRef(undefined);
    this._isMounted = false;
    this.player && this.player.isPlaying && this.playRecording();
    this._blur;
    this.stopProgressInterval();
    this._unsubscribe();
  }

  updateState = () => {
    if (this._isMounted) {
      this.setState({
        isPlaying: this.player.isPlaying ? true : false,
        loading: this.player && this.player.canPlay ? false : true,
      });
    }
  };

  loadPlayer = () => {
    if (this.player) {
      this.player.destroy();
    }

    this.player = new Player(this.props.recordingFile, {
      autoDestroy: false,
    });

    // this.player.speed = 0.0;

    this.player.prepare((error) => {
      if (error) {
        console.log(error);
      } else {
        this.updateState();
        this.getDuration();

        if (
          this.props.cardIndex !== 'discussion' &&
          this.props.cardIndex !== 'response' &&
          this._isMounted
        ) {
          this.playRecording();
        }
      }
    });

    this.player.on('ended', () => {
      this.updateState();
      this.props.playCounter();
      if (this.props.isNextPlayerAvailable) {
        this.props.nextPlayerFunction();
        this.props.updateFromNextPreviousButton(true);
      }
    });

    this.player.on('pause', () => {
      this.updateState();
    });
  };

  playRecording = () => {
    this.player.playPause((error) => {
      console.log(this.player.isPlaying);
      if (error) {
        console.log(error);
      }
      this.player.isPlaying && this.updateProgressBar();
      !this.player.isPlaying && this.stopProgressInterval();
      this.updateState();
    });
  };

  seek = (percentage) => {
    if (!this.player) {
      return;
    }

    this.lastSeek = Date.now();

    let position = percentage * this.player.duration;

    this.player.seek(position, () => {
      this.updateState();
    });
  };

  updateProgressBar = () => {
    this.progressInterval = setInterval(() => {
      if (this.player && this.shouldUpdateProgressBar() && this._isMounted) {
        let currentProgress =
          Math.max(0, this.player.currentTime) / this.player.duration;
        if (isNaN(currentProgress)) {
          currentProgress = 0;
        }

        if (!this.player.isPlaying) {
          this.stopProgressInterval();
        }

        if (
          (this.props.isRecorderModalOpen && this.player.isPlaying) ||
          (this.props.openAddResponse && this.player.isPlaying)
        ) {
          this.playRecording();
        }

        this.getDuration();
        this.setState({ progress: currentProgress });
      }
    }, 100);
  };

  shouldUpdateProgressBar() {
    return Date.now() - this.lastSeek > 200;
  }

  stopProgressInterval = () => {
    clearInterval(this.progressInterval);
  };

  getDuration() {
    let floredDuration = Math.floor(this.player.duration * 0.001);
    let floredDurationPlayed = Math.floor(this.player.currentTime * 0.001);
    let floredDurationLeft = floredDuration - floredDurationPlayed;

    this.setState({
      durationPlayed: `0:${
        floredDurationPlayed === -1
          ? '00'
          : floredDurationPlayed >= 10
          ? floredDurationPlayed
          : `0${floredDurationPlayed}`
      }`,
      durationLeft: `0:${
        floredDurationLeft >= 10 ? floredDurationLeft : `0${floredDurationLeft}`
      }`,
    });
  }

  forwardTenSecond = () => {
    this.player.seek(this.player.currentTime + 10000, () => {
      this.updateState();
    });
  };

  stopPlaying = () => {
    this.player.stop((error) => {});
  };

  // componentDidMount() {
  //   this.props.onRef(this);
  //   this._isMounted = true;
  //   this.setState({
  //     loading: true,
  //   });
  //   this.soundPlayer = null;
  //   this.progressInterval = null;
  //   this.loadPlayer();
  //   this._blur = this.props.navigation.addListener('blur', () => {
  //     this._isMounted = false;
  //     this.soundPlayer.stop();
  //     this.stopUpdateProgressBar();
  //   });

  //   this._unsubscribe = this.props.navigation.addListener('focus', () => {
  //     this._isMounted = true;
  //     this.setState({
  //       isPlaying: false,
  //       progress: 0,
  //       durationPlayed: `0:00`,
  //       durationLeft: `0:00`,
  //     });
  //   });
  // }

  // componentWillUnmount() {
  //   this.props.onRef(undefined);
  //   this._isMounted = false;
  //   this.soundPlayer.stop();
  //   this.stopUpdateProgressBar();
  //   this._blur;
  //   this._unsubscribe();
  // }

  // seek(percentage) {
  //   let position = percentage * this.soundPlayer.getDuration();

  //   this.setState({
  //     progress: percentage,
  //   });
  //   this.soundPlayer.setCurrentTime(position);
  //   Platform.OS === 'ios' && this.playRecording(false, true);
  // }

  // forwardTenSecond() {
  //   this.soundPlayer.getCurrentTime((seconds) => {
  //     this.soundPlayer.setCurrentTime(seconds + 10);
  //   });
  // }

  // getDuration() {
  //   this.soundPlayer.getCurrentTime((seconds) => {
  //     let floredSecondPlayed = Math.floor(seconds);
  //     let floredSecondLeft =
  //       Math.floor(this.soundPlayer.getDuration()) - floredSecondPlayed;

  //     if (floredSecondPlayed < 10) {
  //       floredSecondPlayed = `0${floredSecondPlayed}`;
  //     }

  //     if (floredSecondLeft < 10) {
  //       floredSecondLeft = `0${floredSecondLeft}`;
  //     }

  //     this.setState({
  //       durationPlayed: `0:${floredSecondPlayed}`,
  //       durationLeft: `0:${floredSecondLeft}`,
  //     });
  //   });
  // }

  // updateProgressBar() {
  //   this.progressInterval = setInterval(() => {
  //     this.soundPlayer.getCurrentTime((seconds) => {
  //       if (this.props.isRecorderModalOpen || this.props.openAddResponse) {
  //         this.playRecording(true);
  //       }

  //       if (Math.floor(seconds) === Math.floor(this.soundPlayer.getDuration())) {
  //         this.stopUpdateProgressBar();
  //         this.setState({
  //           isPlaying: false,
  //           progress: 0,
  //         });
  //         if (this.props.isNextPlayerAvailable) {
  //           this.props.nextPlayerFunction();
  //           this.props.updateFromNextPreviousButton(true);
  //         }
  //       }

  //       this.getDuration();
  //       let currentProgress =
  //         Math.max(0, seconds) / this.soundPlayer.getDuration();
  //       if (this._isMounted) {
  //         this.setState({
  //           progress: currentProgress,
  //         });
  //       }
  //     });
  //   }, 100);
  // }

  // stopUpdateProgressBar() {
  //   clearInterval(this.progressInterval);
  // }

  // loadPlayer() {
  //   this.soundPlayer = new Sound(this.props.recordingFile, '', (error) => {
  //     if (error) {
  //       console.log(error);
  //     }

  //     if (this._isMounted) {
  //       this.setState({
  //         loading: false,
  //       });
  //       this.getDuration();

  //       if (
  //         this.props.cardIndex !== 'discussion' &&
  //         this.props.cardIndex !== 'response'
  //       ) {
  //         this.playRecording();
  //       }
  //       if (this.props.fromNextPreviousButton && this._isMounted) {
  //         this.playRecording();
  //         this.props.updateFromNextPreviousButton(false);
  //       }
  //     }
  //   });
  // }

  // playRecording = async (isPlaying, fromSeek) => {
  //   if (isPlaying) {
  //     this.soundPlayer.pause(() => {
  //       this.setState({
  //         isPlaying: false,
  //         isPaused: true,
  //       });
  //     });
  //     this.stopUpdateProgressBar();
  //   } else {
  //     if (!this.state.isPaused) {
  //       this.props.playCounter();
  //     }
  //     this.setState({
  //       isPlaying: true,
  //       isPaused: false,
  //     });
  //     this.updateProgressBar();
  //     this.soundPlayer.play((success) => {
  //       // if (!fromSeek) {
  //       //   this.setState({
  //       //     isPlaying: false,
  //       //     progress: 0,
  //       //   });

  //       //   this.stopUpdateProgressBar();

  //       //   if (this.props.isNextPlayerAvailable) {
  //       //     this.props.nextPlayerFunction();
  //       //     this.props.updateFromNextPreviousButton(true);
  //       //   }
  //       // }
  //     });
  //   }
  // };

  render() {
    return (
      <View style={{ ...this.props.customStyle }}>
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
          onValueChange={(percentage) => this.seek(percentage)}
        />
        <View style={styles.playerContainerStyle}>
          <PlayerSpeed />
          <TouchableOpacity
            onPress={() =>
              this.props.isPreviousPlayerAvailable &&
              (this.props.previousPlayerFunction(),
              this.props.updateFromNextPreviousButton(true))
            }
            disabled={this.props.isPreviousPlayerAvailable ? false : true}>
            {this.props.isPreviousPlayerAvailable ? (
              <ActivePreviousButton />
            ) : (
              <PreviousButton />
            )}
          </TouchableOpacity>
          {this.state.loading ? (
            <LoadingSpinner loadingSpinnerForComponent={true} />
          ) : (
            <TouchableOpacity
              onPress={() => {
                this.playRecording();
              }}>
              {!this.state.isPlaying ? <ActivePlayButton /> : <PauseButton />}
            </TouchableOpacity>
          )}
          <TouchableOpacity
            onPress={() =>
              this.props.isNextPlayerAvailable &&
              (this.props.nextPlayerFunction(),
              this.props.updateFromNextPreviousButton(true))
            }
            disabled={this.props.isNextPlayerAvailable ? false : true}>
            {this.props.isNextPlayerAvailable ? (
              <ActiveNextButton />
            ) : (
              <NextButton />
            )}
          </TouchableOpacity>
          <TouchableOpacity onPress={() => this.forwardTenSecond()}>
            <ForwardTenButton />
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  playerContainerStyle: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: '8%',
  },

  durationContainerStyle: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
});

export default RecordPlayer;
