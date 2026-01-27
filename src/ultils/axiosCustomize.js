import axios from "axios";
const instance = axios.create({
  baseURL: "http://localhost:8081/",
});
// // instance.interceptors.request.use(
// //   (config) => {
// //     const token = localStorage.getItem("accessToken");
// //     if (token) {
// //       config.headers.Authorization = `Bearer ${token}`;
// //     }
// //     return config;
// //   },
// //   (error) => Promise.reject(error)
// // );
// // instance.interceptors.response.use(
// //   (response) => response,
// //   (error) => {
// //     return Promise.reject(error);
// //   }
// );
export default instance;
