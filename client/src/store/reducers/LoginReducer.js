const defaultState = {
  isLoggedIn: false
};

const reducer = (state = defaultState, action) => {
  switch (action.type) {
    case 'LOGIN':
      let setLogin = action.payload.loginStatus;
      return {...state, isLoggedIn: setLogin};
    case 'LOGOUT':
      let setLogout = action.payload.loginStatus;
      return {...state, isLoggedIn: setLogout};
    default:
      return state;
  };
};

export default reducer;