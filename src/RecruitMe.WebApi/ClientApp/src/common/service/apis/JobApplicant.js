import axiosInstance from "../axios-instance";

const createjobapplicant = async (data) => {
  return (await axiosInstance.post("/jobapplicants/createjobapplicant", data))
    .data;
};

const getjobapplicantsbycompanyid = async (companyId, jobApplicantStatus) => {
  return (
    await axiosInstance.get(
      `/jobapplicants/getjobapplicantsbycompanyid/${companyId}/${jobApplicantStatus}`
    )
  ).data;
};

const approveJobApplicant = async (data) => {
  return (await axiosInstance.post("/jobapplicants/approvejobapplicant", data))
    .data;
};

const rejectJobApplicant = async (data) => {
  return (await axiosInstance.post("/jobapplicants/rejectjobapplicant", data))
    .data;
};

const jobApplicantService = {
  createjobapplicant,
  getjobapplicantsbycompanyid,
  approveJobApplicant,
  rejectJobApplicant,
};

export default jobApplicantService;
