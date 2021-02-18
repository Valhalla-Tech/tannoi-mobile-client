export const addName = (name, image) => {
  return (dispatch) => {
    dispatch({
      type: 'ADD_NAME',
      payload: {
        communityImage: image,
        communityName: name,
      },
    });
  };
};

export const addDescription = (description) => {
  return (dispatch) => {
    dispatch({
      type: 'ADD_DESCRIPTION',
      payload: {
        communityDescription: description,
      },
    });
  };
};

export const addGuideline = (guideline, type) => {
  return (dispatch) => {
    dispatch({
      type: 'ADD_GUIDELINE',
      payload: {
        communityGuideline: guideline,
        communityType: type,
      },
    });
  };
};

export const clearData = () => {
  return (dispatch) => {
    dispatch({
      type: 'CLEAR_CREATE_COMMUNITY_DATA',
    });
  };
};

export const createdCommunityMessage = (changeState) => {
  return (dispatch) => {
    dispatch({
      type: 'CREATED_COMMUNITY_MESSAGE',
      payload: {
        messageStatus: changeState,
      },
    });
  };
};
