import axios from 'axios';

export default axios.create({
  baseURL: 'https://www.omdbapi.com',
  params: {
    apikey: process.env.REACT_APP_API_KEY,
  },
});
