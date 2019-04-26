import axios from 'axios';
import { resolveBaseUrl } from '.';

const baseUrl = resolveBaseUrl();

class CartAPI {
  static addProductToCart(productId, productData) {
    return axios.post(`${baseUrl}/shopping-cart/${productId}`, productData);
  }

  static getCart() {
    return axios.get(`${baseUrl}/shopping-cart`);
  }

  static removeProductFromCart(cartId) {
    return axios.delete(`${baseUrl}/shopping-cart/${cartId}`);
  }

  static clearCart() {
    return axios.delete(`${baseUrl}/shopping-cart`);
  }

  static updateProductInCart(cartId, quantity) {
    return axios.put(`${baseUrl}/shopping-cart/${cartId}`, { quantity });
  }
}

export default CartAPI;
