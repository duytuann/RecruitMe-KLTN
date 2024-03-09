import companyService from "./apis/Company";
import userService from "./apis/User";

const service = {
  user: userService,
  company: companyService,
};

export default service;
