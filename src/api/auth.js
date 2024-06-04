import axios from 'axios';
import { axiosInstance } from './instances';

export const get = async (url, params = {}) => {
  try {
    const response = await axiosInstance.get(url, { params });
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const post = async (url, data = {}) => {
  try {
    const response = await axiosInstance.post(url, data, {
      withCredentials: true
    });
    return response;
  } catch (error) {
    throw error;
  }
};