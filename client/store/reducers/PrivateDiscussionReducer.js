const defaultState = {
  followers: [],
  authorized: [],
  authorizedId: []
}

const reducer = (state = defaultState, action) => {
  switch (action.type) {
    case 'GET_FOLLOWERS':
      let setFollowers = action.payload.followers;

      return {...state, followers: setFollowers};
    case 'GET_AUTHORIZED':
      let setAuthorized = action.payload.authorized;
      let setAuthorizedId = action.payload.authorizedId;

      return {...state, authorized: setAuthorized, authorizedId: setAuthorizedId};
    default:
      return state;
  }
};

export default reducer;