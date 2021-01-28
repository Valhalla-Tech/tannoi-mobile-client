const defaultState = {
  currentPlayerId: ''
};

const reducer = (state = defaultState, action) => {
  switch (action.type) {
    case 'CHANGE_CURRENT_PLAYER_ID':
      let setCurrentPlayerId = action.payload.currentPlayerId;

      return {...state, currentPlayerId: setCurrentPlayerId};
    case 'CLEAR_CURRENT_PLAYER_ID':
      return {...state, currentPlayerId: ''};
    default:
      return state;
  };
};

export default reducer;