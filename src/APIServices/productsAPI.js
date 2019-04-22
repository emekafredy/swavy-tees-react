import axios from 'axios';
import { resolveBaseUrl } from '.';

const baseUrl = resolveBaseUrl();

class ProductsAPI {
  static getProducts() {
    return axios.get(`${baseUrl}/products`);
  }

  static getProduct(productId) {
    return axios.get(`${baseUrl}/products/product/${productId}`);
  }
}

export default ProductsAPI;
