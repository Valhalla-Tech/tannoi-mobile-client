const defaultState = {
  followers: [],
  authorized: [],
  authorizedId: [],
  noFollowers: false
}

const reducer = (state = defaultState, action) => {
  switch (action.type) {
    case 'GET_FOLLOWERS':
      let setFollowers = action.payload.followers;
      let setSearchNoFollowers = false

      return {...state, followers: setFollowers, noFollowers: setSearchNoFollowers};
    case 'GET_AUTHORIZED':
      let setAuthorized = action.payload.authorized;
      let setAuthorizedId = action.payload.authorizedId;
      let setNoAuthorizedFollowers = false;

      return {...state, authorized: setAuthorized, authorizedId: setAuthorizedId, noFollowers: setNoAuthorizedFollowers};
    case 'SET_FOLLOWERS_STATUS':
      let setNoFollowers = action.payload.noFollowers;

      return {...state, noFollowers: setNoFollowers};
    default:
      return state;
  }
};

export default reducer;