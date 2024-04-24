import axios from "axios";
import { BASE_REST_URL } from "../constants";

export const authApi = axios.create({
  baseURL: `https://${BASE_REST_URL}`,
});
