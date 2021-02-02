const defaultState = {
  user: '',
  discussionOfTheWeek: '',
  topUser: '',
  trending: '',
  recommendedTopic: '',
  followingDiscussion: '',
  requestedDiscussion: '',
  topHashtag: '',
};

const reducer = (state = defaultState, action) => {
  switch (action.type) {
    case 'GET_HOME':
      let setUser = action.payload.user;
      let setDiscussionOfTheWeek = action.payload.discussionOfTheWeek;
      let setTopUser = action.payload.topUser;
      let setTrending = action.payload.trending;
      let setRecommendedTopic = action.payload.recommendedTopic;
      let setFollowingDiscussion = action.payload.followingDiscussion;
      let setRequestedDiscussion = action.payload.requestedDiscussion;
      let setTopHashtag = action.payload.topHashtag;

      return {
        ...state,
        user: setUser,
        discussionOfTheWeek: setDiscussionOfTheWeek,
        topUser: setTopUser,
        trending: setTrending,
        recommendedTopic: setRecommendedTopic,
        followingDiscussion: setFollowingDiscussion,
        requestedDiscussion: setRequestedDiscussion,
        topHashtag: setTopHashtag,
      };
    case 'CLEAR_HOME':
      return {
        ...state,
        user: '',
        discussionOfTheWeek: '',
        topUser: '',
        trending: '',
        recommendedTopic: '',
        followingDiscussion: '',
        requestedDiscussion: '',
      };
    default:
      return state;
  }
};

export default reducer;
