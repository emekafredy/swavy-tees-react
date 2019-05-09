import axios from 'axios';
import { resolveBaseUrl } from '.';

const baseUrl = resolveBaseUrl();
class ProductsAPI {
  static getProducts(currentPage) {
    return axios.get(`${baseUrl}/products?page=${currentPage}`);
  }

  static getProduct(productId) {
    return axios.get(`${baseUrl}/products/product/${productId}`);
  }
}

export default ProductsAPI;
