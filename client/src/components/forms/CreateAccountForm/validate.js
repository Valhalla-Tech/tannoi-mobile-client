import { isFilled } from '../../../helper/Validation';

export default (values, message) => {
  const { email, fullName, password, confirmPassword, birthDate } = values;

  return {
    validationStatus:
      isFilled(email) &&
      isFilled(fullName) &&
      isFilled(birthDate, false) &&
      isFilled(password) &&
      isFilled(confirmPassword)
        ? true
        : false,
    passwordErrMsg:
      password.length >= 5 && password.length <= 20
        ? ''
        : 'Password must be 5 - 20 charachters',
    confirmPasswordErrMsg:
      password === confirmPassword ? '' : 'Passwords do not match',
  };
};
