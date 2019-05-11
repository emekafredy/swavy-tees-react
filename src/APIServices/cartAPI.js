import axios from 'axios';
import { resolveBaseUrl } from '.';

const baseUrl = resolveBaseUrl();

class CartAPI {
  static addProductToCart(productId, productData) {
    return axios.post(`${baseUrl}/shopping-cart/${productId}`, productData);
  }

  static generateCartId() {
    return axios.post(`${baseUrl}/cart/generateId`);
  }

  static getCart(cartId) {
    return axios.get(`${baseUrl}/shopping-cart/${cartId}`);
  }

  static removeProductFromCart(cartId, id) {
    return axios.delete(`${baseUrl}/shopping-cart/${cartId}/${id}`);
  }

  static clearCart(cartId) {
    return axios.delete(`${baseUrl}/shopping-cart/${cartId}`);
  }

  static updateProductInCart(cartId, id, quantity) {
    return axios.put(`${baseUrl}/shopping-cart/${cartId}/${id}`, { quantity });
  }
}

export default CartAPI;
