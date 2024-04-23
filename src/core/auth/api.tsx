import axios from "axios";

const BASE_REST_URL = import.meta.env.VITE_REST_URL;

export const authApi = axios.create({
  baseURL: `http://${BASE_REST_URL}`,
});
