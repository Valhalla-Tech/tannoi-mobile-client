const defaultState = {
  discussions: [],
  users: [],
};

const reducer = (state = defaultState, action) => {
  switch (action.type) {
    case 'GET_SEARCH':
      let setDiscussions = action.payload.discussions;
      let setUsers = action.payload.users;

      return { ...state, discussions: setDiscussions, users: setUsers };
    default:
      return state;
  }
};

export default reducer;
