import axios from 'axios';

export default axios.create({
  baseURL: 'http://www.omdbapi.com',
  params: {
    apikey: 'a93749d7',
  },
});
