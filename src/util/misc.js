import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: process.env.URL_ECOMMERCE
});