export default displayBirthDate = (date) => {
  let birthDate = date.toDateString().split(' ').slice(1, 4);
  if (birthDate[1][0] === '0') {
    birthDate[1] = birthDate[1][1];
  }
  let birthDateDisplay = `${birthDate[1]} ${birthDate[0]} ${birthDate[2]}`;
  return birthDateDisplay;
};
