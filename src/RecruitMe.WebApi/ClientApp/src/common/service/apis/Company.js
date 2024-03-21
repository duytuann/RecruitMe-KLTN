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

// other methods

const companyService = {
  register,
  getCompanyByUserId,
  getAllCompanies,
};

export default companyService;
