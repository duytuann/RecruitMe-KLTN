import axiosInstance from "../axios-instance";

const register = async (data) => {
  return (await axiosInstance.post("/companies/register", data)).data;
};

const getCompanyByUserId = async (id) => {
  return (await axiosInstance.get(`/companies/getcompanydetailbyuserid/${id}`))
    .data;
};

const getAllCompanies = async () => {
  return (await axiosInstance.get("/companies")).data;
};

const updateCompanyProfile = async (data) => {
  return (await axiosInstance.post("/companies/updatecompanyprofile", data))
    .data;
};

const companyService = {
  register,
  getCompanyByUserId,
  getAllCompanies,
  updateCompanyProfile,
};

export default companyService;
