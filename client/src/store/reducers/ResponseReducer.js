const defaultState = {
  response: '',
  isResponse: true,
  profileId: '',
  profilePicture: '',
  profileName: '',
  postTime: '',
  like: '',
  recordingFile: '',
  reply: '',
  play: '',
  isLike: '',
  isDislike: '',
  caption: '',
  likeForResponse: '',
  isLikeForResponse: '',
  isDislikeForResponse: '',
  responseCountForResponse: '',
  userType: '',
  responseCount: '',
  responseForResponseCount: '',
  topResponsePreview: '',
};

const reducer = (state = defaultState, action) => {
  switch (action.type) {
    case 'GET_RESPONSE':
      let setResponse = action.payload.response;
      let setIsResponse = action.payload.response.length !== 0 ? true : false;
      let setNumOfResponse = action.payload.responseCount;

      if (setIsResponse !== null && setNumOfResponse !== undefined) {
        return {
          ...state,
          response: setResponse,
          isResponse: setIsResponse,
          responseCount: setNumOfResponse,
        };
      } else {
        return {
          ...state,
          response: setResponse,
          isResponse: state.isResponse,
          responseCount: state.responseCount,
        };
      }
    case 'ADD_RESPONSE':
      let setAddResponse = state.response.concat(action.payload.response);
      let setAddResponseCount = action.payload.responseCount;

      return {
        ...state,
        response: setAddResponse,
        responseCount: setAddResponseCount,
      };
    case 'GET_SINGLE_RESPONSE':
      let setProfileId = action.payload.profileId;
      let setProfilePicture = action.payload.profilePicture;
      let setProfileName = action.payload.profileName;
      let setPostTime = action.payload.postTime;
      let setLike = action.payload.like;
      let setRecordingFile = action.payload.recordingFile;
      let setReply = action.payload.reply;
      let setPlay = action.payload.play;
      let setIsLike = action.payload.isLike;
      let setIsDislike = action.payload.isDislike;
      let setCaption = action.payload.caption;
      let setResponseCount = action.payload.responseCount;
      let setUserType = action.payload.userType;
      let setResponseForResponseCount = action.payload.responseForResponseCount;

      return {
        ...state,
        profileId: setProfileId,
        profilePicture: setProfilePicture,
        profileName: setProfileName,
        postTime: setPostTime,
        like: setLike,
        recordingFile: setRecordingFile,
        reply: setReply,
        play: setPlay,
        isLike: setIsLike,
        isDislike: setIsDislike,
        caption: setCaption,
        responseCount: setResponseCount,
        userType: setUserType,
        responseForResponseCount: setResponseForResponseCount,
      };
    case 'ADD_RESPONSE_FOR_RESPONSE':
      let setAddResponseForResponse = state.reply.concat(action.payload.reply);
      let setAddResponseForResponseCount =
        action.payload.responseForResponseCount;

      return {
        ...state,
        reply: setAddResponseForResponse,
        responseForResponseCount: setAddResponseForResponseCount,
      };
    case 'GET_DATA_FOR_RESPONSE':
      let setLikeForResponse = action.payload.likeForResponse;
      let setIsLikeForResponse = action.payload.isLikeForResponse;
      let setIsDislikeForResponse = action.payload.isDislikeForResponse;
      let setResponseCountForResponse = action.payload.responseCountForResponse;
      let setTopResponsePreview = action.payload.topResponsePreview;

      return {
        ...state,
        likeForResponse: setLikeForResponse,
        isLikeForResponse: setIsLikeForResponse,
        isDislikeForResponse: setIsDislikeForResponse,
        responseCountForResponse: setResponseCountForResponse,
        topResponsePreview: setTopResponsePreview,
      };
    case 'CLEAR_RESPONSE':
      return {
        ...state,
        profilePicture: '',
        profileName: '',
        postTime: '',
        like: '',
        recordingFile: '',
        reply: '',
        isLike: '',
        isDislike: '',
        caption: '',
        responseCount: '',
        responseForResponseCount: '',
      };
    case 'CLEAR_RESPONSES':
      return {
        ...state,
        response: [],
      };
    case 'CLEAR_RESPONSE_DATA':
      return {
        ...state,
        likeForResponse: '',
        isLikeForResponse: '',
        isDislikeForResponse: '',
        responseCountForResponse: '',
        topResponsePreview: '',
      };
    default:
      return state;
  }
};

export default reducer;
