const defaultState = {
  userCommunity: '',
};

const reducer = (state = defaultState, action) => {
  switch (action.type) {
    case 'GET_USER_COMMUNITY':
      let setUserCommunity = action.payload.userCommunity;

      return { ...state, userCommunity: setUserCommunity }
    default:
      return state;
  }
};

export default reducer;
