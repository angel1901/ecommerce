"use client side";

import axios from 'axios';

import { PUBLIC_URL_ECOMMERCE } from '$env/static/public';


// // Create an Axios instance
export const axiosInstance = axios.create({
  withCredentials: true, // Ensure credentials are sent with every request
  baseURL: PUBLIC_URL_ECOMMERCE
 });
 