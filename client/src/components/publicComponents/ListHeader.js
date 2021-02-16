import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { bold, normal } from '../../assets/FontSize';
import { useDispatch } from 'react-redux';
import {
  getAllDiscussion,
  clearDiscussion,
} from '../../store/actions/DiscussionAction';

//Icon
import DownArrow from '../../assets/homeAssets/downArrow.svg';

//Components
import Header from './Header';
import SortModal from './SortModal';

const ListHeader = (props) => {
  const {
    listTitle,
    isSort,
    headerButton,
    customStyle,
    useSeeAllButton,
    navigation,
    sectionQuery,
    queryId,
    changeSelectedSort,
    changeCurrentPage,
  } = props;

  const [openModal, setOpenModal] = useState(false);
  const [currentSort, setCurrentSort] = useState('Newest');

  const dispatch = useDispatch();

  const closeModal = () => {
    setOpenModal(false);
  };

  const ListSort = () => {
    return (
      <TouchableOpacity
        onPress={() => setOpenModal(true)}
        style={styles.filterStyle}>
        <Text style={styles.filterTextStyle}>{currentSort}</Text>
        <DownArrow />
      </TouchableOpacity>
    );
  };

  const saveSort = (value, name) => {
    setCurrentSort(name);
    changeSelectedSort(value);
    changeCurrentPage(1);
    dispatch(clearDiscussion(null, true));
    dispatch(
      getAllDiscussion(
        sectionQuery ? sectionQuery : null,
        queryId ? queryId : null,
        value,
        1,
      ),
    );
    closeModal();
  };

  const SeeAllButton = () => {
    return (
      <TouchableOpacity
        onPress={() =>
          navigation.navigate('HomeSectionDetailScreen', {
            sectionTitle: listTitle,
            sectionQuery: sectionQuery,
            queryId: queryId,
          })
        }>
        <Text style={styles.seeAllButtonTextStyle}>See all</Text>
      </TouchableOpacity>
    );
  };

  const ListHeaderContent = () => {
    return (
      <View style={styles.headerStyle}>
        <Text style={styles.headerTitleStyle}>{listTitle}</Text>
        {isSort && <ListSort />}
        {useSeeAllButton && <SeeAllButton />}
        {headerButton && headerButton()}
      </View>
    );
  };

  return (
    <>
      <Header
        child={ListHeaderContent}
        customStyle={{
          backgroundColor: '#7817FF',
          borderTopLeftRadius: 8,
          borderTopRightRadius: 8,
          ...customStyle,
        }}
      />
      <SortModal
        openModal={openModal}
        closeModal={closeModal}
        saveSort={saveSort}
      />
    </>
  );
};

const styles = StyleSheet.create({
  headerStyle: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: '3.5%',
    height: 50,
  },

  headerTitleStyle: {
    fontSize: 16.5,
    fontFamily: bold,
    color: '#FFFFFF',
    marginVertical: '4%',
  },

  filterStyle: {
    flexDirection: 'row',
    alignItems: 'center',
  },

  filterTextStyle: {
    fontSize: 14,
    color: '#FFFFFF',
    marginRight: '5%',
  },

  seeAllButtonTextStyle: {
    color: '#FFFFFF',
    fontSize: 14,
    fontFamily: normal,
  },
});

export default ListHeader;
