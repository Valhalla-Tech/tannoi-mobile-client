const defaultState = {
  profileId: '',
  profilePicture: '',
  profileName: '',
  postTime: '',
  like: '',
  topic: '',
  topicId: '',
  discussionTitle: '',
  hashtags: '',
  replies: '',
  plays: '',
  recordingFile: '',
  isLike: '',
  isDislike: '',
  responseCount: '',
  type: '',
  userType: '',
  discussions: '',
  discussionCount: '',
  userDiscussion: '',
  userDiscussionCount: '',
  userInvolvedInDiscussion: [],
  isLoading: false,
  moreLoader: false,
  isFlagged: false,
  objectionable: false,
};

const reducer = (state = defaultState, action) => {
  switch (action.type) {
    case 'GET_ALL_DISCUSSION':
      let setDiscussions = action.payload.discussions;
      let setDiscussionCount = action.payload.discussionCount;

      return {
        ...state,
        discussions: setDiscussions,
        discussionCount: setDiscussionCount,
      };
    case 'ADD_DISCUSSION_LIST':
      let setDiscussionList = state.discussions.concat(
        action.payload.discussions,
      );
      let setDiscussionListCount = action.payload.discussionCount;

      return {
        ...state,
        discussions: setDiscussionList,
        discussionCount: setDiscussionListCount,
      };
    case 'ADD_USER_DISCUSSION_LIST':
      let setAddUserDiscussionList = state.userDiscussion.concat(
        action.payload.discussions,
      );
      let setAddUserDiscussionCount = action.payload.userDiscussionCount;

      return {
        ...state,
        userDiscussion: setAddUserDiscussionList,
        userDiscussionCount: setAddUserDiscussionCount,
      };
    case 'GET_DISCUSSION':
      let setProfileId = action.payload.profileId;
      let setProfilePicture = action.payload.profilePicture;
      let setProfileName = action.payload.profileName;
      let setPostTime = action.payload.postTime;
      let setLike = action.payload.like;
      let setTopic = action.payload.topic;
      let setTopicId = action.payload.topicId;
      let setDiscussionTitle = action.payload.discussionTitle;
      let setHashtags = action.payload.hashtags;
      let setReplies = action.payload.replies;
      let setPlays = action.payload.plays;
      let setRecordingFile = action.payload.recordingFile;
      let setIsLike = action.payload.isLike;
      let setIsDislike = action.payload.isDislike;
      let setType = action.payload.type;
      let setUserType = action.payload.userType;
      let setIsFlagged = action.payload.isFlagged;
      let setObjectionable = action.payload.objectionable;

      return {
        ...state,
        profileId: setProfileId,
        profilePicture: setProfilePicture,
        profileName: setProfileName,
        postTime: setPostTime,
        like: setLike,
        topic: setTopic,
        topicId: setTopicId,
        discussionTitle: setDiscussionTitle,
        hashtags: setHashtags,
        replies: setReplies,
        plays: setPlays,
        recordingFile: setRecordingFile,
        isLike: setIsLike,
        isDislike: setIsDislike,
        type: setType,
        userType: setUserType,
        isFlagged: setIsFlagged,
        objectionable: setObjectionable
      };
    case 'GET_USER_DISCUSSION':
      let setUserDiscussion = action.payload.discussions;
      let setUserDiscussionCount = action.payload.discussionCount;

      return {
        ...state,
        userDiscussion: setUserDiscussion,
        userDiscussionCount: setUserDiscussionCount,
      };
    case 'GET_USERS_INVOLVED_IN_DISCUSSION':
      return {
        ...state,
        userInvolvedInDiscussion: action.payload.data.data,
      };
    case 'CLEAR_USERS_INVOLVED_IN_DISCUSSION':
      return {
        ...state,
        userInvolvedInDiscussion: [],
      };
    case 'CLEAR_DISCUSSION':
      return {
        ...state,
        profilePicture: '',
        profileName: '',
        postTime: '',
        like: '',
        topic: '',
        topicId: '',
        discussionTitle: '',
        hashtags: '',
        replies: '',
        plays: '',
        recordingFile: '',
        isLike: '',
        isDislike: '',
      };
    case 'CLEAR_ALL_DISCUSSION':
      return { ...state, discussions: '' };
    case 'CLEAR_USER_DISCUSSION':
      return { ...state, userDiscussion: '' };
    case 'SET_IS_LOADING':
      let setIsLoading = action.payload.isLoading;

      return { ...state, isLoading: setIsLoading };
    case 'MORE_LOADER':
      let setMoreLoader = action.payload.moreLoader;

      return { ...state, moreLoader: setMoreLoader };
    default:
      return state;
  }
};

export default reducer;
