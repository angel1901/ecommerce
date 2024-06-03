"use client side";

import axios from 'axios';

import { PUBLIC_URL_ECOMMERCE } from '$env/static/public';

export const axiosInstance = axios.create({
  baseURL: PUBLIC_URL_ECOMMERCE
});