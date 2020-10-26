const defaultState = {
  topics: []
};

const reducer = (state = defaultState, action) => {
  switch (action.type) {
    case 'GET_TOPIC':
      let setTopics = action.payload.topics;
      return {...state, topics: setTopics};
    default:
      return state
  }
};

export default reducer;