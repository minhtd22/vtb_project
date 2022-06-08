import axios from 'axios';
import authHeader from './auth-header';

const API_URL = 'http://localhost:8080/api/users/';
const getPublicContent = () => {
  return axios.get(API_URL + 'all');
};

const getAllUsers = (username) => {
  return axios.get(API_URL,
    {
      headers: authHeader(),
      params: {
        username,
      },
    },
  );
};

const getDetailUser = (id) => {
  return axios.get(API_URL + `${id}`,
    {
      headers: authHeader(),
    },
  );
};

const updateUser = (id, data) => {
  console.log('datadata', data);
  return axios.put(
    API_URL + `${id}`,
    data,
    {
      headers: authHeader(),
    },
  );
}

const UserService = {
  getPublicContent,
  getAllUsers,
  getDetailUser,
  updateUser,
};

export default UserService;