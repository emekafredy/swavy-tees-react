import axios from 'axios';
import { resolveBaseUrl } from '.';

const baseUrl = resolveBaseUrl();

class CategoriesAPI {
  static getCategories() {
    return axios.get(`${baseUrl}/product-categories`);
  }

  static getCategory(categoryName) {
    return axios.get(`${baseUrl}/products?category=${categoryName}`);
  }
}

export default CategoriesAPI;
