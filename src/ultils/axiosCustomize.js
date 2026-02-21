import axios from "axios";
import NProgress from "nprogress";
import { store } from "../redux/store";

NProgress.configure({
  showSpinner: false, // tắt vòng tròn
  trickleSpeed: 200,
});

const instance = axios.create({
  baseURL: "http://localhost:8081/",
});

instance.interceptors.request.use(
  (config) => {
    NProgress.start();
    const token = store.getState()?.user?.account?.access_token;

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error) => Promise.reject(error),
);

instance.interceptors.response.use(
  (response) => response,
  (error) => {
    return Promise.reject(error);
  },
);
export default instance;
