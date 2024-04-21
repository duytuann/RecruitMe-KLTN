import axiosInstance from "../axios-instance";

const createjobapplicant = async (data) => {
  return (await axiosInstance.post("/jobapplicants/createjobapplicant", data))
    .data;
};

const getjobapplicantsbycompanyid = async (companyId) => {
  return (
    await axiosInstance.get(
      `/jobapplicants/getjobapplicantsbycompanyid/${companyId}`
    )
  ).data;
};

const jobApplicantService = {
  createjobapplicant,
  getjobapplicantsbycompanyid,
};

export default jobApplicantService;
