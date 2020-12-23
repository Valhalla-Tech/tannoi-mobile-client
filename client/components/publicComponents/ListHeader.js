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
    isSort,
    headerButton,
    customStyle,
    useSeeAllButton,
    navigation,
    sectionType,
    sectionQuery,
    queryId,
    openModal,
    currentSort
  } = props;

  const ListSort = () => {
    return (
      <TouchableOpacity onPress={() => openModal()} style={styles.filterStyle}>
        <Text style={styles.filterTextStyle}>{currentSort}</Text>
        <DownArrow />
      </TouchableOpacity>
    );
  };

  const SeeAllButton = () => {
    return (
      <TouchableOpacity onPress={() => navigation.navigate('HomeSectionDetailScreen', {
        sectionTitle: listTitle,
        sectionType: sectionType,
        sectionQuery: sectionQuery,
        queryId: queryId
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
          isSort && (
            <ListSort />
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
    paddingHorizontal: "3.5%",
    height: 50
  },

  headerTitleStyle: {
    fontSize: 16.5,
    fontFamily: bold,
    color: "#FFFFFF",
    marginVertical: "4%"
  },

  filterStyle: {
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
