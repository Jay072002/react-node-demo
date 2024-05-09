// request.js
import axios from 'axios';

const BASE_URL = 'http://localhost:5000/api';

const doPost = async (endpoint, data, options) => {
  try {
    const response = await axios.post(`${BASE_URL}/${endpoint}`, data, options);
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};

const doGet = async (endpoint) => {
  try {
    const response = await axios.get(`${BASE_URL}/${endpoint}`);
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};

const doUpdate = async (endpoint, data) => {
  try {
    const response = await axios.put(`${BASE_URL}/${endpoint}`, data);
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};

const doDelete = async (endpoint) => {
  try {
    const response = await axios.delete(`${BASE_URL}/${endpoint}`);
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};

export { doPost, doGet, doUpdate, doDelete };
