const defaultState = {
    communityButtonProperties: null,
    addNewDiscussionButtonProperties: null,
    homeButtonProperties: null,
    topicButtonProperties: null,
    inboxButtonProperties: null,
    meButtonProperties: null,
}

const reducer = (state = defaultState, action) => {
  if (action.type && action.payload) {
    const { x, y, height, width, borderRadius = 0 } = action.payload;
    const {
      communityButtonProperties,
      addNewDiscussionButtonProperties,
      homeButtonProperties,
      topicButtonProperties,
      inboxButtonProperties,
      meButtonProperties,
    } = state;

    switch (action.type) {
      case 'SET_COMMUNITY_BUTTON_PROPERTIES':
        return {
          communityButtonProperties: {
            x,
            y,
            height: height,
            width: width + 50,
            borderRadius: 20,
          },
          addNewDiscussionButtonProperties,
          homeButtonProperties,
          topicButtonProperties,
          inboxButtonProperties,
          meButtonProperties,
        };
      case 'SET_NEW_DISCUSSION_BUTTON_PROPERTIES':
        return {
          communityButtonProperties,
          addNewDiscussionButtonProperties: {
            x,
            y,
            height,
            width,
            borderRadius,
          },
          homeButtonProperties,
          topicButtonProperties,
          inboxButtonProperties,
          meButtonProperties,
        };
      case 'SET_TOPIC_BUTTON_PROPERTIES':
        return {
          communityButtonProperties,
          addNewDiscussionButtonProperties,
          homeButtonProperties,
          topicButtonProperties: {
            x,
            y,
            height,
            width,
            borderRadius,
          },
          inboxButtonProperties,
          meButtonProperties,
        };
      case 'SET_HOME_BUTTON_PROPERTIES':
        return {
          communityButtonProperties,
          addNewDiscussionButtonProperties,
          homeButtonProperties: {
            x,
            y,
            height,
            width,
            borderRadius,
          },
          topicButtonProperties,
          inboxButtonProperties,
          meButtonProperties,
        };
      case 'SET_INBOX_BUTTON_PROPERTIES':
        return {
          communityButtonProperties,
          addNewDiscussionButtonProperties,
          homeButtonProperties,
          topicButtonProperties,
          inboxButtonProperties: {
            x,
            y,
            height,
            width,
            borderRadius,
          },
          meButtonProperties,
        };
      case 'SET_ME_BUTTON_PROPERTIES':
        return {
          communityButtonProperties,
          addNewDiscussionButtonProperties,
          homeButtonProperties,
          topicButtonProperties,
          inboxButtonProperties,
          meButtonProperties: {
            x,
            y,
            height,
            width,
            borderRadius,
          },
        };
      default:
        return state;
    }
  } else {
    return state;
  }
};

export default reducer;
