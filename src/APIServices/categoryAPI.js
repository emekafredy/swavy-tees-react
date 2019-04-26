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

  static getDepartments() {
    return axios.get(`${baseUrl}/departments`);
  }

  static searchByKeyword(keyword) {
    return axios.get(`${baseUrl}/products?keyword=${keyword}`);
  }
}

export default CategoriesAPI;
