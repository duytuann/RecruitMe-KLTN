import companyService from "./apis/Company";
import userService from "./apis/User";
import jobService from "./apis/Job";
import jobSeekerService from "./apis/JobSeeker";

const service = {
  user: userService,
  company: companyService,
  job: jobService,
  jobseeker: jobSeekerService,
};

export default service;
