import axiosInstance from "../axios-instance";

const create = async (data) => {
  return (await axiosInstance.post("/jobs/create", data)).data;
};

const getlistjob = async (userId, stateCode) => {
  return (await axiosInstance.post(`/jobs/getlistjob/${userId}/${stateCode}`))
    .data;
};

const jobService = {
  create,
  getlistjob,
};

export default jobService;
