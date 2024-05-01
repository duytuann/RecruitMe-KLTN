import axiosInstance from "../axios-instance";

const register = async (data) => {
  return (await axiosInstance.post("/companies/register", data)).data;
};

const getCompanyByUserId = async (id) => {
  return (await axiosInstance.get(`/companies/getcompanydetailbyuserid/${id}`))
    .data;
};

const getCompanyByCompanyId = async (companyId) => {
  return (
    await axiosInstance.get(
      `/companies/getcompanydetailbycompanyid/${companyId}`
    )
  ).data;
};

const getAllCompanies = async () => {
  return (await axiosInstance.get("/companies/getallcompanies")).data;
};

const updateCompanyProfile = async (data) => {
  return (await axiosInstance.post("/companies/updatecompanyprofile", data))
    .data;
};

const updateCompanyLogo = async (data) => {
  return (await axiosInstance.post("/companies/updatecompanylogo", data)).data;
};

const companyService = {
  register,
  getCompanyByUserId,
  getCompanyByCompanyId,
  getAllCompanies,
  updateCompanyProfile,
  updateCompanyLogo,
};

export default companyService;
