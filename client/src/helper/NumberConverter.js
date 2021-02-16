export default numberConverter = (number) => {
  if (number.length > 3 && number.length <= 6) {
    return `${number.substring(0, number.length - 3)}k`;
  } else if (number.length > 6 && number.length <= 9) {
    return `${number.substring(0, number.length - 6)}m`;
  } else if (number.length > 9) {
    return `${number.substring(0, number.length - 9)}b`;
  } else {
    return number;
  }
};
