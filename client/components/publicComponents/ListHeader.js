import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity
} from 'react-native';
import { bold, normal } from '../../assets/FontSize';

//Icon
import DownArrow from '../../assets/homeAssets/downArrow.svg';

//Component
import Header from '../../components/publicComponents/Header';

const ListHeader = props => {
  const {
    listTitle,
    isFilter,
    headerButton,
    customStyle,
    useSeeAllButton,
    navigation
  } = props;

  const ListFilter = () => {
    return (
      <TouchableOpacity style={styles.filterStyle}>
        <Text style={styles.filterTextStyle}>Most recent</Text>
        <DownArrow />
      </TouchableOpacity>
    );
  };

  const SeeAllButton = () => {
    return (
      <TouchableOpacity onPress={() => navigation.navigate('HomeSectionDetailScreen', {
        sectionTitle: listTitle
      })}>
        <Text style={styles.seeAllButtonTextStyle}>See all</Text>
      </TouchableOpacity>
    )
  };

  const ListHeaderContent = () => {
    return (
      <View style={styles.headerStyle}>
        <Text style={styles.headerTitleStyle}>{listTitle}</Text>
        {
          isFilter && (
            <ListFilter />
          )
        }
        {
          useSeeAllButton && (
            <SeeAllButton />
          )
        }
        {
          headerButton && headerButton()
        }
      </View>
    );
  };

  return (
    <Header child={ListHeaderContent} customStyle={{backgroundColor: "#7817FF", borderTopLeftRadius: 8, borderTopRightRadius: 8, ...customStyle}} />
  );
};

const styles = StyleSheet.create({
  headerStyle: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: "5%",
    height: 50
  },

  headerTitleStyle: {
    fontSize: 18,
    fontFamily: bold,
    color: "#FFFFFF",
    marginVertical: "4%"
  },

  filterStyle: {
    marginRight: ".8%",
    flexDirection: "row",
    alignItems: "center"
  },

  filterTextStyle: {
    fontSize: 14,
    color: "#FFFFFF",
    marginRight: "5%"
  },

  seeAllButtonTextStyle: {
    color: "#FFFFFF",
    fontSize: 14,
    fontFamily: normal
  },
});

export default ListHeader;
