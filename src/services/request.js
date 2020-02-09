import axios from 'axios';

export const axiosData = (url) => {
  const res = axios.get(url);
  return res;
};
