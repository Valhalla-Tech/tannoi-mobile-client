const defaultState = {
  firstName: '',
  lastName: '',
  gender: '',
  birthDate: '',
  street: '',
  city: '',
  country: '',
  postalCode: '',
  stepCount: '',
};

const reducer = (state = defaultState, action) => {
  switch (action.type) {
    case 'INPUT_PROFILE':
      let setFirstName = action.payload.firstName;
      let setLastName = action.payload.lastName;
      let setGender = action.payload.gender;
      let setBirthDate = action.payload.birthDate;

      return {
        ...state,
        firstName: setFirstName,
        lastName: setLastName,
        gender: setGender,
        birthDate: setBirthDate,
      };
    case 'INPUT_ADDRESS':
      let setStreet = action.payload.street;
      let setCity = action.payload.city;
      let setCountry = action.payload.country;
      let setPostalCode = action.payload.postalCode;

      return {
        ...state,
        street: setStreet,
        city: setCity,
        country: setCountry,
        postalCode: setPostalCode,
      };
    case 'ADD_STEP_COUNT':
      let setStepCount = action.payload.stepCount;

      return { ...state, stepCount: setStepCount };
    case 'DELETE_VERIFICATION_DATA':
      return {
        ...state,
        firstName: '',
        lastName: '',
        gender: '',
        birthDate: '',
        street: '',
        city: '',
        country: '',
        postalCode: '',
        stepCount: '',
      };
    default:
      return state;
  }
};

export default reducer;
