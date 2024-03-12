import axiosInstance from "../axios-instance";

const register = async (data) => {
  return await axiosInstance.post("/companies/register", data);
};

const getCompanyById = async (id) => {
  return await axiosInstance.get(`/companies/${id}`);
};

const getAllCompanies = async () => {
  return await axiosInstance.get("/companies");
};

// other methods

const companyService = {
  register,
  getCompanyById,
  getAllCompanies,
};

export default companyService;
