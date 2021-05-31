export const setCommunityButtonProperties = (data) => {
    const { x, y, width, height } = data;
    console.log({data})
    return (dispatch) => {
      dispatch({
        type: 'SET_COMMUNITY_BUTTON_PROPERTIES',
        payload: {
          x,
          y,
          width,
          height,
        },
      });
    };
  };