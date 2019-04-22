import axios from 'axios';
import { resolveBaseUrl } from '.';

const baseUrl = resolveBaseUrl();

class AuthenticationAPI {
  static registerUser(userData) {
    return axios.post(`${baseUrl}/users/register`, userData);
  }

  static loginUser(userData) {
    return axios.post(`${baseUrl}/users/login`, userData);
  }
}

export default AuthenticationAPI;
