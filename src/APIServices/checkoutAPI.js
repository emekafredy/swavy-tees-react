import axios from 'axios';
import { resolveBaseUrl } from '.';

const baseUrl = resolveBaseUrl();

class CheckoutAPI {
  static getCheckout() {
    return axios.get(`${baseUrl}/payments`);
  }

  static makePayment(paymentData) {
    return axios.post(`${baseUrl}/charge`, paymentData);
  }

  static getOrders() {
    return axios.get(`${baseUrl}/orders`);
  }
}

export default CheckoutAPI;
