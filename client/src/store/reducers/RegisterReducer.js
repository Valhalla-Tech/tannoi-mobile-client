const defaultState = {
  isLoading: false,
  registerData: '',
  topics: [],
  people: [],
  communities: [],
  communityFromCode: '',
  joinCommunityModalIsOpen: false,
};

const reducer = (state = defaultState, action) => {
  switch (action.type) {
    case 'REGISTER/LOADING':
      const { isLoading } = action.payload;
      return { ...state, isLoading: isLoading };
    case 'REGISTER/REGISTER_DATA':
      const { registerData } = action.payload;
      return { ...state, registerData: registerData };
    case 'REGISTER/TOPICS':
      const { topics } = action.payload;
      return { ...state, topics: topics };
    case 'REGISTER/PEOPLE_TO_HEAR':
      const { people } = action.payload;
      return { ...state, people: people };
    case 'REGISTER/COMMUNITIES':
      const { communities } = action.payload;
      return { ...state, communities: communities };
    case 'REGISTER/COMMUNITY_FROM_CODE':
      const { communityFromCode } = action.payload;
      return { ...state, communityFromCode: communityFromCode };
    case 'REGISTER/JOIN_COMMUNITY_MODAL':
      const { joinCommunityModalIsOpen } = action.payload;
      return { ...state, joinCommunityModalIsOpen: joinCommunityModalIsOpen };
    default:
      return state;
  }
};

export default reducer;
