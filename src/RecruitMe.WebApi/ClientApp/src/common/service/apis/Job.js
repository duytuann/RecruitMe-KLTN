import axiosInstance from "../axios-instance";

const create = async (data) => {
  return (await axiosInstance.post("/jobs/create", data)).data;
};

const getlistjob = async (userId, stateCode) => {
  return (await axiosInstance.post(`/jobs/getlistjob/${userId}/${stateCode}`))
    .data;
};

const getdetailjob = async (jobId) => {
  return (await axiosInstance.get(`/jobs/getdetailjob/${jobId}`)).data;
};

const updateJob = async (data) => {
  return (await axiosInstance.post("/jobs/updatejob", data)).data;
};

const autoInactiveExpriedJob = async (data) => {
  return (await axiosInstance.post("/jobs/autoinactiveexpriedjob", data)).data;
};

const getAllJob = async () => {
  return (await axiosInstance.get(`/jobs/getalljob`)).data;
};

const jobService = {
  create,
  getlistjob,
  getdetailjob,
  updateJob,
  autoInactiveExpriedJob,
  getAllJob,
};

export default jobService;
