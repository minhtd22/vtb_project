import axios from 'axios';
import authHeader from './auth-header';

const API_URL = 'http://localhost:8080/api/';
const getPublicContent = () => {
  return axios.get(API_URL + 'all');
};

const getAllUsers = () => {
  return axios.get(API_URL + 'users', { headers: authHeader() });
};

const searchUsersByName = (username) => {
  return axios.get(API_URL + `users?username=${username}`, { headers: authHeader() })
}

const UserService = {
  getPublicContent,
  getAllUsers,
  searchUsersByName,
};

export default UserService;