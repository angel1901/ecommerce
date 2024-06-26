import axios from 'axios';
import { axiosInstance } from './instances';

export const getProduct = async (url, params = {}) => {
  try {
    const response = await axiosInstance.get(url, { params });

    return response;
  } catch (error) {
    console.log(error)
    throw error;
  }
};

export const showProduct = async (url, id, params = {}) => {
  try {

    const response = await axiosInstance.get(`${url}/${id}`, { params });
    return response;
  } catch (error) {
    throw error;
  }
};

export const addProduct = async (url, data = {}) => {
  try {
    const response = await axiosInstance.post(url, data);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const updateProduct = async (url, id, data = {}) => {
  try {
    const response = await axiosInstance.put(`${url}/${id}`, data);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const deleteProduct = async (url, id, data = {}) => {
  try {
    const response = await axiosInstance.delete(`${url}/${id}`, data);
    return response.data;
  } catch (error) {
    throw error;
  }
};