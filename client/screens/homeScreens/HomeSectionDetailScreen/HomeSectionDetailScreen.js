import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  FlatList
} from 'react-native';
import { bold, normal } from '../../../assets/FontSize';
import { GlobalPadding } from '../../../constants/Size';
import { useSelector, useDispatch } from 'react-redux';
import { getAllDiscussion, clearDiscussion } from '../../../store/actions/DiscussionAction';

//Components
import Header from '../../../components/publicComponents/Header';
import List from '../../../components/publicComponents/List';
import BackButton from '../../../components/publicComponents/BackButton';
import ListHeader from '../../../components/publicComponents/ListHeader';
import Modal from '../../../components/publicComponents/Modal';

const HomeSectionDetailScreen = ({ navigation, route }) => {
  const discussions = useSelector(state => state.DiscussionReducer.discussions);
  const discussionCount = useSelector(state => state.DiscussionReducer.discussionCount);

  const [sortModal, setSortModal] = useState(false);
  const [selectedSort, setSelectedSort] = useState('newest');
  const [currentPage, setCurrentPage] = useState(1);
  const [sortName, setSortName] = useState('Newest');

  const { sectionTitle, sectionType, sectionQuery, queryId } = route.params;
  const dispatch = useDispatch();


  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      if (sectionType === 'discussion') {
        dispatch(getAllDiscussion(sectionQuery ? sectionQuery : null, queryId ? queryId : null, null, null));
      }      
    });

    const clearListDiscussion = () => {
      dispatch(clearDiscussion());
    };

    return (unsubscribe, clearListDiscussion)
  }, [navigation]);

  const openModal = () => {
    setSortModal(true);
  };

  const closeModal = () => {
    setSortModal(false);
  };

  const saveSort = (value, name) => {
    setSelectedSort(value);
    setSortName(name);
    setCurrentPage(1);
    dispatch(clearDiscussion());
    dispatch(getAllDiscussion(sectionQuery ? sectionQuery : null, queryId ? queryId : null, value, 1));
    closeModal();
  }

  const nextPage = () => {
    setCurrentPage(prevState => prevState + 1);
    dispatch(getAllDiscussion(null, null, selectedSort, currentPage + 1));
  };

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

  const ModalButton = (title, value) => {
    return (
      <TouchableOpacity 
        onPress={() => {
          saveSort(value, title);
        }} 
        style={styles.modalButtonStyle}
      >
        <Text style={styles.modalButtonTextStyle}>{title}</Text>
      </TouchableOpacity>
    );
  };

  const ModalContent = () => {
    return (
      <View style={styles.modalContenStyle}>
        <View style={styles.modalHeaderStyle}>
          <Text style={styles.modalHeaderTextStyle}>Sort by</Text>
        </View>
        <View style={styles.modalButtonContainerStyle}>
          {ModalButton('Newest', 'newest')}
          {ModalButton('Votes', 'like')}
          {ModalButton('Plays', 'view')}
          {ModalButton('Best mood', 'best_mood')}
          {ModalButton('Worst mood', 'worst_mood')}
        </View>
      </View>
    );
  };

  return (
    <View>
      <Header
        child={HeaderContent}
        customStyle={styles.headerStyle}
      />
      <View style={styles.listHeaderContainerStyle}>
        <ListHeader 
          customStyle={{
            marginTop: "2%"
          }} 
          isFilter={true}
          openModal={openModal}
          closeModal={closeModal}
          isSort={true}
          currentSort={sortName}
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
                borderBottomRightRadius: 8
              }}
              useMoreButton={discussionCount > 10 && discussions.length < discussionCount && true}
              moreButtonFunction={nextPage}
            />
          </View>
        }
      />
      <Modal
        openModal={sortModal}
        animation="slide"
        closeModal={closeModal}
        customContainerStyle={{
          justifyContent: "flex-end"
        }}
        customStyle={{
          borderRadius: 0,
          width: "100%",
          height: "45%",
          borderTopLeftRadius: 30,
          borderTopRightRadius: 30,
          justifyContent: "flex-start",
          alignItems: "flex-start"
        }}
        child={ModalContent}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  headerStyle: {
    paddingHorizontal: "3%",
    paddingVertical: "3.5%",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center"
  },

  headerTitleAndButtonContainerStyle: {
    flexDirection: "row",
    alignItems: "center"
  },

  headerTitleStyle: {
    marginLeft: "5%",
    fontFamily: bold,
    fontSize: 20,
    color: "#464D60"
  },

  listHeaderContainerStyle: {
    paddingHorizontal: GlobalPadding
  },

  cardContainerStyle: {
    paddingHorizontal: GlobalPadding,
    paddingBottom: "30%"
  },

  modalContenStyle: {
    flex: 1,
    width: "100%"
  },

  modalHeaderStyle: {
    paddingHorizontal: "2%"
  },

  modalHeaderTextStyle: {
    fontFamily: bold,
    color: "#6505E1",
    fontSize: 20
  },

  modalButtonContainerStyle: {
    width: "100%",
    marginTop: "2%"
  },

  modalButtonStyle: {
    width: "100%",
    paddingVertical: "2%",
    paddingHorizontal: "2%"
  },
  
  modalButtonTextStyle: {
    fontFamily: bold,
    fontSize: 16,
    color: "#464D60"
  }
});

export default HomeSectionDetailScreen;