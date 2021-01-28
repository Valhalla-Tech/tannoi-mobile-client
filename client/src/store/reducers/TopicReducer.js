const defaultState = {
  topics: [],
  topic: ''
};

const reducer = (state = defaultState, action) => {
  switch (action.type) {
    case 'GET_TOPIC':
      let setTopics = action.payload.topics;

      return {...state, topics: setTopics};
    case 'GET_SINGLE_TOPIC':
      let setTopic = action.payload.topic;

      return {...state, topic: setTopic};
    case 'CLEAR_TOPIC':
      return {...state, topics: []};
    default:
      return state
  }
};

export default reducer;