const defaultState = {
  profilePicture: '',
  profileName: '',
  postTime: '',
  like: '',
  topic: '',
  discussionTitle: '',
  hashtags: '',
  replies: '',
  plays: '',
  recordingFile: '',
  isLike: '',
  isDislike: '',
  responseCount: ''
}

const reducer = (state = defaultState, action) => {
  switch (action.type) {
    case 'GET_DISCUSSION':
      let setProfilePicture = action.payload.profilePicture
      let setProfileName = action.payload.profileName
      let setPostTime = action.payload.postTime
      let setLike = action.payload.like
      let setTopic = action.payload.topic
      let setDiscussionTitle = action.payload.discussionTitle
      let setHashtags = action.payload.hashtags
      let setReplies = action.payload.replies
      let setPlays = action.payload.plays
      let setRecordingFile = action.payload.recordingFile
      let setIsLike = action.payload.isLike
      let setIsDislike = action.payload.isDislike

      return {
        ...state,
        profilePicture: setProfilePicture,
        profileName: setProfileName,
        postTime: setPostTime,
        like: setLike,
        topic: setTopic,
        discussionTitle: setDiscussionTitle,
        hashtags: setHashtags,
        replies: setReplies,
        plays: setPlays,
        recordingFile: setRecordingFile,
        isLike: setIsLike,
        isDislike: setIsDislike
      }
    case 'CLEAR_DISCUSSION':
      return {
        ...state,
        profilePicture: '',
        profileName: '',
        postTime: '',
        like: '',
        topic: '',
        discussionTitle: '',
        hashtags: '',
        replies: '',
        plays: '',
        recordingFile: '',
        isLike: '',
        isDislike: ''
      }
    default:
      return state;
  }
};

export default reducer;