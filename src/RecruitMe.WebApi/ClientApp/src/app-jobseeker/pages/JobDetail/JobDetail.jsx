import {useParams} from "react-router";
import {useNavigate} from "react-router";
import {Modal, Button, Form, Input, message, Upload} from "antd";
import {UploadOutlined} from "@ant-design/icons";
import Logo from "./logo.jpg";
import {useEffect, useRef, useState} from "react";
import {useLoading} from "../../../common/context/useLoading";
import service from "../../../common/service";
import RichText from "../../../common/components/rich-text-editor/RichTextEditor";
import moment from "moment";

const JobDetail = () => {
  const [cvUrl, setCvUrl] = useState("");
  const cloudinaryUploadUrl = `https://api.cloudinary.com/v1_1/djvx1q679/upload`;

  const navigate = useNavigate();
  const richTextRef = useRef(null);
  const {id} = useParams();
  const {showLoading, closeLoading} = useLoading();
  const [companyDetail, setCompanyDetail] = useState();
  const [jobDetail, setJobDetail] = useState();

  const getCompanyDetail = async (companyId) => {
    try {
      showLoading();
      const result = await service.company.getCompanyByCompanyId(companyId);
      setCompanyDetail(result);
      closeLoading();
    } catch (error) {
      console.log(error);
      closeLoading();
    } finally {
      closeLoading();
    }
  };

  const getJobDetail = async () => {
    try {
      showLoading();
      const result = await service.job.getdetailjob(id);
      setJobDetail(result);
      await getCompanyDetail(result?.companyId);
      closeLoading();
    } catch (error) {
      console.log(error);
      closeLoading();
    } finally {
      closeLoading();
    }
  };

  useEffect(() => {
    getJobDetail();
  }, [id]);

  useEffect(() => {
    richTextRef?.current?.setValue(jobDetail?.description?.toString() ?? "");
  }, [companyDetail]);

  const temp = ["Java", "SQL", "Spring"];

  // Rating modal
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [form] = Form.useForm();

  const showModal = () => {
    setIsModalVisible(true);
  };

  const applicantJob = async () => {
    try {
      const values = form.getFieldsValue();
      showLoading();
      console.log(values);
      await service.applicant.createjobapplicant({
        jobId: id,
        jobSeekerId: JSON.parse(localStorage.getItem("auth"))?.id,
        coverLetter: values.coverLetter,
        name: values.name,
        email: values.email,
        CVLink: cvUrl,
      });
      message.success("Review created successfully!");
      form.resetFields();
      setIsModalVisible(false);
      closeLoading();
    } catch (error) {
      message.error("Failed to create review.");
      closeLoading();
    }
  };

  const handleOk = () => {
    form.validateFields().then(() => {
      applicantJob();
    });
  };

  const handleCancel = () => {
    form.resetFields();
    setIsModalVisible(false);
  };

  const handleUploadChange = async (info) => {
    if (info.file.status === "uploading") {
      showLoading();
      return;
    }
    if (info.file.status === "done") {
      message.success(`${info.file.name} file uploaded successfully`);
      console.log(info.file.response.secure_url);
      setCvUrl(info.file.response.secure_url);
      closeLoading();
    } else if (info.file.status === "error") {
      message.error(`${info.file.name} file upload failed.`);
    }
  };

  return (
    <div className="w-full flex justify-center">
      {companyDetail && (
        <div className="flex gap-10 m-8 max-w-[1340px]">
          <div className="bg-white p-6 rounded-lg shadow space-y-4">
            {/* Header with Logo, Name, Address, and Actions */}
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <img
                  src={Logo}
                  alt="Company Logo"
                  className="h-12 w-12 rounded-full"
                />
                <div>
                  <h1 className="text-2xl font-bold">{jobDetail?.title}</h1>
                  <p className="text-gray-500">{companyDetail?.address}</p>
                </div>
              </div>

              <div className="flex space-x-2">
                {/* <Button className="bg-blue-600 h-[40px] text-white px-4 py-2 rounded hover:bg-blue-700 transition duration-300">
                  Follow us
                </Button> */}
                <Button
                  onClick={showModal}
                  className="border h-[40px] border-gray-300 text-gray-700 px-4 py-2 rounded hover:border-gray-400 transition duration-300"
                >
                  Apply Now
                </Button>
              </div>
            </div>

            {/* About Company Section */}
            <div className="text-green-600 font-bold text-[20px]">
              Salary: {jobDetail?.minSalary} - {jobDetail?.maxSalary}
            </div>
            <div>
              <h2 className="text-xl font-bold">About Company</h2>
              <div className="my-4">
                <RichText isViewMode ref={richTextRef} />
              </div>
            </div>
            <div className="font-bold text-[22px]">
              {companyDetail?.openJobs?.length} job openings
            </div>
            {companyDetail?.openJobs?.map((job, index) => (
              <div
                key={index}
                className="bg-white p-4 rounded-lg shadow mb-4 flex justify-between items-center"
              >
                <div className="flex space-x-4">
                  <img
                    src={Logo}
                    alt="Company Logo"
                    className="h-12 w-12 rounded-full"
                  />
                  <div>
                    <h3
                      onClick={() => {
                        navigate(`/job/${job.id}`);
                      }}
                      className="text-lg font-semibold"
                    >
                      {job?.title}
                    </h3>
                    <div className="flex mt-2">
                      {temp?.map((tag, index) => (
                        <span
                          key={index}
                          className="text-xs bg-pink-100 text-pink-800 px-2 py-1 rounded-full mr-2"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                    <p className="text-gray-600 mt-2">
                      {job?.minSalary} - {job?.maxSalary}
                    </p>
                  </div>
                </div>
                <div>
                  <div className="text-gray-400">
                    {moment(job?.startDate).format("MMMM D, YYYY")} -
                    {moment(job?.endDate).format("MMMM D, YYYY")}
                  </div>
                  {/* <FaHeart
                      className={`ml-2 mt-2 ${
                        position.isFavorite ? "text-red-500" : "text-gray-300"
                      }`}
                    /> */}
                </div>
              </div>
            ))}
            {/* <div className="font-bold text-[22px]">
              {companyDetail?.companyReviews?.length} employee reviews
            </div>
            {companyDetail?.companyReviews?.map((comment, index) => (
              <div
                key={index}
                className="flex space-x-4 p-4 border-b border-gray-200"
              >
                <FaUserCircle className="text-gray-300 text-5xl" />
                <div className="flex-1">
                  <div className="flex justify-between">
                    <div>
                      <p className="font-bold">Anonymous</p>
                      <p className="text-sm text-gray-500">
                        {moment(comment?.created).format("MMMM D, YYYY")}
                      </p>
                    </div>
                    <div className="flex items-center">
                      <Rate disabled value={comment?.rating ?? 5} />
                    </div>
                  </div>
                  <p className="mt-2 text-gray-700">
                    {comment?.review ??
                      "Salary, benefits, environment ok; Need to improve internal events and training activities"}
                  </p>
                </div>
              </div>
            ))} */}
          </div>
          <div className="min-w-[400px] rounded-lg">
            <div className="p-6 bg-[#F5F5F5] rounded-lg shadow space-y-4">
              <h2 className="text-2xl font-bold">Company Information</h2>
              <div>
                <h3 className="text-gray-700">Website:</h3>
                <p className="text-gray-600">{companyDetail?.website}</p>
              </div>

              <div>
                <h3 className="text-gray-700">Company Size:</h3>
                <p className="text-gray-600">{companyDetail?.companySize}</p>
              </div>
              <div>
                <h3 className="text-gray-700">Location:</h3>
                <p className="text-gray-600">{companyDetail?.address}</p>
              </div>
              <div>
                <h3 className="text-gray-700">Phone Number:</h3>
                <p className="text-gray-600">{companyDetail?.phoneNumber}</p>
              </div>
              <div>
                <h3 className="text-gray-700">Email:</h3>
                <p className="text-gray-600">{companyDetail?.email}</p>
              </div>
            </div>
          </div>
        </div>
      )}
      <Modal
        maskClosable={false}
        title="Apply for Job"
        open={isModalVisible}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <Form form={form} layout="vertical">
          <Form.Item
            name="name"
            label="Full Name"
            rules={[{required: true, message: "Please input your full name!"}]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="email"
            label="Email Address"
            rules={[
              {required: true, message: "Please input your email address!"},
            ]}
          >
            <Input type="email" />
          </Form.Item>
          <Form.Item name="coverLetter" label="Cover Letter">
            <Input.TextArea style={{height: 150}} />
          </Form.Item>
          <Upload
            data={{
              upload_preset: "utgu2xgj",
            }}
            name="file"
            action={cloudinaryUploadUrl}
            listType="text"
            onChange={handleUploadChange}
            accept=".pdf"
            // showUploadList={false}
          >
            <Button className="mt-8" icon={<UploadOutlined />}>
              Click to upload (PDF only)
            </Button>
          </Upload>
        </Form>
      </Modal>
    </div>
  );
};

export default JobDetail;
