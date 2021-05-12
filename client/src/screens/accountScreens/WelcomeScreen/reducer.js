const defaultState = {
  isLoading: false,
};

const reducer = (state = defaultState, action) => {
  switch (action.type) {
    case 'REGISTER/LOADING':
      const { isLoading } = action.payload;
      return { ...state, isLoading: isLoading };
    default:
      return state;
  }
};

export default reducer;
