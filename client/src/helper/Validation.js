export const isFilled = (value, isTrim = true) =>
  isTrim ? value.trim() !== '' ? true : false : value !== '' ? true : false;
