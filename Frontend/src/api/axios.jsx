import axios from "axios";

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  headers: {
    "Content-Type": "application/json"
  }
});

export default api;

// import axios from 'axios';

// const api = axios.create({
//     baseURL: import.meta.env.VITE_API_URL || "http://localhost:5000/api",
// });

// // Request Interceptor: Har request se pehle token automatically add kar dega
// api.interceptors.request.use(
//     (config) => {
//         const token = localStorage.getItem("token");
//         if (token) {
//             config.headers.Authorization = `Bearer ${token}`;
//         }
//         return config;
//     },
//     (error) => {
//         return Promise.reject(error);
//     }
// );

// // Response Interceptor: Agar backend 401 (Unauthorized) bhejta hai toh logout kar dega
// api.interceptors.response.use(
//     (response) => response, // Agar success hai toh data return karo
//     (error) => {
//         if (error.response && error.response.status === 401) {
//             // Token expire ho gaya ya galat hai
//             localStorage.removeItem("token");
//             window.location.href = "/"; // Seedha login par bhej do
//             alert("Session expired. Please login again.");
//         }
//         return Promise.reject(error);
//     }
// );

// export default api;


