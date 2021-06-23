export const setCommunityButtonProperties = (data) => {
    const { x, y, width, height } = data;
    return (dispatch) => {
      dispatch({
        type: 'SET_COMMUNITY_BUTTON_PROPERTIES',
        payload: {
          x,
          y,
          width,
          height,
        },
      });
    };
};

export const setNewDiscussionButtonProperties = (data) => {
  const { x, y, width, height, borderRadius } = data;
  return (dispatch) => {
    dispatch({
      type: 'SET_NEW_DISCUSSION_BUTTON_PROPERTIES',
      payload: {
        x,
        y,
        width,
        height,
        borderRadius,
      },
    });
  };
};

export const setTopicButtonProperties = (data) => {
  const { x, y, width, height, borderRadius } = data;
  return (dispatch) => {
    dispatch({
      type: 'SET_TOPIC_BUTTON_PROPERTIES',
      payload: {
        x,
        y,
        width,
        height,
        borderRadius,
      },
    });
  };
};

export const setHomeButtonProperties = (data) => {
  const { x, y, width, height, borderRadius } = data;
  return (dispatch) => {
    dispatch({
      type: 'SET_HOME_BUTTON_PROPERTIES',
      payload: {
        x,
        y,
        width,
        height,
        borderRadius,
      },
    });
  };
};

export const setInboxButtonProperties = (data) => {
  const { x, y, width, height, borderRadius } = data;
  return (dispatch) => {
    dispatch({
      type: 'SET_INBOX_BUTTON_PROPERTIES',
      payload: {
        x,
        y,
        width,
        height,
        borderRadius,
      },
    });
  };
};

export const setMeButtonProperties = (data) => {
  const { x, y, width, height, borderRadius } = data;
  return (dispatch) => {
    dispatch({
      type: 'SET_ME_BUTTON_PROPERTIES',
      payload: {
        x,
        y,
        width,
        height,
        borderRadius,
      },
    });
  };
};