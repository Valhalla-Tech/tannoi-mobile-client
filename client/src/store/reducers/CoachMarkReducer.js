const defaultState = {
    communityButtonProperties: null,
}

const reducer = (state = defaultState, action) => {
    switch (action.type) {
      case 'SET_COMMUNITY_BUTTON_PROPERTIES':
        const { x, y, height, width } = action.payload;
        return { communityButtonProperties: {
            x,
            y,
            height: height,
            width: width + 50,
            borderRadius: 30,
        } };
      default:
        return state;
    }
  };
  
export default reducer;