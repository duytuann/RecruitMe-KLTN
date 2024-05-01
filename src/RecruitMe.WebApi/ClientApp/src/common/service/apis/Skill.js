import axiosInstance from "../axios-instance";

const getAllSkills = async () => {
  return (await axiosInstance.get("/skills/getallskills")).data;
};

const skillService = {
  getAllSkills,
};

export default skillService;
