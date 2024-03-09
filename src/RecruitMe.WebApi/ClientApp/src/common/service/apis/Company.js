import axiosInstance from "../axios-instance";

const getCompanyById = async (id) => {
  return await axiosInstance.get(`/companies/${id}`);
};

const getAllCompanies = async () => {
  return await axiosInstance.get("/companies");
};

// other methods

const companyService = {
  getCompanyById,
  getAllCompanies,
};

export default companyService;
