import axiosInstance from "../axios-instance";

const login = async (data) => {
  return await axiosInstance.post("/users/login", data);
};

const userService = {
  login,
};

export default userService;
