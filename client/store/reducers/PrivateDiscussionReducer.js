const defaultState = {
  followers: []
}

const reducer = (state = defaultState, action) => {
  switch (action.type) {
    case 'GET_FOLLOWERS':
      let setFollowers = action.payload.followers;

      return {...state, followers: setFollowers};
    default:
      return state;
  }
};

export default reducer;