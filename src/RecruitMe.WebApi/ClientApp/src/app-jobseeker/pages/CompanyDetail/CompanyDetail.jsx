import {useParams} from "react-router";
import {
  FaFacebook,
  FaTwitter,
  FaLinkedin,
  FaInstagram,
  FaUserCircle,
  FaStar,
  FaRegStar,
} from "react-icons/fa";
import {useNavigate} from "react-router";

import {Button} from "antd";
import Logo from "./logo.jpg";
import {useEffect, useRef, useState} from "react";
import {useLoading} from "../../../common/context/useLoading";
import service from "../../../common/service";
import RichText from "../../../common/components/rich-text-editor/RichTextEditor";
import moment from "moment";

const comments = [
  {
    id: 1,
    author: "Admin",
    date: "June 23, 2023",
    content:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi interdum sed mauris eu imperdiet. Donec congue orci nec mi luctus, ut faucibus mauris scelerisque.",
    rating: 5,
  },
  {
    id: 2,
    author: "Admin",
    date: "June 23, 2023",
    content:
      "No one rejects, dislikes, or avoids pleasure itself, because it is pleasure, but because those who do not know how to pursue pleasure.",
    rating: 4,
  },
  // ...more comments
];

const CompanyDetail = () => {
  const navigate = useNavigate();
  const richTextRef = useRef(null);
  const {id} = useParams();
  const {showLoading, closeLoading} = useLoading();
  const [companyDetail, setCompanyDetail] = useState();

  const getCompanyDetail = async () => {
    try {
      showLoading();
      const result = await service.company.getCompanyByCompanyId(id);
      setCompanyDetail(result);
      closeLoading();
    } catch (error) {
      console.log(error);
      closeLoading();
    } finally {
      closeLoading();
    }
  };

  useEffect(() => {
    getCompanyDetail();
  }, [id]);

  useEffect(() => {
    richTextRef?.current?.setValue(companyDetail?.about?.toString() ?? "");
  }, [companyDetail]);

  const temp = ["Java", "SQL", "Spring"];

  return (
    <>
      {companyDetail && (
        <div className="flex justify-between m-8">
          <div>
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
                    <h1 className="text-2xl font-bold">
                      {companyDetail?.title}
                    </h1>
                    <p className="text-gray-500">{companyDetail?.address}</p>
                  </div>
                </div>
                <div className="flex space-x-2">
                  {/* <Button className="bg-blue-600 h-[40px] text-white px-4 py-2 rounded hover:bg-blue-700 transition duration-300">
                  Follow us
                </Button> */}
                  <Button className="border h-[40px] border-gray-300 text-gray-700 px-4 py-2 rounded hover:border-gray-400 transition duration-300">
                    Write a review
                  </Button>
                </div>
              </div>

              {/* About Company Section */}
              <div>
                <h2 className="text-xl font-bold">About Company</h2>
                <div className="my-4">
                  <RichText isViewMode ref={richTextRef} />
                </div>
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
                          // navigate(`/job/${job.id}`);
                          navigate(`/job/5dc1ba96-06d4-462d-0d65-08dc42c17f97`);
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

              {comments.map((comment, index) => (
                <div
                  key={index}
                  className="flex space-x-4 p-4 border-b border-gray-200"
                >
                  <FaUserCircle className="text-gray-300 text-5xl" />
                  <div className="flex-1">
                    <div className="flex justify-between">
                      <div>
                        <p className="font-bold">{comment.author}</p>
                        <p className="text-sm text-gray-500">{comment.date}</p>
                      </div>
                      <div className="flex items-center">
                        {[...Array(5)].map((_, i) =>
                          i < comment.rating ? (
                            <FaStar key={i} className="text-yellow-400" />
                          ) : (
                            <FaRegStar key={i} className="text-yellow-400" />
                          )
                        )}
                      </div>
                    </div>
                    <p className="mt-2 text-gray-700">{comment.content}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="w-[450px] rounded-lg ">
            <div className="p-6 bg-[#F5F5F5] rounded-lg shadow space-y-4">
              <h2 className="text-2xl font-bold">Information</h2>
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
              <div>
                <h3 className="text-gray-700 mb-4">Socials:</h3>
                <div className="flex space-x-4">
                  <FaFacebook className="text-blue-600 text-xl" />
                  <FaTwitter className="text-blue-400 text-xl" />
                  <FaLinkedin className="text-blue-500 text-xl" />
                  <FaInstagram className="text-pink-500 text-xl" />
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default CompanyDetail;
