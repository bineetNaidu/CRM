import Axios from 'axios';

export const axios = Axios.create({
  baseURL: 'http://localhost:4242/api',
});
