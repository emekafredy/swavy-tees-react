import axios from 'axios';
import { resolveBaseUrl } from '.';

const baseUrl = resolveBaseUrl();

class CategoriesAPI {
  static getCategories() {
    return axios.get(`${baseUrl}/product-categories`);
  }

  static getCategory(categoryName, currentPage) {
    return axios.get(`${baseUrl}/products?category=${categoryName}&page=${currentPage}`);
  }

  static getDepartments() {
    return axios.get(`${baseUrl}/departments`);
  }

  static searchByKeyword(keyword, currentPage) {
    return axios.get(`${baseUrl}/products?keyword=${keyword}&page=${currentPage}`);
  }

  static getProductsByDepartment(departmentId) {
    return axios.get(`${baseUrl}/products/department/${departmentId}`)
  }
}

export default CategoriesAPI;
