const defaultState = {
  users: [],
  authorized: [],
  authorizedId: [],
  noUsers: false,
  userCount: ''
}

const reducer = (state = defaultState, action) => {
  switch (action.type) {
    case 'GET_USERS':
      let setUsers = action.payload.users;
      let setSearchNoUsers = false
      let setUserCount = action.payload.userCount

      return {...state, users: setUsers, noUsers: setSearchNoUsers, userCount: setUserCount};
    case 'ADD_USER':
      let setAddUser = state.users.concat(action.payload.users);

      return {...state, users: setAddUser}
    case 'GET_AUTHORIZED':
      let setAuthorized = action.payload.authorized;
      let setAuthorizedId = action.payload.authorizedId;
      let setNoAuthorizedUsers = false;
      let setAuthorizedUserCount = action.payload.userCount;

      return {...state, authorized: setAuthorized, authorizedId: setAuthorizedId, noUsers: setNoAuthorizedUsers, userCount: setAuthorizedUserCount};
    case 'ADD_AUTHORIZED':
      let setAddAuthorized = state.authorized.concat(action.payload.authorized);
      let setAddAuthorizedId = state.authorizedId.concat(action.payload.authorizedId);

      return {...state, authorized: setAddAuthorized, authorizedId: setAddAuthorizedId};
    case 'SET_USERS_STATUS':
      let setNoUsers = action.payload.noUsers;

      return {...state, noUsers: setNoUsers};
    default:
      return state;
  }
};

export default reducer;