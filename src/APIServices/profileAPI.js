import axios from 'axios';
import { resolveBaseUrl } from '.';

const baseUrl = resolveBaseUrl();

class ProfileAPI {
  static getUserProfile() {
    return axios.get(`${baseUrl}/user`);
  }

  static updateUserProfile(userData) {
    return axios.put(`${baseUrl}/user`, userData);
  }

  static getRegions() {
    return axios.get(`${baseUrl}/regions`);
  }
}

export default ProfileAPI;
