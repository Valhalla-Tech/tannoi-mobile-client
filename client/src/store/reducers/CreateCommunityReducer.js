const defaultState = {
  communityImage: '',
  communityName: '',
  communityDescription: '',
  communityGuideline: '',
  communityType: '',
};

const reducer = (state = defaultState, action) => {
  switch (action.type) {
    case 'ADD_NAME':
      let setCommunityImage = action.payload.communityImage;
      let setCommunityName = action.payload.communityName;

      return {...state, communityImage: setCommunityImage, communityName: setCommunityName};
    case 'ADD_DESCRIPTION':
      let setCommunityDescription = action.payload.communityDescription;

      return {...state, communityDescription: setCommunityDescription};
    case 'ADD_GUIDELINE':
      let setCommunityGuideline = action.payload.communityGuideline;
      let setCommunityType = action.payload.communityType;

      return {
        ...state,
        communityGuideline: setCommunityGuideline,
        communityType: setCommunityType,
      };
    case 'CLEAR_CREATE_COMMUNITY_DATA':
      return {
        ...state,
        communityImage: '',
        communityName: '',
        communityDescription: '',
        communityGuideline: '',
        communityType: '',
      }
    default:
      return state;
  }
};

export default reducer;
