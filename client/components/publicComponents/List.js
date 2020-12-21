import React from 'react';
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  FlatList
} from 'react-native';

//Components
import HomeListCard from './ListCard';
import LoadingSpinner from './LoadingSpinner';
import Card from './Card';
import ListHeader from './ListHeader';

const HomeList = props => {
  const { 
    listTitle, 
    listData,
    navigation,
    openModal,
    isFilter,
    isUsingMoreButton,
    isHeader = true,
    customStyle,
    useSeeAllButton
  } = props;

  const MoreButton = () => {
    return (
      <View style={styles.moreButtonContainerStyle}>
        <TouchableOpacity onPress={() => console.log('pressed')} style={styles.moreButton}>
          <Text style={styles.moreButtonTextStyle}>More</Text>
        </TouchableOpacity>
      </View>
    );
  };

  const HomeListContent = () => {
    return (
      <View>
        {
          isHeader && <ListHeader
            listTitle={listTitle}
            isFilter={isFilter}
            istTitle={listTitle}
            useSeeAllButton={useSeeAllButton}
            navigation={navigation}
          />
        }
        {
          !listData ? (
            <LoadingSpinner loadingSpinnerForComponent={true} />
          ) : (
            <>
              <FlatList
                data={listData}
                listKey={(item, index) => index.toString()}
                keyExtractor={(item, index) => index.toString()}
                renderItem={itemData => (
                  <View style={styles.listCardContainerStyle}>
                    <HomeListCard
                      imageUrl={itemData.item.creator.profile_photo_path}
                      recordingFile={itemData.item.voice_note_path}
                      name={itemData.item.creator.name}
                      title={itemData.item.title}
                      votes={itemData.item.likes}
                      replies={itemData.item.response_count}
                      plays={itemData.item.play_count}
                      postTime={itemData.item.created_at}
                      discussionId={itemData.item.id}
                      navigation={navigation}
                      topic={itemData.item.topic ? itemData.item.topic.name : ''}
                      isBorder={itemData.index === listData.length - 1 ? false : true}
                      discussionType={itemData.item.type}
                      openModal={openModal}
                      isAuthorized={itemData.item.isAuthorized}
                      profileType={itemData.item.creator.type}
                    />
                  </View>
                )}
              />
            </>
          )
        }
        {
          isUsingMoreButton && <MoreButton />
        }
      </View>
    );
  }

  return (
    <Card child={HomeListContent} customStyle={styles.homeListContainerStyle} />
  );
};

const styles = StyleSheet.create({
  homeListContainerStyle: {
    backgroundColor: "#FFFFFF",
    marginTop: "2%",
    marginBottom: "3.5%",
    borderRadius: 8,
    paddingBottom: "6.5%"
  },

  listCardContainerStyle: {
    paddingHorizontal: "5%"
  },

  moreButtonContainerStyle: {
    flex: 1,
    alignItems: "center"
  },

  moreButton: {
    position: "absolute",
    borderWidth: 1.5, 
    borderColor: "#5152D0", 
    paddingHorizontal: 20, 
    paddingVertical: 4, 
    borderRadius: 25,
    top: 10,
    backgroundColor: "#FFFFFF"
  },

  moreButtonTextStyle: {
    color: "#5152D0", 
    fontSize: 14
  }
});

export default HomeList;