export const inputUserProfile = (data) => {
  return (dispatch) => {
    dispatch({
      type: 'INPUT_PROFILE',
      payload: {
        firstName: data.firstName,
        lastName: data.lastName,
        gender: data.gender,
        birthDate: data.birthDate
      }
    });
  };
};

export const inputUserAddress = (data) => {
  return (dispatch) => {
    dispatch({
      type: 'INPUT_ADDRESS',
      payload: {
        street: data.street,
        city: data.city,
        country: data.country,
        postalCode: data.postalCode
      }
    });
  };
};