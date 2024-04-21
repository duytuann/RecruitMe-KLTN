import CompanyCard from "./components/CompanyCard";
import Header from "../../components/Header";
import JobCard from "./components/JobCard";
import {Button} from "antd";
import {useEffect, useState} from "react";
import {useLoading} from "../../../common/context/useLoading";
import service from "../../../common/service";

const Home = () => {
  const {showLoading, closeLoading} = useLoading();

  const [employers, setEmployers] = useState([]);
  const [jobs, setJobs] = useState([]);

  const initData = async () => {
    try {
      showLoading();

      const employers = await service.company.getAllCompanies();
      setEmployers(employers);

      const jobs = await service.job.getAllJob();
      setJobs(jobs);

      closeLoading();
    } catch {
      console.log("Failed to fetch data");
      closeLoading();
    } finally {
      closeLoading();
    }
  };

  useEffect(() => {
    initData();
  }, []);

  return (
    <>
      <Header />
      <div className="p-16">
        <div className="max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <h2 className="text-center text-3xl font-bold mb-10">Employers</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {employers?.map((employer) => (
              <CompanyCard key={employer.id} data={employer} />
            ))}
          </div>
        </div>

        <div className="mt-14">
          <h2 className="text-center text-3xl font-bold mb-10">
            IT Jobs for you
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            {jobs?.map((job) => (
              <JobCard key={job.id} job={job} />
            ))}
          </div>
          <Button className="flex h-10 m-auto  font-semibold py-2 px-4 border border-red-500 hover:border-red-700 rounded mt-4">
            View all jobs
          </Button>
        </div>
      </div>
    </>
  );
};

export default Home;
