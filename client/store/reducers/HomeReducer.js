const defaultState = {
  user: '',
  discussionOfTheWeek: '',
  topUser: '',
  trending: '',
  recommendedTopic: ''
};

const reducer = (state = defaultState, action) => {
  switch (action.type) {
    case 'GET_HOME':
      let setUser = action.payload.user;
      let setDiscussionOfTheWeek = action.payload.discussionOfTheWeek;
      let setTopUser = action.payload.topUser;
      let setTrending = action.payload.trending;
      let setRecommendedTopic = action.payload.recommendedTopic;
      
      return {
        ...state, 
        user: setUser, 
        discussionOfTheWeek: setDiscussionOfTheWeek, 
        topUser: setTopUser, 
        trending: setTrending, 
        recommendedTopic: setRecommendedTopic
      };
    case 'CLEAR_HOME':
      return {
        ...state,
        user: '',
        discussionOfTheWeek: '',
        topUser: '',
        trending: '',
        recommendedTopic: ''
      }
    default:
      return state;
  }
};

export default reducer;