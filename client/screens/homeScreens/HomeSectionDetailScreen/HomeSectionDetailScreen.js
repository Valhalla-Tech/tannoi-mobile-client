import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet
} from 'react-native';
import { bold, normal } from '../../../assets/FontSize';

//Components
import Header from '../../../components/publicComponents/Header';
import List from '../../../components/publicComponents/List';
import BackButton from '../../../components/publicComponents/BackButton';

const HomeSectionDetailScreen = ({ navigation, route }) => {
  const { sectionTitle } = route.params;

  const HeaderContent = () => {
    return (
      <View style={styles.headerTitleAndButtonContainerStyle}>
        <BackButton
          navigation={navigation}
          styleOption={{
            marginTop: 0,
            marginBottom: 0
          }}
        />
        <Text style={styles.headerTitleStyle}>{sectionTitle}</Text>
      </View>
    )
  };

  return (
    <View>
      <Header
        child={HeaderContent}
        customStyle={styles.headerStyle}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  headerStyle: {
    paddingHorizontal: "5%",
    paddingVertical: "3.5%"
  },

  headerTitleAndButtonContainerStyle: {
    flexDirection: "row",
    alignItems: "center"
  },

  headerTitleStyle: {
    marginLeft: "3%",
    fontFamily: bold,
    fontSize: 20,
    color: "#464D60"
  }
});

export default HomeSectionDetailScreen;