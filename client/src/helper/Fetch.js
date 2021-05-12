import axios from '../constants/ApiServices';

export default async (option) => {
  try {
    let fetch = await axios(option);

    return fetch;
  } catch (error) {
    console.log(error.response.data.msg);
  }
};