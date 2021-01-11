import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity
} from 'react-native';
import {
  Player
} from '@react-native-community/audio-toolkit';
import Slider from '@react-native-community/slider';

//Icons
import PlayerSpeed from '../../assets/topicAssets/playerSpeed.svg';
import PreviousButton from '../../assets/topicAssets/notActivePreviousButton.svg';
import NextButton from '../../assets/topicAssets/notActiveNextButton.svg';
import ActivePlayButton from '../../assets/topicAssets/activePlayButton.svg';
import PauseButton from '../../assets/topicAssets/pauseButton.svg';
import ForwardTenButton from '../../assets/topicAssets/forwardTenButton.svg';

const RecordPlayer = props => {
  const {
    customStyle,
    recordingFile
  } = props;

  const [playPauseButton, setPlayPauseButton] = useState('Play');
  const [playButtonDisabled, setPlayButtonDisabled] = useState(true);

  let player = null;

  useEffect(() => {
    loadPLayer();
  }, []);

  const updateState = () => {
    setPlayPauseButton(player && player.isPlaying ? 'Pause' : 'Play');
    setPlayButtonDisabled(!player || !player.canPlay ? true : false);
  };

  const loadPLayer = () => {
    if (player) {
      player.destroy();
    }

    player = new Player(recordingFile, {
      autoDestroy: false
    });

    player.speed = 0.0;

    player.prepare((error) => {
      if (error) {
        console.log(error);
      }
      console.log(player)
      updateState();
    });

    player.on('ended', () => {
      updateState();
    });

    player.on('pause', () => {
      updateState();
    });
  }

  const playRecording = () => {
    // console.log(player)
    player.playPause((error, paused) => {
      if (error) {
        console.log(error);
        // loadPLayer();
        // updateState();
      }

      // updateState();
    });
  };

  return (
    <View style={{...customStyle}}>
      <Slider

      />
      <View style={styles.playerContainerStyle}>
        <PlayerSpeed />
        <TouchableOpacity>
          <PreviousButton />
        </TouchableOpacity>
        {/* {
          playButtonDisabled ? <Text>Loading</Text> : ( */}
            <TouchableOpacity onPress={() => playRecording()}>
              <ActivePlayButton />
            </TouchableOpacity>
          {/* ) */}
        {/* } */}
        <TouchableOpacity>
          <NextButton />
        </TouchableOpacity>
        <TouchableOpacity>
          <ForwardTenButton />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  playerContainerStyle: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: "8%"
  }
});

export default RecordPlayer;