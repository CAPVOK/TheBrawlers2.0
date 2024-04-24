import axios from "axios";
import { USER_TOKEN_KEY } from "./layer";

const BASE_REST_URL = import.meta.env.VITE_REST_URL;

const taskApi = axios.create({
  baseURL: `https://${BASE_REST_URL}`,
});

taskApi.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem(USER_TOKEN_KEY);
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export { taskApi };
