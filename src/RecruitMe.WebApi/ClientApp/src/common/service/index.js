import companyService from "./apis/Company";
import userService from "./apis/User";
import jobService from "./apis/Job";

const service = {
  user: userService,
  company: companyService,
  job: jobService,
};

export default service;
