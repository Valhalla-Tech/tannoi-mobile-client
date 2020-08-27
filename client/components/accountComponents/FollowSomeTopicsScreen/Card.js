import React from 'react';
import {
  StyleSheet,
  View,
  Text,
  Image,
  TouchableOpacity
} from 'react-native';

import testImage from '../../../assets/PublicAsset/base.png';

const Card = props => {
  const { 
    cardData, 
    isEmpty,
    isSelected,
    selectTopic,
    deselectTopic,
    topicKey
  } = props;

  if (!isEmpty) {
    return (
      <>
        {
          isSelected(topicKey) ? (
            <TouchableOpacity 
              style={{...styles.cardContainerStyle, backgroundColor: "#5152D0"}}
              onPress={() => {
                deselectTopic(topicKey)
              }}
            >
              <Image source={testImage} style={styles.cardImageStyle} />
              <Text style={{...styles.cardTitleStyle, color: "#FFFFFF"}}>{cardData}</Text>
            </TouchableOpacity>
          ) : (
            <TouchableOpacity 
              style={{...styles.cardContainerStyle}}
              onPress={() => {
                selectTopic(topicKey)
              }}
            >
              <Image source={testImage} style={styles.cardImageStyle} />
              <Text style={{...styles.cardTitleStyle, color: "#464D60"}}>{cardData}</Text>
            </TouchableOpacity>
          )
        }
      </>
    );
  } else {
    return (
      <View style={{...styles.cardContainerStyle, backgroundColor: "transparent"}}></View>
    )
  }

};

const styles = StyleSheet.create({
  cardContainerStyle: {
    flex: 1,
    height: 168,
    margin: 2,
    marginBottom: 24,
    padding: 2.5,
    borderRadius: 5
  },

  cardImageStyle: {
    height: 128, 
    width: "100%", 
    resizeMode: "stretch"
  },

  cardTitleStyle: {
    textAlign: "center", 
    marginVertical: 8, 
    fontSize: 16
  }
});

export default Card;