const defaultState = {
  userCommunity: '',
  communityProfile: '',
};

const reducer = (state = defaultState, action) => {
  switch (action.type) {
    case 'GET_USER_COMMUNITY':
      let setUserCommunity = action.payload.userCommunity;

      return { ...state, userCommunity: setUserCommunity };
    case 'GET_ONE_COMMUNITY':
      let setCommunityProfile = action.payload.communityProfile;

      return { ...state, communityProfile: setCommunityProfile };
    case 'CLEAR_COMMUNITY_PROFILE':
      return { ...state, communityProfile: '' };
    case 'CLEAR_USER_COMMUNITY':
      return { ...state, userCommunity: '' };
    default:
      return state;
  }
};

export default reducer;
