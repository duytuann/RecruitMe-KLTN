import axios from "axios";

const baseURL = import.meta.env.VITE_API_BASE_URL;

const axiosInstance = axios.create({
  baseURL: baseURL,
  headers: {
    "Content-Type": "application/json",
  },
});

axiosInstance.interceptors.request.use(
  (config) => {
    // Thực hiện hành động trước khi request được gửi
    // Ví dụ: thêm token xác thực vào headers
    // const token = authService.getToken();
    // if (token) {
    //   config.headers['Authorization'] = `Bearer ${token}`;
    // }
    return config;
  },
  (error) => {
    // Xử lý lỗi request
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
