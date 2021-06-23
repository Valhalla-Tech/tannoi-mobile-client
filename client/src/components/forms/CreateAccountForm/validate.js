import { isFilled } from '../../../helper/Validation';

function validateEmail(email) {
  const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(String(email).toLowerCase());
}

export default (values, message) => {
  const { email, fullName, password, confirmPassword, birthDate } = values;

  return {
    validationStatus:
      isFilled(fullName) &&
      // isFilled(birthDate, false) &&
      isFilled(password) &&
      isFilled(confirmPassword)
        ? true
        : false,
        emailValidation: !isFilled(email) ? 'Email must be filled' : (!validateEmail(email) ? 'Email must be in the right format!' : ''),
      passwordErrMsg:
        password.length >= 5 && password.length <= 20
          ? ''
          : 'Password must be 5 - 20 charachters',
      confirmPasswordErrMsg:
        password === confirmPassword ? '' : 'Passwords do not match',
  };
};
