export default ConvertPostTime = (postTimeInput) => {
  let postTimeToNewDate = new Date(postTimeInput);
  let postTimeToGMTString = postTimeToNewDate.toGMTString();
  let postTimeToNewDateSplitted = postTimeToGMTString.split(' ');

  let date = postTimeToNewDateSplitted[1];
  let month = postTimeToNewDateSplitted[2];
  let year = postTimeToNewDateSplitted[3];
  let time = postTimeToNewDateSplitted[4].substring(0, 5);

  if (date[0] === '0') {
    date = date[1];
  }

  return `${date} ${month} ${year}, ${time}`;
};
