import companyService from "./apis/Company";
import userService from "./apis/User";
import jobService from "./apis/Job";
import jobSeekerService from "./apis/JobSeeker";
import companyReviewService from "./apis/CompanyReview";
import jobApplicantService from "./apis/JobApplicant";

const service = {
  user: userService,
  company: companyService,
  job: jobService,
  jobseeker: jobSeekerService,
  review: companyReviewService,
  applicant: jobApplicantService,
};

export default service;
