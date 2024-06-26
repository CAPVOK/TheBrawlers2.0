import axios from "axios";
import { BASE_REST_URL, USER_TOKEN_KEY } from "../constants";

const clusterApi = axios.create({
  baseURL: BASE_REST_URL,
});

clusterApi.interceptors.request.use(
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

export { clusterApi };
