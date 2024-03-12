import axios from "axios";

//const baseURL = import.meta.env.VITE_API_BASE_URL;
const baseURL = "https://localhost:7013/api";

const axiosInstance = axios.create({
  baseURL: baseURL,
  headers: {
    "Content-Type": "application/json",
  },
});

axiosInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("accessToken");
    if (token) {
      config.headers["Authorization"] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

axiosInstance.interceptors.response.use(
  (response) => {
    // Xử lý response dữ liệu ở đây
    return response;
  },
  (error) => {
    // Xử lý nếu response trả về lỗi
    // Ví dụ: Xử lý nếu token hết hạn
    return Promise.reject(error);
  }
);

export default axiosInstance;
