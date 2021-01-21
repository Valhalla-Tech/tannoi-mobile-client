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
  userType: ''
};

const reducer = (state = defaultState, action) => {
  switch (action.type) {
    case 'GET_RESPONSE':
      let setResponse = action.payload.response;
      let setIsResponse = action.payload.response.length !== 0 ? true : false;

      return {...state, response: setResponse, isResponse: setIsResponse};
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
        userType: setUserType
      };
    case 'GET_DATA_FOR_RESPONSE':
      let setLikeForResponse = action.payload.likeForResponse;
      let setIsLikeForResponse = action.payload.isLikeForResponse;
      let setIsDislikeForResponse = action.payload.isDislikeForResponse;
      let setResponseCountForResponse = action.payload.responseCountForResponse;

      return {
        ...state,
        likeForResponse: setLikeForResponse,
        isLikeForResponse: setIsLikeForResponse,
        isDislikeForResponse: setIsDislikeForResponse,
        responseCountForResponse: setResponseCountForResponse
      };
    case 'CLEAR_RESPONSE':
      return {
        ...state,
        response: [],
        profilePicture: '',
        profileName: '',
        postTime: '',
        like: '',
        recordingFile: '',
        reply: '',
        isLike: '',
        isDislike: '',
        caption: ''
      };
    case 'CLEAR_RESPONSE_DATA':
      return {
        ...state,
        likeForResponse: '',
        isLikeForResponse: '',
        isDislikeForResponse: '',
        responseCountForResponse: ''
      };
    default:
      return state;
  }
};

export default reducer;
