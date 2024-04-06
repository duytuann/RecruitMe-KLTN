import axiosInstance from "../axios-instance";

const register = async (data) => {
  return (await axiosInstance.post("/jobseekers/register", data)).data;
};

const jobSeekerService = {
  register,
};

export default jobSeekerService;
