import axiosInstance from "../axios-instance";

const getAllSkills = async () => {
  return (await axiosInstance.get("/skills/getallskills")).data;
};

const updateCompanySkills = async (data) => {
  return (await axiosInstance.post("/skills/updatecompanyskills", data)).data;
};

const updateJobSkills = async (data) => {
  return (await axiosInstance.post("/skills/updatejobskills", data)).data;
};

const skillService = {
  getAllSkills,
  updateCompanySkills,
  updateJobSkills,
};

export default skillService;
