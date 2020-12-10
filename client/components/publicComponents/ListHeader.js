import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity
} from 'react-native';
import { bold } from '../../assets/FontSize';

//Icon
import DownArrow from '../../assets/homeAssets/downArrow.svg';

//Component
import Header from '../../components/publicComponents/Header';

const ListHeader = props => {
  const {
    listTitle,
    isFilter,
    headerButton,
    customStyle
  } = props;

  const ListFilter = () => {
    return (
      <TouchableOpacity style={styles.filterStyle}>
        <Text style={styles.filterTextStyle}>Most recent</Text>
        <DownArrow />
      </TouchableOpacity>
    );
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
    paddingHorizontal: "2%",
    height: 50
  },

  headerTitleStyle: {
    fontSize: 18,
    fontFamily: bold,
    color: "#FFFFFF",
    marginVertical: "4%",
    marginLeft: "2.5%"
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
  }
});

export default ListHeader;
