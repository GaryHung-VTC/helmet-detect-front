import axios from "axios";
import useAuthStore from "../hooks/auth";

const authRequest = axios.create({
  baseURL: "http://localhost:3000",
  // withCredentials: true,
});

authRequest.interceptors.request.use((config) => {
  const { token } = useAuthStore.getState();
  config.headers.Authorization = `${token}`;
  return config;
});

const request = axios.create({
  baseURL: "http://localhost:3000",
});

export { authRequest, request };
