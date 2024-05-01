import companyService from "./apis/Company";
import userService from "./apis/User";
import jobService from "./apis/Job";
import jobSeekerService from "./apis/JobSeeker";
import companyReviewService from "./apis/CompanyReview";
import jobApplicantService from "./apis/JobApplicant";
import skillService from "./apis/Skill";

const service = {
  user: userService,
  company: companyService,
  job: jobService,
  jobseeker: jobSeekerService,
  review: companyReviewService,
  applicant: jobApplicantService,
  skill: skillService,
};

export default service;
