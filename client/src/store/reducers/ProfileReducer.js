const defaultState = {
  userProfile: '',
  loggedinUserProfile: ''
};

const reducer = (state = defaultState, action) => {
  switch (action.type) {
    case 'GET_ONE_PROFILE':
      let setUerProfile = action.payload.userProfile

      return {...state, userProfile: setUerProfile};
    case 'GET_LOGGED_IN_USER_PROFILE':
      let setLoggedinUserProfile = action.payload.loggedinUserProfile;

      return {...state, loggedinUserProfile: setLoggedinUserProfile};
    case 'CLEAR_USER_PROFILE':
      return {...state, userProfile: ''};
    case 'CLEAR_LOGED_IN_USER_PROFILE':
      return {...state, loggedinUserProfile: ''}
    default:
      return state;
  }
};

export default reducer;