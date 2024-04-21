import axiosInstance from "../axios-instance";

const createcompanyreview = async (data) => {
  return (await axiosInstance.post("/companyreviews/createcompanyreview", data))
    .data;
};

const companyReviewService = {
  createcompanyreview,
};

export default companyReviewService;
