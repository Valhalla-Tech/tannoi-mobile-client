import Fetch from '../../../helper/Fetch';
import BaseUrl from '../../../constants/BaseUrl';

const loadingAction = (payload) => {
  return {
    type: 'REGISTER/LOADING',
    payload: {
      isLoading: payload,
    },
  };
};

export const createAccount = (data) => {
  return async (dispatch) => {
    try {
      dispatch(loadingAction(true));
      const { email, password, name } = data;
      const createAccountRequestOption = {
        url: `${BaseUrl}/users/register`,
        method: 'post',
        data: {
          email: email.trim(),
          password: password,
          name: name,
        },
      };

      let createAccountRequest = await Fetch(createAccountRequestOption);

      if (createAccountRequest.data) {
        dispatch(loadingAction(false));
        return true;
      }
    } catch (error) {
      dispatch(loadingAction(false));
      return false;
    }
  };
};
