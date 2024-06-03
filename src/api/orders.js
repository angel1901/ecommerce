import { axiosInstance } from './instances';

export const getOrder = async (url, params = {}) => {
  try {
    const response = await axiosInstance.get(url, { params });
    return response;
  } catch (error) {
    throw error;
  }
};

export const showOrder = async (url, id, params = {}) => {
  try {
    const response = await axiosInstance.get(`${url}/${id}`, { params });
    return response;
  } catch (error) {
    throw error;
  }
};

export const addOrder = async (url, data = {}) => {
  try {
    const response = await axiosInstance.post(url, data);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const updateOrder = async (url, id, data = {}) => {
  try {
    const response = await axiosInstance.put(`${url}/${id}`, data);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const deleteOrder = async (url, id, data = {}) => {
  try {
    const response = await axiosInstance.delete(`${url}/${id}`, data);
    return response.data;
  } catch (error) {
    throw error;
  }
};