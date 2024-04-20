import Logo from "./logo.jpg";
import {useNavigate} from "react-router";

const CompanyCard = ({data}) => {
  const navigate = useNavigate();
  const temp = ["Java", "SQL", "Spring"];
  return (
    <div
      className="flex flex-col items-center bg-white shadow-lg rounded-lg p-6"
      onClick={() => {
        navigate(`/companies/${data.id}`);
      }}
    >
      <div className="mb-4">
        <img src={Logo} alt={`${data?.title} logo`} className="h-30" />
      </div>
      <h3 className="mb-2 text-lg font-semibold">{data?.title}</h3>
      <div className="mb-4">
        {temp?.map((skill, index) => (
          <span
            key={index}
            className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2"
          >
            {skill}
          </span>
        ))}
      </div>
      <div className="mb-4 text-sm text-gray-600">{data?.address}</div>
      <a
        href="#"
        className="mt-auto bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded"
      >
        {data.jobsCount} Open Jobs
      </a>
    </div>
  );
};

export default CompanyCard;