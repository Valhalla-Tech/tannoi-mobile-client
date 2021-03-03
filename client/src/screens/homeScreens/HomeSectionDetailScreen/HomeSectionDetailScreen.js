import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  FlatList,
} from 'react-native';
import { bold, normal } from '../../../assets/FontSize';
import { GlobalPadding } from '../../../constants/Size';
import { CalculateHeight } from '../../../helper/CalculateSize';
import { useSelector, useDispatch } from 'react-redux';
import {
  getAllDiscussion,
  clearDiscussion,
} from '../../../store/actions/DiscussionAction';

//Components
import ScreenContainer from '../../../components/publicComponents/ScreenContainer';
import Header from '../../../components/publicComponents/Header';
import List from '../../../components/publicComponents/List';
import BackButton from '../../../components/publicComponents/BackButton';
import ListHeader from '../../../components/publicComponents/ListHeader';

const HomeSectionDetailScreen = ({ navigation, route }) => {
  const discussions = useSelector(
    (state) => state.DiscussionReducer.discussions,
  );
  const discussionCount = useSelector(
    (state) => state.DiscussionReducer.discussionCount,
  );

  const [selectedSort, setSelectedSort] = useState('newest');
  const [currentPage, setCurrentPage] = useState(1);

  const { sectionTitle, sectionQuery, queryId } = route.params;

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(
      getAllDiscussion(
        sectionQuery ? sectionQuery : null,
        queryId ? queryId : null,
        null,
        null,
      ),
    );
  }, [navigation]);

  const clearListDiscussion = () => {
    dispatch(clearDiscussion(null, true));
  };

  const changeSelectedSort = (input) => {
    setSelectedSort(input);
  };

  const changeCurrentPage = (input) => {
    setCurrentPage(input);
  };

  const HeaderContent = () => {
    return (
      <View style={styles.headerTitleAndButtonContainerStyle}>
        <BackButton
          navigation={navigation}
          styleOption={{
            marginTop: 0,
            marginBottom: 0,
          }}
          buttonOption={clearListDiscussion}
        />
        <Text style={styles.headerTitleStyle}>{sectionTitle}</Text>
      </View>
    );
  };

  return (
    <ScreenContainer>
      <Header child={HeaderContent} customStyle={styles.headerStyle} />
      <View style={styles.listHeaderContainerStyle}>
        <ListHeader
          customStyle={{
            marginTop: '2%',
          }}
          isFilter={true}
          isSort={true}
          sectionQuery={sectionQuery}
          queryId={queryId}
          changeCurrentPage={changeCurrentPage}
          changeSelectedSort={changeSelectedSort}
        />
      </View>
      <FlatList
        ListHeaderComponent={
          <View style={styles.cardContainerStyle}>
            <List
              isSort={true}
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
              sectionQuery={sectionQuery}
              queryId={queryId}
              selectedSort={selectedSort}
              currentPage={currentPage}
              changeCurrentPage={changeCurrentPage}
            />
          </View>
        }
      />
    </ScreenContainer>
  );
};

const styles = StyleSheet.create({
  headerStyle: {
    paddingHorizontal: '3%',
    paddingVertical: '3.5%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },

  headerTitleAndButtonContainerStyle: {
    flexDirection: 'row',
    alignItems: 'center',
  },

  headerTitleStyle: {
    marginLeft: '5%',
    fontFamily: bold,
    fontSize: CalculateHeight(2.5),
    color: '#464D60',
  },

  listHeaderContainerStyle: {
    paddingHorizontal: GlobalPadding,
  },

  cardContainerStyle: {
    paddingHorizontal: GlobalPadding,
  },
});

export default HomeSectionDetailScreen;
