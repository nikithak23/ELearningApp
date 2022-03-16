import axios from 'axios';
import { Url } from './Url';

const instance = axios.create({
  baseURL: Url.baseUrl,
  headers: {
    'Content-Type': 'application/json',
  },
});

export default {
    makeApiCall : (options) => instance(options)
}
