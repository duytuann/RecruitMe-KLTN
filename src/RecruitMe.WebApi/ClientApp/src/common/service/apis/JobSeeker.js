import axiosInstance from "../axios-instance";

const register = async (data) => {
  return (await axiosInstance.post("/jobseekers/register", data)).data;
};

const getJobSeekerDetailById = async (id) => {
  return (await axiosInstance.get(`/jobseekers/getjobseekerdetailbyid/${id}`))
    .data;
};

const updateJobSeekerProfile = async (data) => {
  return (await axiosInstance.post("/jobseekers/updatejobseekerprofile", data))
    .data;
};

const jobSeekerService = {
  register,
  getJobSeekerDetailById,
  updateJobSeekerProfile,
};

export default jobSeekerService;
