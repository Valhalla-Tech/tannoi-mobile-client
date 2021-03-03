import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  FlatList,
} from 'react-native';
import { bold, normal } from '../../../assets/FontSize';
import { useSelector, useDispatch } from 'react-redux';
import { CalculateHeight } from '../../../helper/CalculateSize';
import {
  getAllDiscussion,
  clearDiscussion,
} from '../../../store/actions/DiscussionAction';
import { GlobalPadding } from '../../../constants/Size';

//Components
import ScreenContainer from '../../../components/publicComponents/ScreenContainer';
import Header from '../../../components/publicComponents/Header';
import List from '../../../components/publicComponents/List';
import BackButton from '../../../components/publicComponents/BackButton';
import ListHeader from '../../../components/publicComponents/ListHeader';

const HashtagDetailScreen = ({ route, navigation }) => {
  const { query, queryId, hashtagDetailTitle } = route.params;

  const discussions = useSelector(
    (state) => state.DiscussionReducer.discussions,
  );
  const discussionCount = useSelector(
    (state) => state.DiscussionReducer.discussionCount,
  );

  const dispatch = useDispatch();

  const [selectedSort, setSelectedSort] = useState('newest');
  const [currentPage, setCurrentPage] = useState(1);

  const changeSelectedSort = (input) => {
    setSelectedSort(input);
  };

  const changeCurrentPage = (input) => {
    setCurrentPage(input);
  };

  useEffect(() => {
    dispatch(getAllDiscussion(query, queryId, null, null));
  }, [navigation]);

  const clearDiscussionList = () => {
    dispatch(clearDiscussion(null, true));
  };

  const HeaderContent = () => {
    return (
      <>
        <BackButton
          navigation={navigation}
          styleOption={{
            marginTop: 0,
            marginBottom: 0,
          }}
          buttonOption={clearDiscussionList}
        />
        <Text style={styles.headerTitleStyle}>{hashtagDetailTitle}</Text>
      </>
    );
  };

  return (
    <ScreenContainer>
      <Header child={HeaderContent} customStyle={styles.headerStyle} />
      <View style={styles.hashtagDetailContainerStyle}>
        <ListHeader
          customStyle={{
            marginTop: '2%',
          }}
          isFilter={true}
          isSort={true}
          sectionQuery={query}
          queryId={queryId}
          changeCurrentPage={changeCurrentPage}
          changeSelectedSort={changeSelectedSort}
        />
        <FlatList
          ListHeaderComponent={
            <List
              listData={discussions}
              navigation={navigation}
              isHeader={false}
              customStyle={{
                marginTop: 0,
                borderRadius: 0,
                borderBottomLeftRadius: 8,
                borderBottomRightRadius: 8,
                marginBottom: '35%',
              }}
              useMoreButton={
                discussionCount > 10 &&
                discussions.length < discussionCount &&
                true
              }
              sectionQuery={query}
              queryId={queryId}
              selectedSort={selectedSort}
              currentPage={currentPage}
              changeCurrentPage={changeCurrentPage}
            />
          }
        />
      </View>
    </ScreenContainer>
  );
};

const styles = StyleSheet.create({
  headerStyle: {
    flexDirection: 'row',
    paddingHorizontal: '3%',
    paddingVertical: '3.5%',
    alignItems: 'center',
  },

  headerTitleStyle: {
    marginLeft: '5%',
    fontFamily: bold,
    fontSize: CalculateHeight(2.5),
    color: '#464D60',
  },

  hashtagDetailContainerStyle: {
    paddingHorizontal: GlobalPadding,
  },
});

export default HashtagDetailScreen;
