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

// const RecordPlayer = props => {
//   const {
//     customStyle,
//     recordingFile
//   } = props;

//   const [playPauseButton, setPlayPauseButton] = useState(true);
//   const [playButtonDisabled, setPlayButtonDisabled] = useState(true);
//   const [loading, setLoading] = useState(false);

  // const audioPlayer = new AudioRecorderPlayer();

  // let player = null;

  // useEffect(() => {
    // setLoading(true);
  //   loadPLayer();
  // }, []);

  // const updateState = (currentPosition, duration) => {
  //   setPlayPauseButton(currentPosition !== duration ? false : true);
  // };

  // let audioPlayer = new Sound(recordingFile, Sound.MAIN_BUNDLE, (error) => {
  //   if (error) {
  //     console.log(error);
  //   }

  //   console.log(audioPlayer.getDuration());
  //   setLoading(false);
  // });
  
  // const loadPLayer = () => {
  //   setLoading(true);
  //   audioPlayer;
    // if (player) {
    //   player.destroy();
    // }

    // player = new Player(recordingFile, {
    //   autoDestroy: false
    // });

    // player.speed = 0.0;

    // player.prepare((error) => {
    //   if (error) {
    //     console.log(error);
    //   }
    //   console.log(player)
    //   updateState();
    // });

    // player.on('ended', () => {
    //   updateState();
    // });

    // player.on('pause', () => {
    //   updateState();
    // });
  // }

  // const playRecording = async (isPlaying) => {
  //   if (isPlaying) {
  //     audioPlayer.pause();
  //     // setPlayPauseButton(true);
  //   } else {
  //     setPlayPauseButton(false);
  //     audioPlayer.play(success => {
  //       setPlayPauseButton(true);
  //       audioPlayer.getCurrentTime((seconds) => console.log('at ' + seconds));
  //     });
  //   }
    // loader(async () => {
    //   try {
    //     const play = await audioPlayer.startPlayer(recordingFile);
  
    //     if (play) {
    //       setLoading(false);
  
    //       audioPlayer.addPlayBackListener((e) => {
    //         if (e.current_position === e.duration) {
    //           setPlayPauseButton(true);
    //           audioPlayer.stopPlayer();
    //         } else {
    //           updateState(e.currentPosition, e.duration);
    //         }
    
    //         return;
    //       });
    //     }
    //   } catch (error) {
    //     console.log(error);
    //   }
    // });
    // console.log(player)
    // player.playPause((error, paused) => {
    //   if (error) {
    //     console.log(error);
    //     loadPLayer();
    //     updateState();
    //   }

    //   updateState();
    // });
//   };

//   return (
//     <View style={{...customStyle}}>
//       <Slider

//       />
//       <View style={styles.playerContainerStyle}>
//         <PlayerSpeed />
//         <TouchableOpacity>
//           <PreviousButton />
//         </TouchableOpacity>
//         {
//           loading ? <Text>Loading</Text> : (
//             <TouchableOpacity onPress={() => playRecording(!playPauseButton ? true : false)}>
//               {
//                 playPauseButton ? <ActivePlayButton /> : <PauseButton />
//               }
//             </TouchableOpacity>
//           )
//         }
//         <TouchableOpacity>
//           <NextButton />
//         </TouchableOpacity>
//         <TouchableOpacity>
//           <ForwardTenButton />
//         </TouchableOpacity>
//       </View>
//     </View>
//   );
// };

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
      this.soundPlayer.getCurrentTime(second => {
        if (this.props.isRecorderModalOpen || this.props.openAddResponse) {
          this.playRecording(this.state.isPlaying);
        }
        this.getDuration();
        let currentProgress = Math.max(0, second) / this.soundPlayer.getDuration();
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
          isPlaying: false
        });
        this.setState({
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