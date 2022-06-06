import axios from 'axios';
import authHeader from './auth-header';

const API_URL = 'http://localhost:8080/api/products/';

const getAllProducts = (limit, offset, userId, customerName) => {
  return axios.get(
    API_URL,
    {
      headers: authHeader(),
      params: {
        size: limit,
        page: offset,
        userId,
        customerName,
      },
    });
};


const ProductService = {
  getAllProducts,
};

export default ProductService;
