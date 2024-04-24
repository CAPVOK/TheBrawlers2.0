import axios from "axios";
import { BASE_REST_URL, USER_TOKEN_KEY } from "../constants";

const caseApi = axios.create({
  baseURL: `https://${BASE_REST_URL}`,
});

caseApi.interceptors.request.use(
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

export { caseApi };
