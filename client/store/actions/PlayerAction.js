export const changeCurrentPlayerId = (id) => {
  return (dispatch) => {
    dispatch({
      type: 'CHANGE_CURRENT_PLAYER_ID',
      payload: { currentPlayerId: id }
    });
  };
};

export const clearCurrentPlayerId = () => {
  return (dispatch) => {
    dispatch({
      type: 'CLEAR_CURRENT_PLAYER_ID'
    });
  };
};